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
coded_string += "[LODA-LELO]";
coded_string += "[despacito]";
coded_string += "[rrrr]";
coded_string += "[rand=" + $("#rand").val() + "]";
coded_string += "[id=" + $("#fileid").val() + "]";
coded_string += "[dropgalaxyisbest=" + $("#dropgalaxyisbest").val() + "]";
coded_string += "[adblock_detected=" + $("#adblock_detected").val() + "]";
coded_string += "[downloadhash=" + $("#downloadhash").val() + "]";
coded_string += "[downloadhashad=" + $("#downloadhashad").val() + "]";
coded_string +=
  "[usr=RjZWOVBoaXVtdWVpUy8yd3pmQnVYb0hZUXdmajRBYWpKcmpJQlpHNDA3NDFxRXZid2ZpcCszWWRUOFdXc1U3S3liWCt5TlArVzBhTVFEdGpEUGt3VnhnMjlpTEZucW0zMlY5Sis4WEZuNHVxTGxSZy9oRlZUMDhrRTNLbVc4OXM=]";
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
