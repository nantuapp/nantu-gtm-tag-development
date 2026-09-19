// Scenario: nantu_mode has an arbitrary/unrecognized value (neither "qa" nor
// "off"), both in the query string and in the cookie. isNantuOff() only
// matches "nantu_mode=off" and hasQAQuery()/isInQAMode() only match
// "nantu_mode=qa", so an unrecognized value should behave exactly like
// nantu_mode being absent: the tag runs normally, but since qaOnly is true
// and we're not in QA mode, the dataLayer event is skipped.
// URL being emulated: https://www.example.com/?nantu_mode=beta123
// Cookie being emulated: nantu_mode=beta123

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

// Emulate https://www.example.com/?nantu_mode=beta123
mock('getUrl', function(component) {
  if (component === 'host') return 'www.example.com';
  if (component === 'query') return 'nantu_mode=beta123';
  if (component === 'path') return '/';
  return 'https://www.example.com/?nantu_mode=beta123';
});

// Emulate the nantu_mode cookie also holding an unrecognized value; no _ga cookie.
mock('getCookieValues', function(cookieName) {
  if (cookieName === 'nantu_mode') return ['beta123'];
  return [];
});

// Capture any cookie the code tries to write; none should happen here since
// hasQAQuery() only matches "nantu_mode=qa", not arbitrary values.
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

// An unrecognized nantu_mode value is not "off", so the template does not
// bail out early like it would with nantu_mode=off.
assertThat(pushedEvent).isNull();

// It's also not "qa", so no QA cookie gets written and the dataLayer event
// stays gated off (qaOnly is true and isInQAMode() is false).
assertThat(setCookieCalls.length).isEqualTo(0);

// The variation is still selected and persisted to localStorage even though
// no event was pushed.
assertThat(storedValue).isEqualTo('[123:c]');
