// Unit Tests for Helpers

// Import the necessary dependencies for testing (e.g., assert library)
const assert = require('assert');


// Define the test cases
const shortNameTestCases = [
  { variationLongName: '', expected: 'u' },
  { variationLongName: 'control', expected: 'c' },
  { variationLongName: 'none', expected: 'n' },
  { variationLongName: 'variation10', expected: 'v10' },
  { variationLongName: 'variation1', expected: 'v1' },
  { variationLongName: 'variation9', expected: 'v9' },
  { variationLongName: 'variationabc', expected: 'u' },
  { variationLongName: 'variation-5', expected: 'u' },
  { variationLongName: undefined, expected: 'u' },
  { variationLongName: null, expected: 'u' },
  { variationLongName: 'random', expected: 'u' }
];

// Perform the tests
for (const testCase of shortNameTestCases) {
  const { variationLongName, expected } = testCase;
  const result = shortName(variationLongName);
  assert.strictEqual(result, expected, `Input: ${variationLongName}, Expected: ${expected}, Result: ${result}`);
}

console.log('All shortName tests passed successfully!');

const longNameTestCases = [
	{ variationShortName: '', expected: 'unset' },
	{ variationShortName: 'c', expected: 'control' },
	{ variationShortName: 'n', expected: 'none' },
	{ variationShortName: 'v10', expected: 'variation10' },
	{ variationShortName: 'v1', expected: 'variation1' },
	{ variationShortName: 'v9', expected: 'variation9' },
	{ variationShortName: 'vabc', expected: 'unset' },
	{ variationShortName: 'v-5', expected: 'unset' },
	{ variationShortName: undefined, expected: 'unset' },
	{ variationShortName: null, expected: 'unset' },
	{ variationShortName: 'random', expected: 'unset' }
];

for (const testCase of longNameTestCases) {
	const { variationShortName, expected } = testCase;
	const result = longName(variationShortName);
	assert.strictEqual(result, expected, `Input: ${variationShortName}, Expected: ${expected}, Result: ${result}`);
}

console.log('All longName tests passed successfully!');

