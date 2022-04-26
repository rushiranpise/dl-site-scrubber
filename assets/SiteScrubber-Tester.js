// ==UserScript==
// @name         SiteScrubber-Tester
// @namespace    SiteScrubber
// @version      1.0.0
// @description  Scrub site of ugliness and ease the process of downloading from multiple file hosting sites!
// @author       PrimePlaya24
// @updateURL    http://localhost:9090/SiteScrubber-Tester.js
// @downloadURL  http://localhost:9090/SiteScrubber-Tester.js
// @compatible   firefox Violentmonkey
// @compatible   firefox Tampermonkey
// @compatible   chrome Violentmonkey
// @compatible   chrome Tampermonkey
// @include      /^(?:https?:\/\/)?(?:www\.)?*/
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
    this.console = window.console;
    this.console.groupCollapsed = window.console.groupCollapsed;
    this.console.groupEnd = window.console.groupEnd;
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
    this._removeElementWatcherList = [];

    this.currSiteRules = rules;
    this.ssCSSStyles = `.ss-alert{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc;width:100%;padding:15px;margin-bottom:20px;border:1px solid transparent;border-radius:4px;text-align:center}.ss-mt-5{margin-top:5em}.ss-btn{display:inline-block;padding:24px 32px;font-family:"Lucida Sans","Lucida Sans Regular","Lucida Grande","Lucida Sans Unicode",Geneva,Verdana,sans-serif;border:unset;color:#dfdfdf;text-transform:uppercase;font-size:24px;letter-spacing:.15em;transition:width .1s linear;position:relative;overflow:hidden;z-index:1;cursor:pointer}.ss-btn:active{transform:scale(.975)}.ss-btn:focus{outline:0}.ss-w-100{width:100%}.ss-btn-ready:after{content:"";position:absolute;bottom:0;left:0;width:100%;height:100%;transition:width .1s linear;z-index:-2}.ss-btn-ready:before{content:"";position:absolute;bottom:0;left:0;width:0%;height:100%;background-color:#11a800;transition:width .1s linear;transition:opacity .1s linear;z-index:-1}.ss-btn-ready:hover:before{width:100%;transition:width 2s linear}.ss-animated-button:active{transform:scale(.975)}.ss-animated-button:focus{outline:0}.ss-animated-button{background:linear-gradient(-30deg,#530000 50%,#340000 50%);padding:20px 40px;margin:12px;display:inline-block;-webkit-transform:translate(0,0);transform:translate(0,0);overflow:hidden;color:#f7d4d4;font-size:20px;letter-spacing:2.5px;text-align:center;text-transform:uppercase;text-decoration:none;-webkit-box-shadow:0 20px 50px rgba(0,0,0,.5);box-shadow:0 20px 50px rgba(0,0,0,.5);font-family:"Lucida Sans","Lucida Sans Regular","Lucida Grande","Lucida Sans Unicode",Geneva,Verdana,sans-serif;border:unset;transition:width .1s linear;position:relative;z-index:1;cursor:pointer}.ss-animated-button.ss-btn-ready{background:linear-gradient(-30deg,#0e5300 50%,#093400 50%);color:#d5f7d4}.ss-animated-button:not(.ss-btn-ready)::before{content:"Not Ready";position:absolute;top:0;left:0;width:100%;font-size:16px;height:100%;opacity:0;-webkit-transition:.2s opacity ease-in-out;transition:.2s opacity ease-in-out}.ss-animated-button:hover::before{opacity:.2}.ss-animated-button span{position:absolute}.ss-animated-button span:nth-child(1){top:0;left:0;width:100%;height:2px;-webkit-animation:2s animateTop linear infinite;animation:2s animateTop linear infinite}.ss-animated-button:not(.ss-btn-ready) span:nth-child(1){background:-webkit-gradient(linear,right top,left top,from(rgba(43,8,8,0)),to(#d92626));background:linear-gradient(to left,rgba(43,8,8,0),#d92626)}.ss-animated-button.ss-btn-ready span:nth-child(1){background:-webkit-gradient(linear,right top,left top,from(rgba(14,43,8,0)),to(#01ce0b));background:linear-gradient(to left,rgba(14,43,8,0),#01ce0b)}.ss-animated-button span:nth-child(2){top:0;right:0;height:100%;width:2px;-webkit-animation:2s animateRight linear -1s infinite;animation:2s animateRight linear -1s infinite}.ss-animated-button:not(.ss-btn-ready) span:nth-child(2){background:-webkit-gradient(linear,left bottom,left top,from(rgba(43,8,8,0)),to(#d92626));background:linear-gradient(to top,rgba(43,8,8,0),#d92626)}.ss-animated-button.ss-btn-ready span:nth-child(2){background:-webkit-gradient(linear,left bottom,left top,from(rgba(14,43,8,0)),to(#01ce0b));background:linear-gradient(to top,rgba(14,43,8,0),#01ce0b)}.ss-animated-button span:nth-child(3){bottom:0;left:0;width:100%;height:2px;-webkit-animation:2s animateBottom linear infinite;animation:2s animateBottom linear infinite}.ss-animated-button:not(.ss-btn-ready) span:nth-child(3){background:-webkit-gradient(linear,left top,right top,from(rgba(43,8,8,0)),to(#d92626));background:linear-gradient(to right,rgba(43,8,8,0),#d92626)}.ss-animated-button.ss-btn-ready span:nth-child(3){background:-webkit-gradient(linear,left top,right top,from(rgba(14,43,8,0)),to(#01ce0b));background:linear-gradient(to right,rgba(14,43,8,0),#01ce0b)}.ss-animated-button span:nth-child(4){top:0;left:0;height:100%;width:2px;-webkit-animation:2s animateLeft linear -1s infinite;animation:2s animateLeft linear -1s infinite}.ss-animated-button:not(.ss-btn-ready) span:nth-child(4){background:-webkit-gradient(linear,left top,left bottom,from(rgba(43,8,8,0)),to(#d92626));background:linear-gradient(to bottom,rgba(43,8,8,0),#d92626)}.ss-animated-button.ss-btn-ready span:nth-child(4){background:-webkit-gradient(linear,left top,left bottom,from(rgba(14,43,8,0)),to(#01ce0b));background:linear-gradient(to bottom,rgba(14,43,8,0),#01ce0b)}@keyframes animateBottom{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}@keyframes animateLeft{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(100%);transform:translateY(100%)}}@keyframes animateTop{0%{-webkit-transform:translateX(100%);transform:translateX(100%)}100%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}}@keyframes animateRight{0%{-webkit-transform:translateY(100%);transform:translateY(100%)}100%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}}`;
  }
  setup() {
    this.logDebug("Initializing SiteScrubber...");

    this.console.groupCollapsed("ss-destroyWindowFunctions");
    this.destroyWindowFunctions(this.currSiteRules?.destroyWindowFunctions);
    this.console.groupEnd("ss-destroyWindowFunctions");
    this.addCustomCSSStyle(this.ssCSSStyles);
    // Wait till page is ready for the rest
    if (this.ssButtonWatchDog === true) {
      // Ready, so click/submit
      this.waitUntilSelector(".ss-btn-ready").then((ssBtn) => {
        this.log("WOULD'VE CLICKED ss-btn", ssBtn);
        ssBtn.click();
      });
    }
    if (["complete", "interactive"].indexOf(document.readyState) > -1) {
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
  log(str, ...data) {
    if (data.length > 0) {
      this.logNative(`[SS-LOG] ${str}`, data);
    } else {
      this.logNative(`[SS-LOG] ${str}`);
    }
  }
  logDebug(str, ...data) {
    if (this.o_debug) {
      if (data.length > 0) {
        this.logNative(`[SS-DEBUG] ${str}`, data);
      } else {
        this.logNative(`[SS-DEBUG] ${str}`);
      }
    }
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
    // check if script beat the page loading
    if (targ === null) {
      return false;
    }
    // append our <style> element to the page
    targ?.appendChild(newNode);
    return true;
  }
  async waitUntilSelector(selector) {
    this.logDebug(`Waiting for selector: ${selector}`);
    return new Promise((resolve, reject) => {
      const element = this.$(selector);

      if (element) {
        this.logDebug(`Found element matching selector: ${selector}`);
        resolve(element);
        return;
      }

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const nodes = [mutation.target, ...mutation.addedNodes];
          for (const node of nodes) {
            if (node.matches && node.matches(selector)) {
              observer.disconnect();
              this.logDebug(`Observed element matches selector: ${selector}`);
              resolve(node);
              return;
            }
          }
        });
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
      });
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
  removeElements(elements) {
    if (!elements) {
      return;
    }
    this._removeElementWatcherList = elements;
    this.logDebug("Running removeElements");
    if (typeof elements == "string" || elements instanceof String) {
      // add it to an array so we can use Array functions
      elements = [elements];
    }
    [...elements].forEach((e) => {
      if (typeof e == "string" || e instanceof String) {
        // remove found elements
        this.$$(e).forEach((ele) => {
          if (!ele.querySelector(".g-recaptcha, .h-captcha")) {
            ele.remove();
          }
        });
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
          regex?.test(this.document.documentElement.innerHTML)
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
  isEmptyArray(arr) {
    return JSON.stringify(arr) === "[]";
  }
  isNothing(x) {
    return (
      void 0 === x ||
      null === x ||
      x === "" ||
      this.isEmptyArray(x) ||
      this.isEmptyObject(x)
    );
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

    const newNode = `<div class="ss-alert ss-mt-5">TO PREVENT MALICIOUS REDIRECT, <b>HOVER</b> OVER THE BUTTON FOR 2 SECONDS TO SUBMIT CLEANLY</div>`;
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
      "hcaptcha",
    ];
    for (const option of options) {
      // window[option] = function () {};
      if (whitelist.includes(option)) {
        this.logDebug(`Skipping destroy of ${option}`);
        continue;
      } else if (option) {
      }
      try {
        this.window.Object.defineProperty(this.window, option, {
          configurable: false,
          set() {
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
  interceptXMLHttpRequest(fn) {
    this.log("Adding XMLHttpRequest hook");
    const _this = this;
    const origXMLHttpRequest = window.XMLHttpRequest;
    window.origXMLHttpRequest = origXMLHttpRequest;
    window.origXMLHttpRequest.prototype.open =
      origXMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function () {
      let allow = true;
      if (fn !== undefined && typeof fn === "function") {
        allow = !!fn.apply(this, arguments);
      } else if (arguments?.[0]?.url?.search("xxx") > -1) {
        allow = false;
      }
      if (allow) {
        return origXMLHttpRequest.prototype.open.apply(this, arguments);
      } else {
        _this.log("Stopped origXMLHttpRequest call");
        _this.logDebug(`Blocked: ${arguments?.[0]?.url}`);
      }
    };
  }
  interceptPreventDefault(fn) {
    this.log("Adding preventDefault hook");
    const _this = this;
    const origPreventDefault = Event.prototype.preventDefault;
    this.window.origPreventDefault = origPreventDefault;
    Event.prototype.preventDefault = function () {
      let allow = true;
      if (fn !== undefined && typeof fn === "function") {
        allow = !!fn.apply(this, arguments);
      }
      if (allow) {
        return origPreventDefault.apply(this, arguments);
      } else {
        _this.log("Stopped preventDefault call");
      }
    };
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
      replaceWithForm = false,
      replaceWithTag,
      copyAttributesFromElement,
      customText,
      className,
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
        dl_link.match(/^http:/i)
      ) {
        // https://blog.chromium.org/2020/02/protecting-users-from-insecure.html
        this.document.body.insertAdjacentHTML(
          "afterbegin",
          `<p class='ss-alert ss-w-100'>This file should be served over HTTPS. This download has been blocked. See <a href='https://blog.chromium.org/2020/02/protecting-users-from-insecure.html'>https://blog.chromium.org/2020/02/protecting-users-from-insecure.html</a> for more details.</p>`
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
      button = form.querySelector(".ss-animated-button");
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
      button.innerHTML = `${customText}<span></span><span></span><span></span><span></span>`;
    } else {
      button.innerHTML = `Continue<span></span><span></span><span></span><span></span>`;
    }
    button.className = className || "ss-animated-button ss-w-100";
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

    return button;
  }
  makeSafeForm({ actionURL, method = "GET", target = "_blank" }) {
    const form = this.document.createElement("form");
    form.action = actionURL || "";
    form.method = method;
    form.target = target;
    form.id = "ss-form";

    const submitBtn = this.document.createElement("button");
    submitBtn.type = "submit";
    this.modifyButton(submitBtn, { customText: "Start Download" });
    form.appendChild(submitBtn);
    return form;
  }
  applyRules() {
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

    this.log("STARTING CLEANER!");

    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        const list = [mutation.target, ...mutation.addedNodes];
        for (const node of list) {
          for (const removeRule of this._removeElementWatcherList) {
            // not a fan of this TBH
            if (node?.matches?.(removeRule)) {
              this.logDebug("MutationObserver - Removing:", node);
              node?.remove?.();
            }
          }
        }
      }
    });
    observer.observe(this.document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    const funcsAndParams = {
      addCustomCSSStyle: "customStyle",
      createCountdown: "createCountdown",
      removeElements: "remove",
      removeIFrames: "removeIFrames",
      removeDisabledAttr: "removeDisabledAttr",
    };

    Object.entries(funcsAndParams).forEach(([funcName, param]) => {
      const rule = this.currSiteRules[param];
      if (this.isNothing(rule)) {
        return;
      } else {
        this.console.groupCollapsed(`ss-${funcName}`);
        this[funcName](rule);
        this.console.groupEnd(`ss-${funcName}`);
      }
    });

    this.console.groupCollapsed("ss-removeByRegex");
    this.currSiteRules?.removeByRegex?.forEach((removeByRegexOptions) =>
      this.removeElementsByRegex(removeByRegexOptions)
    );
    this.log("Removed elements");
    this.console.groupEnd("ss-removeByRegex");

    this.console.groupCollapsed("ss-addInfoBanner");
    this.currSiteRules?.addInfoBanner?.forEach((addInfoBannerOptions) =>
      this.addInfoBanner(addInfoBannerOptions)
    );
    this.console.groupEnd("ss-addInfoBanner");

    this.console.groupCollapsed("ss-modifyButtons");
    if (this.currSiteRules?.modifyButtons) {
      this.currSiteRules?.modifyButtons?.forEach(([button, options]) => {
        this.modifyButton(button, options);
      });
    }
    this.console.groupEnd("ss-modifyButtons");

    this.log("Running site's custom made script");
    this.currSiteRules?.customScript?.bind(this)?.();
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const siteRules = {};

for (const site in siteRules) {
  const currSiteRules = siteRules[site];
  if (
    currSiteRules.host.some((urlMatch) => {
      if (urlMatch instanceof RegExp) {
        return Boolean(window.location.href.match(urlMatch));
      } else {
        return window.location.href.includes(urlMatch);
      }
    })
  ) {
    window.Object.defineProperty(window, "siteScrubber", {
      enumerable: false,
      writable: false,
      configurable: false,
      value: new SiteScrubber(currSiteRules),
    });
    siteScrubber.setup();
    break;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
