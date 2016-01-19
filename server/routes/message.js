var router = require('express').Router(),
    log = require('../logs');

//=====================================
// Route /message
//=====================================
router.route('')
.get(function(req, res){

    log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

})
.post(function(req, res){

    log.info('[%s] %s POST %s', req.ip, req.protocol, req.path);

})
.put(function(req, res){

    log.info('[%s] %s PUT %s', req.ip, req.protocol, req.path);

})
delete(function(req, res){

    log.info('[%s] %s DELETE %s', req.ip, req.protocol, req.path);

});

//=====================================
// Route /message/:id
//=====================================
router.route('/:id')
.get(function(req, res){

    log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

})
.post(function(req, res){

    log.info('[%s] %s POST %s', req.ip, req.protocol, req.path);

})
.put(function(req, res){

    log.info('[%s] %s PUT %s', req.ip, req.protocol, req.path);

})
delete(function(req, res){

    log.info('[%s] %s DELETE %s', req.ip, req.protocol, req.path);

});

//=====================================
// Route /message/:id
//=====================================
router.route('')
.get(function(req, res){

    log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

})
.post(function(req, res){

    log.info('[%s] %s POST %s', req.ip, req.protocol, req.path);

})
.put(function(req, res){

    log.info('[%s] %s PUT %s', req.ip, req.protocol, req.path);

})
delete(function(req, res){

    log.info('[%s] %s DELETE %s', req.ip, req.protocol, req.path);

});
