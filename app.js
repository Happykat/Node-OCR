var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var routes = require('./routes/index');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clientHandler = require('./clientHandler');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

io.on('connection', clientHandler);


http.listen(4250, function(){
  console.log('socket IO listening on *:4250');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(4200 , function() {
  console.log("Express listening on port 4200");
});

module.exports = app;
