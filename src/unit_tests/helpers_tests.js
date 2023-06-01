// Unit Tests for Helpers

// Import the necessary dependencies for testing (e.g., assert library)
const assert = require('assert');


// Define the test cases
const shortNameTestCases = [
  { variationLongName: '', expected: 'u' },
  { variationLongName: 'control', expected: 'c' },
  { variationLongName: 'none', expected: 'n' },
  { variationLongName: 'variation0', expected: 'u' },
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
	{ variationShortName: 'v0', expected: 'unset' },
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

const strToIntCases = [
	{ input: '123', expected: 123 },
	{ input: '456789', expected: 456789 },
	{ input: '346468', expected: 346468 },
	{ input: '0.5', expected: null },
	{ input: '0', expected: 0 },
	{ input: '', expected: null },
	{ input: '00123', expected: 123 },
	{ input: 'abc', expected: null },
	{ input: '12a3', expected: null },
	{ input: '9x', expected: null },
	{ input: 'xyz', expected: null }
];

for (const testCase of strToIntCases) {
	const { input, expected } = testCase;
	const result = strToInt(input);
	assert.strictEqual(result, expected, `Input: ${input}, Expected: ${expected}, Result: ${result}`);
}

console.log('All strToInt tests passed successfully!');


const parseTestVariationCases = [
	{
		input : "[123:v1,456:v2,789:v3,345:u,678:n]", 
		expected: [
			{ id: 123, variation: "variation1" },
			{ id: 456, variation: "variation2" },
			{ id: 789, variation: "variation3" },
			{ id: 345, variation: "unset" },
			{ id: 678, variation: "none" }
		]
	},
	{
		input : "[465:v10,3454:v0,3463456:dfsdf,90789:u,]", 
		expected: [
			{ id: 465, variation: "variation10" },
			{ id: 3454, variation: "unset" },
			{ id: 3463456, variation: "unset" },
			{ id: 90789, variation: "unset" }
		]
	},
	{
		input : "[123:v1,4",
		expected: []
	},
	{
		input : "[123:v1,sdfsdfsd]",
		expected: [
			{ id: 123, variation: "variation1" }
		]
	},
	{
		input : "[123:v1,4]",
		expected: [
			{ id: 123, variation: "variation1" },
			{ id: 4, variation: "unset" }
		]
	}
]

for (const testCase of parseTestVariationCases) {
	const { input, expected } = testCase;
	const result = parseTestsVariations(input);
	assert.deepStrictEqual(result, expected, `Input: ${input}, Expected: ${expected}, Result: ${result}`);
}

console.log('All parseTestVariation tests passed successfully!');

const serializeTestVariationCases = [
	{
		input : [
			{ id: 123, variation: "variation1" },
			{ id: 456, variation: "variation2" },
			{ id: 789, variation: "variation3" },
			{ id: 345, variation: "unset" },
			{ id: 678, variation: "none" }
		],
		expected: "[123:v1,456:v2,789:v3,345:u,678:n]"
	},
	{
		input : [
			{ id: 465, variation: "variation10" },
			{ id: 3454, variation: "unset" },
			{ id: 3463456, variation: "unset" },
			{ id: 90789, variation: "unset" }
		],
		expected: "[465:v10,3454:u,3463456:u,90789:u]"
	},
	{
		input : [
			{ id: 465, variation: "variation0" },
			{ id: 3454, variation: "unset" },
			{ id: 3463456, variation: "unset" },
			{ id: 90789, variation: "unset" }
		],
		expected: "[465:u,3454:u,3463456:u,90789:u]"
	},
	{
		input : [
			{ id: 123, variation: "variation1" }
		],
		expected: "[123:v1]"
	},
	{
		input : [],
		expected: "[]"
	}
];

for (const testCase of serializeTestVariationCases) {
	const { input, expected } = testCase;
	const result = serializeTestsVariations(input);
	assert.strictEqual(result, expected, `Input: ${input}, Expected: ${expected}, Result: ${result}`);
}

console.log('All serializeTestVariation tests passed successfully!');
