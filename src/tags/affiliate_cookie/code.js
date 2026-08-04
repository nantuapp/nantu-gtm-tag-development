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

function sanitizeQueryValue(value) {
	// Reject non-strings, null, or the literal string 'undefined'
	if (!value || value === 'undefined') return '';

	// Whitelist: allow only alphanumeric, hyphens, and underscores; max 100 chars
	const safePattern = '^[a-zA-Z0-9_\\-]{1,100}$';
	return value.match(safePattern) ? value : '';
}

function getAffiliateQuery() {
	if (queryPermission('get_url', 'query')) {
		const affiliateQuery = getQueryParameters(data.query_var);
		return sanitizeQueryValue(affiliateQuery);
	}

	return '';
}

function getCampaignQuery() {
	if (queryPermission('get_url', 'query')) {
		const campaignQuery = getQueryParameters(data.campaign_query_var);
		return sanitizeQueryValue(campaignQuery);
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
