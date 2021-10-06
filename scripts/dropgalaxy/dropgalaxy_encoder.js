function encoder(str) {
  var buf = new ArrayBuffer(str.length * 2);
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

var html = document.documentElement.outerHTML;
var coded_string = "[download adguard unlocked version]";
coded_string += "[rand=" + $("#rand").val() + "]";
coded_string += "[id=" + $("#fileid").val() + "]";
coded_string += "[id=" + $("#fileid").val() + "]";
coded_string += "[dropgalaxyisbest=" + $("#dropgalaxyisbest").val() + "]";
coded_string += "[adblock_detected=" + $("#adblock_detected").val() + "]";
coded_string += "[downloadhash=" + $("#downloadhash").val() + "]";
coded_string += "[downloadhashad=" + $("#downloadhashad").val() + "]";
var dd = $(html)
  .filter(".adsbygoogle")
  .each(function (i, e) {
    coded_string += e["outerHTML"];
  });
$(html)
  .filter("script")
  .each(function (i, e) {
    var curr_script_src = $(this).filter("script").attr("src");
    if (typeof curr_script_src !== "undefined") {
      if (curr_script_src.indexOf("https://dropgalaxy.com/") == -1) {
        coded_string += "[scr=" + curr_script_src + "]";
      }
    }
  });
var encoded_string = encoder(coded_string);
var uint8array_of_encoded_string = new Uint8Array(encoded_string);
var encoded_message = uint8array_of_encoded_string.toString();
var encoded_message = encoded_message.replace(/2/g, "004");
var encoded_message = encoded_message.replace(/3/g, "005");
var encoded_message = encoded_message.replace(/7/g, "007");
var encoded_message = encoded_message.replace(/,0,0,0/g, "");
var randd = $("#rand").val();



function overallDecoder(message) {
  dee = "";
  let decoded = message.replace(/004/g, "2");
  decoded = decoded.replace(/005/g, "3");
  decoded = decoded.replace(/007/g, "7");
  decoded.split(",").forEach((d) => {
    dee += String.fromCharCode(parseInt(d));
  });
  return dee;
}

////////////////////////////
// console.log(overallDecoder(encoded_message));
////////////////////////////



$.ajax({
  type: "POST",
  url: "https://tmp.dropgalaxy.in/gettoken.php",
  data: {
    rand: randd,
    msg: encoded_message,
  },
  success: function (result) {
    $("#xd").val(result);
  },
  error: function (result) {},
});


const raw_message = '"[download adguard unlocked version][rand=][id=g4wjtggy9x5d][dropgalaxyisbest=0][adblock_detected=0][downloadhash=0][downloadhashad=1]<ins class=\"adsbygoogle adsbygoogle-noablate\" data-adsbygoogle-status=\"done\" style=\"display: none !important;\" data-ad-status=\"unfilled\"><ins id=\"aswift_0_expand\" tabindex=\"0\" title=\"Advertisement\" aria-label=\"Advertisement\" style=\"border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: inline-table;\"><ins id=\"aswift_0_anchor\" style=\"border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: block;\"><iframe id=\"aswift_0\" name=\"aswift_0\" style=\"left:0;position:absolute;top:0;border:0;width:undefinedpx;height:undefinedpx;\" sandbox=\"allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation\" frameborder=\"0\" src=\"https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-6572127804953403&amp;output=html&amp;adk=1812271804&amp;adf=3025194257&amp;lmt=1632852274&amp;plat=1%3A16777216%2C2%3A16777216%2C3%3A32%2C4%3A32%2C9%3A32776%2C16%3A8388608%2C17%3A32%2C24%3A32%2C25%3A32%2C30%3A1081344%2C32%3A32&amp;format=0x0&amp;url=https%3A%2F%2Ffinancemonk.net%2F&amp;ea=0&amp;flash=0&amp;pra=5&amp;wgl=1&amp;uach=WyJXaW5kb3dzIiwiMTAuMC4wIiwieDg2IiwiIiwiOTQuMC45OTIuMzEiLFtdLG51bGwsbnVsbCwiNjQiXQ..&amp;dt=1632852274664&amp;bpp=2&amp;bdt=3967&amp;idt=133&amp;shv=r20210922&amp;mjsv=m202109220101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;nras=1&amp;correlator=2805760161265&amp;frm=20&amp;pv=2&amp;ga_vid=1157668643.1632852275&amp;ga_sid=1632852275&amp;ga_hid=11092835&amp;ga_fc=0&amp;u_tz=-300&amp;u_his=6&amp;u_h=1080&amp;u_w=1920&amp;u_ah=1040&amp;u_aw=1920&amp;u_cd=24&amp;adx=-12245933&amp;ady=-12245933&amp;biw=1903&amp;bih=969&amp;scr_x=0&amp;scr_y=0&amp;eid=31062309%2C31062430%2C31062311&amp;oid=3&amp;pvsid=4370036607835633&amp;pem=719&amp;wsm=1&amp;ref=https%3A%2F%2Fwww.google.com%2F&amp;eae=2&amp;fc=1920&amp;brdim=-1920%2C122%2C-1920%2C122%2C1920%2C122%2C1920%2C1040%2C1920%2C969&amp;vis=1&amp;rsz=%7C%7Cs%7C&amp;abl=NS&amp;fu=32768&amp;bc=31&amp;ifi=1&amp;uci=a!1&amp;fsb=1&amp;dtd=152\" marginwidth=\"0\" marginheight=\"0\" vspace=\"0\" hspace=\"0\" allowtransparency=\"true\" scrolling=\"no\" allowfullscreen=\"true\" data-google-container-id=\"a!1\" data-load-complete=\"true\"></iframe></ins></ins></ins>[scr=https://www.googletagservices.com/activeview/js/current/osd.js][scr=https://partner.googleadservices.com/gampad/cookie.js?domain=financemonk.net&callback=_gfp_s_&client=ca-pub-6572127804953403][scr=https://pagead2.googlesyndication.com/pagead/managed/js/adsense/m202109220101/show_ads_impl.js][scr=https://static.cloudflareinsights.com/beacon.min.js][scr=https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js][scr=/cdn-cgi/challenge-platform/h/b/scripts/invisible.js][scr=//salutationcheerlessdemote.com/sfp.js][scr=https://adservice.google.com/adsid/integrator.js?domain=financemonk.net][scr=//housewifehaunted.com/4f/b9/d6/4fb9d6755e5818e2fb1ce2f1b6bbd2a5.js][scr=https://tmp.dropgalaxy.in/adspopup.js][scr=https://tmp.dropgalaxy.in/adddds.js?v=1.0]"'


raw_message = `
[download adguard unlocked version]
[rand=]
[id=g4wjtggy9x5d]
[dropgalaxyisbest=0]
[adblock_detected=0]
[downloadhash=0]
[downloadhashad=1]
<ins class=\"adsbygoogle adsbygoogle-noablate\" data-adsbygoogle-status="done" style="display: none !important;" data-ad-status="unfilled"><ins id="aswift_0_expand" tabindex="0" title="Advertisement" aria-label="Advertisement" style="border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: inline-table;"><ins id="aswift_0_anchor" style="border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: block;"><iframe id="aswift_0" name="aswift_0" style="left:0;position:absolute;top:0;border:0;width:undefinedpx;height:undefinedpx;" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" frameborder="0" src="https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-6572127804953403&amp;output=html&amp;adk=1812271804&amp;adf=3025194257&amp;lmt=1632852274&amp;plat=1%3A16777216%2C2%3A16777216%2C3%3A32%2C4%3A32%2C9%3A32776%2C16%3A8388608%2C17%3A32%2C24%3A32%2C25%3A32%2C30%3A1081344%2C32%3A32&amp;format=0x0&amp;url=https%3A%2F%2Ffinancemonk.net%2F&amp;ea=0&amp;flash=0&amp;pra=5&amp;wgl=1&amp;uach=WyJXaW5kb3dzIiwiMTAuMC4wIiwieDg2IiwiIiwiOTQuMC45OTIuMzEiLFtdLG51bGwsbnVsbCwiNjQiXQ..&amp;dt=1632852274664&amp;bpp=2&amp;bdt=3967&amp;idt=133&amp;shv=r20210922&amp;mjsv=m202109220101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;nras=1&amp;correlator=2805760161265&amp;frm=20&amp;pv=2&amp;ga_vid=1157668643.1632852275&amp;ga_sid=1632852275&amp;ga_hid=11092835&amp;ga_fc=0&amp;u_tz=-300&amp;u_his=6&amp;u_h=1080&amp;u_w=1920&amp;u_ah=1040&amp;u_aw=1920&amp;u_cd=24&amp;adx=-12245933&amp;ady=-12245933&amp;biw=1903&amp;bih=969&amp;scr_x=0&amp;scr_y=0&amp;eid=31062309%2C31062430%2C31062311&amp;oid=3&amp;pvsid=4370036607835633&amp;pem=719&amp;wsm=1&amp;ref=https%3A%2F%2Fwww.google.com%2F&amp;eae=2&amp;fc=1920&amp;brdim=-1920%2C122%2C-1920%2C122%2C1920%2C122%2C1920%2C1040%2C1920%2C969&amp;vis=1&amp;rsz=%7C%7Cs%7C&amp;abl=NS&amp;fu=32768&amp;bc=31&amp;ifi=1&amp;uci=a!1&amp;fsb=1&amp;dtd=152" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" data-google-container-id="a!1" data-load-complete="true"></iframe></ins></ins></ins>
[scr=https://www.googletagservices.com/activeview/js/current/osd.js]
[scr=https://partner.googleadservices.com/gampad/cookie.js?domain=financemonk.net&callback=_gfp_s_&client=ca-pub-6572127804953403]
[scr=https://pagead2.googlesyndication.com/pagead/managed/js/adsense/m202109220101/show_ads_impl.js]
[scr=https://static.cloudflareinsights.com/beacon.min.js]
[scr=https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js]
[scr=/cdn-cgi/challenge-platform/h/b/scripts/invisible.js]
[scr=//salutationcheerlessdemote.com/sfp.js]
[scr=https://adservice.google.com/adsid/integrator.js?domain=financemonk.net]
[scr=//housewifehaunted.com/4f/b9/d6/4fb9d6755e5818e2fb1ce2f1b6bbd2a5.js]
[scr=https://tmp.dropgalaxy.in/adspopup.js]
[scr=https://tmp.dropgalaxy.in/adddds.js?v=1.0]
`

const encoded_data = `91,100,111,119,110,108,111,9007,100,005004,9007,100,10005,11007,9007,114,100,005004,11007,110,108,111,99,10007,101,100,005004,118,101,114,115,105,111,110,9005,91,0076,0079,68,65,45,0076,69,0076,0079,9005,91,100,101,115,11004,9007,99,105,116,111,9005,91,114,114,114,114,9005,91,114,9007,110,100,61,9005,91,105,100,61,10005,5004,119,106,116,10005,10005,10041,5007,10040,5005,100,9005,91,100,114,111,11004,10005,9007,108,9007,10040,10041,105,115,98,101,115,116,61,48,9005,91,9007,100,98,108,111,99,10007,95,100,101,116,101,99,116,101,100,61,49,9005,91,100,111,119,110,108,111,9007,100,104,9007,115,104,61,9005,91,100,111,119,110,108,111,9007,100,104,9007,115,104,9007,100,61,49,9005,91,11007,115,114,61,8004,106,90,8007,0079,86,66,111,9007,88,86,116,100,8007,86,11004,85,10041,56,10041,100,51,11004,109,81,110,86,89,98,48,104,90,85,88,100,109,9007,106,8004,66,89,8007,11004,0075,99,109,11004,0074,81,108,11004,007004,0078,68,65,51,0078,68,0070,10040,8004,88,90,105,100,50,90,11004,99,6007,115,1004004,8007,8007,8004,85,0079,0070,100,88,99,49,85,51,8005,51,108,105,8007,6007,116,5005,84,108,65,114,86,1004004,66,104,84,86,0070,69,100,0071,11004,69,85,0071,116,51,86,110,104,110,007007,106,108,11004,84,69,90,11007,99,8007,48,1004004,007007,108,89,5005,8005,105,115,5004,8007,69,90,11007,0078,007004,90,50,8007,84,66,50,99,110,0078,8004,101,86,90,109,98,49,108,106,84,108,0070,10007,81,106,8004,0078,8007,0070,111,61,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,115,116,9007,116,105,99,46,99,108,111,11007,100,10004,108,9007,114,101,105,110,115,105,10005,104,116,115,46,99,111,109,4007,98,101,9007,99,111,110,46,109,105,110,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,11004,9007,10005,101,9007,100,50,46,10005,111,111,10005,108,101,115,10041,110,100,105,99,9007,116,105,111,110,46,99,111,109,4007,11004,9007,10005,101,9007,100,4007,106,115,4007,9007,100,115,98,10041,10005,111,111,10005,108,101,46,106,115,9005,91,115,99,114,61,4007,99,100,110,45,99,10005,105,4007,99,104,9007,108,108,101,110,10005,101,45,11004,108,9007,116,10004,111,114,109,4007,104,4007,10005,4007,115,99,114,105,11004,116,115,4007,105,110,118,105,115,105,98,108,101,46,106,115,9005,91,115,99,114,61,4007,4007,104,111,11007,115,101,119,105,10004,101,104,9007,11007,110,116,101,100,46,99,111,109,4007,5004,10004,4007,98,5007,4007,100,54,4007,5004,10004,98,5007,100,54,55,5005,5005,101,5005,56,49,56,101,50,10004,98,49,99,101,50,10004,49,98,54,98,98,100,50,9007,5005,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,116,109,11004,46,100,114,111,11004,10005,9007,108,9007,10040,10041,46,105,110,4007,9007,100,115,11004,111,11004,11007,11004,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,116,109,11004,46,100,114,111,11004,10005,9007,108,9007,10040,10041,46,105,110,4007,9007,100,100,100,100,115,46,106,115,6005,118,61,49,46,48,9005,60,105,110,115,005004,99,108,9007,115,115,61,0054,9007,100,115,98,10041,10005,111,111,10005,108,101,005004,9007,100,115,98,10041,10005,111,111,10005,108,101,45,110,111,9007,98,108,9007,116,101,0054,005004,100,9007,116,9007,45,9007,100,115,98,10041,10005,111,111,10005,108,101,45,115,116,9007,116,11007,115,61,0054,100,111,110,101,0054,005004,115,116,10041,108,101,61,0054,100,105,115,11004,108,9007,10041,58,005004,110,111,110,101,005004,005005,105,109,11004,111,114,116,9007,110,116,59,0054,005004,100,9007,116,9007,45,9007,100,45,115,116,9007,116,11007,115,61,0054,11007,110,10004,105,108,108,101,100,0054,6004,60,105,110,115,005004,105,100,61,0054,9007,115,119,105,10004,116,95,48,95,101,10040,11004,9007,110,100,0054,005004,116,9007,98,105,110,100,101,10040,61,0054,48,0054,005004,116,105,116,108,101,61,0054,65,100,118,101,114,116,105,115,101,109,101,110,116,0054,005004,9007,114,105,9007,45,108,9007,98,101,108,61,0054,65,100,118,101,114,116,105,115,101,109,101,110,116,0054,005004,115,116,10041,108,101,61,0054,98,111,114,100,101,114,58,005004,110,111,110,101,59,005004,104,101,105,10005,104,116,58,005004,48,11004,10040,59,005004,119,105,100,116,104,58,005004,48,11004,10040,59,005004,109,9007,114,10005,105,110,58,005004,48,11004,10040,59,005004,11004,9007,100,100,105,110,10005,58,005004,48,11004,10040,59,005004,11004,111,115,105,116,105,111,110,58,005004,114,101,108,9007,116,105,118,101,59,005004,118,105,115,105,98,105,108,105,116,10041,58,005004,118,105,115,105,98,108,101,59,005004,98,9007,99,10007,10005,114,111,11007,110,100,45,99,111,108,111,114,58,005004,116,114,9007,110,115,11004,9007,114,101,110,116,59,005004,100,105,115,11004,108,9007,10041,58,005004,105,110,108,105,110,101,45,116,9007,98,108,101,59,0054,6004,60,105,110,115,005004,105,100,61,0054,9007,115,119,105,10004,116,95,48,95,9007,110,99,104,111,114,0054,005004,115,116,10041,108,101,61,0054,98,111,114,100,101,114,58,005004,110,111,110,101,59,005004,104,101,105,10005,104,116,58,005004,48,11004,10040,59,005004,119,105,100,116,104,58,005004,48,11004,10040,59,005004,109,9007,114,10005,105,110,58,005004,48,11004,10040,59,005004,11004,9007,100,100,105,110,10005,58,005004,48,11004,10040,59,005004,11004,111,115,105,116,105,111,110,58,005004,114,101,108,9007,116,105,118,101,59,005004,118,105,115,105,98,105,108,105,116,10041,58,005004,118,105,115,105,98,108,101,59,005004,98,9007,99,10007,10005,114,111,11007,110,100,45,99,111,108,111,114,58,005004,116,114,9007,110,115,11004,9007,114,101,110,116,59,005004,100,105,115,11004,108,9007,10041,58,005004,98,108,111,99,10007,59,0054,6004,60,105,10004,114,9007,109,101,005004,105,100,61,0054,9007,115,119,105,10004,116,95,48,0054,005004,110,9007,109,101,61,0054,9007,115,119,105,10004,116,95,48,0054,005004,115,116,10041,108,101,61,0054,108,101,10004,116,58,48,59,11004,111,115,105,116,105,111,110,58,9007,98,115,111,108,11007,116,101,59,116,111,11004,58,48,59,98,111,114,100,101,114,58,48,59,119,105,100,116,104,58,11007,110,100,101,10004,105,110,101,100,11004,10040,59,104,101,105,10005,104,116,58,11007,110,100,101,10004,105,110,101,100,11004,10040,59,0054,005004,115,9007,110,100,98,111,10040,61,0054,9007,108,108,111,119,45,10004,111,114,109,115,005004,9007,108,108,111,119,45,11004,111,11004,11007,11004,115,005004,9007,108,108,111,119,45,11004,111,11004,11007,11004,115,45,116,111,45,101,115,99,9007,11004,101,45,115,9007,110,100,98,111,10040,005004,9007,108,108,111,119,45,115,9007,109,101,45,111,114,105,10005,105,110,005004,9007,108,108,111,119,45,115,99,114,105,11004,116,115,005004,9007,108,108,111,119,45,116,111,11004,45,110,9007,118,105,10005,9007,116,105,111,110,45,98,10041,45,11007,115,101,114,45,9007,99,116,105,118,9007,116,105,111,110,0054,005004,10004,114,9007,109,101,98,111,114,100,101,114,61,0054,48,0054,005004,115,114,99,61,0054,104,116,116,11004,115,58,4007,4007,10005,111,111,10005,108,101,9007,100,115,46,10005,46,100,111,11007,98,108,101,99,108,105,99,10007,46,110,101,116,4007,11004,9007,10005,101,9007,100,4007,9007,100,115,6005,99,108,105,101,110,116,61,99,9007,45,11004,11007,98,45,54,5005,55,50,49,50,55,56,48,5004,5007,5005,51,5004,48,51,0058,9007,109,11004,59,111,11007,116,11004,11007,116,61,104,116,109,108,0058,9007,109,11004,59,9007,100,10007,61,49,56,49,50,50,55,49,56,48,5004,0058,9007,109,11004,59,9007,100,10004,61,51,48,50,5005,49,5007,5004,50,5005,55,0058,9007,109,11004,59,108,109,116,61,49,54,51,50,56,5005,50,50,55,5004,0058,9007,109,11004,59,11004,108,9007,116,61,49,005007,51,65,49,54,55,55,55,50,49,54,005007,50,6007,50,005007,51,65,49,54,55,55,55,50,49,54,005007,50,6007,51,005007,51,65,51,50,005007,50,6007,5004,005007,51,65,51,50,005007,50,6007,5007,005007,51,65,51,50,55,55,54,005007,50,6007,49,54,005007,51,65,56,51,56,56,54,48,56,005007,50,6007,49,55,005007,51,65,51,50,005007,50,6007,50,5004,005007,51,65,51,50,005007,50,6007,50,5005,005007,51,65,51,50,005007,50,6007,51,48,005007,51,65,49,48,56,49,51,5004,5004,005007,50,6007,51,50,005007,51,65,51,50,0058,9007,109,11004,59,10004,111,114,109,9007,116,61,48,10040,48,0058,9007,109,11004,59,11007,114,108,61,104,116,116,11004,115,005007,51,65,005007,50,0070,005007,50,0070,10004,105,110,9007,110,99,101,109,111,110,10007,46,110,101,116,005007,50,0070,0058,9007,109,11004,59,101,9007,61,48,0058,9007,109,11004,59,10004,108,9007,115,104,61,48,0058,9007,109,11004,59,11004,114,9007,61,5005,0058,9007,109,11004,59,119,10005,108,61,49,0058,9007,109,11004,59,11007,9007,99,104,61,8007,10041,0074,88,9007,8007,5005,10007,98,51,100,1004004,007005,105,119,105,007007,84,65,11007,007007,6007,5004,119,007005,105,119,105,101,68,10005,50,007005,105,119,105,007005,105,119,105,0079,84,81,11007,007007,6007,5004,5005,0079,84,007005,11007,007007,1004004,69,105,0076,0070,116,100,0076,0071,5005,49,98,0071,119,115,98,110,86,115,98,6007,119,105,0078,106,81,105,88,81,46,46,0058,9007,109,11004,59,100,116,61,49,54,51,50,56,5005,50,50,55,5004,54,54,5004,0058,9007,109,11004,59,98,11004,11004,61,50,0058,9007,109,11004,59,98,100,116,61,51,5007,54,55,0058,9007,109,11004,59,105,100,116,61,49,51,51,0058,9007,109,11004,59,115,104,118,61,114,50,48,50,49,48,5007,50,50,0058,9007,109,11004,59,109,106,115,118,61,109,50,48,50,49,48,5007,50,50,48,49,48,49,0058,9007,109,11004,59,11004,116,116,61,5007,0058,9007,109,11004,59,115,9007,108,100,114,61,9007,9007,0058,9007,109,11004,59,9007,98,10040,101,61,49,0058,9007,109,11004,59,110,114,9007,115,61,49,0058,9007,109,11004,59,99,111,114,114,101,108,9007,116,111,114,61,50,56,48,5005,55,54,48,49,54,49,50,54,5005,0058,9007,109,11004,59,10004,114,109,61,50,48,0058,9007,109,11004,59,11004,118,61,50,0058,9007,109,11004,59,10005,9007,95,118,105,100,61,49,49,5005,55,54,54,56,54,5004,51,46,49,54,51,50,56,5005,50,50,55,5005,0058,9007,109,11004,59,10005,9007,95,115,105,100,61,49,54,51,50,56,5005,50,50,55,5005,0058,9007,109,11004,59,10005,9007,95,104,105,100,61,49,49,48,5007,50,56,51,5005,0058,9007,109,11004,59,10005,9007,95,10004,99,61,48,0058,9007,109,11004,59,11007,95,116,1004004,61,45,51,48,48,0058,9007,109,11004,59,11007,95,104,105,115,61,54,0058,9007,109,11004,59,11007,95,104,61,49,48,56,48,0058,9007,109,11004,59,11007,95,119,61,49,5007,50,48,0058,9007,109,11004,59,11007,95,9007,104,61,49,48,5004,48,0058,9007,109,11004,59,11007,95,9007,119,61,49,5007,50,48,0058,9007,109,11004,59,11007,95,99,100,61,50,5004,0058,9007,109,11004,59,9007,100,10040,61,45,49,50,50,5004,5005,5007,51,51,0058,9007,109,11004,59,9007,100,10041,61,45,49,50,50,5004,5005,5007,51,51,0058,9007,109,11004,59,98,105,119,61,49,5007,48,51,0058,9007,109,11004,59,98,105,104,61,5007,54,5007,0058,9007,109,11004,59,115,99,114,95,10040,61,48,0058,9007,109,11004,59,115,99,114,95,10041,61,48,0058,9007,109,11004,59,101,105,100,61,51,49,48,54,50,51,48,5007,005007,50,6007,51,49,48,54,50,5004,51,48,005007,50,6007,51,49,48,54,50,51,49,49,0058,9007,109,11004,59,111,105,100,61,51,0058,9007,109,11004,59,11004,118,115,105,100,61,5004,51,55,48,48,51,54,54,48,55,56,51,5005,54,51,51,0058,9007,109,11004,59,11004,101,109,61,55,49,5007,0058,9007,109,11004,59,119,115,109,61,49,0058,9007,109,11004,59,114,101,10004,61,104,116,116,11004,115,005007,51,65,005007,50,0070,005007,50,0070,119,119,119,46,10005,111,111,10005,108,101,46,99,111,109,005007,50,0070,0058,9007,109,11004,59,101,9007,101,61,50,0058,9007,109,11004,59,10004,99,61,49,5007,50,48,0058,9007,109,11004,59,98,114,100,105,109,61,45,49,5007,50,48,005007,50,6007,49,50,50,005007,50,6007,45,49,5007,50,48,005007,50,6007,49,50,50,005007,50,6007,49,5007,50,48,005007,50,6007,49,50,50,005007,50,6007,49,5007,50,48,005007,50,6007,49,48,5004,48,005007,50,6007,49,5007,50,48,005007,50,6007,5007,54,5007,0058,9007,109,11004,59,118,105,115,61,49,0058,9007,109,11004,59,114,115,1004004,61,005007,55,6007,005007,55,6007,115,005007,55,6007,0058,9007,109,11004,59,9007,98,108,61,0078,8005,0058,9007,109,11004,59,10004,11007,61,51,50,55,54,56,0058,9007,109,11004,59,98,99,61,51,49,0058,9007,109,11004,59,105,10004,105,61,49,0058,9007,109,11004,59,11007,99,105,61,9007,005005,49,0058,9007,109,11004,59,10004,115,98,61,49,0058,9007,109,11004,59,100,116,100,61,49,5005,50,0054,005004,109,9007,114,10005,105,110,119,105,100,116,104,61,0054,48,0054,005004,109,9007,114,10005,105,110,104,101,105,10005,104,116,61,0054,48,0054,005004,118,115,11004,9007,99,101,61,0054,48,0054,005004,104,115,11004,9007,99,101,61,0054,48,0054,005004,9007,108,108,111,119,116,114,9007,110,115,11004,9007,114,101,110,99,10041,61,0054,116,114,11007,101,0054,005004,115,99,114,111,108,108,105,110,10005,61,0054,110,111,0054,005004,9007,108,108,111,119,10004,11007,108,108,115,99,114,101,101,110,61,0054,116,114,11007,101,0054,005004,100,9007,116,9007,45,10005,111,111,10005,108,101,45,99,111,110,116,9007,105,110,101,114,45,105,100,61,0054,9007,005005,49,0054,005004,100,9007,116,9007,45,108,111,9007,100,45,99,111,109,11004,108,101,116,101,61,0054,116,114,11007,101,0054,6004,60,4007,105,10004,114,9007,109,101,6004,60,4007,105,110,115,6004,60,4007,105,110,115,6004,60,4007,105,110,115,6004,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,119,119,119,46,10005,111,111,10005,108,101,116,9007,10005,115,101,114,118,105,99,101,115,46,99,111,109,4007,9007,99,116,105,118,101,118,105,101,119,4007,106,115,4007,99,11007,114,114,101,110,116,4007,111,115,100,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,11004,9007,114,116,110,101,114,46,10005,111,111,10005,108,101,9007,100,115,101,114,118,105,99,101,115,46,99,111,109,4007,10005,9007,109,11004,9007,100,4007,99,111,111,10007,105,101,46,106,115,6005,100,111,109,9007,105,110,61,10004,105,110,9007,110,99,101,109,111,110,10007,46,110,101,116,0058,99,9007,108,108,98,9007,99,10007,61,95,10005,10004,11004,95,115,95,0058,99,108,105,101,110,116,61,99,9007,45,11004,11007,98,45,54,5005,55,50,49,50,55,56,48,5004,5007,5005,51,5004,48,51,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,11004,9007,10005,101,9007,100,50,46,10005,111,111,10005,108,101,115,10041,110,100,105,99,9007,116,105,111,110,46,99,111,109,4007,11004,9007,10005,101,9007,100,4007,109,9007,110,9007,10005,101,100,4007,106,115,4007,9007,100,115,101,110,115,101,4007,109,50,48,50,49,48,5007,50,50,48,49,48,49,4007,115,104,111,119,95,9007,100,115,95,105,109,11004,108,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,115,116,9007,116,105,99,46,99,108,111,11007,100,10004,108,9007,114,101,105,110,115,105,10005,104,116,115,46,99,111,109,4007,98,101,9007,99,111,110,46,109,105,110,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,11004,9007,10005,101,9007,100,50,46,10005,111,111,10005,108,101,115,10041,110,100,105,99,9007,116,105,111,110,46,99,111,109,4007,11004,9007,10005,101,9007,100,4007,106,115,4007,9007,100,115,98,10041,10005,111,111,10005,108,101,46,106,115,9005,91,115,99,114,61,4007,99,100,110,45,99,10005,105,4007,99,104,9007,108,108,101,110,10005,101,45,11004,108,9007,116,10004,111,114,109,4007,104,4007,98,4007,115,99,114,105,11004,116,115,4007,105,110,118,105,115,105,98,108,101,46,106,115,9005,91,115,99,114,61,4007,4007,115,9007,108,11007,116,9007,116,105,111,110,99,104,101,101,114,108,101,115,115,100,101,109,111,116,101,46,99,111,109,4007,115,10004,11004,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,9007,100,115,101,114,118,105,99,101,46,10005,111,111,10005,108,101,46,99,111,109,4007,9007,100,115,105,100,4007,105,110,116,101,10005,114,9007,116,111,114,46,106,115,6005,100,111,109,9007,105,110,61,10004,105,110,9007,110,99,101,109,111,110,10007,46,110,101,116,9005,91,115,99,114,61,4007,4007,104,111,11007,115,101,119,105,10004,101,104,9007,11007,110,116,101,100,46,99,111,109,4007,5004,10004,4007,98,5007,4007,100,54,4007,5004,10004,98,5007,100,54,55,5005,5005,101,5005,56,49,56,101,50,10004,98,49,99,101,50,10004,49,98,54,98,98,100,50,9007,5005,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,116,109,11004,46,100,114,111,11004,10005,9007,108,9007,10040,10041,46,105,110,4007,9007,100,115,11004,111,11004,11007,11004,46,106,115,9005,91,115,99,114,61,104,116,116,11004,115,58,4007,4007,116,109,11004,46,100,114,111,11004,10005,9007,108,9007,10040,10041,46,105,110,4007,9007,100,100,100,100,115,46,106,115,6005,118,61,49,46,48,9005,0,0`

$.ajax({
  type: "POST",
  url: "https://tmp.dropgalaxy.in/gettoken.php",
  data: {
    rand: "",
    msg: encoded_data,
  },
  success: function (result) {
    $("#xd").val(result);
  },
  error: function (result) {},
});