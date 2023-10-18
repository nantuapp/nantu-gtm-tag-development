// Description: Device detection for A/B testing framework.
// Author: Juan Castro
// Last modified: 2023-07-25
// License: Apache 2.0
// Version: 1.0.0

function nantuDetectBrowser(userAgent) {
	var safariData = nantuIsSafariBrowser(userAgent);

	if (safariData) {
		return safariData;
	}

	var desktopBrowserData = nantuGetBrowser(userAgent);

	if (desktopBrowserData) {
		return desktopBrowserData;
	}

	return {device: "unknown", browser: "unknown", browserType: "unknown", version: 0};
}

function nantuIsSafariBrowser(userAgent) {
	var isSafari = false;

	var isDesktop = false;
	var isMobile = false;
	var isTabvar = false;

	var supportedApplePlatforms = ['Macintosh', 'iPhone', 'iPad'];

	var platformIndex = -1;

	for (var i = 0; i < supportedApplePlatforms.length; i++) {
		var platform = supportedApplePlatforms[i];

		if (userAgent.indexOf(platform) > -1) {
			if (platform === 'iPad') {
				isTabvar = true;
			}
			if (platform === 'Macintosh') {
				isDesktop = true;
			}
			if (platform === 'iPhone') {
				isMobile = true;
			}

			platformIndex = userAgent.indexOf(platform);
			break;
		}
	}

	var safariVersionRegex = /Version\/[0-9]+/;

	if (platformIndex > -1) {
		if (safariVersionRegex.test(userAgent.slice(platformIndex))) {
			var safariVersion = parseInt(userAgent.slice(platformIndex).match(safariVersionRegex)[0].split('/')[1]);

			if (safariVersion > 0) {
				return {device: isDesktop ? 'desktop' : isMobile ? 'mobile' : isTabvar ? 'tablet' : null, browserType: 'safari', browser: 'safari', version: safariVersion};
			}
		}
	}

	var chromeIosVersionRegex = /CriOS\/[0-9]+/;

	if (chromeIosVersionRegex.test(userAgent)) {
		var chromeIosVersion = parseInt(userAgent.match(chromeIosVersionRegex)[0].split('/')[1]);

		if (chromeIosVersion > 0) {
			return {device: isDesktop ? 'desktop' : isMobile ? 'mobile' : isTabvar ? 'tablet' : null, browserType: 'safari', browser: 'chrome', version: chromeIosVersion};
		}
	}

	return null;
}

function nantuGetBrowser(userAgent) {
	var supportedPlatforms = ['Linux x86_64', 'Mac OS', 'Windows NT', 'CrOS', 'Android'];
	var supportedBrowsers = [
		{
			name: 'Chrome',
			versionRegex: 'OPR/'
		},
		{
			name: 'Firefox',
			versionRegex: 'Firefox/'
		},
		{
			name: 'Chrome',
			versionRegex: 'Chrome/'
		},
	];

	var platformIndex = -1;

	var deviceType = "desktop";

	for (var i = 0; i < supportedPlatforms.length; i++) {
		var platform = supportedPlatforms[i];

		if (userAgent.indexOf(platform) > -1) {
			if (platform === 'Android') { 
				if (userAgent.indexOf('Mobile') > -1) {
					deviceType = "mobile";
				} else {
					deviceType = "tablet";
				}
			}

			for (var j = 0; j < supportedBrowsers.length; j++) {
				var browser = supportedBrowsers[j];

				if (userAgent.indexOf(browser.name) > -1) {

					var versionRegex = new RegExp(browser.versionRegex.replace('/', '\\/') + '[0-9]+');

					if (versionRegex.test(userAgent)) {
						var browserVersion = parseInt(userAgent.slice(userAgent.indexOf(browser.name)).match(versionRegex)[0].split('/')[1]);

						if (browserVersion > 0) {
							var browserType = browser.name.toLowerCase();

							var browserName = browserType;

							if (userAgent.indexOf('Edg/') > -1) {
								browserName = 'edge';
							}

							if (userAgent.indexOf('OPR/') > -1) {
								browserName = 'opera';
							}

							return {device: deviceType, browserType: browserType, browser: browserName, version: browserVersion};
						}
					}
				}
			}
		}
	}

	return null;
}

