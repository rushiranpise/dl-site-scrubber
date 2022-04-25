
# SiteScrubber
SiteScrubber is specifically made for various download sites that have you wait a certain amount of time, or click a button that is buried behind invisible blocks that intercept your click and take you to a different site. This userscript will help remove all the clutter and make the page simple to navigate and complete to download your requested files!

Many of the supported sites are widely used on the [Mobilism Forums](https://forum.mobilism.org/)

# Installation

1. Make sure you have user scripts enabled in your browser (these instructions refer to the latest versions of the browser):

To use user scripts you need to first install a user script manager. Here are managers for various browsers:

- [Violentmonkey](https://violentmonkey.github.io/) - Chrome, Firefox, Maxthon, Opera
  - Supports both GM 3 and GM 4 userscripts.
- [Tampermonkey](https://tampermonkey.net/) - Chrome, Microsoft Edge, Safari, Opera, Firefox (also with support for mobile Dolphin Browser and UC Browser)
  - Supports both GM 3 and GM 4 userscripts.
- [Greasemonkey](http://www.greasespot.net/) - Firefox
  - Supports GM 4 userscripts.
  - Supports GM 3 userscripts.
- [Firemonkey](https://addons.mozilla.org/firefox/addon/firemonkey/) - Firefox
  - Supports GM 4 userscripts and some GM 3 userscripts.
- [USI](https://addons.mozilla.org/firefox/addon/userunified-script-injector/) - Firefox
  - Supports some GM 3 userscripts.

The most popular userscript managers are Greasemonkey, Tampermonkey, and Violentmonkey.

2. Install SiteScrubber from a source
	- [SiteScrubber on GitHub](https://github.com/PrimePlaya24/dl-site-scrubber/raw/master/dist/SiteScrubber.user.js)
	- [SiteScrubber on GreasyFork](https://greasyfork.org/en/scripts/426078-sitescrubber)
	- [SiteScrubber on OpenUserJS](https://openuserjs.org/scripts/PrimePlaya24/SiteScrubber)
3. PROFIT!!!!

** *Suggest you also install [uBlock Origin](https://github.com/gorhill/uBlock) as many of the supported sites are COVERED in Ads!* **

# Features
SiteScrubber will:

 - Remove many unnecessary elements
 - Auto submit forms once CAPTCHA has been completed and/or once timer reaches 0
 - Automates clicks on page
 - Adds ability to hover over buttons to bypass clickjacking on invisible elements
 - Makes all supported sites **DARK MODE** by force 😉
 - Customize and style page buttons to facilitate the required steps
 - Attempt to remove many Ads generated on the page
    - Blocks functions/variables in window
    - Watches for elements added dynamically as well


# List of Supported Sites [Updated 2022-04-24]
- apk.miuiku.com ⭐
- apkadmin.com ⭐
- centfile.com
- chedrive.com ⭐
- clicknupload.cc ⭐
- dailyuploads.net
- ddownload.com
- depositfiles.com ⭐
- dlupload.com
- douploads.net
- drop.download ⭐
- fastclick.to
- file-upload.com
- file4.net
- filelox.com ⭐
- filerio.in
- hexupload.net ⭐
- indishare.org ⭐
- intoupload.net
- katfile.com
- mega4up.com
- mixloads.com
- nitro.download
- tusfiles.com ⭐
- up-load.io
- upfiles.io
- upload-4ever.com
- uploadev.org
- uploady.io/uploadydl.com
- uploadrar.com ⭐
- usersdrive.com
- userupload.in
- userupload.net
- veryfiles.com

***⭐ - Site has been automated fully (no ReCAPTCHA), meaning once the download page is opened, the script completes the requirements without user input!***

## Examples

| BEFORE | AFTER |
| - | - |
|![](https://github.com/PrimePlaya24/dl-site-scrubber/raw/master/examples/apkadmin.com-before.jpg) | ![](https://github.com/PrimePlaya24/dl-site-scrubber/raw/master/examples/apkadmin.com-after.jpg) |
| ![](https://github.com/PrimePlaya24/dl-site-scrubber/raw/master/examples//mixloads.com-before.jpg) | ![](https://github.com/PrimePlaya24/dl-site-scrubber/raw/master/examples/mixloads.com-after.jpg) |
| ![](https://github.com/PrimePlaya24/dl-site-scrubber/raw/master/examples//upload-4ever.com-before.jpg) | ![](https://github.com/PrimePlaya24/dl-site-scrubber/raw/master/examples/upload-4ever.com-after.jpg) |
