<script>

/* Nantu Standalone Test Install Script */

/* Test Name: Test Name */

(function(document, location) {
	var script_url = 'https://nantu.app/install_script.js';
	var test_id = 123;

	if(location.hostname === 'nantu.app') {

		if (location.search.indexOf("nantu_environment=qa") > -1 || document.cookie.indexOf('nantu_environment=qa') > -1) {
			console.log('Nantu test script for test ID ' + test_id + ' is not intended to run on QA environment.');
			return;
		}

		if (document.getElementById('nantu_install_script_' + test_id)) {
			console.log('Nantu test script for test ID ' + test_id + ' is already installed.');
			return;
		}

		var script = document.createElement('script');
		script.src = script_url;
		script.id = 'nantu_install_script_' + test_id;
		script.async = true;
		script.defer = true;

		document.head.appendChild(script);
	} else {
		console.log('Nantu test script of test ID ' + test_id + ' is not intended to run on this page.');
	}
})(document, location);

</script>
