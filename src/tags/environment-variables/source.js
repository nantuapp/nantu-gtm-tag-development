function nantuCleanString(text) {
	return text.replace(/[^a-z0-9._-]/gi, "").substr(0, 50);
}

function nantuGetHost(referrer) {
	try {
		return new URL(referrer).hostname.replace('www.', '').split('.')[0];
	}
	catch(err)
	{
		console.error(err);
	}

	return "unknown";
}

function nantuSetCookie(name, value) {
	var sourceDate = new Date();
	sourceDate.setTime(sourceDate.getTime() + 180 * 24 * 3600 * 1000);
	var expires = "expires=" + sourceDate.toGMTString();
	document.cookie = name + "=" + value + "; " + expires + "; path=/;";
}

