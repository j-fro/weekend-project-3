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
app.use(express.static(path.join(__dirname, '../public')));

// base url
app.get('/', function(req, res) {
    console.log('Hit base url');
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.post('/', function(req, res) {
    console.log('Hit calc post with req.body', req.body);
    var answer = calculate(req.body.x, req.body.y, req.body.type);
    res.send({
        answer: answer
    });
});

// Listen on port 3000
app.listen(port, function() {
    console.log('Listening on port', port);
});

function calculate(x, y, operation) {
    console.log('Calculating:', x, operation, y);
    switch (operation) {
        case 'Add':
            return Number(x) + Number(y);
        case 'Subtract':
            return Number(x) - Number(y);
        case 'Multiply':
            return Number(x) * Number(y);
        case 'Divide':
            return Number(x) / Number(y);
    }
}
