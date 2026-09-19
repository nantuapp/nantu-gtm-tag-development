// Scenario: QA Only test does NOT fire when there is no ?nantu_mode=qa query
// var and no nantu_mode=qa cookie. The dataLayer event should be skipped
// entirely, and no QA cookie should be set, but the tag should still
// succeed (gtmOnSuccess) and still store the newly selected variation.
// URL being emulated: https://www.example.com/ (no query string)

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

// No nantu_mode cookie and no _ga cookie either.
mock('getCookieValues', function(cookieName) {
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

// No QA signal at all (no query var, no cookie), so isInQAMode() is false and
// the QA cookie is never set.
assertThat(setCookieCalls.length).isEqualTo(0);

// qaOnly is true and we're not in QA mode, so the dataLayer event must be
// skipped entirely.
assertThat(pushedEvent).isNull();

// The variation is still selected and persisted to localStorage even though
// no event was pushed.
assertThat(storedValue).isEqualTo('[123:c]');
