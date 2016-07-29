var pre = require('bybat-preprocessor');


module.exports = function(data , socket) {
  socket.emit("updatePreviewStatus" , 0);
  pre.preprocess("public/images/sample-1.jpg" , "public/images/processed.jpg" , function(err , path) {
    if (err) {
      console.log(err);
    }
    else {
      socket.emit("updatePreviewStatus" , 100);
      socket.emit("updatePreview" , "images/processed.jpg" );
    }
  });
};



