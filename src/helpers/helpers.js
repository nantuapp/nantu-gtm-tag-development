// Description: Helper functions for the A/B testing framework.
// Author: Juan Castro
// Last modified: 2023-05-26
// License: Apache 2.0
// Version: 1.0.0
// Path: helpers.js

// shortName converts a variation long name to a short name.
function shortName(variationLongName) {
	if ( ! variationLongName ) {
		return "u";
	}

	if (variationLongName === "control") {
		return "c";
	} else if (variationLongName === "none") {
		return "n";
	} else if (variationLongName.indexOf("variation") === 0 && variationLongName.length >= 10) {
		const variationNumber = variationLongName.slice(9);
		if (strToInt(variationNumber) > 0) {
			return "v" + variationNumber;
		} else {
			return "u";
		}
	} else {
		return "u";
	}
}

// longName converts a variation short name to a long name.
function longName(variationShortName) {
	if ( ! variationShortName ) {
		return "unset";
	}

	if (variationShortName === "c") {
		return "control";
	} else if (variationShortName === "n") {
		return "none";
	} else if (variationShortName.indexOf("v") === 0 && variationShortName.length >= 2) {
		const variationNumber = variationShortName.slice(1);
		if (strToInt(variationNumber) > 0) {
			return "variation" + variationNumber;
		} else {
			return "unset";
		}
	} else {
		return "unset";
	}
}

// strToInt converts a string to an integer. If the string is not a number, it returns null.
function strToInt(num)
{
	let total_value = 0;

	if(num)
	{
		for(let char_index = 0; char_index < num.length; char_index++)
		{
			let digit_value = 0;
			let current_letter = num.charAt(char_index);

			if(current_letter === "1")
			{
				digit_value = 1;
			}
			else if (current_letter === "2")
			{
				digit_value = 2;
			}
			else if (current_letter === "3")
			{
				digit_value = 3;
			}
			else if (current_letter === "4")
			{
				digit_value = 4;
			}
			else if (current_letter === "5")
			{
				digit_value = 5;
			}
			else if (current_letter === "6")
			{
				digit_value = 6;
			}
			else if (current_letter === "7")
			{
				digit_value = 7;
			}
			else if (current_letter === "8")
			{
				digit_value = 8;
			}
			else if (current_letter === "9")
			{
				digit_value = 9;
			}
			else if (current_letter !== "0")
			{
				return null;
			}

			total_value += digit_value * Math.pow(10, num.length - char_index - 1);
		}
	} else {
		return null;
	}

	return total_value;
}

// parseTestsVariations parses a string of tests variations into an array of objects.
// [123:v1,456:v2,789:v3,345:u,678:n] => [{id: 123, variation: variation}, {id: 456, variation: variation2}, {id: 789, variation: variation3}, {id: 345, variation: unset}, {id: 678, variation: none}]
function parseTestsVariations(testsVariations) {

	if ( ! testsVariations ) {
		return [];
	}

	// Split the string into an array of key-value pairs.
	const pairs = testsVariations.slice(1, -1).split(',');

	const results = [];

	const firstChar = testsVariations.slice(0, 1);
	const lastChar = testsVariations.slice(-1);

	if (firstChar !== "[" || lastChar !== "]") {
		return results;
	}

	for (const pair of pairs) {
		const keyValue = pair.split(':');

		const key = strToInt(keyValue[0]);
		const value = longName(keyValue[1]);

		if (key > 0) {
			const result = {
				id: key,
				variation: value
			};
			results.push(result);
		}
	}

	return results;
}

// serializeTestsVariations serializes an array of tests variations into a string.
// [{id: 123, variation: variation}, {id: 456, variation: variation2}, {id: 789, variation: variation3}, {id: 345, variation: unset}, {id: 678, variation: none}] => [123:v1,456:v2,789:v3,345:u,678:n]
function serializeTestsVariations(testsVariations) {
	const pairs = [];

	for (const testVariation of testsVariations) {
		const pair = testVariation.id + ":" + shortName(testVariation.variation);
		pairs.push(pair);
	}

	return "[" + pairs.join(',') + "]";
}

function setTestVariation(testsVariations, testId, variation) {
	const testVariation = {
		id: testId,
		variation: variation
	};

	const newTestsVariations = [];

	let found = false;

	for (const currentTestVariation of testsVariations) {
		if (currentTestVariation.id === testId) {
			newTestsVariations.push(testVariation);
			found = true;
		} else {
			newTestsVariations.push(currentTestVariation);
		}
	}

	if ( ! found ) {
		newTestsVariations.push(testVariation);
	}

	return newTestsVariations;
}

// check if the user is in Nantu off mode
// Nantu off mode is set using a cookie or the query parameter nantu_mode=off
function isNantuOff() {
	if (queryPermission('get_url', 'query')) {
		const nantuModeQuery = getUrl('query');

		if (nantuModeQuery.indexOf(nantuModeQueryVariableName + "=off") !== -1) {
			return true;
		}
	}

	return false;
}

