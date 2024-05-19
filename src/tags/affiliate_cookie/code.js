// API imports
const queryPermission = require('queryPermission');
const setCookie = require('setCookie');
const getUrl = require('getUrl');
const getQueryParameters = require('getQueryParameters');

// Constants
const nantuAffiliateCookieName = 'nantu_affiliate_id';

if (getAffiliateQuery() != '') {
	setAffiliateCookie(getAffiliateQuery());
}

data.gtmOnSuccess();

function getAffiliateQuery() {
	if (queryPermission('get_url', 'query')) {
		const affiliateQuery = getQueryParameters(data.query_var);

		if (affiliateQuery != 'undefined') {
			return affiliateQuery;
		}
	}

	return '';
}

//set the QA mode cookie
function setAffiliateCookie(cookieValue) {
	// Set Cookie Permissions
	const options = {
		'domain': data.domain,
		'path': '/',
		'max-age': 60*60*24*data.expire_days,
		'secure': true
	};

	if (queryPermission('set_cookies', nantuAffiliateCookieName, options)) {
		setCookie(nantuAffiliateCookieName, cookieValue, options);
	}
}
