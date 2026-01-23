___INFO___

{
  "type": "TAG",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "Nantu Set QA Cookie",
  "brand": {
    "id": "brand_dummy",
    "displayName": ""
  },
  "description": "Set Cookie for QA",
  "containerContexts": [
    "WEB"
  ]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "SELECT",
    "name": "cookieType",
    "displayName": "Cookie Type",
    "macrosInSelect": false,
    "selectItems": [
      {
        "value": "nantu_environment",
        "displayValue": "Environment Cookie"
      },
      {
        "value": "nantu_mode",
        "displayValue": "Nantu Mode Cookie"
      }
    ],
    "simpleValueType": true
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

// Description: Cookie Template
// Author: Juan Castro
// Last modified: 2024-09-30
// License: Apache 2.0
// Version: 1.0.2

// What's new 
// Fix environment cookie issue

// API imports
const queryPermission = require('queryPermission');
const setCookie = require('setCookie');
const copyFromDataLayer = require('copyFromDataLayer');
const getUrl = require('getUrl');

// Constants
const nantuModeCookieName = 'nantu_mode';
const nantuModeQueryVariableName = 'nantu_mode';
const nantuQAModeEventName = 'nantu_qa_mode';

if(data.cookieType == "nantu_mode") {

  if (isNantuQAModeEvent() || hasQAQuery()) {
	setNantuCookie("nantu_mode");
  }
}

if(data.cookieType == "nantu_environment") {
  if (hasEnvironmentQuery()) {
    setNantuCookie("nantu_environment");
  }
}

data.gtmOnSuccess();

function isNantuQAModeEvent() {
	if (queryPermission('read_data_layer', 'event')) {
		const dlEvent = copyFromDataLayer('event');

		if (dlEvent === nantuQAModeEventName) {
			return true;
		}
	}

	return false;
}


function hasQAQuery() {
	if (queryPermission('get_url', 'query')) {
		const nantuModeQuery = getUrl('query');

		if (nantuModeQuery.indexOf("nantu_mode=qa") !== -1) {
			return true;
		}
	}

	return false;
}

function hasEnvironmentQuery() {
    if (queryPermission('get_url', 'query')) {
		const nantuEnvironmentQuery = getUrl('query');

		if (nantuEnvironmentQuery.indexOf("nantu_environment=qa") !== -1) {
			return true;
		}
	}

	return false;
}

//set the QA mode cookie
function setNantuCookie(cookieName) {
	// Set Cookie Permissions
	const options = {
		'domain': 'auto',
		'path': '/',
		'max-age': 60*60,
		'secure': true
	};

	if (queryPermission('set_cookies', cookieName, options)) {
		setCookie(cookieName, 'qa', options);
	}
}


___WEB_PERMISSIONS___

[
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
                "string": "event"
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
        "publicId": "set_cookies",
        "versionId": "1"
      },
      "param": [
        {
          "key": "allowedCookies",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "name"
                  },
                  {
                    "type": 1,
                    "string": "domain"
                  },
                  {
                    "type": 1,
                    "string": "path"
                  },
                  {
                    "type": 1,
                    "string": "secure"
                  },
                  {
                    "type": 1,
                    "string": "session"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "nantu_mode"
                  },
                  {
                    "type": 1,
                    "string": "*"
                  },
                  {
                    "type": 1,
                    "string": "*"
                  },
                  {
                    "type": 1,
                    "string": "any"
                  },
                  {
                    "type": 1,
                    "string": "any"
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "name"
                  },
                  {
                    "type": 1,
                    "string": "domain"
                  },
                  {
                    "type": 1,
                    "string": "path"
                  },
                  {
                    "type": 1,
                    "string": "secure"
                  },
                  {
                    "type": 1,
                    "string": "session"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "nantu_environment"
                  },
                  {
                    "type": 1,
                    "string": "*"
                  },
                  {
                    "type": 1,
                    "string": "*"
                  },
                  {
                    "type": 1,
                    "string": "any"
                  },
                  {
                    "type": 1,
                    "string": "any"
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
          "key": "urlParts",
          "value": {
            "type": 1,
            "string": "any"
          }
        },
        {
          "key": "queriesAllowed",
          "value": {
            "type": 1,
            "string": "any"
          }
        }
      ]
    },
    "isRequired": true
  }
]


___TESTS___

scenarios: []


___NOTES___

Created on 1/23/2026, 1:39:57 PM


