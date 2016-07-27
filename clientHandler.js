var imgproc = require('./imgproc');
var decode = require('./ocr.js');

var handler = function(socket) {

  socket.on('preview' , function(data) {
    console.log('Client requested a preview');
    console.log(data);
    imgproc(data , socket);
  }
  );

  socket.on('decode' , function() {
    console.log('Client requested a decode');
    console.log();
    decode(socket);
  }
  );

}

module.exports = handler;
