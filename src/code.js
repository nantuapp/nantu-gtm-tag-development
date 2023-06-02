// API imports
const Math = require('Math');
const log = require('logToConsole');
const queryPermission = require('queryPermission');
const localStorage = require('localStorage');
const generateRandom = require('generateRandom');
const getCookieValues = require('getCookieValues');
const getUrl = require('getUrl');
const setCookie = require('setCookie');

// Constants
const nantuModeCookieName = 'nantu_mode';
const nantuModeQueryVariableName = 'nantu_mode';


if (isNantuOff()) {
	log("Nantu is off");
	data.gtmOnSuccess();
	return;
}

if (hasQAQuery()) {
	setQAModeCookie();
}

log("Is in QA mode: " + isInQAMode());

/* Get Permissions*/
// localStorage Permissions
const nantuTestsKey = 'nantu_tests';
let savedNantuTests = "[]";
if (queryPermission('access_local_storage', 'readwrite', nantuTestsKey)) {
	savedNantuTests = localStorage.getItem(nantuTestsKey);
}

// URL Permissions
if (queryPermission('get_url', 'host')) {
	const domain = getUrl('host');
}

const nantuTests = parseTestsVariations(savedNantuTests);

/*--include:helpers/helpers.js:--*/
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
/*--includeend--*/

/*-------------------*/

const copyFromWindow = require('copyFromWindow');
const getCookieValues = require('getCookieValues');
const createQueue = require('createQueue');
const dataLayerPush = createQueue('dataLayer');
const generateRandom = require('generateRandom');

const inflow_host = copyFromWindow('inflow_host');
const inflow_query_vars = copyFromWindow('inflow_query_variables');
const inflow_qa_cookie = getCookieValues('inflow_cookie');
const inflow_get_cookie_value = copyFromWindow('inflow_get_cookie_value');
const inflow_set_cookie_value = copyFromWindow('inflow_set_cookie_value');
const inflow_device_type = copyFromWindow('inflow_device_type');
const inflow_execute_test = copyFromWindow('inflow_execute_test');
const inflow_get_geoip = copyFromWindow('inflow_get_geoip');
const inflow_set_variation_cookie = copyFromWindow('inflow_set_variation_cookie');
const inflow_is_in_test_window = copyFromWindow('inflow_is_in_test_window');
const inflow_is_cross_domain_test = copyFromWindow('inflow_is_cross_domain_test');
const inflow_environment = copyFromWindow('inflow_environment');

var test_has_been_executed = false;

const desktop_device_type = "desktop";
const tablet_device_type = "tablet";
const mobile_device_type = "mobile";
const excluded_device_type = "excluded";

if(data.qa_mode && is_in_qa_mode() == false)
{
	test_log("This test is QA only");
	return;
}
else if(typeof(inflow_device_type) == "string")
{
	if((inflow_device_type == desktop_device_type && data.desktop) || (inflow_device_type == tablet_device_type && data.tablet) || (inflow_device_type == mobile_device_type && data.mobile))
	{
		test_log("allowed device type", inflow_device_type);

		if(is_domain_allowed(inflow_host))
		{
			test_log("allowed domain", inflow_host);

			if(is_in_test_window())
			{
				test_log("pass test window check");

				if(data.qa_mode)
				{
					if(is_in_qa_mode())
					{
						execute_test();
					}
					else
					{
						test_log("test is QA only");
					}
				}
				else
				{
					execute_test();
				}
			}
			else
			{
				if(data.qa_mode && is_in_qa_mode())
				{
					test_log("doesn't pass test window check but is in QA mode");

					execute_test();
				}
				else
				{
					test_log("doesn't pass test window check");
				}
			}
		}
		else
		{
			test_log("not allowed domain", inflow_host);
		}
	}
	else
	{
		test_log("not allowed device type", inflow_device_type);	
	}
}
function is_in_qa_mode()
{
	if(inflow_query_vars.indexOf("inflow=qa") > -1 || inflow_query_vars.indexOf("inflow-qa") > -1 || inflow_qa_cookie == "qa")
	{
		return true;
	}
	else
	{
		return false;
	}
}

function is_in_test_window()
{
	if(data.test_window_enabled)
	{
		return inflow_is_in_test_window(data);
	}
	else
	{
		test_log("test window is not enabled");

		return true;
	}
}

function execute_test()
{
	test_log("execute test", data.test_index);
	inflow_execute_test(data);
}

function is_domain_allowed(inflow_host)
{
	data.allowed_domains.forEach(function(allowed_domain){
		if(allowed_domain.domain == inflow_host)
		{
			return true;
		}
	});

	return false;
}

function test_log(value1, value2)
{
	if(is_in_qa_mode())
	{
		log("nantu_" + data.test_index + ": " + value1, value2);
	}
}

test_log('data =', data);

// Call data.gtmOnSuccess when the tag is finished.
data.gtmOnSuccess();
