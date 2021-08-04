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
// @include      /^(?:https?:\/\/)?(?:www\.)?techssting\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?file-up(load)?\.(com|org)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?up-load\.io\//
// @include      /^(?:https?:\/\/)?(?:www\.)?uploadrar\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?mega4up\.com\//
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
// @include      /^(?:https?:\/\/)?(?:www\.)?indi-share\.net\//
// @include      /^(?:https?:\/\/)?(?:www\.)?depositfiles\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?clicknupload\.cc\//
// @include      /^(?:https?:\/\/)?(?:www\.)?veryfiles\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?douploads\.net\//
// @run-at       document-start
// @grant        none
// ==/UserScript==

const o_debug = true;

// Make a backup in case something overwrites it
const backupWindowOpen = window.open;
const backupConsole = window.console;

/**
 * log info to console
 * @param {string} str
 */
const log = (str) => {
  backupConsole.log(`[LOG] AIO-script: ${str}`);
};

/**
 * log info to console if in DEBUG mode (o_debug == true)
 * @param {string} str
 */
const log_debug = (str) => {
  if (o_debug) backupConsole.log(`[DEBUG] AIO-script: ${str}`);
};

// helper functions
const el = (query, context = document) => context.querySelector(query),
  els = (query, context = document) => context.querySelectorAll(query),
  elementExists = (query) => Boolean(el(query)),
  ifElementExists = (query, fn = () => undefined) =>
    elementExists(query) && fn(query),
  elStyle = (query) => (prop, value) => (el(query).style[prop] = value),
  changeStyle = (query) => (prop, value) => () => elStyle(query)(prop, value);

/**
 * Add custom CSS to page by appending a new <style> tag
 * to the head of the document
 * @param {string} cssStr valid css string
 */
const GM_addStyle = (cssStr) => {
  if (!cssStr) {
    return;
  }
  // make new <style> element
  let newNode = document.createElement("style");
  // set the inner text to the user input
  newNode.textContent = cssStr;
  // select where to place our <style> element
  let targ =
    document.querySelector("head") || document.body || document.documentElement;
  // append our <style> element to the page
  targ.appendChild(newNode);
};

/**
 * async wait until element is found given a string selector
 * @param {string} variableName
 * @returns Promise{object}
 */
const waitUntilVariable_async = async (...variableNames) => {
  log(`Waiting for global variable: window.${variableNames.join(".")}`);
  let curr = window;
  while (curr == window || curr == undefined) {
    curr = window;
    for (const k of variableNames) {
      if (curr == undefined) break;
      curr = curr?.[k];
    }
    // if not found, wait and check again in 500 milliseconds
    await new Promise((r) => setTimeout(r, 1500));
  }
  log(`Found global variable: window.${variableNames.join(".")}`);
  return new Promise((resolve) => {
    // resolve/return the found element
    resolve(curr);
  });
};

/**
 * async wait until element is found given a string selector
 * @param {string} elementSelector
 * @returns Promise{HTMLElement}
 */
const waitUntilElementSelector_async = async (elementSelector) => {
  if (!elementSelector) {
    return;
  }
  log(`Waiting for selector: ${elementSelector}`);
  while (!document.querySelector(elementSelector)) {
    // if not found, wait and check again in 500 milliseconds
    await new Promise((r) => setTimeout(r, 500));
  }
  log(`Found Element by Selector: ${elementSelector}`);
  return new Promise((resolve) => {
    // resolve/return the found element
    resolve(document.querySelector(elementSelector));
  });
};

/**
 * wait until element is found given a string selector
 * @param {string} elementSelector
 * @returns Promise{HTMLElement}
 */
const waitUntilElementSelector = async (elementSelector) => {
  if (!elementSelector) {
    return;
  }
  log(`Waiting for selector: ${elementSelector}`);
  while (!document.querySelector(elementSelector)) {
    // if not found, wait and check again in 500 milliseconds
    await new Promise((r) => setTimeout(r, 500));
  }
  log(`Found Element by Selector: ${elementSelector}`);
};

/**
 * wait until element is found given a string selector
 * and then open the given link if found
 * @param {string} elementSelector
 * @returns Promise{HTMLElement}
 */
const finalDownloadLinkOpener = (selector, regex) => {
  if (!selector) {
    return;
  }
  waitUntilElementSelector_async(selector).then((res) => {
    if (regex instanceof RegExp) {
      if (regex.test(document.body.innerText)) {
        log("DDL Link was found on this page.");
        // Open DDL for download
        backupWindowOpen(res?.href, "_self");
        log_debug(`finalDownloadLinkOpener() - res?.href: ${res?.href}`);
        // res.click();
        log("Opening DDL link for file.");
      } else {
        log("DDL Link not found on this page or Regex test failed.");
      }
    } else {
      log("DDL Link was found on this page.");
      // Open DDL for download
      backupWindowOpen(res?.href, "_self");
      log_debug(`finalDownloadLinkOpener() - res?.href: ${res?.href}`);
      // res.click();
      log("Opening DDL link for file.");
    }
  });
};

/**
 * Restore window functions to page to allow for use
 * in case the site removed them for some reason
 */
const restoreWindowFunctions = (...functions) => {
  log("Restoring window.console");
  // create new iframe element
  const i = document.createElement("iframe");
  // hide it from sight
  i.style.display = "none";
  // add to the document
  document.body.appendChild(i);
  // replace the window.console with the newly made console object
  for (const func of functions) {
    window[func] = i.contentWindow[func];
    log_debug(`restoreWindowFunctions() - Restored: window[${func}]`);
  }
};
/**
 * Restore console to page to allow for logging
 * used when a page removes console for some reason
 */
