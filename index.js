var express = require('express'),
    app = express(),
    config = require('./server/config'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    fs = require('fs'),
    server = require('https').createServer({
        key: fs.readFileSync('./server/public/privatekey.pem'),
        cert: fs.readFileSync('./server/public/certificate.pem')
    }, app),
    io = require('socket.io').listen(server),
    log = require('./server/logs'),
    routes = require('./server/routes'),
    middle = require('./server/middleware');

require('./server/db/index');

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
middle(app);

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
app.use('/v1', routes);

//==================================
// Angular app
//==================================
app.get('/', function (req, res){

    log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);
    res.sendFile('index.html');

});

server.listen(config.app.port, function (){
    log.info('Server listening on port %d in %s mode', config.app.port, app.get('env'));
});
