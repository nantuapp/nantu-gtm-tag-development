// Scenario: QA Only test fires when ?nantu_mode=qa is present in the URL
// URL being emulated: https://www.example.com/?nantu_mode=qa

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

// Emulate https://www.example.com/?nantu_mode=qa
// getUrl('query') never includes the leading '?'.
mock('getUrl', function(component) {
  if (component === 'host') return 'www.example.com';
  if (component === 'query') return 'nantu_mode=qa';
  if (component === 'path') return '/';
  return 'https://www.example.com/?nantu_mode=qa';
});

// No cookies set yet (nantu_mode cookie hasn't been written, no _ga cookie either).
mock('getCookieValues', function(cookieName) {
  return [];
});

// Capture any cookie the code tries to write (e.g. the nantu_mode=qa cookie).
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

// QA mode should have been detected from the query string, so the QA cookie
// gets set and the dataLayer event fires even though qaOnly is true.
assertThat(setCookieCalls.length).isGreaterThan(0);
assertThat(setCookieCalls[0].name).isEqualTo('nantu_mode');
assertThat(setCookieCalls[0].value).isEqualTo('qa');

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
