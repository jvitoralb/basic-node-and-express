let dotenv = require('dotenv').config();
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});


app.use(bodyParser.urlencoded({extended: false}))


console.log('Hello World');


app.get('/', (req, res) => {
    let absolutePath = `${__dirname}/views/index.html`;
    res.sendFile(absolutePath);
});


app.use('/public', express.static(__dirname + '/public'));


app.get('/json', (req, res) => {
    const message = {message: "Hello json"};

    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message["message"] = message["message"].toLocaleUpperCase();
    }
    res.json(message);
});


app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({time: req.time});
});


app.get('/:word/echo', (req, res) => {
    res.json({echo: req.params.word});
});


app.route('/name').get((req, res) => {
    let firstName = req.query.first;
    let lastName = req.query.last;
    res.json({name: `${firstName} ${lastName}`});
}).post((req, res) => {
    res.json({name: `${req.body.first} ${req.body.last}`});
});











 module.exports = app;
