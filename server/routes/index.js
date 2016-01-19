var message = require('./message'),
    user = require('./user'),
    room = require('./room'),
    router = require('express').Router();

router.all('/api');

router.route('/room', room);
router.route('/user', user);
router.route('/message', message);

router.route('*', function(req, res){

    res.status(200);
    res.sendFile('index.html');

});

module.exports = router;