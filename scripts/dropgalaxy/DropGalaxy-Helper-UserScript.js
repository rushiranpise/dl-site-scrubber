// ==UserScript==
// @name         DropGalaxy-Helper-UserScript
// @namespace    SiteScrubber
// @version      1.0.7
// @description  Scrub site of ugliness and ease the process of downloading from multiple sites!
// @author       PrimePlaya24
// @license      GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// @homepageURL  https://github.com/PrimePlaya24/dl-site-scrubber
// @supportURL   https://github.com/PrimePlaya24/dl-site-scrubber/issues
// @include      /^(?:https?:\/\/)?(?:www\.)?dropgalaxy\.(in|com)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?financemonk\.net\//
// @include      /^(?:https?:\/\/)?(?:www\.)?tech(ssting|yneed)\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?file-up(load)?\.(com|org)\//
// @run-at       document-start
// @grant        none
// ==/UserScript==

class SiteScrubber {
  constructor(rules) {
    this.o_debug = true;
    this.ssButtonWatchDog = true;

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
    this.origClearInterval = window.clearInterval.bind(window);
    this.origSetTimeout = window.setTimeout.bind(window);
    this.origClearTimeout = window.clearTimeout.bind(window);

    this.countdownSecondsLeft = 0;

    this._buttons = [];
    this._intervals = {};
    this._listeners = [];
    this._timeouts = {};

    this.currSiteRules = rules;
    // this.siteRules = siteRules;
    // this.addCustomCSSStyle(this.siteRules.customStyle);
  }
  setup() {
    this.logDebug("Initializing SiteScrubber...");

    this.destroyWindowFunctions(this.currSiteRules?.destroyWindowFunctions);
    this.addCustomCSSStyle(
      `.ss-btn{display:inline-block!important;padding:24px 32px!important;border:unset!important;color:#dfdfdf!important;background:#9d0000!important;text-transform:uppercase!important;font-size:24px!important;letter-spacing:.15em!important;transition:all .1s!important;position:relative!important;overflow:hidden!important;z-index:1!important}.ss-w-100{width:100%!important}.ss-btn-ready:after{content:"";position:absolute;bottom:0;left:0;width:100%;height:100%;background-color:#109d00;transition:all .1s;z-index:-2}.ss-btn-ready:before{content:"";position:absolute;bottom:0;left:0;width:0%;height:100%;background-color:#1a0;transition:all .1s linear;z-index:-1}.ss-btn-ready:hover:before{width:100%;transition:all 2s linear}.ss-btn:active{transform:scale(.975)!important}.ss-btn:focus{outline:0!important}`
    );
    this.addCustomCSSStyle(
      `.ss-alert-warning{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.ss-alert{width:100%;padding:15px;margin-bottom:20px;border:1px solid transparent;border-radius:4px}.ss-col-md-12{width:100%}.ss-mt-5{margin-top:5em}.ss-text-center{text-align:center}`
    );
    if (this.ssButtonWatchDog === true) {
      // Ready, so click/submit
      this.waitUntilSelector(".ss-btn-ready").then((ssBtn) => {
        return this.log("WOULD'VE CLICKED ss-btn");
        ssBtn.click();
      });
    }
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
  ifElementExists(query, fn = () => void 0) {
    return this.$(query) && fn(this.$(query));
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
    this.logDebug(`Waiting for selector: ${query}`);
    while (!this.$(query)) {
      // if not found, wait and check again in 500 milliseconds
      await new Promise((r) => this.origSetTimeout(r, 500));
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
    let curr = window;
    while (curr == window || curr == undefined) {
      curr = window;
      for (const k of variableNames) {
        if (curr == undefined) break;
        curr = curr?.[k];
      }
      // if not found, wait and check again in 500 milliseconds
      await new Promise((r) => this.origSetTimeout(r, 500));
    }
    this.logDebug(`Found global variable: window.${variableNames.join(".")}`);
    return new Promise((resolve) => {
      // resolve/return the found element
      resolve(curr);
    });
  }
  // not needed?
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
        // this.$$(e).forEach((ele) => (ele.style.display = "none"));
      } else if (e instanceof HTMLElement) {
        // remove HTMLElement
        e.remove();
      }
    });
  }
  removeElementsByRegex({ query, regex }) {
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
  addInterval({ fn, interval, customID }) {
    let error = false;
    if ("function" !== typeof fn) {
      this.logDebug("addInterval() - Bad function input");
      error = true;
    } else if ("number" !== typeof interval) {
      this.logDebug("addInterval() - Bad interval input");
      error = true;
    } else if ("string" !== typeof customID) {
      this.logDebug("addInterval() - Bad customID input");
      error = true;
    }
    if (error) {
      this.logDebugNaked(arguments);
      return;
    }
    const id = this.origSetInterval(fn, interval);
    this._intervals[customID || id] = {
      fn: fn.toString(),
      interval: interval,
      id: id,
      customID: customID,
    };
    return id;
  }
  removeInterval(id) {
    const interval = this._intervals[id]["id"];
    if (interval) {
      delete this._intervals[id];
      return this.origClearInterval(interval);
    } else {
      this.logDebug(
        `removeInterval() - Failed to remove interval with ID: ${id}`
      );
    }
  }
  addTimeout({ fn, timeout, customID }) {
    let error = false;
    if ("function" !== typeof fn) {
      this.logDebug("addTimeout() - Bad function input");
      error = true;
    } else if ("number" !== typeof timeout) {
      this.logDebug("addTimeout() - Bad timeout input");
      error = true;
    } else if ("string" !== typeof customID || !(customID instanceof String)) {
      this.logDebug("addTimeout() - Bad customID input");
      error = true;
    }
    if (error) {
      this.logDebugNaked(arguments);
      return;
    }
    const id = this.origSetTimeout(fn, timeout);
    this._timeouts[customID || id] = {
      fn: fn.toString(),
      timeout: timeout,
      id: id,
      customID: customID,
    };
    return customID || id;
  }
  removeTimeout(id) {
    const timeout = this._timeouts[id]["id"];
    if (timeout) {
      delete this._timeouts[id];
      return this.origClearTimeout(timeout);
    } else {
      this.logDebug(
        `removeTimeout() - Failed to remove timeout with ID: ${id}`
      );
    }
  }
  addListener({ element, event, listener, options }) {
    let error = false;
    if ("string" !== typeof event) {
      this.logDebug("addListener() - Bad event input");
      error = true;
    } else if ("function" !== typeof listener) {
      this.logDebug("addListener() - Bad listener input");
      error = true;
    }
    if (error) {
      this.logDebugNaked(arguments[0]);
      return;
    }
    const el = element;
    if (!el?.trackedEvents) {
      el.trackedEvents = {};
    }
    if (!el.trackedEvents[event]) {
      el.trackedEvents[event] = listener;
    } else if (el.trackedEvents[event].toString() == listener.toString()) {
      this.logDebug(`addListener() - event '${event}' already added`);
      this.logDebugNaked(arguments[0]);
      return;
    }
    this._listeners.push(arguments[0]);
    return this.origAddEventListener.bind(el)(
      event,
      listener,
      options || false
    );
  }
  removeListener({ element, event }) {
    if (!element?.trackedEvents) {
      this.logDebug("removeListener() - No events found");
      return;
    }
    const el = element;
    const listener = el.trackedEvents[event];
    delete el.trackedEvents[event];
    const removeObj = this._listeners.find(
      (x) => x.element == el && x.listener == listener
    );
    this._listeners = this._listeners.filter((x) => x != removeObj);
    return el.removeEventListener(event, listener);
  }
  // not needed?
  async addCaptchaListener(formElement, timer = 0) {
    const form = this.getDOMElement(formElement);
    if (form === null) {
      this.log("No Google Captcha found...");
      this.logDebug("addCaptchaListener() - failed to find element");
      return;
    } else {
      this.log("Form selected!");
    }

    // const buttonStatusInterval = this.addInterval({
    //   fn: () => {
    //     if (this.window.grecaptcha?.getResponse?.()) {
    //       this._buttons.forEach((button) => {
    //         button.classList.add("ss-ready");
    //         // button.classList.remove("ss-incomplete");
    //       });
    //     } else {
    //       this._buttons.forEach((button) => {
    //         // button.classList.add("ss-incomplete");
    //         button.classList.remove("ss-ready");
    //       });
    //     }
    //   },
    //   interval: 100,
    //   customID: "ss-button-checker",
    // });

    return new Promise((res, rej) => {
      // save current date
      const then = new Date();
      let counter = 0;
      const INTERVAL = 250;
      // interval to check every 250 milliseconds if ReCAPTCHA
      // has been completed, then the form gets submitted
      const checker = this.addInterval({
        fn: () => {
          if (
            (window.grecaptcha?.getResponse?.() ||
              window.hcaptcha?.getResponse?.()) &&
            Math.floor((new Date() - then) / 1000) > timer
          ) {
            // stop interval from continuing
            // clearInterval(checker);
            this.removeInterval("RecaptchaListenerInterval");
            formElement.submit();
            res();
          } else {
            counter++;
          }
          if (counter >= 7200) {
            // stop interval and give up checking
            // clearInterval(checker);
            this.removeInterval("RecaptchaListenerInterval");
            res();
          }
        },
        interval: INTERVAL,
        customID: "RecaptchaListenerInterval",
      });
    });
  }
  addGoogleRecaptchaJS() {
    const script = this.document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    this.document.body.appendChild(script);
  }
  async createGoogleRecaptcha(elementTarget, site_key, position = "beforeend") {
    const target = this.getDOMElement(elementTarget);
    if (target === null) {
      this.logDebug("createGoogleRecaptcha - failed to find element");
      return;
    }
    this.logDebug("createGoogleRecaptcha() - element to add under");
    this.logDebugNaked(target);
    this.addGoogleRecaptchaJS();
    this.waitUntilGlobalVariable("grecaptcha").then(() => {
      target.insertAdjacentHTML(
        position,
        `<div id="ss-recaptcha" data-sitekey="${site_key}" data-starttime="${+new Date()}"></div>`
      );
      grecaptcha.render("ss-recaptcha", {
        sitekey: site_key,
      });
    });
  }
  modifyGoogleRecaptcha(timer = 0, cb) {
    const grecaptchaElem = this.$(".g-recaptcha");
    const site_key = grecaptchaElem?.getAttribute("data-sitekey");
    grecaptchaElem.innerHTML = `<div id="ss-recaptcha" data-sitekey="${site_key}" data-starttime="${+new Date()}"></div>`;
    grecaptcha.render("ss-recaptcha", {
      sitekey: site_key,
      callback:
        cb ||
        function () {
          const form = siteScrubber.findParentElementByTagName(
            siteScrubber.$("#ss-recaptcha"),
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
  hideElementsByDisplay(elements = []) {
    if (elements.length === 0) {
      return;
    }
    this.log("Running hideElementsByDisplay");
    if (this.isQueryString(elements)) {
      elements = [elements];
    }
    [...elements].forEach((e) => {
      if (this.isQueryString(e)) {
        this.$$(e).forEach((ele) => (ele.style.display = "none"));
      } else if (this.isElement(e)) {
        e.style.display = "none";
      }
    });
    this.logDebug(`Elements hidden: ${elements}`);
  }
  hideElementsByVisibility(elements = []) {
    if (elements.length === 0) {
      return;
    }
    this.log("Running hideElementsByVisibility");
    if (this.isQueryString(elements)) {
      elements = [elements];
    }
    [...elements].forEach((e) => {
      if (this.isQueryString(e)) {
        this.$$(e).forEach((ele) => (ele.style.visibility = "hidden"));
      } else if (this.isElement(e)) {
        e.style.visibility = "hidden";
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
  isElement(element) {
    return element instanceof Element;
  }
  isQueryString(query) {
    return (
      !this.isElement(query) &&
      (typeof query == "string" || query instanceof String)
    );
  }
  isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }
  getDOMElement(request) {
    if (this.isElement(request)) {
      return request;
    } else if (this.isQueryString(request)) {
      return this.$(request);
    }
    return null;
  }
  addHoverAbility(element, requireCaptcha = false) {
    if (!element) {
      return;
    }
    const addEvent = (element) => {
      let fn = () => {};
      if (requireCaptcha) {
        fn = () => {
          element.dataset.timeout = this.origSetTimeout(() => {
            if (
              this.countdownSecondsLeft === 0 &&
              window.grecaptcha?.getResponse?.()
            ) {
              element.click();
            }
          }, 2000);
        };
      } else {
        fn = () => {
          element.dataset.timeout = this.origSetTimeout(() => {
            if (this.countdownSecondsLeft === 0) {
              element.click();
            }
          }, 2000);
        };
      }
      // this.origAddEventListener.bind(element)("mouseenter", fn, false);
      this.addListener({
        element: element,
        event: "mouseenter",
        listener: fn,
        options: false,
      });
      this.logDebug(`Added 'mouseenter' event to ${element.innerHTML}`);
      // this.origAddEventListener.bind(element)(
      //   "mouseleave",
      //   () => {
      //     clearTimeout(element.dataset.timeout);
      //   },
      //   false
      // );
      this.addListener({
        element: element,
        event: "mouseleave",
        listener: () => {
          clearTimeout(element.dataset.timeout);
        },
        options: false,
      });
      this.logDebug(`Added 'mouseleave' event to ${element.innerHTML}`);
    };
    // if (typeof element == "string" || element instanceof String) {
    //   element = [element];
    // }
    if (!Array.isArray(element)) {
      element = [element];
    }
    [...element].forEach((e) => {
      if (typeof e == "string" || e instanceof String) {
        this.$$(e).forEach(addEvent);
      } else if (e instanceof HTMLElement) {
        addEvent(e);
      }
    });
  }
  addInfoBanner({ targetElement, where = "beforeend" }) {
    if (targetElement instanceof HTMLElement) {
      // Already an HTMLElement
    } else if (
      typeof targetElement == "string" ||
      targetElement instanceof String
    ) {
      targetElement = this.$(targetElement);
    }
    if (!targetElement) {
      return;
    }
    this.logDebug("Adding SiteScrubber hover info banner");

    const newNode = `<div class="ss-alert ss-alert-warning ss-mt-5 ss-text-center">TO PREVENT MALICIOUS REDIRECT, <b>HOVER</b> OVER THE BUTTON FOR 2 SECONDS TO SUBMIT CLEANLY</div>`;
    targetElement.insertAdjacentHTML(where, newNode);
    this.logDebug(
      `addInfoBanner() - elementToAddTo: ${targetElement}, ${where}`
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
      "$$",
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
        // this.logDebug(`Destoyed window function: 'window.${option}'`);
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
  createCountdown({ element, timer }) {
    let el = this.getDOMElement(element);
    if (!this.isElement(el)) {
      this.logDebug("createCountdown - failed to find element");
      this.logDebugNaked(arguments);
      return;
      el = this.document.createElement("i");
    } else if (timer) {
      el.innerText = timer;
    } else {
      timer = +el?.innerText || 30;
    }

    this.logDebug("createCountdown - found element, creating timer");
    this.countdownSecondsLeft = timer;

    const tick = () => {
      const remaining = --this.countdownSecondsLeft;
      const ele = this.getDOMElement(el) || this.document.createElement("i");
      ele.innerText = remaining;
      if (remaining <= 0) {
        this.removeInterval("countdown-interval");
      } else {
        this.logDebug(`Tick: ${remaining}`);
      }
    };
    this.addInterval({
      fn: tick,
      interval: 1000,
      customID: "countdown-interval",
    });
  }
  tick(element) {
    const remaining = --this.countdownSecondsLeft;
    const el = this.getDOMElement(element) || this.document.createElement("i");
    el.innerText = remaining;
    if (remaining <= 0) {
      this.removeInterval("countdown-interval");
    } else {
      this.logDebug(`Tick: ${remaining}`);
    }
  }
  copyAttributesFromElement(sourceElement, targetElement) {
    if (
      sourceElement instanceof HTMLElement &&
      targetElement instanceof HTMLElement
    ) {
      [...sourceElement.attributes].forEach((attr) => {
        targetElement.setAttribute(attr.nodeName, attr.nodeValue);
      });
    } else {
      this.log(
        "copyAttributesFromElement() - failed to copy attributes with given elements"
      );
      this.logDebugNaked(sourceElement);
      this.logDebugNaked(targetElement);
    }
  }
  modifyButton(
    button,
    {
      disabled = false,
      replaceWithForm = false,
      replaceWithTag,
      copyAttributesFromElement,
      customText,
      className,
      href,
      props,
      styles,
      attributes,
      eventHandlers,
      makeListener,
      requiresCaptcha,
      requiresTimer,
      addHoverAbility,
      moveTo = {
        target: undefined,
        position: undefined,
        findParentByTag: undefined,
      },
      fn = () => {},
    } = {}
  ) {
    button = this.getDOMElement(button);

    if (null === button) {
      this.logDebug("modifyButton - failed to find element");
      return;
    }

    // Custom function (if needed) to modify button by hand
    fn(button);

    // Check and alert user of mixed content error
    if (button.tagName === "A") {
      const dl_link = button.href;
      if (
        this.window.location.href.match(/^https:/i) &&
        !dl_link.match(/^https:/i)
      ) {
        // https://blog.chromium.org/2020/02/protecting-users-from-insecure.html
        this.document.body.insertAdjacentHTML(
          "afterbegin",
          `<p class='ss-alert ss-alert-warning ss-text-center'>This file should be served over HTTPS. This download has been blocked. See <a href='https://blog.chromium.org/2020/02/protecting-users-from-insecure.html'>https://blog.chromium.org/2020/02/protecting-users-from-insecure.html</a> for more details.</p>`
        );
      }
    }

    if (replaceWithForm === true) {
      const safeFormOptions = {
        actionURL: button.href || href || "",
        method: "GET",
      };
      // if (button.tagName === "A") {
      //   safeFormOptions.actionURL = button.href || href || "";
      // } else {
      //   safeFormOptions = {
      //     actionURL: href || "",
      //   }
      // }
      const form = this.makeSafeForm(safeFormOptions);
      button.parentElement.replaceChild(form, button);
      button = form.querySelector(".ss-btn");
    } else if (replaceWithTag && typeof replaceWithTag === "string") {
      const customTag = this.document.createElement(replaceWithTag);
      if (this.isElement(copyAttributesFromElement)) {
        this.copyAttributesFromElement(copyAttributesFromElement, customTag);
      } else {
        this.copyAttributesFromElement(button, customTag);
      }
      button.parentElement.replaceChild(customTag, button);
      button = customTag;
    }

    this._buttons.push(button);

    if (customText) {
      button.innerHTML = customText;
    }
    button.className = className || "ss-btn ss-w-100";
    for (const key in props) {
      button[key] = props[key];
    }
    for (const key in styles) {
      button.style[key] = styles[key];
    }
    for (const key in attributes) {
      button.setAttribute(key, attributes[key]);
    }
    for (const key in eventHandlers) {
      button.addEventListener(key, eventHandlers[key]);
    }

    if (makeListener === true) {
      let fn = () => {};
      if (requiresCaptcha === true) {
        fn = () => {
          if (
            this.countdownSecondsLeft === 0 &&
            (window.grecaptcha?.getResponse?.() ||
              window.hcaptcha?.getResponse?.())
          ) {
            button.classList.add("ss-btn-ready");
          } else {
            button.classList.remove("ss-btn-ready");
          }
        };
      } else {
        fn = () => {
          if (this.countdownSecondsLeft === 0) {
            button.classList.add("ss-btn-ready");
          } else {
            button.classList.remove("ss-btn-ready");
          }
        };
      }
      this.addInterval({
        fn: fn,
        interval: 100,
        customID: "ss-btn-ready-listner",
      });
    }
    if (addHoverAbility !== false) {
      if (!requiresCaptcha && !requiresTimer) {
        button.classList.add("ss-btn-ready");
      }
      this.addHoverAbility(button, !!requiresCaptcha);
    }
    /**
     * target
     * position
     * findParentByTag
     */
    if (moveTo.target && moveTo.position) {
      let el = this.getDOMElement(moveTo.target);
      const pos = moveTo.position;
      const findParentByTag = moveTo.findParentByTag;

      if (null === el) {
        this.logDebug("modifyButton.moveTo - failed to find element");
      } else {
        let target = el;
        if (findParentByTag) {
          target = this.findParentElementByTagName(el, findParentByTag);
        }
        button.remove();
        target.insertAdjacentElement(pos, button);
      }
    }
    if (disabled !== true) {
      button.disabled = false;
    }
    return button;
  }
  makeSafeForm({ actionURL, method = "GET", target = "_blank" }) {
    const form = this.document.createElement("form");
    form.action = actionURL;
    form.method = method;
    form.target = target;

    const submitBtn = this.document.createElement("button");
    submitBtn.type = "submit";
    this.modifyButton(submitBtn, { customText: "Start Download" });
    form.appendChild(submitBtn);
    return form;
  }
  applyRules() {
    console.time("ss");
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
      this.log(`Created countdown`);
      this.logDebugNaked(this.currSiteRules?.createCountdown);
    }
    this.removeElements(this.currSiteRules?.remove);
    // this.plug("Removed Elements");
    // this.currSiteRules?.removeByRegex?.forEach(([selector, regex]) =>
    //   this.removeElementsByRegex(selector, regex)
    // );
    this.currSiteRules?.removeByRegex?.forEach((removeByRegexOptions) =>
      this.removeElementsByRegex(removeByRegexOptions)
    );
    this.log("Removed elements");
    // this.plug("Removed Elements By Regex");

    //////////////
    this.hideElementsByDisplay(this.currSiteRules?.hideElementsByDisplay);
    // this.log("Hid elements");
    //////////////

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
      ([elements, requiresCaptcha]) =>
        this.addHoverAbility(elements, requiresCaptcha)
    );
    // this.currSiteRules?.addInfoBanner?.forEach(([element, where]) =>
    //   this.addInfoBanner(element, where)
    // );
    this.currSiteRules?.addInfoBanner?.forEach((addInfoBannerOptions) =>
      this.addInfoBanner(addInfoBannerOptions)
    );
    if (this.currSiteRules?.modifyButtons) {
      this.currSiteRules?.modifyButtons?.forEach(([button, options]) => {
        this.modifyButton(button, options);
      });
    }
    this.log("Running site's custom made script");
    this.currSiteRules?.customScript?.bind(this)?.();
  }
}

const siteRules = {
  dropgalaxy: {
    host: [
      "dropgalaxy.com",
      "dropgalaxy.in",
      "techssting.com",
      "techyneed.com",
      "financemonk.net",
    ],
    customStyle: `html,body,#container,.bg-white{background:#121212!important;color:#dfdfdf!important}.download_box,.fileInfo{background-color:#323232!important}ins,#badip,#vi-smartbanner,.adsBox,vli,div[style*='2147483650'],#modalpop,#overlaypop{display:none!important}body{padding-bottom:unset!important}`, // body > div:not([class])
    downloadPageCheckBySelector: ["button[name='method_free']", "a#dl"],
    downloadPageCheckByRegex: [
      /Click here to download/gi,
      /This direct link will be available for/gi,
      /Create download link/gi,
    ],
    // remove: [
    //   "nav",
    //   "footer",
    //   ".sharetabs ul",
    //   "#load img",
    //   "ul#article",
    //   "br",
    //   "button[name='method_premium']",
    //   ".adsBox",
    //   "#vi-smartbanner",
    // ],
    // removeByRegex: [
    //   { query: ".download_method", regex: /fast download/gi },
    //   { query: ".row.pt-4.pb-5", regex: /307200/gi },
    //   { query: "ul", regex: /What is DropGalaxy?/gi },
    //   { query: "div.mt-5.text-center", regex: /ad-free/gi },
    // ],
    // removeIFrames: true,
    // removeDisabledAttr: true,
    // destroyWindowFunctions: [
    //   "__CF$cv$params",
    //   "absda",
    //   "adsbygoogle",
    //   "_0xab85",
    //   "_0x4830",
    //   "_0x1d5c98",
    //   "_0x20de87",
    //   "_0x3b510c",
    //   "_0x23aaed",
    //   "_0x71ffdf",
    //   "_0x16b49f",
    //   "_0x167e3f",
    //   "_0x695d81",
    //   "_0x3fa68e",
    //   "isDesktop",
    //   "ip",
    //   "AaDetector",
    //   "LieDetector",
    //   "__cfBeacon",
    //   "removeURLParameter",
    //   "getParameterByName",
    //   "updateQueryStringParameter",
    //   "setPagination",
    //   "colortheme",
    //   "color",
    //   "LAST_CORRECT_EVENT_TIME",
    //   "_603968549",
    //   "_1714636353",
    //   "F5NN",
    //   "I833",
    //   "DEBUG_MODE",
    //   "ENABLE_LOGS",
    //   "ENABLE_ONLINE_DEBUGGER",
    //   "SUPPORT_IE8",
    //   "MOBILE_VERSION",
    //   "EXTERNAL_POLYFILL",
    //   "SEND_PIXELS",
    //   "IS_POP_COIN",
    //   "PIXEL_LOG_LEVEL_INFO",
    //   "PIXEL_LOG_LEVEL_DEBUG",
    //   "PIXEL_LOG_LEVEL_WARNING",
    //   "PIXEL_LOG_LEVEL_ERROR",
    //   "PIXEL_LOG_LEVEL_METRICS",
    //   "p5NN",
    //   "S5NN",
    //   "L5NN",
    //   "_392594680",
    //   "_pop",
    //   "_0x16f7",
    //   "_0x2768",
    //   "_0x2f1ac4",
    //   "_0x4eaee9",
    //   "_0x51da65",
    //   "_0x4e2ddc",
    //   "_0x4cc079",
    //   "_0x5e084c",
    //   "vitag",
    //   "linksucess",
    //   // "go", // Page uses this function to navigate to disguised url
    //   "delComment",
    //   "player_start",
    //   "pplayer",
    //   "showFullScreen",
    //   "_0x2bb9",
    //   "_0x77be",
    //   "_0x8f9e7e",
    //   "_0x577d04",
    //   "_0x2237cb",
    //   "_0x11947",
    //   "_0x41b9e0",
    //   "_0x9a9b21",
    //   "_VLIOBJ",
    //   "fanfilnfjkdsabfhjdsbfkljsvmjhdfb",
    //   "iinf",
    //   "detectZoom",
    //   "iframe",
    //   "where",
    //   "win",
    //   "_pao",
    //   "regeneratorRuntime",
    //   "__core-js_shared__",
    //   "tagApi",
    //   "viAPItag",
    //   "observeElementInViewport",
    //   "jQuery19108284913344818186",
    //   "colors",
    //   "setStyleSheet",
    //   "changecolor",
    //   "ClipboardJS",
    //   "links",
    //   "vlipbChunk",
    //   "vlipb",
    //   "_pbjsGlobals",
    //   "nobidVersion",
    //   "nobid",
    //   "vlPlayer",
    //   "googletag",
    //   "ggeac",
    //   "google_js_reporting_queue",
    //   "$sf",
    //   "_google_rum_ns_",
    //   "google_persistent_state_async",
    //   "google_global_correlator",
    //   "google_srt",
    //   "mb",
    //   "Goog_AdSense_Lidar_sendVastEvent",
    //   "Goog_AdSense_Lidar_getViewability",
    //   "Goog_AdSense_Lidar_getUrlSignalsArray",
    //   "Goog_AdSense_Lidar_getUrlSignalsList",
    //   "module$contents$ima$CompanionAdSelectionSettings_CompanionAdSelectionSettings",
    //   "ima",
    //   "module$contents$ima$AdsRenderingSettings_AdsRenderingSettings",
    //   "module$contents$ima$AdCuePoints_AdCuePoints",
    //   "module$contents$ima$AdError_AdError",
    //   "module$contents$ima$AdErrorEvent_AdErrorEvent",
    //   "module$contents$ima$AdEvent_AdEvent",
    //   "module$contents$ima$AdsManagerLoadedEvent_AdsManagerLoadedEvent",
    //   "google",
    //   "$jscomp",
    //   "$jscomp$lookupPolyfilledValue",
    //   "AdscoreInit",
    //   "pako",
    //   "txt",
    //   "Goog_AdSense_getAdAdapterInstance",
    //   "Goog_AdSense_OsdAdapter",
    //   "google_measure_js_timing",
    //   "goog_pvsid",
    //   "timeout",
    //   "a",
    //   "refS",
    // ],
    // addInfoBanner: [
    //   {
    //     targetElement: ".container.page.downloadPage .row",
    //     where: "beforeend",
    //   },
    // ],
    // modifyButtons: [
    //   ["button[name='method_free']"],
    //   [
    //     "button#downloadBtnClick",
    //     {
    //       makeListener: true,
    //       requiresTimer: true,
    //       props: { onclick: "", style: "" },
    //     },
    //   ],
    //   // [
    //   //   "div.container.page.downloadPage > div > div.col-md-4 > a",
    //   //   {
    //   //     replaceWithForm: true,
    //   //     props: { onclick: "", style: "" },
    //   //   },
    //   // ],
    //   [
    //     "button#dl",
    //     {
    //       props: { onclick: "", style: "" },
    //     },
    //   ],
    // ],
    // createCountdown: { timer: 10, element: ".seconds" },
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

      // if (this.$("#xd")) {
      //   this.$("#downloadhash")?.setAttribute("value", "0");
      //   this.$("#dropgalaxyisbest")?.setAttribute("value", "0");
      //   this.$("#adblock_check")?.setAttribute("value", "0");
      //   this.$("#adblock_detected")?.setAttribute("value", "1");
      //   this.$("#admaven_popup")?.setAttribute("value", "1");
      // }

      const overallEncoder = (str) => {
        let buf = new ArrayBuffer(str.length * 2);
        let bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        encoded_string = buf;

        // var encoded_string = encoder(coded_string);
        const uint8array_of_encoded_string = new Uint8Array(encoded_string);
        const encoded_message = uint8array_of_encoded_string
          .toString()
          .replace(/2|3|7|,0,0,0/g, (res) => {
            return { 2: "004", 3: "005", 7: "007", ",0,0,0": "" }[res];
          });
        return encoded_message;
      };

      const usr = [...this.$$("body > script")]
        .find((e) => e.innerHTML.match(/despacito/))
        ?.innerHTML?.match(/(\[usr=[^\]]+\])/g)?.[0];
      const adChecks = `[scr=https://static.cloudflareinsights.com/beacon.min.js][scr=https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js][scr=/cdn-cgi/challenge-platform/h/g/scripts/invisible.js][scr=//housewifehaunted.com/4f/b9/d6/4fb9d6755e5818e2fb1ce2f1b6bbd2a5.js][scr=https://tmp.dropgalaxy.in/adspopup.js][scr=https://tmp.dropgalaxy.in/adddds.js?v=1.0]<ins class="adsbygoogle adsbygoogle-noablate" data-adsbygoogle-status="done" style="display: none !important;" data-ad-status="unfilled"><ins id="aswift_0_expand" tabindex="0" title="Advertisement" aria-label="Advertisement" style="border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: inline-table;"><ins id="aswift_0_anchor" style="border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: block;"><iframe id="aswift_0" name="aswift_0" style="left:0;position:absolute;top:0;border:0;width:undefinedpx;height:undefinedpx;" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" frameborder="0" src="https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-6572127804953403&amp;output=html&amp;adk=1812271804&amp;adf=3025194257&amp;lmt=1632852274&amp;plat=1%3A16777216%2C2%3A16777216%2C3%3A32%2C4%3A32%2C9%3A32776%2C16%3A8388608%2C17%3A32%2C24%3A32%2C25%3A32%2C30%3A1081344%2C32%3A32&amp;format=0x0&amp;url=https%3A%2F%2Ffinancemonk.net%2F&amp;ea=0&amp;flash=0&amp;pra=5&amp;wgl=1&amp;uach=WyJXaW5kb3dzIiwiMTAuMC4wIiwieDg2IiwiIiwiOTQuMC45OTIuMzEiLFtdLG51bGwsbnVsbCwiNjQiXQ..&amp;dt=1632852274664&amp;bpp=2&amp;bdt=3967&amp;idt=133&amp;shv=r20210922&amp;mjsv=m202109220101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;nras=1&amp;correlator=2805760161265&amp;frm=20&amp;pv=2&amp;ga_vid=1157668643.1632852275&amp;ga_sid=1632852275&amp;ga_hid=11092835&amp;ga_fc=0&amp;u_tz=-300&amp;u_his=6&amp;u_h=1080&amp;u_w=1920&amp;u_ah=1040&amp;u_aw=1920&amp;u_cd=24&amp;adx=-12245933&amp;ady=-12245933&amp;biw=1903&amp;bih=969&amp;scr_x=0&amp;scr_y=0&amp;eid=31062309%2C31062430%2C31062311&amp;oid=3&amp;pvsid=4370036607835633&amp;pem=719&amp;wsm=1&amp;ref=https%3A%2F%2Fwww.google.com%2F&amp;eae=2&amp;fc=1920&amp;brdim=-1920%2C122%2C-1920%2C122%2C1920%2C122%2C1920%2C1040%2C1920%2C969&amp;vis=1&amp;rsz=%7C%7Cs%7C&amp;abl=NS&amp;fu=32768&amp;bc=31&amp;ifi=1&amp;uci=a!1&amp;fsb=1&amp;dtd=152" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" data-google-container-id="a!1" data-load-complete="true"></iframe></ins></ins></ins>[scr=https://www.googletagservices.com/activeview/js/current/osd.js][scr=https://partner.googleadservices.com/gampad/cookie.js?domain=financemonk.net&callback=_gfp_s_&client=ca-pub-6572127804953403][scr=https://pagead2.googlesyndication.com/pagead/managed/js/adsense/m202109220101/show_ads_impl.js][scr=https://static.cloudflareinsights.com/beacon.min.js][scr=https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js][scr=/cdn-cgi/challenge-platform/h/b/scripts/invisible.js][scr=//salutationcheerlessdemote.com/sfp.js][scr=https://adservice.google.com/adsid/integrator.js?domain=financemonk.net][scr=//housewifehaunted.com/4f/b9/d6/4fb9d6755e5818e2fb1ce2f1b6bbd2a5.js][scr=https://tmp.dropgalaxy.in/adspopup.js][scr=https://tmp.dropgalaxy.in/adddds.js?v=1.0]`;

      const adChecks2 = `<ins class="adsbygoogle adsbygoogle-noablate" data-adsbygoogle-status="done" style="display: none !important;" data-ad-status="unfilled"><ins id="aswift_0_expand" tabindex="0" title="Advertisement" aria-label="Advertisement" style="border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: inline-table;"><ins id="aswift_0_anchor" style="border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: block;"><iframe id="aswift_0" name="aswift_0" style="left:0;position:absolute;top:0;border:0;width:undefinedpx;height:undefinedpx;" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" frameborder="0" src="https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-6572127804953403&amp;output=html&amp;adk=1812271804&amp;adf=3025194257&amp;lmt=1633100775&amp;plat=2%3A16777216%2C3%3A32%2C4%3A32%2C16%3A8388608%2C17%3A32%2C24%3A32%2C25%3A32%2C32%3A32&amp;format=0x0&amp;url=https%3A%2F%2Ffinancemonk.net%2F&amp;ea=0&amp;flash=0&amp;pra=5&amp;wgl=1&amp;uach=WyJBbmRyb2lkIiwiMTAuMC4wIiwiIiwiU00tRzk2MFUxIiwiOTQuMC40NjA2LjU2IixbXSxudWxsLG51bGwsIiJd&amp;dt=1633100774994&amp;bpp=5&amp;bdt=218&amp;idt=26&amp;shv=r20210927&amp;mjsv=m202109240101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;cookie=ID%3D56b750e26beff53c-22055315dbca0007%3AT%3D1633096313%3ART%3D1633096313%3AS%3DALNI_Ma5q7Vv6dbrwy1vOYvLJ2E8WQeRlA&amp;nras=1&amp;correlator=5395437289419&amp;frm=20&amp;pv=2&amp;ga_vid=1679006587.1633100775&amp;ga_sid=1633100775&amp;ga_hid=781536601&amp;ga_fc=0&amp;u_tz=-300&amp;u_his=3&amp;u_h=740&amp;u_w=360&amp;u_ah=740&amp;u_aw=360&amp;u_cd=24&amp;u_java=0&amp;u_nplug=0&amp;u_nmime=0&amp;adx=-12245933&amp;ady=-12245933&amp;biw=360&amp;bih=660&amp;scr_x=0&amp;scr_y=0&amp;eid=31062937%2C31062311&amp;oid=3&amp;pvsid=4344667839301295&amp;pem=875&amp;ref=https%3A%2F%2Fwww.google.com%2F&amp;eae=2&amp;fc=1920&amp;brdim=0%2C0%2C0%2C0%2C360%2C0%2C360%2C660%2C360%2C660&amp;vis=1&amp;rsz=%7C%7Cs%7C&amp;abl=NS&amp;fu=32768&amp;bc=31&amp;ifi=1&amp;uci=a!1&amp;fsb=1&amp;dtd=50" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" data-google-container-id="a!1" data-load-complete="true"></iframe></ins></ins></ins><ins class="adsbygoogle adsbygoogle-noablate" style="display: none !important; width: 100vw !important; height: 100vh !important; inset: 0px auto auto 0px !important; clear: none !important; float: none !important; margin: 0px !important; max-height: none !important; max-width: none !important; opacity: 1 !important; overflow: visible !important; padding: 0px !important; position: fixed !important; vertical-align: baseline !important; visibility: visible !important; z-index: 2147483647 !important; background: transparent !important;" data-adsbygoogle-status="done" aria-hidden="true" data-ad-status="filled" data-vignette-loaded="true"><ins id="aswift_1_expand" tabindex="0" title="Advertisement" aria-label="Advertisement" style="border: none !important; height: 100vh !important; width: 100vw !important; margin: 0px !important; padding: 0px !important; position: relative !important; visibility: visible !important; background-color: transparent !important; display: inline-table !important; inset: auto !important; clear: none !important; float: none !important; max-height: none !important; max-width: none !important; opacity: 1 !important; overflow: visible !important; vertical-align: baseline !important; z-index: auto !important;"><ins id="aswift_1_anchor" style="border: none !important; height: 100vh !important; width: 100vw !important; margin: 0px !important; padding: 0px !important; position: relative !important; visibility: visible !important; background-color: transparent !important; display: block !important; inset: auto !important; clear: none !important; float: none !important; max-height: none !important; max-width: none !important; opacity: 1 !important; overflow: visible !important; vertical-align: baseline !important; z-index: auto !important;"><iframe id="aswift_1" name="" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" width="" height="" frameborder="0" src="https://googleads.g.doubleclick.net/pagead/html/r20210927/r20110914/zrt_lookup.html?fsb=1#RS-0-&amp;adk=1812271808&amp;client=ca-pub-6572127804953403&amp;fa=8&amp;ifi=2&amp;uci=a!2" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" style="width: 100vw !important; height: 100vh !important; inset: 0px auto auto 0px !important; position: absolute !important; clear: none !important; display: inline !important; float: none !important; margin: 0px !important; max-height: none !important; max-width: none !important; opacity: 1 !important; overflow: visible !important; padding: 0px !important; vertical-align: baseline !important; visibility: visible !important; z-index: auto !important;" data-google-container-id="a!2" data-google-query-id="CLj8vrq-qfMCFWxkFQgd5PsNFA" data-load-complete="true"></iframe></ins></ins></ins>[scr=https://pagead2.googlesyndication.com/pagead/managed/js/adsense/m202109240101/reactive_library_fy2019.js][scr=https://www.googletagservices.com/activeview/js/current/osd.js][scr=https://partner.googleadservices.com/gampad/cookie.js?domain=financemonk.net&callback=_gfp_s_&client=ca-pub-6572127804953403&cookie=ID%3D56b750e26beff53c-22055315dbca0007%3AT%3D1633096313%3ART%3D1633096313%3AS%3DALNI_Ma5q7Vv6dbrwy1vOYvLJ2E8WQeRlA][scr=https://pagead2.googlesyndication.com/pagead/managed/js/adsense/m202109240101/show_ads_impl_fy2019.js][scr=https://static.cloudflareinsights.com/beacon.min.js][scr=https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js][scr=/cdn-cgi/challenge-platform/h/g/scripts/invisible.js][scr=https://adservice.google.com/adsid/integrator.js?domain=financemonk.net][scr=//salutationcheerlessdemote.com/sfp.js][scr=https://adservice.google.com/adsid/integrator.js?domain=financemonk.net][scr=//housewifehaunted.com/4f/b9/d6/4fb9d6755e5818e2fb1ce2f1b6bbd2a5.js][scr=https://tmp.dropgalaxy.in/adspopup.js][scr=https://tmp.dropgalaxy.in/adddds.js?v=1.0]`;

      const customPayload = `[download adguard unlocked version][LODA-LELO][despacito][rrrr][rand=][id=${
        this.$("#fileid")?.value
      }][dropgalaxyisbest=0][adblock_detected=1][downloadhash=][downloadhashad=1]${usr}${adChecks2}`;

      var count = 0;
      setInterval(() => {
        if (count > 10) {
          return;
        }
        count++;
        fetch("https://tmp.dropgalaxy.in/gettoken.php", {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": '";Not A Brand";v="99", "Chromium";v="94"',
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": '"Android"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
          },
          referrer: "https://financemonk.net/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `rand=&msg=${encodeURIComponent(
            overallEncoder(customPayload)
          )}`,
          method: "POST",
          mode: "cors",
          credentials: "omit",
        })
          .then((res) => res.text())
          .then((xd) => {
            const target = this.$("#xd");
            target.id = "xdd"
            target.value = xd;
            this.log(xd);
          })
          .catch((err) => {
            console.error(err);
            this.log("Failed to simulate GetToken");
          });
      }, 100);

      this.interceptAJAX(function (args) {
        const ajaxOptions = arguments?.[0];
        if (ajaxOptions?.url?.match(/userusage/gi)) {
          return false;
        }
        if (
          ajaxOptions?.url?.search("https://tmp.dropgalaxy.in/gettoken.php") >
          -1
        ) {
          function overallDecoder(message) {
            const decoded = message
              .replace(/004|005|007/g, (res) => {
                return { "004": "2", "005": "3", "007": "7" }[res];
              })
              .split(",");
            return decoded
              .map((d) => String.fromCharCode(parseInt(d)))
              .join("");
          }

          function overallEncoder(str) {
            let buf = new ArrayBuffer(str.length * 2);
            let bufView = new Uint8Array(buf);
            for (let i = 0, strLen = str.length; i < strLen; i++) {
              bufView[i] = str.charCodeAt(i);
            }
            encoded_string = buf;

            // var encoded_string = encoder(coded_string);
            const uint8array_of_encoded_string = new Uint8Array(encoded_string);
            const encoded_message = uint8array_of_encoded_string
              .toString()
              .replace(/2|3|7|,0,0,0/g, (res) => {
                return { 2: "004", 3: "005", 7: "007", ",0,0,0": "" }[res];
              });
            return encoded_message;
          }

          const payload = new URLSearchParams(ajaxOptions.data).get("msg");
          let moddedPayload = overallDecoder(payload);
          // moddedPayload = moddedPayload.replace(/(id=)([^\]]+)/, "$1")
          moddedPayload += `<ins class="adsbygoogle adsbygoogle-noablate" data-adsbygoogle-status="done" style="display: none !important;" data-ad-status="unfilled"><ins id="aswift_0_expand" tabindex="0" title="Advertisement" aria-label="Advertisement" style="border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: inline-table;"><ins id="aswift_0_anchor" style="border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: block;"><iframe id="aswift_0" name="aswift_0" style="left:0;position:absolute;top:0;border:0;width:undefinedpx;height:undefinedpx;" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" frameborder="0" src="https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-6572127804953403&amp;output=html&amp;adk=1812271804&amp;adf=3025194257&amp;lmt=1632852274&amp;plat=1%3A16777216%2C2%3A16777216%2C3%3A32%2C4%3A32%2C9%3A32776%2C16%3A8388608%2C17%3A32%2C24%3A32%2C25%3A32%2C30%3A1081344%2C32%3A32&amp;format=0x0&amp;url=https%3A%2F%2Ffinancemonk.net%2F&amp;ea=0&amp;flash=0&amp;pra=5&amp;wgl=1&amp;uach=WyJXaW5kb3dzIiwiMTAuMC4wIiwieDg2IiwiIiwiOTQuMC45OTIuMzEiLFtdLG51bGwsbnVsbCwiNjQiXQ..&amp;dt=1632852274664&amp;bpp=2&amp;bdt=3967&amp;idt=133&amp;shv=r20210922&amp;mjsv=m202109220101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;nras=1&amp;correlator=2805760161265&amp;frm=20&amp;pv=2&amp;ga_vid=1157668643.1632852275&amp;ga_sid=1632852275&amp;ga_hid=11092835&amp;ga_fc=0&amp;u_tz=-300&amp;u_his=6&amp;u_h=1080&amp;u_w=1920&amp;u_ah=1040&amp;u_aw=1920&amp;u_cd=24&amp;adx=-12245933&amp;ady=-12245933&amp;biw=1903&amp;bih=969&amp;scr_x=0&amp;scr_y=0&amp;eid=31062309%2C31062430%2C31062311&amp;oid=3&amp;pvsid=4370036607835633&amp;pem=719&amp;wsm=1&amp;ref=https%3A%2F%2Fwww.google.com%2F&amp;eae=2&amp;fc=1920&amp;brdim=-1920%2C122%2C-1920%2C122%2C1920%2C122%2C1920%2C1040%2C1920%2C969&amp;vis=1&amp;rsz=%7C%7Cs%7C&amp;abl=NS&amp;fu=32768&amp;bc=31&amp;ifi=1&amp;uci=a!1&amp;fsb=1&amp;dtd=152" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" data-google-container-id="a!1" data-load-complete="true"></iframe></ins></ins></ins>[scr=https://www.googletagservices.com/activeview/js/current/osd.js][scr=https://partner.googleadservices.com/gampad/cookie.js?domain=financemonk.net&callback=_gfp_s_&client=ca-pub-6572127804953403][scr=https://pagead2.googlesyndication.com/pagead/managed/js/adsense/m202109220101/show_ads_impl.js][scr=https://static.cloudflareinsights.com/beacon.min.js][scr=https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js][scr=/cdn-cgi/challenge-platform/h/b/scripts/invisible.js][scr=//salutationcheerlessdemote.com/sfp.js][scr=https://adservice.google.com/adsid/integrator.js?domain=financemonk.net][scr=//housewifehaunted.com/4f/b9/d6/4fb9d6755e5818e2fb1ce2f1b6bbd2a5.js][scr=https://tmp.dropgalaxy.in/adspopup.js][scr=https://tmp.dropgalaxy.in/adddds.js?v=1.0]`;

          console.log(moddedPayload);
          const data = { rand: "", msg: overallEncoder(moddedPayload) };
          console.log(data);

          ajaxOptions.data = data;
        }
        return true;
      });
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
