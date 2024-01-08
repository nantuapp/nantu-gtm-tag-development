// Description: Nantu Add on - Microsoft Clarity setup
// Author: Juan Castro
// Last modified: 2023-10-25
// License: Apache 2.0
// Version: 1.0.0

const injectScript = require('injectScript');
const queryPermission = require('queryPermission');
const createArgumentsQueue = require('createArgumentsQueue');
const encodeUri = require('encodeUri');
const log = require('logToConsole');
const copyFromWindow = require('copyFromWindow');
const copyFromDataLayer = require('copyFromDataLayer');

const nantuEventPrefix = 'nantu_';
const nantuEventPrefixLength = nantuEventPrefix.length;

const nantuEventExecute = '_execute_';
const nantuEventExecuteLength = nantuEventExecute.length;

const eventName = copyFromDataLayer('event');

if (eventName.indexOf(nantuEventPrefix) === -1) {
	log('Nantu Add on should be used only with Nantu events');
	data.gtmOnFailure();
	return;
}

const executeIndex = eventName.indexOf(nantuEventExecute);

if (executeIndex === -1) {
	log('Error with event name' + eventName);
	data.gtmOnFailure();
	return;
}

if (data.all_tests === false) {
	const testIndex = eventName.indexOf(nantuEventPrefixLength, executeIndex - nantuEventPrefixLength);

	log('Test index: ' + testIndex);
}

const testName = eventName.substring(0, executeIndex);
const testVariation = eventName.substring(executeIndex + nantuEventExecuteLength);

var clarity;

const clarityCheck = copyFromWindow('clarity');

if (typeof clarityCheck != 'undefined') {
	log('Clarity is already loaded');
	clarity = copyFromWindow('clarity');
} else {
	log('Clarity is not loaded');
	clarity = createArgumentsQueue('clarity', 'clarity.q');
}

clarity("set", testName, testVariation);


if (data.has_clarity === false) {
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
		injectScript(url, onCustomerSuccess, onCustomerFailure);
	} else {
		data.gtmOnFailure();
	}
} else {
	data.gtmOnSuccess();
}