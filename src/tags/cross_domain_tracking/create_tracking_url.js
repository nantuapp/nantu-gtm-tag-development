function nantu_x_cross_domain_tracking_url(url) {
	const storageKey = 'nantu_crossdomain_tests';
	
	// Get data from localStorage
	const storedData = localStorage.getItem(storageKey);
	if (!storedData) {
		return url; // No data to add, return original URL
	}
	
	// Encode the JSON data as base64
	const base64Data = btoa(storedData);
	
	// Create URL object to modify query parameters
	const urlObj = new URL(url);
	
	// Add or update the nantu_crossdomain_tests query parameter
	urlObj.searchParams.set('nantu_crossdomain_tests', base64Data);
	
	// Return the modified URL
	return urlObj.toString();
}

const links = document.querySelectorAll("a[href*='nginx.org']");

links.forEach(link => {
	if (link.href.includes('nantu_crossdomain_tests')) {
		return;
	}

	const crossDomainURL = nantu_x_cross_domain_tracking_url(link.href);

	if (link.href !== crossDomainURL) {
		console.log('Cross domain URL:', crossDomainURL);
		link.href = crossDomainURL;
	}
});