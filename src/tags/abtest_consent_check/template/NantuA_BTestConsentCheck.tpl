___INFO___

{
  "type": "TAG",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "Nantu A/B Test Consent Check",
  "brand": {
    "id": "brand_dummy",
    "displayName": ""
  },
  "description": "Pushes nantu_consented{test id} with the A/B test data only when consent is granted. Waits for a consent update if it is not granted yet.",
  "containerContexts": [
    "WEB"
  ]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "SELECT",
    "name": "consentType",
    "displayName": "Required consent",
    "macrosInSelect": false,
    "selectItems": [
      {
        "value": "analytics_storage",
        "displayValue": "analytics_storage"
      },
      {
        "value": "ad_storage",
        "displayValue": "ad_storage"
      }
    ],
    "simpleValueType": true,
    "defaultValue": "analytics_storage"
  },
  {
    "type": "TEXT",
    "name": "eventTimeout",
    "displayName": "Event timeout (ms)",
    "simpleValueType": true,
    "defaultValue": 2000,
    "valueValidators": [
      {
        "type": "POSITIVE_NUMBER"
      }
    ]
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

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
                "string": "nantu_version"
              },
              {
                "type": 1,
                "string": "nantu_ab_test_experiment_name"
              },
              {
                "type": 1,
                "string": "nantu_ab_test_variation_id"
              },
              {
                "type": 1,
                "string": "nantu_ab_test_variation"
              },
              {
                "type": 1,
                "string": "nantu_ab_test_index"
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
              },
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
                    "string": "nantu_ab_test_mark_sent"
                  },
                  {
                    "type": 8,
                    "boolean": false
                  },
                  {
                    "type": 8,
                    "boolean": false
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
        "publicId": "access_consent",
        "versionId": "1"
      },
      "param": [
        {
          "key": "consentTypes",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
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
                    "string": "analytics_storage"
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
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
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
                    "string": "ad_storage"
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
  }
]


___TESTS___

scenarios: []


___NOTES___

Created on 11/19/2026


