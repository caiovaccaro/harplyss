var express = require('express');
var fs = require('fs');
var harp = require('harp');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var browserSync = require('browser-sync');
var connectbs = require('connect-browser-sync');
var app = express();

app.set('views', './structure-views');
app.set('view engine', 'jade');

var bs = browserSync({
  logSnippet: false,
  files: [
    __dirname + '/public/**/*.jade',
    __dirname + '/public/**/*.styl',
    __dirname + '/public/**/*.scss',
    __dirname + '/public/**/*.sass',
    __dirname + '/public/**/*.js'
  ]
});
app.use(connectbs(bs));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(harp.mount(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.redirect('/site');
});

app.get('*/edit-json', function (req, res) {
  var dataJsonPath = path.dirname(req.originalUrl),
      dataJsonFolder = __dirname + '/public' + dataJsonPath,
      dataJsonFilePath = dataJsonFolder + '/_data.json';

  fs.exists(dataJsonFilePath, function (exists) {
    console.log(exists);
    if (exists) {
      fs.readFile(dataJsonFilePath, 'utf8', function(err, data) {
        res.render('edit', {
          jsonContent: JSON.parse(data),
          link: dataJsonPath
        });
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