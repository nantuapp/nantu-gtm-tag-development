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

/*
const getDeviceTypeTestCases = [
	{
		input : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15", // Mac Safari 16.5
		expected: "desktop",
		versionPrefix: "Version/",
		version: 16
	},
	{
		input : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15", // Mac Safari 16.2
		expected: "desktop",
		versionPrefix: "Version/",
		version: 16
	},
	{
		input: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15", //Mac Safari 16
		expected: "desktop",
		versionPrefix: "Version/",
		version: 16
	},
	{
		input: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36", //Mac Chrome 109"
		expected: "desktop",
		versionPrefix: "Chrome/",
		version: 109
	},
	{
		input: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78", //Mac Edge 109
		expected: "desktop",
		versionPrefix: "Chrome/",
		version: 109
	},
	{
		input : "Mozilla/5.0 (iPad; CPU OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Mobile/15E148 Safari/604.1", // iPad Safari 16.2
		expected: "tablet",
		versionPrefix: "Version/",
		version: 16
	},
	{
		input: "Mozilla/5.0 (iPhone14,6; U; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19E241 Safari/602.1", //Iphone 14 Safari 10
		expected: "excluded",
		versionPrefix: "Version/",
		version: 10
	},
	{
		input : "Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36", // Samsung Galaxy A20 Chrome 87
		expected: "mobile",
		versionPrefix: "Chrome/",
		version: 87
	},
	{
		input: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1", //iPhone 12 Chrome 69
		expected: "excluded",
		versionPrefix: "CriOS/",
		version: 69
	},
	{
		input: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/113.0.5672.121 Mobile/15E148 Safari/604.1", //iPhone 16 Chrome 113
		expected: "mobile",
		versionPrefix: "CriOS/",
		version: 113
	},
	{
		input: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/109.0.5414.112 Mobile/15E148 Safari/604.1", //iPhone Chrome 109
		expected: "mobile",
		versionPrefix: "CriOS/",
		version: 109
	},
	{
		input: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1", //iPhone Safari 10
		expected: "excluded",
		versionPrefix: "Version/",
		version: 10
	}
];

for (const testCase of getDeviceTypeTestCases) {
	const { input, expected, versionPrefix, version } = testCase;
	getNumberAfterString(input, versionPrefix);
	const result = getNumberAfterString(input, versionPrefix);
	assert.strictEqual(result, version, `Input: ${input}, Expected: ${version}, Result: ${result}`);
}

console.log('All getNumberAfterString User Agent tests passed successfully!');
*/
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

