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
  "SiteScrubber",
  "hcaptcha",
];
JSON.stringify(diff.filter((x) => !revoke.includes(x) && !x.match(/jquery\d+/gi)));

one = []

two = []

three = [...new Set([].concat(one, two))].filter((x) => !revoke.includes(x) && !x.match(/jquery\d+/gi));
JSON.stringify(three);
