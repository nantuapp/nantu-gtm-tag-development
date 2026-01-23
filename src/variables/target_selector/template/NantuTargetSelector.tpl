___INFO___

{
  "type": "MACRO",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "Nantu Target Selector",
  "description": "Variable that helps to select the target",
  "containerContexts": [
    "WEB"
  ]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "GROUP",
    "name": "qa_mode_group",
    "displayName": "QA Mode",
    "groupStyle": "NO_ZIPPY",
    "subParams": [
      {
        "type": "CHECKBOX",
        "name": "qa_mode",
        "checkboxText": "Run only when QA Mode is enabled",
        "simpleValueType": true
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "device_label_group",
    "displayName": "Device Types",
    "groupStyle": "NO_ZIPPY",
    "subParams": []
  },
  {
    "type": "CHECKBOX",
    "name": "desktop",
    "checkboxText": "Enable for Desktop",
    "simpleValueType": true,
    "defaultValue": true,
    "alwaysInSummary": false
  },
  {
    "type": "GROUP",
    "name": "desktop_group",
    "displayName": "Targeted Desktop Browsers",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "GROUP",
        "name": "chrome_desktop_group",
        "displayName": "Chrome",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "chrome_desktop",
            "checkboxText": "Enable",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "TEXT",
            "name": "chrome_desktop_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 90
          }
        ]
      },
      {
        "type": "GROUP",
        "name": "safari_desktop_group",
        "displayName": "Safari",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "safari_desktop",
            "checkboxText": "Enable",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "TEXT",
            "name": "safari_desktop_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 14
          }
        ]
      },
      {
        "type": "GROUP",
        "name": "edge_desktop_group",
        "displayName": "Edge",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "edge_desktop",
            "checkboxText": "Enable",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "TEXT",
            "name": "edge_desktop_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 90
          }
        ]
      },
      {
        "type": "GROUP",
        "name": "firefox_desktop_group",
        "displayName": "Firefox",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "firefox_desktop",
            "checkboxText": "Enable",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "TEXT",
            "name": "firefox_desktop_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 80
          }
        ]
      },
      {
        "type": "GROUP",
        "name": "opera_desktop_group",
        "displayName": "Opera",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "opera_desktop",
            "checkboxText": "Enable",
            "simpleValueType": true
          },
          {
            "type": "TEXT",
            "name": "opera_desktop_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 80
          }
        ]
      }
    ]
  },
  {
    "type": "CHECKBOX",
    "name": "tablet",
    "checkboxText": "Enable for Tablet",
    "simpleValueType": true,
    "alwaysInSummary": false
  },
  {
    "type": "GROUP",
    "name": "tablet_group",
    "displayName": "Targeted Tablet Browsers",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "GROUP",
        "name": "safari_tablet_group",
        "displayName": "Safari",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "safari_ipad",
            "checkboxText": "Enable",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "TEXT",
            "name": "safari_ipad_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 14
          }
        ]
      },
      {
        "type": "GROUP",
        "name": "chrome_android_group",
        "displayName": "Chrome Android",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "chrome_android",
            "checkboxText": "Enable",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "TEXT",
            "name": "chrome_android_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 90
          }
        ]
      },
      {
        "type": "GROUP",
        "name": "chrome_ipad_group",
        "displayName": "Chrome iOS",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "chrome_ipad",
            "checkboxText": "Enable",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "TEXT",
            "name": "chrome_ipad_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 90
          }
        ]
      },
      {
        "type": "GROUP",
        "name": "firefox_tablet_group",
        "displayName": "Firefox",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "firefox_tablet",
            "checkboxText": "Enable",
            "simpleValueType": true
          },
          {
            "type": "TEXT",
            "name": "firefox_tablet_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 80
          }
        ]
      }
    ]
  },
  {
    "type": "CHECKBOX",
    "name": "mobile",
    "checkboxText": "Enable for Mobile",
    "simpleValueType": true,
    "alwaysInSummary": false
  },
  {
    "type": "GROUP",
    "name": "mobile_group",
    "displayName": "Targeted Mobile Browsers",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "GROUP",
        "name": "safari_mobile_group",
        "displayName": "Safari",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "safari_mobile",
            "checkboxText": "Enable",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "TEXT",
            "name": "safari_mobile_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 14
          }
        ]
      },
      {
        "type": "GROUP",
        "name": "chrome_mobile_group",
        "displayName": "Chrome Android",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "chrome_android_mobile",
            "checkboxText": "Enable",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "TEXT",
            "name": "chrome_android_mobile_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 90
          }
        ]
      },
      {
        "type": "GROUP",
        "name": "chrome_mobile_ios_group",
        "displayName": "Chrome iOS",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "chrome_iphone",
            "checkboxText": "Enable",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "TEXT",
            "name": "chrome_iphone_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 90
          }
        ]
      },
      {
        "type": "GROUP",
        "name": "firefox_mobile_group",
        "displayName": "Firefox",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "firefox_mobile",
            "checkboxText": "Enable",
            "simpleValueType": true
          },
          {
            "type": "TEXT",
            "name": "firefox_mobile_version",
            "displayName": "Minimum Version",
            "simpleValueType": true,
            "defaultValue": 80
          }
        ]
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "visitor_sources_group",
    "displayName": "Visitor Sources",
    "groupStyle": "NO_ZIPPY",
    "subParams": [
      {
        "type": "CHECKBOX",
        "name": "all_sources",
        "checkboxText": "Target Users from all Sources",
        "simpleValueType": true,
        "defaultValue": true
      },
      {
        "type": "GROUP",
        "name": "visitors_sources_details",
        "displayName": "",
        "groupStyle": "ZIPPY_OPEN",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "visitors_organic",
            "checkboxText": "Target Organic Visitors",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "CHECKBOX",
            "name": "visitors_paid",
            "checkboxText": "Target Paid Visitors",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "CHECKBOX",
            "name": "visitors_direct",
            "checkboxText": "Target Direct Visitors",
            "simpleValueType": true,
            "defaultValue": true
          },
          {
            "type": "CHECKBOX",
            "name": "visitors_email",
            "checkboxText": "Target Email Visitors",
            "simpleValueType": true,
            "defaultValue": true
          }
        ],
        "enablingConditions": [
          {
            "paramName": "all_sources",
            "paramValue": true,
            "type": "NOT_EQUALS"
          }
        ]
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "urls_group",
    "displayName": "URLs",
    "groupStyle": "NO_ZIPPY",
    "subParams": [
      {
        "type": "CHECKBOX",
        "name": "urls_enabled",
        "checkboxText": "Run on specific urls",
        "simpleValueType": true
      },
      {
        "type": "PARAM_TABLE",
        "name": "urls_table",
        "displayName": "URLs List",
        "paramTableColumns": [
          {
            "param": {
              "type": "SELECT",
              "name": "url_type",
              "displayName": "URL Section",
              "macrosInSelect": false,
              "selectItems": [
                {
                  "value": "href",
                  "displayValue": "Page URL"
                },
                {
                  "value": "path",
                  "displayValue": "Page Path"
                }
              ],
              "simpleValueType": true
            },
            "isUnique": false
          },
          {
            "param": {
              "type": "SELECT",
              "name": "url_condition",
              "displayName": "Condition Type",
              "macrosInSelect": false,
              "selectItems": [
                {
                  "value": "equals",
                  "displayValue": "Equals"
                },
                {
                  "value": "contains",
                  "displayValue": "Contains"
                },
                {
                  "value": "starts",
                  "displayValue": "Starts With"
                },
                {
                  "value": "ends",
                  "displayValue": "Ends With"
                }
              ],
              "simpleValueType": true
            },
            "isUnique": false
          },
          {
            "param": {
              "type": "TEXT",
              "name": "url_value",
              "displayName": "URL",
              "simpleValueType": true
            },
            "isUnique": true
          }
        ],
        "enablingConditions": [
          {
            "paramName": "urls_enabled",
            "paramValue": true,
            "type": "EQUALS"
          }
        ]
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "elements_group",
    "displayName": "Page Elements",
    "groupStyle": "NO_ZIPPY",
    "subParams": [
      {
        "type": "CHECKBOX",
        "name": "element_enable",
        "checkboxText": "Run only if page contains specific element",
        "simpleValueType": true
      },
      {
        "type": "TEXT",
        "name": "element_selector",
        "displayName": "CSS selector of element",
        "simpleValueType": true,
        "enablingConditions": [
          {
            "paramName": "element_enable",
            "paramValue": true,
            "type": "EQUALS"
          }
        ],
        "valueValidators": [
          {
            "type": "NON_EMPTY"
          }
        ]
      }
    ]
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

// Description: Target Selector Helper
// Author: Juan Castro
// Last modified: 2023-10-25
// License: Apache 2.0
// Version: 1.0.0

const queryPermission = require('queryPermission');
const copyFromWindow = require('copyFromWindow');
const makeInteger = require('makeInteger');
const getCookieValues = require('getCookieValues');
const getUrl = require('getUrl');
//const log = require('logToConsole');

const nantuModeCookieName = 'nantu_mode';
const nantuModeQueryVariableName = 'nantu_mode';

var return_value = 'yes';

var nantu_device = getVariableValue('nantu_device');
var nantu_browser = getVariableValue('nantu_browser');
var nantu_browser_type = getVariableValue('nantu_browser_type');
var nantu_browser_version = getVariableValue('nantu_browser_version');

var nantu_source = getVariableValue('nantu_source');
var nantu_medium = getVariableValue('nantu_medium');
var nantu_campaign = getVariableValue('nantu_campaign');

function getTotalElements(selector) {
	if (queryPermission('access_globals', 'read', 'nantuGetTotalElements')) {
		const nantuGetTotalElements = copyFromWindow('nantuGetTotalElements');

		return nantuGetTotalElements(selector);
	}

	return 0;
}

function getVariableValue(variableName) {
	if (queryPermission('access_globals', 'read', variableName)) {
		return copyFromWindow(variableName);
	}

	if(variableName === 'nantu_browser_version') {
		return 0;
	}

	return "unknown";
}

//Check if the user is in QA mode
//QA Mode is set using a cookie or the query parameter nantu_mode=qa
function isInQAMode() {
	if (queryPermission('get_cookies', nantuModeCookieName)) {
		const nantuModeCookie = getCookieValues(nantuModeCookieName).join('');

		if (nantuModeCookie === "qa" || hasQAQuery()) {
			return true;
		}
	}

	return false;
}

function hasQAQuery() {
	if (queryPermission('get_url', 'query')) {
		const nantuModeQuery = getUrl('query');

		if (nantuModeQuery.indexOf(nantuModeQueryVariableName + "=qa") !== -1) {
			return true;
		}
	}

	return false;
}

function isAllowedURL(type, condition, value) {
	if (queryPermission('get_url', type)) {
		var url = getUrl(type);

		if (condition === 'contains') {
			if (url.indexOf(value) !== -1) {
				return true;
			}
		} else if (condition === 'equals') {
			if (url === value) {
				return true;
			}
		} else if (condition === 'starts') {
			if (url.indexOf(value) === 0) {
				return true;
			}
		} else if (condition === 'ends') {
			if (url.indexOf(value) === url.length - value.length) {
				return true;
			}
		}
	}

	return false;
}

if (data.qa_mode === true && isInQAMode() === false) {
//log('QA Mode is not enabled');
	return 'no';
}

if (nantu_device === 'unknown' || nantu_browser === 'unknown' || nantu_browser_type === 'unknown' || nantu_browser_version === 0) {
//log('Unknown device or browser');
	return 'no';
}

if (nantu_device === 'desktop') {
	if (data.desktop === false) {
//log('Desktop is not allowed');
		return 'no';
	}

	if (nantu_browser === 'safari') {
		if (data.safari_desktop === false) {
//log('Safari desktop is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.safari_desktop_version)) {
//log('Safari desktop version is not allowed');
			return 'no';
		}
	}

	if (nantu_browser === 'chrome') {
		if (data.chrome_desktop === false) {
//log('Chrome desktop is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.chrome_desktop_version)) {
//log('Chrome desktop version is not allowed');
			return 'no';
		}
	}


	if (nantu_browser === 'firefox') {
		if (data.firefox_desktop === false) {
//log('Firefox desktop is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.firefox_desktop_version)) {
//log('Firefox desktop version is not allowed');
			return 'no';
		}
	}

	if (nantu_browser === 'edge') {
		if (data.edge_desktop === false) {
//log('Edge desktop is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.edge_desktop_version)) {
//log('Edge desktop version is not allowed');
			return 'no';
		}
	}

	if (nantu_browser === 'opera') {
		if (data.opera_desktop === false) {
//log('Opera desktop is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.opera_desktop_version)) {
//log('Opera desktop version is not allowed');
			return 'no';
		}
	}
}

if (nantu_device === 'tablet') {
	if (data.tablet === false) {
//log('Tablet is not allowed');
		return 'no';
	}

	if (nantu_browser === 'safari') {
		if (data.safari_ipad === false) {
//log('Safari iPad is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.safari_ipad_version)) {
//log('Safari iPad version is not allowed');
			return 'no';
		}
	}

	if (nantu_browser === 'chrome') {
		if (data.chrome_android === false) {
//log('Chrome Tablet is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.chrome_android_version)) {
//log('Chrome Tablet version is not allowed');
			return 'no';
		}
	}

	if (nantu_browser === 'firefox') {
		if (data.firefox_tablet === false) {
//log('Firefox Tablet is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.firefox_tablet_version)) {
//log('Firefox Tablet version is not allowed');
			return 'no';
		}
	}
}

if (nantu_device === 'mobile') {
	if (data.mobile === false) {
//log('Mobile is not allowed');
		return 'no';
	}

	if (nantu_browser === 'safari') {
		if (data.safari_mobile === false) 
		{
//log('Safari mobile is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.safari_mobile_version)) {
//log('Safari mobile version is not allowed');
			return 'no';
		}
	}

	if (nantu_browser === 'chrome') {
		if (data.chrome_android_mobile === false) {
//log('Chrome Android mobile is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.chrome_android_mobile_version)) {
//log('Chrome Android mobile version is not allowed');
			return 'no';
		}

		if (nantu_browser_type === 'safari') {
			if (data.chrome_iphone === false) {
//log('Chrome iPhone is not allowed');
				return 'no';
			}

			if (nantu_browser_version < makeInteger(data.chrome_iphone_version)) {
//log('Chrome iPhone version is not allowed');
				return 'no';
			}
		}	
	}

	if (nantu_browser === 'firefox') {
		if (data.firefox_mobile === false) {
//log('Firefox mobile is not allowed');
			return 'no';
		}

		if (nantu_browser_version < makeInteger(data.firefox_mobile_version)) {
//log('Firefox mobile version is not allowed');
			return 'no';
		}
	}
}

if (data.all_sources === false) {
	if (nantu_medium === 'unknown') {
//log('Medium unknown not allowed');
		return 'no';
	}

	if (nantu_medium === 'organic' && data.visitors_organic === false) {
//log('Organic not allowed');
		return 'no';
	}

	if (nantu_medium === 'cpc' && data.visitors_paid === false) {
//log('Paid not allowed');
		return 'no';
	}

	if (nantu_medium === 'direct' && data.visitors_direct === false) {
//log('Direct not allowed');
		return 'no';
	}

	if (nantu_medium === 'email' && data.visitors_email === false) {
//log('Email not allowed');
		return 'no';
	}
}

if (data.urls_enabled === true) {
	return_value = 'no';

	for (let i = 0; i < data.urls_table.length; i++) {
		let url_rule = data.urls_table[i];

		if (isAllowedURL(url_rule.url_type, url_rule.url_condition, url_rule.url_value) === true) {
			return_value = 'yes';
		}
	}
}

if (data.element_enable === true) {
	if (getTotalElements(data.element_selector) > 0) {
		return 'yes';
	}

	return 'no';
}

return return_value;


___WEB_PERMISSIONS___

[
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
                    "string": "nantu_device"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": false
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
                    "string": "nantu_browser"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": false
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
                    "string": "nantu_browser_type"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": false
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
                    "string": "nantu_browser_version"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": false
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
                    "string": "nantu_source"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": false
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
                    "string": "nantu_medium"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": false
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
                    "string": "nantu_campaign"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": false
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
                    "string": "nantuGetTotalElements"
                  },
                  {
                    "type": 8,
                    "boolean": true
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
        "publicId": "get_cookies",
        "versionId": "1"
      },
      "param": [
        {
          "key": "cookieAccess",
          "value": {
            "type": 1,
            "string": "specific"
          }
        },
        {
          "key": "cookieNames",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 1,
                "string": "nantu_mode"
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
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  }
]


___TESTS___

scenarios: []


___NOTES___

Created on 1/23/2026, 1:44:57 PM


