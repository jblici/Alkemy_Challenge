const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

require('./db');
const server = express();

server.name = 'API';
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use('/', routes);

//Error catching
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
})

module.exports = server