const restoreConsole = () => {
  log("Restoring window.console");
  // create new iframe element
  const i = document.createElement("iframe");
  // hide it from sight
  i.style.display = "none";
  // add to the document
  document.body.appendChild(i);
  // replace the window.console with the newly made console object
  window.console = i.contentWindow.console;
};

/**
 * Removes all elements found by given selectors within array
 * @param {Array} elements array of element selector strings
 */
const removeElements = (elements) => {
  if (!elements) {
    return;
  }
  log_debug("Running removeElements");
  if (typeof elements == "string" || elements instanceof String) {
    // add it to an array so we can use Array functions
    elements = [elements];
  }
  [...elements].forEach((e) => {
    if (typeof e == "string" || e instanceof String) {
      // remove found elements
      document.querySelectorAll(e).forEach((ele) => ele.remove());
    } else if (e instanceof HTMLElement) {
      // remove HTMLElement
      e.remove();
    }
  });
};

/**
 * Removes all elements found by given selectors within array
 * if the regex matches within the elements text body
 * @param {Array} elements
 * @param {RegExp} regex
 */
const removeElementsByRegex = (elements, regex) => {
  if (!elements) {
    return;
  }
  log_debug("Running removeElementsByRegex");
  if (typeof elements == "string" || elements instanceof String) {
    // add it to an array so we can use Array functions
    elements = [elements];
  }
  [...elements].forEach((e) => {
    if (typeof e == "string" || e instanceof String) {
      if (regex instanceof RegExp) {
        document.querySelectorAll(e).forEach((ele) => {
          if (regex.test(ele.innerText)) {
            // remove found elements if RegEx matches
            ele.remove();
          }
        });
      }
    } else if (e instanceof HTMLElement) {
      if (regex.test(e.innerText)) {
        // remove HTMLElement if RegEx matches
        e.remove();
      }
    }
  });
};

/**
 * Used to monitor Google reCAPTCHA and if the user completes
 * the tasks, then we submit the form automatically, if the wait
 * time has been exceeded as well
 * @param {HTMLElement} form <form> html tag
 * @param {int} timer seconds to wait before submitting
 * @returns undefined
 */
const googleRecaptchaListener = async (form, timer = 0) => {
  if (!form) {
    return;
  }
  if (form instanceof HTMLElement) {
    log("Form selected!");
  } else if (typeof form == "string" || form instanceof String) {
    // try to find form based on selector
    form = document.querySelector(form) || null;
  }
  if (!form || !window.grecaptcha) {
    log("No Google Captcha found...");
    return;
  }
  return new Promise((res, rej) => {
    // save current date
    const then = new Date();
    // interval to check every 500 milliseconds if ReCAPTCHA
    // has been completed, then the form gets submitted
    const checker = setInterval(() => {
      if (
        window.grecaptcha.getResponse() &&
        Math.floor((new Date() - then) / 1000) > timer
      ) {
        // stop interval from continuing
        clearInterval(checker);
        form.submit();
        res();
      }
    }, 500);
  });
};

/**
 * Removes all scripts that do not contain Google
 * related links
 */
const removeScripts = () => {
  log("Removing unwanted scripts from page");
  let i = 0;
  document.querySelectorAll("script").forEach((tag) => {
    if (!/google|gstatic/gi.test(tag.src)) {
      tag.remove();
      i++;
    }
  });
  log(`Removed ${i} scripts`);
};

/**
 * Removes all iFrames that do not contain Google
 * related urls
 */
const removeiFrames = () => {
  log("Removing unwanted scripts from page");
  let i = 0;
  document.querySelectorAll("iframe").forEach((tag) => {
    if (!/google/gi.test(tag.src)) {
      tag.remove();
    }
  });
  log(`Removed ${i} iFrames`);
};

/**
 * Removes all "disabled" attributes from every element
 * on the page
 */
const removeDisabledAttr = () => {
  log("Enabling all buttons");
  document.querySelectorAll("*").forEach((e) => {
    e.removeAttribute("disabled");
  });
};

/**
 * Iterate through element selector strings in array and hide each
 * element based on the given displayFlag method given
 * @param {Array} elements   array of element selector strings to search
 * @param {int} displayFlag  0 - display: none, 1 - visibility: hidden
 */
