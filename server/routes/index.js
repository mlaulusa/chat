var router = require('express').Router(),
    message = require('./message'),
    room = require('./room'),
    user = require('./user');

router.use('/message', message);
router.use('/room', room);
router.use('/user', user);

module.exports = router;

