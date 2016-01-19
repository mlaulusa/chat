var config = require('./server/config'),
    app = require('./server').app,
    server = require('./server').server,
    log = require('./server/logs');

server.listen(config.app.port, function (){
    log.info('Server listening on port %d in %s mode', config.app.port, app.get('env'));
});
