## Anti-Flicker

When running an AB Test, the flicker effect can be a problem. This is when the user sees the original page for a split second before the new page is displayed. This can cause the user to become confused and potentially skew the results of the test.

This script is designed to help reduce the flicker effect by hiding the page until the new page is ready to be displayed. This is done by adding a class to the body of the page which hides the page until the new page is ready to be displayed.

**Please note that it will slow down the site load time as the page will not be displayed until the new page is ready to be displayed.**

### Installation

1. Insert this <style> tag into your HTML document's head tag

Change the value of the `animation-duration` property and the value of the `nantu_flicker_duration` variable to shorten or lengthen the duration of the flicker effect. Most of the time the page will be displayed before this duration, this is the worst case scenario.

```html
<style>
@keyframes nantuAntiFlicker {
  0% {
    opacity: 0;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

body.nantu_antiflicker {
  animation-name: nantuAntiFlicker;
  animation-duration: 3s; /* Change this value to shorten or lengthen the duration of the flicker effect*/
  animation-fill-mode: forwards;
}
</style>
```

2. Add the class `nantu_antiflicker` to the body tag of your HTML document

```html
<body class="nantu_antiflicker">
  <!-- Your HTML content here -->
</body>
```

3. Insert this script tag into your HTML document before the **body** closing tag

```html
<script>

const nantu_flicker_duration = 3000; // Change this value to shorten or lengthen the duration of the flicker effect*/

function nantu_show_page() {
	document.body.classList.remove("nantu_antiflicker");
}

if(typeof(window.nantu_unhide) === "undefined") {
	window.nantu_unhide = false;
}

if(window.nantu_unhide) {
	nantu_show_page();
} else {
	setTimeout(nantu_show_page, nantu_flicker_duration);
}
</script>
```

