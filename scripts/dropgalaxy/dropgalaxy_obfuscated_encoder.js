$(window).load(function () {
  function zvaMmGsVOrgGVkiJVaYPF(str) {
    var buf = new ArrayBuffer(str.length * 2);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  var VTKWeEheXj = document.documentElement.outerHTML;
  var YWpPrUjbalNt = "[download adguard unlocked version]";
  YWpPrUjbalNt += "[LODA-LELO]";
  YWpPrUjbalNt += "[despacito]";
  YWpPrUjbalNt += "[rrrr]";
  YWpPrUjbalNt += "[rand=" + $("#rand").val() + "]";
  YWpPrUjbalNt += "[id=" + $("#fileid").val() + "]";
  YWpPrUjbalNt += "[dropgalaxyisbest=" + $("#dropgalaxyisbest").val() + "]";
  YWpPrUjbalNt += "[adblock_detected=" + $("#adblock_detected").val() + "]";
  YWpPrUjbalNt += "[downloadhash=" + $("#downloadhash").val() + "]";
  YWpPrUjbalNt += "[downloadhashad=" + $("#downloadhashad").val() + "]";
  YWpPrUjbalNt +=
    "[usr=RjZWOVBoaXVtdWVpUy8yd3pmQnVYb0hZUXdmajRBYWpKcmpJQlpHNDA3NDFxRXZid2ZpcCszWWRUOFdXc1U3S3liWCt5TlArVzBhTVFEdGpEUGt3VnhnMjlpTEZucW0zMlY5Sis4WEZuNHVxTGxSZy9oRlZUMDhrRTNLbVc4OXM=]";
  var dd = $(VTKWeEheXj)
    .filter(".adsbygoogle")
    .each(function (i, e) {
      YWpPrUjbalNt += e["outerHTML"];
    });
  $(VTKWeEheXj)
    .filter("script")
    .each(function (i, e) {
      var WzSLzXBYtpqHhBWTZyhPTaXIt = $(this).filter("script").attr("src");
      if (typeof WzSLzXBYtpqHhBWTZyhPTaXIt !== "undefined") {
        if (
          WzSLzXBYtpqHhBWTZyhPTaXIt.indexOf("https://dropgalaxy.com/") == -1
        ) {
          YWpPrUjbalNt += "[scr=" + WzSLzXBYtpqHhBWTZyhPTaXIt + "]";
        }
      }
    });
  var mgLEs = zvaMmGsVOrgGVkiJVaYPF(YWpPrUjbalNt);
  var BdlqmoEmghtAZXKELjjlaX = new Uint8Array(mgLEs);
  var skoVrcttScrmwQrqduaI = BdlqmoEmghtAZXKELjjlaX.toString();
  var skoVrcttScrmwQrqduaI = skoVrcttScrmwQrqduaI.replace(/2/g, "004");
  var skoVrcttScrmwQrqduaI = skoVrcttScrmwQrqduaI.replace(/3/g, "005");
  var skoVrcttScrmwQrqduaI = skoVrcttScrmwQrqduaI.replace(/7/g, "007");
  var skoVrcttScrmwQrqduaI = skoVrcttScrmwQrqduaI.replace(/,0,0,0/g, "");
  var randd = $("#rand").val();
  $.ajax({
    type: "POST",
    url: "https://tmp.dropgalaxy.in/gettoken.php",
    data: {
      rand: randd,
      msg: skoVrcttScrmwQrqduaI,
    },
    success: function (result) {
      $("#xd").val(result);
    },
    error: function (result) {},
  });
});
