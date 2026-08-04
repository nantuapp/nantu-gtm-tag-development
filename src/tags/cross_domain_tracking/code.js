// Description: Nantu Cross Domain Tracking
// Author: Juan Castro
// Last modified: 2026-08-04
// License: Apache 2.0
// Version: 1.0.1
//
// What's new?
// - v1.0.1: Input validation on all fields before dataLayer push

const log = require('logToConsole');
const queryPermission = require('queryPermission');
const getQueryParameters = require('getQueryParameters');
const createQueue = require('createQueue');
const getType = require('getType');
const makeInteger = require('makeInteger');
const fromBase64 = require('fromBase64');
const JSON = require('JSON');

const queryVarName = 'nantu_crossdomain_tests';
const dataLayerPush = createQueue('dataLayer');

const encoded = getQueryParamValue(queryVarName);

if (!encoded) {
	data.gtmOnFailure();
	return;
}

const decoded = fromBase64(encoded);

if (!decoded) {
	data.gtmOnFailure();
	return;
}

const tests = JSON.parse(decoded);

if (!tests || getType(tests) !== 'array') {
	log('Nantu CDT: decoded payload is not a valid JSON array. Aborting.');
	data.gtmOnFailure();
	return;
}

for (let i = 0; i < tests.length; i++) {
	const t = tests[i];

	if (!t) {
		continue;
	}

	const testId = makePositiveInt(t.nantu_ab_test_index);
	const experimentName = asString(t.nantu_ab_test_experiment_name);
	const selectedVariation = asString(t.nantu_ab_test_variation_id);
	const variationName = asString(t.nantu_ab_test_variation);

	if (!testId) {
		log('Nantu CDT: invalid nantu_ab_test_index - must be a positive integer. Got: ' + t.nantu_ab_test_index);
		continue;
	}

	if (!isAlphaNumeric(experimentName, 30)) {
		log('Nantu CDT: invalid nantu_ab_test_experiment_name - must be alphanumeric, max 30 chars. Got: ' + experimentName);
		continue;
	}

	if (!isValidVariationId(selectedVariation)) {
		log('Nantu CDT: invalid nantu_ab_test_variation_id - must be "control" or "variation1"-"variation9". Got: ' + selectedVariation);
		continue;
	}

	if (!isAlphaNumeric(variationName, 30)) {
		log('Nantu CDT: invalid nantu_ab_test_variation - must be alphanumeric, max 30 chars. Got: ' + variationName);
		continue;
	}


	dataLayerPush({
		'event': 'nantu_ab_test' + testId,
		'nantu_ab_test_index': testId,
        'nantu_version': '1.0',
		'nantu_ab_test_experiment_name': experimentName,
		'nantu_ab_test_variation': variationName
	});
}

// Call data.gtmOnSuccess when the tag is finished.
data.gtmOnSuccess();

function getQueryParamValue(paramName) {
	if (!queryPermission('get_url', 'query')) {
		return '';
	}

	const v = getQueryParameters(paramName);

	if (!v || v === 'undefined') {
		return '';
	}

	return v;
}

function asString(v) {
	if (!v) {
		return '';
	}
	if (getType(v) === 'string') {
		return v;
	}
	return '';
}

function makePositiveInt(v) {
	const n = makeInteger(v);
	if (!n || n <= 0) {
		return 0;
	}
	return n;
}

// Returns true only for non-empty alphanumeric strings within maxLen characters.
function isAlphaNumeric(v, maxLen) {
	if (!v || getType(v) !== 'string') return false;
	if (v.length === 0 || v.length > maxLen) return false;
	const allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
	for (let i = 0; i < v.length; i++) {
		if (allowed.indexOf(v[i]) === -1) return false;
	}
	return true;
}

// Returns true only for "control" or "variation1" through "variation9".
function isValidVariationId(v) {
	if (!v || getType(v) !== 'string') return false;
	if (v === 'control') return true;
	if (v.length !== 10) return false;                        // "variation" (9) + one digit = 10
	if (v.indexOf('variation') !== 0) return false;
	return '123456789'.indexOf(v[9]) !== -1;
}
