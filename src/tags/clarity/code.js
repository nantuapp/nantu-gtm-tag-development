const injectScript = require('injectScript');
const queryPermission = require('queryPermission');
const createArgumentsQueue = require('createArgumentsQueue');
const encodeUri = require('encodeUri');
const log = require('logToConsole');
const callLater = require('callLater');
const getTimestampMillis = require('getTimestampMillis');

var lastCall = 0; 

var clarityExternal;



function sendClarityEvent() {
	/*if (queryPermission('access_globals', 'clarity', 'read')) {
		clarity = copyFromWindow('clarity');
	} else {
		log('Cannot access clarity');
		data.gtmOnFailure();
		return;
	}*/

	var now = getTimestampMillis();

	if (now - lastCall < 1000) {
		callLater(sendClarityEvent);
		return;
	}

	lastCall = now;

	if (typeof clarityExternal != 'undefined') {
		log('Sending Clarity event');
		data.gtmOnSuccess();
	} else {
		callLater(sendClarityEvent);
	}
}

/*if (queryPermission('access_globals', 'clarity', 'read')) {
	clarity = copyFromWindow('clarity');
}*/

if (data.has_clarity === false) {
	const clarity = createArgumentsQueue('clarity', 'clarity.q');

	clarity("set", "test", "variation");

	// Reconstruct customer clarity script URL
	const url = "https://www.clarity.ms/tag/"+encodeUri(data.clarity_project_id)+"?ref=gtm";

	// Handle Success
	const onCustomerSuccess = () => {
		sendClarityEvent();
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
	// Clarity is already loaded
	sendClarityEvent();
}
