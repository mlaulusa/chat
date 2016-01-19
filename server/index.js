var express = require('express'),
    app = express(),
    config = require('./config'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    fs = require('fs'),
    server = require('https').createServer({
        key: fs.readFileSync('./server/public/privatekey.pem'),
        cert: fs.readFileSync('./server/public/certificate.pem')
    }, app),
    io = require('socket.io').listen(server);

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
io.on('connection', function (socket){
    console.log('A user joined');

    socket.on('disconnect', function (){
        console.log('User disconnected');
        socket.emit('event', 'User disconnected');
    });

    socket.on('message', function (message){
        io.sockets.emit('broadcast', message);
    });
});

//==================================
// API calls
//==================================
app.use(require('./routes'));

app.get('*', function(req, res){

    res.status(200);
    res.sendFile('index.html');

});

module.exports = {
    app: app,
    server: server
};
