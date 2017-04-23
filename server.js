var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');
mongoose.connect('mongodb://nancyh:Rewolf123@ds117899.mlab.com:17899/heroku_xn9ljwr0');

//mongoose.connect('mongodb://localhost/web-dev');
// app.set('view engine', 'ejs');


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require("./test/app.js")(app);


require("./assignment/app.server.js")(app);
// require('textangular/dist/textAngular-sanitize.min')(app);
// require('textAngular')(app);
// require("textAngular")(app);


var port = process.env.PORT || 3000;

// app.listen(port, ipaddress);
app.listen(port);

