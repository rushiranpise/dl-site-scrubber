function encoder(str) {
  var buf = new ArrayBuffer(str.length * 2);
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// $("#tokenstatus").html("<small>token2</small>");
const cntry = "NL";
const docOuterHTML = document.documentElement.outerHTML;
var payload = "[download adguard unlocked version]";
payload += "[LODA-LELO]";
// payload += "[x=ytb85i]";
payload +=
  document.documentElement.outerHTML.match(/\[x=(\w+)\]/i)?.[0] ||
  `[x=${document.documentElement.outerHTML.match(/\.js\?rand=(\w+)/i)?.[1]}]`;
payload += "[cntry=" + cntry + "]";
payload += "[rand=" + document.querySelector("#rand")?.value + "]";
payload += "[id=" + document.querySelector("#fileid")?.value + "]";

payload += "[adb=0]";
payload += "[dropgalaxyisbest=0]";
payload += "[adblock_detected=1]";
payload += "[downloadhash=0]";
payload += "[downloadhashad=undefined]";
const numdivs = 51 || [...document.querySelectorAll("div")].length;
payload += "[divs=" + numdivs + "]";

document.querySelectorAll("script").forEach((script) => {
  if (
    script?.src !== "" &&
    script?.src?.indexOf("https://dropgalaxy.com/") == -1
  ) {
    payload += "[scr=" + script?.src + "]";
  }
});

payload += "[iframe=1]";
payload += "[iframe=1]";
payload += "[iframe=1]";
let iframeCount = 4;

// let iframeCount = 0;
// document.querySelectorAll("iframe").forEach((iframe) => {
//   iframeCount++;
//   if (iframe["outerHTML"].indexOf("data-ex-slot-check") >= 0) {
//     payload += "[iframe=1]";
//   }
// });
payload += "[ifc=" + iframeCount + "]";

let vliCount = 2 || [...document.querySelectorAll("vli")].length;

payload += "[a=1]";
// document.querySelectorAll("style").forEach((style) => {
//   if (style["outerHTML"].indexOf("ps-pulse") >= 0) {
//     payload += "[a=1]";
//   }
// });

var encodedData_1 = encoder(payload);
var encodedData_Uint8Array = new Uint8Array(encodedData_1);
var encodedData = encodedData_Uint8Array.toString();
var encodedData = encodedData.replace(/2/g, "004");
var encodedData = encodedData.replace(/3/g, "005");
var encodedData = encodedData.replace(/7/g, "007");
var encodedData = encodedData.replace(/,0,0,0/g, "");
const randd = document.querySelector("#rand")?.value;
fetch("https://tmp.a2zapk.com/gettoken.php", {
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
  body: new URLSearchParams({
    rand: randd,
    msg: encodedData,
  }).toString(),
  method: "POST",
  mode: "cors",
  credentials: "omit",
})
  .then((res) => {
    document.querySelector("#xd") &&
      (document.querySelector("#xd").value = res.text());
    document.querySelector("#tokens") &&
      (document.querySelector("#tokens").value = res.text());
  })
  .catch((err) => {
    console.log(`custom fetch error`);
    console.error(err);
  });
