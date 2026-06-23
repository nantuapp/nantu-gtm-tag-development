(function () {
	const nantu_qa_gtm_id = "GTM-YOUR_QA_GTM_ID"; // replace with your QA GTM ID
	const nantu_env_domain = ".nantu.app"; // replace with your domain
	var params = new URLSearchParams(window.location.search);
	if (params.get("nantu_environment") === "qa") {
		var expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
		document.cookie = "nantu_environment=qa; expires=" + expires +
			"; path=/; domain=" + nantu_env_domain;
	}

	var hasCookie = document.cookie.split("; ").some(function (row) {
		return row === "nantu_environment=qa";
	});

	if (params.get("nantu_environment") === "qa" || hasCookie) {
		(function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != "dataLayer" ? "&l=" + l : "";
			j.async = true;
			j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, "script", "dataLayer", nantu_qa_gtm_id);
	}
})();
