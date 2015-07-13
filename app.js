var express = require('express');
var fs = require('fs');
var harp = require('harp');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.set('views', './structure-views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(harp.mount(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.redirect('/site');
});

app.get('*/edit-json', function (req, res) {
  console.log(req.originalUrl);
  var dataJsonFilePath = __dirname + '/public' + path.dirname(req.originalUrl) + '/_data.json';
  console.log(dataJsonFilePath);
  fs.exists(dataJsonFilePath, function (exists) {
    console.log(exists);
    if (exists) {
      fs.readFile(dataJsonFilePath, 'utf8', function(err, data) {
        res.render('edit', { jsonContent: JSON.parse(data) });
      });
    } else {
      res.redirect('/site');
    }
  });
});

//app.post('/', function (req, res) {
//  fs.writeFile(__dirname + '/public/data.json', JSON.stringify(JSON.parse(req.body.jsonFile), null, 4), function(err) {
//    if(err) {
//      console.log('Could not save file.', err);
//    } else {
//      console.log('File saved: /public/data.json');
//    }
//  });
//});

module.exports = app;