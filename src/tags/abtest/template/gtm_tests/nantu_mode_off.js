// Scenario: nantu_mode=off in the query string. isNantuOff() should short
// circuit the template immediately: it calls data.gtmOnSuccess() and returns
// before any permission checks, cookie reads/writes, localStorage access,
// variation selection, or dataLayer push ever happen.
// URL being emulated: https://www.example.com/?nantu_mode=off

const mockData = {
  qaOnly: false,
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

// Emulate https://www.example.com/?nantu_mode=off
mock('getUrl', function(component) {
  if (component === 'host') return 'www.example.com';
  if (component === 'query') return 'nantu_mode=off';
  if (component === 'path') return '/';
  return 'https://www.example.com/?nantu_mode=off';
});

// Grant every permission check unconditionally (permission checks aren't
// validated in unit tests, so this must be mocked explicitly).
mock('queryPermission', function() {
  return true;
});

// These should never be called once nantu_mode=off short circuits the
// template, but they're mocked anyway so the test fails loudly (via
// assertApi().wasNotCalled()) instead of erroring on an unmocked API if the
// short circuit ever regresses.
mock('getCookieValues', function() {
  return [];
});

let setCookieCalls = [];
mock('setCookie', function(name, value, options) {
  setCookieCalls.push({ name: name, value: value, options: options });
});

let localStorageCalls = [];
mockObject('localStorage', {
  getItem: function(key) { localStorageCalls.push({ method: 'getItem', key: key }); return '[]'; },
  setItem: function(key, value) { localStorageCalls.push({ method: 'setItem', key: key, value: value }); }
});

mock('generateRandom', function(min, max) {
  return 0;
});

let pushedEvent = null;
mock('createQueue', function(name) {
  return function(event) { pushedEvent = event; };
});

runCode(mockData);

assertApi('gtmOnSuccess').wasCalled();
assertApi('gtmOnFailure').wasNotCalled();

// No cookie should be read or written, no localStorage access, no random
// variation selection, and no dataLayer push - the template exits before
// any of that logic runs.
assertApi('getCookieValues').wasNotCalled();
assertApi('setCookie').wasNotCalled();
assertApi('generateRandom').wasNotCalled();
assertApi('createQueue').wasNotCalled();

assertThat(setCookieCalls.length).isEqualTo(0);
assertThat(localStorageCalls.length).isEqualTo(0);
assertThat(pushedEvent).isNull();
