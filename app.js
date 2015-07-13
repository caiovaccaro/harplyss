var express = require('express');
var harp = require('harp');
var path = require('path');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(harp.mount(path.join(__dirname, 'public')));

app.use('/', function(req, res, next) {
  res.redirect('/site');
});

module.exports = app;