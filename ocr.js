var tesseract = require('node-tesseract');

var options = {
  l: 'eng',
  binary: '/bin/tesseract'
};

var process = function (socket) {
  tesseract.process(__dirname + '/public/images/processed.png', options, function(err, text) {
    console.log("done !");
    if(err) {
      result = err;
    } else {
      result = text;
    }
      socket.emit("updateDecode" , result);
  });
}

module.exports = process;


