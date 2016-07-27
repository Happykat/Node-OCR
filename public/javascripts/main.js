$(document).ready(function () {
  var socket = io('http://localhost:4250');
  var canUpdate = true;

  socket.on('updatePreviewStatus' , previewProgressHandler);
  socket.on('updateDecodeStatus' , decodeProgressHandler);
  socket.on('updatePreview' , updatePreview);
  socket.on('updateDecode' , updateDecode);


  function updatePreview(data) {
    console.log("Updating preview content !");
    $("#previewContent").attr("src" , data + "?" + new Date().getTime());
    canUpdate = true;
  };

  function updateDecode(data) {
    console.log(data);
    data = data.replace(/(?:\r\n|\r|\n)/g, '<br />');
    $("#decodeContent").text(data);
    decodeProgressHandler(false);
  };

  // Settings getter
  function getSettings() {
    var blurElem = $("#blur");
    var minElem  = $("#min-threshold");
    var maxElem  = $("#max-threshold");
    var matrix   = $("#matrix-size");
    var revElem  = $("#reverse-threshold");

    return {
      "blur" : blurElem.val(),
      "min"  : minElem.val(),
      "max"  : maxElem.val(),
      "mat"  : matrix.val(),
      "rev"  : revElem.is(':checked'),
    };
  }
  // preview progress bar
  function previewProgressHandler(value) {
    var target = $("#preview-progress");
    target.show();
    target.find(">:first-child").width(value + "%");
  }
  // decode  progress bar
  function decodeProgressHandler(show) {
    var target = $("#ocr-progress");
    if (show === true) {
      target.show();
    }
    else {
      target.hide();
    }
  }
  // Click on preview handler
  function clickOnPreview(){
    if (canUpdate == false) {
      return;
    }
    socket.emit('preview' , getSettings());

  }
  // Click on decode  handler
  function clickOnDecode(){
    socket.emit('decode' , getSettings());
    decodeProgressHandler(true);
  }

  $("#decode").click(clickOnDecode);
  $("#preview").click(clickOnPreview);

});
