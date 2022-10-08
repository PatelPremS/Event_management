const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;
const api = require('./routes/api');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// routes
app.use('/api', api);
app.get('/', function(req, res){
    res.send('hello from server');
})

app.listen(PORT, function(){
    console.log('Server running on:' + PORT);
})
module.exports = app;
