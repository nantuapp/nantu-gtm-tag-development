// Description: Cookie Template
// Author: Juan Castro
// Last modified: 2024-09-30
// License: Apache 2.0
// Version: 1.0.2

// What's new 
// Fix environment cookie issue

// API imports
const queryPermission = require('queryPermission');
const setCookie = require('setCookie');
const copyFromDataLayer = require('copyFromDataLayer');
const getUrl = require('getUrl');

// Constants
const nantuModeCookieName = 'nantu_mode';
const nantuModeQueryVariableName = 'nantu_mode';
const nantuQAModeEventName = 'nantu_qa_mode';

if(data.cookieType == "nantu_mode") {

  if (isNantuQAModeEvent() || hasQAQuery()) {
	setNantuCookie("nantu_mode");
  }
}

if(data.cookieType == "nantu_environment") {
  if (hasEnvironmentQuery()) {
    setNantuCookie("nantu_environment");
  }
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

		if (nantuModeQuery.indexOf("nantu_mode=qa") !== -1) {
			return true;
		}
	}

	return false;
}

function hasEnvironmentQuery() {
    if (queryPermission('get_url', 'query')) {
		const nantuEnvironmentQuery = getUrl('query');

		if (nantuEnvironmentQuery.indexOf("nantu_environment=qa") !== -1) {
			return true;
		}
	}

	return false;
}

//set the QA mode cookie
function setNantuCookie(cookieName) {
	// Set Cookie Permissions
	const options = {
		'domain': 'auto',
		'path': '/',
		'max-age': 60*60,
		'secure': true
	};

	if (queryPermission('set_cookies', cookieName, options)) {
		setCookie(cookieName, 'qa', options);
	}
}