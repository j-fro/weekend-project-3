var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var port = process.env.PORT || 3000;

// Set up body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// Expose public folder
app.use(express.static(path.join(__dirname, '../public/')));

// base url
app.get('/', function(req, res) {
    console.log('Hit base url');
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.post('/Add', function(req, res) {
    console.log('adding', req.body.x, req.body.y);
    res.send({
        answer: (Number(req.body.x) + Number(req.body.y))
    });
});

app.post('/Subtract', function(req, res) {
    console.log('subtracting', req.body.x, req.body.y);
    res.send({
        answer: (Number(req.body.x) - Number(req.body.y))
    });
});

app.post('/Divide', function(req, res) {
    console.log('dividing', req.body.x, req.body.y);
    res.send({
        answer: (Number(req.body.x) / Number(req.body.y))
    });
});

app.post('/Multiply', function(req, res) {
    console.log('multiplying', req.body.x, req.body.y);
    res.send({
        answer: (Number(req.body.x) * Number(req.body.y))
    });
});

// Listen on port 3000
app.listen(port, function() {
    console.log('Listening on port', port);
});
