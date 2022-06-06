var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// ==UserScript==
// @name         SiteScrubber
// @namespace    SiteScrubber
// @version      2.1.7
// @description  Scrub site of ugliness and ease the process of downloading from multiple file hosting sites!
// @author       PrimePlaya24
// @license      GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// @icon         https://github.com/PrimePlaya24/dl-site-scrubber/raw/master/assets/icons/SiteScrubber-aio_icon.png
// @homepageURL  https://github.com/PrimePlaya24/dl-site-scrubber
// @supportURL   https://github.com/PrimePlaya24/dl-site-scrubber/issues
// @updateURL    https://github.com/PrimePlaya24/dl-site-scrubber/raw/master/dist/SiteScrubber.meta.js
// @downloadURL  https://github.com/PrimePlaya24/dl-site-scrubber/raw/master/dist/SiteScrubber.user.js
// @compatible   firefox Violentmonkey
// @compatible   firefox Tampermonkey
// @compatible   chrome Violentmonkey
// @compatible   chrome Tampermonkey
// @include      /^(?:https?:\/\/)?(?:www\.)?dropapk\.(to|com)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?drop\.download\//
// @include      /^(?:https?:\/\/)?(?:www\.)?mixloads\.com//
// @include      /^(?:https?:\/\/)?(?:www\.)?financemonk\.net\//
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
// @include      /^(?:https?:\/\/)?(?:www\.)?tusfiles\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?centfile\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?short\.katflys\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?fastclick\.to\//
// @include      /^(?:https?:\/\/)?(?:www\.)?chedrive\.(com|net)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?nitro\.download\//
// @include      /^(?:https?:\/\/)?(?:www\.)?checkurl\.(org|me)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?intoupload\.net\//
// @include      /^(?:https?:\/\/)?(?:www\.)?filerio\.in\//
// @include      /^(?:https?:\/\/)?(?:www\.)?filelox\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?ddownload\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?apk\.miuiku\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?uploadydl\.com\//
// @include      /^(?:https?:\/\/)?(?:www\.)?dropgalaxy\.(com)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?beingupdated\.(com)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?gplinks\.(co)\//
// @include      /^(?:https?:\/\/)?(?:www\.)?mynewsmedia\.(co)\//
// @run-at       document-start
// @grant        none
// ==/UserScript==
var SiteScrubber = /** @class */ (function () {
    function SiteScrubber(rules) {
        this.o_debug = true;
        this.ssButtonWatchDog = true;
        this.window = window;
        this.document = window.document;
        this.logNative = window.console.log;
        this.console = window.console;
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
        this.ssCSSStyles = ".ss-alert{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc;width:100%;padding:15px;margin-bottom:20px;border:1px solid transparent;border-radius:4px;text-align:center}.ss-mt-5{margin-top:5em}.ss-btn{display:inline-block;padding:24px 32px;font-family:\"Lucida Sans\",\"Lucida Sans Regular\",\"Lucida Grande\",\"Lucida Sans Unicode\",Geneva,Verdana,sans-serif;border:unset;color:#dfdfdf;text-transform:uppercase;font-size:24px;letter-spacing:.15em;transition:width .1s linear;position:relative;overflow:hidden;z-index:1;cursor:pointer}.ss-btn:active{transform:scale(.975)}.ss-btn:focus{outline:0}.ss-w-100{width:100%}.ss-btn-ready:after{content:\"\";position:absolute;bottom:0;left:0;width:100%;height:100%;transition:width .1s linear;z-index:-2}.ss-btn-ready:before{content:\"\";position:absolute;bottom:0;left:0;width:0%;height:100%;background-color:#11a800;transition:width .1s linear;transition:opacity .1s linear;z-index:-1}.ss-btn-ready:hover:before{width:100%;transition:width 2s linear}.ss-animated-button:active{transform:scale(.975)}.ss-animated-button:focus{outline:0}.ss-animated-button{background:linear-gradient(-30deg,#530000 50%,#340000 50%);padding:20px 40px;margin:12px;display:inline-block;-webkit-transform:translate(0,0);transform:translate(0,0);overflow:hidden;color:#f7d4d4;font-size:20px;letter-spacing:2.5px;text-align:center;text-transform:uppercase;text-decoration:none;-webkit-box-shadow:0 20px 50px rgba(0,0,0,.5);box-shadow:0 20px 50px rgba(0,0,0,.5);font-family:\"Lucida Sans\",\"Lucida Sans Regular\",\"Lucida Grande\",\"Lucida Sans Unicode\",Geneva,Verdana,sans-serif;border:unset;transition:width .1s linear;position:relative;z-index:1;cursor:pointer}.ss-animated-button.ss-btn-ready{background:linear-gradient(-30deg,#0e5300 50%,#093400 50%);color:#d5f7d4}.ss-animated-button:not(.ss-btn-ready)::before{content:\"Not Ready\";position:absolute;top:0;left:0;width:100%;font-size:16px;height:100%;opacity:0;-webkit-transition:.2s opacity ease-in-out;transition:.2s opacity ease-in-out}.ss-animated-button:hover::before{opacity:.2}.ss-animated-button span{position:absolute}.ss-animated-button span:nth-child(1){top:0;left:0;width:100%;height:2px;-webkit-animation:2s animateTop linear infinite;animation:2s animateTop linear infinite}.ss-animated-button:not(.ss-btn-ready) span:nth-child(1){background:-webkit-gradient(linear,right top,left top,from(rgba(43,8,8,0)),to(#d92626));background:linear-gradient(to left,rgba(43,8,8,0),#d92626)}.ss-animated-button.ss-btn-ready span:nth-child(1){background:-webkit-gradient(linear,right top,left top,from(rgba(14,43,8,0)),to(#01ce0b));background:linear-gradient(to left,rgba(14,43,8,0),#01ce0b)}.ss-animated-button span:nth-child(2){top:0;right:0;height:100%;width:2px;-webkit-animation:2s animateRight linear -1s infinite;animation:2s animateRight linear -1s infinite}.ss-animated-button:not(.ss-btn-ready) span:nth-child(2){background:-webkit-gradient(linear,left bottom,left top,from(rgba(43,8,8,0)),to(#d92626));background:linear-gradient(to top,rgba(43,8,8,0),#d92626)}.ss-animated-button.ss-btn-ready span:nth-child(2){background:-webkit-gradient(linear,left bottom,left top,from(rgba(14,43,8,0)),to(#01ce0b));background:linear-gradient(to top,rgba(14,43,8,0),#01ce0b)}.ss-animated-button span:nth-child(3){bottom:0;left:0;width:100%;height:2px;-webkit-animation:2s animateBottom linear infinite;animation:2s animateBottom linear infinite}.ss-animated-button:not(.ss-btn-ready) span:nth-child(3){background:-webkit-gradient(linear,left top,right top,from(rgba(43,8,8,0)),to(#d92626));background:linear-gradient(to right,rgba(43,8,8,0),#d92626)}.ss-animated-button.ss-btn-ready span:nth-child(3){background:-webkit-gradient(linear,left top,right top,from(rgba(14,43,8,0)),to(#01ce0b));background:linear-gradient(to right,rgba(14,43,8,0),#01ce0b)}.ss-animated-button span:nth-child(4){top:0;left:0;height:100%;width:2px;-webkit-animation:2s animateLeft linear -1s infinite;animation:2s animateLeft linear -1s infinite}.ss-animated-button:not(.ss-btn-ready) span:nth-child(4){background:-webkit-gradient(linear,left top,left bottom,from(rgba(43,8,8,0)),to(#d92626));background:linear-gradient(to bottom,rgba(43,8,8,0),#d92626)}.ss-animated-button.ss-btn-ready span:nth-child(4){background:-webkit-gradient(linear,left top,left bottom,from(rgba(14,43,8,0)),to(#01ce0b));background:linear-gradient(to bottom,rgba(14,43,8,0),#01ce0b)}@keyframes animateBottom{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}@keyframes animateLeft{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(100%);transform:translateY(100%)}}@keyframes animateTop{0%{-webkit-transform:translateX(100%);transform:translateX(100%)}100%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}}@keyframes animateRight{0%{-webkit-transform:translateY(100%);transform:translateY(100%)}100%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}}";
        this.console.groupCollapsed = window.console.groupCollapsed;
        this.console.groupEnd = window.console.groupEnd;
        this.currSiteRules = rules;
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
        this.ssCSSStyles = ".ss-alert{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc;width:100%;padding:15px;margin-bottom:20px;border:1px solid transparent;border-radius:4px;text-align:center}.ss-mt-5{margin-top:5em}.ss-btn{display:inline-block;padding:24px 32px;font-family:\"Lucida Sans\",\"Lucida Sans Regular\",\"Lucida Grande\",\"Lucida Sans Unicode\",Geneva,Verdana,sans-serif;border:unset;color:#dfdfdf;text-transform:uppercase;font-size:24px;letter-spacing:.15em;transition:width .1s linear;position:relative;overflow:hidden;z-index:1;cursor:pointer}.ss-btn:active{transform:scale(.975)}.ss-btn:focus{outline:0}.ss-w-100{width:100%}.ss-btn-ready:after{content:\"\";position:absolute;bottom:0;left:0;width:100%;height:100%;transition:width .1s linear;z-index:-2}.ss-btn-ready:before{content:\"\";position:absolute;bottom:0;left:0;width:0%;height:100%;background-color:#11a800;transition:width .1s linear;transition:opacity .1s linear;z-index:-1}.ss-btn-ready:hover:before{width:100%;transition:width 2s linear}.ss-animated-button:active{transform:scale(.975)}.ss-animated-button:focus{outline:0}.ss-animated-button{background:linear-gradient(-30deg,#530000 50%,#340000 50%);padding:20px 40px;margin:12px;display:inline-block;-webkit-transform:translate(0,0);transform:translate(0,0);overflow:hidden;color:#f7d4d4;font-size:20px;letter-spacing:2.5px;text-align:center;text-transform:uppercase;text-decoration:none;-webkit-box-shadow:0 20px 50px rgba(0,0,0,.5);box-shadow:0 20px 50px rgba(0,0,0,.5);font-family:\"Lucida Sans\",\"Lucida Sans Regular\",\"Lucida Grande\",\"Lucida Sans Unicode\",Geneva,Verdana,sans-serif;border:unset;transition:width .1s linear;position:relative;z-index:1;cursor:pointer}.ss-animated-button.ss-btn-ready{background:linear-gradient(-30deg,#0e5300 50%,#093400 50%);color:#d5f7d4}.ss-animated-button:not(.ss-btn-ready)::before{content:\"Not Ready\";position:absolute;top:0;left:0;width:100%;font-size:16px;height:100%;opacity:0;-webkit-transition:.2s opacity ease-in-out;transition:.2s opacity ease-in-out}.ss-animated-button:hover::before{opacity:.2}.ss-animated-button span{position:absolute}.ss-animated-button span:nth-child(1){top:0;left:0;width:100%;height:2px;-webkit-animation:2s animateTop linear infinite;animation:2s animateTop linear infinite}.ss-animated-button:not(.ss-btn-ready) span:nth-child(1){background:-webkit-gradient(linear,right top,left top,from(rgba(43,8,8,0)),to(#d92626));background:linear-gradient(to left,rgba(43,8,8,0),#d92626)}.ss-animated-button.ss-btn-ready span:nth-child(1){background:-webkit-gradient(linear,right top,left top,from(rgba(14,43,8,0)),to(#01ce0b));background:linear-gradient(to left,rgba(14,43,8,0),#01ce0b)}.ss-animated-button span:nth-child(2){top:0;right:0;height:100%;width:2px;-webkit-animation:2s animateRight linear -1s infinite;animation:2s animateRight linear -1s infinite}.ss-animated-button:not(.ss-btn-ready) span:nth-child(2){background:-webkit-gradient(linear,left bottom,left top,from(rgba(43,8,8,0)),to(#d92626));background:linear-gradient(to top,rgba(43,8,8,0),#d92626)}.ss-animated-button.ss-btn-ready span:nth-child(2){background:-webkit-gradient(linear,left bottom,left top,from(rgba(14,43,8,0)),to(#01ce0b));background:linear-gradient(to top,rgba(14,43,8,0),#01ce0b)}.ss-animated-button span:nth-child(3){bottom:0;left:0;width:100%;height:2px;-webkit-animation:2s animateBottom linear infinite;animation:2s animateBottom linear infinite}.ss-animated-button:not(.ss-btn-ready) span:nth-child(3){background:-webkit-gradient(linear,left top,right top,from(rgba(43,8,8,0)),to(#d92626));background:linear-gradient(to right,rgba(43,8,8,0),#d92626)}.ss-animated-button.ss-btn-ready span:nth-child(3){background:-webkit-gradient(linear,left top,right top,from(rgba(14,43,8,0)),to(#01ce0b));background:linear-gradient(to right,rgba(14,43,8,0),#01ce0b)}.ss-animated-button span:nth-child(4){top:0;left:0;height:100%;width:2px;-webkit-animation:2s animateLeft linear -1s infinite;animation:2s animateLeft linear -1s infinite}.ss-animated-button:not(.ss-btn-ready) span:nth-child(4){background:-webkit-gradient(linear,left top,left bottom,from(rgba(43,8,8,0)),to(#d92626));background:linear-gradient(to bottom,rgba(43,8,8,0),#d92626)}.ss-animated-button.ss-btn-ready span:nth-child(4){background:-webkit-gradient(linear,left top,left bottom,from(rgba(14,43,8,0)),to(#01ce0b));background:linear-gradient(to bottom,rgba(14,43,8,0),#01ce0b)}@keyframes animateBottom{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}@keyframes animateLeft{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(100%);transform:translateY(100%)}}@keyframes animateTop{0%{-webkit-transform:translateX(100%);transform:translateX(100%)}100%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}}@keyframes animateRight{0%{-webkit-transform:translateY(100%);transform:translateY(100%)}100%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}}";
    }
    SiteScrubber.prototype.setup = function () {
        var _this_1 = this;
        var _a;
        this.logDebug("Initializing SiteScrubber...");
        this.console.groupCollapsed("ss-destroyWindowFunctions");
        this.destroyWindowFunctions((_a = this.currSiteRules) === null || _a === void 0 ? void 0 : _a.destroyWindowFunctions);
        this.console.groupEnd();
        this.addCustomCSSStyle(this.ssCSSStyles);
        // Wait till page is ready for the rest
        if (this.ssButtonWatchDog === true) {
            // Ready, so click/submit
            this.waitUntilSelector(".ss-btn-ready").then(function (ssBtn) {
                _this_1.log("WOULD'VE CLICKED ss-btn", ssBtn);
                ssBtn.click();
            });
        }
        if (["complete", "interactive"].indexOf(document.readyState) > -1) {
            this.logDebug("Site is ready, applying rules...");
            this.applyRules();
        }
        else {
            this.logDebug("Waiting to apply rules once page is ready. Event listener added.");
            this.origAddEventListener.apply(window, [
                "DOMContentLoaded",
                function () {
                    _this_1.applyRules();
                    _this_1.logDebug("Site is ready, applying rules...");
                },
            ]);
        }
        return this;
    };
    SiteScrubber.prototype.log = function (str) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (data.length > 0) {
            this.logNative("[SS-LOG] ".concat(str), data);
        }
        else {
            this.logNative("[SS-LOG] ".concat(str));
        }
    };
    SiteScrubber.prototype.logDebug = function (str) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (this.o_debug) {
            if (data.length > 0) {
                this.logNative("[SS-DEBUG] ".concat(str), data);
            }
            else {
                this.logNative("[SS-DEBUG] ".concat(str));
            }
        }
    };
    SiteScrubber.prototype.logDebugNaked = function (str) {
        if (this.o_debug)
            this.logNative(str);
    };
    SiteScrubber.prototype.ifElementExists = function (query, fn) {
        if (fn === void 0) { fn = function () { return void 0; }; }
        return this.$(query) && fn(this.$(query));
    };
    SiteScrubber.prototype.addCustomCSSStyle = function (cssStr) {
        if (!cssStr) {
            return;
        }
        this.logDebug("Adding custom CSS styles");
        // make new <style> element
        var newNode = this.document.createElement("style");
        // set the inner text to the user input
        newNode.textContent = cssStr;
        // select where to place our <style> element
        var targ = this.document.head || this.document.body || this.document.documentElement;
        // check if script beat the page loading
        if (targ === null) {
            return false;
        }
        // append our <style> element to the page
        targ === null || targ === void 0 ? void 0 : targ.appendChild(newNode);
        return true;
    };
    SiteScrubber.prototype.waitUntilSelector = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return __generator(this, function (_a) {
                this.logDebug("Waiting for selector: ".concat(selector));
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var element = _this_1.$(selector);
                        if (element) {
                            _this_1.logDebug("Found element matching selector: ".concat(selector));
                            resolve(element);
                            return;
                        }
                        var observer = new MutationObserver(function (mutations) {
                            mutations.forEach(function (mutation) {
                                var nodes = __spreadArray([mutation.target], mutation.addedNodes, true);
                                for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                                    var node = nodes_1[_i];
                                    if (node.matches && node.matches(selector)) {
                                        observer.disconnect();
                                        _this_1.logDebug("Observed element matches selector: ".concat(selector));
                                        resolve(node);
                                        return;
                                    }
                                }
                            });
                        });
                        observer.observe(document.documentElement, {
                            childList: true,
                            subtree: true,
                            attributes: true
                        });
                    })];
            });
        });
    };
    SiteScrubber.prototype.waitUntilGlobalVariable = function () {
        var variableNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variableNames[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var curr, _a, variableNames_1, k;
            var _this_1 = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logDebug("Waiting for global variable: window.".concat(variableNames.join(".")));
                        curr = window;
                        _b.label = 1;
                    case 1:
                        if (!(curr == window || curr == undefined)) return [3 /*break*/, 3];
                        curr = window;
                        for (_a = 0, variableNames_1 = variableNames; _a < variableNames_1.length; _a++) {
                            k = variableNames_1[_a];
                            if (curr == undefined)
                                break;
                            curr = curr === null || curr === void 0 ? void 0 : curr[k];
                        }
                        // if not found, wait and check again in 500 milliseconds
                        return [4 /*yield*/, new Promise(function (r) { return _this_1.origSetTimeout(r, 500); })];
                    case 2:
                        // if not found, wait and check again in 500 milliseconds
                        _b.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        this.logDebug("Found global variable: window.".concat(variableNames.join(".")));
                        return [2 /*return*/, new Promise(function (resolve) {
                                // resolve/return the found element
                                resolve(curr);
                            })];
                }
            });
        });
    };
    SiteScrubber.prototype.removeElements = function (elements) {
        var _this_1 = this;
        if (!elements) {
            return;
        }
        this.logDebug("Running removeElements");
        var elementsToRemove = [];
        if (typeof elements == "string" || elements instanceof String) {
            // add it to an array so we can use Array functions
            elementsToRemove.push(elements);
        }
        this._removeElementWatcherList = elementsToRemove;
        elementsToRemove.forEach(function (e) {
            if (typeof e == "string" || e instanceof String) {
                // remove found elements
                _this_1.$$(e).forEach(function (ele) {
                    if (!ele.querySelector(".g-recaptcha, .h-captcha")) {
                        ele.remove();
                    }
                });
                // this.$$(e).forEach((ele) => (ele.style.display = "none"));
            }
            else if (e instanceof HTMLElement) {
                // remove HTMLElement
                e.remove();
            }
        });
    };
    SiteScrubber.prototype.removeElementsByRegex = function (_a) {
        var query = _a.query, regex = _a.regex;
        if (!query) {
            return;
        }
        this.logDebug("Running removeElementsByRegex");
        this.$$(query).forEach(function (ele) {
            if (regex.test(ele.innerText)) {
                // remove found elements if RegEx matches
                ele.remove();
            }
        });
    };
    SiteScrubber.prototype.addJQuery = function () {
        var s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
        var targ = this.document.head || this.document.body || this.document.documentElement;
        targ.appendChild(s);
    };
    SiteScrubber.prototype.addInterval = function (_a) {
        var fn = _a.fn, interval = _a.interval, customID = _a.customID;
        var error = false;
        if ("function" !== typeof fn) {
            this.logDebug("addInterval() - Bad function input");
            error = true;
        }
        else if ("number" !== typeof interval) {
            this.logDebug("addInterval() - Bad interval input");
            error = true;
        }
        else if ("string" !== typeof customID) {
            this.logDebug("addInterval() - Bad customID input");
            error = true;
        }
        if (error) {
            this.logDebugNaked(arguments);
            return;
        }
        var id = this.origSetInterval(fn, interval);
        this._intervals[customID || id] = {
            fn: fn.toString(),
            interval: interval,
            id: id,
            customID: customID
        };
        return id;
    };
    SiteScrubber.prototype.removeInterval = function (id) {
        var interval = this._intervals[id]["id"];
        if (interval) {
            delete this._intervals[id];
            return this.origClearInterval(interval);
        }
        else {
            this.logDebug("removeInterval() - Failed to remove interval with ID: ".concat(id));
        }
    };
    SiteScrubber.prototype.addTimeout = function (_a) {
        var fn = _a.fn, timeout = _a.timeout, customID = _a.customID;
        var error = false;
        if ("function" !== typeof fn) {
            this.logDebug("addTimeout() - Bad function input");
            error = true;
        }
        else if ("number" !== typeof timeout) {
            this.logDebug("addTimeout() - Bad timeout input");
            error = true;
        }
        else if ("string" !== typeof customID ||
            !(customID instanceof String)) {
            this.logDebug("addTimeout() - Bad customID input");
            error = true;
        }
        if (error) {
            this.logDebugNaked(arguments);
            return;
        }
        var id = this.origSetTimeout(fn, timeout);
        this._timeouts[customID || id] = {
            fn: fn.toString(),
            timeout: timeout,
            id: id,
            customID: customID
        };
        return customID || id;
    };
    SiteScrubber.prototype.removeTimeout = function (id) {
        var timeout = this._timeouts[id]["id"];
        if (timeout) {
            delete this._timeouts[id];
            return this.origClearTimeout(timeout);
        }
        else {
            this.logDebug("removeTimeout() - Failed to remove timeout with ID: ".concat(id));
        }
    };
    SiteScrubber.prototype.addListener = function (_a) {
        var element = _a.element, event = _a.event, listener = _a.listener, options = _a.options;
        var error = false;
        if ("string" !== typeof event) {
            this.logDebug("addListener() - Bad event input");
            error = true;
        }
        else if ("function" !== typeof listener) {
            this.logDebug("addListener() - Bad listener input");
            error = true;
        }
        if (error) {
            this.logDebugNaked(arguments[0]);
            return;
        }
        var el = element;
        if (!(el === null || el === void 0 ? void 0 : el.trackedEvents)) {
            el.trackedEvents = {};
        }
        if (!el.trackedEvents[event]) {
            el.trackedEvents[event] = listener;
        }
        else if (el.trackedEvents[event].toString() == listener.toString()) {
            this.logDebug("addListener() - event '".concat(event, "' already added"));
            this.logDebugNaked(arguments[0]);
            return;
        }
        this._listeners.push(arguments[0]);
        return this.origAddEventListener.bind(el)(event, listener, options || false);
    };
    SiteScrubber.prototype.removeListener = function (_a) {
        var element = _a.element, event = _a.event;
        if (!(element === null || element === void 0 ? void 0 : element.trackedEvents)) {
            this.logDebug("removeListener() - No events found");
            return;
        }
        var el = element;
        var listener = el.trackedEvents[event];
        delete el.trackedEvents[event];
        var removeObj = this._listeners.find(function (x) { return x.element == el && x.listener == listener; });
        this._listeners = this._listeners.filter(function (x) { return x != removeObj; });
        return el.removeEventListener(event, listener);
    };
    SiteScrubber.prototype.addGoogleRecaptchaJS = function () {
        var script = this.document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        this.document.body.appendChild(script);
    };
    SiteScrubber.prototype.createGoogleRecaptcha = function (elementTarget, site_key, position) {
        if (position === void 0) { position = "beforeend"; }
        return __awaiter(this, void 0, void 0, function () {
            var target;
            return __generator(this, function (_a) {
                target = this.getDOMElement(elementTarget);
                if (target === null) {
                    this.logDebug("createGoogleRecaptcha - failed to find element");
                    return [2 /*return*/];
                }
                this.logDebug("createGoogleRecaptcha() - element to add under");
                this.logDebugNaked(target);
                this.addGoogleRecaptchaJS();
                this.waitUntilGlobalVariable("grecaptcha").then(function () {
                    target.insertAdjacentHTML(position, "<div id=\"ss-recaptcha\" data-sitekey=\"".concat(site_key, "\" data-starttime=\"").concat(+new Date(), "\"></div>"));
                    // @ts-ignore
                    grecaptcha.render("ss-recaptcha", {
                        sitekey: site_key
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    SiteScrubber.prototype.removeIFrames = function () {
        this.log("Removing unwanted scripts from page");
        var i = 0;
        this.$$("iframe").forEach(function (iframe) {
            if (!/google/gi.test(iframe.src)) {
                iframe.remove();
                i++;
            }
        });
        this.logDebug("Removed ".concat(i, " iFrames"));
    };
    SiteScrubber.prototype.removeDisabledAttr = function () {
        this.log("Enabling all buttons");
        this.$$("*").forEach(function (e) {
            e.removeAttribute("disabled");
        });
    };
    SiteScrubber.prototype.sleep = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_a) {
                _this = this;
                return [2 /*return*/, new Promise(function (resolve) { return _this.origSetTimeout(resolve, ms); })];
            });
        });
    };
    SiteScrubber.prototype.findParentElementByTagName = function (el, tagName) {
        var tag = tagName.toLowerCase();
        while (el && el.parentNode) {
            el = el.parentNode;
            if (el.tagName && el.tagName.toLowerCase() == tag) {
                return el;
            }
        }
        return null;
    };
    SiteScrubber.prototype.checkIfDownloadPage = function (arrayOfSelectors, arrayOfRegexTests) {
        var _this_1 = this;
        if (arrayOfSelectors === void 0) { arrayOfSelectors = []; }
        if (arrayOfRegexTests === void 0) { arrayOfRegexTests = []; }
        if ((arrayOfSelectors instanceof Array &&
            arrayOfSelectors.some(function (selector) {
                return Boolean(_this_1.document.querySelector(selector));
            })) ||
            (arrayOfRegexTests instanceof Array &&
                arrayOfRegexTests.some(function (regex) {
                    return regex === null || regex === void 0 ? void 0 : regex.test(_this_1.document.documentElement.innerHTML);
                }))) {
            this.logDebug("Found something! Assuming this is a download page!");
            return true;
        }
        this.logDebug("Found nothing! Skipping this page. Not a downloading page.");
        this.logDebug("checkIfDownloadPage() - ".concat(arrayOfSelectors, ", ").concat(arrayOfRegexTests));
        return false;
    };
    SiteScrubber.prototype.isElement = function (element) {
        return element instanceof Element;
    };
    SiteScrubber.prototype.isQueryString = function (query) {
        return (!this.isElement(query) &&
            (typeof query == "string" || query instanceof String));
    };
    SiteScrubber.prototype.isEmptyObject = function (obj) {
        return JSON.stringify(obj) === "{}";
    };
    SiteScrubber.prototype.isEmptyArray = function (arr) {
        return JSON.stringify(arr) === "[]";
    };
    SiteScrubber.prototype.isNothing = function (x) {
        return (void 0 === x ||
            null === x ||
            x === "" ||
            this.isEmptyArray(x) ||
            this.isEmptyObject(x));
    };
    SiteScrubber.prototype.getDOMElement = function (request) {
        if (this.isElement(request)) {
            return request;
        }
        else if (typeof request == "string" && this.isQueryString(request)) {
            return this.$(request);
        }
        return null;
    };
    SiteScrubber.prototype.addHoverAbility = function (element, requireCaptcha) {
        var _this_1 = this;
        if (requireCaptcha === void 0) { requireCaptcha = false; }
        if (!element) {
            return;
        }
        var addEvent = function (element) {
            var fn = function () { };
            if (requireCaptcha) {
                fn = function () {
                    element.dataset.timeout = _this_1.origSetTimeout(function () {
                        var _a, _b;
                        if (_this_1.countdownSecondsLeft === 0 &&
                            (
                            // @ts-ignore
                            (_b = (_a = window.grecaptcha) === null || _a === void 0 ? void 0 : _a.getResponse) === null || _b === void 0 ? void 0 : _b.call(_a))) {
                            element.click();
                        }
                    }, 2000);
                };
            }
            else {
                fn = function () {
                    element.dataset.timeout = _this_1.origSetTimeout(function () {
                        if (_this_1.countdownSecondsLeft === 0) {
                            element.click();
                        }
                    }, 2000);
                };
            }
            // this.origAddEventListener.bind(element)("mouseenter", fn, false);
            _this_1.addListener({
                element: element,
                event: "mouseenter",
                listener: fn,
                options: false
            });
            _this_1.logDebug("Added 'mouseenter' event to ".concat(element.innerHTML));
            // this.origAddEventListener.bind(element)(
            //   "mouseleave",
            //   () => {
            //     clearTimeout(element.dataset.timeout);
            //   },
            //   false
            // );
            _this_1.addListener({
                element: element,
                event: "mouseleave",
                listener: function () {
                    clearTimeout(element.dataset.timeout);
                },
                options: false
            });
            _this_1.logDebug("Added 'mouseleave' event to ".concat(element.innerHTML));
        };
        // if (typeof element == "string" || element instanceof String) {
        //   element = [element];
        // }
        if (!Array.isArray(element)) {
            element = [element];
        }
        __spreadArray([], element, true).forEach(function (e) {
            if (typeof e == "string" || e instanceof String) {
                _this_1.$$(e).forEach(addEvent);
            }
            else if (e instanceof HTMLElement) {
                addEvent(e);
            }
        });
    };
    SiteScrubber.prototype.addInfoBanner = function (_a) {
        var targetElement = _a.targetElement, _b = _a.where, where = _b === void 0 ? "beforeend" : _b;
        if (targetElement instanceof HTMLElement) {
            // Already an HTMLElement
        }
        else if (typeof targetElement == "string" ||
            targetElement instanceof String) {
            targetElement = this.$(targetElement);
        }
        if (!targetElement) {
            return;
        }
        this.logDebug("Adding SiteScrubber hover info banner");
        var newNode = "<div class=\"ss-alert ss-mt-5\">TO PREVENT MALICIOUS REDIRECT, <b>HOVER</b> OVER THE BUTTON FOR 2 SECONDS TO SUBMIT CLEANLY</div>";
        targetElement.insertAdjacentHTML(where, newNode);
        this.logDebug("addInfoBanner() - elementToAddTo: ".concat(targetElement, ", ").concat(where));
    };
    SiteScrubber.prototype.destroyWindowFunctions = function (options) {
        if (options === void 0) { options = []; }
        this.logDebug("Destroying window functions: [".concat(options.join(", "), "]"));
        if (void 0 === options || options.length == 0) {
            return;
        }
        var whitelist = [
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
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            // window[option] = function () {};
            if (whitelist.includes(option)) {
                this.logDebug("Skipping destroy of ".concat(option));
                continue;
            }
            else if (option) {
            }
            try {
                this.window.Object.defineProperty(this.window, option, {
                    configurable: false,
                    set: function () {
                        return function () { };
                    },
                    get: function () {
                        return function () { };
                    }
                });
                this.logDebug("Destoyed window function: 'window.".concat(option, "'"));
            }
            catch (e) {
                this.logDebug("FAILED to destroy window function: 'window.".concat(option, "'"));
                this.logDebug(e);
            }
        }
    };
    SiteScrubber.prototype.interceptAddEventListeners = function (fn) {
        this.log("Adding addEventListener hook");
        var _this = this;
        EventTarget.prototype.addEventListener = function (event, listener, bubbling) {
            var allow = true;
            if (listener === null) {
                return;
            }
            if (fn !== undefined && typeof fn === "function") {
                allow = !!fn.apply(this, arguments);
            }
            else if (/grecaptcha|google/.test(listener.toString())) {
                allow = true;
            }
            else if (event === "click" ||
                event === "mousedown" ||
                event === "mouseup" ||
                event === "onunload" ||
                event === "beforeunload") {
                allow = false;
            }
            if (allow) {
                _this.logDebug("Allowing event type: ".concat(event));
                _this.logDebugNaked(listener);
                _this.origAddEventListener.apply(this, arguments);
            }
            else {
                _this.logDebug("Intercepted attaching event listener: '".concat(event, "'"));
            }
        };
    };
    SiteScrubber.prototype.interceptAJAX = function (fn) {
        this.log("Adding AJAX hook");
        var _this = this;
        this.waitUntilGlobalVariable("jQuery").then(function () {
            var _a;
            // @ts-ignore
            var origAJAX = (_a = window.jQuery) === null || _a === void 0 ? void 0 : _a.ajax;
            // @ts-ignore
            window.jQuery.origAJAX = origAJAX;
            // @ts-ignore
            window.jQuery.ajax = function () {
                var _a, _b, _c;
                var allow = true;
                if (fn !== undefined && typeof fn === "function") {
                    allow = !!fn.apply(this, arguments);
                }
                else if (((_b = (_a = arguments === null || arguments === void 0 ? void 0 : arguments[0]) === null || _a === void 0 ? void 0 : _a.url) === null || _b === void 0 ? void 0 : _b.search("xxx")) > -1) {
                    allow = false;
                }
                if (allow) {
                    return origAJAX.apply(this, arguments);
                }
                else {
                    _this.log("Stopped AJAX call");
                    _this.logDebug("Blocked: ".concat((_c = arguments === null || arguments === void 0 ? void 0 : arguments[0]) === null || _c === void 0 ? void 0 : _c.url));
                }
            };
        });
    };
    SiteScrubber.prototype.interceptXMLHttpRequest = function (fn) {
        this.log("Adding XMLHttpRequest hook");
        var _this = this;
        var origXMLHttpRequest = window.XMLHttpRequest;
        window.origXMLHttpRequest = origXMLHttpRequest;
        window.origXMLHttpRequest.prototype.open =
            origXMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function () {
            var _a, _b, _c;
            var allow = true;
            if (fn !== undefined && typeof fn === "function") {
                allow = !!fn.apply(this, arguments);
            }
            else if (((_b = (_a = arguments === null || arguments === void 0 ? void 0 : arguments[0]) === null || _a === void 0 ? void 0 : _a.url) === null || _b === void 0 ? void 0 : _b.search("xxx")) > -1) {
                allow = false;
            }
            if (allow) {
                return origXMLHttpRequest.prototype.open.apply(this, arguments);
            }
            else {
                _this.log("Stopped origXMLHttpRequest call");
                _this.logDebug("Blocked: ".concat((_c = arguments === null || arguments === void 0 ? void 0 : arguments[0]) === null || _c === void 0 ? void 0 : _c.url));
            }
        };
    };
    SiteScrubber.prototype.interceptPreventDefault = function (fn) {
        this.log("Adding preventDefault hook");
        var _this = this;
        var origPreventDefault = Event.prototype.preventDefault;
        this.window.origPreventDefault = origPreventDefault;
        Event.prototype.preventDefault = function () {
            var allow = true;
            if (fn !== undefined && typeof fn === "function") {
                allow = !!fn.apply(this, arguments);
            }
            if (allow) {
                return origPreventDefault.apply(this, arguments);
            }
            else {
                _this.log("Stopped preventDefault call");
            }
        };
    };
    SiteScrubber.prototype.interceptAppendChild = function (fn) {
        var _this = this;
        var customAppendChild = function (node) {
            var allow = true;
            if (fn !== undefined && typeof fn === "function") {
                allow = !!fn.apply(this, arguments);
            }
            else if (node.tagName === "SCRIPT" ||
                node.tagName === "IFRAME" ||
                node.tagName === "LINK") {
                if (!/grecaptcha|google\./gi.test(node.src)) {
                    allow = false;
                }
            }
            else if (node.style.zIndex === "2147483647") {
                allow = false;
            }
            if (allow) {
                _this.logDebug("Allowing appending child: ".concat(node.tagName));
                return _this.origAppendChild.apply(this, arguments);
            }
            else {
                _this.logDebug("Intercepted attaching event listener: '".concat(node.tagName, "'"));
            }
        };
        HTMLElement.prototype.appendChild = customAppendChild;
        _this.document.appendChild = customAppendChild;
    };
    SiteScrubber.prototype.createCountdown = function (_a) {
        var _this_1 = this;
        var element = _a.element, timer = _a.timer;
        var el = this.getDOMElement(element);
        if (!this.isElement(el)) {
            this.logDebug("createCountdown - failed to find element");
            this.logDebugNaked(arguments);
            return;
            el = this.document.createElement("i");
        }
        else if (timer) {
            el.innerText = timer;
        }
        else {
            timer = +(el === null || el === void 0 ? void 0 : el.innerText) || 30;
        }
        this.logDebug("createCountdown - found element, creating timer");
        this.countdownSecondsLeft = timer;
        var tick = function () {
            var remaining = --_this_1.countdownSecondsLeft;
            var ele = _this_1.getDOMElement(el) || _this_1.document.createElement("i");
            ele.innerText = remaining;
            if (remaining <= 0) {
                _this_1.removeInterval("countdown-interval");
            }
            else {
                _this_1.logDebug("Tick: ".concat(remaining));
            }
        };
        this.addInterval({
            fn: tick,
            interval: 1000,
            customID: "countdown-interval"
        });
    };
    SiteScrubber.prototype.copyAttributesFromElement = function (sourceElement, targetElement) {
        if (sourceElement instanceof HTMLElement &&
            targetElement instanceof HTMLElement) {
            __spreadArray([], sourceElement.attributes, true).forEach(function (attr) {
                targetElement.setAttribute(attr.nodeName, attr.nodeValue);
            });
        }
        else {
            this.log("copyAttributesFromElement() - failed to copy attributes with given elements");
            this.logDebugNaked(sourceElement);
            this.logDebugNaked(targetElement);
        }
    };
    SiteScrubber.prototype.modifyButton = function (button, _a) {
        var _this_1 = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.replaceWithForm, replaceWithForm = _c === void 0 ? false : _c, replaceWithTag = _b.replaceWithTag, copyAttributesFromElement = _b.copyAttributesFromElement, customText = _b.customText, className = _b.className, props = _b.props, styles = _b.styles, attributes = _b.attributes, eventHandlers = _b.eventHandlers, makeListener = _b.makeListener, requiresCaptcha = _b.requiresCaptcha, requiresTimer = _b.requiresTimer, addHoverAbility = _b.addHoverAbility, _d = _b.moveTo, moveTo = _d === void 0 ? {
            target: undefined,
            position: undefined,
            findParentByTag: undefined
        } : _d, _e = _b.fn, fn = _e === void 0 ? function () { } : _e;
        button = this.getDOMElement(button);
        if (null === button) {
            this.logDebug("modifyButton - failed to find element");
            return;
        }
        // Custom function (if needed) to modify button by hand
        fn(button);
        // Check and alert user of mixed content error
        if (button.tagName === "A") {
            var dl_link = button.href;
            if (this.window.location.href.match(/^https:/i) &&
                dl_link.match(/^http:/i)) {
                // https://blog.chromium.org/2020/02/protecting-users-from-insecure.html
                this.document.body.insertAdjacentHTML("afterbegin", "<p class='ss-alert ss-w-100'>This file should be served over HTTPS. This download has been blocked. See <a href='https://blog.chromium.org/2020/02/protecting-users-from-insecure.html'>https://blog.chromium.org/2020/02/protecting-users-from-insecure.html</a> for more details.</p>");
            }
        }
        if (replaceWithForm === true) {
            var safeFormOptions = {
                actionURL: button.href || href || "",
                method: "GET"
            };
            // if (button.tagName === "A") {
            //   safeFormOptions.actionURL = button.href || href || "";
            // } else {
            //   safeFormOptions = {
            //     actionURL: href || "",
            //   }
            // }
            var form = this.makeSafeForm(safeFormOptions);
            button.parentElement.replaceChild(form, button);
            button = form.querySelector(".ss-animated-button");
        }
        else if (replaceWithTag && typeof replaceWithTag === "string") {
            var customTag = this.document.createElement(replaceWithTag);
            if (this.isElement(copyAttributesFromElement)) {
                this.copyAttributesFromElement(copyAttributesFromElement, customTag);
            }
            else {
                this.copyAttributesFromElement(button, customTag);
            }
            button.parentElement.replaceChild(customTag, button);
            button = customTag;
        }
        this._buttons.push(button);
        if (customText) {
            button.innerHTML = "".concat(customText, "<span></span><span></span><span></span><span></span>");
        }
        else {
            button.innerHTML = "Continue<span></span><span></span><span></span><span></span>";
        }
        button.className = className || "ss-animated-button ss-w-100";
        for (var key in props) {
            button[key] = props[key];
        }
        for (var key in styles) {
            button.style[key] = styles[key];
        }
        for (var key in attributes) {
            button.setAttribute(key, attributes[key]);
        }
        for (var key in eventHandlers) {
            button.addEventListener(key, eventHandlers[key]);
        }
        if (makeListener === true) {
            var fn_1 = function () { };
            if (requiresCaptcha === true) {
                fn_1 = function () {
                    var _a, _b, _c, _d;
                    if (_this_1.countdownSecondsLeft === 0 &&
                        (((_b = (_a = window.grecaptcha) === null || _a === void 0 ? void 0 : _a.getResponse) === null || _b === void 0 ? void 0 : _b.call(_a)) ||
                            ((_d = (_c = window.hcaptcha) === null || _c === void 0 ? void 0 : _c.getResponse) === null || _d === void 0 ? void 0 : _d.call(_c)))) {
                        button.classList.add("ss-btn-ready");
                    }
                    else {
                        button.classList.remove("ss-btn-ready");
                    }
                };
            }
            else {
                fn_1 = function () {
                    if (_this_1.countdownSecondsLeft === 0) {
                        button.classList.add("ss-btn-ready");
                    }
                    else {
                        button.classList.remove("ss-btn-ready");
                    }
                };
            }
            this.addInterval({
                fn: fn_1,
                interval: 100,
                customID: "ss-btn-ready-listner"
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
            var el = this.getDOMElement(moveTo.target);
            var pos = moveTo.position;
            var findParentByTag = moveTo.findParentByTag;
            if (null === el) {
                this.logDebug("modifyButton.moveTo - failed to find element");
            }
            else {
                var target = el;
                if (findParentByTag) {
                    target = this.findParentElementByTagName(el, findParentByTag);
                }
                button.remove();
                target.insertAdjacentElement(pos, button);
            }
        }
        return button;
    };
    SiteScrubber.prototype.makeSafeForm = function (_a) {
        var actionURL = _a.actionURL, _b = _a.method, method = _b === void 0 ? "GET" : _b, _c = _a.target, target = _c === void 0 ? "_blank" : _c;
        var form = this.document.createElement("form");
        form.action = actionURL || "";
        form.method = method;
        form.target = target;
        form.id = "ss-form";
        var submitBtn = this.document.createElement("button");
        submitBtn.type = "submit";
        this.modifyButton(submitBtn, { customText: "Start Download" });
        form.appendChild(submitBtn);
        return form;
    };
    SiteScrubber.prototype.applyRules = function () {
        var _this_1 = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (!this.checkIfDownloadPage((_a = this.currSiteRules) === null || _a === void 0 ? void 0 : _a.downloadPageCheckBySelector, (_b = this.currSiteRules) === null || _b === void 0 ? void 0 : _b.downloadPageCheckByRegex) &&
            // @ts-ignore
            !(this.window.grecaptcha !== void 0) &&
            // @ts-ignore
            !(this.window.hcaptcha !== void 0)) {
            this.log("Did not match as a download page... Stopping.");
            return;
        }
        else {
            this.log("Assuming this is a download page.");
        }
        this.log("STARTING CLEANER!");
        var observer = new MutationObserver(function (mutationsList, observer) {
            var _a, _b;
            for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
                var mutation = mutationsList_1[_i];
                var list = __spreadArray([mutation.target], mutation.addedNodes, true);
                for (var _c = 0, list_1 = list; _c < list_1.length; _c++) {
                    var node = list_1[_c];
                    for (var _d = 0, _e = _this_1._removeElementWatcherList; _d < _e.length; _d++) {
                        var removeRule = _e[_d];
                        // not a fan of this TBH
                        if ((_a = node === null || node === void 0 ? void 0 : node.matches) === null || _a === void 0 ? void 0 : _a.call(node, removeRule)) {
                            _this_1.logDebug("MutationObserver - Removing:", node);
                            (_b = node === null || node === void 0 ? void 0 : node.remove) === null || _b === void 0 ? void 0 : _b.call(node);
                        }
                    }
                }
            }
        });
        observer.observe(this.document.documentElement, {
            attributes: true,
            childList: true,
            subtree: true
        });
        var funcsAndParams = {
            addCustomCSSStyle: "customStyle",
            createCountdown: "createCountdown",
            removeElements: "remove",
            removeIFrames: "removeIFrames",
            removeDisabledAttr: "removeDisabledAttr"
        };
        Object.entries(funcsAndParams).forEach(function (_a) {
            var funcName = _a[0], param = _a[1];
            var rule = _this_1.currSiteRules[param];
            if (_this_1.isNothing(rule)) {
                return;
            }
            else {
                _this_1.console.groupCollapsed("ss-".concat(funcName));
                _this_1[funcName](rule);
                _this_1.console.groupEnd();
            }
        });
        this.console.groupCollapsed("ss-removeByRegex");
        (_d = (_c = this.currSiteRules) === null || _c === void 0 ? void 0 : _c.removeByRegex) === null || _d === void 0 ? void 0 : _d.forEach(function (removeByRegexOptions) {
            return _this_1.removeElementsByRegex(removeByRegexOptions);
        });
        this.log("Removed elements");
        this.console.groupEnd();
        this.console.groupCollapsed("ss-addInfoBanner");
        (_f = (_e = this.currSiteRules) === null || _e === void 0 ? void 0 : _e.addInfoBanner) === null || _f === void 0 ? void 0 : _f.forEach(function (addInfoBannerOptions) {
            return _this_1.addInfoBanner(addInfoBannerOptions);
        });
        this.console.groupEnd();
        this.console.groupCollapsed("ss-modifyButtons");
        if ((_g = this.currSiteRules) === null || _g === void 0 ? void 0 : _g.modifyButtons) {
            (_j = (_h = this.currSiteRules) === null || _h === void 0 ? void 0 : _h.modifyButtons) === null || _j === void 0 ? void 0 : _j.forEach(function (_a) {
                var button = _a[0], options = _a[1];
                _this_1.modifyButton(button, options);
            });
        }
        this.console.groupEnd();
        this.log("Running site's custom made script");
        (_m = (_l = (_k = this.currSiteRules) === null || _k === void 0 ? void 0 : _k.customScript) === null || _l === void 0 ? void 0 : _l.bind(this)) === null || _m === void 0 ? void 0 : _m();
    };
    return SiteScrubber;
}());
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var siteRules = {
    dropapk: {
        host: ["drop.download", "dropapk.to"],
        customStyle: "html,body,#container{background:#121212!important;color:#dfdfdf!important}.download_box,.download_method{background-color:#323232!important}.bg-white{background:#121212!important}table span{color:red!important}",
        downloadPageCheckBySelector: [
            "button#method_free",
            "button#downloadbtn",
            "div.download_box",
            "a.btn.btn-download",
        ],
        downloadPageCheckByRegex: [
            /Slow download/gi,
            /your IP next 8 hours/gi,
            /Enter code below/gi,
        ],
        remove: [
            "header.header_",
            "footer.footer_",
            ".adsbygoogle",
            "div.row.payment_table",
            "div.dowload-features",
            "a.download-btn.btn.bg-gradient-1.border-0.text-white.px-xl-5.rounded-pill.btn-lg.text-uppercase.mb-5.py-3",
            "br",
        ],
        removeByRegex: [
            { query: ".div.col-6 > a", regex: /fast download/gi },
            {
                query: "div.h2.text-center.mb-3",
                regex: /choose from one of our packages/gi
            },
        ],
        hideElements: [],
        removeIFrames: true,
        removeDisabledAttr: true,
        destroyWindowFunctions: [
            "setPagination",
            "adsbygoogle",
            "Dialogs",
            "gtag",
            "dataLayer",
            "google_tag_manager",
            "google_tag_data",
            "GoogleAnalyticsObject",
            "ga",
            "delComment",
            "player_start",
        ],
        addInfoBanner: [{ targetElement: "form", where: "afterend" }],
        modifyButtons: [
            ["button#method_free", { customText: "Free Download" }],
            ["button#downloadbtn", { requiresCaptcha: true }],
            ["div.download_box > a", { replaceWithForm: true }],
            ["a.btn.btn-download", { replaceWithForm: true }],
        ],
        createCountdown: undefined,
        customScript: function () {
            var _a, _b, _c, _d;
            // automation
            var captchaTable = this.$("table");
            var isCaptchaBoxPresent = ((_a = captchaTable.querySelector("b")) === null || _a === void 0 ? void 0 : _a.textContent) == "Enter code below:";
            if (isCaptchaBoxPresent) {
                var captchaCode = __spreadArray([], captchaTable.querySelectorAll("tr:nth-child(2) td:nth-child(1) > div span"), true).sort(function (x, y) {
                    var _a, _b;
                    return ((_a = x.getAttribute("style").match(/padding-left:(\d+)/)) === null || _a === void 0 ? void 0 : _a[1]) -
                        ((_b = y.getAttribute("style").match(/padding-left:(\d+)/)) === null || _b === void 0 ? void 0 : _b[1]);
                })
                    .map(function (e) { return e.textContent; })
                    .join("");
                (_b = this.$("input.captcha_code")) === null || _b === void 0 ? void 0 : _b.setAttribute("value", captchaCode);
                // @ts-ignore
                (_d = (_c = document.forms) === null || _c === void 0 ? void 0 : _c.F1) === null || _d === void 0 ? void 0 : _d.submit();
            }
            // aesthetics
            this.ifElementExists("div[style*='direction:ltr']", function (div) { return (div.style.background = "#000"); });
            this.$$(".col-6").forEach(function (div) {
                return div.classList.replace("col-6", "col-12");
            });
            __spreadArray([], this.$$("div"), true).filter(function (div) { return div.textContent.trim().length == 0; })
                .forEach(function (e) { return e.remove(); });
        }
    },
    mixloads: {
        host: ["mixloads.com"],
        customStyle: "html,body,#container,div.download_method,.bg-white{background:#121212!important;color:#dfdfdf!important}.download_box{background-color:#323232!important}table{display:none!important}",
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
        removeByRegex: [{ query: ".download_method", regex: /fast download/gi }],
        removeIFrames: true,
        removeDisabledAttr: true,
        destroyWindowFunctions: [
            "setPagination",
            "_gaq",
            "_gat",
            "gaGlobal",
            "timeout",
            "adsbygoogle",
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
            "Goog_Osd_UnloadAdBlock",
            "Goog_Osd_UpdateElementToMeasure",
            "google_osd_amcb",
            "delComment",
            "player_start",
            "showFullScreen",
            "__core-js_shared__",
            "feather",
            "google_llp",
            "googletag",
            "GoogleGcLKhOms",
            "google_image_requests",
            "jQuery19108826912945961212",
        ],
        addInfoBanner: [
            { targetElement: ".download_box > a", where: "afterend" },
            { targetElement: "form > .container > .row", where: "beforeend" },
        ],
        modifyButtons: [
            ["button#method_free"],
            ["#downloadbtn", { requiresCaptcha: true }],
            ["a.btn-block"],
        ],
        customScript: function () {
            var _this_1 = this;
            var _a, _b;
            // click the "Slow Download" option on page 1
            // this.$("button#method_free")?.click();
            (_a = this.$(".col-md-4")) === null || _a === void 0 ? void 0 : _a.classList.replace("col-md-4", "col-md-12");
            (_b = this.$("p.mb-5")) === null || _b === void 0 ? void 0 : _b.classList.remove("mb-5");
            // style page for convenience
            this.ifElementExists("div.download_box img", function () {
                var _a, _b;
                _this_1.$("div.download_box").insertAdjacentHTML("afterbegin", '<div class="input-group mb-3"></div><div class="input-group-prepend text-center"></div><span class="input-group-text font-weight-bold">Captcha Code </span>');
                _this_1.$("div.download_box span.input-group-text").appendChild(_this_1.$("input.captcha_code"));
                (_a = _this_1.$("input.captcha_code")) === null || _a === void 0 ? void 0 : _a.classList.add("form-control");
                _this_1.$("div.download_box").insertAdjacentElement("afterbegin", _this_1.$("img"));
                // Make the remaining elements neat
                (_b = _this_1.$(".download_box")) === null || _b === void 0 ? void 0 : _b.classList.add("container");
                _this_1.$$("img").forEach(function (e) {
                    if (/captcha/gi.test(e.src)) {
                        e.style.height = "8em";
                        e.style.width = "auto";
                    }
                });
            });
        }
    },
    fileupload: {
        host: ["file-up.org", "file-upload.com"],
        customStyle: "html,body,.row,.stdt,.dareaname,section.page-content,div.page-wrap{background:#121212!important;color:#dfdfdf!important;\n        font-size:16px!important;}#downloadbtn{padding:20px 50px!important}a#download-btn{padding:20px 50px!important}.row.comparison-row,form[name='F1'] #dl_btn_container,#fb-root{display:none!important}form[name='F1']{display:flex!important;flex-direction:column!important;}.seconds{padding:12px!important;width:unset!important;height:unset!important;line-height:unset!important;font-size:32px!important}",
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
            { query: "div.row", regex: /about file upload/gi },
            { query: "center", regex: /ads/gi },
            { query: ".container > .page-wrap > .text-center", regex: /ads/gi },
            { query: "form .row", regex: /VirusTotal scan/gi },
        ],
        hideElements: undefined,
        removeIFrames: true,
        removeDisabledAttr: true,
        destroyWindowFunctions: [
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
            "LAST_CORRECT_EVENT_TIME",
            "_3104453692",
            "_1721748045",
            "_1845421039",
            "_3947653830",
            "fa",
            "_1243128518",
            "_4260991086",
            "__rocketLoaderEventCtor",
            "__rocketLoaderLoadProgressSimulator",
            "a",
            "refS",
            "iinf",
            "atrk",
            "closure_lm_524755",
        ],
        addInfoBanner: [{ targetElement: ".container", where: "beforeend" }],
        modifyButtons: [
            [
                "form:not([id]) input[name='method_free']",
                {
                    makeListener: true,
                    replaceWithTag: "button",
                    customText: "Free Download",
                    props: { onclick: "", style: "", type: "submit" }
                },
            ],
            [
                "form#F1 input[name='method_free']",
                {
                    makeListener: true,
                    requiresCaptcha: true,
                    requiresTimer: true,
                    replaceWithTag: "button",
                    customText: "Free Download",
                    props: { onclick: "", style: "", type: "submit" },
                    moveTo: { target: "form", position: "beforeend" }
                },
            ],
            [
                "#download-div > a#download-btn",
                { makeListener: true, replaceWithForm: true },
            ],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () {
            if (this.$(".g-recaptcha")) {
                this.addGoogleRecaptchaJS();
            }
            this.interceptPreventDefault(function () {
                return false;
            });
        }
    },
    "up-load.io": {
        host: ["up-load.io"],
        customStyle: "html,body{background:#121212!important;color:#dfdfdf!important}div.filepanel.lft,div.info,.dfilename{background:#212121!important;color:#dfdfdf!important}#downloadbtn{padding:20px 50px!important}.dfile .report,#s65c,body > span,#comments{display:none!important}#container > div > li{color:#121212}.fileInfo .download-button{width:unset;vertical-align:unset;line-height:unset;}.fileInfo,.seconds{background:#212121!important;}",
        downloadPageCheckBySelector: [
            "input[name='method_free']",
            "button#downloadbtn",
            "div.download-button > a.btn.btn-dow",
        ],
        downloadPageCheckByRegex: [/create your link/gi, /for your IP next 24/gi],
        remove: [
            "#gdpr-cookie-notice",
            "nav",
            "footer",
            ".footer-sub",
            "form[name='F1'] a[href*='premium']",
            "input[name='method_premium']",
            "br",
            "div[align='left'] > li",
            "#container > div > li > div.col-md-12.pt20 > center:nth-child(2) > center",
            "[id*='adpays']",
            "body > span",
            "#container > div.container.download_page.pt30 > div > div.col-md-8",
            "#commonId > a",
            "div.filepanel.lft > div.share",
            "#container > div > div.col-md-12.text-center > form > div",
            "#container > div > div.col-md-12.pt20 > center > center",
            "#container > div > div > div.container.download_page.pt30 > div > div.col-md-8 li",
            ".ads",
        ],
        removeByRegex: [{ query: "style", regex: /#s65c ~ \*/gi }],
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
            "_Hasync",
            "a",
            "b",
            "network",
            "_0xc3bd",
            "google_js_reporting_queue",
            "google_srt",
            "google_logging_queue",
            "google_ad_modifications",
            "ggeac",
            "google_measure_js_timing",
            "google_reactive_ads_global_state",
            "_gfp_a_",
            "google_user_agent_client_hint",
            "biz",
            "random",
            "referr",
            "chfh",
            "chfh2",
            "_HST_cntval",
            "Histats",
            "node",
            "LAST_CORRECT_EVENT_TIME",
            "_3399814740",
            "___FONT_AWESOME___",
            "FontAwesomeConfig",
            "FontAwesome",
            "_HistatsCounterGraphics_0_setValues",
            "adcode_count",
            "post_sticky_handler",
            "post_noads_handler",
            "post_trackdata_handler",
            "post_skin_handler",
            "post_expandable_handler",
            "post_pop_handler",
            "post_interstitial_handler",
            "post_native_handler",
            "native_resize_handler",
            "post_iframe_handler",
            "ItemDataScript_parameter",
            "ItemDataScript_parameter_new",
            "ItemDataScript_parameter_seperate",
            "aduid",
            "pid",
            "width",
            "height",
            "displaytype",
            "responsive",
            "block_id",
            "adSectionWidth",
            "page_meta_data",
            "page_title",
            "page_referrer",
            "meta_description",
            "meta_keywords",
            "search_keywords",
            "currently_rendered",
            "currently_rendered_flag",
            "currently_rendered_adunit",
            "cpc_impression",
            "cpm_impression",
            "cpa_impression",
            "cpd_impression",
            "cpv_impression",
            "html_impression",
            "ret",
            "iframe_src",
            "iinf",
            "cv",
            "char",
            "Tynt",
            "_dtspv",
            "__connect",
            "_33Across",
            "__uspapi",
            "__underground",
            "vglnk",
            "__v5k",
            "vl_cB",
            "vl_disable",
            "vglnk_16317554785726",
            "vglnk_16317554785737",
            "s",
            "urlorigin",
            "responsedata",
            "cookie_content_value",
            "cookie_content_data",
            "q898n4064po",
            "_2e7y9iqqgfb",
            "ppuWasShownFor3968974",
        ],
        addInfoBanner: [
            { targetElement: "#container > div.container", where: "afterend" },
        ],
        modifyButtons: [
            [
                "input#method_free",
                {
                    style: "",
                    replaceWithTag: "button",
                    customText: "Free Download",
                    moveTo: { position: "beforeend", target: "form[action='']" }
                },
            ],
            [
                "button#downloadbtn",
                {
                    style: "",
                    makeListener: true,
                    requiresCaptcha: true,
                    requiresTimer: true
                },
            ],
            [".download-button > a", { replaceWithForm: true }],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () { }
    },
    katflys: {
        host: ["short.katflys.com"],
        customStyle: "html,body,.box{background:#121212!important;color:#dfdfdf!important}#container > div > li{color:#121212}",
        downloadPageCheckBySelector: ["form[name='F1']"],
        downloadPageCheckByRegex: [],
        remove: [
            "#gdpr-cookie-notice",
            "nav",
            "footer",
            ".footer-sub",
            "form[name='F1'] a[href*='premium']",
            "br",
            "div[align='left'] > li",
            "#container > div > li > div.col-md-12.pt20 > center:nth-child(2) > center",
        ],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [],
        addInfoBanner: [],
        createCountdown: undefined,
        modifyButtons: [
            [
                "input[name='go']",
                { style: "", replaceWithTag: "button", customText: "Free Download" },
            ],
        ],
        customScript: function () {
            // this.$(".ss-btn-ready")?.click();
        }
    },
    uploadrar: {
        host: ["uploadrar.com"],
        customStyle: "body,.subpage-content{background:#121212!important;color:#dfdfdf!important}.blockpage{background:#121212!important;border:none!important;box-shadow:none!important}.title{color:#8277ec!important}.blockpage .desc span{color:#dfdfdf!important}.blockpage .desc p{color:#797979!important}",
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
            "a.btn.btn-info.btn-lg",
            ".adsbygoogle",
            "#countdown",
            "form > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-8",
            "form[name='F1'] > .row",
            ".mngez-free-download",
            ".app-footer",
            "#backTop",
        ],
        removeByRegex: [{ query: ".txt", regex: /uploadrar|Cloud computing/gi }],
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
            "google_js_reporting_queue",
            "google_srt",
            "google_logging_queue",
            "google_ad_modifications",
            "ggeac",
            "google_measure_js_timing",
            "google_reactive_ads_global_state",
            "google_user_agent_client_hint",
            "kAWgyOxXhTis",
            "vRowKfzUKP",
            "cIuqJzgWhJ",
            "JhOjFdIupR",
            "ZWTPEQZYhZ",
            "kRBeOhzLuY",
            "oAAUBciJwG",
            "CWSTRhNQZH",
            "c2",
            "c1",
            "I5XCBfeVDZKA",
            "RbntPCrNXp",
            "timeout",
            "relocate_home",
            "delComment",
            "player_start",
            "showFullScreen",
            "_gfp_a_",
        ],
        addInfoBanner: [
            // { targetElement: "form", where: "beforeend" },
            { targetElement: ".download2page", where: "beforeend" },
            { targetElement: ".download0page", where: "beforeend" },
        ],
        modifyButtons: [
        // [
        //   "input[name='method_free']",
        //   {
        //     replaceWithTag: "button",
        //     customText: "Free Download",
        //     props: { type: "submit" },
        //   },
        // ],
        // ["#direct_link a", { replaceWithForm: true }],
        ],
        customScript: function () {
            var _this_1 = this;
            var _a;
            // aesthetics
            (_a = this.$$(".col-md-4, .col-lg-4")) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
                e.classList.replace("col-md-4", "col-md-12");
                e.classList.replace("col-lg-4", "col-lg-12");
            });
            var fileId = document.location.href.slice(document.location.href.lastIndexOf("/") + 1);
            var url = "https://uploadrar.com/".concat(fileId);
            this.$("form").innerHTML = "Loading...";
            fetch(url, {
                credentials: "include",
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
                    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Upgrade-Insecure-Requests": "1",
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "same-origin"
                },
                referrer: url,
                body: "op=download2&id=".concat(fileId, "&rand=&referer=https%3A%2F%2Fuploadrar.com&method_free=Free+Download&adblock_detected=0"),
                method: "POST",
                mode: "cors"
            })
                .then(function (r) { return r.text(); })
                .then(function (d) { var _a; return (_a = d.match(/<a href="([^"]+"?uploadrar.com:[^"]+)"/)) === null || _a === void 0 ? void 0 : _a[1]; })
                .then(function (link) {
                // this.$$("body > *").forEach(e=>e.remove());
                _this_1.$("form").replaceWith(_this_1.makeSafeForm({ actionURL: link }));
            });
        }
    },
    mega4up: {
        host: ["mega4up.com", "mega4up.org"],
        customStyle: "html{background:#121212!important}body,.list-group-item{background:#121212!important;color:#dfdfdf!important}.card,.icon,.label-group,.subpage-content{background:#121212!important}#___ytsubscribe_0{display:none!important}",
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
            {
                query: ".container div.card div.card-body",
                regex: /Mega4up is one of the best/gi
            },
            {
                query: "body > div.subpage-content > div > div.card > div > div.row.mb-3",
                regex: /report abuse/gi
            },
            {
                query: "body > div.subpage-content > div > div.card.mb-4 > div > div > div.col-xl-8",
                regex: /Download Link/gi
            },
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
            "openInBrowser",
            "isInApp",
            "fbAsyncInit",
            "dataLayer",
            "FB",
            "ga",
            "closure_lm_774210",
            "k",
            "_h971nmz63bi",
            "qrezw3pc8x",
            "zfgformats",
            "setImmediate",
            "clearImmediate",
            "_mrrnmlce",
            "_ximqygr",
            "zfgproxyhttp",
        ],
        addInfoBanner: [
            { targetElement: "form[name='F1']" },
            { targetElement: "#direct_link" },
        ],
        modifyButtons: [
            [
                "form:not([name='F1']) input[name='mega_free']",
                { replaceWithTag: "button", customText: "Free Download" },
            ],
            [
                "button#downloadbtn",
                { requiresCaptcha: true, requiresTimer: true, makeListener: true },
            ],
            ["#direct_link > a", { replaceWithForm: true, props: { onclick: "" } }],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () {
            var _a;
            // aesthetics
            (_a = this.$$(".col-md-4, .col-lg-4, .col-xl-4")) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
                e.classList.replace("col-md-4", "col-md-12");
                e.classList.replace("col-lg-4", "col-lg-12");
                e.classList.replace("col-xl-4", "col-xl-12");
            });
        }
    },
    userupload: {
        host: ["userupload.in", "userupload.net"],
        customStyle: "body{background-color:#121212 !important}",
        downloadPageCheckBySelector: ["#downloadbtn"],
        downloadPageCheckByRegex: [
            /Create download link/gi,
            /Click here to download/gi,
            /Download link generated/gi,
        ],
        remove: [
            "nav",
            "#st_gdpr_iframe",
            "#banner_ad",
            "footer",
            "div.report",
            ".adsbygoogle",
            ".bannerad",
            ".aboutFile",
        ],
        removeByRegex: [
        // { query: ".aboutFile", regex: /UserFree/gi }
        ],
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
            "qsx3bu3x73",
            "ppuWasShownFor3481353",
        ],
        addInfoBanner: [
            { targetElement: "form[name='F1'] .row", where: "beforeend" },
        ],
        modifyButtons: [
            [
                "#downloadbtn",
                {
                    requiresCaptcha: true,
                    requiresTimer: true,
                    makeListener: true,
                    props: { disabled: false, type: "submit" },
                    moveTo: { target: ".download-btn", position: "beforebegin" }
                },
            ],
            ["form a[type='button']", { replaceWithForm: true }],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () {
            var _a;
            // aesthetics
            (_a = this.$$(".col-lg-6")) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
                e.classList.replace("col-lg-6", "col-lg-12");
            });
            // stop ads
            this.waitUntilSelector("body > iframe").then(function (iframe) { return iframe.remove(); });
        }
    },
    rapidgator: {
        host: ["rapidgator.net/file", "rapidgator.net/download/captcha"],
        customStyle: "html,body,table,strong,.container,.overall,.wrap-main-block,.box-download{background:#121212!important;background-color:#121212!important;color:#dfdfdf!important}.download-timer{display:block!important;font-size:24px;padding:12px;}.btm3,.text-block{width:unset!important}.btm3{display:flex;flex-direction:column;align-items:center;}",
        downloadPageCheckBySelector: [
            ".link.act-link.btn-free",
            "#captchaform",
            "div.in div.download-ready div.btm div.box-download a.btn.btn-download",
        ],
        downloadPageCheckByRegex: [/slow speed download/gi],
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
            ".descr",
            "a.btn-premium",
            "a > img",
        ],
        removeByRegex: [
            { query: "p[align='center']", regex: /Downloading too long/gi },
        ],
        hideElements: undefined,
        removeIFrames: true,
        removeDisabledAttr: true,
        addInfoBanner: [
            { targetElement: "div.main-block.wide", where: "afterend" },
        ],
        modifyButtons: [
            ["form#captchaform a.btn", { requiresCaptcha: true, makeListener: true }],
            [
                "div.in div.download-ready div.btm div.box-download a.btn.btn-download",
                {
                    fn: function () {
                        var _a, _b;
                        // the ending direct download link
                        var ddlURL = (_b = (_a = document.body.textContent.match(/return \'(http[s]?:\/\/(.*)?download(.*)?)\'/)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : null;
                        if (ddlURL) {
                            var dlbtn = document.querySelector("div.in div.download-ready div.btm div.box-download a.btn.btn-download");
                            if (dlbtn) {
                                dlbtn.href = ddlURL;
                                dlbtn.innerHTML = "Download Now<span></span><span></span><span></span><span></span>";
                            }
                        }
                    }
                },
            ],
            [
                "a.link.act-link.btn-free",
                {
                    requiresTimer: true,
                    props: { href: "https://rapidgator.net/download/captcha" }
                },
            ],
        ],
        createCountdown: { element: ".download-timer-seconds", timer: 45 },
        customScript: function () {
            var _this_1 = this;
            var _a;
            this.ifElementExists("form#captchaform", function () {
                var _a;
                _this_1.addInfoBanner({
                    targetElement: (_a = _this_1.$("form#captchaform")) === null || _a === void 0 ? void 0 : _a.parentElement
                });
            });
            if (this.$(".download-timer")) {
                var table_header = this.$("#table_header");
                if (table_header &&
                    table_header.textContent.match(/downloads limit|Delay between downloads/gi)) {
                    // reached download limit so script won't continue
                    (_a = document
                        .querySelector(".download-timer")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("afterend", "<p>siteScrubber is stopping because you've reached the download limit. (Use a VPN to get a new IP address)</p>");
                    return;
                }
                sid = null;
                fetch("https://rapidgator.net/download/AjaxStartTimer?fid=".concat(fid), {
                    headers: {
                        accept: "application/json, text/javascript, */*; q=0.01",
                        "accept-language": "en-US,en;q=0.9",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "sec-gpc": "1",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    body: null,
                    method: "GET",
                    mode: "cors",
                    credentials: "include"
                })
                    .then(function (res) { return res.json(); })
                    .then(function (data) {
                    var _a;
                    (_a = document
                        .querySelector(".download-timer")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("afterend", "<p>1st Request=".concat(JSON.stringify(data), "</p>"));
                    sid = data.sid;
                });
                setTimeout(function () {
                    fetch("https://rapidgator.net/download/AjaxGetDownloadLink?sid=".concat(sid), {
                        headers: {
                            accept: "application/json, text/javascript, */*; q=0.01",
                            "accept-language": "en-US,en;q=0.9",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "sec-gpc": "1",
                            "x-requested-with": "XMLHttpRequest"
                        },
                        body: null,
                        method: "GET",
                        mode: "cors",
                        credentials: "include"
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (data) {
                        var _a, _b, _c, _d;
                        (_a = document
                            .querySelector(".download-timer")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("afterend", "<p>2nd Request=".concat(JSON.stringify(data), "</p>"));
                        (_b = document
                            .querySelector(".download-timer")) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML("afterend", "<p>Ready to go to CAPTCHA page. Click the button to navigate to the next page.</p>");
                        (_d = (_c = document
                            .querySelector(".ss-animated-button")) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.add("ss-btn-ready");
                    });
                }, 45 * 1000);
            }
        }
    },
    katfile: {
        host: ["katfile.com"],
        customStyle: "html,body,#container,.wrapper{background:#121212!important;color:#dfdfdf!important}.panel,.free li{background:#212121!important}",
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
            ".panel.panel-default > .row > .col-sm-4:nth-child(2n+1)",
            ".panel.panel-default .free li:not([style])",
            "#es1",
            "#sharebuttons",
            "#hbtn",
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
        addInfoBanner: [],
        modifyButtons: [
            [
                "#fbtn1",
                {
                    replaceWithTag: "button",
                    customText: "Free Download",
                    props: { type: "submit" }
                },
            ],
            [
                "button.downloadbtn.ddddd",
                {
                    customText: "Download",
                    requiresCaptcha: true,
                    makeListener: true,
                    props: { type: "submit", onclick: "", style: "" }
                },
            ],
            ["#dlink", { replaceWithForm: true }],
        ],
        customScript: function () {
            var _a;
            this.$$(".col-sm-4, .col-md-4").forEach(function (el) {
                el.classList.replace("col-sm-4", "col-sm-12");
                el.classList.replace("col-md-4", "col-md-12");
            });
            (_a = this.$("form#btn_download")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("afterbegin", "<input type=\"hidden\" name=\"method_free\" value=\"SLOW SPEED DOWNLOAD\">");
        }
    },
    "upload-4ever": {
        host: [/^(?:https?:\/\/)?(?:www\.)?upload-4ever.com/, "upload-4ever.com"],
        customStyle: "html,body{background:#121212!important;color:#dfdfdf!important}.firstOne,.adsbygoogle,ins{display:none!important;}.notFirstOne{display:block!important;}a#downLoadLinkButton{padding:25px;}",
        downloadPageCheckBySelector: [
            "#downloadbtn",
            "#downLoadLinkButton",
            "input[name='method_free']",
        ],
        downloadPageCheckByRegex: [
            /You can upgrade your account to a Premium account/gi,
            /click here to download/gi,
        ],
        remove: [
            "nav",
            "#gdpr-cookie-notice",
            "footer",
            "input[name='method_premium']",
            ".my-3 > p.m-0",
            "#commonId > center > div.my-4",
            "#google_esf",
            ".appHeader",
            "header",
        ],
        removeByRegex: [
            {
                query: "div.col-sm-12.content-section.text-center.mb-5",
                regex: /upgrade your account to a Premium account/gi
            },
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
        addInfoBanner: [
            { targetElement: "div.rightcol div#commonId", where: "beforeend" },
            { targetElement: "a#downLoadLinkButton", where: "afterend" },
        ],
        modifyButtons: [
            [
                "form:not([name='F1']) input[name='method_free']",
                { replaceWithTag: "button", customText: "Free Download" },
            ],
            [
                "#downloadbtn",
                {
                    customText: "Create Download Link",
                    requiresCaptcha: true,
                    requiresTimer: true,
                    makeListener: true
                },
            ],
            [
                "#downLoadLinkButton",
                {
                    replaceWithForm: true,
                    fn: function (btn) {
                        btn.href = btn.dataset.target;
                    }
                },
            ],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () { }
    },
    uploadev: {
        host: ["uploadev.org"],
        customStyle: ".mngez_messgepage,.mngez_download0,.mngez_download1,body{background:#121212!important;color:#dfdfdf!important}.mngez_download1 .capcha p{color:#dfdfdf!important}.mngez_download1 .fileinfo .colright .col1 p i{color:#dfdfdf!important}.mngez_download1 .fileinfo .colright .col1 span{color:#dfdfdf!important}.adsbygoogle,div.tableoffers{display:none!important}",
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
            ".offersfree li:not([id='dspeed'])",
            ".row > .col-xs-12.col-sm-12.col-md-3.col-lg-3",
        ],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: true,
        destroyWindowFunctions: [
            "__rocketLoaderEventCtor",
            "__rocketLoaderLoadProgressSimulator",
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
        addInfoBanner: [
            { targetElement: ".mngez_download1", where: "beforeend" },
            { targetElement: ".mngez_download0", where: "beforeend" },
        ],
        modifyButtons: [
            [
                "form:not([name='F1']) input[name='method_free']",
                {
                    replaceWithTag: "button",
                    customText: "Free Download",
                    moveTo: { target: "form > .row", position: "beforebegin" }
                },
            ],
            [
                "button#downloadbtn",
                {
                    requiresCaptcha: true,
                    requiresTimer: true,
                    makeListener: true,
                    customText: "Create Download Link"
                },
            ],
            ["span#direct_link > .directl", { replaceWithForm: true }],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () {
            this.$$(".col-xs-12.col-sm-12.col-md-9.col-lg-9").forEach(function (el) {
                el.classList.replace("col-md-9", "col-md-12");
                el.classList.replace("col-lg-9", "col-lg-12");
            });
            if (this.$(".g-recaptcha")) {
                this.addGoogleRecaptchaJS();
            }
        }
    },
    apkadmin: {
        host: ["apkadmin.com"],
        customStyle: "html,body{background:#121212!important;color:#dfdfdf!important}center{color:#dfdfdf!important}.download-page .file-info{background:#212121!important;color:#dfdfdf!important}",
        downloadPageCheckBySelector: [
            "#downloadbtn",
            "div.container.download-page",
        ],
        downloadPageCheckByRegex: [
            /download should automatically begin in a few seconds/gi,
        ],
        remove: ["nav", ".sharetabs", "footer", "#features"],
        removeByRegex: [{ query: ".file-info", regex: /About APKadmin.com/gi }],
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
        addInfoBanner: [{ targetElement: "form", where: "afterend" }],
        modifyButtons: [
            ["button#downloadbtn", { customText: "Get Download Link" }],
            ["#content a", { replaceWithForm: true, customText: "Download Now" }],
        ],
        customScript: function () {
            // this.$("#downloadbtn")?.click();
        }
    },
    dlupload: {
        host: ["khabarbabal.online", "dlsharefile.com", "dlsharefile.org"],
        customStyle: "body,html{background:#121212!important;color:#dfdfdf!important}form#DownloadForm{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 15%;}",
        downloadPageCheckBySelector: ["a.downloadb"],
        downloadPageCheckByRegex: [/free download/gi],
        remove: ["body > *"],
        removeByRegex: [
            { query: ".row.mx-auto", regex: /DLUpload is a secure/gi },
            { query: ".col-lg-12.text-center", regex: /Safe & Secure/gi },
            {
                query: ".col-lg-12.text-center",
                regex: /wait for 14 seconds and click/gi
            },
            { query: "div.card-header.border-0", regex: /Start Your /gi },
        ],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "gtag",
            "dataLayer",
            "adsbygoogle",
            "google_tag_manager",
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
            "google_spfd",
            "google_unique_id",
            "google_sv_map",
            "google_lpabyc",
            "google_user_agent_client_hint",
            "google_tag_data",
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
            "$insertQueue7cbd83f132f5$",
            "1bgbb027-3b87-ae67-26ar-hz150f600z16",
            "RedirectCookies",
            "filename",
            "extension",
            "d",
            "urlsArray",
            "randomNumber",
            "currentImageUrl",
            "yxhpa",
            "yxhpb",
            "yxhpo",
            "yllixNetworkLoader",
            "Headroom",
            "process_430610",
            "_0x4ab4",
            "_0x4f3e",
            "sbslms",
            "process_430474",
            "closure_lm_259947",
            "onYouTubeIframeAPIReady",
            "$insert7cbd83f132f5$",
            "closure_lm_94135",
            "_0xa5ec",
            "_0x4b20",
            "_0x42f0b5",
            "mm",
            "rp",
            "LieDetector",
            "AaDetector",
            "placementKey",
            "_0xa6ab",
            "_0x41de",
            "googletag",
            "GoogleGcLKhOms",
            "google_image_requests",
            "DownloadLink",
            "GotoLink",
            "_0x28f6",
            "_0x3693",
            "_0x196a1559e34586fdb",
            "ImpressionCookies",
            "d1",
            "urlsArray1",
            "randomNumber1",
            "currentImageUrl1",
            "_0x2182",
            "_0x4eb5",
            "_0x126d",
            "_0x16be",
            "_0x5c7565",
            "closure_lm_755568",
        ],
        addInfoBanner: [{ targetElement: "#DownloadForm", where: "beforeend" }],
        modifyButtons: [["#Submit", { requiresCaptcha: true, makeListener: true }]],
        customScript: function () {
            // the magic cookie that allows the direct download
            this.document.cookie = "RedirectCookies=FilePage3;path=/";
            // create custom form used to submit for direct download
            this.$("body").insertAdjacentHTML("afterbegin", "<form id=\"DownloadForm\" action=\"/Download/FilePage5\" method=\"post\">\n        <input type=\"hidden\" name=\"FileId\" value=\"NmU1ZDRhOTYt\">\n        <button class=\"ss-animated-button ss-w-100\" type=\"submit\" id=\"Submit\">Start Download</button>");
            this.modifyButton("#Submit", {
                requiresCaptcha: true,
                makeListener: true,
                eventHandlers: {
                    click: function () {
                        this.innerText = "Loading... Please Wait";
                    }
                }
            });
            this.addInfoBanner({
                targetElement: "#DownloadForm",
                where: "beforeend"
            });
            // manually create Google ReCAPTCHA for direct download
            var site_key = {
                "khabarbabal.online": "6LdyluwUAAAAAI5AMDQTg4_9LFoNbrJub0IsdU3p",
                "dlsharefile.com": "6Le3YeIZAAAAABZGkjxfOt9ArTwbUsvv8alL5l1k"
            }[document.domain];
            this.createGoogleRecaptcha("#DownloadForm", site_key, "afterbegin");
        }
    },
    file4: {
        host: ["file4.net"],
        customStyle: "html{background:#121212!important}.page-content,.portlet-body,.portlet.light,body{background:#121212!important;color:#dfdfdf!important}iframe[src*=ads]{display:none!important}input[name=sub],.div2 a[href^=down]{background-color:#008cba;border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px}}",
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
        removeByRegex: [{ query: ".row", regex: /What is file4net/gi }],
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
        addInfoBanner: [
            { targetElement: "form[name='myform']", where: "beforeend" },
            { targetElement: ".div2 a[href^='down']", where: "afterend" },
        ],
        modifyButtons: [
            [
                "form[name='myform'] input[type='submit']",
                {
                    requiresCaptcha: true,
                    makeListener: true,
                    replaceWithTag: "button",
                    customText: "Create Download Link"
                },
            ],
            [".div2 a[href^='down']"], // cannot use form because it truncates the URL params
        ],
        customScript: function () {
            var _this_1 = this;
            this.waitUntilGlobalVariable("grecaptcha").then(function () {
                var form = _this_1.$("form[name='myform']");
                form.insertAdjacentHTML("afterbegin", "<input type=\"hidden\" name=\"sub\" value=\"Continue\">");
            });
            this.waitUntilSelector(".div1").then(function (div) { return (div.style.display = "none"); });
            this.waitUntilSelector(".div2").then(function (div) {
                div.style.display = "block";
                div.querySelector("a").removeAttribute("onclick");
            });
        }
    },
    checkURL: {
        host: ["checkurl.org", "checkurl.me"],
        customStyle: "html,body,#wrapper,#content{background:#121212!important;color:#dfdfdf!important}#wrapper{opacity:1!important}",
        downloadPageCheckBySelector: ["button#Sbutton"],
        downloadPageCheckByRegex: [],
        remove: [
            "header",
            "footer",
            ".container > :not(.col_two_third)",
            ".col_two_third > :not(button)",
            "#google_esf",
        ],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "gtag",
            "dataLayer",
            "google_ad_client",
            "google_ad_slot",
            "google_ad_width",
            "google_ad_height",
            "google_js_reporting_queue",
            "google_srt",
            "google_logging_queue",
            "google_ad_modifications",
            "ggeac",
            "google_measure_js_timing",
            "google_plmetrics",
            "google_reactive_ads_global_state",
            "google_onload_fired",
            "google_sa_queue",
            "google_sl_win",
            "google_process_slots",
            "google_unique_id",
            "google_ad_block",
            "google_ad_channel",
            "google_ad_format",
            "google_ad_host",
            "google_ad_host_channel",
            "google_ad_host_tier_id",
            "google_ad_layout",
            "google_ad_layout_key",
            "google_ad_output",
            "google_ad_region",
            "google_ad_section",
            "google_ad_type",
            "google_ad_unit_key",
            "google_ad_dom_fingerprint",
            "google_ad_semantic_area",
            "google_placement_id",
            "google_adtest",
            "google_allow_expandable_ads",
            "google_alternate_ad_url",
            "google_alternate_color",
            "google_apsail",
            "google_captcha_token",
            "google_city",
            "google_color_bg",
            "google_color_border",
            "google_color_line",
            "google_color_link",
            "google_color_text",
            "google_color_url",
            "google_container_id",
            "google_content_recommendation_ad_positions",
            "google_content_recommendation_columns_num",
            "google_content_recommendation_rows_num",
            "google_content_recommendation_ui_type",
            "google_content_recommendation_use_square_imgs",
            "google_contents",
            "google_country",
            "google_cpm",
            "google_ctr_threshold",
            "google_cust_age",
            "google_cust_ch",
            "google_cust_criteria",
            "google_cust_gender",
            "google_cust_id",
            "google_cust_interests",
            "google_cust_job",
            "google_cust_l",
            "google_cust_lh",
            "google_cust_u_url",
            "google_disable_video_autoplay",
            "google_enable_content_recommendations",
            "google_enable_ose",
            "google_encoding",
            "google_font_face",
            "google_font_size",
            "google_frame_id",
            "google_full_width_responsive_allowed",
            "efwr",
            "google_full_width_responsive",
            "gfwroh",
            "gfwrow",
            "gfwroml",
            "gfwromr",
            "gfwroz",
            "gfwrnh",
            "gfwrnwer",
            "gfwrnher",
            "google_gl",
            "google_hints",
            "google_image_size",
            "google_kw",
            "google_kw_type",
            "google_language",
            "google_loeid",
            "google_max_num_ads",
            "google_max_radlink_len",
            "google_max_responsive_height",
            "google_ml_rank",
            "google_mtl",
            "google_native_ad_template",
            "google_native_settings_key",
            "google_num_radlinks",
            "google_num_radlinks_per_unit",
            "google_override_format",
            "google_page_url",
            "google_pgb_reactive",
            "google_pucrd",
            "google_referrer_url",
            "google_region",
            "google_resizing_allowed",
            "google_resizing_height",
            "google_resizing_width",
            "rpe",
            "google_responsive_formats",
            "google_responsive_auto_format",
            "armr",
            "google_rl_dest_url",
            "google_rl_filtering",
            "google_rl_mode",
            "google_rt",
            "google_safe",
            "google_safe_for_responsive_override",
            "google_video_play_muted",
            "google_source_type",
            "google_tag_for_child_directed_treatment",
            "google_tag_for_under_age_of_consent",
            "google_tag_origin",
            "google_tag_partner",
            "google_targeting",
            "google_tfs",
            "google_video_doc_id",
            "google_video_product_type",
            "google_webgl_support",
            "google_package",
            "google_debug_params",
            "dash",
            "google_restrict_data_processing",
            "google_apltlad",
            "google_sv_map",
            "googletag",
            "google_user_agent_client_hint",
            "sm_format_twitter",
            "sm_format_twitter2",
            "sm_format_twitter3",
            "relative_time",
            "ytp",
            "onYouTubeIframeAPIReady",
            "getYTPVideoID",
            "iOSversion",
            "nAgt",
            "isTouchSupported",
            "getOS",
            "nameOffset",
            "verOffset",
            "ix",
            "start",
            "end",
            "uncamel",
            "setUnit",
            "setFilter",
            "jRespond",
            "Instafeed",
            "Cookies",
            "skrollr",
            "JQClass",
            "jQueryBridget",
            "EvEmitter",
            "getSize",
            "matchesSelector",
            "fizzyUIUtils",
            "Outlayer",
            "Isotope",
            "Masonry",
            "imagesLoaded",
            "Swiper",
            "ResizeSensor",
            "toastr",
            "InfiniteScroll",
            "debounce",
            "requesting",
            "killRequesting",
            "onScrollSliderParallax",
            "SEMICOLON",
            "setDisabled",
            "google_tag_manager",
            "google_tag_data",
            "gaGlobal",
            "aawChunk",
            "aaw",
            "_pbjsGlobals",
            "__core-js_shared__",
            "pbjs",
            "docReady",
            "mnet",
            "Goog_AdSense_getAdAdapterInstance",
            "Goog_AdSense_OsdAdapter",
            "google_sa_impl",
            "goog_pvsid",
            "adsbygoogle",
            "_gfp_a_",
            "google_spfd",
            "google_jobrunner",
            "google_persistent_state_async",
            "googleToken",
            "googleIMState",
            "_gfp_p_",
            "processGoogleToken",
            "google_global_correlator",
            "google_prev_clients",
            "ampInaboxIframes",
            "ampInaboxPendingMessages",
            "goog_sdr_l",
            "GoogleGcLKhOms",
            "google_image_requests",
        ],
        addInfoBanner: [],
        createCountdown: undefined,
        modifyButtons: [
            [
                "button#Sbutton",
                {
                    props: { disabled: false },
                    customText: "Continue"
                },
            ],
        ],
        customScript: function () { }
    },
    dailyuploads: {
        host: ["dailyuploads.net"],
        customStyle: "html,body{background:#121212!important;color:#dfdfdf!important}form[name=F1]{visibility:hidden}form[name=F1] table{visibility:visible}div.banner div.inner{display:flex;flex-direction:column;align-items:center}",
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
        addInfoBanner: [
            { targetElement: "a[href*='.dailyuploads.net']", where: "afterend" },
            { targetElement: "#downloadBtnClick", where: "afterend" },
        ],
        modifyButtons: [
            [
                "button#downloadBtnClickOrignal",
                {
                    requiresCaptcha: true,
                    makeListener: true,
                    customText: "Create Download Link",
                    props: { style: "" }
                },
            ],
            [
                "a[href*='.dailyuploads.net']",
                { replaceWithForm: true, customText: "Start Download" },
            ],
        ],
        customScript: function () {
            var _this_1 = this;
            this.waitUntilGlobalVariable("grecaptcha").then(function () {
                var _a;
                var form = document.forms.F1;
                form.removeAttribute("onsubmit");
                form.addEventListener("submit", function () {
                    _this_1.$("#downloadBtnClick").textContent = "Loading...";
                }, false);
                (_a = _this_1.$("#downloadBtnClick")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                    if (grecaptcha.getResponse()) {
                        this.textContent = "Loading...";
                    }
                }, false);
            });
            // this.waitUntilSelector("#downloadBtnClick").then((btn) => {
            //   btn.className = "ss-animated-button";
            // });
            // this.waitUntilSelector(
            //   "body > div.banner > div > a[href*='dailyuploads']"
            // ).then((btn) => {
            //   btn.className = "ss-animated-button";
            // });
            var curr = this.$("form table").nextElementSibling;
            var old = null;
            while (curr != null) {
                old = curr;
                curr = curr.nextElementSibling;
                old.remove();
            }
        }
    },
    usersdrive: {
        host: ["usersdrive.com"],
        customStyle: "html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important;padding:0!important}.container-fluid main{background:#121212!important;padding:0!important}.down{display:flex!important;flex-direction:column!important;align-items:center!important}.seconds,h1,h2,h3,h4,h5,h6,span,.icon{color:#dfdfdf!important}.second{background:#323232!important}.first{background:#212121!important}#progress{line-height:unset!important;height:50px!important}",
        downloadPageCheckBySelector: [
            "button#method_free",
            "button#downloadbtn",
            "div a.btn-download.get-link",
            "form[name='F1']",
        ],
        downloadPageCheckByRegex: [
            /Create Download Link/gi,
            /This direct link will be available/gi,
        ],
        remove: [
            "nav",
            "center",
            ".col-md",
            ".socialmedia",
            ".pro",
            "div.report",
            "body > div > div > main > div.content",
        ],
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
        addInfoBanner: [
            { targetElement: "form[name='F1']", position: "beforeend" },
        ],
        modifyButtons: [
            [
                "button#downloadbtn",
                { requiresCaptcha: true, requiresTimer: true, makeListener: true },
            ],
            [".down a", { replaceWithForm: true }],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () {
            this.$$(".row .col-md-4").forEach(function (e) { var _a; return (_a = e.classList) === null || _a === void 0 ? void 0 : _a.replace("col-md-4", "col-md-12"); });
        }
    },
    indishare: {
        host: ["indi-share.net", "indi-share.com", "techmyntra.net"],
        customStyle: "html,body,.panelRight,h2,#wrapper{background:#121212!important;color:#dfdfdf!important;padding:0!important}#content{display:flex;flex-direction:column;align-items:center}#container{height:inherit !important;}",
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
            "nav",
            "span#countdown", // not needed, doesnt hinder download
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
        addInfoBanner: [{ targetElement: "#direct_link", where: "afterend" }],
        modifyButtons: [
            ["a[rel*='noopener']", { customText: "Free Download" }],
            ["#downloadbtn", { customText: "Create Download Link" }],
            [
                "#direct_link a",
                { replaceWithForm: true, customText: "Start Download" },
            ],
        ],
        customScript: function () {
            var finalBtn = this.$("#direct_link");
            finalBtn && (finalBtn.style.display = "");
        }
    },
    depositfiles: {
        host: ["depositfiles.com"],
        customStyle: "html{background:#121212!important}body{background:#121212!important;color:#dfdfdf!important;}#free_btn{background:#008CBA!important;border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px}#free_btn:hover{background:#0A6BD1!important;}#download_recaptcha_container{display: flex;flex-direction: column;align-items: center;}",
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
            ".chousetype",
        ],
        removeByRegex: [{ query: "td.text", regex: /No Additional Fees!/gi }],
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
            "load_ajax",
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
            "_0x2182",
            "_0x4eb5",
            "_0x401b",
            "_0x1412",
            "_0x126d",
            "_0x16be",
            "_0x5c7565",
        ],
        addInfoBanner: [{ targetElement: "#main", where: "beforeend" }],
        customScript: function () {
            var _this_1 = this;
            var _a;
            this.addJQuery();
            (_a = this.$("#download_url")) === null || _a === void 0 ? void 0 : _a.removeAttribute("style");
            this.waitUntilSelector("div[class='downloadblock']").then(function (div) {
                // #free_btn
                div.insertAdjacentHTML("afterend", "<form id=\"customForm\" method=post><input type=\"hidden\" name=\"gateway_result\" value=\"1\"/><input type=\"hidden\" name=\"asm\" value=\"0\"/><button id=\"custom-ss-button\"></button</form>");
                // document.forms.customForm.submit();
                _this_1.modifyButton("#custom-ss-button", {
                    customText: "Create Download Link",
                    props: { type: "submit" }
                });
            });
            if (window.fid) {
                var target_1 = this.$("#download_container");
                target_1 && (target_1.innerHTML = "Loading...");
                this.sleep(1000).then(function () {
                    fetch("/get_file.php?fid=".concat(window.fid, "&challenge=undefined&response=undefined&t=1"))
                        .then(function (res) { return res.text(); })
                        .then(function (html) { var _a; return (_a = html.match(/action="([^"]+)"\smethod/)) === null || _a === void 0 ? void 0 : _a[1]; })
                        .then(function (dl_link) {
                        target_1.innerHTML = "";
                        target_1.insertAdjacentElement("afterbegin", _this_1.makeSafeForm({ actionURL: dl_link }));
                    });
                });
            }
        }
    },
    clicknupload: {
        host: ["clicknupload.cc"],
        customStyle: "html, body, div.filepanel, .dfilename, #countdown, .seconds{background:#121212!important;color:#dfdfdf!important;height:inherit!important;}[id*=Ad],form>.regular{display:none!important;}#container{margin:0 auto!important;}#method_free{height:unset!important}",
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
            "form > .superfast",
            "#news_last",
        ],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "_gaq",
            "openNav",
            "closeNav",
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
            "setPagination",
            "_0xb050",
            "_0x1b62",
            "mm",
            "LieDetector",
            "AaDetector",
            "placementKey",
            "_0xa6ab",
            "_0x41de",
            "_mgIntExchangeNews",
            "AdskeeperInfC1175753",
            "AdskeeperCContextBlock1175753",
            "AdskeeperCMainBlock1175753",
            "AdskeeperCInternalExchangeBlock1175753",
            "AdskeeperCColorBlock1175753",
            "AdskeeperCRejectBlock1175753",
            "AdskeeperCInternalExchangeLoggerBlock1175753",
            "AdskeeperCObserverBlock1175753",
            "AdskeeperCSendDimensionsBlock1175753",
            "AdskeeperCAntifraudStatisticsBlock1175753",
            "AdskeeperCRtbBlock1175753",
            "AdskeeperCIframeSizeChangerBlock1175753",
            "AdskeeperCContentPreviewBlock1175753",
            "AdskeeperCGradientBlock1175753",
            "AdskeeperCResponsiveBlock1175753",
            "mg_loaded_307473_1175753",
            "AdskeeperInfC1175754",
            "AdskeeperCContextBlock1175754",
            "AdskeeperCMainBlock1175754",
            "AdskeeperCInternalExchangeBlock1175754",
            "AdskeeperCColorBlock1175754",
            "AdskeeperCRejectBlock1175754",
            "AdskeeperCInternalExchangeLoggerBlock1175754",
            "AdskeeperCObserverBlock1175754",
            "AdskeeperCSendDimensionsBlock1175754",
            "AdskeeperCAntifraudStatisticsBlock1175754",
            "AdskeeperCRtbBlock1175754",
            "AdskeeperCIframeSizeChangerBlock1175754",
            "AdskeeperCContentPreviewBlock1175754",
            "AdskeeperCGradientBlock1175754",
            "AdskeeperCResponsiveBlock1175754",
            "mg_loaded_307473_1175754",
            "onClickExcludes",
            "mgReject1175753",
            "mgLoadAds1175753_085db",
            "AdskeeperCReject1175753",
            "AdskeeperLoadGoods1175753_085db",
            "_mgq",
            "_mgqp",
            "_mgqt",
            "_mgqi",
            "mgReject1175754",
            "mgLoadAds1175754_05024",
            "AdskeeperCReject1175754",
            "AdskeeperLoadGoods1175754_05024",
            "AdskeeperCSvsdsFlag",
            "_mgCanonicalUri",
            "_mgPageViewEndPoint307473",
            "_mgPvid",
            "_mgPageView307473",
            "i.js.loaded",
            "i-noref.js.loaded",
        ],
        addInfoBanner: [
            { targetElement: "div#content div.download", where: "afterend" },
        ],
        createCountdown: { element: ".seconds" },
        modifyButtons: [
            [
                "input#method_free",
                {
                    replaceWithTag: "button",
                    customText: "Free Download",
                    moveTo: {
                        target: "form > .regular",
                        position: "beforeend",
                        findParentByTag: "form"
                    }
                },
            ],
            [
                "center > button#downloadbtn",
                { customText: "Create Download Link", makeListener: true },
            ],
            [
                "td > button#downloadbtn",
                {
                    customText: "Start Download",
                    replaceWithForm: true,
                    fn: function (btn) {
                        var _a;
                        btn.href = (_a = btn
                            .getAttribute("onclick")) === null || _a === void 0 ? void 0 : _a.replace(/window.open\('|'\);/gi, "");
                    }
                },
            ],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () {
            // this.interceptAppendChild();
            // this.interceptAddEventListeners();
            // click the "Slow Download" option on page 1
            // this.$("#method_free")?.click();
            var captcha_box = this.$("table table div");
            if (captcha_box) {
                captcha_box.style.color = "#dfdfdf";
                captcha_box.style.background = "#121212";
                var captcha_code = __spreadArray([], captcha_box === null || captcha_box === void 0 ? void 0 : captcha_box.children, true).sort(function (x, y) {
                    var _a, _b;
                    return ((_a = x.style) === null || _a === void 0 ? void 0 : _a.paddingLeft.match(/(\d+)/g)[0]) -
                        ((_b = y.style) === null || _b === void 0 ? void 0 : _b.paddingLeft.match(/(\d+)/g)[0]);
                })
                    .map(function (e) { return e.textContent; })
                    .join("");
                this.$("input.captcha_code").value = captcha_code;
                // this.origSetTimeout(() => {
                //   document.forms?.F1?.submit();
                // }, this.$(".seconds").textContent * 1000 || 12 * 1000);
            }
            // this.waitUntilSelector("td > button#downloadbtn").then((btn) => {
            //   this.modifyButton(btn, {});
            //   const anchor = this.document.createElement("a");
            //   const dl_link = btn
            //     .getAttribute("onclick")
            //     ?.replace(/window.open\('|'\);/gi, "");
            //   anchor.href = dl_link;
            //   btn.replaceWith(
            //     this.makeSafeForm({ actionURL: dl_link, method: "GET" })
            //   );
            //   this.modifyButton(anchor, { customText: "Start Download" });
            //   this.addHoverAbility([".ss-animated-button"], false);
            //   this.openNative(dl_link, "_self");
            // });
        }
    },
    hexupload: {
        host: ["hexupload.net"],
        customStyle: "html,body{background:#121212!important;color:#dfdfdf!important}#container{background:#121212!important;display:flex;flex-direction:column;justify-content:center;align-items:center}.container{background:#121212!important;display:flex;flex-direction:column;justify-content:center;align-items:center}.download_box{background-color:#323232!important}.bg-white{background:#121212!important}",
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
        removeByRegex: [
            { query: "center", regex: /All transactions are 100% safe and secure/gi },
        ],
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
        addInfoBanner: [{ targetElement: "form", where: "beforeend" }],
        modifyButtons: [
            [
                "input[name='method_free']",
                {
                    replaceWithTag: "button",
                    customText: "Start Download",
                    moveTo: { target: "form", position: "afterbegin" }
                },
            ],
        ],
        customScript: function () { }
    },
    veryfiles: {
        host: ["veryfiles.com"],
        customStyle: "html{background:#121212!important}body,.blockpage, .download1page .txt,.title{background:#121212!important;color:#dfdfdf!important}.download1page .blockpage .desc span,.download1page .blockpage .desc p{color:#dfdfdf!important}#wrapper{margin:unset!important;}",
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
        removeByRegex: [{ query: ".blockpage .row", regex: /About APK files/i }],
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
        addInfoBanner: [
            { targetElement: ".blockpage", where: "beforeend" },
            { targetElement: "#commonId", where: "beforeend" },
        ],
        modifyButtons: [
            [
                "button#downloadbtn",
                { requiresCaptcha: true, requiresTimer: true, makeListener: true },
            ],
            ["#direct_link a", { replaceWithForm: true }],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () { }
    },
    douploads: {
        host: ["douploads.net"],
        customStyle: "html,body,#container,.fileInfo,.bg-white{background:#121212!important;color:#dfdfdf!important}.download_box{background-color:#323232!important}body > section,html>div,.it-client{display:none!important}body{padding-bottom:unset!important}",
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
            "#downloadBtnClick",
        ],
        removeByRegex: [
            { query: ".download_method", regex: /fast download/gi },
            { query: "div.mt-5.text-center", regex: /No-Captcha & More/gi },
            { query: ".col-md-12", regex: /What is DoUploads/gi },
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
        addInfoBanner: [
            { targetElement: ".downloadPage > .row", where: "beforeend" },
        ],
        modifyButtons: [
            [
                "button#downloadbtn",
                {
                    requiresCaptcha: true,
                    requiresTimer: true,
                    makeListener: true,
                    props: { style: "", type: "submit" }
                },
            ],
            [".container.downloadPage > .row a.btn", { replaceWithForm: true }],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () {
            var _a, _b, _c;
            // Styling
            this.$("body").classList.remove("white");
            this.$("body").classList.add("dark");
            var setStyleSheet = function (url) {
                var stylesheet = document.getElementById("stylesheet");
                stylesheet.setAttribute("href", url);
            };
            (_b = (_a = this.window) === null || _a === void 0 ? void 0 : _a["setStyleSheet"]) === null || _b === void 0 ? void 0 : _b.call(_a, "https://douploads.net/doup1/assets/styles/dark.min.css");
            // Error Checks
            if (/proxy not allowed/gi.test((_c = this.$("center div.alert.alert-danger")) === null || _c === void 0 ? void 0 : _c.textContent)) {
                this.log("Site does not like your IP address, stopping script");
                return;
            }
            // aesthetics
            this.$$(".col-md-4").forEach(function (el) {
                el.classList.replace("col-md-4", "col-md-12");
            });
        }
    },
    upfiles: {
        host: ["upfiles.io", "upfiles.com"],
        customStyle: "html,body,.bg-white{background:#121212!important;color:#dfdfdf!important}#container{background:#121212!important}.download_box{background-color:#323232!important}",
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
            "body > div.container",
        ],
        removeByRegex: [{ query: "body > div.container", regex: /what is the/gi }],
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
        addInfoBanner: [{ targetElement: ".container", where: "beforeend" }],
        modifyButtons: [
            [
                "form button#invisibleCaptchaShortlink",
                { requiresCaptcha: true, makeListener: true },
            ],
            ["form button[type='submit']:not(#invisibleCaptchaShortlink)"],
        ],
        createCountdown: { element: "#timer.timer" },
        customScript: function () {
            var _this_1 = this;
            this.window.onbeforeunload = function () { };
            this.waitUntilSelector("div#captchaDownload").then(function (captchaDownloadContainer) {
                _this_1.createGoogleRecaptcha(captchaDownloadContainer, "6LcsK9kaAAAAABe3I5PTS2zqmeKl3XueBrKNk3-Z");
            });
            this.waitUntilSelector("form#go-link").then(function (form) { return __awaiter(_this_1, void 0, void 0, function () {
                var url, body, btn;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = form.action;
                            body = {};
                            btn = this.$("a.get-link");
                            form.querySelectorAll("input").forEach(function (e) { return (body[e.name] = e.value); });
                            this.modifyButton(btn, { requiresTimer: true, makeListener: true });
                            return [4 /*yield*/, this.sleep(10 * 1000)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, fetch(url, {
                                    headers: {
                                        accept: "*/*",
                                        "accept-language": "en-US,en;q=0.9",
                                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                        "sec-fetch-dest": "empty",
                                        "sec-fetch-mode": "cors",
                                        "sec-fetch-site": "same-origin",
                                        "sec-gpc": "1",
                                        "x-requested-with": "XMLHttpRequest"
                                    },
                                    referrerPolicy: "strict-origin-when-cross-origin",
                                    body: new URLSearchParams(body).toString(),
                                    method: "POST",
                                    mode: "cors",
                                    credentials: "include"
                                })
                                    .then(function (res) { return res.json(); })
                                    .then(function (data) {
                                    btn.href = data.url;
                                    btn.innerText = "Start Download";
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    },
    tusfiles: {
        host: ["tusfiles.com"],
        customStyle: "html,body,.box{background:#121212!important;color:#dfdfdf!important}body{min-height:unset!important}",
        downloadPageCheckBySelector: ["form[name='F1']", "button#downloadbtn"],
        downloadPageCheckByRegex: [],
        remove: [],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "k",
            "_489b31ngxhe",
            "h2canfv0wdg",
            "zfgformats",
            "setImmediate",
            "clearImmediate",
            "_gcpdyiwz",
            "_eldwza",
            "__rocketLoaderEventCtor",
            "__rocketLoaderLoadProgressSimulator",
            "__cfQR",
            "delComment",
            "player_start",
            "copyc",
            "jQuery110206240749867981399",
            "app",
            "cookieconsent",
            "gtag",
            "dataLayer",
            "__cfRLUnblockHandlers",
            "google_tag_manager",
            "google_tag_data",
            "GoogleAnalyticsObject",
            "ga",
            "onClickTrigger",
            "kkp4a5x5tv",
            "zfgloadedpopup",
            "ppuWasShownFor2876021",
            "gaplugins",
            "gaGlobal",
            "gaData",
        ],
        addInfoBanner: [{ targetElement: "form[name='F1']", where: "beforebegin" }],
        modifyButtons: [
            [
                "button#downloadbtn",
                { customText: "Start Download", makeListener: true },
            ],
        ],
        createCountdown: undefined,
        customScript: function () { }
    },
    centfile: {
        host: ["centfile.com"],
        customStyle: "html,body,.box,header,.page-wrap,div.text-center > div.text-center,.page-wrap > div:not([class*=ss-alert]),table tbody,table tbody tr:nth-child(even){background:#121212!important;color:#dfdfdf!important}a{color:#94b9ff!important}.rightcol{margin:25px!important}",
        downloadPageCheckBySelector: ["button#method_free"],
        downloadPageCheckByRegex: [/for your IP next 24 hours/gi],
        remove: [
            "div.top",
            "p[align='center']",
            "footer",
            "#fb-root",
            "#fixedban",
            "#back-to-top",
            "br",
            "div.pricingboxes-comparison",
            "div.row.collapse",
            "ul.features",
            "center > b",
            "div.header.d-flex",
            "[id*='hiddensection']",
            ".adsbygoogle",
            ".download_method a",
            "fixedban",
            "#close-fixedban",
            ".slicknav_menu",
            "pace",
            "button.btn-xs.btn-link",
            "table.filepanel tr:nth-child(5)",
            ".row > .col-md-4:nth-child(3) button",
        ],
        removeByRegex: [
            { query: "center div[style*='800']", regex: /TRAVEL SINGAPORE CITY/gi },
            {
                query: ".row div.col-md-4.text-center:nth-child(n+2)",
                regex: /dowasdadnload/gi
            },
        ],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "setPagination",
            "fbAsyncInit",
            "FB",
            "adsbygoogle",
            "Pace",
            "WOW",
            "speed",
            "startTicker",
            "animateTickerElementHorz",
            "canTick",
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
            "google_spfd",
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
            "gaGlobal",
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
            "share_facebook",
            "share_twitter",
            "share_gplus",
            "share_vk",
            "timeout",
            "didntload",
            "loads",
            "google_lpabyc",
            "delComment",
            "player_start",
            "closure_lm_155599",
            "google_trust_token_operation_promise",
        ],
        addInfoBanner: [{ targetElement: "form[name='F1']", where: "afterend" }],
        createCountdown: undefined,
        modifyButtons: [
            [
                "form[name='F1'] input[name='method_free']",
                {
                    customText: "Create Download Link",
                    makeListener: true,
                    moveTo: { target: "form[name='F1']", position: "beforeend" },
                    requiresCaptcha: true,
                    replaceWithTag: "button"
                },
            ],
            [
                "form:not([name='F1']) input[name='method_free']",
                {
                    customText: "Free Download",
                    makeListener: true,
                    replaceWithTag: "button"
                },
            ],
        ],
        customScript: function () {
            var _this_1 = this;
            this.$$(".col-md-4").forEach(function (e) {
                return e.classList.replace("col-md-4", "col-md-12");
            });
            this.waitUntilSelector(".err").then(function (err) {
                var parent = err.parentElement;
                parent.insertAdjacentElement("beforebegin", err);
            });
            this.waitUntilSelector("div > span > a[href][onclick]").then(function (dl_btn) {
                var _a, _b;
                var target = _this_1.$(".page-wrap");
                target === null || target === void 0 ? void 0 : target.insertAdjacentElement("beforeend", _this_1.makeSafeForm({ actionURL: dl_btn.href, method: "GET" }));
                _this_1.addInfoBanner({ targetElement: target, where: "beforeend" });
                (_b = (_a = _this_1.findParentElementByTagName(dl_btn, "center")) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
                dl_btn.remove();
            });
        }
    },
    fastclick: {
        host: ["fastclick.to"],
        customStyle: "html,body,main,#container,.bg-white{background:#121212!important;color:#dfdfdf!important}a{color:#94b9ff!important}.rightcol{margin:25px!important}div.py-3.px-5.rounded-lg.mb-4.mb-xl-6.text-primary.d-flex.align-items-center{background:#212121!important}.text-primary{color:#6e6fef!important}",
        downloadPageCheckBySelector: [
            "button#method_free",
            "button#downloadbtn.downloadbtn",
            "a.btn-download.btn",
        ],
        downloadPageCheckByRegex: [],
        remove: [
            "header",
            "footer",
            "div.dowload-features",
            "main .container .container",
            "div.h2.text-center.mb-3",
            "a[href*='premium']",
            "div.download-page.text-white.mb-4.mb-lg-6",
        ],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "_gaq",
            "_gat",
            "gaGlobal",
            "Dialogs",
            "delComment",
            "player_start",
            "timer",
            "closure_lm_182125",
        ],
        addInfoBanner: [],
        createCountdown: { element: "div.timer-count" },
        modifyButtons: [
            [
                "button#method_free.download-btn",
                {
                    customText: "Free Download",
                    moveTo: { target: "form[action='']", position: "beforeend" }
                },
            ],
            [
                "button#downloadbtn.downloadbtn",
                { requiresCaptcha: true, makeListener: true },
            ],
            ["a.btn-download.btn", { replaceWithForm: true }],
        ],
        customScript: function () { }
    },
    chedrive: {
        host: ["chedrive.com", "chedrive.net"],
        customStyle: "html,body,.blockpage,.desc span{background:#121212!important;color:#dfdfdf!important}.blockpage,a:not([href]){color:#121212!important}.download1page #countdown{display:block!important;}",
        downloadPageCheckBySelector: [
            "form[name='F1']",
            "button#downloadbtn",
            "span#direct_link a",
            "input.mngez-free-download",
        ],
        downloadPageCheckByRegex: [/File Download Link Generated/gi],
        remove: [
            "header",
            "#gdpr-cookie-notice",
            "#footer2",
            "footer",
            ".menufooter",
            "#sidebarphone",
            "div[id*='ScriptRoot']",
            "[class^=banner]",
            "br",
            "ins",
            ".fileoption > ul:not([class])",
            "input[name='method_premium']",
            "#arlinablock",
            "div[data-psid]",
            ".as_ads_guard",
            ".sharefile",
            ".adsbox",
            "#countdown", // countdown is not checked by server, so it can be skipped
        ],
        removeByRegex: [
            {
                query: "div[class='txt']",
                regex: /what is chedrive|Why to Use Chedrive|Chedrive File Hosting|cloud computing/gi
            },
            {
                query: "div.blockpage > form > .row > div[class='col-12']",
                regex: /Direct Download|adsbygoogle/gi
            },
            { query: "a.btn.btn-success[href]", regex: /Direct Link Download/gi },
        ],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "setPagination",
            "_gaq",
            "WOW",
            "_taboola",
            "google_js_reporting_queue",
            "google_srt",
            "google_logging_queue",
            "google_ad_modifications",
            "ggeac",
            "google_measure_js_timing",
            "google_reactive_ads_global_state",
            "adsbygoogle",
            "_gfp_a_",
            "google_sa_queue",
            "google_sl_win",
            "google_process_slots",
            "google_spfd",
            "google_unique_id",
            "google_sv_map",
            "google_user_agent_client_hint",
            "downloadJSAtOnload",
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
            "timeout",
            "google_lpabyc",
            "relocate_home",
            "delComment",
            "player_start",
            "showFullScreen",
            "cookiesAgree",
            "GoogleGcLKhOms",
            "google_image_requests",
            "kAWgyOxXhTis",
            "vRowKfzUKP",
            "cIuqJzgWhJ",
            "JhOjFdIupR",
            "ZWTPEQZYhZ",
            "kRBeOhzLuY",
            "oAAUBciJwG",
            "CWSTRhNQZH",
            "c2",
            "c1",
            "mAsZVZBrQfEY",
            "RbntPCrNXp",
            "hm",
            "s",
            "R",
            "X",
            "options",
            "lary",
            "addEventListener",
            "Fingerprint2",
            "bmblocks",
            "ifrm1",
            "ifrm2",
            "ifrm3",
            "ifrm4",
            "ifrm5",
            "changed",
            "__adFormats",
            "__formatsGetters",
            "AdManager",
            "a3klsam",
            "createCANativeAd",
            "__banner-init",
            "initCalendarBanner",
            "adblock",
            "__core-js_shared__",
            "__bdExecutedScripts",
            "cb8155264343f390c668fd988b17f55fda319f41b7",
        ],
        addInfoBanner: [
            { targetElement: "#commonId", where: "beforeend" },
            { targetElement: "span#direct_link", where: "afterend" },
        ],
        createCountdown: undefined,
        modifyButtons: [
            [
                "button#downloadbtn.downloadbtn",
                { customText: "Create Download Link" },
            ],
            [
                "span#direct_link a",
                { customText: "Start Download", replaceWithForm: true },
            ],
            [
                "input.mngez-free-download",
                { customText: "Free Download", replaceWithTag: "button" },
            ],
        ],
        customScript: function () {
            var _a, _b;
            (_a = this.$("div.col-xs-12.col-sm-12.col-md-4.col-lg-4")) === null || _a === void 0 ? void 0 : _a.setAttribute("class", "col-12");
            (_b = this.$("div.col-xs-12.col-sm-12.col-md-4.col-lg-4")) === null || _b === void 0 ? void 0 : _b.setAttribute("class", "col-12");
            __spreadArray([], document.querySelectorAll("div"), true).filter(function (div) { return div.textContent.trim().length == 0; })
                .forEach(function (e) { return e.remove(); });
        }
    },
    nitro: {
        host: ["nitro.download"],
        customStyle: "html,body,#container,legend,#view,h1{background:#121212!important;color:#dfdfdf!important}#container{box-shadow:unset!important}a{color:#3096fb!important}#beforeReCaptcha{font-size:28px!important;}",
        downloadPageCheckBySelector: ["button#slow-download", "#startFreeDownload"],
        downloadPageCheckByRegex: [],
        remove: [
            "#header",
            "#footer",
            "#footerCredits",
            "#lang",
            "body > div[style*='color: #fff']",
            "[id*='superbox']",
            "#bottomAlerts",
            "#alerts",
            ".purchaseNoWaiting",
            ".noticeMessage",
            "#popupContent",
            "#triggerPopup",
            ".adsbygoogle",
            // "#beforeReCaptcha"
        ],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "gtag",
            "dataLayer",
            "adsbygoogle",
            "pop3",
            "timeCirclesCallback",
            "TC_Instance_List",
            // "timerSeconds",
            "$button",
            // "fileId",
            "url",
            // "startFreeDownload",
            // "setCookie",
            "swfobject",
            "RandHash2",
            "lang",
            "tlite",
            "openAlert",
            "closeAlert",
            "$innerbox",
            "google_tag_manager",
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
            "google_spfd",
            "google_unique_id",
            "google_sv_map",
            "google_lpabyc",
            "google_tag_data",
            "gaGlobal",
            "onYouTubeIframeAPIReady",
            "google_user_agent_client_hint",
            "Goog_AdSense_getAdAdapterInstance",
            "Goog_AdSense_OsdAdapter",
            "google_sa_impl",
            "google_persistent_state_async",
            "googleToken",
            "googleIMState",
            "_gfp_p_",
            "processGoogleToken",
            "google_global_correlator",
            "google_prev_clients",
            "goog_pvsid",
            "google_jobrunner",
            "ampInaboxIframes",
            "ampInaboxPendingMessages",
            "goog_sdr_l",
            "googletag",
            "GoogleGcLKhOms",
            "google_image_requests",
        ],
        addInfoBanner: [{ targetElement: "#container", where: "beforeend" }],
        createCountdown: { timer: 120 },
        modifyButtons: [
            ["button#slow-download"],
            [
                "button#sendReCaptcha",
                {
                    customText: "Free Download",
                    requiresCaptcha: true,
                    requiresTimer: true,
                    makeListener: true,
                    eventHandlers: {
                        click: function (e) {
                            var _a, _b, _c, _d;
                            e.preventDefault();
                            if (!this.classList.contains("ss-btn-ready")) {
                                return;
                            }
                            fetch("https://nitro.download/ajax/freeDownload.php", {
                                headers: {
                                    accept: "*/*",
                                    "accept-language": "en-US,en;q=0.9",
                                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                    "sec-fetch-dest": "empty",
                                    "sec-fetch-mode": "cors",
                                    "sec-fetch-site": "same-origin",
                                    "x-requested-with": "XMLHttpRequest"
                                },
                                body: "method=fetchDownload&g-recaptcha-response=".concat((_b = (_a = window === null || window === void 0 ? void 0 : window.hcaptcha) === null || _a === void 0 ? void 0 : _a.getResponse) === null || _b === void 0 ? void 0 : _b.call(_a), "&h-captcha-response=").concat((_d = (_c = window === null || window === void 0 ? void 0 : window.hcaptcha) === null || _c === void 0 ? void 0 : _c.getResponse) === null || _d === void 0 ? void 0 : _d.call(_c)),
                                method: "POST",
                                mode: "cors",
                                credentials: "include"
                            })
                                .then(function (res) { return res.text(); })
                                .then(function (anchor) {
                                var _a;
                                var dl_link = (_a = anchor.match(/"(https:\/\/[^"]+)"/)) === null || _a === void 0 ? void 0 : _a[1];
                                if (dl_link) {
                                    document.querySelector("#cpatchaAndButton").innerHTML = "";
                                    document
                                        .querySelector("#cpatchaAndButton")
                                        .insertAdjacentElement("afterbegin", siteScrubber.makeSafeForm({ actionURL: dl_link }));
                                }
                                else {
                                    console.log("Failed to get dl_link", dl_link);
                                }
                            });
                        }
                    }
                },
            ],
            // ["button#beforeStartTimerBtn", { customText: "Start Timer" }],
        ],
        customScript: function () {
            var _this_1 = this;
            if (this.$("#fileId")) {
                var headers_1 = {
                    accept: "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest"
                };
                fetch("https://nitro.download/ajax/setCookie.php", {
                    headers: headers_1,
                    body: "fileId=".concat(this.$("#fileId").value),
                    method: "POST",
                    mode: "cors",
                    credentials: "include"
                }).then(function () {
                    fetch("https://nitro.download/ajax/freeDownload.php", {
                        headers: headers_1,
                        body: "method=startTimer&fileId=".concat(_this_1.$("#fileId").value),
                        method: "POST",
                        mode: "cors",
                        credentials: "include"
                    })
                        .then(function (res) { return res.text(); })
                        .then(function (data) {
                        if (data == "1") {
                            _this_1.$("#beforeReCaptcha").innerHTML = "Wait <span class=\"seconds\">120</span> seconds";
                            _this_1.createCountdown({ element: ".seconds" });
                        }
                        else {
                            _this_1.$("#beforeReCaptcha").innerHTML = data;
                        }
                    });
                });
            }
            this.waitUntilSelector("button#slow-download").then(function (btn) {
                var _a, _b;
                var form = btn.parentElement;
                (_a = _this_1.$("#container")) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement("afterbegin", form);
                (_b = _this_1.$("#container > .content")) === null || _b === void 0 ? void 0 : _b.remove();
            });
            this.waitUntilSelector("#reCaptcha").then(function (div) {
                div.style = "";
            });
        }
    },
    intoupload: {
        host: ["intoupload.net"],
        customStyle: "html,body,.content{background:#121212!important;color:#dfdfdf!important}.downloadarea,.downloadinfo,.title{background:#212121!important;}.content{border:unset!important;}",
        downloadPageCheckBySelector: ["#downloadBtnClick", "#direct_link"],
        downloadPageCheckByRegex: [/available for your IP/gi],
        remove: [
            "#fb-root",
            "#sidebarphone",
            "#intro",
            "#socialmedia",
            "footer",
            "#footer2",
            "#banner_ad",
            "#outbrain-paid",
            ".txt",
            "[class^=banner]",
            "div.checkbox.checkbox-info.off",
            ".reportfile",
            "#downloadBtnClick",
            "table",
            "center",
        ],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "setPagination",
            "_gaq",
            "_gat",
            "gaGlobal",
            "share_facebook",
            "share_twitter",
            "share_gplus",
            "share_vk",
            "timeout",
            "delComment",
            "player_start",
            "google_js_reporting_queue",
            "google_srt",
            "google_logging_queue",
            "google_ad_modifications",
            "ggeac",
            "google_measure_js_timing",
            "google_plmetrics",
            "google_reactive_ads_global_state",
            "adsbygoogle",
            "_gfp_a_",
            "google_sa_queue",
            "google_sl_win",
            "google_process_slots",
            "google_spfd",
            "google_unique_id",
            "google_sv_map",
            "ddUeMxctMpis",
            "yQTyIzoEOE",
            "dakPYcnsXg",
            "fPlRMmBMBE",
            "JXhPPkjStt",
            "jVMvbskSNn",
            "jVDnCMNphL",
            "vDgRctdjjq",
            "c2",
            "c1",
            "hnfy8HUSy6uh",
            "MlLWbJZpcX",
            "google_user_agent_client_hint",
            "Goog_AdSense_getAdAdapterInstance",
            "Goog_AdSense_OsdAdapter",
            "google_sa_impl",
            "google_persistent_state_async",
            "googleToken",
            "googleIMState",
            "_gfp_p_",
            "processGoogleToken",
            "google_global_correlator",
            "google_prev_clients",
            "goog_pvsid",
            "google_jobrunner",
            "ampInaboxIframes",
            "ampInaboxPendingMessages",
            "goog_sdr_l",
            "FB",
            "closure_lm_915809",
            "wdbvrjbm3ml",
            "zfgformats",
            "webpushlogs",
            "initIPP",
            "GoogleGcLKhOms",
            "google_image_requests",
        ],
        addInfoBanner: [
            { targetElement: ".mngez_downloadpage1", where: "beforeend" },
            { targetElement: "#mngez_download2", where: "beforeend" },
        ],
        modifyButtons: [
            [
                "#downloadbtn",
                { requiresCaptcha: true, requiresTimer: true, makeListener: true },
            ],
            [
                "#direct_link > a",
                { replaceWithForm: true, customText: "Start Download" },
            ],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () {
            this.$$(".col-md-8, .col-lg-8, .col-md-6, .col-lg-6, .col-md-4, .col-lg-4").forEach(function (el) {
                el.classList.replace("col-lg-4", "col-lg-12");
                el.classList.replace("col-lg-6", "col-lg-12");
                el.classList.replace("col-lg-8", "col-lg-12");
                el.classList.replace("col-md-4", "col-md-12");
                el.classList.replace("col-md-6", "col-md-12");
                el.classList.replace("col-md-8", "col-md-12");
            });
        }
    },
    filerio: {
        host: ["filerio.in"],
        customStyle: "html,body,.bg-white,.download_box{background:#121212!important;color:#dfdfdf!important}.download_box{display:flex!important;flex-direction:column!important;align-items:center!important;border:unset!important;}",
        downloadPageCheckBySelector: ["input[name='method_free']", ".download_box"],
        downloadPageCheckByRegex: [],
        remove: [
            "nav",
            "body > div.container.py-5",
            "footer",
            "br",
            ".features__section",
            ".sharetabs",
            "#content",
        ],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "setPagination",
            "_gaq",
            "_gat",
            "gaGlobal",
            "BuildButtons",
            "__core-js_shared__",
            "feather",
            "LAST_CORRECT_EVENT_TIME",
            "_533899577",
            "_2984300562",
            "iinf",
            "delComment",
            "player_start",
            "showFullScreen",
            "closure_lm_672589",
            "setCookie",
            "getCookie",
            "eraseCookie",
            "keepID",
        ],
        addInfoBanner: [
            { targetElement: "form:not([name='F1'])" },
            { targetElement: ".download_box" },
        ],
        modifyButtons: [
            [
                "form:not([name='F1']) input[name='method_free']",
                { replaceWithTag: "button", customText: "Free Download" },
            ],
            [
                "button#downloadbtn",
                {
                    replaceWithTag: "button",
                    requiresCaptcha: true,
                    makeListener: true,
                    customText: "Create Download Link"
                },
            ],
            [".download_box > a", { replaceWithForm: true }],
        ],
        createCountdown: undefined,
        customScript: function () {
            this.$$(".col-md-8, .col-lg-8, .col-md-6, .col-lg-6, .col-md-4, .col-lg-4").forEach(function (el) {
                el.classList.replace("col-lg-4", "col-lg-12");
                el.classList.replace("col-lg-6", "col-lg-12");
                el.classList.replace("col-lg-8", "col-lg-12");
                el.classList.replace("col-md-4", "col-md-12");
                el.classList.replace("col-md-6", "col-md-12");
                el.classList.replace("col-md-8", "col-md-12");
            });
        }
    },
    filelox: {
        host: ["filelox.com"],
        customStyle: "html,body,.file-info,h4{background:#121212!important;color:#dfdfdf!important}",
        downloadPageCheckBySelector: ["#btn_method_free", "#downloadbtn"],
        downloadPageCheckByRegex: [],
        remove: [
            "nav",
            "footer",
            ".download-page > center",
            ".table-download table tr:nth-child(-n+10)",
            "#btn_method_premium",
            "#btn_method_free ~ *",
            "td.descr",
            ".promo-container",
            ".report-abuse",
        ],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "_gaq",
            "setPagination",
            "atOptions",
            "_gat",
            "gaGlobal",
            "delComment",
            "player_start",
            "timeout",
            "k",
            "_v551ygr5lqm",
            "0z1mjv6rdbkr",
            "zfgformats",
            "setImmediate",
            "clearImmediate",
            "_joetzrvb",
            "_gapnvzv",
            "clipboard",
            "_Hasync",
            "chfh",
            "chfh2",
            "_HST_cntval",
            "Histats",
            "webpushlogs",
            "initIPP",
            "_HistatsCounterGraphics_9_setValues",
            "_value_RETURN_BUILDER",
            "_HistatsCounterGraphics_9",
            "histats_canvascounters_base.js",
            "a",
            "cv",
            "Tynt",
            "_dtspv",
            "_33Across",
            "__uspapi",
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
            "_pop",
            "p$00a",
            "_0x5d4b",
            "_0x208c",
            "p$00a1633309931319zz",
            "decrypt",
            "w71111",
            "K5gg",
            "w2r",
            "s5gg",
            "handleException",
            "B6cc",
            "g6cc",
            "x6cc",
            "z3xx",
            "c3xx",
            "k3xx",
            "T9II",
            "_cl6rbagn4kl6817yb9eplb",
            "__abstract",
            "__optimize",
            "__residual",
            "_clkqnea5gc6mdf08c08j2z",
            "_clhqo2t2gmc5p1amjisyc7",
            "detectZoom",
            "iframe",
            "where",
            "win",
            "_pao",
            "popns",
            "pop_cdn",
            "d7RR",
            "k7RR",
            "n7RR",
            "N6CC",
            "f6CC",
            "y6CC",
            "b133",
            "IOarzRhPlP",
            "x1FF",
            "b1FF",
            "n1FF",
            "w922",
            "h922",
            "P922",
            "$jscomp",
            "$jscomp$lookupPolyfilledValue",
            "AdscoreInit",
            "pako",
            "txt",
            "ed",
            "t",
            "property",
            "brand",
            "r",
            "g",
            "b",
            "bt",
            "_0x173b",
            "_0x2697",
            "LieDetector",
            "atAsyncContainers",
            "_0x126d",
            "_0x16be",
            "_0x5c7565",
            "mm",
            "AaDetector",
            "placementKey",
            "rp",
            "_0x5133",
            "_0x1351",
            "_0x1b79d4",
            "_0xa6ab",
            "_0x41de",
            "sdif2zyaz1o",
        ],
        addInfoBanner: [{ targetElement: "#container" }],
        modifyButtons: [
            [
                "#btn_method_free",
                { replaceWithTag: "button", customText: "Free Download" },
            ],
            [
                "#downloadbtn",
                {
                    requiresTimer: true,
                    makeListener: true,
                    customText: "Start Download",
                    props: { type: "submit" }
                },
            ],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () { }
    },
    ddownload: {
        host: ["ddownload.com"],
        customStyle: "html,body,.file-info,h4{background:#121212!important;color:#dfdfdf!important}",
        downloadPageCheckBySelector: ["#downloadbtn", ".download-page"],
        downloadPageCheckByRegex: [],
        remove: [
            "nav",
            "footer",
            ".plans-wrapper",
            ".plan-header",
            ".report-abuse",
        ],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [],
        addInfoBanner: [{ targetElement: "#container" }],
        modifyButtons: [
            [
                "#downloadbtn",
                {
                    requiresCaptcha: true,
                    makeListener: true,
                    customText: "Create Download Link"
                },
            ],
        ],
        createCountdown: undefined,
        customScript: function () { }
    },
    miuiku: {
        host: ["apk.miuiku.com"],
        customStyle: "html,body,.g1-row-background,.content-wrapper,.box{background:#121212!important;color:#dfdfdf!important}#ignielAdBlock{display:none!important}",
        downloadPageCheckBySelector: ["#invisibleCaptchaShortlink", ".get-link"],
        downloadPageCheckByRegex: [],
        remove: [
            ".g1-footer",
            ".g1-prefooter",
            ".g1-canvas-overlay",
            ".g1-sticky-top-wrapper",
            "#page > .g1-row-background",
            "#page > .g1-hb-row",
            ".g1-sidebar",
            "[id*='ezoic-pub-ad']",
            ".adsbygoogle",
            "#formcontinue ~ *",
            ".content > center",
            ".content > p",
            "[id*='teaser']",
            ".entry-title",
            ".main-header",
            "#cookie-pop",
            //"#test-block", // used to test if using ad blocker
            ".main-footer",
            "#ignielAdBlock",
            ".klikdisini",
        ],
        removeByRegex: [{ query: "style", regex: /ignielAdBlock \.isiAds/gi }],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "adsbygoogle",
            "_Hasync",
            "push",
            "sc",
            "h",
            "offsetTop",
            "adblock",
            "chfh",
            "chfh2",
            "_HST_cntval",
            "Histats",
            "_HistatsCounterGraphics_0_setValues",
            "parseInt", // destroy parseInt() which is used by ignielAdBlock()
        ],
        addInfoBanner: [],
        createCountdown: { element: ".timer" },
        modifyButtons: [
            [
                "#invisibleCaptchaShortlink",
                {
                    requiresCaptcha: false,
                    replaceWithTag: "button",
                    customText: "Create Download Link"
                },
            ],
            [
                ".get-link",
                {
                    requiresCaptcha: false,
                    requiresTimer: true,
                    makeListener: true,
                    customText: "Get Link",
                    className: "get-link ss-animated-button ss-w-100"
                },
            ],
        ],
        customScript: function () {
            var _this_1 = this;
            var _a;
            if (this.$("#go-link")) {
                var customButtonFunc = function () {
                    _this_1.waitUntilSelector(".ss-btn-ready").then(function () {
                        var e = window.$("#go-link");
                        window.$.ajax({
                            dataType: "json",
                            type: "POST",
                            url: e.attr("action"),
                            data: e.serialize(),
                            success: function (t) {
                                if (t === null || t === void 0 ? void 0 : t.url) {
                                    $("a.get-link")
                                        .attr("href", t.url)
                                        .removeClass("disabled")
                                        .html("Go To Download Page<span></span><span></span><span></span><span></span>");
                                    document.querySelector(".ss-btn-ready").click();
                                }
                            },
                            complete: function (t, e) { }
                        });
                    });
                };
                (_a = this.$(".ss-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", customButtonFunc, false);
            }
        }
    },
    uploady: {
        // same as userupload
        host: ["uploadydl.com"],
        customStyle: "html,body,.bg-white,.file-info,h4{background:#121212!important;color:#dfdfdf!important}",
        downloadPageCheckBySelector: ["#downloadbtn"],
        downloadPageCheckByRegex: [
            /Create download link/gi,
            /Click here to download/gi,
            /Download link generated/gi,
        ],
        remove: [
            "nav",
            "#st_gdpr_iframe",
            "#banner_ad",
            "footer",
            "div.report",
            ".adsbygoogle",
            ".bannerad",
            ".aboutFile",
            "#orquidea-slideup",
            "body > #container > style",
            "body > #container > script",
            "body > span > u",
            "center",
            ".page-content",
            "#countdown ~ a.btn-link.alert",
        ],
        removeByRegex: [],
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
            "qsx3bu3x73",
            "ppuWasShownFor3481353",
            "google_ad_client",
            "google_ad_slot",
            "google_ad_width",
            "google_ad_height",
            "interstitialSlot",
            "s65c",
            "closure_lm_409666",
            "h1j2jxd88xv",
            "__core-js_shared__",
            "1bgbb027-3b87-ae67-26ar-hz150f600z16",
            "ppuWasShownFor4635651",
            "fetch",
        ],
        addInfoBanner: [
            { targetElement: "form[name='F1'] .row", where: "beforeend" },
        ],
        modifyButtons: [
            [
                "#downloadbtn",
                {
                    requiresCaptcha: true,
                    requiresTimer: true,
                    makeListener: true,
                    props: { disabled: false, type: "submit" },
                    moveTo: { target: ".download-btn", position: "beforebegin" }
                },
            ],
            ["form a[type='button']", { replaceWithForm: true }],
        ],
        createCountdown: { element: ".seconds" },
        customScript: function () {
            var _a, _b;
            // aesthetics
            (_a = this.$$(".col-lg-4")) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
                e.classList.replace("col-lg-4", "col-lg-12");
            });
            (_b = this.$$(".border")) === null || _b === void 0 ? void 0 : _b.forEach(function (e) {
                e.classList.remove("border");
            });
            this.interceptXMLHttpRequest(function () {
                // only allow AJAX requests to Google.com
                if (arguments === null || arguments === void 0 ? void 0 : arguments[1].match(/^https:\/\/(www\.)?google\.com/)) {
                    return true;
                }
                return false;
            });
            // stop ads
            this.waitUntilSelector("body > iframe").then(function (iframe) { return iframe.remove(); });
        }
    },
    dropgalaxy: {
        host: ["dropgalaxy.com"],
        customStyle: "html,body,.fileInfo{background:#121212!important;color:#dfdfdf!important}.ss-hide,iframe[data-aa],.grid-container,.grid-container > .item,.aplvideo,.anibox{display:none!important}",
        downloadPageCheckBySelector: ["#method_free", "#downloadBtnClick", "#dl"],
        downloadPageCheckByRegex: [/Adblock Detected!/gi],
        remove: [
            "#uniccmp",
            "nav",
            "#fetchhh",
            "body > br",
            "#uniconsent-config",
            "#nativefluid",
            ".pgAdWrapper",
            ".adSpinner",
            "footer",
            "#adhesive_container",
            "#adhesive_banner",
            // "body > iframe",
            // "[id^='div-gpt-ad']",
            "div#dns",
            "br",
            "#analytics",
            "h1.text-primary",
            "button[name='method_premium']",
            "#method_free2",
            "#modalpop",
            "#overlaypop",
            "#countdown + div[class='mt-5 text-center']",
            ".container.page.faq",
            "center",
        ],
        removeByRegex: [
            { query: "body *", regex: /webpack_modules/gi },
            {
                query: "style",
                regex: /\.proads-space|purgecss|\.unic|\.adSpinner|\.pg_close-ad-btn|#news_last|\.modalpop/gi
            },
            { query: ".downloadPage div.col-md-12.py-3", regex: /sophisticated/gi },
            { query: ".downloadPage div.col-md-8.mt-5", regex: /sophisticated/gi },
            {
                query: "script",
                regex: /fetchhh\(/gi
            },
            { query: ".downloadPage div.col-md-12.mt-5", regex: /leech/gi },
        ],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            // "$",
            // "jQuery",
            "__tcfapi",
            "__uspapi",
            "adsbygoogle",
            "removeURLParameter",
            "getParameterByName",
            "updateQueryStringParameter",
            "setPagination",
            // "linksucess",
            // "go",
            "freed",
            "_0x16d8",
            "_0xc6b3ab",
            "_0x3cbc13",
            "_0x112ff3",
            "_0x105c91",
            "_0x1b9f42",
            "_0x25716d",
            "goog_pvsid",
            "ggeac",
            "google_tag_data",
            "google_js_reporting_queue",
            "__core-js_shared__",
            "gptAdSlots",
            "interstitialSlot",
            "staticSlot",
            "anchorSlot",
            "vmpbjs",
            "vpb",
            "__unic_cmp_id",
            // "__unic_cmp_host",
            // "__unic_loadapp",
            "google_measure_js_timing",
            "emptyFn",
            "google_DisableInitialLoad",
            "protag_matomo_domain",
            "protag_matomo_SiteID",
            "google_reactive_ads_global_state",
            "colors",
            "setStyleSheet",
            "changecolor",
            "ClipboardJS",
            "unicj",
            "__unic_start",
            "UnicI",
            "__cfBeacon",
            "__unicapi",
            "__unic_tags_loaded",
            "e",
            "__adb",
            "site",
            "document.write",
            "colortheme",
            "color",
            "_0x4a8e",
            "protag",
            "googletag",
            "showFullScreen",
            "isDesktop",
            "agentt",
            "ftch",
            // "LALLJLutmoZpvvbikjaWM", // encoder
            // "tokn",
            // "toknst",
            "mousehandler",
            "disableCtrlKeyCombination",
            "loaded",
            "timeout",
            "_VLIOBJ",
            "vitag",
            "getEidsByVLI",
            "tagApi",
            "viAPItag",
            "observeElementInViewport",
            "vlipbChunk",
            "vlipb",
            "_pbjsGlobals",
            "ADAGIO",
            "mnet",
            "nobidVersion",
            "nobid",
            "$sf",
            "_google_rum_ns_",
            "google_persistent_state_async",
            "google_global_correlator",
            "google_srt",
            "mb",
            "Goog_AdSense_Lidar_sendVastEvent",
            "Goog_AdSense_Lidar_getViewability",
            "Goog_AdSense_Lidar_getUrlSignalsArray",
            "Goog_AdSense_Lidar_getUrlSignalsList",
            "module$contents$ima$CompanionAdSelectionSettings_CompanionAdSelectionSettings",
            "module$contents$ima$AdsRenderingSettings_AdsRenderingSettings",
            "ima",
            "module$contents$ima$AdCuePoints_AdCuePoints",
            "module$contents$ima$AdError_AdError",
            "module$contents$ima$AdErrorEvent_AdErrorEvent",
            "module$contents$ima$AdEvent_AdEvent",
            "module$contents$ima$AdsManagerLoadedEvent_AdsManagerLoadedEvent",
            "google",
            "pgDevice",
        ],
        addInfoBanner: [{ targetElement: ".downloadPage", where: "beforeend" }],
        createCountdown: { element: ".seconds", timer: 6 },
        modifyButtons: [
            ["button#method_free", { makeListener: false, props: { style: "" } }],
            [
                "#downloadBtnClick",
                { requiresTimer: true, makeListener: true, props: { style: "" } },
            ],
            [
                "button#dl",
                {
                    makeListener: false,
                    customText: "Download Now",
                    props: { onclick: null, style: "" }
                },
            ],
        ],
        customScript: function () {
            var _this_1 = this;
            var _a, _b, _c, _d;
            // aethestics
            (_b = (_a = document.body) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.replace("white", "dark");
            (_d = (_c = this.window) === null || _c === void 0 ? void 0 : _c["setStyleSheet"]) === null || _d === void 0 ? void 0 : _d.call(_c, "https://dropgalaxy.com/assets/styles/dark.min.css");
            this.$$(".col-md-4").forEach(function (ele) {
                return ele.classList.replace("col-md-4", "col-md-12");
            });
            // enable right-click
            document.body.oncontextmenu = function () { };
            this.$("#downloadhash") && (this.$("#downloadhash").value = "1");
            this.$("#badip") && (this.$("#badip").value = "0");
            this.$("#gads") && (this.$("#gads").value = "1");
            // this.interceptAppendChild(() => {
            //   console.log("args", arguments);
            // });
            this.interceptAddEventListeners(function () {
                return false;
            });
            // Page cleaner 1
            var mutationConfig = {
                attributes: false,
                childList: true,
                subtree: true
            };
            var mutationCallback = function (mutationList, observer) {
                for (var _i = 0, mutationList_1 = mutationList; _i < mutationList_1.length; _i++) {
                    var mutation = mutationList_1[_i];
                    var list = __spreadArray([mutation.target], mutation.addedNodes, true);
                    for (var _a = 0, list_2 = list; _a < list_2.length; _a++) {
                        var node = list_2[_a];
                        if ((node === null || node === void 0 ? void 0 : node.tagName) === "IFRAME" ||
                            (node === null || node === void 0 ? void 0 : node.tagName) === "IMG" ||
                            (node === null || node === void 0 ? void 0 : node.tageName) === "VLI") {
                            node.height = "0";
                            node.width = "0";
                            node.src = "about:blank";
                            node.style.display = "none";
                            node === null || node === void 0 ? void 0 : node.removeAttribute("id");
                            node === null || node === void 0 ? void 0 : node.removeAttribute("name");
                            node.classList.add("ss-hide");
                            _this_1.logDebug("MutationObserver - Modded ".concat(node === null || node === void 0 ? void 0 : node.tagName, ":"), node);
                        }
                    }
                }
            };
            var drpglxyObserver = new MutationObserver(mutationCallback);
            drpglxyObserver.observe(document.documentElement, mutationConfig);
            // Page cleaner 2
            setInterval(function () {
                _this_1.$$("body *").forEach(function (node) {
                    if ((node === null || node === void 0 ? void 0 : node.tagName) === "IFRAME" ||
                        (node === null || node === void 0 ? void 0 : node.tagName) === "IMG" ||
                        (node === null || node === void 0 ? void 0 : node.tageName) === "VLI") {
                        if (node.src == "about:blank") {
                            return;
                        }
                        node.height = "0";
                        node.width = "0";
                        node.src = "about:blank";
                        node.style.display = "none";
                        node === null || node === void 0 ? void 0 : node.removeAttribute("id");
                        node === null || node === void 0 ? void 0 : node.removeAttribute("name");
                        node.classList.add("ss-hide");
                        _this_1.logDebug("Cleaner - Modded ".concat(node === null || node === void 0 ? void 0 : node.tagName, ":"), node);
                    }
                });
            }, 500);
            if (document.documentElement.outerHTML.match(/Adblock Detected!/gi)) {
                // Go back and try again on token page
                window.history.back();
            }
            // if on token page
            if (this.$("#xd")) {
                var divs = "";
                for (var i = 0; i < Math.floor(Math.random() * 25 + 50); i++) {
                    divs += "<div></div>";
                }
                document.body.insertAdjacentHTML("beforeend", "<div style=\"display:none\" class='ss-hide'>".concat(divs, "</div>"));
                document.body.insertAdjacentHTML("beforeend", "<vli style=\"display:none\" class='ss-hide'></vli><vli style=\"display:none\" class='ss-hide'></vli>");
                document.body.insertAdjacentHTML("beforeend", "<iframe src=\"about:blank\" style=\"display:none\" class='ss-hide' data-ex-slot-check></iframe><iframe src=\"about:blank\" style=\"display:none\" class='ss-hide' data-ex-slot-check></iframe><iframe src=\"about:blank\" style=\"display:none\" class='ss-hide' data-ex-slot-check></iframe>");
                document.body.insertAdjacentHTML("beforeend", "<style>/*ps-pulse*/</style>");
                setTimeout(function () {
                    var xd = _this_1.$("#xd");
                    if (xd.value.length > 2) {
                        _this_1.$("#tokenstatus").insertAdjacentHTML("afterend", "<small style=\"display: block; word-break: break-all;\">#xd.value = '".concat(xd.value, "'</small>"));
                        if (xd.value.match(/^SU/)) {
                            _this_1.removeInterval("ss-btn-ready-listner");
                        }
                        else {
                            _this_1.$("#tokenstatus").insertAdjacentHTML("afterend", "<small style=\"display: block; word-break: break-all;\">Should be ready to submit</small>");
                        }
                    }
                }, 4 * 1000);
            }
            // // manually get token
            // if (this.$("#xd") && false) {
            //   const countdown_js_url =
            //     document.documentElement.outerHTML.match(/getScript\("(.*)?"/)?.[1];
            //   countdown_js_url &&
            //     fetch(countdown_js_url + `&_=${+new Date()}`, {
            //       headers: {
            //         accept: "*/*",
            //         "accept-language": "en-US,en;q=0.9",
            //         "sec-fetch-dest": "script",
            //         "sec-fetch-mode": "no-cors",
            //         "sec-fetch-site": "cross-site",
            //         "sec-gpc": "1",
            //       },
            //       referrer: "https://dropgalaxy.com/",
            //       referrerPolicy: "strict-origin-when-cross-origin",
            //       body: null,
            //       method: "GET",
            //       mode: "cors",
            //       credentials: "omit",
            //     })
            //       .then((res) => console.log(res))
            //       .then(() => {
            //         fetch("https://a2zapk.com/dl/getapklist.php", {
            //           headers: {
            //             accept: "application/json, text/javascript, */*; q=0.01",
            //             "accept-language": "en-US,en;q=0.9",
            //             "sec-fetch-dest": "empty",
            //             "sec-fetch-mode": "cors",
            //             "sec-fetch-site": "cross-site",
            //             "sec-gpc": "1",
            //           },
            //           referrer: "https://dropgalaxy.com/",
            //           referrerPolicy: "strict-origin-when-cross-origin",
            //           body: null,
            //           method: "POST",
            //           mode: "cors",
            //           credentials: "omit",
            //         })
            //           .then((res) => res.json())
            //           .then((links) => {
            //             console.log("links:", links);
            //             const link = links[Math.floor(Math.random() * links.length)];
            //             console.log("link:", link);
            //             fetch(link, {
            //               method: "POST",
            //               mode: "no-cors",
            //               credentials: "omit",
            //             });
            //           });
            //       });
            //   setTimeout(xdFunc, 5 * 1000);
            // }
        }
    },
    beingupdated: {
        host: ["beingupdated.com"],
        customStyle: "html,body,.gmr-content{background:#121212!important;color:#dfdfdf!important}",
        downloadPageCheckBySelector: ["#wpsafe-link"],
        downloadPageCheckByRegex: [],
        remove: [
            "header",
            "#footer-container",
            "#menus",
            "#secondmenus",
            // ".wpsafe-top ~ *",
            "aside",
            "article[id^='post']",
            "ul.page-numbers",
            "#adb",
            "#download-ad-modal-addii",
            "#show-ad",
            "#comments",
        ],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [],
        addInfoBanner: [],
        createCountdown: undefined,
        modifyButtons: [
            [
                "#wpsafelinkhuman",
                {
                    replaceWithTag: "button",
                    requiresCaptcha: true,
                    makeListener: true,
                    props: { type: "submit", style: "", onclick: "" }
                },
            ],
        ],
        customScript: function () {
            var _a;
            var safeLinkURL = (_a = window.document.documentElement.outerHTML.match(/window.open\('(https:\/\/beingupdated.com\?safelink[^']+)'/i)) === null || _a === void 0 ? void 0 : _a[1];
            if (safeLinkURL) {
                __spreadArray([], document.body.children, true).forEach(function (element) { return element.remove(); });
                document.body.className = "container";
                document.body.insertAdjacentHTML("afterbegin", "<a href=\"".concat(safeLinkURL, "\" class=\"ss-animated-button ss-btn-ready ss-w-100\">Continue to Next Step<span></span><span></span><span></span><span></span></button>"));
                this.addHoverAbility(document.querySelector(".ss-animated-button"), false);
            }
        }
    },
    gplinks: {
        host: ["gplinks.co", "mynewsmedia.co"],
        customStyle: "html,body{background:#121212!important;color:#dfdfdf!important}.countdown-circle-value{display:none!important;}",
        downloadPageCheckBySelector: [
            "a.btn.btn-primary.open-continue-btn-org",
            "form#yuidea",
            "form#go-link",
            "#wpsafe-snp",
        ],
        downloadPageCheckByRegex: [],
        remove: [
            "nav",
            "footer",
            "#ad-modal",
            ".ad-banner",
            "[id*='vliadb']",
            ".smart-link-banner-ad-container",
            "ins",
            "[id^='div-gpt-ad']",
            "#AdBlocker",
            ".modal-backdrop",
            "#download-ad-modal",
            "#show-ad",
            "#ad-link-location",
            ".myTestAd",
        ],
        removeByRegex: [
            { query: "style", regex: /\.container-circle-value|#__vliadb83/gi },
        ],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [
            "app_vars",
            "blurred",
            "e",
            "__CF$cv$params",
            "__rocketLoaderEventCtor",
            "__rocketLoaderLoadProgressSimulator",
            "__cfQR",
            "dataLayer",
            "googletag",
            "UnlockButton",
            "$original_link",
            "isIPPAdClick",
            "linkTimer",
            "handleAllowPermission",
            "isSafari",
            "handlePermission",
            "permissionQuery",
            "wow",
            "fixHeight",
            "captchaShort",
            "captchaContact",
            "captchaSignin",
            "captchaSignup",
            "captchaForgotpassword",
            "captchaShortlink",
            "invisibleCaptchaShort",
            "invisibleCaptchaContact",
            "invisibleCaptchaSignin",
            "invisibleCaptchaSignup",
            "invisibleCaptchaForgotpassword",
            "invisibleCaptchaShortlink",
            "onloadRecaptchaCallback",
            "setCookie",
            "getCookie",
            "go_popup",
            "checkAdblockUser",
            "checkAdsbypasserUser",
            "checkPrivateMode",
            "body",
            "ad_type",
            "counter_start_object",
            "selectedTab",
            "clipboard",
            "setTooltip",
            "cookie_accept",
            "WOW",
            "ClipboardJS",
            "adblockDetector",
            "__cfRLUnblockHandlers",
            "ga",
        ],
        addInfoBanner: [],
        createCountdown: { element: ".box-main", timer: 10 },
        modifyButtons: [
            ["#go-submit", { requiresTimer: true, props: { id: "", style: "" } }],
            [
                "#btn6",
                {
                    replaceWithTag: "a",
                    props: {
                        id: "",
                        style: ""
                    }
                },
            ],
            ["#link-btn > a", { props: { id: "", style: "" } }],
            [
                "button.btn.btn-primary.file-download-btn",
                { replaceWithTag: "a", makeListener: true },
            ],
            [
                "body > form[id='yuidea'] input.btn.btn-primary",
                { replaceWithTag: "button", makeListener: true },
            ],
            ["a.btn.btn-primary.open-continue-btn-org", { props: { style: "" } }],
        ],
        customScript: function () {
            var _a, _b, _c, _d;
            // aesthetics
            (_a = this.$("#wpsafe-snp")) === null || _a === void 0 ? void 0 : _a.removeAttribute("style");
            // submit hidden forms
            document.body.removeAttribute("style");
            (_b = document.querySelector("body > form[id='yuidea']")) === null || _b === void 0 ? void 0 : _b.submit();
            // block page from adding listeners
            this.interceptAddEventListeners(function () { return false; });
            // check if redirectLink is in page
            var redirectLink = (_c = window.document.documentElement.outerHTML.match(/redirectLink = '([^']+)'/)) === null || _c === void 0 ? void 0 : _c[1];
            if (redirectLink) {
                (_d = document
                    .querySelector(".ss-animated-button")) === null || _d === void 0 ? void 0 : _d.setAttribute("href", redirectLink);
                window.location = redirectLink;
            }
            // check if on the the last page with the form
            var form = this.$("form#go-link");
            if (form) {
                var formData = new FormData(form);
                var params_1 = new URLSearchParams(formData);
                var _this_2 = this;
                setTimeout(function () {
                    fetch("https://gplinks.co/links/go", {
                        headers: {
                            accept: "application/json, text/javascript, */*; q=0.01",
                            "accept-language": "en-US,en;q=0.9",
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "sec-gpc": "1",
                            "x-requested-with": "XMLHttpRequest"
                        },
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: params_1.toString(),
                        method: "POST",
                        mode: "cors",
                        credentials: "include"
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (data) {
                        console.log(data);
                        var link = data.url;
                        __spreadArray([], document.body.children, true).forEach(function (element) {
                            return element.remove();
                        });
                        document.body.className = "container";
                        document.body.insertAdjacentHTML("afterbegin", "<a href=\"".concat(link, "\" class=\"ss-animated-button ss-btn-ready ss-w-100\">").concat(link, "<span></span><span></span><span></span><span></span></button>"));
                        _this_2.addHoverAbility(document.querySelector(".ss-animated-button"), false);
                    });
                }, 10 * 1000); // must wait 10 seconds
            }
        }
    },
    NEWSITE: {
        host: [],
        customStyle: "html,body{background:#121212!important;color:#dfdfdf!important}",
        downloadPageCheckBySelector: [],
        downloadPageCheckByRegex: [],
        remove: [],
        removeByRegex: [],
        hideElements: undefined,
        removeIFrames: false,
        removeDisabledAttr: false,
        destroyWindowFunctions: [],
        addInfoBanner: [],
        createCountdown: undefined,
        modifyButtons: [],
        customScript: function () { }
    }
};
for (var site in siteRules) {
    var currSiteRules = siteRules[site];
    if (currSiteRules.host.some(function (urlMatch) {
        if (urlMatch instanceof RegExp) {
            return Boolean(window.location.href.match(urlMatch));
        }
        else {
            return window.location.href.includes(urlMatch);
        }
    })) {
        window.Object.defineProperty(window, "siteScrubber", {
            enumerable: false,
            writable: false,
            configurable: false,
            value: new SiteScrubber(currSiteRules)
        });
        // @ts-ignore
        siteScrubber.setup();
        break;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
