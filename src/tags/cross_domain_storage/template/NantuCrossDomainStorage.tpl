___INFO___

{
  "type": "TAG",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "Nantu Cross Domain Storage",
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

[
  {
    "type": "CHECKBOX",
    "name": "all_tests",
    "checkboxText": "Run on all Nantu tests?",
    "simpleValueType": true,
    "defaultValue": false
  },
  {
    "type": "GROUP",
    "name": "tests",
    "displayName": "Run on the following tests only:",
    "groupStyle": "NO_ZIPPY",
    "subParams": [
      {
        "type": "SIMPLE_TABLE",
        "name": "tests_list",
        "displayName": "Test List",
        "simpleTableColumns": [
          {
            "defaultValue": "",
            "displayName": "Nantu Test Index",
            "name": "index",
            "type": "TEXT",
            "isUnique": true,
            "valueValidators": [
              {
                "type": "POSITIVE_NUMBER"
              }
            ],
            "valueHint": "100"
          }
        ]
      }
    ],
    "enablingConditions": [
      {
        "paramName": "all_tests",
        "paramValue": false,
        "type": "EQUALS"
      }
    ]
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

// Description: Nantu Cross Domain Storage
// Author: Juan Castro
// Last modified: 2026-01-30
// License: Apache 2.0
// Version: 1.0.0
//
// What's new?
// - Initial release
const log = require('logToConsole');
const queryPermission = require('queryPermission');
const copyFromDataLayer = require('copyFromDataLayer');
const localStorage = require('localStorage');
const JSON = require('JSON');
const getType = require('getType');
const makeString = require('makeString');

const storageKey = 'nantu_crossdomain_tests';

if (!queryPermission('access_local_storage', 'readwrite', storageKey)) {
	log("Nantu can't access local storage");
	data.gtmOnFailure();
	return;
}

if (!queryPermission('read_data_layer', 'nantu_ab_test_index') ||
	!queryPermission('read_data_layer', 'nantu_ab_test_variation') ||
	!queryPermission('read_data_layer', 'nantu_ab_test_variation_id') ||
	!queryPermission('read_data_layer', 'nantu_ab_test_experiment_name')) {
	log("Nantu can't read required dataLayer fields");
	data.gtmOnFailure();
	return;
}

const entry = {
	nantu_ab_test_index: makeString(copyFromDataLayer('nantu_ab_test_index')),
	nantu_ab_test_variation: makeString(copyFromDataLayer('nantu_ab_test_variation')),
	nantu_ab_test_variation_id: makeString(copyFromDataLayer('nantu_ab_test_variation_id')),
	nantu_ab_test_experiment_name: makeString(copyFromDataLayer('nantu_ab_test_experiment_name'))
};

if (!entry.nantu_ab_test_index || !entry.nantu_ab_test_variation || !entry.nantu_ab_test_variation_id || !entry.nantu_ab_test_experiment_name) {
	log('Missing required Nantu fields. Skipping localStorage write.');
	data.gtmOnFailure();
	return;
}

if (data.all_tests === false) {
	var isTestAllowed = false;

	for(var i = 0; i < data.tests_list.length; i++) {
		if (entry.nantu_ab_test_index === data.tests_list[i].index) {
			isTestAllowed = true;
			break;
		}
	}

	if (isTestAllowed === false) {
		log('Cross domain storage not enabled for test: ' + entry.nantu_ab_test_index);
		data.gtmOnSuccess();
		return;
	}
}

let current = [];
const raw = localStorage.getItem(storageKey);
if (raw) {
	const parsed = JSON.parse(raw);
	if (getType(parsed) === 'array') {
		current = parsed;
	}
}

// Check if test already exists and update it, otherwise add new entry
let found = false;
for (let i = 0; i < current.length; i++) {
	if (current[i].nantu_ab_test_index === entry.nantu_ab_test_index) {
		current[i] = entry;
		found = true;
		break;
	}
}

if (!found) {
	current.push(entry);
}

const serialized = JSON.stringify(current);
if (serialized) {
	localStorage.setItem(storageKey, serialized);
	data.gtmOnSuccess();
} else {
	log('Failed to serialize data for localStorage.');
	data.gtmOnFailure();
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
        "publicId": "access_local_storage",
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
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "nantu_crossdomain_tests"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
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
        "publicId": "read_data_layer",
        "versionId": "1"
      },
      "param": [
        {
          "key": "allowedKeys",
          "value": {
            "type": 1,
            "string": "specific"
          }
        },
        {
          "key": "keyPatterns",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 1,
                "string": "nantu_ab_test_index"
              },
              {
                "type": 1,
                "string": "nantu_ab_test_variation"
              },
              {
                "type": 1,
                "string": "nantu_ab_test_variation_id"
              },
              {
                "type": 1,
                "string": "nantu_ab_test_experiment_name"
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
  }
]


___TESTS___

scenarios: []


___NOTES___

Created on 1/30/2026, 9:15:02 AM


