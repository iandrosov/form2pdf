var pdf = require('html-pdf');
var appmodule = require('./app');
var report_options =
{
    "format": "Letter",
    "border": {
        "top": "0.5in",
        "right": "1in",
        "bottom": "0in",
        "left": "1in"
    },
    "footer": {
        "contents": '<span style="color: #444;">Page {{page}}</span>/<span>{{pages}}</span>'
    }
};

exports.printformpdf = function (req, res) {
    var today = new Date();
    var obj = {
        date: today,
        data: req.body
    };

    var renderedHtml =  appmodule.env.render('medic.form.tmpl.html',obj);
    pdf.create(renderedHtml,report_options).toStream(function(err, stream){
        console.log(stream);
        stream.pipe(res);
    });
};