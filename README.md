# form2pdf

Sample service created in Node.js create pdf from HTML form submit. HTML Form can have any number of fields, the app will render all form fields on the PDF file with name:value pairs maped. 

### Version
1.0.0

### Tech

Libraries used in this sample project - 

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [node-html-pdf] - Html to pdf converter in nodejs. It spawns a phantomjs process and passes the pdf as buffer or as filename.
* [Body-Parser] - npm body-parser for node.js API 
* [nunjucks] - A rich and powerful templating language for JavaScript.


### Installation

```sh
$ npm install --save express
$ npm install --save body-parser
$ npm install --save html-pdf
$ npm install --save nunjucks
```

### Server side node.js API code

```Javascript
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
```

### Client side HTML with Bootstrap
```html
 <form class="form-signin" action="/sample" method="POST">
				<h2 class="form-signin-heading">Send Patient Form</h2>
				
				<div class="form-group">
					<label for="pname">Name</label>
					<input type="text" id="pname" name="pname" class="form-control" value="John Dower" /> 
				</div>

				<div class="form-group">
					<label for="age">Age</label>
					<input type="text" id="age" name="age" class="form-control" value="35"/>
				</div>

				<div class="form-group">
					<label for="Symptom">Symptom</label>
					<input type="text" id="Symptom" name="Symptom" class="form-control" value="Left knee pain while walking."/>
				</div>

				<div class="form-group">
					<label for="address" >Address</label>
					<input type="text" name="address" class="form-control" value="123 Main St. Danbury CT"/><br>
				</div>

				<input type="submit" class="btn btn-success" value="Submit To PDF">
			</form>
```


License
----

MIT


[node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[jQuery]:http://jquery.com
[express]:http://expressjs.com
[Gulp]:http://gulpjs.com
[node-html-pdf]:https://github.com/marcbachmann/node-html-pdf
[Body-Parser]:https://github.com/expressjs/body-parser
[nunjucks]:https://mozilla.github.io/nunjucks/
