var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var port = process.env.PORT || 3000;

// Set up body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Expose public folder
app.use(express.static(path.join(__dirname, '../public')));

// Listen on port 3000
app.listen(port, function() {
    console.log('Listening on port', port);
});
