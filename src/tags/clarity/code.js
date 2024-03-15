// Description: Nantu Add on - Microsoft Clarity setup
// Author: Juan Castro
// Last modified: 2023-10-25
// License: Apache 2.0
// Version: 1.0.1
//
// What's new?
// Fix Specific test targeting

const injectScript = require('injectScript');
const queryPermission = require('queryPermission');
const createArgumentsQueue = require('createArgumentsQueue');
const encodeUri = require('encodeUri');
const log = require('logToConsole');
const copyFromWindow = require('copyFromWindow');
const copyFromDataLayer = require('copyFromDataLayer');
const setInWindow = require('setInWindow');
const getCookieValues = require('getCookieValues');
const getUrl = require('getUrl');

const nantuInjectedFlag = 'nantu_clarity_injection';

const nantuEventPrefix = 'nantu_';
const nantuEventPrefixLength = nantuEventPrefix.length;

const nantuEventExecute = '_execute_';
const nantuEventExecuteLength = nantuEventExecute.length;

const eventName = copyFromDataLayer('event');

// Constants
const nantuModeCookieName = 'nantu_mode';
const nantuModeQueryVariableName = 'nantu_mode';

if (eventName.indexOf(nantuEventPrefix) === -1) {
	nantuLog('Nantu Add on should be used only with Nantu events');
	data.gtmOnFailure();
	return;
}

const executeIndex = eventName.indexOf(nantuEventExecute);

if (executeIndex === -1) {
	nantuLog('Error with event name' + eventName);
	data.gtmOnFailure();
	return;
}

const testName = eventName.substring(0, executeIndex);
const testVariation = eventName.substring(executeIndex + nantuEventExecuteLength);

if (data.all_tests === false) {
	const testIndex = testName.substring(nantuEventPrefixLength);

	var isTestAllowed = false;

	for(var i = 0; i < data.tests_list.length; i++) {
		if (testIndex === data.tests_list[i].index) {
			isTestAllowed = true;
			break;
		}
	}

	if (isTestAllowed === false) {
		nantuLog('Clarity not enabled for test: ' + testIndex);
		data.gtmOnSuccess();
		return;
	}
}


var clarity;

const clarityCheck = copyFromWindow('clarity');

if (typeof clarityCheck != 'undefined') {
	nantuLog('Clarity is already loaded');
	clarity = copyFromWindow('clarity');
} else {
	nantuLog('Clarity is not loaded');
	clarity = createArgumentsQueue('clarity', 'clarity.q');
}

nantuLog('Clarity set custom tag: ', testName, testVariation);
clarity("set", testName, testVariation);


const clarityInjectedAlready = copyFromWindow(nantuInjectedFlag);

if(clarityInjectedAlready === true) {
	nantuLog('Clarity script already injected');
	data.gtmOnSuccess();
	return;
}

if (data.has_clarity === false && ! clarityInjectedAlready) {
	// Reconstruct customer clarity script URL
	const url = "https://www.clarity.ms/tag/"+encodeUri(data.clarity_project_id)+"?ref=gtm";

	// Handle Success
	const onCustomerSuccess = () => {
		data.gtmOnSuccess();
	};

	// Handle Failure
	const onCustomerFailure = () => {
		data.gtmOnFailure();
	};

	// If the URL input by the user matches the permissions set for the template,
	// inject the script with the onSuccess and onFailure methods as callbacks.
	if (queryPermission('inject_script', "https://www.clarity.ms")) {
		nantuLog('Injecting Clarity script');
		setInWindow(nantuInjectedFlag, true, true);
		injectScript(url, onCustomerSuccess, onCustomerFailure);
	} else {
		data.gtmOnFailure();
	}
} else {
	data.gtmOnSuccess();
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

// display log messages in the console if nantu is in QA mode, also include the test index
function nantuLog(message1, message2, message3) {
	if (isInQAMode()) {
		log("Nantu Clarity: " + message1, message2, message3);
	}
}

