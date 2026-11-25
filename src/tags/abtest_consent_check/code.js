// Description: Nantu A/B Test Consent Check Template
// Author: Juan Castro
// Last modified: 2026-11-19
// License: Apache 2.0
// Version: 1.0.0

// API imports
const copyFromDataLayer = require('copyFromDataLayer');
const createQueue = require('createQueue');
const callInWindow = require('callInWindow');
const isConsentGranted = require('isConsentGranted');
const addConsentListener = require('addConsentListener');
const templateStorage = require('templateStorage');
const makeInteger = require('makeInteger');
const log = require('logToConsole');

// Constants
const consentedEventPrefix = 'nantu_consented';
const markSentFunction = 'nantu_ab_test_mark_sent';

const testId = copyFromDataLayer('nantu_ab_test_index');
const variationId = copyFromDataLayer('nantu_ab_test_variation_id');
const variationName = copyFromDataLayer('nantu_ab_test_variation');
const experiment = copyFromDataLayer('nantu_ab_test_experiment_name');
const nantuVersion = copyFromDataLayer('nantu_version');

const pageKey = 'sent_' + testId;

if (!testId) {
	log('Nantu: missing nantu_ab_test_index');
	data.gtmOnSuccess();
	return;
}

if (isConsentGranted(data.consentType)) {
	send();
} else {
	log('Nantu Test ' + testId + ': ' + data.consentType + ' not granted, waiting for consent update');
	addConsentListener(data.consentType, function (consentType, granted) {
		if (granted) {
			send();
		}
	});
}

data.gtmOnSuccess();

function send() {
	// only send once per page per test
	if (templateStorage.getItem(pageKey) === variationName) {
		return;
	}
	templateStorage.setItem(pageKey, variationName);

	const dataLayerPush = createQueue('dataLayer');

	// re-push the full payload so the GA4 tag reads this test's values even if another test pushed in between
	dataLayerPush({
		'event': consentedEventPrefix + testId,
		'nantu_version': nantuVersion,
		'nantu_ab_test_experiment_name': experiment,
		'nantu_ab_test_variation_id': variationId,
		'nantu_ab_test_variation': variationName,
		'nantu_ab_test_index': testId,
		'eventTimeout': makeInteger(data.eventTimeout),
		'eventCallback': function () {
			callInWindow(markSentFunction, testId, variationName);
		}
	});
}
