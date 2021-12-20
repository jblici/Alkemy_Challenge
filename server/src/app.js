const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cors = require('cors');

require('./db');
const server = express();

server.use(cors())
server.use(express.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());
server.use('/', routes);

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//Error catching
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
})

module.exports = server