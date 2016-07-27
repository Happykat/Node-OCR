var cv = require('opencv');

var GREEN = [0, 255, 0]; // B, G, R
var WHITE = [255, 255, 255]; // B, G, R
var RED   = [0, 0, 255]; // B, G, R
var maxArea = 2500;

module.exports = function(data , socket) {
  socket.emit("updatePreviewStatus" , 0);
  cv.readImage('./public/images/sample-1.png', function(err, mat){
    var width = mat.width();
    var height = mat.height();
    if (err) {
      return;
    }
    socket.emit("updatePreviewStatus" , 30);
    if (data.blur % 2 != 1) {
      data.blur++;
    }

    if (data.mat % 2 != 1) {
      data.mat++;
    }

    if (data.mat <= 1)
    {
      data.mat = 3;
    }

    var big = new cv.Matrix(height, width);
    var all = new cv.Matrix(height, width);

    mat.convertGrayscale();
    mat_canny = mat.copy();

    mat_canny.canny(data.minElem, data.maxElem);
    mat_canny.dilate(data.mat);

    contours = mat_canny.findContours();

    for(i = 0; i < contours.size(); i++) {
      if(contours.area(i) > maxArea) {
        var moments = contours.moments(i);
        var cgx = Math.round(moments.m10 / moments.m00);
        var cgy = Math.round(moments.m01 / moments.m00);
        big.drawContour(contours, i, GREEN);
        big.line([cgx - 5, cgy], [cgx + 5, cgy], RED);
        big.line([cgx, cgy - 5], [cgx, cgy + 5], RED);
      }
    }

    all.drawAllContours(contours, WHITE);
    socket.emit("updatePreviewStatus" , 60);
    socket.emit("updatePreviewStatus" , 90);
    all.save('./public/images/processed.png');
    socket.emit("updatePreviewStatus" , 100);
    socket.emit("updatePreview" , "images/processed.png" );
  })
};



