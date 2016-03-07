
var express    = require('express');
var http       = require('http');
var path       = require ('path');
var fs         = require('fs');
var bodyParser = require('body-parser');
var pdf        = require('html-pdf');
var nunjucks   = require('nunjucks');
var html       = fs.readFileSync('./public/medic.form.tmpl.html', 'utf8');


var routes = require('./routes');
var app    = express();

// Nunjucks is a product from Mozilla used here as a template engine.
exports.env = nunjucks.configure('public', {
    autoescape: true,
    express: app
});

var port = process.env.port || 5000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(request, response) {

  response.sendFile( __dirname + "/" + "index.html" );

});

app.post("/sample", function(request, response) {
  console.log(request.body);
  //Or process each field by name
  //console.log(request.body.fieldName);

  routes.printformpdf(request, response);

});

app.listen(port);
console.log('node server for form2pdf is running on port ' + port);

