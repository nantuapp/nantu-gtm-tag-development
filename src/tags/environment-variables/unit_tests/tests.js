// Unit Tests for Detectors

// Import the necessary dependencies for testing (e.g., assert library)
const assert = require('assert');


const userAgentTestCases = [
	{
		input : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15", // Mac Safari 16.5
		device: "desktop",
		browser: "safari",
		browserType: "safari",
		version: 16
	},
	{
		input : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15", // Mac Safari 16.2
		device: "desktop",
		browser: "safari",
		browserType: "safari",
		version: 16
	},
	{
		input: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15", //Mac Safari 16
		device: "desktop",
		browser: "safari",
		browserType: "safari",
		version: 16
	},
	{
		input: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36", //Mac Chrome 109"
		device: "desktop",
		browser: "chrome",
		browserType: "chrome",
		version: 109
	},
	{
		input: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78", //Mac Edge 109
		device: "desktop",
		browser: "edge",
		browserType: "chrome",
		version: 109
	},
	{
		input : "Mozilla/5.0 (iPad; CPU OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Mobile/15E148 Safari/604.1", // iPad Safari 16.2
		device: "tablet",
		browser: "safari",
		browserType: "safari",
		version: 16
	},
	{
		input: "Mozilla/5.0 (iPhone14,6; U; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19E241 Safari/602.1", //Iphone 14 Safari 10
		device: "mobile",
		browser: "safari",
		browserType: "safari",
		version: 10
	},
	{
		input : "Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36", // Samsung Galaxy A20 Chrome 87
		device: "mobile",
		browser: "chrome",
		browserType: "chrome",
		version: 87
	},
	{
		input: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1", //iPhone 12 Chrome 69
		device: "mobile",
		browser: "chrome",
		browserType: "safari",
		version: 69
	},
	{
		input: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/113.0.5672.121 Mobile/15E148 Safari/604.1", //iPhone 16 Chrome 113
		device: "mobile",
		browser: "chrome",
		browserType: "safari",
		version: 113
	},
	{
		input: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/109.0.5414.112 Mobile/15E148 Safari/604.1", //iPhone Chrome 109
		device: "mobile",
		browser: "chrome",
		browserType: "safari",
		version: 109
	},
	{
		input: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1", //iPhone Safari 10
		device: "mobile",
		browser: "safari",
		browserType: "safari",
		version: 10
	},
	{
		input: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0", //Mac Firefox 115
		device: "desktop",
		browser: "firefox",
		browserType: "firefox",
		version: 115
	},
	{
		input: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183", //Mac Edge 115
		device: "desktop",
		browser: "edge",
		browserType: "chrome",
		version: 115
	},
	{
		input: "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.0.0 Mobile Safari/537.36", //Android Chrome 95
		device: "mobile",
		browser: "chrome",
		browserType: "chrome",
		version: 95
	},
	{
		input: "Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.109 Safari/537.36 CrKey/1.54.248666", //Nest Hub Android Chrome 88
		device: "tablet",
		browser: "chrome",
		browserType: "chrome",
		version: 88
	},
	{
		input: "Mozilla/5.0 (Linux; Android 9.0; SAMSUNG SM-F900U Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36", //Samsung Galaxy Fold Chrome 114
		device: "mobile",
		browser: "chrome",
		browserType: "chrome",
		version: 114
	},
	{
		input: "Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1", //iPad Chrome 87
		device: "tablet",
		browser: "chrome",
		browserType: "safari",
		version: 87
	},
	{
		input: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 OPR/101.0.0.0", //Windows Opera 101
		device: "desktop",
		browser: "opera",
		browserType: "chrome",
		version: 101
	},
	{
		input: "Mozilla/5.0 (Android 10; Mobile; rv:109.0) Gecko/115.0 Firefox/115.0", //Android Firefox 115
		device: "mobile",
		browser: "firefox",
		browserType: "firefox",
		version: 115
	}
];

for (const testCase of userAgentTestCases) {
	const { input, device, browser, browserType, version } = testCase;
	const resultData = nantuDetectBrowser(input);

	const result = resultData.device + "," + resultData.browser + "," + resultData.browserType + "," + resultData.version;

	const expected = device + "," + browser + "," + browserType + "," + version;

	assert.strictEqual(result, expected, `Input: ${input}, Expected: ${expected}, Result: ${result}`);
}

console.log('All detectBrowser User Agent tests passed successfully!');