//Check if the user is in QA mode
//QA Mode is set using a cookie or the query parameter nantu_mode=qa
function isInQAMode() {
	if (queryPermission('get_cookies', nantuModeCookieName)) {
		const nantuModeCookie = getCookieValues(nantuModeCookieName).join('');

		if (nantuModeCookie === "qa" || hasQAQuery()) {
			return true;
		}
	}

	return false;
}

function hasQAQuery() {
	if (queryPermission('get_url', 'query')) {
		const nantuModeQuery = getUrl('query');

		if (nantuModeQuery.indexOf(nantuModeQueryVariableName + "=qa") !== -1) {
			return true;
		}
	}

	return false;
}

//set the QA mode cookie
function setQAModeCookie() {
	// Set Cookie Permissions
	const options = {
		'domain': 'auto',
		'path': '/',
		'max-age': 60*60,
		'secure': true
	};

	if (queryPermission('set_cookies', nantuModeCookieName, options)) {
		setCookie(nantuModeCookieName, 'qa', options);
	}
}

// display log messages in the console if nantu is in QA mode, also include the test index
function testLog(message1, message2) {
	if (isInQAMode()) {
		log("Nantu Test " + data.test_index + ": " + message1, message2);
	}
}

function getDeviceType(userAgent) {
	if (isDesktopBrowser(userAgent)) {
		return "desktop";
	}


	return "excluded";
}

function getNumberAfterString(text, string) {
	const index = text.indexOf(string);

	if (index !== -1) {
		let startOfNumberIndex = index + string.length;
		let endOfNumberIndex = startOfNumberIndex;
		while (endOfNumberIndex < text.length) {
			if (strToInt(text[endOfNumberIndex]) !== null) {
				endOfNumberIndex++;
			} else {
				break;
			}
		}

		const number = text.slice(startOfNumberIndex, endOfNumberIndex);

		return strToInt(number);
	}

	return null;
}

function isAllowedDomain(domain, testData) {
	for (const allowed_domain of testData.allowed_domains) {
		if (allowed_domain.domain === domain) {
			return true;
		}
	}

	return false;
}

function getSelectedVariation(savedVariations, testData) {
	for (const savedVariation of savedVariations) {
		if (savedVariation.id === strToInt(testData.test_index)) {
			return savedVariation.variation;
		}
	}

	return "unset";
}

function getVariationName(variation, testData) {
	for (const variationData of testData.variations) {
		if (variationData.id === variation) {
			return variationData.name;
		}
	}

	return "unknown";
}


function selectRandomVariation(testData) {
	const variations = testData.variations;

	let maxWeight = 0;

	for (const variation of variations) {
		maxWeight += strToInt(variation.weight);
	}

	const randomWeight = generateRandom(0, maxWeight - 1);

	let currentWeight = 0;

	for (const variation of variations) {
		currentWeight += strToInt(variation.weight);
		if (randomWeight < currentWeight) {
			return variation.id;
		}
	}

	return "unset";
}

function isSafari(userAgent) {
	const supportedPlatforms = ['Macintosh', 'iPhone', 'iPad'];

	let platformIndex = -1;

	for (const platform of supportedPlatforms) {
		if (userAgent.indexOf(platform) > -1) {
			platformIndex = userAgent.indexOf(platform);
			break;
		}
	}

	if (platformIndex > -1) {
		const safariVersion = getNumberAfterString(userAgent.slice(platformIndex), "Version/");

		if (safariVersion > 0) {
			return true;
		}
	}

	return false;
}

function isDesktopBrowser(userAgent) {
	const supportedPlatforms = ['Linux x86_64', 'Mac OS', 'Windows NT'];
	const supportedBrowsers = [
		{
			name: 'Firefox',
			versionPrefix: 'Firefox/',
			minVersion: 70
		},
		{
			name: 'Chrome',
			versionPrefix: 'Chrome/',
			minVersion: 80,
		}
	];

	const supportedSafari = {
		versionPrefix: 'Version/',
		minVersion: 14
	};

	let platformIndex = -1;

	for (const platform of supportedPlatforms) {
		if (userAgent.indexOf(platform) > -1) {
			platformIndex = userAgent.indexOf(platform);
			break;
		}
	}

	const macintoshString = 'Macintosh;';

	const macintoshIndex = userAgent.indexOf('Macintosh;');

	if (platformIndex === -1 && macintoshString === -1) {
		return false;
	}

	if (platformIndex > -1) {
		const platform = userAgent.slice(platformIndex);

		for (const browser of supportedBrowsers) {
			const browserIndex = platform.indexOf(browser.name);

			if (browserIndex > -1) {
				const browserVersion = getNumberAfterString(platform.slice(browserIndex), browser.versionPrefix);

				if (browserVersion >= browser.minVersion) {
					return true;
				}
			}
		}
	}

	if (macintoshString > -1) {
		const platform = userAgent.slice(macintoshIndex);

		const browserVersion = getNumberAfterString(platform, supportedSafari.versionPrefix);

		if (browserVersion >= supportedSafari.minVersion) {
			return true;
		}
	}

	return false;
}
