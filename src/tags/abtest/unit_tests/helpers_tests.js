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
	{ input: '001230', expected: 1230 },
	{ input: '00123', expected: 123 },
	{ input: 'abc', expected: null },
	{ input: '12a3', expected: null },
	{ input: '9x', expected: null },
	{ input: 'xyz', expected: null },
	{ input: 'GA1.1.1567679025.1665237476', expected: null }
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

// Test cases in an array
const numberAfterStringTestCases = [
	{ text: "abc123def", string: "abc", expected: 123 },
	{ text: "abcabc123def", string: "abc", expected: null },
	{ text: "Hello, world!", string: "foo", expected: null },
	{ text: "Hello, world!", string: "Hell", expected: null },
	{ text: "Hello123world", string: "123", expected: null },
	{ text: "abc", string: "abc", expected: null },
	{ text: "123", string: "", expected: 123 }
];

for (const testCase of numberAfterStringTestCases) {
	const { text, string, expected } = testCase;
	const result = getNumberAfterString(text, string);
	assert.strictEqual(result, expected, `Input: ${text}, Expected: ${expected}, Result: ${string}`);
}

console.log('All getNumberAfterString User Agent tests passed successfully!');


const selectVariationTestCases = [
	{
		name : "Only Control",
		variations : [
			{
				id: "control",
				name: "Control",
				weight: 1,
			},
			{
				id: "variation1",
				name: "Variation 1",
				weight: 0,
			}
		],
		expected: "control"
	},
	{
		name : "Only Variation 1",
		variations : [
			{
				id: "control",
				name: "Control",
				weight: 0,
			},
			{
				id: "variation1",
				name: "Variation 1",
				weight: 1,
			}
		],
		expected: "variation1"
	}
];

for (const testCase of selectVariationTestCases) {
	const { name, variations, expected } = testCase;
	const result = selectRandomVariation({variations: variations});
	assert.strictEqual(result, expected, `Test Case: ${name}, Expected: ${expected}, Result: ${result}`);
}

var variationResults = {control: 0, variation1: 0};

for (let i = 0; i < 1000; i++) {
	const result = selectRandomVariation({variations: [{id: "control", name: "Control", weight: 50}, {id: "variation1", name: "Variation 1", weight: 50}]});

	if (result === "control") {
		variationResults.control++;
	}
	else if (result === "variation1") {
		variationResults.variation1++;
	}
	else {
		throw new Error("Unexpected variation:" + result);
	}
}


if(variationResults.control < 450 || variationResults.control > 550) {
	throw new Error("Unexpected control variation count: " + variationResults.control);
}

if(variationResults.variation1 < 450 || variationResults.variation1 > 550) {
	throw new Error("Unexpected variation1 variation count: " + variationResults.variation1);
}

console.log('All selectRandomVariation tests passed successfully!');


const leapYearTestCases = [
	{ year: 2020, expected: true },
	{ year: 2021, expected: false },
	{ year: 2022, expected: false },
	{ year: 2000, expected: true },
	{ year: 1900, expected: false },
	{ year: 1600, expected: true },
	{ year: 2400, expected: true },
	{ year: 2401, expected: false },
	{ year: 2200, expected: false },
];

for (const testCase of leapYearTestCases) {
	const { year, expected } = testCase;
	const result = isLeapYear(year);
	assert.strictEqual(result, expected, `Input: ${year}, Expected: ${expected}, Result: ${result}`);
}

console.log('All isLeapYear tests passed successfully!');


const timestampTestCases = [
	{ date: "1/1/1970", expected: 0 },
	{ date: "1/15/1970", expected: Math.round(1209600 / (24 * 3600)) },
	{ date: "1/15/1980", expected: Math.round(316738800 / (24 * 3600)) },
	{ date: "1/1/2000", expected: Math.round(946681200 / (24 * 3600)) },
	{ date: "1/1/2021", expected: Math.round(1609455600 / (24 * 3600)) },
	{ date: "1/1/2022", expected: Math.round(1640991600 / (24 * 3600)) },
	{ date: "1/1/2023", expected: Math.round(1672527600 / (24 * 3600)) },
	{ date: "2/29/2020", expected: Math.round(1582930800 / (24 * 3600)) },
	{ date: "5/1/2020", expected: Math.round(1588297200 / (24 * 3600)) },
	{ date: "10/1/2024", expected: Math.round(1727733600 / (24 * 3600)) },
	{ date: "12/22/2054", expected: Math.round(2681506800 / (24 * 3600)) },
];

for (const testCase of timestampTestCases) {
	const { date, expected } = testCase;
	const result = getDaysFrom1970(date);
	assert.strictEqual(result, expected, `Input: ${date}, Expected: ${expected}, Result: ${result}`);
}
