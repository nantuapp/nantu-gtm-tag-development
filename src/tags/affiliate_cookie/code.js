// API imports
const queryPermission = require('queryPermission');
const setCookie = require('setCookie');
const getUrl = require('getUrl');
const getQueryParameters = require('getQueryParameters');

// Constants
const nantuAffiliateCookieName = 'nantu_affiliate_id';
const nantuCampaignCookieName = 'nantu_campaign_id';

if (getAffiliateQuery() != '') {
	setAffiliateCookie(nantuAffiliateCookieName, getAffiliateQuery());
}

if (getCampaignQuery() != '') {
	setAffiliateCookie(nantuCampaignCookieName, getCampaignQuery());
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

function getCampaignQuery() {
	if (queryPermission('get_url', 'query')) {
		const campaignQuery = getQueryParameters(data.campaign_query_var);

		if (campaignQuery != 'undefined') {
			return campaignQuery;
		}
	}

	return '';
}

//set the QA mode cookie
function setAffiliateCookie(cookieName, cookieValue) {
	// Set Cookie Permissions
	const options = {
		'domain': data.domain,
		'path': '/',
		'max-age': 60*60*24*data.expire_days,
		'secure': true
	};

	if (queryPermission('set_cookies', cookieName, options)) {
		setCookie(cookieName, cookieValue, options);
	}
}
