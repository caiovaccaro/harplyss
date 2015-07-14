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

app.post('*/edit-json', function (req, res) {
  var dataJsonFilePath = __dirname + '/public' + path.dirname(req.originalUrl) + '/_data.json';

  fs.exists(dataJsonFilePath, function (exists) {
    console.log(exists);
    if (exists) {
      fs.writeFile(dataJsonFilePath, JSON.stringify(JSON.parse(req.body.jsonFile), null, 4), function(err) {
        if(err) {
          res.sendStatus(500);
          res.send('Could not save file.');
          console.log('Could not save file.', err);
        } else {
          res.sendStatus(200);
          console.log('File saved: /public/data.json');
        }
      });
    } else {
      res.sendStatus(500);
      res.send('File does not exist.');
      console.log('File does not exist.', err);
    }
  });
});

module.exports = app;