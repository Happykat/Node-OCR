var preprocess = require('ocr-preprocessor');

let options = {};

module.exports = function(data , socket) {
  socket.emit("updatePreviewStatus" , 0);

  options.blur = data.blur;
  options.const = data.const;
  options.threshold = data.thresh;
  options.matrix = data.matrix;
  options.revert = data.revert;
  options.isolate = data.isolate;

  preprocess("public/images/sample-1.jpg" , "public/images/processed.jpg" , options , function(err , path) {
    if (err) {
      console.log(err);
    }
    else {
      socket.emit("updatePreviewStatus" , 100);
      socket.emit("updatePreview" , "images/processed.jpg" );
    }
  });
};



