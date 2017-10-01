var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var firebase = require('firebase');
require('firebase/database');
var dbconfig = require('./util/db-config');
var schedule = require('node-schedule');
var data = require('./util/dummy_data');

var index = require('./routes/index');
var users = require('./routes/users');
var calls = require('./routes/calls');

const startDummyCalls = require('./util/callGenerator.js');

firebase.auth().signInWithEmailAndPassword('emergency.response.solutions1@gmail.com', 'password')
.catch(function(error) {
  console.log(error);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/calls', calls)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// start creating dummy calls
// comment out once live data is received
// see ./util/callGenerator.js
startDummyCalls();

module.exports = app;

