// Scenario: QA Only test fires when there is no ?nantu_mode=qa query var,
// but the nantu_mode cookie is already set to "qa". isInQAMode() should
// detect QA mode purely from the cookie, and since there's no query var,
// hasQAQuery() is false so the QA cookie is never re-written.
// URL being emulated: https://www.example.com/ (no query string)
// Cookie being emulated: nantu_mode=qa

const mockData = {
  qaOnly: true,
  experimentName: 'Nantu Test',
  testIndex: '123',
  testWindowEnabled: false,
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

// Emulate the nantu_mode=qa cookie already being set; no _ga cookie.
mock('getCookieValues', function(cookieName) {
  if (cookieName === 'nantu_mode') return ['qa'];
  return [];
});

// Capture any cookie the code tries to write; none should happen here since
// hasQAQuery() is false (the cookie is already set, it's not coming from the URL).
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

// The QA cookie is never re-written; QA mode came from the existing cookie,
// not from the query string.
assertThat(setCookieCalls.length).isEqualTo(0);

// qaOnly is true but isInQAMode() is true (via the cookie), so the gate
// condition passes and the dataLayer event fires.
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

assertThat(storedValue).isEqualTo('[123:c]');
