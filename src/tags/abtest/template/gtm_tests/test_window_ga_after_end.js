// Scenario: testWindowEnabled is true and the visitor's _ga cookie timestamp
// (their first-visit timestamp) falls after testWindowEnd. The template
// should treat this visitor as outside the test window: it calls
// data.gtmOnSuccess() and returns before variation selection, localStorage
// writes, or the dataLayer push ever happen.
// Test window: 01/10/2024 - 01/20/2024
// _ga first-visit timestamp: 1705838400 (01/21/2024 12:00 UTC, one day after testWindowEnd)
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

// Emulate a _ga cookie whose embedded timestamp is after testWindowEnd;
// no nantu_mode cookie.
mock('getCookieValues', function(cookieName) {
  if (cookieName === '_ga') return ['GA1.2.123456789.1705838400'];
  return [];
});

// Capture any cookie the code tries to write; none should happen here.
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

// Capture whatever gets pushed to the dataLayer; nothing should be pushed.
let pushedEvent = null;
mock('createQueue', function(name) {
  return function(event) { pushedEvent = event; };
});

runCode(mockData);

assertApi('gtmOnSuccess').wasCalled();
assertApi('gtmOnFailure').wasNotCalled();

// The visitor's first-visit timestamp is after testWindowEnd, so the
// template exits early: no variation is stored and no event is pushed.
assertThat(storedValue).isEqualTo('[]');
assertThat(setCookieCalls.length).isEqualTo(0);
assertThat(pushedEvent).isNull();
