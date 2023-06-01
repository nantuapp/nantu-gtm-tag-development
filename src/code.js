const Math = require('Math');
const log = require('logToConsole');
const queryPermission = require('queryPermission');
const localStorage = require('localStorage');
const nantuTestsKey = 'nantu_tests';
if (queryPermission('access_local_storage', 'readwrite', nantuTestsKey)) {
	const nantuTests = localStorage.getItem(nantuTestsKey);
}

/*--include:helpers/helpers.js:--*/
/*--includeend--*/

/*-------------------*/

const copyFromWindow = require('copyFromWindow');
const getCookieValues = require('getCookieValues');
const createQueue = require('createQueue');
const dataLayerPush = createQueue('dataLayer');
const generateRandom = require('generateRandom');

const inflow_host = copyFromWindow('inflow_host');
const inflow_query_vars = copyFromWindow('inflow_query_variables');
const inflow_qa_cookie = getCookieValues('inflow_cookie');
const inflow_get_cookie_value = copyFromWindow('inflow_get_cookie_value');
const inflow_set_cookie_value = copyFromWindow('inflow_set_cookie_value');
const inflow_device_type = copyFromWindow('inflow_device_type');
const inflow_execute_test = copyFromWindow('inflow_execute_test');
const inflow_get_geoip = copyFromWindow('inflow_get_geoip');
const inflow_set_variation_cookie = copyFromWindow('inflow_set_variation_cookie');
const inflow_is_in_test_window = copyFromWindow('inflow_is_in_test_window');
const inflow_is_cross_domain_test = copyFromWindow('inflow_is_cross_domain_test');
const inflow_environment = copyFromWindow('inflow_environment');

var test_has_been_executed = false;

const desktop_device_type = "desktop";
const tablet_device_type = "tablet";
const mobile_device_type = "mobile";
const excluded_device_type = "excluded";

if(data.qa_mode && is_in_qa_mode() == false)
{
	test_log("This test is QA only");
	return;
}
else if(typeof(inflow_device_type) == "string")
{
	if((inflow_device_type == desktop_device_type && data.desktop) || (inflow_device_type == tablet_device_type && data.tablet) || (inflow_device_type == mobile_device_type && data.mobile))
	{
		test_log("allowed device type", inflow_device_type);

		if(is_domain_allowed(inflow_host))
		{
			test_log("allowed domain", inflow_host);

			if(is_in_test_window())
			{
				test_log("pass test window check");

				if(data.qa_mode)
				{
					if(is_in_qa_mode())
					{
						execute_test();
					}
					else
					{
						test_log("test is QA only");
					}
				}
				else
				{
					execute_test();
				}
			}
			else
			{
				if(data.qa_mode && is_in_qa_mode())
				{
					test_log("doesn't pass test window check but is in QA mode");

					execute_test();
				}
				else
				{
					test_log("doesn't pass test window check");
				}
			}
		}
		else
		{
			test_log("not allowed domain", inflow_host);
		}
	}
	else
	{
		test_log("not allowed device type", inflow_device_type);	
	}
}
function is_in_qa_mode()
{
	if(inflow_query_vars.indexOf("inflow=qa") > -1 || inflow_query_vars.indexOf("inflow-qa") > -1 || inflow_qa_cookie == "qa")
	{
		return true;
	}
	else
	{
		return false;
	}
}

function is_in_test_window()
{
	if(data.test_window_enabled)
	{
		return inflow_is_in_test_window(data);
	}
	else
	{
		test_log("test window is not enabled");

		return true;
	}
}

function execute_test()
{
	test_log("execute test", data.test_index);
	inflow_execute_test(data);
}

function is_domain_allowed(inflow_host)
{
	data.allowed_domains.forEach(function(allowed_domain){
		if(allowed_domain.domain == inflow_host)
		{
			return true;
		}
	});

	return false;
}

function test_log(value1, value2)
{
	if(is_in_qa_mode())
	{
		log("nantu_" + data.test_index + ": " + value1, value2);
	}
}

test_log('data =', data);

// Call data.gtmOnSuccess when the tag is finished.
data.gtmOnSuccess();
