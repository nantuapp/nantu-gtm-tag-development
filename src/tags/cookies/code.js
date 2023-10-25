// Description: Cookie Template
// Author: Juan Castro
// Last modified: 2023-10-24
// License: Apache 2.0
// Version: 1.0.0

// API imports
const queryPermission = require('queryPermission');
const setCookie = require('setCookie');
const copyFromDataLayer = require('copyFromDataLayer');
const getUrl = require('getUrl');

// Constants
const nantuModeCookieName = 'nantu_mode';
const nantuModeQueryVariableName = 'nantu_mode';
const nantuQAModeEventName = 'nantu_qa_mode';


if (isNantuQAModeEvent() || hasQAQuery()) {
	setQAModeCookie();
}

data.gtmOnSuccess();

function isNantuQAModeEvent() {
	if (queryPermission('read_data_layer', 'event')) {
		const dlEvent = copyFromDataLayer('event');

		if (dlEvent === nantuQAModeEventName) {
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

