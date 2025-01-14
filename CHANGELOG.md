# Changelog

## Versioning

Using the [semver](https://semver.org/) system to manage versioning: `<MAJOR>.<MINOR>.<PATCH>`.

- MAJOR version changes represent a significant change to the fundamental architecture of CyberChef and may (but don't always) make breaking changes that are not backwards compatible.
- MINOR version changes usually mean the addition of new operations or reasonably significant new features.
- PATCH versions are used for bug fixes and any other small tweaks that modify or improve existing capabilities.

All major and minor version changes will be documented in this file. Details of patch-level version changes can be found in [commit messages](https://github.com/PrimePlaya24/dl-site-scrubber/commits/master).


## Details

### [2.1.7] - 2022-06-04
- Update chedrive.com
    - Add support for new domain under chedrive.net

### [2.1.6] - 2022-06-04
- Add gplinks.co support ([Issue #9](https://github.com/PrimePlaya24/dl-site-scrubber/issues/9))
    - Add support for beingupdated.com and mynewsmedia.co which is a sister sites of gplinks.co

### [2.1.5] - 2022-06-03
- Fix drop.download ([Issue #16](https://github.com/PrimePlaya24/dl-site-scrubber/issues/16))
- Added **build.py** script to update all files for distribution

### [2.1.4] - 2022-04-26
- Add support for DropGalaxy.com again
    - Resolve related issues ([Issue #10](https://github.com/PrimePlaya24/dl-site-scrubber/issues/10)) and [Issue #11](https://github.com/PrimePlaya24/dl-site-scrubber/issues/11))
- Add interceptPreventDefault() function

### [2.1.3] - 2022-04-24
- Fix issues and update methods for RapidGator ([Issue #14](https://github.com/PrimePlaya24/dl-site-scrubber/issues/14))
- Add support for uploady.io/uploadydl.com
- Add interceptXMLHttpRequest() function

### [2.1.2] - 2022-04-21
- Add support for apk.miuiku.com ⭐ ([Issue #12](https://github.com/PrimePlaya24/dl-site-scrubber/issues/12))

### [2.1.1] - 2022-04-21
- Fixed issue in addCustomCSSStyle() ([Issue #13](https://github.com/PrimePlaya24/dl-site-scrubber/issues/13))
- Updated script for UploadRar

### [2.1.0] - 2022-03-10
- Removed support for DropGalaxy

### [2.0.1] - 2021-10-05
- Complete rewrite!
- Uses ES6 Class
- Update all supported sites to conform to need methods
- Made custom CSS style for button to make it easier to find
    - **Red** when page is not ready
    - **Green** when page is ready
- New method to destroy global variables that were used by the page to hinder user experience
    - Writes the global variables so they cannot be overwritten/assigned again
        - Essentially breaks when the malicious functions try to call the global variable
- and more!
