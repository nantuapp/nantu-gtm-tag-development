/*
--Nantu A/B Test Standalone template--

Developers Note: replace all "nantu_x" ocurrences. Use a unique id that matches the clickup card ID for every test to avoid name collisions
*/
(function(window, document){

const data = {
	experimentName: "Exp Name",
	testIndex: "123",
	testWindowEnabled: false, 
	testWindowEnd: "12/31/2029",
	testWindowStart: "07/26/2024",
	allowedDomain: "localhost",
	variations: [
		{ 
			id: "control", 
			name: "Control", 
			weight: "50" 
		},
		{ 
			id: "variation1", 
			name: "Variation 1", 
			weight: "50" 
		},
	],
	qaOnly: true,
};

const log = console.log;
const queryPermission = function() {
	return true;
};
const generateRandom = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getCookieValues = function (name, decode = true) {
  // Get all cookies as a string
  const cookies = document.cookie;
  
  // Split cookies into individual key-value pairs
  const cookieArray = cookies.split('; ');
  
  // Filter cookies that match the given name and extract their values
  const values = cookieArray
    .filter(cookie => cookie.startsWith(name + '='))
    .map(cookie => cookie.split('=')[1]);
  
  // Decode values if specified
  if (decode) {
    return values.map(value => decodeURIComponent(value));
  }
  
  return values;
};
const getUrl = function(component) {
  const url = new URL(window.location.href);
  
  switch (component) {
    case 'protocol':
      return url.protocol.slice(0, -1); // Remove the trailing ':'
    case 'host':
      return url.hostname;
    case 'port':
      return url.port || (url.protocol === 'https:' ? '443' : '80');
    case 'path':
      return url.pathname;
    case 'query':
      return url.search.slice(1); // Remove the leading '?'
    case 'extension':
      const match = url.pathname.match(/\.([^.]+)$/);
      return match ? match[1] : '';
    case 'fragment':
      return url.hash.slice(1); // Remove the leading '#'
    default:
      return url.href;
  }
};
const setCookie = function (name, value, options = {}, encode = true) {
  if (typeof name !== 'string' || name === '') {
    throw new Error('Cookie name must be a non-empty string');
  }

  let cookieString = `${encodeURIComponent(name)}=`;

  if (value !== null && value !== undefined) {
    cookieString += encode ? encodeURIComponent(value) : value;
  }

  if (options.domain) {
    if (options.domain === 'auto') {
      const domainParts = location.hostname.split('.');
      let domain = '';
      for (let i = domainParts.length - 1; i >= 0; i--) {
        domain = '.' + domainParts[i] + domain;
        document.cookie = `${cookieString};domain=${domain};path=/;max-age=1`;
        if (document.cookie.indexOf(name) !== -1) {
          cookieString += `;domain=${domain}`;
          break;
        }
      }
    } else {
      cookieString += `;domain=${options.domain}`;
    }
  }

  if (options.path) {
    cookieString += `;path=${options.path}`;
  }

  if (options['max-age']) {
    cookieString += `;max-age=${options['max-age']}`;
  }

  if (options.expires) {
    cookieString += `;expires=${options.expires}`;
  }

  if (options.secure) {
    cookieString += ';secure';
  }

  if (options.samesite) {
    cookieString += `;samesite=${options.samesite}`;
  }

  document.cookie = cookieString;
};
const getType = function (value) {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
};
const getTimestampMillis = function () {
  return Date.now();
}
const decode = decodeURIComponent;


// Constants
const nantuModeCookieName = 'nantu_mode';
const nantuModeQueryVariableName = 'nantu_mode';
const nantuVersion = '1.0.0';
const nantuVariationsQueryName = 'nantu_variations';

if (isNantuOff()) {
	log("Nantu is off");
	return;
}

if (hasQAQuery()) {
	log("QA mode is on, setting QA cookie");
	setQAModeCookie();
}

testLog("Nantu Version: " + nantuVersion);

/* Get Permissions*/
// localStorage Permissions
const nantuTestsKey = 'nantu_tests';
let savedNantuTests = "[]";
if (queryPermission('access_local_storage', 'readwrite', nantuTestsKey)) {
	savedNantuTests = localStorage.getItem(nantuTestsKey);
} else {
	log("Nantu can't access local storage");
	return;
}

var domain = "unset";

// URL Permissions
if (queryPermission('get_url', 'host')) {
	domain = getUrl('host');
}

if (domain === "unset") {
	log("Nantu can't get the domain:" + domain);
	return;
}

if (! isAllowedDomain(domain, data)) {
	log("Nantu test is not allowed on this domain: " + domain);
	return;
}

if (data.testWindowEnabled === true) {
	const gaTimestamp = getGACookieTimestamp();

	const getGADays = Math.floor(gaTimestamp / 86400);

	const getStartDays = getDaysFrom1970(data.testWindowStart);
	const getEndDays = getDaysFrom1970(data.testWindowEnd);

	if ( ! (getGADays >= getStartDays && getGADays <= getEndDays)) {
		testLog("Nantu test is not running. First visit timestamp:" + gaTimestamp);
		return;
	}
}

var nantuTests = parseTestsVariations(savedNantuTests);

const variationFromURL = getVariationFromURL();

var selectedVariation = getSelectedVariation(nantuTests, data);

if (variationFromURL !== null) {
	selectedVariation = variationFromURL;

	nantuTests = setTestVariation(nantuTests, data.testIndex, selectedVariation);

	localStorage.setItem(nantuTestsKey, serializeTestsVariations(nantuTests));
	testLog("Forcing Variation: " + selectedVariation);
}

if (selectedVariation == "unset") {
	selectedVariation = selectRandomVariation(data);

	nantuTests = setTestVariation(nantuTests, data.testIndex, selectedVariation);

	localStorage.setItem(nantuTestsKey, serializeTestsVariations(nantuTests));
	testLog("Setting Variation: " + selectedVariation);
}

var testVariations = [];

for (let variationIndex = 0; variationIndex < data.variations.length; variationIndex++) {
	const variation = data.variations[variationIndex];

	testVariations.push(variation.id);
}


if (data.qaOnly === false || data.qaOnly === true && isInQAMode()) {
	window.nantu_x_test_id = data.testIndex;
	window.nantu_x_experiment = data.experimentName;
	window.nantu_x_selected_variation = selectedVariation;
	window.nantu_x_variations = testVariations.join(",");
	window.nantu_x_variation_name = getVariationName(selectedVariation, data);

	nantu_x_setup_trigger();
}

function getVariationFromURL() {
	if (queryPermission('get_url', 'query')) {
		const nantuVariationsQuery = decode(getUrl('query'));

		const nantuVariationsIndex = nantuVariationsQuery.indexOf(nantuVariationsQueryName);

		if (nantuVariationsIndex > -1) {
			const nantuVariationsQueryValue = nantuVariationsQuery.slice(nantuVariationsIndex + nantuVariationsQueryName.length + 1);

			const nantuVariationsQueryValueEnd = nantuVariationsQueryValue.indexOf('&');

			var variationsValues = "";

			if (nantuVariationsQueryValueEnd > -1) {
				variationsValues = nantuVariationsQueryValue.slice(0, nantuVariationsQueryValueEnd);
			} else {
				variationsValues = nantuVariationsQueryValue;
			}

			const queryVariations = parseTestsVariations("[" + variationsValues + "]");

			for (let variationIndex = 0; variationIndex < queryVariations.length; variationIndex++) {
				const variation = queryVariations[variationIndex];

				if (variation.id == data.testIndex) {
					return variation.variation;
				}
			}
		}
	}

	return null;
}


/*--include:../tags/abtest/helpers/helpers.js:--*/
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
	if(getType(num) == "number")
	{
		return num;
	}

	let total_value = 0;

	if(num) {
		for(let char_index = 0; char_index < num.length; char_index++) {
			let digit_value = 0;
			let current_letter = num.charAt(char_index);

			if(current_letter === "1") {
				digit_value = 1;
			}
			else if (current_letter === "2") {
				digit_value = 2;
			}
			else if (current_letter === "3") {
				digit_value = 3;
			}
			else if (current_letter === "4") {
				digit_value = 4;
			}
			else if (current_letter === "5") {
				digit_value = 5;
			}
			else if (current_letter === "6") {
				digit_value = 6;
			}
			else if (current_letter === "7") {
				digit_value = 7;
			}
			else if (current_letter === "8") {
				digit_value = 8;
			}
			else if (current_letter === "9") {
				digit_value = 9;
			}
			else if (current_letter !== "0") {
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
		if (currentTestVariation.id == testId) {
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


function getGACookieTimestamp() {

	const GACookieName = "_ga";

	if (queryPermission('get_cookies', GACookieName)) {
		const gaCookieValue = getCookieValues(GACookieName).join('');

		const cookieParts = gaCookieValue.split(".");

		const gaTimestamp = strToInt(cookieParts[cookieParts.length - 1]);

		if(gaTimestamp > 0)
		{
			return gaTimestamp;
		}

	} else {
		return 0;
	}
	
	return Math.floor(getTimestampMillis()/1000);
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
		log("Nantu Test " + data.testIndex + ": " + message1, message2);
	}
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
	if (testData.allowedDomain === domain) {
		return true;
	}

	return false;
}

function getSelectedVariation(savedVariations, testData) {
	for (const savedVariation of savedVariations) {
		if (savedVariation.id === strToInt(testData.testIndex)) {
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

function getDaysFrom1970(dateString) {
	const dateParts = dateString.split('/');

	if (dateParts.length !== 3) {
		return 0;
	}

	const month = strToInt(dateParts[0]);
	const day = strToInt(dateParts[1]);
	const year = strToInt(dateParts[2]);

	// Days per month (assuming non-leap year for February)
	const daysPerMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// Calculate the total number of days from the Unix Epoch to the given date
	let totalDays = 0;

	for (let y = 1970; y < year; y++) {
		totalDays += isLeapYear(y) ? 366 : 365;
	}

	for (let m = 1; m < month; m++) {

		totalDays += daysPerMonth[m];


		if (m === 2 && isLeapYear(year)) {
			totalDays += 1; // February has 29 days in a leap year
		}

	}
	totalDays += day - 1; // Subtract 1 as the Unix Epoch starts from January 1, 1970

	return totalDays;
}

function isLeapYear(year) {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/*--includeend--*/

})(window, document);

var nantu_x_test_version = 1; //Increase this number every time the test is being changed after receiving feedback from QA
var nantu_x_debug = false; // Set to false to turn off debug log messages

var nantu_x_variation_name = "{{nantu_variation_name}}";

if("qa" === "{{nantu_mode_cookie}}" || "qa" === "{{nantu_mode_query_var}}" || localStorage.getItem("nantu_log_enable") == "yes") {
	nantu_x_debug = true;
}

// log message in the browser log
function nantu_x_log(nantu_x_message) {
	if (nantu_x_debug || localStorage.nantu_x_debug == "yes") {
		console.log("nantu_x:" + nantu_x_message);
	}
}
// Send data to data layer
function nantu_x_push_to_data_layer() {
	if (typeof(nantu_qa_show_test) == "function") {
		nantu_qa_show_test(nantu_x_test_id, nantu_x_selected_variation, nantu_x_test_version, nantu_x_variations, true);
	}

	var nantu_ga4_data = {
		"nantu_version" : "1.0",
		"nantu_ab_test_experiment_name" : nantu_x_experiment,
		"nantu_ab_test_variation" : nantu_x_variation_name,
		"nantu_ab_test_index" : nantu_x_test_id
	};

	nantu_x_log("setting GA4 user property: nantu_ab_test" + nantu_x_test_id + " to " + nantu_x_variation_name);

	var nantu_ga4_data_string = JSON.stringify(nantu_ga4_data);

	if (nantu_ga4_data_string != window.nantu_ga4_data_sent) {
		//only push data if it is the first time or data has been changed
		window.nantu_ga4_data_sent = nantu_ga4_data_string;

		nantu_ga4_event_id = "nantu_ab_test" + nantu_x_test_id;

		if(localStorage.getItem(nantu_ga4_event_id) != nantu_x_variation_name) {
			nantu_ga4_data["event"] = "nantu_ab_test" + nantu_x_test_id;

			nantu_ga4_data["eventTimeout"] = 2000;

			nantu_ga4_data["eventCallback"] = function() {
        			localStorage.setItem(nantu_ga4_event_id, nantu_x_variation_name);
      			}

			if (typeof(window.dataLayer) === "undefined") {
				window.dataLayer = window.dataLayer || [];
			}


			window.dataLayer.push(nantu_ga4_data);
		}
	}
}

function nantu_x_is_target_page() {
	if(document.querySelectorAll("body").length > 0) {
		return true;
	}

	return false;
}


function nantu_x_setup_trigger() {
	nantu_x_log("document ready state: " + document.readyState);

	if (document.readyState === "interactive" || document.readyState === "complete") {
		if (nantu_x_is_target_page()) {
			nantu_x_execute_test();
		}
	} else {
		document.addEventListener("DOMContentLoaded", function () {
			if (nantu_x_is_target_page()) {
				nantu_x_execute_test();
			}
		});
	}		
}


// Execute the test
function nantu_x_execute_test() {
	if (typeof(nantu_qa_show_test) == "function") {
		nantu_qa_show_test(nantu_x_test_id, nantu_x_selected_variation, nantu_x_test_version, nantu_x_variations, false);
	}

	// don't run if test is off
	if (/^(unknown|none)$/.test(nantu_x_selected_variation) === false) {

		//The code of the A/B test variations goes here

		// Revealing the page if anti-flicker is enabled
		window.nantu_unhide = true;
		document.body.classList.remove("nantu_antiflicker");

		// Push data to data layer to track the test results
		nantu_x_push_to_data_layer();

		if(nantu_x_selected_variation !== "control") {
			nantu_x_change_page();
		}

		// End of A/B test variations code
	}
}

function nantu_x_change_page() {
	//The code to change the page goes here
	
	document.body.classList.add("nantu_x_variation_" + nantu_x_selected_variation);

	nantu_x_add_css_code();
}

function nantu_x_add_css_code() {
	const css_code = `
	/* Add your CSS code here */
	`;
	const style = document.createElement('style');
	style.innerHTML = css_code;
	document.head.appendChild(style);
}
