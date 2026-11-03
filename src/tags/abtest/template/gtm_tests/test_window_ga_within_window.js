// Scenario: testWindowEnabled is true and the visitor's _ga cookie timestamp
// (their first-visit timestamp) falls between testWindowStart and
// testWindowEnd. The template should treat this visitor as inside the test
// window and run normally: a variation is selected, persisted to
// localStorage, and the dataLayer event is pushed.
// Test window: 01/10/2024 - 01/20/2024
// _ga first-visit timestamp: 1705320000 (01/15/2024 12:00 UTC, in between the two dates)
// URL being emulated: https://www.example.com/

const mockData = {
  qaOnly: false,
  experimentName: 'Nantu Test',
  testIndex: '123',
  testWindowEnabled: true,
  testWindowStart: '01/10/2024',
  testWindowEnd: '01/20/2024',
  allowedDomain: 'www.example.com',
  useCustomUserProperty: false,
  customUserPropertyName: '',
  variations: [
    { id: 'control', name: 'Control', weight: '50', variation_when_disabled: 'control' },
    { id: 'variation1', name: 'Variation 1', weight: '50', variation_when_disabled: 'control' }
  ]
};

// Emulate https://www.example.com/ (no query string at all).
mock('getUrl', function(component) {
  if (component === 'host') return 'www.example.com';
  if (component === 'query') return '';
  if (component === 'path') return '/';
  return 'https://www.example.com/';
});

// Emulate a _ga cookie whose embedded timestamp falls inside the test
// window; no nantu_mode cookie.
mock('getCookieValues', function(cookieName) {
  if (cookieName === '_ga') return ['GA1.2.123456789.1705320000'];
  return [];
});

// Capture any cookie the code tries to write; none should happen here since
// qaOnly is false and there's no ?nantu_mode=qa query var.
let setCookieCalls = [];
mock('setCookie', function(name, value, options) {
  setCookieCalls.push({ name: name, value: value, options: options });
});

// Grant every permission check unconditionally (permission checks aren't
// validated in unit tests, so this must be mocked explicitly).
mock('queryPermission', function() {
  return true;
});

// No saved variation in localStorage yet; capture whatever gets written to it.
let storedValue = '[]';
mockObject('localStorage', {
  getItem: function(key) { return storedValue; },
  setItem: function(key, value) { storedValue = value; }
});

// Force a deterministic variation pick instead of a real random one.
// generateRandom(0, 99) returning 0 selects the first variation ("control").
mock('generateRandom', function(min, max) {
  return 0;
});

// Capture whatever gets pushed to the dataLayer.
let pushedEvent = null;
mock('createQueue', function(name) {
  return function(event) { pushedEvent = event; };
});

runCode(mockData);

assertApi('gtmOnSuccess').wasCalled();
assertApi('gtmOnFailure').wasNotCalled();

// The visitor's first-visit timestamp is inside the test window, so the
// template runs normally: a variation is selected and stored, and the
// dataLayer event fires.
assertThat(storedValue).isEqualTo('[123:c]');
assertThat(setCookieCalls.length).isEqualTo(0);

assertThat(pushedEvent).isEqualTo({
  event: 'nantu_123_execute_control',
  nantu_test_id: '123',
  nantu_variation: 'control',
  nantu_experiment: 'Nantu Test',
  nantu_variation_name: 'Control',
  nantu_test_variations: 'control,variation1',
  nantu_user_property_name: 'nantu_ab_test123',
  nantu_version: '1.0.3'
});
