// ==UserScript==
// @name         SiteScrubber - All-in-One
// @namespace    SiteScrubber
// @version      1.1.0
// @description  Scrub site of ugliness and ease the process of downloading from multiple sites!
// @author       PrimePlaya24
// @license      GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// @icon         https://raw.githubusercontent.com/PrimePlaya24/dl-site-scrubber/master/icons/SiteScrubber-aio_icon.png
// @homepageURL  https://github.com/PrimePlaya24/dl-site-scrubber
// @supportURL   https://github.com/PrimePlaya24/dl-site-scrubber/issues
// @updateURL    https://raw.githubusercontent.com/PrimePlaya24/dl-site-scrubber/master/scripts/SiteScrubber-AiO.meta.js
// @downloadURL  https://raw.githubusercontent.com/PrimePlaya24/dl-site-scrubber/master/scripts/SiteScrubber-AiO.user.js
// @include      /^(?:https?:\/\/)?(?:www\.)?dropapk\.(to|com)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?drop\.download\//
// @include      /^(?:https?:\/\/)?(?:www\.)?mixloads\.com//
// @include      /^(?:https?:\/\/)?(?:www\.)?dropgalaxy\.(in|com)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?tech(ssting|yneed)\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?file-up(load)?\.(com|org)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?up-load\.io\//
// @include      /^(?:https?:\/\/)?(?:www\.)?uploadrar\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?mega4up\.(com|org)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?userupload\.(in|net)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?rapidgator\.net\/(file|download\/captcha)/
// @include      /^(?:https?:\/\/)?(?:www\.)?katfile\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?upload-4ever\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?uploadev\.org\//
// @include      /^(?:https?:\/\/)?(?:www\.)?apkadmin\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?upfiles\.(io|com)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?hexupload\.net\//
// @include      /^(?:https?:\/\/)?(?:www\.)?usersdrive\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?khabarbabal\.online\//
// @include      /^(?:https?:\/\/)?(?:www\.)?dlsharefile\.(com|org)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?file4\.net\//
// @include      /^(?:https?:\/\/)?(?:www\.)?dailyuploads\.net\//
// @include      /^(?:https?:\/\/)?(?:www\.)?indi-share\.(com|net)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?techmyntra\.(com|net)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?depositfiles\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?clicknupload\.cc\//
// @include      /^(?:https?:\/\/)?(?:www\.)?veryfiles\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?douploads\.net\//
// @run-at       document-start
// @grant        none
// ==/UserScript==