const hideElements = (elements, displayFlag = 0) => {
  if (!elements) {
    return;
  }
  // 0 - displayFlag --- display: none
  // 1 - displayFlag --- visibility: hidden
  log_debug("Running hideElements");
  if (typeof elements == "string" || elements instanceof String) {
    elements = [elements];
  }
  [...elements].forEach((e) => {
    if (typeof e == "string" || e instanceof String) {
      if (displayFlag) {
        // 1 - displayFlag --- visibility: hidden
        document
          .querySelectorAll(e)
          .forEach((ele) => (ele.style.visibility = "hidden"));
      } else {
        // 0 - displayFlag --- display: none
        document
          .querySelectorAll(e)
          .forEach((ele) => (ele.style.display = "none"));
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
};

/**
 * async Sleep function to pause operations
 * @param {int} ms # of milliseconds to sleep for
 * @returns Promise{resolved}
 */
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Function to check page and see if current page is
 * part of the download sequence
 * @param {Array} arrayOfSelectors
 * @param {Array} arrayOfRegexTests
 * @returns Boolean
 */
const checkIfDownloadPage = (arrayOfSelectors = [], arrayOfRegexTests = []) => {
  if (
    (arrayOfSelectors instanceof Array &&
      arrayOfSelectors.some((selector) =>
        Boolean(document.querySelector(selector))
      )) ||
    (arrayOfRegexTests instanceof Array &&
      arrayOfRegexTests.some((regex) => regex?.test(document.body.innerText)))
  ) {
    log("Assuming this is a download page!");
    return true;
  }
  log("Skipping this page. Not a downloading page.");
  return false;
};

/**
 * Add ability to "click" buttons by hovering over them
 * for 2 seconds to prevent and bypass ads/popups
 * @param {Array} elements
 * @param {Boolean} requireGoogleReCAPTCHA Require CAPTCHA to click
 */
const addHoverAbility = (elements = [], requireGoogleReCAPTCHA = false) => {
  if (!elements) {
    return;
  }
  function addEvent(element) {
    if (requireGoogleReCAPTCHA) {
      element.addEventListener(
        "mouseenter",
        () => {
          element.dataset.timeout = setTimeout(function () {
            if (window.grecaptcha.getResponse()) element.click();
          }, 2000);
        },
        false
      );
    } else {
      element.addEventListener(
        "mouseenter",
        () => {
          element.dataset.timeout = setTimeout(function () {
            element.click();
          }, 2000);
        },
        false
      );
    }
    log_debug(`Added 'mouseenter' event to ${element}`);
    element.addEventListener(
      "mouseleave",
      () => {
        clearTimeout(element.dataset.timeout);
      },
      false
    );
    log_debug(`Added 'mouseleave' event to ${element}`);
  }
  if (typeof elements == "string" || elements instanceof String) {
    elements = [elements];
  }
  [...elements].forEach((e) => {
    if (typeof e == "string" || e instanceof String) {
      document.querySelectorAll(e).forEach(addEvent);
    } else if (e instanceof HTMLElement) {
      addEvent(e);
    }
  });
};

/** Add an info banner to tell the user how to safely "click"
 * a button to submit a form to prevent ads
 *
 * @param {String} elementToAddTo
 * @returns
 */
const addInfoBanner = (elementToAddTo, where = "beforeend") => {
  if (elementToAddTo instanceof HTMLElement) {
    // Already an HTMLElement
  } else if (
    typeof elementToAddTo == "string" ||
    elementToAddTo instanceof String
  ) {
    elementToAddTo = document.querySelector(elementToAddTo) || null;
  }
  if (!elementToAddTo) {
    return;
  }

  GM_addStyle(
    `.ss-alert-warning{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.ss-alert{padding:15px;margin-bottom:20px;border:1px solid transparent;border-radius:4px}.ss-col-md-12{width:100%}.ss-mt-5{margin-top:5em}.ss-text-center{text-align:center}`
  );
  const newNode = `<div class="ss-alert ss-alert-warning ss-mt-5 ss-text-center">TO PREVENT MALICIOUS REDIRECT, <b>HOVER</b> OVER THE BUTTON FOR 2 SECONDS TO SUBMIT CLEANLY</div>`;
  elementToAddTo.insertAdjacentHTML(where, newNode);
  log_debug(`addInfoBanner() - elementToAddTo: ${elementToAddTo}, ${where}`);
};

const destroyWindowFunctions = (options = []) => {
  if (options.length == 0) {
    return;
  }
  
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const applyRules = (siteRules) => {
  log("STARTING CLEANER!");
  if (
    !checkIfDownloadPage(
      siteRules?.downloadPageCheckBySelector,
      siteRules?.downloadPageCheckByRegex
    )
  ) {
    return;
  }
  GM_addStyle(siteRules?.customStyle);
  removeElements(siteRules?.remove);
  siteRules?.removeByRegex?.forEach(([selector, regex]) =>
    removeElementsByRegex(selector, regex)
  );
  hideElements(siteRules?.hideElements);
  if (siteRules?.removeIFrames) {
    removeiFrames();
  }
  if (siteRules?.removeDisabledAttr) {
    removeDisabledAttr();
  }
  if (siteRules?.restoreConsole) {
    restoreConsole();
  }
  if (siteRules?.restoreWindowFunctions) {
    restoreWindowFunctions(siteRules?.restoreWindowFunctions);
  }
  siteRules?.finalDownloadElementSelector?.forEach(([selector, regex]) =>
    finalDownloadLinkOpener(selector, regex)
  );
  siteRules?.addHoverAbility?.forEach(([elements, requiresRecaptcha]) =>
    addHoverAbility(elements, requiresRecaptcha)
  );
  siteRules?.addInfoBanner?.forEach(([element, where]) =>
    addInfoBanner(element, where)
  );
  siteRules?.customScript?.();
};

const siteRules = {
  dropapk: {
    host: ["drop.download", "dropapk.to"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important}#container{background:#121212!important}.download_box{background-color:#323232!important}.bg-white{background:#121212!important}`,
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
    restoreConsole: false,
    finalDownloadElementSelector: "div.download_box a",
    addHoverAbility: ["#downloadbtn", "a.btn-block"],
    addInfoBanner: ["div.download_box"],
    customScript() {
      // click the "Slow Download" option on page 1
      document.querySelector("button#method_free")?.click();
      const captcha_box = document.querySelector(".download_box div");
      if (captcha_box) {
        const captcha_code = [...captcha_box?.children]
          .sort(
            (x, y) =>
              x.getAttribute("style").match(/padding-left:(\d+)/)?.[1] -
              y.getAttribute("style").match(/padding-left:(\d+)/)?.[1]
          )
          .map((e) => e.textContent)
          .join("");
        document.querySelector("input.captcha_code").value = captcha_code;
        document.forms?.F1?.submit();
      }

      document
        .querySelector(".col-md-4")
        ?.classList.replace("col-md-4", "col-md-12");
      document.querySelector("p.mb-5")?.classList.remove("mb-5");
    },
  },
  mixloads: {
    host: ["mixloads.com"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important}#container{background:#121212!important}.download_box{background-color:#323232!important}.bg-white{background:#121212!important}`,
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
    ],
    removeByRegex: [[".download_method", /fast download/gi]],
    hideElements: ["table"],
    removeIFrames: true,
    removeDisabledAttr: true,
    restoreConsole: false,
    finalDownloadElementSelector: [
      ["div.download_box a", /your IP next 8 hours/gi],
    ],
    addHoverAbility: [["#downloadbtn"], ["a.btn-block"]],
    addInfoBanner: [["div.download_box"]],
    customScript() {
      // click the "Slow Download" option on page 1
      document.querySelector("button#method_free")?.click();
      document
        .querySelector(".col-md-4")
        ?.classList.replace("col-md-4", "col-md-12");
      document.querySelector("p.mb-5")?.classList.remove("mb-5");

      ifElementExists("div.download_box img", () => {
        const $ = document.querySelector;
        const $$ = document.querySelectorAll;
        $("div.download_box").insertAdjacentHTML(
          "afterbegin",
          '<div class="input-group mb-3"></div><div class="input-group-prepend text-center"></div><span class="input-group-text font-weight-bold">Captcha Code </span>'
        );
        $("div.download_box span.input-group-text").appendChild(
          $("input.captcha_code")
        );
        $("input.captcha_code")?.classList.add("form-control");
        $("div.download_box").insertAdjacentElement("afterbegin", $("img"));

        // Make the remaining elements neat
        $(".download_box")?.classList.add("container");
        $$("img").forEach((e) => {
          if (/captcha/gi.test(e.src)) {
            e.style.height = "8em";
            e.style.width = "auto";
          }
        });
      });
    },
  },
  dropgalaxy: {
    host: ["dropgalaxy.com", "dropgalaxy.in", "techssting.com"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important}#container{background:#121212!important}.download_box{background-color:#323232!important}.bg-white{background:#121212!important}ins,#badip {display:none!important}`,
    downloadPageCheckBySelector: ["button[name='method_free']", "a#dl"],
    downloadPageCheckByRegex: [
      /Click here to download/gi,
      /This direct link will be available for/gi,
      /Create download link/gi,
    ],
    remove: ["nav", "footer", ".sharetabs ul", "#load img", "ul#article"],
    removeByRegex: [[".download_method", /fast download/gi]],
    hideElements: undefined,
    removeIFrames: true,
    removeDisabledAttr: true,
    restoreConsole: true,
    finalDownloadElementSelector: [
      ["div.container.page.downloadPage > div > div.col-md-4 > a"],
    ],
    addHoverAbility: [
      ["div.container.page.downloadPage > div > div.col-md-4 > a"],
    ],
    addInfoBanner: [[".container.page.downloadPage .row", "beforeend"]],
    customScript() {
      document.querySelector("body").classList.remove("white");
      document.querySelector("body").classList.add("dark");
      setStyleSheet("https://dropgalaxy.com/assets/styles/dark.min.css");
      if (
        /proxy not allowed/gi.test(
          document.querySelector("center div.alert.alert-danger.mb-3")
            ?.textContent
        )
      ) {
        log("Site does not like your IP address, stopping script");
        return;
      }

      document.querySelector("button[name='method_free']")?.click();

      waitUntilElementSelector_async("#countdown .seconds").then((seconds) => {
        seconds.innerText = 0;
      });

      // waitUntilElementSelector_async("button#downloadbtn2").then((dl_btn) => {
      //   dl_btn.removeAttribute("style");
      // });
      waitUntilElementSelector_async(
        "div.container.page.downloadPage > div > div.col-md-4 > a"
      ).then((dl_btn) => {
        dl_btn.removeAttribute("style");
        dl_btn.removeAttribute("onclick");
      });
      waitUntilVariable_async("go").then(() => (window["go"] = undefined));

      document.querySelector("#downloadhash")?.setAttribute("value", "0");
      document.querySelector("#dropgalaxyisbest")?.setAttribute("value", "0");
      document.querySelector("#adblock_check")?.setAttribute("value", "0");
      document.querySelector("#adblock_detected")?.setAttribute("value", "1");
      document.querySelector("#admaven_popup")?.setAttribute("value", "1");
      if (document.querySelector("#xd")) {
        fetch("https://tmp.dropgalaxy.in/gettoken.php", {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
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
            document.querySelector("#xd")?.setAttribute("value", code);
            document.forms?.F1?.submit();
          });
      }
    },
  },
  fileupload: {
    host: ["file-up.org", "file-upload.com"],
    customStyle: `html,body,.row,.stdt,.dareaname,section.page-content,div.page-wrap{background:#121212!important;color:#dfdfdf!important}#downloadbtn{padding:20px 50px!important}a#download-btn{padding:20px 50px!important}.row.comparison-row{display:none!important}`,
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
    finalDownloadElementSelector: [["#download-div > a#download-btn"]],
    addHoverAbility: [
      ["button#downloadbtn", true],
      ["#download-div > a#download-btn", false],
    ],
    addInfoBanner: [
      [document.forms.F1, "afterend"],
      ["a#download-btn", "afterend"],
    ],
    customScript() {
      // click the "Free Download" option on page 1
      waitUntilElementSelector_async("input[name='method_free']").then(
        (btn) => {
          btn?.removeAttribute("onclick");
          btn?.click();
        }
      );

      // add listener with delay due to issues
      waitUntilVariable_async("grecaptcha").then(() => {
        googleRecaptchaListener(
          document.F1,
          +document.querySelector(".seconds").innerText || 30
        );
      });

      // Last page, remove malicious script
      waitUntilElementSelector_async("#download-div > a#download-btn").then(
        (btn) => btn.removeAttribute("onclick")
      );
    },
  },
  "up-load.io": {
    host: ["up-load.io"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important}div.filepanel.lft,div.info,.dfilename{background:#212121!important;color:#dfdfdf!important}#downloadbtn{padding:20px 50px!important}.dfile .report,#s65c,body > span{display:none!important}`,
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
    restoreConsole: false,
    finalDownloadElementSelector: [["div.download-button > a.btn.btn-dow"]],
    addHoverAbility: [
      ["button#downloadbtn", true],
      ["div.download-button > a.btn.btn-dow", false],
    ],
    addInfoBanner: [["#container > div.container"]],
    customScript() {
      // click the "Free Download" option on page 1
      document.querySelector("input[name='method_free']")?.click();

      // add listener
      googleRecaptchaListener(
        document.F1,
        +document.querySelector(".seconds").innerText || 30
      );

      waitUntilElementSelector_async("#s65c").then((element) =>
        element.remove()
      );
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
      ".banner3",
      ".report",
    ],
    removeByRegex: [[".txt", /uploadrar|Cloud computing/gi]],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    restoreConsole: false,
    finalDownloadElementSelector: [["#direct_link a"]],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      // Automation
      document.querySelector("input[name='method_free']")?.click();
      document.querySelector("#downloadbtn")?.click();
      document.forms.F1?.submit();
    },
  },
  mega4up: {
    host: ["mega4up.com"],
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
    restoreConsole: false,
    finalDownloadElementSelector: [["#direct_link > a"]],
    addHoverAbility: [
      ["button#downloadbtn", true],
      ["#direct_link > a", false],
    ],
    addInfoBanner: [["form[name='F1']"], ["#direct_link"]],
    customScript() {
      // click the "Free Download" option on page 1
      document.querySelector("input[name='mega_free']")?.click();

      waitUntilElementSelector_async("#direct_link > a").then((btn) =>
        btn.removeAttribute("onclick")
      );

      // add listener
      googleRecaptchaListener(
        document.F1,
        +document.querySelector(".seconds").innerText || 30
      );

      ifElementExists(
        "div.card.mb-4 > div.card-body > div.row > div.col-xl-4",
        () => {
          document
            .querySelector(
              "div.card.mb-4 > div.card-body > div.row > div.col-xl-4"
            )
            ?.classList.replace("col-xl-4", "col-xl-12");
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
    restoreConsole: false,
    finalDownloadElementSelector: [
      ["form a[type='button']", /download now|userupload.in:183/gi],
    ],
    addHoverAbility: [["form a[type='button']"], ["button#downloadbtn"]],
    addInfoBanner: [["form[name='F1'] .row", "beforeend"]],
    customScript() {
      googleRecaptchaListener(document.forms.F1);
    },
  },
  "userupload.net": {
    host: ["userupload.net"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important}.card,.icon,.label-group,.subpage-content{background:#121212!important}`,
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
    restoreConsole: false,
    finalDownloadElementSelector: ["form a.btn.btn-primary.btn-block"],
    addHoverAbility: [
      ["button#downloadbtn", true],
      ["form a.btn.btn-primary.btn-block", false],
    ],
    addInfoBanner: undefined,
    customScript() {
      // add listener
      googleRecaptchaListener(document.F1);

      ifElementExists("form[name='F1']", () => {
        addInfoBanner(document.querySelector("form[name='F1']")?.parentElement);
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
    restoreConsole: false,
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
      googleRecaptchaListener(document.forms.captchaform);

      ifElementExists("form#captchaform", () => {
        addInfoBanner(
          document.querySelector("form#captchaform")?.parentElement
        );
      });

      // the ending direct download link
      let ddlURL =
        document.body.textContent.match(
          /return \'(http[s]?:\/\/(.*)?download(.*)?)\'/
        )?.[1] ?? null;
      if (ddlURL) {
        log("DDL Link was found on this page.");
        backupWindowOpen(ddlURL, "_self");
        log(`Opening DDL link for file: ${ddlURL}`);
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
    remove: ["nav", "footer", "#dllinked2", "#adtrue_tag_21265"],
    removeByRegex: [],
    hideElements: undefined,
    removeIFrames: true,
    removeDisabledAttr: true,
    restoreConsole: false,
    finalDownloadElementSelector: ["#dlink"],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      document.querySelector("#freebtn")?.click();
      if (!window.grecaptcha) {
        document.querySelector("#downloadbtn")?.click();
      }
      document.querySelector("#dlink")?.click();

      // add listener
      googleRecaptchaListener(document.forms.F1);
    },
  },
  "upload-4ever": {
    host: [/^(?:https?:\/\/)?(?:www\.)?upload-4ever.com/, "upload-4ever.com"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;background-color:#121212!important;color:#dfdfdf!important}.firstOne{display:none!important;}.notFirstOne{display:block!important;}`,
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
    restoreConsole: false,
    finalDownloadElementSelector: [],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      ifElementExists("#downloadbtn", () => {
        document
          .querySelector("#downloadbtn")
          .classList.replace("btn-sm", "btn-lg");
      });

      // Automation
      document.querySelector("input[name='method_free']")?.click();
      googleRecaptchaListener(document.forms.F1, 35);
      waitUntilElementSelector_async("#downLoadLinkButton").then((link) => {
        log_debug(link.getAttribute("onclick"));
        // Remove nasty ad redirect
        btn.removeAttribute("onclick");
        if (link?.dataset.target) {
          log("DDL Link was found on this page.");
          // Open DDL for download
          backupWindowOpen(link?.dataset.target, "_self");
          log("Opening DDL link for file.");
        }
      });
      waitUntilElementSelector_async("#downLoadLinkButton[onclick]").then(
        (btn) => {
          console.log(btn.getAttribute("onclick"));
          btn.removeAttribute("onclick");
        }
      );
    },
  },
  uploadev: {
    host: ["uploadev.org"],
    customStyle: `.mngez_messgepage,.mngez_download0,.mngez_download1,body{background:#121212!important;color:#dfdfdf!important}.mngez_download1 .capcha p{color:#dfdfdf!important}.mngez_download1 .fileinfo .colright .col1 p i{color:#dfdfdf!important}.mngez_download1 .fileinfo .colright .col1 span{color:#dfdfdf!important}`,
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
    ],
    removeByRegex: [],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: true,
    restoreConsole: false,
    finalDownloadElementSelector: [["#direct_link a.directl"]],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      setTimeout(() => {
        waitUntilElementSelector_async("input[name='method_free']").then(
          (btn) => btn?.click()
        );
      }, 1000);
      // this page is slow for some reason so we have to delay
      waitUntilVariable_async("grecaptcha").then(() => {
        googleRecaptchaListener(document.forms.F1, 20);
      });
    },
  },
  apkadmin: {
    host: ["apkadmin.com"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important}center{color:#dfdfdf!important}.download-page .file-info{background:#212121!important;color:#dfdfdf!important}`,
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
    restoreConsole: false,
    finalDownloadElementSelector: [],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      document.querySelector("#downloadbtn")?.click();
    },
  },
  dlupload: {
    host: ["khabarbabal.online", "dlsharefile.com", "dlsharefile.org"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important}.bg-secondary,.bg-white,.card,.icon,.label-group,.subpage-content{background:#121212!important}#show-submit-btn,.border.bg-secondary .bg-white.border-0,.col-lg-12.text-center,.row.justify-content-center>a[href],.separator,.text-lg-center.btn-wrapper,center,h5.mb-0{display:none!important}.d-none{display:block!important}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{color:#dfdfdf!important}.container-1{visibility:hidden!important}form#DownloadForm{display:flex;flex-direction:column;align-items:center}`,
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
    restoreConsole: false,
    finalDownloadElementSelector: [],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      waitUntilElementSelector_async("a#downloadb").then((btn) => {
        btn?.click();
      });
      waitUntilElementSelector_async("#download-status").then((btn) => {
        $("#download-status").attr("id", "loading").text("Loading...");
        $("div#Download-Card").css("display", "none");
        $(".File-Info-Download").css("visibility", "visible");
      });
      waitUntilElementSelector_async("a#downloadbtn").then((btn) => {
        btn?.addEventListener(
          "click",
          function () {
            this.textContent = "Loading... Please Wait";
          },
          false
        );
        btn?.click();
      });
      waitUntilElementSelector_async("form#DownloadForm").then(() => {
        googleRecaptchaListener("form#DownloadForm").then(() => {
          document.querySelector("#Submit")?.addEventListener(
            "click",
            function () {
              this.textContent = "Loading... Please Wait";
            },
            false
          );
          document.querySelector("#Submit")?.click();
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
    restoreConsole: false,
    finalDownloadElementSelector: [[".div2 a[href^='down']"]],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      waitUntilVariable_async("grecaptcha").then(() => {
        const form = document.querySelector("form[name='myform']");
        form.insertAdjacentHTML(
          "afterbegin",
          `<input type="hidden" name="sub" value="Continue">`
        );
        googleRecaptchaListener(form);
      });
      waitUntilElementSelector_async(".div1").then(
        (div) => (div.style.display = "none")
      );
      waitUntilElementSelector_async(".div2").then((div) => {
        div.style.display = "block";
        div.querySelector("a").removeAttribute("onclick");
      });
    },
  },
  dailyuploads: {
    host: ["dailyuploads.net"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important}form[name=F1]{visibility:hidden}form[name=F1] table{visibility:visible}div.banner div.inner{display:flex;flex-direction:column;align-items:center}a[href*='.dailyuploads.net'],#downloadBtnClickOrignal{background-color:#008CBA;border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px}a[href*='.dailyuploads.net']:hover,#downloadBtnClickOrignal:hover{background-color:#0A6BD1}a[href*='.dailyuploads.net']:before{content:"Download"}`,
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
    ],
    removeByRegex: [],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    restoreWindowFunctions: ["open"],
    finalDownloadElementSelector: [["a[href*='.dailyuploads.net']"]],
    addHoverAbility: [
      ["a[href*='.dailyuploads.net']"],
      ["#downloadBtnClickOrignal"],
    ],
    addInfoBanner: [
      ["a[href*='.dailyuploads.net']", "afterend"],
      ["#downloadBtnClickOrignal", "afterend"],
    ],
    customScript() {
      waitUntilVariable_async("grecaptcha").then(() => {
        const form = document.forms.F1;
        form.removeAttribute("onsubmit");
        form.addEventListener(
          "submit",
          () => {
            document.querySelector("#downloadBtnClickOrignal").textContent =
              "Loading...";
          },
          false
        );
        el("#downloadBtnClickOrignal")?.addEventListener(
          "click",
          function () {
            this.textContent = "Loading...";
          },
          false
        );
        googleRecaptchaListener(form).then(() => {
          document.querySelector("#downloadBtnClickOrignal").textContent =
            "Loading...";
        });
      });
      curr = document.querySelector("form table").nextElementSibling;
      old = null;
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
    restoreConsole: false,
    finalDownloadElementSelector: [
      [".down a", /This direct link will be available/gi],
    ],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      document
        .querySelector(".row .col-md-4")
        ?.classList?.replace("col-md-4", "col-md-12");
      googleRecaptchaListener(document.forms.F1, 17);
    },
  },
  indishare: {
    host: ["indi-share.net"],
    customStyle: `html{background:#121212!important}body,.panelRight,h2{background:#121212!important;color:#dfdfdf!important;padding:0!important}#direct_link a{background-color:#008CBA;border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px}#direct_link a:hover{background-color:#0A6BD1}#direct_link a:before{content:"Download"}#content{display:flex;flex-direction:column;align-items:center}#container{height:inherit !important;}`,
    downloadPageCheckBySelector: ["#downloadbtn", "#direct_link a"],
    downloadPageCheckByRegex: [/direct link will be available/gi],
    remove: [
      ".sidenav",
      "#header",
      ".footerNavigation",
      "footer",
      "#direct_link a img",
    ],
    removeByRegex: [],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: true,
    restoreConsole: false,
    finalDownloadElementSelector: [["#direct_link a"]],
    addHoverAbility: [["#direct_link a"]],
    addInfoBanner: [["#direct_link", "afterend"]],
    customScript() {
      const firstBtn = document.querySelector("#downloadbtn");
      firstBtn?.removeAttribute("disabled");
      firstBtn?.click();
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
    ], //"tr:not([class])",
    removeByRegex: [["td.text", /No Additional Fees!/gi]],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    restoreConsole: false,
    finalDownloadElementSelector: [],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      document.querySelector("#download_url")?.removeAttribute("style");
      waitUntilElementSelector_async("#free_btn").then(() => {
        document.body.insertAdjacentHTML(
          "beforeend",
          `<form id="customForm" method=post><input type="hidden" name="gateway_result" value="1"/><input type="hidden" name="asm" value="0"/></form>`
        );
        document.forms.customForm.submit();
      });
      waitUntilVariable_async("hLoadForm").then(() =>
        clearInterval(window.hLoadForm)
      );
      // Skip the whole captcha process haha!!
      waitUntilVariable_async("load_form").then(() => {
        $.ajax({
          url: `/get_file.php?fid=${fid}&challenge=undefined&response=undefined&t=1`,
          success(data) {
            let tmp = $(data)
              .filter((i, e) => e.tagName == "FORM")
              .removeAttr("onsubmit");
            const dl_link = tmp.attr("action");
            backupWindowOpen(dl_link, "_self");
            $("#download_container").html(tmp);
            document.querySelector("#downloader_file_form a").href = dl_link;
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
    customStyle: `html, body, div.filepanel, .dfilename{background:#121212!important;color:#dfdfdf!important;height:inherit!important;}`,
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
    restoreConsole: false,
    finalDownloadElementSelector: [],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      // click the "Slow Download" option on page 1
      document.querySelector("#method_free")?.click();
      const captcha_box = document.querySelector("table table div");

      if (captcha_box) {
        captcha_box.style.color = "#dfdfdf";
        captcha_box.style.background = "#121212";
        const captcha_code = [...captcha_box?.children]
          .sort(
            (x, y) =>
              x.getAttribute("style").match(/padding-left:(\d+)/)?.[1] -
              y.getAttribute("style").match(/padding-left:(\d+)/)?.[1]
          )
          .map((e) => e.textContent)
          .join("");
        document.querySelector("input.captcha_code").value = captcha_code;
        setTimeout(() => {
          document.forms?.F1?.submit();
        }, document.querySelector(".seconds").textContent * 1000 || 12 * 1000);
      }
      waitUntilElementSelector_async("button#downloadbtn").then((btn) => {
        btn.click();
        const dl_link = btn
          .getAttribute("onclick")
          .replace(/window.open\('|'\);/gi, "");
        backupWindowOpen(dl_link, "_self");
      });
    },
  },
  hexupload: {
    host: ["hexupload.net"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important}#container{background:#121212!important;display:flex;flex-direction:column;justify-content:center;align-items:center}.container{background:#121212!important;display:flex;flex-direction:column;justify-content:center;align-items:center}.download_box{background-color:#323232!important}.bg-white{background:#121212!important}`,
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
    restoreConsole: false,
    finalDownloadElementSelector: [],
    addHoverAbility: undefined,
    addInfoBanner: undefined,
    customScript() {
      // document.querySelector("form[action='']")?.submit();
      document.querySelector("input[name='method_free']")?.click();
      document
        .querySelectorAll("*")
        .forEach((e) => e.setAttribute("style", ""));
      document.querySelectorAll("body > div[id]")?.[1];

      // Allow time for hCaptcha to load
      waitUntilVariable_async("hcaptcha").then(() =>
        hCaptchaListener(document.querySelector("form[name='F1']"))
      );
      waitUntilVariable_async("Tawk_Window", "app", "$el").then((ele) =>
        ele.remove()
      );
    },
  },
  veryfiles: {
    host: ["veryfiles.com"],
    customStyle: `html{background:#121212!important}body,.blockpage, .download1page .txt,.title{background:#121212!important;color:#dfdfdf!important}.download1page .blockpage .desc span,.download1page .blockpage .desc p{color:#dfdfdf!important}`,
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
    ],
    removeByRegex: [[".blockpage .row", /About APK files/i]],
    hideElements: undefined,
    removeIFrames: false,
    removeDisabledAttr: false,
    restoreConsole: false,
    finalDownloadElementSelector: [["#direct_link a"]],
    addHoverAbility: [["button#downloadbtn", true], ["#direct_link a"]],
    addInfoBanner: [
      [".blockpage", "beforeend"],
      ["#commonId", "beforeend"],
    ],
    customScript() {
      waitUntilVariable_async("grecaptcha").then(() =>
        googleRecaptchaListener(
          document.forms.F1,
          +document.querySelector(".seconds").innerText || 10
        )
      );
    },
  },
  douploads: {
    host: ["douploads.net"],
    customStyle: `html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important}#container{background:#121212!important}.download_box{background-color:#323232!important}.bg-white{background:#121212!important}body > section,html>div,.it-client{display:none!important}`,
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
    restoreWindowFunctions: ["console"],
    finalDownloadElementSelector: [
      ["div.container.page.downloadPagecol-md-4 a"],
    ],
    addHoverAbility: [
      ["button#downloadbtn", true],
      ["button#downloadBtnClick", true],
    ],
    addInfoBanner: [[document.forms.F1, "beforeend"]],
    customScript() {
      const orig = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function (type, listener) {
        if (/grecaptcha|google/.test(listener.toString())) {
          log_debug(`Allowing event type: ${type}`);
          console.log(listener);
          orig.apply(this, Array.prototype.slice.apply(arguments));
        }
        // if (/window\[window\[|console\.log/.test(listener.toString())) {
        //   log_debug(`!!!!!!!!!!Cancelling event type: ${type}`);
        //   console.log(listener);
        //   // do nothing
        else {
          log_debug(`!!!!!!!!!!Cancelling event type: ${type}`);
          console.log(listener);
          orig.apply(this, Array.prototype.slice.apply(arguments));
        }
      };
      // Styling
      document.querySelector("body").classList.remove("white");
      document.querySelector("body").classList.add("dark");
      const setStyleSheet = (url) => {
        const stylesheet = document.getElementById("stylesheet");
        stylesheet.setAttribute("href", url);
      };
      setStyleSheet("https://douploads.net/doup1/assets/styles/dark.min.css");

      // Error Checks
      if (
        /proxy not allowed/gi.test(
          document.querySelector("center div.alert.alert-danger")?.textContent
        )
      ) {
        log("Site does not like your IP address, stopping script");
        return;
      }

      // Automation
      document.querySelector("button[name='method_free']")?.click();
      waitUntilElementSelector_async("#countdown .seconds").then((seconds) => {
        seconds.innerText = 0;
      });
      waitUntilElementSelector_async("button#downloadbtn").then((dl_btn) => {
        dl_btn.removeAttribute("style");
      });
      waitUntilElementSelector_async("html > div").then((div) => {
        div.remove();
      });
      waitUntilElementSelector_async(".it-client").then((div) => {
        div.remove();
      });
      waitUntilElementSelector_async(
        "div.container.page.downloadPagecol-md-4 a"
      ).then((div) => {
        // trick to remove anonymous event listeners (malicious)
        // https://stackoverflow.com/a/32809957
        document.body.outerHTML = document.body.outerHTML;
      });
      waitUntilVariable_async("grecaptcha").then(() =>
        googleRecaptchaListener(
          document.forms.F1,
          +document.querySelector(".seconds").innerText || 30
        )
      );
      ifElementExists(
        "body > div.container.pt-5.page.downloadPage > div > div.col-md-4.mt-5",
        (query) =>
          document.querySelector(query)?.classList.replace("col-md-4", "col-12")
      );
    },
  },
};

const initCleaner = () => {
  for (const site in siteRules) {
    if (
      siteRules[site].host.some((urlMatch) => {
        if (urlMatch instanceof RegExp) {
          return Boolean(document.domain.match(urlMatch));
        } else {
          return document.domain.includes(urlMatch);
        }
      })
    ) {
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        applyRules(siteRules[site]);
      } else {
        window.addEventListener("DOMContentLoaded", () => {
          applyRules(siteRules[site]);
        });
      }
    }
  }
};

initCleaner();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
