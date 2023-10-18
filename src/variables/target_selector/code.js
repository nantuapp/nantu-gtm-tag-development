const queryPermission = require('queryPermission');
const copyFromWindow = require('copyFromWindow');
const makeInteger = require('makeInteger');
const getCookieValues = require('getCookieValues');
const getUrl = require('getUrl');
//const log = require('logToConsole');

const nantuModeCookieName = 'nantu_mode';
const nantuModeQueryVariableName = 'nantu_mode';

var return_value = 'yes';

var nantu_device = getVariableValue('nantu_device');
var nantu_browser = getVariableValue('nantu_browser');
var nantu_browser_type = getVariableValue('nantu_browser_type');
var nantu_browser_version = getVariableValue('nantu_browser_version');

var nantu_source = getVariableValue('nantu_source');
var nantu_medium = getVariableValue('nantu_medium');
var nantu_campaign = getVariableValue('nantu_campaign');

function getTotalElements(selector) {
	if (queryPermission('access_globals', 'read', 'nantuGetTotalElements')) {
		const nantuGetTotalElements = copyFromWindow('nantuGetTotalElements');

		return nantuGetTotalElements(selector);
	}

	return 0;
}

function getVariableValue(variableName) {
	if (queryPermission('access_globals', 'read', variableName)) {
		return copyFromWindow(variableName);
	}

	if(variableName === 'nantu_browser_version') {
		return 0;
	}

	return "unknown";
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

function isAllowedURL(type, condition, value) {
	if (queryPermission('get_url', type)) {
		var url = getUrl(type);

		if (condition === 'contains') {
			if (url.indexOf(value) !== -1) {
				return true;
			}
		} else if (condition === 'equals') {
			if (url === value) {
				return true;
			}
		} else if (condition === 'starts') {
			if (url.indexOf(value) === 0) {
				return true;
			}
		} else if (condition === 'ends') {
			if (url.indexOf(value) === url.length - value.length) {
				return true;
			}
		}
	}

	return false;
}

if (data.qa_mode === true && isInQAMode() === false) {
//log('QA Mode is not enabled');
	return 'no';
}

if (nantu_device === 'unknown' || nantu_browser === 'unknown' || nantu_browser_type === 'unknown' || nantu_browser_version === 0) {
//log('Unknown device or browser');
	return 'no';
}

if (nantu_device === 'desktop') {
	if (data.desktop === false) {
//log('Desktop is not allowed');
		return 'no';
	}

	if (nantu_browser === 'safari') {
		if (data.safari_desktop === false) {
//log('Safari desktop is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.safari_desktop_version)) {
//log('Safari desktop version is not allowed');
			return 'no';
		}
	}

	if (nantu_browser === 'chrome') {
		if (data.chrome_desktop === false) {
//log('Chrome desktop is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.chrome_desktop_version)) {
//log('Chrome desktop version is not allowed');
			return 'no';
		}
	}


	if (nantu_browser === 'firefox') {
		if (data.firefox_desktop === false) {
//log('Firefox desktop is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.firefox_desktop_version)) {
//log('Firefox desktop version is not allowed');
			return 'no';
		}
	}

	if (nantu_browser === 'edge') {
		if (data.edge_desktop === false) {
//log('Edge desktop is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.edge_desktop_version)) {
//log('Edge desktop version is not allowed');
			return 'no';
		}
	}

	if (nantu_browser === 'opera') {
		if (data.opera_desktop === false) {
//log('Opera desktop is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.opera_desktop_version)) {
//log('Opera desktop version is not allowed');
			return 'no';
		}
	}
}

if (nantu_device === 'tablet') {
	if (data.tablet === false) {
//log('Tablet is not allowed');
		return 'no';
	}

	if (nantu_browser === 'safari') {
		if (data.safari_ipad === false) {
//log('Safari iPad is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.safari_ipad_version)) {
//log('Safari iPad version is not allowed');
			return 'no';
		}
	}

	if (nantu_browser === 'chrome') {
		if (data.chrome_android === false) {
//log('Chrome Tablet is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.chrome_android_version)) {
//log('Chrome Tablet version is not allowed');
			return 'no';
		}
	}

	if (nantu_browser === 'firefox') {
		if (data.firefox_tablet === false) {
//log('Firefox Tablet is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.firefox_tablet_version)) {
//log('Firefox Tablet version is not allowed');
			return 'no';
		}
	}
}

if (nantu_device === 'mobile') {
	if (data.mobile === false) {
//log('Mobile is not allowed');
		return 'no';
	}

	if (nantu_browser === 'safari') {
		if (data.safari_mobile === false) 
		{
//log('Safari mobile is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.safari_mobile_version)) {
//log('Safari mobile version is not allowed');
			return 'no';
		}
	}

	if (nantu_browser === 'chrome') {
		if (data.chrome_android_mobile === false) {
//log('Chrome Android mobile is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.chrome_android_mobile_version)) {
//log('Chrome Android mobile version is not allowed');
			return 'no';
		}

		if (nantu_browser_type === 'safari') {
			if (data.chrome_iphone === false) {
//log('Chrome iPhone is not allowed');
				return 'no';
			}

			if (nantu_browser_version < makeInteger(data.chrome_iphone_version)) {
//log('Chrome iPhone version is not allowed');
				return 'no';
			}
		}	
	}

	if (nantu_browser === 'firefox') {
		if (data.firefox_mobile === false) {
//log('Firefox mobile is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.firefox_mobile_version)) {
//log('Firefox mobile version is not allowed');
			return 'no';
		}
	}
}

if (data.all_sources === false) {
	if (nantu_medium === 'unknown') {
//log('Medium unknown not allowed');
		return 'no';
	}

	if (nantu_medium === 'organic' && data.visitors_organic === false) {
//log('Organic not allowed');
		return 'no';
	}

	if (nantu_medium === 'cpc' && data.visitors_paid === false) {
//log('Paid not allowed');
		return 'no';
	}

	if (nantu_medium === 'direct' && data.visitors_direct === false) {
//log('Direct not allowed');
		return 'no';
	}

	if (nantu_medium === 'email' && data.visitors_email === false) {
//log('Email not allowed');
		return 'no';
	}
}

if (data.urls_enabled === true) {
	return_value = 'no';

	for (let i = 0; i < data.urls_table.length; i++) {
		let url_rule = data.urls_table[i];

		if (isAllowedURL(url_rule.url_type, url_rule.url_condition, url_rule.url_value) === true) {
			return_value = 'yes';
		}
	}
}

if (data.element_enable === true) {
	if (getTotalElements(data.element_selector) > 0) {
		return 'yes';
	}

	return 'no';
}

return return_value;
