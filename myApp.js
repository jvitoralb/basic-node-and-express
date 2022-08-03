let dotenv = require('dotenv').config();
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
    res.json(req.params)
});






























 module.exports = app;
