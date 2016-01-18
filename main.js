var config = require('./server/config'),
    app = require('./server').app,
    server = require('./server').server;

server.listen(config.app.port, function(){
  console.log('Server listening on port %d in %s mode', config.app.port, app.get('env'));
});
