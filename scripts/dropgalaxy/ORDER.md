# DropGalaxy Order of Operations

 1. Short URL Download Link
    * Responds with:
        ```html
        <!DOCTYPE HTML>
        <html>
        <head>
        <meta charset="UTF-8" />
        <title>Download File from DropGalaxy</title>
        <meta name="robots" content="noindex">
            <meta name="referrer" content="no-referrer" />
            <meta name="referrer" content="none" />
        <link rel="shortcut icon" href="https://dropgalaxy.com/assets/img/favicon.png">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
        <meta content="1" name="dropgalaxycom">
        <body>
        <script src="https://dropgalaxy.com/assets/js/jquery-1.9.1.min.js"></script>
        <script>
        document.write('<style>body { visibility: hidden; } </style>');
        </script>
        <script>
            function removeParam(key, sourceURL) {
            var rtn = sourceURL.split("?")[0],
                param,
                params_arr = [],
                queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
            if (queryString !== "") {
                params_arr = queryString.split("&");
                for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                    param = params_arr[i].split("=")[0];
                    if (param === key) {
                        params_arr.splice(i, 1);
                    }
                }
                rtn = rtn + "?" + params_arr.join("&");
            }
            return rtn;
        }
        $(document).ready(function(){
        var referrer =  document.referrer;

        $(document).ajaxComplete(function(){
            });

        if($("#id").val() != "")
                {

        if (referrer.indexOf('dglinker.com') > -1) {
        var res = removeParam("user", referrer);

        var res = res.replace(/dglinker.com/gi, "dglinker.in");
            $('#referer').val(res);

        }else{
        $('#referer').val(referrer);
        }
        $("#my_form").submit();
                }
        });
        </script>
        <script type="text/javascript">
        jQuery(document).ready(function(){
            delay();
        });

        function delay() {
            var secs = 3000;
            setTimeout('initFadeIn()', secs);
        }

        function initFadeIn() {
            jQuery("body").css("visibility","visible");
            jQuery("body").css("display","none");
            jQuery("body").fadeIn(1200);
        }
        </script>
        <div class="center">
        <form id="my_form" name="F1" action="https://dropgalaxy.com/826-tips-on-home-insurance-for-large-families.html" method="POST">
        <input type="hidden" name="op" value="download1">
        <input type="hidden" id="id" name="id" value="g4wjtggy9x5d">
        <input type="hidden" id="referer" name="referer" value="">
        <input type="submit" id="method_free" class="btn btn-default" value="Go To Download Page">
        </form>
        </div>
        <noscript>Your browser does not support JavaScript!</noscript>
        </body>
        </html>
        ```
