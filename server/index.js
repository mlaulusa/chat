var express = require('express'),
    app = express(),
    config = require('./config'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    fs = require('fs'),
    server = require('https').createServer({
        key: fs.readFileSync: './server/public/privatekey.pem',
        cert: fs.readFileSync: './server/public/certificate.pem'
    }),
    io = require('socket.io').listen(server);

require('./logs');
require('./db');

app.use(express.static('app'));
app.use(express.static('server/public'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({
    'extended': true
}));
app.use(bodyParser.json());

//==================================
// Socket io
//==================================


//==================================
// API calls
//==================================
require('./routes');

module.exports = {
    app: app,
    server: server
};