class SiteScrubber {
  constructor(rules) {
    this.o_debug = true;

    this.window = window;
    this.document = window.document;
    this.logNative = window.console.log;
    /*
    uBlock Origin replaces window.open with a Proxy,
    might need a work around to allow opening download
    links when users have this extension enabled.
    */
    this.openNative = window.open.bind(window);
    this.url = document.location.href;
    this.host = document.location.host;
    this.domain = document.domain;
    this.$ = document.querySelector.bind(document);
    this.$$ = document.querySelectorAll.bind(document);

    this.origAddEventListener = EventTarget.prototype.addEventListener;
    this.origAppendChild = HTMLElement.prototype.appendChild;
    this.origSetInterval = window.setInterval.bind(window);
    this.origSetTimeout = window.setTimeout.bind(window);

    // Just in case we do not specify
    this.countdownSecondsLeft = 30;
    this.countdownInterval = null;

    this.currSiteRules = rules;
    // this.siteRules = siteRules;
    // this.addCustomCSSStyle(this.siteRules.customStyle);
  }
  setup() {
    this.logDebug("Initializing SiteScrubber...");

    this.destroyWindowFunctions(this.currSiteRules?.destroyWindowFunctions);
    if (
      this.document.readyState === "complete" ||
      this.document.readyState === "interactive"
    ) {
      this.logDebug("Site is ready, applying rules...");
      this.applyRules();
    } else {
      this.logDebug(
        "Waiting to apply rules once page is ready. Event listener added."
      );
      this.origAddEventListener.apply(window, [
        "DOMContentLoaded",
        () => {
          this.applyRules();
          this.logDebug("Site is ready, applying rules...");
        },
      ]);
    }
    return this;
  }
  log(str) {
    this.logNative(`[SS-LOG] ${str}`);
  }
  logDebug(str) {
    if (this.o_debug) this.logNative(`[SS-DEBUG] ${str}`);
  }
  logDebugNaked(str) {
    if (this.o_debug) this.logNative(str);
  }
  plug(data) {
    if (arguments.callee.counter) {
      arguments.callee.counter++;
    } else {
      arguments.callee.counter = 1;
    }
    this.logDebug(data);
    this.logDebugNaked(arguments);
    // this.window.alert(data);
  }
  ifElementExists(query, fn = () => undefined) {
    return this.$(query) && fn(query);
  }
  addCustomCSSStyle(cssStr) {
    if (!cssStr) {
      return;
    }
    this.logDebug("Adding custom CSS styles");
    // make new <style> element
    const newNode = this.document.createElement("style");
    // set the inner text to the user input
    newNode.textContent = cssStr;
    // select where to place our <style> element
    const targ =
      this.document.head || this.document.body || this.document.documentElement;
    // append our <style> element to the page
    targ.appendChild(newNode);
  }
  async waitUntilSelector(query) {
    if (!query) {
      return;
    }
    const _this = this;
    this.logDebug(`Waiting for selector: ${query}`);
    while (!this.$(query)) {
      // if not found, wait and check again in 500 milliseconds
      await new Promise((r) => _this.origSetTimeout(r, 500));
    }
    this.logDebug(`Found element by selector: ${query}`);
    return new Promise((resolve) => {
      // resolve/return the found element
      resolve(this.$(query));
    });
  }
  async waitUntilGlobalVariable(...variableNames) {
    this.logDebug(
      `Waiting for global variable: window.${variableNames.join(".")}`
    );
    const _this = this;
    let curr = window;
    while (curr == window || curr == undefined) {
      curr = window;
      for (const k of variableNames) {
        if (curr == undefined) break;
        curr = curr?.[k];
      }
      // if not found, wait and check again in 500 milliseconds
      await new Promise((r) => _this.origSetTimeout(r, 500));
    }
    this.logDebug(`Found global variable: window.${variableNames.join(".")}`);
    return new Promise((resolve) => {
      // resolve/return the found element
      resolve(curr);
    });
  }
  finalDownloadLinkOpener(query, regex) {
    if (!query) {
      return;
    }
    this.logDebug(
      `Trying to find final download link using: [${query}, ${regex}]`
    );
    this.waitUntilSelector(query).then((element) => {
      if (
        regex instanceof RegExp &&
        !regex.test(this.document.body.innerText)
      ) {
        this.log("DDL Link not found on this page or Regex test failed.");
      } else {
        this.log("DDL Link was found on this page.");
        this.openNative?.(element?.href, "_self");
        this.logDebug(
          `finalDownloadLinkOpener() - ${element?.tagName}.href: ${element?.href}`
        );
        this.logDebug("Opening DDL link for file.");
      }
    });
  }
  removeElements(elements) {
    if (!elements) {
      return;
    }
    this.logDebug("Running removeElements");
    if (typeof elements == "string" || elements instanceof String) {
      // add it to an array so we can use Array functions
      elements = [elements];
    }
    [...elements].forEach((e) => {
      if (typeof e == "string" || e instanceof String) {
        // remove found elements
        this.$$(e).forEach((ele) => ele.remove());
      } else if (e instanceof HTMLElement) {
        // remove HTMLElement
        e.remove();
      }
    });
  }
  removeElementsByRegex(query, regex) {
    if (!query) {
      return;
    }
    this.logDebug("Running removeElementsByRegex");
    this.$$(query).forEach((ele) => {
      if (regex.test(ele.innerText)) {
        // remove found elements if RegEx matches
        ele.remove();
      }
    });
  }
  addJQuery() {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    const targ =
      this.document.head || this.document.body || this.document.documentElement;
    targ.appendChild(s);
  }
  async addGoogleRecaptchaListener(formElement, timer = 0) {
    const _this = this;
    if (!formElement) {
      return;
    }
    if (formElement instanceof HTMLElement && formElement.tagName == "FORM") {
      this.log("Form selected!");
    } else if (
      typeof formElement == "string" ||
      formElement instanceof String
    ) {
      // try to find form based on selector
      formElement = this.$(formElement);
    }
    if (!formElement || !window.grecaptcha) {
      this.log("No Google Captcha found...");
      return;
    }
    return new Promise((res, rej) => {
      // save current date
      const then = new Date();
      let counter = 0;
      const INTERVAL = 250;
      // interval to check every 250 milliseconds if ReCAPTCHA
      // has been completed, then the form gets submitted
      const checker = _this.origSetInterval(() => {
        if (
          window.grecaptcha?.getResponse?.() &&
          Math.floor((new Date() - then) / 1000) > timer
        ) {
          // stop interval from continuing
          clearInterval(checker);
          formElement.submit();
          res();
        } else {
          counter++;
        }
        if (counter >= 7200) {
          // stop interval and give up checking
          clearInterval(checker);
          res();
        }
      }, INTERVAL);
    });
  }
  createGoogleRecaptcha(elementTarget, site_key, position = "beforeend") {
    if (typeof elementTarget == "string" || elementTarget instanceof String) {
      elementTarget = this.$(elementTarget);
    }
    if (!(elementTarget instanceof HTMLElement) || null === elementTarget) {
      this.logDebug("createGoogleRecaptcha - failed to find element");
      return;
    }
    this.logDebug("createGoogleRecaptcha() - element to add under");
    this.logDebugNaked(elementTarget);
    const script = this.document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    this.document.body.appendChild(script);
    this.waitUntilGlobalVariable("grecaptcha").then(() => {
      elementTarget.insertAdjacentHTML(
        position,
        `<div id="ss-recaptcha" data-sitekey="${site_key}" data-starttime="${+new Date()}"></div>`
      );
      grecaptcha.render("ss-recaptcha", {
        sitekey: site_key,
      });
    });
  }
  modifyGoogleRecaptcha(timer = 0) {
    const grecaptchaElem = this.$(".g-recaptcha");
    const site_key = grecaptchaElem?.getAttribute("data-sitekey");
    grecaptchaElem.innerHTML = `<div id="ss-recaptcha" data-sitekey="${site_key}" data-starttime="${+new Date()}"></div>`;
    grecaptcha.render("ss-recaptcha", {
      sitekey: site_key,
      callback() {
        const form = __ss.findParentElementByTagName(
          __ss.$("#ss-recaptcha"),
          "form"
        );
        if (form) {
          form.submit();
        }
      },
    });
  }
  removeIFrames() {
    this.log("Removing unwanted scripts from page");
    let i = 0;
    this.$$("iframe").forEach((iframe) => {
      if (!/google/gi.test(iframe.src)) {
        iframe.remove();
        i++;
      }
    });
    this.logDebug(`Removed ${i} iFrames`);
  }
  removeDisabledAttr() {
    this.log("Enabling all buttons");
    this.$$("*").forEach((e) => {
      e.removeAttribute("disabled");
    });
  }
  hideElements(elements = []) {
    if (!elements.length) {
      return;
    }
    // 0 - displayFlag --- display: none
    // 1 - displayFlag --- visibility: hidden
    this.log("Running hideElements");
    if (typeof elements == "string" || elements instanceof String) {
      elements = [elements];
    }
    [...elements].forEach((e) => {
      if (typeof e == "string" || e instanceof String) {
        if (displayFlag) {
          // 1 - displayFlag --- visibility: hidden
          this.$$(e).forEach((ele) => (ele.style.visibility = "hidden"));
        } else {
          // 0 - displayFlag --- display: none
          this.$$(e).forEach((ele) => (ele.style.display = "none"));
        }
      } else if (e instanceof HTMLElement) {
        if (displayFlag) {
          // 1 - displayFlag --- visibility: hidden
          e.style.visibility = "hidden";
        } else {
          // 0 - displayFlag --- display: none
          e.style.display = "none";
        }
      }
    });
    this.logDebug(`Elements hidden: ${elements}`);
  }
  async sleep(ms) {
    const _this = this;
    return new Promise((resolve) => _this.origSetTimeout(resolve, ms));
  }
  findParentElementByTagName(el, tagName) {
    const tag = tagName.toLowerCase();

    while (el && el.parentNode) {
      el = el.parentNode;
      if (el.tagName && el.tagName.toLowerCase() == tag) {
        return el;
      }
    }
    return null;
  }
  checkIfDownloadPage(arrayOfSelectors = [], arrayOfRegexTests = []) {
    if (
      (arrayOfSelectors instanceof Array &&
        arrayOfSelectors.some((selector) =>
          Boolean(this.document.querySelector(selector))
        )) ||
      (arrayOfRegexTests instanceof Array &&
        arrayOfRegexTests.some((regex) =>
          regex?.test(this.document.body.innerText)
        ))
    ) {
      this.logDebug("Found something! Assuming this is a download page!");
      return true;
    }
    this.logDebug("Found nothing! Skipping this page. Not a downloading page.");
    this.logDebug(
      `checkIfDownloadPage() - ${arrayOfSelectors}, ${arrayOfRegexTests}`
    );
    return false;
  }
  addHoverAbility(elements = [], requireGoogleReCAPTCHA = false) {
    if (!elements) {
      return;
    }
    const _this = this;
    function addEvent(element) {
      // element.addEventListener = _this.origAddEventListener;
      if (requireGoogleReCAPTCHA) {
        // element.addEventListener
        _this.origAddEventListener.bind(element)(
          "mouseenter",
          () => {
            element.dataset.timeout = _this.origSetTimeout(function () {
              if (window.grecaptcha.getResponse()) element.click();
            }, 2000);
          },
          false
        );
      } else {
        // element.addEventListener
        _this.origAddEventListener.bind(element)(
          "mouseenter",
          () => {
            element.dataset.timeout = _this.origSetTimeout(function () {
              element.click();
            }, 2000);
          },
          false
        );
      }
      _this.logDebug(`Added 'mouseenter' event to ${element.innerHTML}`);
      // element.addEventListener
      _this.origAddEventListener.bind(element)(
        "mouseleave",
        () => {
          clearTimeout(element.dataset.timeout);
        },
        false
      );
      _this.logDebug(`Added 'mouseleave' event to ${element.innerHTML}`);
    }
    if (typeof elements == "string" || elements instanceof String) {
      elements = [elements];
    }
    [...elements].forEach((e) => {
      if (typeof e == "string" || e instanceof String) {
        this.$$(e).forEach(addEvent);
      } else if (e instanceof HTMLElement) {
        addEvent(e);
      }
    });
  }
  addInfoBanner(elementToAddTo, where = "beforeend") {
    if (elementToAddTo instanceof HTMLElement) {
      // Already an HTMLElement
    } else if (
      typeof elementToAddTo == "string" ||
      elementToAddTo instanceof String
    ) {
      elementToAddTo = this.$(elementToAddTo);
    }
    if (!elementToAddTo) {
      return;
    }
    this.logDebug("Adding SiteScrubber hover info banner");

    this.addCustomCSSStyle(
      `.ss-alert-warning{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.ss-alert{width:100%;padding:15px;margin-bottom:20px;border:1px solid transparent;border-radius:4px}.ss-col-md-12{width:100%}.ss-mt-5{margin-top:5em}.ss-text-center{text-align:center}`
    );
    const newNode = `<div class="ss-alert ss-alert-warning ss-mt-5 ss-text-center">TO PREVENT MALICIOUS REDIRECT, <b>HOVER</b> OVER THE BUTTON FOR 2 SECONDS TO SUBMIT CLEANLY</div>`;
    elementToAddTo.insertAdjacentHTML(where, newNode);
    this.logDebug(
      `addInfoBanner() - elementToAddTo: ${elementToAddTo}, ${where}`
    );
  }
  destroyWindowFunctions(options = []) {
    this.logDebug(`Destroying window functions: [${options.join(", ")}]`);
    if (void 0 === options || options.length == 0) {
      return;
    }
    const whitelist = [
      "siteScrubber",
      "$",
      "jQuery",
      "___grecaptcha_cfg",
      "grecaptcha",
      "__recaptcha_api",
      "__google_recaptcha_client",
      "recaptcha",
    ];
    for (const option of options) {
      // window[option] = function () {};
      if (whitelist.includes(option)) {
        this.logDebug(`Skipping destroy of ${option}`);
        continue;
      }
      try {
        this.window.Object.defineProperty(this.window, option, {
          configurable: false,
          set(value) {
            return function () {};
          },
          get() {
            return function () {};
          },
        });
        this.logDebug(`Destoyed window function: 'window.${option}'`);
      } catch (e) {
        this.logDebug(`FAILED to destroy window function: 'window.${option}'`);
        this.logDebug(e);
      }
    }
  }
  interceptAddEventListeners(fn) {
    this.log("Adding addEventListener hook");
    const _this = this;
    EventTarget.prototype.addEventListener = function (
      event,
      listener,
      bubbling
    ) {
      let allow = true;
      if (fn !== undefined && typeof fn === "function") {
        allow = !!fn.apply(this, arguments);
      } else if (/grecaptcha|google/.test(listener.toString())) {
        allow = true;
      } else if (
        event === "click" ||
        event === "mousedown" ||
        event === "mouseup" ||
        event === "onunload" ||
        event === "beforeunload"
      ) {
        allow = false;
      }
      if (allow) {
        _this.logDebug(`Allowing event type: ${event}`);
        _this.logDebugNaked(listener);
        _this.origAddEventListener.apply(this, arguments);
      } else {
        _this.logDebug(`Intercepted attaching event listener: '${event}'`);
      }
    };
  }
  interceptAJAX(fn) {
    this.log("Adding AJAX hook");
    const _this = this;
    this.waitUntilGlobalVariable("jQuery").then(function () {
      const origAJAX = window.jQuery?.ajax;
      window.jQuery.origAJAX = origAJAX;
      window.jQuery.ajax = function () {
        let allow = true;
        if (fn !== undefined && typeof fn === "function") {
          allow = !!fn.apply(this, arguments);
        } else if (arguments?.[0]?.url?.search("xxx") > -1) {
          allow = false;
        }
        if (allow) {
          return origAJAX.apply(this, arguments);
        } else {
          _this.log("Stopped AJAX call");
          _this.logDebug(`Blocked: ${arguments?.[0]?.url}`);
        }
      };
    });
  }
  interceptAppendChild(fn) {
    const _this = this;
    const customAppendChild = function (node) {
      let allow = true;
      if (fn !== undefined && typeof fn === "function") {
        allow = !!fn.apply(this, arguments);
      } else if (
        node.tagName === "SCRIPT" ||
        node.tagName === "IFRAME" ||
        node.tagName === "LINK"
      ) {
        if (!/grecaptcha|google\./gi.test(node.src)) {
          allow = false;
        }
      } else if (node.style.zIndex === "2147483647") {
        allow = false;
      }
      if (allow) {
        _this.logDebug(`Allowing appending child: ${node.tagName}`);
        return _this.origAppendChild.apply(this, arguments);
      } else {
        _this.logDebug(
          `Intercepted attaching event listener: '${node.tagName}'`
        );
      }
    };
    HTMLElement.prototype.appendChild = customAppendChild;
    _this.document.appendChild = customAppendChild;
  }
  createCountdown(element, timer) {
    if (typeof element == "string" || element instanceof String) {
      element = this.$(element);
    }
    if (!(element instanceof HTMLElement) || null === element) {
      this.logDebug("createCountdown - failed to find element");
      return;
    } else if (!timer && isNaN(+element.innerText)) {
      // default
      timer = 30;
    } else {
      timer = +element.innerText;
    }
    this.logDebug("createCountdown - found element, creating timer");
    siteScrubber.countdownSecondsLeft = timer;
    siteScrubber.countdownInterval = siteScrubber.origSetInterval(
      siteScrubber.tick.bind(this, element),
      1000
    );
  }
  tick(element) {
    const remaining = --siteScrubber.countdownSecondsLeft;
    if (remaining < 0) {
      clearInterval(siteScrubber.countdownInterval);
      siteScrubber.countdownInterval = null;
    } else {
      element.innerText = remaining;
      this.logDebug(`Tick: ${remaining}`);
    }
  }
  applyRules() {
    this.log("STARTING CLEANER!");

    if (
      !this.checkIfDownloadPage(
        this.currSiteRules?.downloadPageCheckBySelector,
        this.currSiteRules?.downloadPageCheckByRegex
      )
    ) {
      this.log("Did not match as a download page... Stopping.");
      return;
    } else {
      this.log("Assuming this is a download page.");
    }

    this.addCustomCSSStyle(this.currSiteRules?.customStyle);
    this.log("Added custom CSS styling");
    if (this.currSiteRules?.createCountdown) {
      this.createCountdown(this.currSiteRules?.createCountdown);
      this.log(
        `Created countdown using: ${this.currSiteRules?.createCountdown}`
      );
    }
    this.removeElements(this.currSiteRules?.remove);
    // this.plug("Removed Elements");
    this.currSiteRules?.removeByRegex?.forEach(([selector, regex]) =>
      this.removeElementsByRegex(selector, regex)
    );
    this.log("Removed elements");
    // this.plug("Removed Elements By Regex");
    this.hideElements(this.currSiteRules?.hideElements);
    this.log("Hid elements");
    if (this.currSiteRules?.removeIFrames) {
      this.removeIFrames();
      this.log("Removed iFrames");
    }
    if (this.currSiteRules?.removeDisabledAttr) {
      this.removeDisabledAttr();
      this.log("Removed 'disabled' attribute from all elements");
    }
    this.currSiteRules?.finalDownloadElementSelector?.forEach(
      ([selector, regex]) => this.finalDownloadLinkOpener(selector, regex)
    );
    this.currSiteRules?.addHoverAbility?.forEach(
      ([elements, requiresRecaptcha]) =>
        this.addHoverAbility(elements, requiresRecaptcha)
    );
    this.currSiteRules?.addInfoBanner?.forEach(([element, where]) =>
      this.addInfoBanner(element, where)
    );
    this.log("Running site's custom made script");
    this.currSiteRules?.customScript?.bind(this)?.();
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const siteRules = {
  dropapk: {
    host: ["drop.download", "dropapk.to"],
    customStyle: `html,body{background:#121212!important;color:#dfdfdf!important}#container{background:#121212!important}.download_box{background-color:#323232!important}.bg-white{background:#121212!important}`,
    downloadPageCheckBySelector: [
      "button#method_free",
      "button#downloadbtn",
      "div.download_box",
    ],
    downloadPageCheckByRegex: [
      /Slow download/gi,
      /your IP next 8 hours/gi,
      /Enter code below/gi,
    ],
    remove: [
      ".adsbox",
      "#content",
      ".features__section",
      "footer",
      "nav",
      ".payment_methods",
      "adsbox",
    ],
    removeByRegex: [[".download_method", /fast download/gi]],
    removeIFrames: true,
    removeDisabledAttr: true,
    destroyWindowFunctions: ["ethereum"],
    finalDownloadElementSelector: [["div.download_box a"]],
    addHoverAbility: [["#downloadbtn"], ["a.btn-block"]],
    addInfoBanner: ["div.download_box"],
    customScript() {
      // click the "Slow Download" option on page 1
      this.$("button#method_free")?.click();
      const captcha_box = this.$(".download_box div");
      if (captcha_box) {
        const captcha_code = [...captcha_box?.children]
          .sort(
            (x, y) =>
              x.getAttribute("style").match(/padding-left:(\d+)/)?.[1] -
              y.getAttribute("style").match(/padding-left:(\d+)/)?.[1]
          )
          .map((e) => e.textContent)
          .join("");
        this.$("input.captcha_code").value = captcha_code;
        document.forms?.F1?.submit();
      }

      this.$(".col-md-4")?.classList.replace("col-md-4", "col-md-12");
      this.$("p.mb-5")?.classList.remove("mb-5");
      this.addInfoBanner("#container .container .row", "beforeend");
    },
  },
  mixloads: {
    host: ["mixloads.com"],
    customStyle: `html,body,#container,div.download_method{background:#121212!important;color:#dfdfdf!important}.download_box{background-color:#323232!important}.bg-white{background:#121212!important}`,
    downloadPageCheckBySelector: [
      "button#method_free",
      "button#downloadbtn",
      "div.download_box",
    ],
    downloadPageCheckByRegex: [
      /Slow download/gi,
      /your IP next 8 hours/gi,
      /Enter code below/gi,
    ],
    remove: [
      ".adsbox",
      "#content",
      ".col-md-8",
      ".features__section",
      "footer",
      "nav",
      ".payment_methods",
      "adsbox",
      "ul.features",
    ],
    removeByRegex: [[".download_method", /fast download/gi]],
    hideElements: [["table", 0]],
    removeIFrames: true,
    removeDisabledAttr: true,
    finalDownloadElementSelector: [["div.download_box a", /Link Generated/gi]],
    addHoverAbility: [
      ["#downloadbtn"],
      ["a.btn-block"],
      ["button#method_free"],
    ],
    addInfoBanner: [
      [".download_box > a", "afterend"],
      ["form > .container > .row", "beforeend"],
    ],
    customScript() {
      // click the "Slow Download" option on page 1
      this.$("button#method_free")?.click();
      this.$(".col-md-4")?.classList.replace("col-md-4", "col-md-12");
      this.$("p.mb-5")?.classList.remove("mb-5");

      // style page for convenience
      this.ifElementExists("div.download_box img", () => {
        this.$("div.download_box").insertAdjacentHTML(
          "afterbegin",
          '<div class="input-group mb-3"></div><div class="input-group-prepend text-center"></div><span class="input-group-text font-weight-bold">Captcha Code </span>'
        );
        this.$("div.download_box span.input-group-text").appendChild(
          this.$("input.captcha_code")
        );
        this.$("input.captcha_code")?.classList.add("form-control");
        this.$("div.download_box").insertAdjacentElement(
          "afterbegin",
          this.$("img")
        );

        // Make the remaining elements neat
        this.$(".download_box")?.classList.add("container");
        this.$$("img").forEach((e) => {
          if (/captcha/gi.test(e.src)) {
            e.style.height = "8em";
            e.style.width = "auto";
          }
        });
      });
    },
  },
  dropgalaxy: {
    host: [
      "dropgalaxy.com",
      "dropgalaxy.in",
      "techssting.com",
      "techyneed.com",
    ],
    customStyle: `html,body,#container,.bg-white{background:#121212!important;color:#dfdfdf!important}.download_box{background-color:#323232!important}ins,#badip,#vi-smartbanner,.adsBox,vli,div[style*='2147483650'],#modalpop,#overlaypop{display:none!important}body{padding-bottom:unset!important}`, // body > div:not([class])
    downloadPageCheckBySelector: ["button[name='method_free']", "a#dl"],
    downloadPageCheckByRegex: [
      /Click here to download/gi,
      /This direct link will be available for/gi,
      /Create download link/gi,
    ],
    remove: [
      "nav",
      "footer",
      ".sharetabs ul",
      "#load img",
      "ul#article",
      "br",
      "button[name='method_premium']",
      ".adsBox",
      "#vi-smartbanner",
    ],
    removeByRegex: [
      [".download_method", /fast download/gi],
      [".row.pt-4.pb-5", /307200/gi],
      ["ul", /What is DropGalaxy?/gi],
      ["div.mt-5.text-center", /ad-free/gi],
    ],
    hideElements: undefined,
    removeIFrames: true,
    removeDisabledAttr: true,
    destroyWindowFunctions: [
      "__CF$cv$params",
      "absda",
      // "go",
      "adsbygoogle",
      "_0xab85",
      "_0x4830",
      "_0x1d5c98",
      "_0x20de87",
      "_0x3b510c",
      "_0x23aaed",
      "_0x71ffdf",
      "_0x16b49f",
      "_0x167e3f",
      "_0x695d81",
      "_0x3fa68e",
      "isDesktop",
      "ip",
      "AaDetector",
      "LieDetector",
      "__cfBeacon",
    ],
    finalDownloadElementSelector: [
      ["div.container.page.downloadPage > div > div.col-md-4 > a"],
    ],
    addHoverAbility: [
      ["div.container.page.downloadPage > div > div.col-md-4 > a"],
      ["button#dl"],
    ],
    addInfoBanner: [[".container.page.downloadPage .row", "beforeend"]],
    customScript() {
      this.$("body").classList.remove("white");
      this.$("body").classList.add("dark");
      this.window?.["setStyleSheet"]?.(
        "https://dropgalaxy.com/assets/styles/dark.min.css"
      );
      if (
        /proxy not allowed/gi.test(
          this.$("center div.alert.alert-danger.mb-3")?.textContent
        )
      ) {
        this.log("Site does not like your IP address, stopping script");
        return;
      }
      this.$$(".col-md-4").forEach((e) =>
        e.classList.replace("col-md-4", "col-12")
      );

      this.$("button[name='method_free']")?.click();

      this.waitUntilSelector("a.btn.btn-block.btn-lg.btn-primary").then(
        (dl_btn) => {
          dl_btn.removeAttribute("style");
          dl_btn.removeAttribute("onclick");
        }
      );
      this.waitUntilSelector("form button#dl").then((dl_btn) => {
        dl_btn.removeAttribute("style");
        dl_btn.removeAttribute("onclick");
      });
      this.waitUntilGlobalVariable("go").then(() => (window.go = undefined));
      this.waitUntilGlobalVariable("absda").then(() => {
        window.absda = undefined;
      });

      this.$("#downloadhash")?.setAttribute("value", "0");
      this.$("#dropgalaxyisbest")?.setAttribute("value", "0");
      this.$("#adblock_check")?.setAttribute("value", "0");
      this.$("#adblock_detected")?.setAttribute("value", "1");
      this.$("#admaven_popup")?.setAttribute("value", "1");
      if (this.$("#xd")) {
        this.sleep(+this.$(".seconds")?.innerText * 1000 || 10000).then(() => {
          fetch("https://tmp.dropgalaxy.in/gettoken.php", {
            headers: {
              accept: "*/*",
              "accept-language": "en-US,en;q=0.9",
              "content-type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "cross-site",
              "sec-gpc": "1",
            },
            referrer: "https://dropgalaxy.com/",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: "rand=&msg=91%2C100%2C111%2C119%2C110%2C108%2C111%2C9007%2C100%2C005004%2C9007%2C100%2C10005%2C11007%2C9007%2C114%2C100%2C005004%2C11007%2C110%2C108%2C111%2C99%2C10007%2C101%2C100%2C005004%2C118%2C101%2C114%2C115%2C105%2C111%2C110%2C9005%2C91%2C114%2C9007%2C110%2C100%2C61%2C9005%2C91%2C105%2C100%2C61%2C110%2C99%2C104%2C49%2C56%2C110%2C101%2C10007%2C101%2C51%2C100%2C49%2C9005%2C91%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C105%2C115%2C98%2C101%2C115%2C116%2C61%2C48%2C9005%2C91%2C9007%2C100%2C98%2C108%2C111%2C99%2C10007%2C95%2C100%2C101%2C116%2C101%2C99%2C116%2C101%2C100%2C61%2C49%2C9005%2C91%2C100%2C111%2C119%2C110%2C108%2C111%2C9007%2C100%2C104%2C9007%2C115%2C104%2C61%2C49%2C9005%2C91%2C100%2C111%2C119%2C110%2C108%2C111%2C9007%2C100%2C104%2C9007%2C115%2C104%2C9007%2C100%2C61%2C11007%2C110%2C100%2C101%2C10004%2C105%2C110%2C101%2C100%2C9005%2C91%2C115%2C99%2C114%2C61%2C104%2C116%2C116%2C11004%2C115%2C58%2C4007%2C4007%2C99%2C111%2C110%2C116%2C101%2C10040%2C116%2C11007%2C9007%2C108%2C46%2C109%2C101%2C100%2C105%2C9007%2C46%2C110%2C101%2C116%2C4007%2C49%2C48%2C49%2C55%2C51%2C5005%2C5004%2C51%2C5007%2C5004%2C4007%2C10004%2C99%2C109%2C9007%2C105%2C110%2C46%2C106%2C115%2C6005%2C99%2C98%2C61%2C119%2C105%2C110%2C100%2C111%2C119%2C46%2C95%2C109%2C0078%2C68%2C101%2C116%2C9007%2C105%2C108%2C115%2C46%2C105%2C110%2C105%2C116%2C65%2C100%2C0058%2C0058%2C10005%2C100%2C11004%2C114%2C61%2C48%2C0058%2C99%2C105%2C100%2C61%2C56%2C6007%2C85%2C88%2C0078%2C49%2C49%2C51%2C49%2C0058%2C99%2C11004%2C99%2C100%2C61%2C116%2C66%2C8005%2C68%2C50%2C10041%2C0071%2C6007%2C84%2C0071%2C007007%2C54%2C119%2C54%2C0070%2C65%2C11005%2C5007%2C0075%2C11004%2C55%2C10005%2C005007%2C51%2C68%2C005007%2C51%2C68%2C0058%2C99%2C114%2C105%2C100%2C61%2C49%2C50%2C54%2C49%2C48%2C5004%2C48%2C55%2C49%2C0058%2C115%2C105%2C1004004%2C101%2C61%2C51%2C48%2C48%2C10040%2C54%2C48%2C48%2C0058%2C99%2C99%2C61%2C85%2C8005%2C0058%2C115%2C99%2C61%2C007005%2C0076%2C0058%2C104%2C116%2C116%2C11004%2C115%2C61%2C49%2C0058%2C118%2C105%2C10004%2C61%2C49%2C0058%2C114%2C101%2C11005%2C11007%2C114%2C108%2C61%2C104%2C116%2C116%2C11004%2C115%2C005007%2C51%2C65%2C005007%2C50%2C0070%2C005007%2C50%2C0070%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C46%2C99%2C111%2C109%2C005007%2C50%2C0070%2C56%2C50%2C5007%2C45%2C10004%2C105%2C110%2C100%2C45%2C111%2C11007%2C116%2C45%2C119%2C104%2C9007%2C116%2C45%2C9007%2C114%2C101%2C45%2C116%2C104%2C101%2C45%2C11004%2C114%2C105%2C99%2C101%2C115%2C45%2C111%2C110%2C45%2C109%2C111%2C114%2C116%2C10005%2C9007%2C10005%2C101%2C45%2C108%2C111%2C9007%2C110%2C115%2C45%2C116%2C111%2C45%2C108%2C105%2C118%2C101%2C45%2C119%2C105%2C116%2C104%2C45%2C108%2C105%2C10004%2C101%2C46%2C104%2C116%2C109%2C108%2C0058%2C10007%2C119%2C114%2C10004%2C61%2C104%2C116%2C116%2C11004%2C115%2C005007%2C51%2C65%2C005007%2C50%2C0070%2C005007%2C50%2C0070%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C46%2C99%2C111%2C109%2C0058%2C110%2C115%2C101%2C61%2C5005%2C0058%2C118%2C105%2C61%2C49%2C54%2C50%2C48%2C50%2C56%2C48%2C54%2C50%2C5004%2C55%2C48%2C5005%2C5007%2C50%2C55%2C50%2C5007%2C56%2C0058%2C11007%2C10005%2C100%2C61%2C5004%2C0058%2C110%2C98%2C61%2C49%2C9005%2C91%2C115%2C99%2C114%2C61%2C104%2C116%2C116%2C11004%2C115%2C58%2C4007%2C4007%2C99%2C111%2C110%2C116%2C101%2C10040%2C116%2C11007%2C9007%2C108%2C46%2C109%2C101%2C100%2C105%2C9007%2C46%2C110%2C101%2C116%2C4007%2C49%2C48%2C49%2C55%2C51%2C5005%2C5004%2C51%2C5007%2C5004%2C4007%2C10004%2C99%2C109%2C9007%2C105%2C110%2C46%2C106%2C115%2C6005%2C99%2C98%2C61%2C119%2C105%2C110%2C100%2C111%2C119%2C46%2C95%2C109%2C0078%2C68%2C101%2C116%2C9007%2C105%2C108%2C115%2C46%2C105%2C110%2C105%2C116%2C65%2C100%2C0058%2C0058%2C10005%2C100%2C11004%2C114%2C61%2C48%2C0058%2C99%2C105%2C100%2C61%2C56%2C6007%2C85%2C88%2C0078%2C49%2C49%2C51%2C49%2C0058%2C99%2C11004%2C99%2C100%2C61%2C116%2C66%2C8005%2C68%2C50%2C10041%2C0071%2C6007%2C84%2C0071%2C007007%2C54%2C119%2C54%2C0070%2C65%2C11005%2C5007%2C0075%2C11004%2C55%2C10005%2C005007%2C51%2C68%2C005007%2C51%2C68%2C0058%2C99%2C114%2C105%2C100%2C61%2C55%2C50%2C54%2C56%2C5005%2C56%2C50%2C5005%2C48%2C0058%2C115%2C105%2C1004004%2C101%2C61%2C51%2C48%2C48%2C10040%2C5005%2C48%2C0058%2C99%2C99%2C61%2C85%2C8005%2C0058%2C115%2C99%2C61%2C007005%2C0076%2C0058%2C104%2C116%2C116%2C11004%2C115%2C61%2C49%2C0058%2C118%2C105%2C10004%2C61%2C49%2C0058%2C114%2C101%2C11005%2C11007%2C114%2C108%2C61%2C104%2C116%2C116%2C11004%2C115%2C005007%2C51%2C65%2C005007%2C50%2C0070%2C005007%2C50%2C0070%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C46%2C99%2C111%2C109%2C005007%2C50%2C0070%2C56%2C50%2C5007%2C45%2C10004%2C105%2C110%2C100%2C45%2C111%2C11007%2C116%2C45%2C119%2C104%2C9007%2C116%2C45%2C9007%2C114%2C101%2C45%2C116%2C104%2C101%2C45%2C11004%2C114%2C105%2C99%2C101%2C115%2C45%2C111%2C110%2C45%2C109%2C111%2C114%2C116%2C10005%2C9007%2C10005%2C101%2C45%2C108%2C111%2C9007%2C110%2C115%2C45%2C116%2C111%2C45%2C108%2C105%2C118%2C101%2C45%2C119%2C105%2C116%2C104%2C45%2C108%2C105%2C10004%2C101%2C46%2C104%2C116%2C109%2C108%2C0058%2C10007%2C119%2C114%2C10004%2C61%2C104%2C116%2C116%2C11004%2C115%2C005007%2C51%2C65%2C005007%2C50%2C0070%2C005007%2C50%2C0070%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C46%2C99%2C111%2C109%2C0058%2C110%2C115%2C101%2C61%2C5005%2C0058%2C118%2C105%2C61%2C49%2C54%2C50%2C48%2C50%2C56%2C48%2C54%2C50%2C5004%2C5005%2C49%2C49%2C5004%2C51%2C5007%2C48%2C5004%2C5004%2C0058%2C11007%2C10005%2C100%2C61%2C5004%2C0058%2C110%2C98%2C61%2C49%2C9005%2C91%2C115%2C99%2C114%2C61%2C104%2C116%2C116%2C11004%2C115%2C58%2C4007%2C4007%2C11004%2C10040%2C108%2C99%2C108%2C110%2C109%2C100%2C101%2C99%2C111%2C109%2C45%2C9007%2C46%2C9007%2C10007%2C9007%2C109%2C9007%2C105%2C104%2C100%2C46%2C110%2C101%2C116%2C4007%2C106%2C9007%2C118%2C9007%2C115%2C99%2C114%2C105%2C11004%2C116%2C115%2C4007%2C98%2C114%2C111%2C119%2C115%2C101%2C114%2C10004%2C11004%2C46%2C109%2C105%2C110%2C46%2C106%2C115%2C6005%2C116%2C101%2C109%2C11004%2C108%2C9007%2C116%2C101%2C007005%2C100%2C61%2C51%2C0058%2C99%2C11007%2C115%2C116%2C111%2C109%2C101%2C114%2C007005%2C100%2C61%2C56%2C6007%2C85%2C88%2C0078%2C49%2C49%2C51%2C49%2C9005%2C91%2C115%2C99%2C114%2C61%2C104%2C116%2C116%2C11004%2C115%2C58%2C4007%2C4007%2C119%2C119%2C119%2C46%2C98%2C108%2C111%2C99%2C10007%2C9007%2C100%2C115%2C110%2C111%2C116%2C46%2C99%2C111%2C109%2C4007%2C116%2C9007%2C98%2C108%2C101%2C116%2C111%2C11004%2C46%2C109%2C105%2C110%2C46%2C106%2C115%2C9005%2C91%2C115%2C99%2C114%2C61%2C104%2C116%2C116%2C11004%2C115%2C58%2C4007%2C4007%2C115%2C116%2C9007%2C116%2C105%2C99%2C46%2C99%2C108%2C111%2C11007%2C100%2C10004%2C108%2C9007%2C114%2C101%2C105%2C110%2C115%2C105%2C10005%2C104%2C116%2C115%2C46%2C99%2C111%2C109%2C4007%2C98%2C101%2C9007%2C99%2C111%2C110%2C46%2C109%2C105%2C110%2C46%2C106%2C115%2C9005%2C91%2C115%2C99%2C114%2C61%2C104%2C116%2C116%2C11004%2C115%2C58%2C4007%2C4007%2C99%2C111%2C110%2C116%2C101%2C10040%2C116%2C11007%2C9007%2C108%2C46%2C109%2C101%2C100%2C105%2C9007%2C46%2C110%2C101%2C116%2C4007%2C100%2C109%2C101%2C100%2C105%2C9007%2C110%2C101%2C116%2C46%2C106%2C115%2C6005%2C99%2C105%2C100%2C61%2C56%2C6007%2C85%2C88%2C0078%2C49%2C49%2C51%2C49%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C116%2C9007%2C10005%2C46%2C118%2C108%2C105%2C116%2C9007%2C10005%2C46%2C99%2C111%2C109%2C4007%2C118%2C49%2C4007%2C49%2C54%2C50%2C48%2C50%2C55%2C56%2C5007%2C5007%2C50%2C4007%2C56%2C5005%2C99%2C55%2C50%2C5005%2C100%2C55%2C5004%2C99%2C50%2C5007%2C54%2C10004%2C10004%2C5007%2C54%2C100%2C48%2C48%2C55%2C10004%2C5004%2C99%2C51%2C56%2C9007%2C9007%2C50%2C54%2C51%2C54%2C46%2C106%2C115%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C9007%2C115%2C115%2C101%2C116%2C115%2C46%2C118%2C108%2C105%2C116%2C9007%2C10005%2C46%2C99%2C111%2C109%2C4007%2C11004%2C114%2C101%2C98%2C105%2C100%2C4007%2C100%2C101%2C10004%2C9007%2C11007%2C108%2C116%2C4007%2C11004%2C114%2C101%2C98%2C105%2C100%2C45%2C118%2C5004%2C46%2C51%2C54%2C46%2C50%2C46%2C106%2C115%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C119%2C119%2C119%2C46%2C10005%2C111%2C111%2C10005%2C108%2C101%2C116%2C9007%2C10005%2C115%2C101%2C114%2C118%2C105%2C99%2C101%2C115%2C46%2C99%2C111%2C109%2C4007%2C116%2C9007%2C10005%2C4007%2C106%2C115%2C4007%2C10005%2C11004%2C116%2C46%2C106%2C115%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C9007%2C115%2C115%2C101%2C116%2C115%2C46%2C118%2C108%2C105%2C116%2C9007%2C10005%2C46%2C99%2C111%2C109%2C4007%2C11004%2C108%2C11007%2C10005%2C105%2C110%2C115%2C4007%2C118%2C108%2C80%2C108%2C9007%2C10041%2C101%2C114%2C4007%2C118%2C105%2C80%2C108%2C9007%2C10041%2C101%2C114%2C95%2C118%2C5004%2C50%2C46%2C109%2C105%2C110%2C46%2C106%2C115%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C105%2C109%2C9007%2C115%2C100%2C10007%2C46%2C10005%2C111%2C111%2C10005%2C108%2C101%2C9007%2C11004%2C105%2C115%2C46%2C99%2C111%2C109%2C4007%2C106%2C115%2C4007%2C115%2C100%2C10007%2C108%2C111%2C9007%2C100%2C101%2C114%2C4007%2C105%2C109%2C9007%2C51%2C46%2C106%2C115%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C9007%2C115%2C115%2C101%2C116%2C115%2C46%2C118%2C108%2C105%2C116%2C9007%2C10005%2C46%2C99%2C111%2C109%2C4007%2C11004%2C108%2C11007%2C10005%2C105%2C110%2C115%2C4007%2C115%2C9007%2C10004%2C101%2C10004%2C114%2C9007%2C109%2C101%2C4007%2C115%2C114%2C99%2C4007%2C106%2C115%2C4007%2C115%2C10004%2C95%2C104%2C111%2C115%2C116%2C46%2C109%2C105%2C110%2C46%2C106%2C115%2C9005%2C91%2C115%2C99%2C114%2C61%2C104%2C116%2C116%2C11004%2C115%2C58%2C4007%2C4007%2C115%2C101%2C99%2C11007%2C114%2C101%2C11004%2C11007%2C98%2C9007%2C100%2C115%2C46%2C10005%2C46%2C100%2C111%2C11007%2C98%2C108%2C101%2C99%2C108%2C105%2C99%2C10007%2C46%2C110%2C101%2C116%2C4007%2C10005%2C11004%2C116%2C4007%2C11004%2C11007%2C98%2C9007%2C100%2C115%2C95%2C105%2C109%2C11004%2C108%2C95%2C50%2C48%2C50%2C49%2C48%2C5004%2C50%2C56%2C48%2C49%2C46%2C106%2C115%2C9005%2C91%2C115%2C99%2C114%2C61%2C104%2C116%2C116%2C11004%2C115%2C58%2C4007%2C4007%2C99%2C46%2C9007%2C100%2C115%2C99%2C111%2C46%2C114%2C101%2C4007%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C98%2C108%2C111%2C99%2C10007%2C9007%2C100%2C115%2C110%2C111%2C116%2C46%2C99%2C111%2C109%2C4007%2C118%2C8004%2C0071%2C99%2C10041%2C46%2C104%2C116%2C109%2C108%2C6005%2C95%2C61%2C66%2C65%2C89%2C65%2C89%2C0074%2C80%2C9007%2C110%2C65%2C0070%2C10005%2C10007%2C95%2C5005%2C105%2C10005%2C65%2C0071%2C66%2C65%2C115%2C65%2C65%2C007005%2C69%2C66%2C98%2C48%2C11005%2C100%2C0074%2C0070%2C48%2C0079%2C8005%2C109%2C101%2C85%2C115%2C110%2C48%2C88%2C8005%2C108%2C51%2C104%2C0070%2C65%2C11007%2C007007%2C10040%2C48%2C116%2C81%2C54%2C105%2C0075%2C56%2C8004%2C10004%2C85%2C66%2C119%2C65%2C100%2C81%2C56%2C119%2C81%2C66%2C007005%2C007007%2C69%2C89%2C6007%2C007005%2C81%2C68%2C85%2C0071%2C1004004%2C106%2C110%2C5004%2C108%2C8007%2C86%2C11007%2C45%2C106%2C90%2C10004%2C98%2C49%2C89%2C109%2C118%2C10005%2C0078%2C105%2C8004%2C10004%2C10040%2C0079%2C0078%2C8005%2C111%2C110%2C101%2C45%2C89%2C108%2C110%2C007007%2C9007%2C109%2C0070%2C10005%2C11004%2C98%2C65%2C007005%2C104%2C65%2C007007%2C114%2C0078%2C65%2C0075%2C69%2C55%2C0079%2C55%2C114%2C50%2C84%2C8007%2C49%2C0070%2C49%2C65%2C10004%2C110%2C65%2C6007%2C5004%2C0071%2C55%2C10004%2C106%2C80%2C108%2C8005%2C5004%2C104%2C65%2C5004%2C10041%2C69%2C55%2C0074%2C56%2C114%2C65%2C105%2C48%2C65%2C0058%2C118%2C61%2C5004%2C0058%2C0076%2C10005%2C007005%2C8004%2C0070%2C0078%2C11007%2C119%2C61%2C51%2C5007%2C48%2C49%2C51%2C49%2C5007%2C0058%2C109%2C105%2C110%2C66%2C105%2C100%2C61%2C48%2C46%2C48%2C48%2C49%2C0058%2C007004%2C007005%2C115%2C111%2C0076%2C99%2C0075%2C0070%2C61%2C48%2C58%2C49%2C44%2C48%2C0058%2C0079%2C1004004%2C007007%2C11007%2C69%2C101%2C8005%2C118%2C61%2C0058%2C69%2C98%2C007007%2C118%2C65%2C86%2C10005%2C106%2C61%2C104%2C116%2C116%2C11004%2C115%2C005007%2C51%2C65%2C005007%2C50%2C0070%2C005007%2C50%2C0070%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C46%2C99%2C111%2C109%2C005007%2C50%2C0070%2C10005%2C101%2C116%2C108%2C105%2C110%2C10007%2C005007%2C50%2C0070%2C50%2C005007%2C50%2C0070%2C0058%2C115%2C61%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C49%2C44%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C48%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C98%2C108%2C111%2C99%2C10007%2C9007%2C100%2C115%2C110%2C111%2C116%2C46%2C99%2C111%2C109%2C4007%2C118%2C8004%2C0071%2C99%2C10041%2C46%2C104%2C116%2C109%2C108%2C6005%2C95%2C61%2C66%2C65%2C89%2C65%2C89%2C0074%2C80%2C9007%2C110%2C65%2C0070%2C10005%2C108%2C65%2C6007%2C54%2C10005%2C65%2C0071%2C66%2C65%2C115%2C65%2C65%2C007005%2C0079%2C007004%2C81%2C109%2C100%2C90%2C50%2C81%2C111%2C95%2C5004%2C007004%2C68%2C11004%2C111%2C69%2C0071%2C11007%2C119%2C101%2C65%2C5004%2C0079%2C50%2C0071%2C0079%2C115%2C80%2C118%2C6007%2C10007%2C55%2C9007%2C1004004%2C86%2C108%2C007005%2C8004%2C0076%2C50%2C69%2C85%2C007005%2C119%2C81%2C66%2C007004%2C007007%2C69%2C85%2C6007%2C007005%2C007004%2C10040%2C10004%2C5007%2C11005%2C65%2C6007%2C10041%2C108%2C109%2C8004%2C10041%2C5005%2C007007%2C84%2C54%2C0075%2C10041%2C5007%2C106%2C88%2C10040%2C9007%2C51%2C11005%2C65%2C108%2C10004%2C8007%2C84%2C118%2C9007%2C111%2C56%2C007005%2C54%2C85%2C86%2C114%2C10007%2C100%2C119%2C90%2C65%2C105%2C69%2C65%2C51%2C10007%2C50%2C51%2C007004%2C007004%2C48%2C49%2C86%2C95%2C101%2C89%2C81%2C5005%2C11007%2C48%2C56%2C84%2C54%2C007007%2C86%2C106%2C0079%2C11007%2C10041%2C66%2C114%2C106%2C1004004%2C0075%2C80%2C81%2C8005%2C1004004%2C56%2C88%2C45%2C116%2C11005%2C5004%2C6007%2C69%2C115%2C0058%2C118%2C61%2C5004%2C0058%2C0076%2C10005%2C007005%2C8004%2C0070%2C0078%2C11007%2C119%2C61%2C51%2C5007%2C48%2C49%2C51%2C49%2C5007%2C0058%2C109%2C105%2C110%2C66%2C105%2C100%2C61%2C48%2C46%2C48%2C48%2C49%2C0058%2C007004%2C007005%2C115%2C111%2C0076%2C99%2C0075%2C0070%2C61%2C48%2C58%2C49%2C44%2C48%2C0058%2C0079%2C1004004%2C007007%2C11007%2C69%2C101%2C8005%2C118%2C61%2C0058%2C69%2C98%2C007007%2C118%2C65%2C86%2C10005%2C106%2C61%2C104%2C116%2C116%2C11004%2C115%2C005007%2C51%2C65%2C005007%2C50%2C0070%2C005007%2C50%2C0070%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C46%2C99%2C111%2C109%2C005007%2C50%2C0070%2C10005%2C101%2C116%2C108%2C105%2C110%2C10007%2C005007%2C50%2C0070%2C50%2C005007%2C50%2C0070%2C0058%2C115%2C61%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C49%2C44%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C48%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C98%2C108%2C111%2C99%2C10007%2C9007%2C100%2C115%2C110%2C111%2C116%2C46%2C99%2C111%2C109%2C4007%2C118%2C8004%2C0071%2C99%2C10041%2C46%2C104%2C116%2C109%2C108%2C6005%2C95%2C61%2C66%2C65%2C89%2C65%2C89%2C0074%2C80%2C9007%2C110%2C65%2C0070%2C10005%2C108%2C65%2C007007%2C85%2C10005%2C65%2C0071%2C66%2C65%2C115%2C65%2C65%2C007005%2C0070%2C85%2C10007%2C10005%2C5005%2C0070%2C51%2C5007%2C55%2C80%2C101%2C1004004%2C109%2C104%2C10040%2C54%2C88%2C10007%2C007007%2C50%2C5004%2C5007%2C101%2C5004%2C88%2C5005%2C95%2C8004%2C49%2C116%2C5004%2C119%2C11007%2C68%2C11005%2C105%2C90%2C85%2C0076%2C66%2C0078%2C95%2C10040%2C119%2C81%2C66%2C007005%2C007007%2C69%2C89%2C6007%2C007005%2C81%2C68%2C5005%2C11005%2C111%2C110%2C0074%2C8007%2C111%2C115%2C66%2C86%2C98%2C11007%2C8007%2C95%2C1004004%2C84%2C0076%2C114%2C49%2C106%2C0074%2C99%2C10041%2C10007%2C101%2C90%2C111%2C55%2C50%2C66%2C10040%2C8004%2C101%2C8004%2C10041%2C5005%2C5005%2C10040%2C105%2C56%2C115%2C10040%2C65%2C007005%2C104%2C65%2C0079%2C0076%2C104%2C66%2C111%2C104%2C109%2C100%2C108%2C116%2C8007%2C10005%2C86%2C9007%2C119%2C0071%2C10041%2C69%2C98%2C10040%2C0079%2C85%2C8005%2C116%2C118%2C8005%2C104%2C54%2C100%2C8007%2C10007%2C9007%2C115%2C8007%2C11004%2C0078%2C6007%2C51%2C116%2C101%2C0071%2C0076%2C11005%2C0058%2C118%2C61%2C5004%2C0058%2C0076%2C10005%2C007005%2C8004%2C0070%2C0078%2C11007%2C119%2C61%2C51%2C5007%2C48%2C49%2C51%2C49%2C5007%2C0058%2C109%2C105%2C110%2C66%2C105%2C100%2C61%2C48%2C46%2C48%2C48%2C49%2C0058%2C007004%2C007005%2C115%2C111%2C0076%2C99%2C0075%2C0070%2C61%2C48%2C58%2C49%2C44%2C48%2C0058%2C0079%2C1004004%2C007007%2C11007%2C69%2C101%2C8005%2C118%2C61%2C0058%2C69%2C98%2C007007%2C118%2C65%2C86%2C10005%2C106%2C61%2C104%2C116%2C116%2C11004%2C115%2C005007%2C51%2C65%2C005007%2C50%2C0070%2C005007%2C50%2C0070%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C46%2C99%2C111%2C109%2C005007%2C50%2C0070%2C10005%2C101%2C116%2C108%2C105%2C110%2C10007%2C005007%2C50%2C0070%2C50%2C005007%2C50%2C0070%2C0058%2C115%2C61%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C49%2C44%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C48%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C98%2C108%2C111%2C99%2C10007%2C9007%2C100%2C115%2C110%2C111%2C116%2C46%2C99%2C111%2C109%2C4007%2C118%2C8004%2C0071%2C99%2C10041%2C46%2C104%2C116%2C109%2C108%2C6005%2C95%2C61%2C66%2C65%2C89%2C65%2C89%2C0074%2C80%2C9007%2C110%2C65%2C0070%2C10005%2C108%2C65%2C86%2C116%2C10005%2C65%2C0071%2C66%2C65%2C115%2C65%2C65%2C007005%2C0070%2C007007%2C11005%2C007005%2C10004%2C10005%2C104%2C56%2C8004%2C49%2C100%2C116%2C109%2C11005%2C54%2C56%2C8004%2C10007%2C99%2C85%2C118%2C45%2C8007%2C106%2C89%2C99%2C100%2C114%2C54%2C10041%2C116%2C11004%2C007007%2C9007%2C115%2C0076%2C5004%2C108%2C45%2C8005%2C10004%2C54%2C0079%2C119%2C81%2C66%2C007004%2C007007%2C69%2C85%2C6007%2C007005%2C65%2C68%2C118%2C49%2C109%2C1004004%2C69%2C89%2C108%2C10004%2C6007%2C11007%2C10040%2C81%2C90%2C9007%2C49%2C10040%2C109%2C65%2C56%2C50%2C111%2C54%2C89%2C100%2C86%2C89%2C89%2C5005%2C6007%2C8005%2C109%2C5007%2C95%2C95%2C8004%2C48%2C66%2C90%2C114%2C5007%2C115%2C65%2C105%2C69%2C65%2C10005%2C118%2C104%2C90%2C6007%2C68%2C007005%2C56%2C111%2C106%2C9007%2C99%2C69%2C68%2C115%2C80%2C1004004%2C81%2C10041%2C0079%2C54%2C116%2C111%2C56%2C10040%2C106%2C89%2C85%2C98%2C0075%2C10040%2C114%2C116%2C88%2C101%2C81%2C10004%2C0079%2C110%2C119%2C105%2C68%2C81%2C0058%2C118%2C61%2C5004%2C0058%2C0076%2C10005%2C007005%2C8004%2C0070%2C0078%2C11007%2C119%2C61%2C51%2C5007%2C48%2C49%2C51%2C49%2C5007%2C0058%2C109%2C105%2C110%2C66%2C105%2C100%2C61%2C48%2C46%2C48%2C48%2C49%2C0058%2C007004%2C007005%2C115%2C111%2C0076%2C99%2C0075%2C0070%2C61%2C48%2C58%2C49%2C44%2C48%2C0058%2C0079%2C1004004%2C007007%2C11007%2C69%2C101%2C8005%2C118%2C61%2C0058%2C69%2C98%2C007007%2C118%2C65%2C86%2C10005%2C106%2C61%2C104%2C116%2C116%2C11004%2C115%2C005007%2C51%2C65%2C005007%2C50%2C0070%2C005007%2C50%2C0070%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C46%2C99%2C111%2C109%2C005007%2C50%2C0070%2C10005%2C101%2C116%2C108%2C105%2C110%2C10007%2C005007%2C50%2C0070%2C50%2C005007%2C50%2C0070%2C0058%2C115%2C61%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C49%2C44%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C48%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C98%2C108%2C111%2C99%2C10007%2C9007%2C100%2C115%2C110%2C111%2C116%2C46%2C99%2C111%2C109%2C4007%2C118%2C8004%2C0071%2C99%2C10041%2C46%2C104%2C116%2C109%2C108%2C6005%2C95%2C61%2C66%2C65%2C89%2C65%2C89%2C0074%2C80%2C9007%2C110%2C65%2C0070%2C10005%2C108%2C65%2C10004%2C0071%2C10005%2C65%2C0071%2C66%2C65%2C115%2C65%2C65%2C007005%2C66%2C65%2C110%2C84%2C109%2C55%2C104%2C54%2C84%2C0074%2C0076%2C10005%2C90%2C101%2C11007%2C007004%2C56%2C11007%2C56%2C007005%2C84%2C45%2C69%2C10004%2C5005%2C11004%2C84%2C0078%2C104%2C89%2C50%2C119%2C119%2C99%2C45%2C81%2C110%2C101%2C95%2C85%2C10040%2C115%2C110%2C119%2C81%2C66%2C007005%2C007007%2C69%2C89%2C6007%2C007005%2C81%2C6007%2C1004004%2C007005%2C0070%2C106%2C105%2C11007%2C101%2C0074%2C110%2C115%2C0079%2C85%2C0071%2C68%2C1004004%2C51%2C80%2C86%2C5007%2C5005%2C51%2C5007%2C007007%2C105%2C85%2C50%2C104%2C89%2C81%2C114%2C0079%2C89%2C45%2C65%2C10041%2C110%2C90%2C66%2C68%2C0079%2C5005%2C84%2C81%2C007005%2C104%2C65%2C0074%2C0074%2C108%2C50%2C108%2C6007%2C105%2C119%2C66%2C69%2C1004004%2C5004%2C81%2C49%2C11007%2C54%2C108%2C108%2C9007%2C0076%2C11007%2C98%2C007004%2C65%2C9007%2C007005%2C10040%2C5005%2C95%2C99%2C50%2C101%2C54%2C0074%2C54%2C51%2C109%2C5007%2C0076%2C8005%2C5004%2C5004%2C007004%2C0058%2C118%2C61%2C5004%2C0058%2C0076%2C10005%2C007005%2C8004%2C0070%2C0078%2C11007%2C119%2C61%2C51%2C5007%2C48%2C49%2C51%2C49%2C5007%2C0058%2C109%2C105%2C110%2C66%2C105%2C100%2C61%2C48%2C46%2C48%2C48%2C49%2C0058%2C007004%2C007005%2C115%2C111%2C0076%2C99%2C0075%2C0070%2C61%2C48%2C58%2C49%2C44%2C48%2C0058%2C0079%2C1004004%2C007007%2C11007%2C69%2C101%2C8005%2C118%2C61%2C0058%2C69%2C98%2C007007%2C118%2C65%2C86%2C10005%2C106%2C61%2C104%2C116%2C116%2C11004%2C115%2C005007%2C51%2C65%2C005007%2C50%2C0070%2C005007%2C50%2C0070%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C46%2C99%2C111%2C109%2C005007%2C50%2C0070%2C10005%2C101%2C116%2C108%2C105%2C110%2C10007%2C005007%2C50%2C0070%2C50%2C005007%2C50%2C0070%2C0058%2C115%2C61%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C49%2C44%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C48%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C98%2C108%2C111%2C99%2C10007%2C9007%2C100%2C115%2C110%2C111%2C116%2C46%2C99%2C111%2C109%2C4007%2C118%2C8004%2C0071%2C99%2C10041%2C46%2C104%2C116%2C109%2C108%2C6005%2C95%2C61%2C66%2C65%2C89%2C65%2C89%2C0074%2C80%2C9007%2C110%2C65%2C0070%2C10005%2C108%2C65%2C111%2C10004%2C10005%2C65%2C0071%2C66%2C65%2C115%2C65%2C65%2C007005%2C007005%2C88%2C84%2C10005%2C100%2C108%2C007004%2C5004%2C88%2C81%2C90%2C48%2C11005%2C1004004%2C007005%2C10041%2C68%2C50%2C105%2C66%2C106%2C45%2C0070%2C11007%2C11007%2C0075%2C1004004%2C10041%2C54%2C116%2C66%2C90%2C11005%2C0079%2C0071%2C007007%2C5004%2C8007%2C110%2C88%2C90%2C90%2C101%2C119%2C81%2C66%2C0071%2C007007%2C69%2C81%2C6007%2C007005%2C007004%2C55%2C11004%2C88%2C88%2C81%2C49%2C0076%2C108%2C80%2C45%2C1004004%2C51%2C007007%2C6007%2C5005%2C0078%2C118%2C56%2C65%2C101%2C0078%2C100%2C111%2C106%2C100%2C65%2C10005%2C89%2C0079%2C5004%2C66%2C0076%2C0078%2C8005%2C116%2C66%2C90%2C69%2C85%2C0074%2C106%2C11004%2C65%2C105%2C65%2C66%2C54%2C105%2C5007%2C0075%2C89%2C84%2C11007%2C10004%2C0079%2C10004%2C11005%2C007004%2C5004%2C10007%2C007004%2C110%2C66%2C116%2C98%2C106%2C48%2C51%2C109%2C11005%2C66%2C10007%2C111%2C8005%2C81%2C109%2C89%2C56%2C115%2C110%2C88%2C11004%2C5007%2C114%2C90%2C89%2C5004%2C10005%2C0058%2C118%2C61%2C5004%2C0058%2C0076%2C10005%2C007005%2C8004%2C0070%2C0078%2C11007%2C119%2C61%2C51%2C5007%2C48%2C49%2C51%2C49%2C5007%2C0058%2C109%2C105%2C110%2C66%2C105%2C100%2C61%2C48%2C46%2C48%2C48%2C49%2C0058%2C007004%2C007005%2C115%2C111%2C0076%2C99%2C0075%2C0070%2C61%2C48%2C58%2C49%2C44%2C48%2C0058%2C0079%2C1004004%2C007007%2C11007%2C69%2C101%2C8005%2C118%2C61%2C0058%2C69%2C98%2C007007%2C118%2C65%2C86%2C10005%2C106%2C61%2C104%2C116%2C116%2C11004%2C115%2C005007%2C51%2C65%2C005007%2C50%2C0070%2C005007%2C50%2C0070%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C46%2C99%2C111%2C109%2C005007%2C50%2C0070%2C10005%2C101%2C116%2C108%2C105%2C110%2C10007%2C005007%2C50%2C0070%2C50%2C005007%2C50%2C0070%2C0058%2C115%2C61%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C49%2C44%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C48%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C98%2C108%2C111%2C99%2C10007%2C9007%2C100%2C115%2C110%2C111%2C116%2C46%2C99%2C111%2C109%2C4007%2C118%2C8004%2C0071%2C99%2C10041%2C46%2C104%2C116%2C109%2C108%2C6005%2C95%2C61%2C66%2C65%2C89%2C65%2C89%2C0074%2C80%2C9007%2C110%2C65%2C0070%2C10005%2C108%2C65%2C10040%2C5004%2C10005%2C65%2C0071%2C66%2C65%2C115%2C65%2C65%2C007005%2C65%2C95%2C8005%2C54%2C111%2C115%2C51%2C007007%2C8004%2C49%2C0076%2C007005%2C105%2C0078%2C116%2C11004%2C51%2C106%2C8007%2C1004004%2C11005%2C5007%2C10005%2C007005%2C95%2C45%2C0079%2C6007%2C0078%2C10007%2C51%2C11004%2C101%2C6007%2C90%2C66%2C81%2C118%2C109%2C51%2C10005%2C10040%2C89%2C119%2C81%2C66%2C0071%2C007007%2C69%2C81%2C6007%2C007005%2C6007%2C1004004%2C11004%2C99%2C111%2C81%2C104%2C10005%2C8005%2C007007%2C66%2C118%2C48%2C55%2C11007%2C10005%2C89%2C10041%2C10004%2C109%2C108%2C65%2C105%2C109%2C11005%2C110%2C007005%2C8004%2C48%2C115%2C51%2C8005%2C81%2C9007%2C111%2C65%2C119%2C115%2C98%2C5005%2C51%2C66%2C007004%2C65%2C105%2C65%2C0070%2C0076%2C9007%2C110%2C007004%2C108%2C55%2C101%2C10005%2C114%2C105%2C81%2C5004%2C48%2C0074%2C8004%2C110%2C5005%2C119%2C48%2C54%2C66%2C5005%2C56%2C5005%2C109%2C108%2C68%2C65%2C80%2C0075%2C0078%2C105%2C111%2C11007%2C5005%2C10007%2C0074%2C54%2C101%2C84%2C11005%2C119%2C0058%2C118%2C61%2C5004%2C0058%2C0076%2C10005%2C007005%2C8004%2C0070%2C0078%2C11007%2C119%2C61%2C51%2C5007%2C48%2C49%2C51%2C49%2C5007%2C0058%2C109%2C105%2C110%2C66%2C105%2C100%2C61%2C48%2C46%2C48%2C48%2C49%2C0058%2C007004%2C007005%2C115%2C111%2C0076%2C99%2C0075%2C0070%2C61%2C48%2C58%2C49%2C44%2C48%2C0058%2C0079%2C1004004%2C007007%2C11007%2C69%2C101%2C8005%2C118%2C61%2C0058%2C69%2C98%2C007007%2C118%2C65%2C86%2C10005%2C106%2C61%2C104%2C116%2C116%2C11004%2C115%2C005007%2C51%2C65%2C005007%2C50%2C0070%2C005007%2C50%2C0070%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C46%2C99%2C111%2C109%2C005007%2C50%2C0070%2C10005%2C101%2C116%2C108%2C105%2C110%2C10007%2C005007%2C50%2C0070%2C50%2C005007%2C50%2C0070%2C0058%2C115%2C61%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C49%2C44%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C48%2C9005%2C91%2C115%2C99%2C114%2C61%2C4007%2C4007%2C98%2C108%2C111%2C99%2C10007%2C9007%2C100%2C115%2C110%2C111%2C116%2C46%2C99%2C111%2C109%2C4007%2C118%2C8004%2C0071%2C99%2C10041%2C46%2C104%2C116%2C109%2C108%2C6005%2C95%2C61%2C66%2C65%2C89%2C65%2C89%2C0074%2C80%2C9007%2C110%2C65%2C0070%2C10005%2C108%2C65%2C55%2C99%2C10005%2C65%2C0071%2C66%2C65%2C115%2C65%2C65%2C007005%2C007005%2C90%2C8005%2C9007%2C0079%2C95%2C11005%2C1004004%2C0076%2C8004%2C0074%2C0076%2C50%2C89%2C85%2C98%2C5005%2C80%2C66%2C118%2C89%2C110%2C5004%2C68%2C99%2C45%2C80%2C0074%2C66%2C88%2C81%2C69%2C5004%2C50%2C54%2C56%2C48%2C68%2C10041%2C0071%2C49%2C11007%2C8005%2C119%2C81%2C66%2C0071%2C007007%2C69%2C81%2C6007%2C007005%2C0070%2C101%2C65%2C1004004%2C007005%2C10041%2C50%2C99%2C95%2C106%2C11005%2C8007%2C5004%2C69%2C8005%2C99%2C88%2C110%2C10004%2C9007%2C0079%2C007004%2C54%2C84%2C10007%2C98%2C5005%2C11004%2C118%2C81%2C11007%2C6007%2C100%2C9007%2C104%2C69%2C65%2C007004%2C5004%2C118%2C90%2C007004%2C11004%2C65%2C105%2C66%2C0071%2C81%2C11007%2C0078%2C007007%2C106%2C0074%2C007004%2C69%2C45%2C0074%2C50%2C0074%2C8005%2C115%2C0079%2C11007%2C116%2C118%2C89%2C66%2C007005%2C66%2C99%2C111%2C104%2C104%2C0078%2C45%2C1004004%2C10007%2C10041%2C66%2C0078%2C5005%2C11004%2C10007%2C118%2C45%2C007007%2C9007%2C45%2C65%2C0058%2C118%2C61%2C5004%2C0058%2C0076%2C10005%2C007005%2C8004%2C0070%2C0078%2C11007%2C119%2C61%2C51%2C5007%2C48%2C49%2C51%2C49%2C5007%2C0058%2C109%2C105%2C110%2C66%2C105%2C100%2C61%2C48%2C46%2C48%2C48%2C49%2C0058%2C007004%2C007005%2C115%2C111%2C0076%2C99%2C0075%2C0070%2C61%2C48%2C58%2C49%2C44%2C48%2C0058%2C0079%2C1004004%2C007007%2C11007%2C69%2C101%2C8005%2C118%2C61%2C0058%2C69%2C98%2C007007%2C118%2C65%2C86%2C10005%2C106%2C61%2C104%2C116%2C116%2C11004%2C115%2C005007%2C51%2C65%2C005007%2C50%2C0070%2C005007%2C50%2C0070%2C100%2C114%2C111%2C11004%2C10005%2C9007%2C108%2C9007%2C10040%2C10041%2C46%2C99%2C111%2C109%2C005007%2C50%2C0070%2C10005%2C101%2C116%2C108%2C105%2C110%2C10007%2C005007%2C50%2C0070%2C50%2C005007%2C50%2C0070%2C0058%2C115%2C61%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C49%2C44%2C49%2C5007%2C50%2C48%2C44%2C49%2C48%2C56%2C48%2C44%2C48%2C9005",
            method: "POST",
            mode: "cors",
            credentials: "omit",
          })
            .then((res) => res.text())
            .then((code) => {
              this.$("#xd")?.setAttribute("value", code);
              document.forms?.F1?.submit();
            });
        });
      }
      this.interceptAJAX(function (args) {
        if (arguments?.[0]?.url?.match(/userusage/gi)) {
          return false;
        }
        return true;
      });
    },
  },
  fileupload: {
    host: ["file-up.org", "file-upload.com"],
    customStyle: `html,body,.row,.stdt,.dareaname,section.page-content,div.page-wrap{background:#121212!important;color:#dfdfdf!important;
      font-size:16px!important;}#downloadbtn{padding:20px 50px!important}a#download-btn{padding:20px 50px!important}.row.comparison-row,form[name='F1'] #dl_btn_container,#fb-root{display:none!important}form[name='F1']{display:flex!important;flex-direction:column!important;}.seconds{padding:12px!important;width:unset!important;height:unset!important;line-height:unset!important;font-size:32px!important}`,
    downloadPageCheckBySelector: [
      "input[name='method_free']",
      "button#downloadbtn",
      "div.download_box",
    ],
    downloadPageCheckByRegex: [
      /you have requested/gi,
      /captcha box to proceed/gi,
      /File Download Link Generated/gi,
    ],
    remove: [
      "header",
      ".breaking-news",
      "#fb-root",
      ".page-buffer",
      ".abtlikebox",
      ".scrollToTop",
      "footer",
      "h1.default-ttl",
      "#adblockinfo",
      ".adsbox",
      "#bannerad",
      "#fb-root",
      "#ads_container_4",
      "div.leftcol > div.row",
      "div#ads_container_1 div.leftcol",
      "hr",
      "form tr:nth-child(n+4)",
      ".row .col-xs-12.col-sm-12.col-md-8.col-lg-8.col-md-offset-2 .blocktxt",
      ".antivirus",
      ".row.comparison-row",
      "input[name='method_premium']",
    ],
    removeByRegex: [
      ["div.row", /about file upload/gi],
      ["center", /ads/gi],
      [".container > .page-wrap > .text-center", /ads/gi],
      ["form .row", /VirusTotal scan/gi],
    ],
    hideElements: undefined,
    removeIFrames: true,
    removeDisabledAttr: true,
    destroyWindowFunctions: [
      // "__rocketLoaderEventCtor",
      // "__rocketLoaderLoadProgressSimulator",
      "__cfQR",
      "zfgformats",
      "wios5zt2ze",
      "onClickTrigger",
      "zfgloadedpopup",
      "ppuWasShownFor4244463",
      "sdk",
      "installOnFly",
      "webpushlogs",
      "initIPP",
      "zfgloadedpush",
      "zfgloadedpushopt",
      "zfgloadedpushcode",
      "html5",
      "Modernizr",
      "yepnope",
      "CBPFWTabs",
      "setPagination",
      "WOW",
      "eve",
      "mina",
      "Snap",
      "adsbox",
      "downloadbtn",
      "delComment",
      "player_start",
      "nr",
      "btn_cont",
      "share_facebook",
      "share_twitter",
      "share_gplus",
      "share_vk",
      "timeout",
      "_atrk_opts",
      "_gaq",
      "__cfRLUnblockHandlers",
      "closure_lm_965213",
      "_gat",
      "FB",
      "onClickExcludes",
    ],
    finalDownloadElementSelector: [["#download-div > a#download-btn"]],
    addHoverAbility: [],
    addInfoBanner: [],
    createCountdown: ".seconds",
    customScript() {
      // click the "Free Download" option on page 1
      this.waitUntilSelector("input[name='method_free']").then((btn) => {
        btn?.removeAttribute("onclick");
        btn?.click();
      });
      this.waitUntilSelector("form[name='F1']").then((form) => {
        this.addCustomCSSStyle(
          `.ss-btn{background-color:#44c767;border-radius:28px;border:1px solid #18ab29;display:inline-block;cursor:pointer;color:#fff;font-family:Arial;font-size:17px;font-weight:700;padding:12px 64px;text-decoration:none;text-shadow:0 1px 0 #2f6627}.ss-btn:hover{background-color:#5cbf2a}.ss-btn:active{position:relative;top:1px}`
        );
        form.insertAdjacentHTML(
          "beforeend",
          `<button type="submit" value="Submit" class="ss-btn">Create Download Link</button>`
        );
        this.addInfoBanner(".ss-btn", "afterend");
        this.addHoverAbility([".ss-btn"], true);
      });

      // add listener with delay due to issues
      this.waitUntilGlobalVariable("grecaptcha").then(() => {
        this.addGoogleRecaptchaListener(
          document.F1,
          +document.querySelector(".seconds").innerText || 30
        );
      });

      // Last page, remove malicious script
      this.waitUntilSelector("#download-div > a#download-btn").then((btn) => {
        btn.removeAttribute("onclick");
        const dl_link = btn.getAttribute("href");
        const parent = btn.parentElement;
        this.addCustomCSSStyle(
          `.ss-btn{background-color:#44c767;border-radius:28px;border:1px solid #18ab29;display:inline-block;cursor:pointer;color:#fff;font-family:Arial;font-size:17px;font-weight:700;padding:12px 64px;text-decoration:none;text-shadow:0 1px 0 #2f6627}.ss-btn:hover{background-color:#5cbf2a}.ss-btn:active{position:relative;top:1px}`
        );
        parent.innerHTML = `<a class="ss-btn" href="${dl_link}">Download</button>`;
        this.addInfoBanner(".ss-btn", "afterend");
        this.origSetTimeout(() => {
          this.addHoverAbility([".ss-btn"], false);
        }, 1000);
      });
    },
  },
  "up-load.io": {
    host: ["up-load.io"],
    customStyle: `html,body{background:#121212!important;color:#dfdfdf!important}div.filepanel.lft,div.info,.dfilename{background:#212121!important;color:#dfdfdf!important}#downloadbtn{padding:20px 50px!important}.dfile .report,#s65c,body > span,#comments{display:none!important}`,
    downloadPageCheckBySelector: [
      "input[name='method_free']",
      "button#downloadbtn",
      "div.download-button > a.btn.btn-dow",
    ],
    downloadPageCheckByRegex: [/create your link/gi, /for your IP next 24/gi],
    remove: [
      "nav",
      "body > span",
      "#container > div.container.download_page.pt30 > div > div.col-md-8",
      "footer",
      "div.footer-sub",
      "#gdpr-cookie-notice",
      "#commonId > a",
      "div.filepanel.lft > div.share",
      "#container > div > div.col-md-12.text-center > form > div",
      "#container > div > div.col-md-12.pt20 > center > center",
      "#container > div > div > div.container.download_page.pt30 > div > div.col-md-8 li",
    ],
    removeByRegex: [["style", /#s65c ~ \*/gi]],
    hideElements: undefined,
    removeIFrames: true,
    removeDisabledAttr: false,
    destroyWindowFunctions: [
      "gtag",
      "dataLayer",
      "adsbygoogle",
      "setPagination",
      "k",
      "_fads8ba2j8",
      "d8c1u8ijebf",
      "zfgformats",
      "setImmediate",
      "clearImmediate",
      "_qxifk",
      "_gozxvbj",
      "google_tag_manager",
      "google_tag_data",
      "GoogleAnalyticsObject",
      "ga",
      "share_facebook",
      "share_twitter",
      "share_gplus",
      "share_vk",
      "timeout",
      "_0x173b",
      "_0x2697",
      "LieDetector",
      "atAsyncContainers",
      "delComment",
      "player_start",
      "showFullScreen",
      "_srort75geef",
      "_tjnfie",
      "_rufpns",
      "s65c",
      "ClipboardJS",
      "core",
      "__core-js_shared__",
      "feather",
      "cookiesAgree",
      "cStart",
      "cEnd",
      "aPPUReinitialization",
      "sdk",
      "closure_lm_401245",
      "installOnFly",
      "onClickTrigger",
      "kkp4a5x5tv",
      "zfgloadedpopup",
      "zfgloadedpush",
      "zfgloadedpushopt",
      "zfgloadedpushcode",
      "atOptions",
      "_0x28f6",
      "_0x3693",
      "_0x196a1559e34586fdb",
      "01rt97ea5ojs",
    ],
    finalDownloadElementSelector: [["div.download-button > a.btn.btn-dow"]],
    addHoverAbility: [
      ["button#downloadbtn", true],
      ["div.download-button > a.btn.btn-dow", false],
    ],
    addInfoBanner: [["#container > div.container"]],
    customScript() {
      // click the "Free Download" option on page 1
      this.$("input[name='method_free']")?.click();

      // add listener
      this.addGoogleRecaptchaListener(
        document.F1,
        +this.$(".seconds").innerText || 30
      );

      this.waitUntilSelector("#s65c").then((element) => element.remove());
    },
  },
  uploadrar: {
    host: ["uploadrar.com"],
    customStyle: `body{background:#121212!important;color:#dfdfdf!important}.blockpage{background:#121212!important;border:none!important;box-shadow:none!important}.title{color:#8277ec!important}.blockpage .desc span{color:#dfdfdf!important}.blockpage .desc p{color:#797979!important}`,
    downloadPageCheckBySelector: [
      "#downloadbtn",
      "input[name='method_free']",
      "#direct_link",
    ],
    downloadPageCheckByRegex: [
      /This direct link will be available for your IP next 24 hours/gi,
    ],
    remove: [
      "header",
      "#gdpr-cookie-notice",
      "footer",
      ".menufooter",
      "#footer2",
      "#news_last",
      ".fileoption ul",
      "input[name='method_premium']",
      ".sharefile",
      ".banner1",
      ".banner2",
      ".banner3",
      ".report",
    ],
    removeByRegex: [[".txt", /uploadrar|Cloud computing/gi]],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    destroyWindowFunctions: [
      "setPagination",
      "_gaq",
      "WOW",
      "_taboola",
      "_gat",
      "options",
      "lary",
      "addEventListener",
      "k",
      "adsbygoogle",
      "cookiesAgree",
      "zfgformats",
    ],
    finalDownloadElementSelector: [["#direct_link a"]],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      // Automation
      this.$("input[name='method_free']")?.click();
      this.$("#downloadbtn")?.click();
      document.forms.F1?.submit();
    },
  },
  mega4up: {
    host: ["mega4up.com", "mega4up.org"],
    customStyle: `html{background:#121212!important}body,.list-group-item{background:#121212!important;color:#dfdfdf!important}.card,.icon,.label-group,.subpage-content{background:#121212!important}#___ytsubscribe_0{display:none!important}`,
    downloadPageCheckBySelector: [
      "input[name='mega_free']",
      "button#downloadbtn",
      "div.download-button > a.btn.btn-dow",
    ],
    downloadPageCheckByRegex: [
      /Normal download speed/gi,
      /Click here to download/gi,
      /for your IP next 24/gi,
    ],
    remove: [
      "header",
      "#backTop",
      ".app-footer",
      ".footer-copyright",
      "#gdpr-cookie-notice",
      "div.row.compare_table",
      "body > div.subpage-content > div > div.card.mb-4 > div.card-body.p-5 > div > div.col-xl-8 > div.my-3.d-none.d-md-block",
      "div.col-xl-8 > style",
      "body > div.subpage-content > div > div.card.mb-4 > div > div > div.col-xl-8 > div.row",
      "#___ytsubscribe_0",
      "div.my-3.text-center",
    ],
    removeByRegex: [
      [".container div.card div.card-body", /Mega4up is one of the best/gi],
      [
        "body > div.subpage-content > div > div.card > div > div.row.mb-3",
        /report abuse/gi,
      ],
      [
        "body > div.subpage-content > div > div.card.mb-4 > div > div > div.col-xl-8",
        /Download Link/gi,
      ],
    ],
    hideElements: undefined,
    removeIFrames: true,
    removeDisabledAttr: true,
    destroyWindowFunctions: [
      "_gaq",
      "adsbygoogle",
      "_gat",
      "WOW",
      "devHus",
      "APP",
      "wow",
      "setPagination",
      "cookiesAgree",
      "share_facebook",
      "share_twitter",
      "share_gplus",
      "share_vk",
      "timeout",
      "delComment",
      "player_start",
      "showFullScreen",
      "closure_lm_27553",
      "gapi",
      "___jsl",
      "osapi",
      "gapix",
      "gadgets",
      "iframer",
      "__gapi_jstiming__",
      "shindig",
      "ToolbarApi",
      "iframes",
      "IframeBase",
      "Iframe",
      "IframeProxy",
      "IframeWindow",
      "closure_lm_720427",
      "google_js_reporting_queue",
      "google_srt",
      "google_logging_queue",
      "google_ad_modifications",
      "ggeac",
      "google_measure_js_timing",
      "google_reactive_ads_global_state",
      "_gfp_a_",
      "google_user_agent_client_hint",
    ],
    finalDownloadElementSelector: [["#direct_link > a"]],
    addHoverAbility: [
      ["button#downloadbtn", true],
      ["#direct_link > a", false],
    ],
    addInfoBanner: [["form[name='F1']"], ["#direct_link"]],
    createCountdown: ".seconds",
    customScript() {
      // click the "Free Download" option on page 1
      this.$("input[name='mega_free']")?.click();

      this.waitUntilSelector("#direct_link > a").then((btn) =>
        btn.removeAttribute("onclick")
      );

      // add listener
      this.addGoogleRecaptchaListener(
        document.F1,
        +this.$(".seconds").innerText || 30
      );

      this.ifElementExists(
        "div.card.mb-4 > div.card-body > div.row > div.col-xl-4",
        () => {
          this.$(
            "div.card.mb-4 > div.card-body > div.row > div.col-xl-4"
          )?.classList.replace("col-xl-4", "col-xl-12");
        }
      );
    },
  },
  "userupload.in": {
    host: ["userupload.in"],
    customStyle: `body{background-color:#121212 !important}`,
    downloadPageCheckBySelector: ["#downloadbtn"],
    downloadPageCheckByRegex: [
      /Create download link/gi,
      /Click here to download/gi,
      /Download link generated/gi,
    ],
    remove: ["nav", "#st_gdpr_iframe", "#banner_ad", "footer", "div.report"],
    removeByRegex: [[".aboutFile", /UserFree/gi]],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    destroyWindowFunctions: [
      "setPagination",
      "_gaq",
      "timeout",
      "adsbygoogle",
      "__gcse",
      "delComment",
      "player_start",
      "_gat",
      "gaGlobal",
      "clipboard",
      "__rocketLoaderEventCtor",
      "__rocketLoaderLoadProgressSimulator",
      "__cfQR",
      "st",
      "__stdos__",
      "tpcCookiesEnableCheckingDone",
      "tpcCookiesEnabledStatus",
      "__sharethis__docReady",
      "__sharethis__",
      "google_js_reporting_queue",
      "google_srt",
      "google_logging_queue",
      "google_ad_modifications",
      "ggeac",
      "google_measure_js_timing",
      "google_reactive_ads_global_state",
      "_gfp_a_",
      "google_sa_queue",
      "google_sl_win",
      "google_process_slots",
      "google_apltlad",
      "google_spfd",
      "google_lpabyc",
      "google_unique_id",
      "google_sv_map",
      "google_user_agent_client_hint",
      "Goog_AdSense_getAdAdapterInstance",
      "Goog_AdSense_OsdAdapter",
      "google_sa_impl",
      "google_persistent_state_async",
      "__google_ad_urls",
      "google_global_correlator",
      "__google_ad_urls_id",
      "googleToken",
      "googleIMState",
      "_gfp_p_",
      "processGoogleToken",
      "google_prev_clients",
      "goog_pvsid",
      "google_jobrunner",
      "ampInaboxIframes",
      "ampInaboxPendingMessages",
      "goog_sdr_l",
      "google_osd_loaded",
      "google_onload_fired",
      "module$exports$cse$search",
      "module$exports$cse$CustomImageSearch",
      "module$exports$cse$CustomWebSearch",
      "google",
      "module$exports$cse$searchcontrol",
      "module$exports$cse$customsearchcontrol",
      "closure_lm_969024",
      "Goog_Osd_UnloadAdBlock",
      "Goog_Osd_UpdateElementToMeasure",
      "google_osd_amcb",
      "googletag",
      "__AMP_LOG",
      "__AMP_ERRORS",
      "ampInaboxInitialized",
      "__AMP_MODE",
      "__AMP_REPORT_ERROR",
      "ampInaboxPositionObserver",
      "ampInaboxFrameOverlayManager",
      "AMP",
      "FuckAdBlock",
      "fuckAdBlock",
      "xcJQCflAmpis",
      "KkUCuxqIgh",
      "VABjXzYzJp",
      "WSpSwDLzQd",
      "nsJjjBITZC",
      "neMuFFBFgq",
      "rMwHazIJjv",
      "BGWRSzJxTu",
      "c2",
      "c1",
      "u4QPe94lDBw7",
      "cfVDoTdmsN",
      "adBlockDetected",
      "adBlockNotDetected",
      "checkAgain",
      "__cfRLUnblockHandlers",
      "closure_lm_187383",
      "GoogleGcLKhOms",
      "google_image_requests",
      "x",
      "spimg",
      "c",
      "d",
      "zk5mz489hep",
      "zfgformats",
      "onClickTrigger",
      "zfgloadedpopup",
      "ppuWasShownFor4194753",
    ],
    finalDownloadElementSelector: [
      ["form a[type='button']", /download now|userupload.in:183/gi],
    ],
    addHoverAbility: [["form a[type='button']"], ["button#downloadbtn"]],
    addInfoBanner: [["form[name='F1'] .row", "beforeend"]],
    createCountdown: ".seconds",
    customScript() {
      this.addGoogleRecaptchaListener(
        document.forms.F1,
        +this.$(".seconds").innerText || 5
      );
    },
  },
  "userupload.net": {
    host: ["userupload.net"],
    customStyle: `html,body{background:#121212!important;color:#dfdfdf!important}.card,.icon,.label-group,.subpage-content{background:#121212!important}`,
    downloadPageCheckBySelector: ["button#downloadbtn"],
    downloadPageCheckByRegex: [
      /Create Download Link/gi,
      /available for your IP next 24 hours/gi,
    ],
    remove: [
      "#st_gdpr_iframe",
      "nav",
      "footer",
      ".aboutFile",
      ".adsbygoogle",
      "form div.report",
    ],
    removeByRegex: [],
    hideElements: undefined,
    removeIFrames: true,
    removeDisabledAttr: true,
    finalDownloadElementSelector: [["form a.btn.btn-primary.btn-block"]],
    addHoverAbility: [
      ["button#downloadbtn", true],
      ["form a.btn.btn-primary.btn-block", false],
    ],
    addInfoBanner: undefined,
    customScript() {
      // add listener
      this.addGoogleRecaptchaListener(document.F1);

      this.ifElementExists("form[name='F1']", () => {
        this.addInfoBanner(this.$("form[name='F1']")?.parentElement);
      });
    },
  },
  rapidgator: {
    host: ["rapidgator.net/file", "rapidgator.net/download/captcha"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;background-color:#121212!important;color:#dfdfdf!important}.container,.overall,.wrap-main-block{background:#121212!important}`,
    downloadPageCheckBySelector: [],
    downloadPageCheckByRegex: [],
    remove: [
      ".header",
      ".footer",
      "#left_banner",
      "#right_banner",
      "#top_banner",
      "#copy",
      ".social_buttons",
      "div.clear",
      ".table-download table tr:nth-child(n+2)",
      ".captcha_info",
    ],
    removeByRegex: [],
    hideElements: undefined,
    removeIFrames: true,
    removeDisabledAttr: true,
    finalDownloadElementSelector: [],
    addHoverAbility: [
      ["form#captchaform a.btn", true],
      ["a.link.act-link.btn-free", false],
      [
        "div.in div.download-ready div.btm div.box-download a.btn.btn-download",
        true,
      ],
    ],
    addInfoBanner: undefined,
    customScript() {
      // add listener
      this.addGoogleRecaptchaListener(document.forms.captchaform);

      this.ifElementExists("form#captchaform", () => {
        this.addInfoBanner(this.$("form#captchaform")?.parentElement);
      });

      // the ending direct download link
      const ddlURL =
        document.body.textContent.match(
          /return \'(http[s]?:\/\/(.*)?download(.*)?)\'/
        )?.[1] ?? null;
      if (ddlURL) {
        this.log("DDL Link was found on this page.");
        this.openNative(ddlURL, "_self");
        this.log(`Opening DDL link for file: ${ddlURL}`);
      }
    },
  },
  katfile: {
    host: ["katfile.com"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;background-color:#121212!important;color:#dfdfdf!important}#container,.wrapper{background:#121212!important}.panel{background:#212121!important}`,
    downloadPageCheckBySelector: ["#downloadbtn"],
    downloadPageCheckByRegex: [
      /reCAPTCHA is a/gi,
      /slow speed download/gi,
      /Delay between free downloads must/gi,
    ],
    remove: [
      "nav",
      "footer",
      "#dllinked2",
      "#adtrue_tag_21265",
      "#addToAccount",
    ],
    removeByRegex: [],
    hideElements: undefined,
    removeIFrames: true,
    removeDisabledAttr: true,
    destroyWindowFunctions: [
      "setPagination",
      "lng",
      "_gaq",
      "adtrue_tags",
      "pro_ad",
      "timeout",
      "pmauid",
      "pmawid",
      "fq",
      "captcha_click",
      "download_click",
      "arr",
      "count",
      "player_start",
      "closure_lm_946261",
      "_gat",
      "gaGlobal",
      "generateCb",
      "adtrue_time",
      "adtrue_cb",
      "adtrue_rtb",
      "f9HHHH",
      "H9HHHH",
      "BetterJsPop",
      "ByoB",
      "adblock",
      "q",
      "qs",
      "js_code",
      "k",
      "allElement",
    ],
    finalDownloadElementSelector: [["#dlink"]],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      this.$("#freebtn")?.click();
      if (!window.grecaptcha) {
        this.$("#downloadbtn")?.click();
      }
      this.$("#dlink")?.click();

      // add listener
      this.addGoogleRecaptchaListener(document.forms.F1);
    },
  },
  "upload-4ever": {
    host: [/^(?:https?:\/\/)?(?:www\.)?upload-4ever.com/, "upload-4ever.com"],
    customStyle: `html,body{background:#121212!important;color:#dfdfdf!important}.firstOne,.adsbygoogle,ins{display:none!important;}.notFirstOne{display:block!important;}a#downLoadLinkButton{padding:25px;}`,
    downloadPageCheckBySelector: [
      "#downloadbtn",
      "#downLoadLinkButton",
      "input[name='method_free']",
    ],
    downloadPageCheckByRegex: [
      /You can upgrade your account to a Premium account/gi,
      /click here to download/gi,
    ],
    remove: ["nav", "#gdpr-cookie-notice", "footer"],
    removeByRegex: [
      [
        "div.col-sm-12.content-section.text-center.mb-5",
        /upgrade your account to a Premium account/gi,
      ],
    ],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    destroyWindowFunctions: [
      "_gaq",
      "setPagination",
      "cookiesAgree",
      "adsbygoogle",
      "share_facebook",
      "share_twitter",
      "share_gplus",
      "share_vk",
      "timeout",
      "delComment",
      "player_start",
      "showFullScreen",
      "_gat",
      "a0_0x433e",
      "a0_0x3d7e",
      "k",
      "_8kf8erm7a4v",
      "ufotwnsdohk",
      "zfgformats",
      "setImmediate",
      "clearImmediate",
      "_emizg",
      "_nqgrxy",
      "LAST_CORRECT_EVENT_TIME",
      "_3223917861",
      "_1534093544",
      "F5NN",
      "I833",
      "DEBUG_MODE",
      "ENABLE_LOGS",
      "ENABLE_ONLINE_DEBUGGER",
      "SUPPORT_IE8",
      "MOBILE_VERSION",
      "EXTERNAL_POLYFILL",
      "SEND_PIXELS",
      "IS_POP_COIN",
      "PIXEL_LOG_LEVEL_INFO",
      "PIXEL_LOG_LEVEL_DEBUG",
      "PIXEL_LOG_LEVEL_WARNING",
      "PIXEL_LOG_LEVEL_ERROR",
      "PIXEL_LOG_LEVEL_METRICS",
      "p5NN",
      "S5NN",
      "L5NN",
      "WOW",
      "_this",
      "__CF$cv$params",
      "closure_lm_781969",
      "fanfilnfjkdsabfhjdsbfkljsvmjhdfb",
      "onClickTrigger",
      "kkp4a5x5tv",
      "zfgloadedpopup",
      "iinf",
      "webpushlogs",
      "initIPP",
    ],
    finalDownloadElementSelector: [],
    addHoverAbility: [
      ["div.rightcol div#commonId button#downloadbtn", true],
      ["a#downLoadLinkButton", false],
    ],
    addInfoBanner: [
      ["div.rightcol div#commonId", "beforeend"],
      ["a#downLoadLinkButton", "afterend"],
    ],
    createCountdown: ".seconds",
    customScript() {
      this.ifElementExists("#downloadbtn", () => {
        this.$("#downloadbtn").classList.replace("btn-sm", "btn-lg");
      });

      // Automation
      this.$("input[name='method_free']")?.click();
      this.addGoogleRecaptchaListener(document.forms.F1, 35);
      this.waitUntilSelector("#downLoadLinkButton").then((link) => {
        this.logDebug(link.getAttribute("onclick"));
        // Remove nasty ad redirect
        link.removeAttribute("onclick");
        link.setAttribute("href", link?.dataset.target);
        this.logNative(link?.dataset.target);
        if (link?.dataset.target) {
          this.log("DDL Link was found on this page.");
          // Open DDL for download
          this.openNative(link?.dataset.target, "_self");
          this.log("Opening DDL link for file.");
        }
      });
      this.waitUntilSelector("#downLoadLinkButton[onclick]").then((btn) => {
        this.log(btn.getAttribute("onclick"));
        btn.removeAttribute("onclick");
      });
    },
  },
  uploadev: {
    host: ["uploadev.org"],
    customStyle: `.mngez_messgepage,.mngez_download0,.mngez_download1,body{background:#121212!important;color:#dfdfdf!important}.mngez_download1 .capcha p{color:#dfdfdf!important}.mngez_download1 .fileinfo .colright .col1 p i{color:#dfdfdf!important}.mngez_download1 .fileinfo .colright .col1 span{color:#dfdfdf!important}.adsbygoogle{display:none!important}`,
    downloadPageCheckBySelector: [
      "input[name='method_free']",
      "#error_message",
      "#direct_link a.directl",
    ],
    downloadPageCheckByRegex: [
      /This direct link will be available for your IP/gi,
    ],
    remove: [
      "header",
      "#gdpr-cookie-notice",
      "footer",
      "#footer2",
      ".tableoffers .offerstxt",
      ".offersprim",
      "div.aboutuplouad",
      "div.sharetabs",
      ".fileinfo .col2",
      "form > center",
      ".adsbygoogle",
    ],
    removeByRegex: [],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: true,
    destroyWindowFunctions: [
      // '__rocketLoaderEventCtor',
      // '__rocketLoaderLoadProgressSimulator',
      "__cfQR",
      "zfgformats",
      "sdk",
      "installOnFly",
      "jQuery1910939354703747453",
      "setPagination",
      "_gaq",
      "adsbygoogle",
      "timeleft",
      "downloadTimer",
      "openPage",
      "linkTo",
      "ww",
      "wh",
      "fixedSize",
      "openInNewTab",
      "popup",
      "google_js_reporting_queue",
      "google_srt",
      "google_logging_queue",
      "google_ad_modifications",
      "ggeac",
      "google_measure_js_timing",
      "google_reactive_ads_global_state",
      "_gfp_a_",
      "google_sa_queue",
      "google_sl_win",
      "google_process_slots",
      "google_apltlad",
      "google_spfd",
      "google_lpabyc",
      "google_unique_id",
      "google_sv_map",
      "google_user_agent_client_hint",
      "cookiesAgree",
      "__cfRLUnblockHandlers",
      "_gat",
      "gaGlobal",
      "Goog_AdSense_getAdAdapterInstance",
      "Goog_AdSense_OsdAdapter",
      "google_sa_impl",
      "google_persistent_state_async",
      "__google_ad_urls",
      "google_global_correlator",
      "__google_ad_urls_id",
      "googleToken",
      "googleIMState",
      "_gfp_p_",
      "processGoogleToken",
      "google_prev_clients",
      "goog_pvsid",
      "google_jobrunner",
      "ampInaboxIframes",
      "ampInaboxPendingMessages",
      "goog_sdr_l",
      "google_osd_loaded",
      "google_onload_fired",
      "Goog_Osd_UnloadAdBlock",
      "Goog_Osd_UpdateElementToMeasure",
      "google_osd_amcb",
      "GoogleGcLKhOms",
      "google_image_requests",
      "googletag",
      "11",
      "jQuery191039506225584719457",
      "share_facebook",
      "share_twitter",
      "share_gplus",
      "share_vk",
      "timeout",
      "delComment",
      "player_start",
      "showFullScreen",
      "closure_lm_5496",
      "icup",
      "tim",
      "popurl",
      "_0yIlk3",
      "scripts",
      "myScript",
      "queryString",
      "params",
      "_wm",
      "urls",
      "random",
    ],
    finalDownloadElementSelector: [["#direct_link a.directl"]],
    addHoverAbility: [["#downloadbtn", true], ["#direct_link a.directl"]],
    addInfoBanner: [[".mngez_download1", "beforeend"]],
    createCountdown: ".seconds",
    customScript() {
      this.origSetTimeout(() => {
        this.waitUntilSelector("input[name='method_free']").then((btn) =>
          btn?.click()
        );
      }, 1000);
      // this page is slow for some reason so we have to delay
      this.waitUntilGlobalVariable("grecaptcha").then(() => {
        this.addGoogleRecaptchaListener(document.forms.F1, 20);
      });
    },
  },
  apkadmin: {
    host: ["apkadmin.com"],
    customStyle: `html,body{background:#121212!important;color:#dfdfdf!important}center{color:#dfdfdf!important}.download-page .file-info{background:#212121!important;color:#dfdfdf!important}`,
    downloadPageCheckBySelector: [
      "#downloadbtn",
      "div.container.download-page",
    ],
    downloadPageCheckByRegex: [
      /download should automatically begin in a few seconds/gi,
    ],
    remove: ["nav", ".sharetabs", "footer", "#features"],
    removeByRegex: [[".file-info", /About APKadmin.com/gi]],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    destroyWindowFunctions: [
      "__cfQR",
      "__core-js_shared__",
      "1bgbb027-3b87-ae67-26ar-hz150f600z16",
      "process_643263",
      "setPagination",
      "googletag",
      "ggeac",
      "google_js_reporting_queue",
      "findCMP",
      "getRoxotGroupId",
      "getRoxotSectorId",
      "getRoxotDeep",
      "getRoxotEvent",
      "stpdPassback",
      "stpd",
      "stpdChunk",
      "_pbjsGlobals",
      "JSEncrypt",
      "ADAGIO",
      "nobidVersion",
      "nobid",
      "share_facebook",
      "share_twitter",
      "share_gplus",
      "share_vk",
      "timeout",
      "atwpjp",
      "_atd",
      "_euc",
      "_duc",
      "_atc",
      "_atr",
      "addthis",
      "addthis_pub",
      "emdot",
      "_ate",
      "_adr",
      "addthis_conf",
      "addthis_open",
      "addthis_close",
      "addthis_sendto",
      "delComment",
      "player_start",
      "showFullScreen",
      "gtag",
      "dataLayer",
      "fullHeight",
      "__cfRLUnblockHandlers",
      "addthis_config",
      "addthis_share",
      "google_tag_manager",
      "Goog_AdSense_getAdAdapterInstance",
      "Goog_AdSense_OsdAdapter",
      "google_measure_js_timing",
      "goog_pvsid",
      "google_DisableInitialLoad",
      "apstag",
      "aax",
      "sas",
      "apntag",
      "_ADAGIO",
      "Criteo",
      "criteo_pubtag",
      "criteo_pubtag_prebid_112",
      "Criteo_prebid_112",
      "google_tag_data",
      "GoogleAnalyticsObject",
      "ga",
      "__@@##MUH",
      "apstagLOADED",
      "_atw",
      "count",
      "addthis_exclude",
      "addthis_use_personalization",
      "addthis_options_default",
      "addthis_options_rank",
      "addthis_options",
      "__callbacks",
      "gaplugins",
      "gaGlobal",
      "gaData",
      "googleToken",
      "googleIMState",
      "processGoogleToken",
      "__google_ad_urls_id",
      "google_unique_id",
      "goog_sdr_l",
      "ampInaboxPositionObserver",
      "ampInaboxFrameOverlayManager",
      "GoogleGcLKhOms",
      "google_image_requests",
      "a0_0x433e",
      "a0_0x3d7e",
      "__CF$cv$params",
      "jQuery1910782106810384545",
      "google_rum_config",
      "google_srt",
      "_google_rum_ns_",
      "google_rum_values",
    ],
    finalDownloadElementSelector: [],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      this.$("#downloadbtn")?.click();
    },
  },
  dlupload: {
    host: ["khabarbabal.online", "dlsharefile.com", "dlsharefile.org"],
    customStyle: `html,body{background:#121212!important;color:#dfdfdf!important}.bg-secondary,.bg-white,.card,.icon,.label-group,.subpage-content{background:#121212!important}#show-submit-btn,.border.bg-secondary .bg-white.border-0,.col-lg-12.text-center,.row.justify-content-center>a[href],.separator,.text-lg-center.btn-wrapper,center,h5.mb-0{display:none!important}.d-none{display:block!important}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{color:#dfdfdf!important}.container-1{unset:hidden!important}form#DownloadForm{display:flex;flex-direction:column;align-items:center}`,
    downloadPageCheckBySelector: ["a.downloadb"],
    downloadPageCheckByRegex: [/free download/gi],
    remove: [
      "header",
      "footer",
      ".adsbygoogle",
      "center",
      ".shape.shape-style-1",
      "div.separator.separator-bottom.separator-skew",
      ".border.bg-secondary",
      "br",
      ".text-center > .row.justify-content-center > a",
    ],
    removeByRegex: [
      [".row.mx-auto", /DLUpload is a secure/gi],
      [".col-lg-12.text-center", /Safe & Secure/gi],
      [".col-lg-12.text-center", /wait for 14 seconds and click/gi],
      ["div.card-header.border-0", /Start Your /gi],
    ],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    destroyWindowFunctions: [
      // "ethereum",
      // "gtag",
      // "dataLayer",
      // "adsbygoogle",
      // "google_tag_manager",
      // "google_js_reporting_queue",
      // "google_srt",
      // "google_logging_queue",
      // "google_ad_modifications",
      // "ggeac",
      // "google_measure_js_timing",
      // "google_reactive_ads_global_state",
      // "_gfp_a_",
      // "google_sa_queue",
      // "google_sl_win",
      // "google_process_slots",
      // "google_spfd",
      // "google_unique_id",
      // "google_sv_map",
      // "google_lpabyc",
      // "google_user_agent_client_hint",
      // "google_tag_data",
      // "gaGlobal",
      // "Goog_AdSense_getAdAdapterInstance",
      // "Goog_AdSense_OsdAdapter",
      // "google_sa_impl",
      // "google_persistent_state_async",
      // "__google_ad_urls",
      // "google_global_correlator",
      // "__google_ad_urls_id",
      // "googleToken",
      // "googleIMState",
      // "_gfp_p_",
      // "processGoogleToken",
      // "google_prev_clients",
      // "goog_pvsid",
      // "google_jobrunner",
      // "ampInaboxIframes",
      // "ampInaboxPendingMessages",
      // "goog_sdr_l",
      // "google_osd_loaded",
      // "google_onload_fired",
      // "Goog_Osd_UnloadAdBlock",
      // "Goog_Osd_UpdateElementToMeasure",
      // "google_osd_amcb",
      // "$insertQueue7cbd83f132f5$",
      // "1bgbb027-3b87-ae67-26ar-hz150f600z16",
      // "RedirectCookies",
      // "filename",
      // "extension",
      // "d",
      // "urlsArray",
      // "randomNumber",
      // "currentImageUrl",
      // "yxhpa",
      // "yxhpb",
      // "yxhpo",
      // "yllixNetworkLoader",
      // "Headroom",
      // "process_430610",
      // "_0x4ab4",
      // "_0x4f3e",
      // "sbslms",
      // "process_430474",
      // "closure_lm_259947",
      // "onYouTubeIframeAPIReady",
      // "$insert7cbd83f132f5$",
      // "closure_lm_94135",
      // "_0xa5ec",
      // "_0x4b20",
      // "_0x42f0b5",
      // "mm",
      // "rp",
      // "LieDetector",
      // "AaDetector",
      // "placementKey",
      // "_0xa6ab",
      // "_0x41de",
      // "googletag",
      // "GoogleGcLKhOms",
      // "google_image_requests",
      // "DownloadLink",
      // "GotoLink",
      // "_0x28f6",
      // "_0x3693",
      // "_0x196a1559e34586fdb",
      // "ImpressionCookies",
      // "d1",
      // "urlsArray1",
      // "randomNumber1",
      // "currentImageUrl1",
    ],
    finalDownloadElementSelector: [],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      this.$("body").insertAdjacentHTML(
        "afterbegin",
        `<form id="DownloadForm" action="/Download/FilePage5" method="post">
      <input type="hidden" name="FileId" value="NmU1ZDRhOTYt">
      <input type="hidden" name="ContinentName" value="">
      <input type="hidden" name="CountryName" value="">
      <input type="hidden" name="CityName" value="">
      <button class="btn btn-lg btn-facebook  d-none" type="submit" id="Submit">Start Download</button>`
      );
      this.createGoogleRecaptcha(
        "#DownloadForm",
        "6LdyluwUAAAAAI5AMDQTg4_9LFoNbrJub0IsdU3p",
        "afterbegin"
      );
      return;
      this.waitUntilSelector("a#downloadb").then((btn) => {
        btn?.click();
      });
      this.waitUntilSelector("#download-status").then((btn) => {
        $("#download-status").attr("id", "loading").text("Loading...");
        $("div#Download-Card").css("display", "none");
        $(".File-Info-Download").css("visibility", "visible");
      });
      this.waitUntilSelector("a#downloadbtn").then((btn) => {
        btn?.addEventListener(
          "click",
          function () {
            this.textContent = "Loading... Please Wait";
          },
          false
        );
        btn?.click();
      });
      this.waitUntilSelector("form#DownloadForm").then(() => {
        this.addGoogleRecaptchaListener("form#DownloadForm").then(() => {
          this.$("#Submit")?.addEventListener(
            "click",
            function () {
              this.textContent = "Loading... Please Wait";
            },
            false
          );
          this.$("#Submit")?.click();
        });
      });
    },
  },
  file4: {
    host: ["file4.net"],
    customStyle: `html{background:#121212!important}.page-content,.portlet-body,.portlet.light,body{background:#121212!important;color:#dfdfdf!important}iframe[src*=ads]{display:none!important}input[name=sub],.div2 a[href^=down]{background-color:#008cba;border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px}}`,
    downloadPageCheckBySelector: ["input[name='sub']", "a[href^='down']"],
    downloadPageCheckByRegex: [],
    remove: [
      ".page-header",
      ".page-head",
      ".page-content > .container > .row",
      ".page-prefooter",
      ".page-footer",
      "iframe[src*='ads']",
    ],
    removeByRegex: [[".row", /What is file4net/gi]],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    destroyWindowFunctions: [
      "Dropzone",
      "k",
      "_denv1fluxpv",
      "q13fpwg2dn",
      "zfgformats",
      "setImmediate",
      "clearImmediate",
      "_irsgkipt",
      "_zmlhugd",
      "s",
      "h6RR",
      "r1qq",
      "K6RR",
      "r6RR",
      "p6RR",
      "Cookies",
      "moment",
      "daterangepicker",
      "Morris",
      "eve",
      "Raphael",
      "AmCharts",
      "sample_data",
      "Datatable",
      "JSZip",
      // "_",
      "pdfMake",
      "ZeroClipboard_TableTools",
      "App",
      "Dashboard",
      "TableDatatablesManaged",
      "Layout",
      "Demo",
      "QuickSidebar",
      "closure_lm_166842",
      "LAST_CORRECT_EVENT_TIME",
      "_3512947627",
      "_766768431",
      "fa",
      "_1995723363",
      "post_sticky_handler",
      "post_noads_handler",
      "post_skin_handler",
      "post_expandable_handler",
      "post_pop_handler",
      "post_interstitial_handler",
      "post_native_handler",
      "native_resize_handler",
      "ItemDataScript_parameter",
      "ItemDataScript_parameter_new",
      "ItemDataScript_parameter_seperate",
      "aduid",
      "pid",
      "width",
      "height",
      "displaytype",
      "page_meta_data",
      "page_title",
      "page_referrer",
      "meta_description",
      "meta_keywords",
      "search_keywords",
      "currently_rendered",
      "currently_rendered_flag",
      "currently_rendered_adunit",
      "ret",
      "iframe_src",
      "q9tt",
      "J911",
      "n3hh",
      "P9tt",
      "G3hh",
      "m3hh",
      "U3hh",
      "i911",
      "N911",
      "Q911",
      "c2ss",
      "onClickTrigger",
      "kkp4a5x5tv",
      "zfgloadedpopup",
      "urlorigin",
      "iinf",
      "zfgloadednative",
      "_retranberw",
      "webpushlogs",
      "initIPP",
      "regeneratorRuntime",
      "__core-js_shared__",
      "_retranber",
      "wm",
      "oaid",
      "ppuWasShownFor4187056",
      "_0x2efe",
      "_0x2200",
      "_nps",
      "nsto",
      "timeout",
      "interval",
      "threshold",
      "secondsleft",
      "sleepFor",
      "startChecking",
      "startschedule",
      "resetTimer",
      "_nne4hoafqlc",
      "zxwphqjzamr",
      "e",
      "x",
    ],
    finalDownloadElementSelector: [[".div2 a[href^='down']"]],
    addHoverAbility: [
      ["form[name='myform'] input[type='submit']", true],
      [".div2 a[href^='down']", false],
    ],
    addInfoBanner: [
      ["form[name='myform']", "beforeend"],
      [".div2 a[href^='down']", "afterend"],
    ],
    customScript() {
      this.waitUntilGlobalVariable("grecaptcha").then(() => {
        const form = this.$("form[name='myform']");
        form.insertAdjacentHTML(
          "afterbegin",
          `<input type="hidden" name="sub" value="Continue">`
        );
        this.addGoogleRecaptchaListener(form);
      });
      this.waitUntilSelector(".div1").then(
        (div) => (div.style.display = "none")
      );
      this.waitUntilSelector(".div2").then((div) => {
        div.style.display = "block";
        div.querySelector("a").removeAttribute("onclick");
      });
    },
  },
  dailyuploads: {
    host: ["dailyuploads.net"],
    customStyle: `html,body{background:#121212!important;color:#dfdfdf!important}form[name=F1]{visibility:hidden}form[name=F1] table{visibility:visible}div.banner div.inner{display:flex;flex-direction:column;align-items:center}a[href*='.dailyuploads.net']:before{content:"Download"}a[href*='.dailyuploads.net'],#downloadBtnClickOrignal,.ss-btn{background-color:#44c767;border-radius:28px;border:1px solid #18ab29;display:inline-block;cursor:pointer;color:#fff;font-family:Arial;font-size:17px;font-weight:700;padding:12px 64px;text-decoration:none;text-shadow:0 1px 0 #2f6627}a[href*='.dailyuploads.net']:hover,#downloadBtnClickOrignal:hover,.ss-btn:hover{background-color:#5cbf2a}a[href*='.dailyuploads.net'],#downloadBtnClickOrignal,.ss-btn:active{position:relative;top:1px}`,
    downloadPageCheckBySelector: [],
    downloadPageCheckByRegex: [
      /Download File/gi,
      /File Download Link Generated/gi,
      /direct link will be available/gi,
    ],
    remove: [
      ".navbar-inner",
      ".admin",
      ".footer",
      "table.file_slot",
      "label",
      "td[align='center'][width]",
      "a[href*='instagram']",
      "br",
      "a[title='online visitors']",
      "img[src*='redbutton.png']",
      "#addLinkBtn",
      "input[onclick]",
      "a:not([href*='dailyuploads'])",
    ],
    removeByRegex: [],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    destroyWindowFunctions: [
      "show_fname_chars",
      "upload_type",
      "form_action",
      "x",
      "y",
      "openStatusWindow",
      "StartUpload",
      "StartUploadBox",
      "checkExt",
      "checkSize",
      "getFileSize",
      "fixLength",
      "MultiSelector",
      "getFormAction",
      "setFormAction",
      "InitUploadSelector",
      "findPos",
      "changeUploadType",
      "jah",
      "submitCommentsForm",
      "scaleImg",
      "OpenWin",
      "player_start",
      "convertSize",
      "openlink",
      "checkForm",
      "tab_cookie",
      "share_facebook",
      "share_twitter",
      "share_gplus",
      "share_vk",
      "tabberOptions",
      "setCookie",
      "getCookie",
      "deleteCookie",
      "tabberObj",
      "tabberAutomatic",
      "tabberAutomaticOnLoad",
      "_Hasync",
      "_gaq",
      "curr",
      "old",
      "closure_lm_382233",
      "_gat",
      "gaGlobal",
      "gw2znwdsw05",
      "zfgformats",
      "onClickTrigger",
      "zfgloadedpopup",
      "chfh",
      "chfh2",
      "_HST_cntval",
      "Histats",
      "_HistatsCounterGraphics_0_setValues",
      "a",
      "cv",
      "Tynt",
      "_dtspv",
      "sdk",
      "installOnFly",
      "_33Across",
      "__uspapi",
      "zfgloadedpush",
      "zfgloadedpushopt",
      "zfgloadedpushcode",
      "__connect",
      "lotame_3825",
      "char",
      "lotameIsCompatible",
      "lt3825_ba",
      "lt3825_b",
      "lt3825_c",
      "lt3825_ca",
      "lt3825_d",
      "lt3825_e",
      "lt3825_da",
      "lt3825_ea",
      "lt3825_fa",
      "lt3825_",
      "lt3825_4",
      "lt3825_aa",
      "lt3825_a",
      "lt3825_f",
      "lt3825_g",
      "lt3825_h",
      "lt3825_i",
      "lt3825_j",
      "lt3825_l",
      "lt3825_ga",
      "lt3825_k",
      "lt3825_m",
      "lt3825_n",
      "lt3825_o",
      "lt3825_p",
      "lt3825_q",
      "lt3825_r",
      "lt3825_s",
      "lt3825_t",
      "lt3825_u",
      "lt3825_ha",
      "lt3825_ia",
      "lt3825_w",
      "lt3825_ja",
      "lt3825_x",
      "lt3825_y",
      "lt3825_v",
      "lt3825_z",
      "lt3825_A",
      "lt3825_B",
      "lt3825_C",
      "lt3825_D",
      "lt3825_E",
      "lt3825_F",
      "lt3825_G",
      "lt3825_H",
      "lt3825_I",
      "lt3825_J",
      "lt3825_L",
      "lt3825_M",
      "lt3825_N",
      "lt3825_K",
      "lt3825_ka",
      "lt3825_la",
      "lt3825_P",
      "lt3825_O",
      "lt3825_Q",
      "lt3825_R",
      "lt3825_S",
      "lt3825_T",
      "lt3825_ma",
      "lt3825_na",
      "lt3825_oa",
      "lt3825_pa",
      "lt3825_U",
      "lt3825_V",
      "lt3825_W",
      "lt3825_qa",
      "lt3825_sa",
      "lt3825_ra",
      "lt3825_X",
      "lt3825_ta",
      "lt3825_ua",
      "lt3825_Y",
      "lt3825_Z",
      "lt3825__",
      "lt3825_va",
      "lt3825_wa",
      "lt3825_xa",
      "lt3825_ya",
      "lt3825_0",
      "lt3825_za",
      "lt3825_Aa",
      "lt3825_Ba",
      "lt3825_1",
      "lt3825_Da",
      "lt3825_Ca",
      "lt3825_Ea",
      "lt3825_Fa",
      "lt3825_Ga",
      "lt3825_Ha",
      "lt3825_2",
      "lt3825_3",
      "lt3825_Ia",
      "lt3825_Ja",
      "lt3825_Ka",
      "lt3825_La",
      "lt3825_Ma",
      "lt3825_Na",
      "lt3825_Oa",
      "lt3825_Pa",
      "lt3825_Qa",
      "lt3825_5",
      "lt3825_6",
      "lt3825_Ta",
      "lt3825_Ua",
      "lt3825_Sa",
      "lt3825_Ra",
      "lt3825_Wa",
      "lt3825_Va",
      "lt3825_Ya",
      "lt3825_Xa",
      "lt3825_7",
      "lt3825_Za",
      "lt3825__a",
      "lt3825_0a",
      "lt3825_1a",
      "lt3825_2a",
      "lt3825_4a",
      "lt3825_7a",
      "lt3825_6a",
      "lt3825_3a",
      "lt3825_9a",
      "lt3825_5a",
      "lt3825_8a",
      "lt3825_ab",
      "lt3825_$a",
      "lt3825_bb",
      "lt3825_8",
      "lt3825_cb",
      "lt3825_db",
      "lt3825_eb",
      "lt3825_fb",
      "lt3825_gb",
      "lt3825_hb",
      "lt3825_ib",
      "lt3825_kb",
      "lt3825_$",
      "lt3825_jb",
      "lt3825_lb",
      "lt3825_9",
      "ppuWasShownFor3374427",
      "__underground",
      "vglnk",
      "s",
      "__v5k",
      "vl_cB",
      "vl_disable",
      "vglnk_16312892814196",
      "vglnk_16312892814207",
      "k",
      "_pqt8jsmehl",
      "ec55eztpw5",
      "setImmediate",
      "clearImmediate",
      "_wjwos",
      "_jswggtko",
      "_wgd8as395z",
      "_pkreuo",
      "_qnyld",
      "_mgIntExchangeNews",
      "AdskeeperInfC796805",
      "AdskeeperCContextBlock796805",
      "AdskeeperCMainBlock796805",
      "AdskeeperCInternalExchangeBlock796805",
      "AdskeeperCColorBlock796805",
      "AdskeeperCRejectBlock796805",
      "AdskeeperCInternalExchangeLoggerBlock796805",
      "AdskeeperCObserverBlock796805",
      "AdskeeperCSendDimensionsBlock796805",
      "AdskeeperCAntifraudStatisticsBlock796805",
      "AdskeeperCRtbBlock796805",
      "AdskeeperCContentPreviewBlock796805",
      "AdskeeperCGradientBlock796805",
      "AdskeeperCResponsiveBlock796805",
      "mg_loaded_526408_796805",
      "onClickExcludes",
      "mgReject796805",
      "mgLoadAds796805_12267",
      "AdskeeperCReject796805",
      "AdskeeperLoadGoods796805_12267",
      "_mgq",
      "_mgqp",
      "_mgqt",
      "_mgqi",
      "_mgCanonicalUri",
      "_mgPageViewEndPoint526408",
      "_mgPvid",
      "_mgPageView526408",
      "kkp4a5x5tv",
      "vglnk_16312893705126",
      "vglnk_16312893705127",
      "i.js.loaded",
      "i-noref.js.loaded",
      "$insertQueuef2e96b1e1637$",
      "1bgbb027-3b87-ae67-26ar-hz150f600z16",
      "_mgwcapping",
      "_mgPageImp526408",
      "process_289289",
      "process_607019",
      "$insertf2e96b1e1637$",
    ],
    finalDownloadElementSelector: [["a[href*='.dailyuploads.net']"]],
    addHoverAbility: [["a[href*='.dailyuploads.net']"], ["#downloadBtnClick"]],
    addInfoBanner: [
      ["a[href*='.dailyuploads.net']", "afterend"],
      ["#downloadBtnClick", "afterend"],
    ],
    customScript() {
      this.waitUntilGlobalVariable("grecaptcha").then(() => {
        const form = document.forms.F1;
        form.removeAttribute("onsubmit");
        form.addEventListener(
          "submit",
          () => {
            this.$("#downloadBtnClick").textContent = "Loading...";
          },
          false
        );
        this.$("#downloadBtnClick")?.addEventListener(
          "click",
          function () {
            if (grecaptcha.getResponse()) {
              this.textContent = "Loading...";
            }
          },
          false
        );
        this.addGoogleRecaptchaListener(form).then(() => {
          this.$("#downloadBtnClick").textContent = "Loading...";
        });
      });
      this.waitUntilSelector("#downloadBtnClick").then((btn) => {
        btn.className = "ss-btn";
      });
      this.waitUntilSelector(
        "body > div.banner > div > a[href*='dailyuploads']"
      ).then((btn) => {
        btn.className = "ss-btn";
      });
      let curr = this.$("form table").nextElementSibling;
      let old = null;
      while (curr != null) {
        old = curr;
        curr = curr.nextElementSibling;
        old.remove();
      }
    },
  },
  usersdrive: {
    host: ["usersdrive.com"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important;padding:0!important}.container-fluid main{background:#121212!important;padding:0!important}.down{display:flex!important;flex-direction:column!important;align-items:center!important}`,
    downloadPageCheckBySelector: [
      "button#method_free",
      "button#downloadbtn",
      "div a.btn-download.get-link",
    ],
    downloadPageCheckByRegex: [
      /Create Download Link/gi,
      /This direct link will be available/gi,
    ],
    remove: ["nav", "center", ".col-md", ".socialmedia", ".pro"],
    removeByRegex: [],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: true,
    destroyWindowFunctions: [
      "s",
      "O3AA",
      "K7mm",
      "L599",
      "n7mm",
      "Z3AA",
      "l3AA",
      "J3AA",
      "z599",
      "O599",
      "t599",
      "U2ii",
      "setPagination",
      "_gaq",
      "timeout",
      "ProgressBar",
      "_gat",
      "gaGlobal",
      "q9tt",
      "J911",
      "n3hh",
      "P9tt",
      "G3hh",
      "m3hh",
      "U3hh",
      "i911",
      "N911",
      "Q911",
      "c2ss",
      "a6_0x56ce",
      "a6_0x285a",
      "s2ss910ff",
      "s2ss910",
      "delComment",
      "player_start",
      "h",
      "set",
      "files",
      "uplist",
      "img",
      "price",
      "closure_lm_380100",
      "a8_0x328e",
      "a8_0x31d7",
      "utm910",
      "utsid-send",
      "_0x4ab4",
      "_0x4f3e",
      "sbslms",
      "_0xa5ec",
      "_0x4b20",
      "_0x42f0b5",
      "mm",
      "LieDetector",
      "AaDetector",
      "placementKey",
      "rp",
      "_0xa6ab",
      "_0x41de",
      "EmailDialog",
    ],
    finalDownloadElementSelector: [
      [".down a", /This direct link will be available/gi],
    ],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    createCountdown: ".seconds",
    customScript() {
      this.$(".row .col-md-4")?.classList?.replace("col-md-4", "col-md-12");
      this.addGoogleRecaptchaListener(
        document.forms.F1,
        +this.$(".seconds").innerText || 17
      );
    },
  },
  indishare: {
    host: ["indi-share.net", "indi-share.com", "techmyntra.net"],
    customStyle: `html{background:#121212!important}body,.panelRight,h2{background:#121212!important;color:#dfdfdf!important;padding:0!important}#direct_link a{background-color:#008CBA;border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px}#direct_link a:hover{background-color:#0A6BD1}#direct_link a:before{content:"Download"}#content{display:flex;flex-direction:column;align-items:center}#container{height:inherit !important;}`,
    downloadPageCheckBySelector: [
      "#downloadbtn",
      "#direct_link a",
      "a[rel*='noopener']",
    ],
    downloadPageCheckByRegex: [/direct link will be available/gi],
    remove: [
      ".sidenav",
      "#header",
      ".footerNavigation",
      "footer",
      "#direct_link a img",
      "#content > h3",
    ],
    removeByRegex: [],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: true,
    destroyWindowFunctions: [
      "_wpemojiSettings",
      "ytp",
      "onYouTubeIframeAPIReady",
      "getYTPVideoID",
      "uncamel",
      "setUnit",
      "setFilter",
      "nAgt",
      "isTouchSupported",
      "getOS",
      "nameOffset",
      "verOffset",
      "ix",
      "start",
      "end",
      "twemoji",
      "wp",
      "jQuery360069712562284331821",
      "scriptUrl",
      "ttPolicy",
      "YT",
      "YTConfig",
      "onYTReady",
      "yt",
      "ytDomDomGetNextId",
      "ytEventsEventsListeners",
      "ytEventsEventsCounter",
      "ytPubsubPubsubInstance",
      "ytPubsubPubsubTopicToKeys",
      "ytPubsubPubsubIsSynchronous",
      "ytPubsubPubsubSubscribedKeys",
      "ytLoggingTransportGELQueue_",
      "ytLoggingTransportTokensToCttTargetIds_",
      "ytLoggingGelSequenceIdObj_",
      "ytglobal",
      "ytPubsub2Pubsub2Instance",
      "ytPubsub2Pubsub2SubscribedKeys",
      "ytPubsub2Pubsub2TopicToKeys",
      "ytPubsub2Pubsub2IsAsync",
      "ytPubsub2Pubsub2SkipSubKey",
      "ytNetworklessLoggingInitializationOptions",
      "jQuery19104180234621619725",
      "setPagination",
      "_gaq",
      "s",
      "h6RR",
      "r1qq",
      "K6RR",
      "r6RR",
      "p6RR",
      "openNav",
      "closeNav",
      "_gat",
      "gaGlobal",
      "q9tt",
      "J911",
      "n3hh",
      "P9tt",
      "G3hh",
      "m3hh",
      "U3hh",
      "i911",
      "N911",
      "Q911",
      "c2ss",
      "_0xa5ec",
      "_0x4b20",
      "_0x42f0b5",
      "mm",
      "LieDetector",
      "AaDetector",
      "placementKey",
      "rp",
      "adtrue_tags",
      "player_start",
      "countdown",
      "generateCb",
      "adtrue_time",
      "adtrue_cb",
      "adtrue_rtb",
      "q",
      "qs",
      "js_code",
      "k",
      "_0xa6ab",
      "_0x41de",
      "share_facebook",
      "share_twitter",
      "share_gplus",
      "share_vk",
      "timeout",
      "_tal7bp6gdd",
      "zfgformats",
      "setImmediate",
      "clearImmediate",
      "_ugeyycf",
      "_qsjlbv",
      "delComment",
      "zfgproxyhttp",
      "_yioboic29r",
      "_ac96d98ingp",
      "_mgPageViewEndPoint659169",
      "_mgPvid",
      "_mgPageView659169",
      "_mgPageImp659169",
    ],
    finalDownloadElementSelector: [["#direct_link a"]],
    addHoverAbility: [["#direct_link a"]],
    addInfoBanner: [["#direct_link", "afterend"]],
    customScript() {
      const firstBtn = this.$("a[rel*='noopener']");
      firstBtn?.click();
      const secondBtn = this.$("#downloadbtn");
      secondBtn?.click();
      const finalBtn = this.$("#direct_link");
      finalBtn.style.display = "";
    },
  },
  depositfiles: {
    host: ["depositfiles.com"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important;}#free_btn{background:#008CBA!important;border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px}#free_btn:hover{background:#0A6BD1!important;}#download_recaptcha_container{display: flex;flex-direction: column;align-items: center;}`,
    downloadPageCheckBySelector: ["#free_btn", "#download_recaptcha"],
    downloadPageCheckByRegex: [/downloading mode!/gi],
    remove: [
      "#cookie_popup",
      ".top_menu",
      "#member_menu",
      ".content.right",
      "#foobar",
      ".banner1",
      ".violation",
      "div.choose",
      ".df_button:not([id])",
      ".gold_speed_promo_block.hide_download_started",
      ".sprite.download_icon",
      "[id^=ad]",
      "#download_waiter_container",
      "#confident_container",
      "div.string div.string_title",
      "img[src*='static.depositfiles.com']",
    ],
    removeByRegex: [["td.text", /No Additional Fees!/gi]],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    destroyWindowFunctions: [
      "cur",
      "fileQueued",
      "fileQueueError",
      "fileDialogComplete",
      "uploadStart",
      "uploadProgress",
      "uploadSuccess",
      "uploadError",
      "uploadComplete",
      "queueComplete",
      "swfobject",
      "activate_gold_key",
      "bonuser_paid_request_console_add_show",
      "bonuser_paid_request_console_remove_show",
      "bonuser_paid_request_console_close",
      "bonuser_paid_request_add",
      "bonuser_paid_request_remove",
      "read_get_param",
      "login_toggle",
      "get_display_text",
      "show_error",
      "load_recaptcha",
      "DP_jQuery_1631293565349",
      "SWFUpload",
      "fabHash",
      "ajload",
      "isopra",
      "isAbSpeedMode",
      "recaptcha_public_key",
      "recaptcha2PublicKey",
      "toggle",
      "cache_img",
      "is_copy_to_clipboard_enabled",
      "enable_copy_to_cliboard_links",
      "copy_to_clipboard",
      "get_elements_by_class",
      "zero_pad",
      "send_payoff",
      "DFUtils",
      "http_abs_path",
      "http_static_path",
      "ssl_static_path",
      "http_ads_path",
      "lang",
      "user_country",
      "RecaptchaOptions",
      "_0x4ab4",
      "_0x4f3e",
      "sbslms",
      "is_popup_showed",
      "begin_popup_url",
      "begin_script_url",
      "show_begin_popup",
      "show_url_start_time",
      "show_url_first",
      "show_url_r",
      "show_url",
      "img_code_form_submitted",
      "submit_img_code",
      "img_code_form_onsubmit",
      "on_event",
      "number_format",
      "img_code_cached",
      "img_code_icid",
      "cache_img_code",
      "refresh_img_code",
      "open_img_code_page",
      "addBookmark",
      "is_download_started",
      "download_started",
      "show_iframe_console",
      "iframe_console2_timer",
      "show_iframe_console2",
      "show_div_console",
      "backgroud_gray",
      "close_iframe_console",
      "close_iframe_oauth_login",
      "show_gold_offer",
      "show_gold_offer_div",
      "show_gold_offer_video",
      "close_gold_offer_video",
      "redirectAfterDownloadURL",
      "redirectCookieName",
      "setRedirectAfterDownloadURL",
      "showAfterDownloadStart",
      "usePayca",
      "payca",
      "ads_zone47_init",
      "regulardownload",
      "new_delay",
      "download_frm",
      "load_form",
      // "load_ajax",
      "checkJSPlugins",
      "check_recaptcha",
      "check_puzzlecaptcha",
      "check_captchme",
      "check_cap4a_captcha",
      "check_payca",
      "check_adverigo",
      "check_coinhive",
      "check_cpchcaptcha",
      "sleep",
      "abSafeCall",
      // "fid",
      "msg",
      "hLoadForm",
      "ads_zone40_init",
      "pageTracker",
      "FuckAdBlock",
      "fuckAdBlock",
      "_0x228c",
      "unblockia",
      "regeneratorRuntime",
      "setImmediate",
      "clearImmediate",
      "tcpusher",
      "_0xa5ec",
      "_0x4b20",
      "_0x42f0b5",
      "mm",
      "LieDetector",
      "AaDetector",
      "placementKey",
      "rp",
      "__core-js_shared__",
      "__fp-init",
      "_0xa6ab",
      "_0x41de",
      "scroll_downloadblock",
    ],
    finalDownloadElementSelector: [],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      this.addJQuery();
      this.$("#download_url")?.removeAttribute("style");
      this.waitUntilSelector("#free_btn").then(() => {
        document.body.insertAdjacentHTML(
          "beforeend",
          `<form id="customForm" method=post><input type="hidden" name="gateway_result" value="1"/><input type="hidden" name="asm" value="0"/></form>`
        );
        document.forms.customForm.submit();
      });
      this.waitUntilGlobalVariable("jQuery").then(async () => {
        await this.sleep(1000);
        const _this = this;
        // fetch(`/get_file.php?fid=${fid}&challenge=undefined&response=undefined&t=1`).then(res => res.text()).then(d => d.match(/action="([^"]+")\smethod/)?.[1])
        $.ajax({
          url: `/get_file.php?fid=${fid}&challenge=undefined&response=undefined&t=1`,
          success(data) {
            const tmp = $(data)
              .filter((i, e) => e.tagName == "FORM")
              .removeAttr("onsubmit");
            const dl_link = tmp.attr("action");
            _this.openNative(dl_link, "_self");
            $("#download_container").html(tmp);
            _this.$("#downloader_file_form a").href = dl_link;
          },
          error() {
            console.log("error");
          },
        });
      });
    },
  },
  clicknupload: {
    host: ["clicknupload.cc"],
    customStyle: `html, body, div.filepanel, .dfilename, #countdown, .seconds{background:#121212!important;color:#dfdfdf!important;height:inherit!important;}[id*=Ad]{display:none!important;}#container{margin:0 auto!important;}`,
    downloadPageCheckBySelector: [
      "#method_free",
      "table table div",
      "button#downloadbtn",
    ],
    downloadPageCheckByRegex: [/direct link will be available/gi],
    remove: [
      "#mySidenav",
      ".page-buffer",
      "footer",
      ".SidemenuPanel",
      "#header",
      "#M307473ScriptRootC1090619",
      "#M307473ScriptRootC1086510",
      ".sharetabs",
      "#sharebuttons",
    ],
    removeByRegex: [],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    destroyWindowFunctions: [
      "_gaq",
      "openNav",
      "closeNav",
      "siteScrubber",
      "share_facebook",
      "share_twitter",
      "share_gplus",
      "share_vk",
      "_gat",
      "timeout",
      "k",
      "_m9t6byk4j6r",
      "4ud6s3ihpoa",
      "zfgformats",
      "setImmediate",
      "clearImmediate",
      "_qodsgee",
      "_wkeprv",
      "delComment",
      "player_start",
      "onClickTrigger",
      "kkp4a5x5tv",
      "zfgloadedpopup",
      "$insertQueuef65abf16d287$",
      "dy72q5f5r3t",
      "$insertQueue7ef062992c2d$",
      "$insertQueuee22d894a4f46$",
      "1bgbb027-3b87-ae67-26ar-hz150f600z16",
      "process_398378",
      "process_589016",
      "process_539121",
      "$insert7ef062992c2d$",
      "$inserte22d894a4f46$",
      "where",
      "_pop",
      "detectZoom",
      "iframe",
      "_pao",
      "win",
      "$insertQueue058a83516144$",
      "$insertQueue35ec50ccbd9c$",
    ],
    finalDownloadElementSelector: [],
    addHoverAbility: [["button#downloadbtn.downloadbtn"]],
    addInfoBanner: [["div#content div.download", "afterend"]],
    createCountdown: ".seconds",
    customScript() {
      // this.interceptAppendChild();
      // this.interceptAddEventListeners();
      // click the "Slow Download" option on page 1
      this.$("#method_free")?.click();
      const captcha_box = this.$("table table div");

      if (captcha_box) {
        captcha_box.style.color = "#dfdfdf";
        captcha_box.style.background = "#121212";
        const captcha_code = [...captcha_box?.children]
          .sort(
            (x, y) =>
              x.style?.paddingLeft.match(/(\d+)/g)[0] -
              y.style?.paddingLeft.match(/(\d+)/g)[0]
          )
          .map((e) => e.textContent)
          .join("");
        this.$("input.captcha_code").value = captcha_code;
        this.origSetTimeout(() => {
          document.forms?.F1?.submit();
        }, this.$(".seconds").textContent * 1000 || 12 * 1000);
      }
      this.waitUntilSelector("button#downloadbtn").then((btn) => {
        const dl_link = btn
          .getAttribute("onclick")
          ?.replace(/window.open\('|'\);/gi, "");
        this.openNative(dl_link, "_self");
      });
    },
  },
  hexupload: {
    host: ["hexupload.net"],
    customStyle: `html,body{background:#121212!important;color:#dfdfdf!important}#container{background:#121212!important;display:flex;flex-direction:column;justify-content:center;align-items:center}.container{background:#121212!important;display:flex;flex-direction:column;justify-content:center;align-items:center}.download_box{background-color:#323232!important}.bg-white{background:#121212!important}`,
    downloadPageCheckBySelector: [
      "input[name='method_free']",
      "a.link.act-link.btn-free",
      "button#downloadbtn",
      "table.file_slot",
    ],
    downloadPageCheckByRegex: [
      /Slow speed download/gi,
      /Create download link/gi,
      /This direct link will be available/gi,
    ],
    remove: [
      "nav",
      "footer",
      ".download-prepare",
      "#btn_method_premium",
      "#rul0sr8e6bmo1fbci4qu0",
      "div.sharetabs",
      "#sharebuttons",
      "body > div[id]:not([id^=container])",
      "#container > center",
      "#container > .row",
      "#countdown",
    ],
    removeByRegex: [["center", /All transactions are 100% safe and secure/gi]],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    destroyWindowFunctions: [
      "setPagination",
      "jQuery19104661553376883185",
      "clipboard",
      "_Hasync",
      "Tawk_API",
      "Tawk_LoadStart",
      "gtag",
      "dataLayer",
      "google_tag_manager",
      "google_tag_data",
      "GoogleAnalyticsObject",
      "ga",
      "$_Tawk_AccountKey",
      "$_Tawk_WidgetId",
      "$_Tawk_Unstable",
      "$_Tawk",
      "chfh",
      "chfh2",
      "_HST_cntval",
      "Histats",
      "gaplugins",
      "gaGlobal",
      "gaData",
      "tawkJsonp",
      "$__TawkEngine",
      "EventEmitter",
      "$__TawkSocket",
      "__core-js_shared__",
      "regeneratorRuntime",
      "Tawk_Window",
      "_HistatsCounterGraphics_0_setValues",
      "emojione",
    ],
    finalDownloadElementSelector: [],
    addHoverAbility: [["input[name='method_free']", false]],
    addInfoBanner: [["form", "beforeend"]],
    customScript() {
      // this.$("form[action='']")?.submit();
      this.$("input[name='method_free']")?.click();
      this.$$("*").forEach((e) => e.setAttribute("style", ""));
      // this.$$("body > div[id]")?.[1];

      // Allow time for hCaptcha to load
      // this.waitUntilGlobalVariable("hcaptcha").then(() =>
      //   hCaptchaListener(this.$("form[name='F1']"))
      // );
      // this.waitUntilGlobalVariable("Tawk_Window", "app", "$el").then((ele) =>
      //   ele.remove()
      // );
    },
  },
  veryfiles: {
    host: ["veryfiles.com"],
    customStyle: `html{background:#121212!important}body,.blockpage, .download1page .txt,.title{background:#121212!important;color:#dfdfdf!important}.download1page .blockpage .desc span,.download1page .blockpage .desc p{color:#dfdfdf!important}#wrapper{margin:unset!important;}`,
    downloadPageCheckBySelector: [
      "button#downloadbtn",
      "div.download1page",
      "#direct_link a",
    ],
    downloadPageCheckByRegex: [
      /File Download Link Generated/gi,
      /Click Here To Download/gi,
    ],
    remove: [
      "#sidebarphone",
      "header",
      "#Footer_Links",
      "footer",
      "#banner_ad",
      "iframe[name='__tcfapiLocator']",
      "[id^='ads']",
      "[class^=banner]",
      ".sharefile",
      "a[name='report-abuse']",
      "a[name='report-dmca']",
      "h2.maintitag",
      "form[name='F1'] .txt > p",
      "div.adsbox",
      "#commonId >:nth-child(n+2)",
      ".file-box",
      "#M560702ScriptRootC1171294",
      ".creation-container >:not(button):not(span#direct_link)",
      "ul.pageSuccess",
      "div.ppdr.ppdr-pps.rates-ppd",
      "div[style*='margin-bottom']",
      "iframe[data-id]",
    ],
    removeByRegex: [[".blockpage .row", /About APK files/i]],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    destroyWindowFunctions: [
      "setPagination",
      "_gaq",
      "__tcfapi",
      "__uspapi",
      "googletag",
      "_0x57e0",
      "nFNcksmwU",
      "XrhwLPllmYD",
      "KEQNPiZl",
      "PiuWFgLQ",
      "_0x41d7",
      "GKPEJSxZ",
      "x",
      "c2",
      "c1",
      "GSTS1a7nT",
      "MwCDvcOlP",
      "share_facebook",
      "share_twitter",
      "share_gplus",
      "share_vk",
      "timeout",
      "_qevents",
      "_gat",
      "gaGlobal",
      "delComment",
      "player_start",
      "showFullScreen",
      "ggeac",
      "google_js_reporting_queue",
      "quantserve",
      "__qc",
      "ezt",
      "_qoptions",
      "qtrack",
      "regeneratorRuntime",
      "__tcfapiui",
      "closure_lm_316663",
      "Goog_AdSense_getAdAdapterInstance",
      "Goog_AdSense_OsdAdapter",
      "google_measure_js_timing",
      "goog_pvsid",
      "google_reactive_ads_global_state",
      "googleToken",
      "googleIMState",
      "processGoogleToken",
      "__google_ad_urls_id",
      "google_unique_id",
      "$insertQueue78db8f3e23fc$",
      "1bgbb027-3b87-ae67-26ar-hz150f600z16",
      "process_384795",
      "pubcidCookie",
      "process_605336",
      "$insert78db8f3e23fc$",
      "__google_ad_urls",
      "google_osd_loaded",
      "google_onload_fired",
      "ampInaboxIframes",
      "ampInaboxPendingMessages",
      "goog_sdr_l",
      "Goog_Osd_UnloadAdBlock",
      "Goog_Osd_UpdateElementToMeasure",
      "google_osd_amcb",
      "GoogleGcLKhOms",
      "google_image_requests",
      "nH7eXzOsG",
      "ADAGIO",
      "ampInaboxPositionObserver",
      "ampInaboxFrameOverlayManager",
    ],
    finalDownloadElementSelector: [["#direct_link a"]],
    addHoverAbility: [["button#downloadbtn", true], ["#direct_link a"]],
    addInfoBanner: [
      [".blockpage", "beforeend"],
      ["#commonId", "beforeend"],
    ],
    createCountdown: ".seconds",
    customScript() {
      this.waitUntilGlobalVariable("grecaptcha").then(() =>
        this.addGoogleRecaptchaListener(
          document.forms.F1,
          +this.$(".seconds").innerText || 10
        )
      );
    },
  },
  douploads: {
    host: ["douploads.net"],
    customStyle: `html,body,#container,.fileInfo,.bg-white{background:#121212!important;color:#dfdfdf!important}.download_box{background-color:#323232!important}body > section,html>div,.it-client{display:none!important}body{padding-bottom:unset!important}`,
    downloadPageCheckBySelector: ["button[name='method_free']", "a#dl"],
    downloadPageCheckByRegex: [
      /Click here to download/gi,
      /This direct link will be available for/gi,
      /Create download link/gi,
    ],
    remove: [
      "nav",
      "footer",
      ".sharetabs ul",
      "#load img",
      "#gdpr-cookie-notice",
      "div.checkbox.text-center.mt-3.checkbox-info.off",
      "#news_last",
      "div.container.page.downloadPage > div > div.col-md-8.mt-5",
      "center",
    ],
    removeByRegex: [
      [".download_method", /fast download/gi],
      ["div.mt-5.text-center", /No-Captcha & More/gi],
      [".col-md-12", /What is DoUploads/gi],
    ],
    hideElements: undefined,
    removeIFrames: true,
    removeDisabledAttr: true,
    destroyWindowFunctions: [
      "s",
      "r0BB",
      "z0tt",
      "g011",
      "c0BB",
      "q0BB",
      "Y0BB",
      "X0BB",
      "g0BB",
      "setPagination",
      "_gaq",
      "timeout",
      "_gat",
      "q9tt",
      "J911",
      "n3hh",
      "P9tt",
      "G3hh",
      "m3hh",
      "U3hh",
      "i911",
      "N911",
      "Q911",
      "c2ss",
      "zfgformats",
      "zfgloadednative",
      "_retranberw",
      "L1ss",
      "l8T",
      "w5YYYY",
      "F1ss",
      "j3ww",
      "v3ww",
      "U3ww",
      "K8AA",
      "s8AA",
      "g8AA",
      "F4cc",
      "setImmediate",
      "clearImmediate",
      "_rhat4",
      "_p",
      "delComment",
      "player_start",
      "showFullScreen",
      "Trc4999Dh5",
      "_bp",
      "cookiesAgree",
      "ClipboardJS",
      "closure_lm_944715",
      "regeneratorRuntime",
      "__core-js_shared__",
      "_retranber",
      "wm",
      "oaid",
      "sdk",
      "installOnFly",
      "zfgloadedpush",
      "zfgloadedpushopt",
      "zfgloadedpushcode",
      "_0x2efe",
      "_0x2200",
      "_nps",
      "nsto",
      "k",
      "_7be3qu6shei",
      "_rpvlcmw",
      "_stoypgub",
      "ouw6id5g7wo",
      "onClickTrigger",
      "kkp4a5x5tv",
      "zfgloadedpopup",
      "ppuWasShownFor2234052",
    ],
    finalDownloadElementSelector: [[".container.downloadPage > .row a.btn"]],
    addHoverAbility: [
      ["button#downloadbtn", true],
      ["button#downloadBtnClick", true],
      [".container.downloadPage > .row a.btn", false],
    ],
    addInfoBanner: [[".downloadPage > .row", "beforeend"]],
    createCountdown: ".seconds",
    customScript() {
      const _this = this;
      this.interceptAppendChild(function (args) {
        if (args[0]?.style?.zIndex.match(/68015990|999999/)) {
          _this.logDebug("Blocked stupid thing");
          return;
        }
        _this.origAppendChild.apply(this, arguments);
      });
      // Styling
      this.$("body").classList.remove("white");
      this.$("body").classList.add("dark");
      const setStyleSheet = (url) => {
        const stylesheet = document.getElementById("stylesheet");
        stylesheet.setAttribute("href", url);
      };
      this.window?.["setStyleSheet"]?.(
        "https://douploads.net/doup1/assets/styles/dark.min.css"
      );

      // Error Checks
      if (
        /proxy not allowed/gi.test(
          this.$("center div.alert.alert-danger")?.textContent
        )
      ) {
        this.log("Site does not like your IP address, stopping script");
        return;
      }

      // Automation
      this.$("button[name='method_free']")?.click();

      this.waitUntilSelector("button#downloadbtn").then((dl_btn) => {
        dl_btn.removeAttribute("style");
      });
      this.waitUntilSelector("html > div").then((div) => {
        div.remove();
      });
      this.waitUntilSelector(".it-client").then((div) => {
        div.remove();
      });
      this.waitUntilSelector(
        "div.container.page.downloadPage .col-md-4 a"
      ).then((div) => {
        // trick to remove anonymous event listeners (malicious)
        // https://stackoverflow.com/a/32809957
        document.body.outerHTML = document.body.outerHTML;
      });
      this.waitUntilGlobalVariable("grecaptcha").then(
        () => this.addGoogleRecaptchaListener(document.forms.F1, 10)
        // this.addGoogleRecaptchaListener(document.forms.F1, +this.$(".seconds").innerText || 10);
      );
      this.ifElementExists(
        "body > div.container.pt-5.page.downloadPage > div > div.col-md-4.mt-5",
        (query) => this.$(query)?.classList.replace("col-md-4", "col-12")
      );
      this.ifElementExists(
        ".container.pt-5.page.downloadPage > .row .col-md-4.mt-5.text-center",
        (query) => this.$(query)?.classList.replace("col-md-4", "col-12")
      );
    },
  },
  upfiles: {
    host: ["upfiles.io", "upfiles.com"],
    customStyle: `html,body{background:#121212!important;color:#dfdfdf!important}#container{background:#121212!important}.download_box{background-color:#323232!important}.bg-white{background:#121212!important}`,
    downloadPageCheckBySelector: [
      "button#method_free",
      "button#downloadbtn",
      "div a.btn-download.get-link",
    ],
    downloadPageCheckByRegex: [
      /Download: /gi,
      /Your download link is almost ready/gi,
      /Enter code below/gi,
    ],
    remove: [
      "header",
      "div.spacer",
      "section.page-title",
      "#ad-banner",
      "#cookie-bar",
      "footer",
      "section.faqs",
      "*[id^=ad]",
      "div.divider",
      "iframe:not([src*='recaptcha'])",
      // "iframe[class][scrolling][sandbox]",
      "body > div.container",
    ],
    removeByRegex: [["body > div.container", /what is the/gi]],
    hideElements: undefined,
    removeIFrames: true,
    removeDisabledAttr: true,
    destroyWindowFunctions: [
      "k",
      "_t8h29e4ata9",
      "nd3z8ipji6k",
      "zfgformats",
      "setImmediate",
      "clearImmediate",
      "_cuohar",
      "_bvvxjxb",
      "adsbygoogle",
      "e",
      "webpackChunk",
      "uidEvent",
      "__core-js_shared__",
      "Dropzone",
      "onloadRecaptchaCallback",
      "onloadHCaptchaCallback",
      // "onbeforeunload",
      "gtag",
      "dataLayer",
      "a",
      "google_tag_manager",
      "closure_lm_725321",
      "google_tag_data",
      "GoogleAnalyticsObject",
      "ga",
      "gaplugins",
      "gaGlobal",
      "gaData",
      "google_js_reporting_queue",
      "google_srt",
      "google_logging_queue",
      "google_ad_modifications",
      "ggeac",
      "google_measure_js_timing",
      "google_reactive_ads_global_state",
      "_gfp_a_",
      "google_sa_queue",
      "google_sl_win",
      "google_process_slots",
      "google_user_agent_client_hint",
      "Goog_AdSense_getAdAdapterInstance",
      "Goog_AdSense_OsdAdapter",
      "google_sa_impl",
      "onClickTrigger",
      "kkp4a5x5tv",
      "zfgloadedpopup",
      "ppuWasShownFor4299398",
      "blurred",
      "LAST_CORRECT_EVENT_TIME",
      "_3793154468",
      "_3036952004",
      "iinf",
      "1bgbb027-3b87-ae67-26ar-hz150f600z16",
      "_0xa5ec",
      "_0x4b20",
      "_0x42f0b5",
      "mm",
      "LieDetector",
      "AaDetector",
      "placementKey",
      "rp",
      "app_vars",
      "_0xa6ab",
      "_0x41de",
    ],
    finalDownloadElementSelector: [
      ["div a.btn-download.get-link[href^='http']"],
    ],
    addHoverAbility: [
      ["form button[type='submit']:not(#invisibleCaptchaShortlink)", false],
      ["form button#invisibleCaptchaShortlink", true],
    ],
    addInfoBanner: [["form.text-center", "beforeend"]],
    createCountdown: "#timer.timer",
    customScript() {
      this.window.onbeforeunload = function () {};
      this.waitUntilSelector("div#captchaDownload").then(
        (captchaDownloadContainer) => {
          this.createGoogleRecaptcha(
            captchaDownloadContainer,
            "6LcsK9kaAAAAABe3I5PTS2zqmeKl3XueBrKNk3-Z"
          );
        }
      );
      this.waitUntilSelector("form#go-link").then(async (form) => {
        const url = form.action;
        const body = {};
        form.querySelectorAll("input").forEach((e) => (body[e.name] = e.value));
        await this.sleep(10 * 1000);
        await fetch(url, {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "x-requested-with": "XMLHttpRequest",
          },
          referrerPolicy: "strict-origin-when-cross-origin",
          body: new URLSearchParams(body).toString(),
          method: "POST",
          mode: "cors",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            const btn = this.$("a.get-link");
            btn.href = data.url;
            btn.classList.remove("disabled");
            btn.innerText = "Download";
          });
      });
      /*
      This was needed before destroyWindowFunctions to stop the ads, but not anymore.
      Keeping it just in case.
      */
      // this.waitUntilSelector("iframe[class][scrolling][sandbox]").then((ele) =>
      //   ele.remove()
      // );

      // // stop script from adding malicious redirects over top of google recaptcha
      // const appChild = document.body.appendChild;
      // document.body.appendChild = function (x) {
      //   // stupid overlay has hard-coded z-index of 2147483647
      //   if (x?.style.zIndex == "2147483647") {
      //     return;
      //   }
      //   appChild.apply(this, arguments);
      // };

      // page 1
      this.$("section.form-main.file-main form:not([id])")?.submit();

      // page 2
      // if (!this.$("#captchaDownload")) {
      //   this.$("#invisibleCaptchaShortlink")?.click();
      // } else {
      //   this.waitUntilGlobalVariable("grecaptcha").then(() =>
      //     googleRecaptchaListener(document.forms?.["file-captcha"])
      //   );
      // }
      this.waitUntilGlobalVariable("grecaptcha").then(() =>
        this.addGoogleRecaptchaListener(document.forms?.["file-captcha"])
      );
    },
  },
};

for (const site in siteRules) {
  const currSiteRules = siteRules[site];
  if (
    currSiteRules.host.some((urlMatch) => {
      if (urlMatch instanceof RegExp) {
        return Boolean(document.domain.match(urlMatch));
      } else {
        return document.domain.includes(urlMatch);
      }
    })
  ) {
    // const specialName =
    //   "SS" + Math.floor(Math.random() * 982451653).toString(36);
    // oSiteScrubber = window[specialName] = new SiteScrubber(currSiteRules);
    // oSiteScrubber.setup();
    window.Object.defineProperty(window, "siteScrubber", {
      enumerable: false,
      writable: false,
      configurable: false,
      value: new SiteScrubber(currSiteRules),
    });
    // window["siteScrubber"] = new SiteScrubber(currSiteRules);
    siteScrubber.setup();
    break;
    // const currSiteRules = siteRules[site];
    // this.logDebug(`Using site rules for site: ${site}`);
    // return this.setup();

    // this.addCustomCSSStyle(this.currSiteRules?.customStyle);
    // if (
    //   this.document.readyState === "complete" ||
    //   this.document.readyState === "interactive"
    // ) {
    //   this.applyRules();
    // } else {
    //   this.window.addEventListener("DOMContentLoaded", () => {
    //     this.applyRules();
    //   });
    // }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
