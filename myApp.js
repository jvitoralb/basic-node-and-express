let dotenv = require('dotenv').config();
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

console.log('Hello World');

app.get('/', (req, res) => {
    let absolutePath = `${__dirname}/views/index.html`;
    res.sendFile(absolutePath);
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
    const message = {"message": "Hello json"};

    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message["message"] = message["message"].toLocaleUpperCase();
    }
    res.json(message);
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({"time": req.time});
});

app.get('/:word/echo', (req, res) => {
    res.json({"echo": req.params.word});
});

let mdwareURLParser = bodyParser.urlencoded({extended: false})

app.route('/name').all((req) => {
    mdwareURLParser(req);
}).get((req, res) => {
    let firstName = req.query.first;
    let lastName = req.query.last;
    res.json({"name": `${firstName} ${lastName}`});
});


























 module.exports = app;
