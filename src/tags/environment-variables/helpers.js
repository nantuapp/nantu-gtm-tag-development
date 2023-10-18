// Description: Helpers for A/B testing framework.
// Author: Juan Castro
// Last modified: 2023-07-25
// License: Apache 2.0
// Version: 1.0.0

function nantuCleanString(text) {
	return text.replace(/[^a-z0-9._-]/gi, "").substr(0, 50);
}

function nantuGetHost(referrer) {
	try {
		return new URL(referrer).hostname.replace('www.', '').split('.')[0];
	}
	catch(err)
	{
		console.error(err);
	}

	return "unknown";
}

function nantuGetSourceMedium() {

	var source = "direct";
	var medium = "none";
	var campaign = "none";

	var searchEngineRegex = /(.*google\..*)|(duckduckgo\.com)|(.*bing\.com)|(baidu\..*)|(yandex\..*)|(yahoo\.com)/;
	var searchEngineNameRegex = /(google|duckduckgo|bing|baidu|yandex|yahoo)/;


	var url = new URL(window.location.href);

	if(url.searchParams.get("utm_source") || url.searchParams.get("utm_medium")) {
		if(url.searchParams.get("utm_source")) {
			source = url.searchParams.get("utm_source");
		}

		if(url.searchParams.get("utm_medium")) {
			medium = url.searchParams.get("utm_medium");
		}
	} else if(url.searchParams.get("gclid")) {
		source = "google";
		medium = "cpc";
	} else if(url.searchParams.get("fbclid")) {
		source = "facebook";
		medium = "cpc";
	} else if(url.searchParams.get("msclkid")) {
		source = "bing";
		medium = "cpc";
	} else if(searchEngineRegex.test(document.referrer)) {
		source = document.referrer.match(searchEngineNameRegex)[0];

		medium = "organic";
	} else if(document.referrer !== '') {

		var referrer = new URL(document.referrer);

		if (referrer.hostname !== window.location.hostname) {
			medium = "referral";
		}
	}

	if(url.searchParams.get("utm_campaign"))
	{
		campaign = url.searchParams.get("utm_campaign");
	}

	return {source: source, medium: medium, campaign: campaign};
}

function nantuGetTotalElements(selector) {
	return document.querySelectorAll(selector).length;
}
