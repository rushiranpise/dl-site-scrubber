sitekey = "6LdyluwUAAAAAI5AMDQTg4_9LFoNbrJub0IsdU3p"

"a#downloadb".click();

$(".show-container-2").click(function () {
  var obj = $(this);
  $(obj).siblings("span").addClass("loader float-right");

  $.ajax({
    url: "/Download/FilePage2Ajax/NmU1ZDRhOTYt",
    type: "Get",
    success: function (data) {
      $(".container-1").addClass("display-none");
      $(".container-2").removeClass("display-none");
      $(".container-2").html(data);

      $(obj).siblings("span").removeClass("loader float-right");

      $("html, body").animate(
        {
          scrollTop: $(".container-2").offset().top,
        },
        1000
      );
    },
  });
});

fetch("https://khabarbabal.online/FilePage2/NmU1ZDRhOTYt", {
  headers: {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "sec-gpc": "1",
    "upgrade-insecure-requests": "1",
  },
  referrer: "https://khabarbabal.online/File/NmU1ZDRhOTYt",
  referrerPolicy: "strict-origin-when-cross-origin",
  body: null,
  method: "GET",
  mode: "cors",
  credentials: "include",
})
  .then((r) => r.text())
  .then((d) => console.log(d)); // this is the final page

$(".show-container-2").click(function () {
  var obj = $(this);
  $(obj).siblings("span").addClass("loader float-right");

  $.ajax({
    url: "/Download/FilePage4Ajax/NmU1ZDRhOTYt",
    type: "Get",
    success: function (data) {
      $(".container-1").addClass("display-none");
      $(".container-2").removeClass("display-none");
      $(".container-2").html(data);

      $(obj).siblings("span").removeClass("loader float-right");

      $("html, body").animate(
        {
          scrollTop: $(".container-2").offset().top,
        },
        1000
      );
    },
  });
});

fetch("https://khabarbabal.online/Download/FilePage5", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "content-type": "application/x-www-form-urlencoded",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "sec-gpc": "1",
    "upgrade-insecure-requests": "1"
  },
  "referrer": "https://khabarbabal.online/FilePage2/NmU1ZDRhOTYt",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "FileId=NmU1ZDRhOTYt&g-recaptcha-response=03AGdBq25JAud5zxYijgct6aAAv789ffG3KAokm0TZ7W76FoKiP937fYsU7sd1GpPZIOj7gllDtQSbXtSmO0pj33_e3IeRLorhPnQt6n11emhYopXP1fSRrWQ6qyOgW74WHd__iwTPDhlPNXJFicugzp1ahzA7EBHr0BHmksS4rMp15MvaqX_tPu816qLUPvlqCS0-mcmpwkKvFTu9ypULKN9_Awn_foMrVksLUc4CcTpnuiFAUlLiuA71AWjBwaYA1vqc4NRQe6DPrq3OarUKqiWlpwN8jLjBv-b7S5-mzBon59uqBuadMbuwk30ZAfH1d-HKU-TZjcPELSgF4kum8Jk08UnqTqE2wogq6KBC3v27vnRsONxy9vQ7_XhUSa432iovX8Jg9PY_WYSYhIXW5eBD3JA1JOkye7r6Inam2kDd9N7MlOHfhUzAR-s-4tP9jK8o1DuyxJGA&ContinentName=&CountryName=&CityName=",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})

fetch("https://khabarbabal.online/Download/FilePage5", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "content-type": "application/x-www-form-urlencoded",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "sec-gpc": "1",
    "upgrade-insecure-requests": "1"
  },
  "referrer": "https://khabarbabal.online/file/NmU1ZDRhOTYt",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "FileId=NmU1ZDRhOTYt&g-recaptcha-response=03AGdBq27IgHUTiIxTtIueS2H_imN5exaleszQdopYSmqH8Aa3vyASbsK0yLFlKbp58oKS2WFmFNZmmFSttsPEtciaoQrB0lRt6DO4mptzLQe7QubYa2F4zuQESx-QIiccXjcnJPsMOQ-PoUzuU3-pwymr529avW9XJQjqqSJXx_GzgvAL9UfUP5fHajE7rPYjLvSNpF_aSFHhkbuHE8w1hH6beOaa3pjjjSvFhvd1FO8ag7uKSpouLihhWWdLkD8KE1gYcAOSbm44JHslGJ9Xjup-KH7gQ9L8Op7YRcnJkMGZ-Hb7PnUyTDSgoWrrUWgYfv8NpjkaqAf3PgyYWsr0m05jm8WQrVMmqjPoksSWU-is49GZGYbZtCJ68KBblI1-xLMTuinOwYFZTJbgy1yBXP1_FurmPTDerD_cOa0eRgxwrOoqr2bUKjGinSLfPfAITOejvhmpMssnPCqRjB195EVjpiaIHy-Hqw",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});

// Responds with link to file, then it downloads the file