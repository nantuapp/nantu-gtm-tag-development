___INFO___

{
  "type": "TAG",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "Nantu Cross Domain Tracking Only",
  "brand": {
    "id": "brand_dummy",
    "displayName": ""
  },
  "description": "",
  "containerContexts": [
    "WEB"
  ]
}


___TEMPLATE_PARAMETERS___

[]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

// Description: Nantu Cross Domain Tracking
// Author: Juan Castro
// Last modified: 2026-01-29
// License: Apache 2.0
// Version: 1.0.0
//
// What's new?
// - Initial release

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

for (let i = 0; i < tests.length; i++) {
	const t = tests[i];

	if (!t) {
		continue;
	}

	const testId = makePositiveInt(t.nantu_ab_test_index);
	const experimentName = asString(t.nantu_ab_test_experiment_name);
	const selectedVariation = asString(t.nantu_ab_test_variation_id);
	const variationName = asString(t.nantu_ab_test_variation);

	if (!testId || !experimentName || !selectedVariation || !variationName) {
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


___WEB_PERMISSIONS___

[
  {
    "instance": {
      "key": {
        "publicId": "logging",
        "versionId": "1"
      },
      "param": [
        {
          "key": "environments",
          "value": {
            "type": 1,
            "string": "debug"
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "access_globals",
        "versionId": "1"
      },
      "param": [
        {
          "key": "keys",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "key"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  },
                  {
                    "type": 1,
                    "string": "execute"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "dataLayer"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": false
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "get_url",
        "versionId": "1"
      },
      "param": [
        {
          "key": "queriesAllowed",
          "value": {
            "type": 1,
            "string": "any"
          }
        },
        {
          "key": "urlParts",
          "value": {
            "type": 1,
            "string": "specific"
          }
        },
        {
          "key": "query",
          "value": {
            "type": 8,
            "boolean": true
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  }
]


___TESTS___

scenarios: []


___NOTES___

Created on 2/2/2026, 10:03:49 AM


