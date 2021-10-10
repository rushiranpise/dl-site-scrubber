const d = ``;

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

console.log(overallDecoder(d));
