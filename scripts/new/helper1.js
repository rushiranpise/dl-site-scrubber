var i = document.createElement("iframe");
i.style.display = "none";
document.body.appendChild(i);
origProps = Object.getOwnPropertyNames(i.contentWindow);
diff = [];
for (const prop of Object.getOwnPropertyNames(window)) {
  if (!origProps.includes(prop)) {
    diff.push(prop);
  }
}
var revoke = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "ss__",
  "$",
  "i",
  "origProps",
  "jQuery",
  "ethereum",
  "___grecaptcha_cfg",
  "grecaptcha",
  "__recaptcha_api",
  "__google_recaptcha_client",
  "diff",
  "dir",
  "dirxml",
  "profile",
  "profileEnd",
  "clear",
  "table",
  "keys",
  "values",
  "debug",
  "undebug",
  "monitor",
  "unmonitor",
  "inspect",
  "copy",
  "queryObjects",
  "$_",
  "$0",
  "$1",
  "$2",
  "$3",
  "$4",
  "getEventListeners",
  "getAccessibleName",
  "getAccessibleRole",
  "monitorEvents",
  "unmonitorEvents",
  "$$",
  "$x",
  "revoke",
  "recaptcha",
  "Popper",
  "bootstrap",
  "siteScrubber",
];
JSON.stringify(diff.filter((x) => !revoke.includes(x) && !x.match(/jquery\d+/gi)));

one = ["setPagination","_gaq","WOW","_taboola","_gat","options","lary","addEventListener","k","adsbygoogle","cookiesAgree","zfgformats","google_js_reporting_queue","google_srt","google_logging_queue","google_ad_modifications","ggeac","google_measure_js_timing","google_reactive_ads_global_state","google_user_agent_client_hint","kAWgyOxXhTis","vRowKfzUKP","cIuqJzgWhJ","JhOjFdIupR","ZWTPEQZYhZ","kRBeOhzLuY","oAAUBciJwG","CWSTRhNQZH","c2","c1","I5XCBfeVDZKA","RbntPCrNXp","timeout","relocate_home","delComment","player_start","showFullScreen","_gfp_a_"]

two = [
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
]

three = [...new Set([].concat(one, two))].filter((x) => !revoke.includes(x) && !x.match(/jquery\d+/gi));
