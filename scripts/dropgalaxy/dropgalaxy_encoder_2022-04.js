function encoder(str) {
  var buf = new ArrayBuffer(str.length * 2);
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
function tokn(holymoly) {
  $("#tokenstatus").html("<small>token2</small>");

  var docOuterHTML = document.documentElement.outerHTML;
  var payload = "[download adguard unlocked version]";
  payload += "[LODA-LELO]";
  payload += "[x=ytb85i]";
  payload += "[cntry=" + cntry + "]";
  payload += "[rand=" + $("#rand").val() + "]";
  payload += "[id=" + $("#fileid").val() + "]";

  payload += "[adb=" + $("#adb").val() + "]";
  payload += "[dropgalaxyisbest=" + $("#dropgalaxyisbest").val() + "]";
  payload += "[adblock_detected=" + $("#adblock_detected").val() + "]";
  payload += "[downloadhash=" + $("#downloadhash").val() + "]";
  payload += "[downloadhashad=" + $("#downloadhashad").val() + "]";
  var numdivs = $("div").length;
  payload += "[divs=" + numdivs + "]";

  var adsByGoogleContent = $(docOuterHTML)
    .filter(".adsbygoogle")
    .each(function (i, e) {
      payload += e["outerHTML"];
    });

  $(docOuterHTML)
    .filter("script")
    .each(function (i, e) {
      var scriptSrcs = $(this).filter("script").attr("src");
      if (typeof scriptSrcs !== "undefined") {
        if (scriptSrcs.indexOf("https://dropgalaxy.com/") == -1) {
          payload += "[scr=" + scriptSrcs + "]";
        }
      }
    });
  var iframeCount = 0;
  $(docOuterHTML)
    .filter("iframe")
    .each(function (i, e) {
      iframeCount++;
      if (e["outerHTML"].indexOf("data-ex-slot-check") >= 0) {
        payload += "[iframe=1]";
      }
    });
  payload += "[ifc=" + iframeCount + "]";
  var vliCount = 0;
  $(docOuterHTML)
    .filter("vli")
    .each(function (i, e) {
      vliCount++;
    });
  payload += "[vli=" + vliCount + "]";

  $(docOuterHTML)
    .filter("style")
    .each(function (i, e) {
      if (e["outerHTML"].indexOf("ps-pulse") >= 0) {
        payload += "[a=1]";
      }
    });

  var encodedData_1 = encoder(payload);
  var encodedData_Uint8Array = new Uint8Array(encodedData_1);
  var encodedData = encodedData_Uint8Array.toString();
  var encodedData = encodedData.replace(/2/g, "004");
  var encodedData = encodedData.replace(/3/g, "005");
  var encodedData = encodedData.replace(/7/g, "007");
  var encodedData = encodedData.replace(/,0,0,0/g, "");
  var randd = $("#rand").val();
  $.ajax({
    type: "POST",
    url: "https://tmp.a2zapk.com/gettoken.php",
    data: {
      rand: randd,
      msg: encodedData,
    },
    success: function (result) {
      $("#xd").val(result);
      $("#tokens").val(result);

      $("#tokenstatus").html("<small>token ok!</small>");
      setInterval(ftch, 10);
    },
    error: function (result) {
      $("#tokenstatus").html("<small>token error!</small>");
      setInterval(ftch, 10);
    },
  });
}

let unencoded = final
  .replace(/007/g, "7")
  .replace(/005/g, "3")
  .replace(/004/g, "2");

const final = `91,100,111,119,110,108,111,9007,100,005004,9007,100,10005,11007,9007,114,100,005004,11007,110,108,111,99,10007,101,100,005004,118,101,114,115,105,111,110,9005,91,0076,0079,68,65,45,0076,69,0076,0079,9005,91,10040,61,11007,54,11005,11007,5007,11007,9005,91,99,110,116,114,10041,61,0078,0076,9005,91,114,9007,110,100,61,9005,91,105,100,61,10005,111,119,48,106,99,10005,110,11004,5004,5004,50,9005,91,9007,100,98,61,48,9005,91,100,114,111,11004,10005,9007,108,9007,10040,10041,105,115,98,101,115,116,61,48,9005,91,9007,100,98,108,111,99,10007,95,100,101,116,101,99,116,101,100,61,49,9005,91,100,111,119,110,108,111,9007,100,104,9007,115,104,61,48,9005,91,100,111,119,110,108,111,9007,100,104,9007,115,104,9007,100,61,11007,110,100,101,10004,105,110,101,100,9005,91,100,105,118,115,61,5005,49,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,115,116,9007,116,105,99,46,99,114,105,116,101,111,46,110,101,116,4007,106,115,4007,108,100,4007,11004,11007,98,108,105,115,104,101,114,116,9007,10005,46,11004,114,101,98,105,100,46,49,49,55,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,115,99,114,105,11004,116,46,5004,100,101,10040,46,105,111,4007,108,111,99,9007,108,115,116,111,114,101,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,119,119,119,46,10005,111,111,10005,108,101,116,9007,10005,115,101,114,118,105,99,101,115,46,99,111,109,4007,116,9007,10005,4007,106,115,4007,10005,11004,116,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,115,116,9007,116,105,99,46,99,108,111,11007,100,10004,108,9007,114,101,105,110,115,105,10005,104,116,115,46,99,111,109,4007,98,101,9007,99,111,110,46,109,105,110,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,115,101,99,11007,114,101,11004,11007,98,9007,100,115,46,10005,46,100,111,11007,98,108,101,99,108,105,99,10007,46,110,101,116,4007,116,9007,10005,4007,106,115,4007,10005,11004,116,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,11004,114,111,116,9007,10005,99,100,110,46,99,111,109,4007,115,4007,100,114,111,11004,10005,9007,108,9007,10040,10041,46,99,111,109,4007,115,105,116,101,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,106,115,99,100,110,46,10005,114,101,101,116,101,114,46,109,101,4007,100,114,111,11004,10005,9007,108,9007,10040,10041,46,111,110,108,105,110,101,104,101,9007,100,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,99,109,11004,46,11007,110,105,99,111,110,115,101,110,116,46,99,111,109,4007,118,50,4007,115,116,11007,98,46,109,105,110,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,99,109,11004,46,11007,110,105,99,111,110,115,101,110,116,46,99,111,109,4007,118,50,4007,5007,9007,51,5004,5004,100,5005,5004,51,5004,4007,99,109,11004,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,115,101,99,11007,114,101,11004,11007,98,9007,100,115,46,10005,46,100,111,11007,98,108,101,99,108,105,99,10007,46,110,101,116,4007,10005,11004,116,4007,11004,11007,98,9007,100,115,95,105,109,11004,108,95,50,48,50,50,48,5004,50,49,48,49,46,106,115,9005,91,115,99,114,61,4007,4007,11004,108,9007,10041,101,114,46,9007,11004,108,104,98,46,9007,100,105,11004,111,108,111,46,99,111,109,4007,11004,114,101,98,105,100,108,105,110,10007,4007,5004,5005,56,5005,56,5007,4007,104,98,95,5005,55,50,5005,54,48,95,49,5004,5005,51,5004,46,106,115,9005,91,115,99,114,61,4007,4007,115,101,99,11007,114,101,11004,11007,98,9007,100,115,46,10005,46,100,111,11007,98,108,101,99,108,105,99,10007,46,110,101,116,4007,116,9007,10005,4007,106,115,4007,10005,11004,116,46,106,115,9005,91,115,99,114,61,4007,4007,11004,108,9007,10041,101,114,46,9007,11004,108,104,98,46,9007,100,105,11004,111,108,111,46,99,111,109,4007,11004,114,101,98,105,100,108,105,110,10007,4007,5004,5005,56,5005,56,5007,4007,119,114,9007,11004,11004,101,114,95,104,98,95,5005,55,50,5005,54,48,95,49,5004,5005,51,5004,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,99,109,11004,46,11007,110,105,99,111,110,115,101,110,116,46,99,111,109,4007,118,50,4007,109,9007,105,110,46,109,105,110,46,106,115,9005,91,115,99,114,61,4007,4007,116,9007,10005,46,118,108,105,116,9007,10005,46,99,111,109,4007,118,49,4007,49,54,5005,48,56,56,48,50,5004,5005,4007,56,5005,99,55,50,5005,100,55,5004,99,50,5007,54,10004,10004,5007,54,100,48,48,55,10004,5004,99,51,56,9007,9007,50,54,51,54,46,106,115,6005,99,99,61,0078,0076,9005,91,115,99,114,61,4007,4007,9007,115,115,101,116,115,46,118,108,105,116,9007,10005,46,99,111,109,4007,11004,114,101,98,105,100,4007,100,101,10004,9007,11007,108,116,4007,11004,114,101,98,105,100,45,54,46,50,48,46,48,46,106,115,9005,91,115,99,114,61,4007,4007,119,119,119,46,10005,111,111,10005,108,101,116,9007,10005,115,101,114,118,105,99,101,115,46,99,111,109,4007,116,9007,10005,4007,106,115,4007,10005,11004,116,46,106,115,9005,91,115,99,114,61,4007,4007,105,109,9007,115,100,10007,46,10005,111,111,10005,108,101,9007,11004,105,115,46,99,111,109,4007,106,115,4007,115,100,10007,108,111,9007,100,101,114,4007,105,109,9007,51,46,106,115,9005,91,115,99,114,61,4007,4007,9007,115,115,101,116,115,46,118,108,105,116,9007,10005,46,99,111,109,4007,11004,108,11007,10005,105,110,115,4007,115,9007,10004,101,10004,114,9007,109,101,4007,115,114,99,4007,106,115,4007,115,10004,95,104,111,115,116,46,109,105,110,46,106,115,9005,91,105,10004,114,9007,109,101,61,49,9005,91,105,10004,114,9007,109,101,61,49,9005,91,105,10004,114,9007,109,101,61,49,9005,91,105,10004,99,61,5004,9005,91,118,108,105,61,50,9005,91,9007,61,49,9005,0,0`;

const final_decoded = `[download adguard unlocked version][LODA-LELO][x=u6qu9u][cntry=NL][rand=][id=gow0jcgnp442][adb=0][dropgalaxyisbest=0][adblock_detected=1][downloadhash=0][downloadhashad=undefined][divs=51][scr=https://static.criteo.net/js/ld/publishertag.prebid.117.js][scr=https://script.4dex.io/localstore.js][scr=https://www.googletagservices.com/tag/js/gpt.js][scr=https://static.cloudflareinsights.com/beacon.min.js][scr=https://securepubads.g.doubleclick.net/tag/js/gpt.js][scr=https://protagcdn.com/s/dropgalaxy.com/site.js][scr=https://jscdn.greeter.me/dropgalaxy.onlinehead.js][scr=https://cmp.uniconsent.com/v2/stub.min.js][scr=https://cmp.uniconsent.com/v2/9a344d5434/cmp.js][scr=https://securepubads.g.doubleclick.net/gpt/pubads_impl_2022042101.js][scr=//player.aplhb.adipolo.com/prebidlink/458589/hb_572560_14534.js][scr=//securepubads.g.doubleclick.net/tag/js/gpt.js][scr=//player.aplhb.adipolo.com/prebidlink/458589/wrapper_hb_572560_14534.js][scr=https://cmp.uniconsent.com/v2/main.min.js][scr=//tag.vlitag.com/v1/1650880245/85c725d74c296ff96d007f4c38aa2636.js?cc=NL][scr=//assets.vlitag.com/prebid/default/prebid-6.20.0.js][scr=//www.googletagservices.com/tag/js/gpt.js][scr=//imasdk.googleapis.com/js/sdkloader/ima3.js][scr=//assets.vlitag.com/plugins/safeframe/src/js/sf_host.min.js][iframe=1][iframe=1][iframe=1][ifc=4][vli=2][a=1]\x00\x00`;

const final_decoded2 = `[download adguard unlocked version][LODA-LELO][x=1ha4ec][cntry=NL][rand=][id=gow0jcgnp442][adb=0][dropgalaxyisbest=0][adblock_detected=1][downloadhash=0][downloadhashad=undefined][divs=51][scr=https://static.criteo.net/js/ld/publishertag.prebid.117.js][scr=https://script.4dex.io/localstore.js][scr=https://www.googletagservices.com/tag/js/gpt.js][scr=https://static.cloudflareinsights.com/beacon.min.js][scr=https://securepubads.g.doubleclick.net/tag/js/gpt.js][scr=https://protagcdn.com/s/dropgalaxy.com/site.js][scr=https://jscdn.greeter.me/dropgalaxy.onlinehead.js][scr=https://cmp.uniconsent.com/v2/stub.min.js][scr=https://cmp.uniconsent.com/v2/9a344d5434/cmp.js][scr=https://securepubads.g.doubleclick.net/gpt/pubads_impl_2022042101.js][scr=//player.aplhb.adipolo.com/prebidlink/458590/hb_572560_14534.js][scr=//securepubads.g.doubleclick.net/tag/js/gpt.js][scr=//player.aplhb.adipolo.com/prebidlink/458590/wrapper_hb_572560_14534.js][scr=https://cmp.uniconsent.com/v2/main.min.js][scr=//tag.vlitag.com/v1/1650880245/85c725d74c296ff96d007f4c38aa2636.js?cc=NL][scr=//assets.vlitag.com/prebid/default/prebid-6.20.0.js][scr=//www.googletagservices.com/tag/js/gpt.js][scr=//imasdk.googleapis.com/js/sdkloader/ima3.js][scr=//assets.vlitag.com/plugins/safeframe/src/js/sf_host.min.js][iframe=1][iframe=1][iframe=1][ifc=4][vli=2][a=1]\x00\x00`;
