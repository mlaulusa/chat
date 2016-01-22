var router = require('express').Router(),
    message = require('./message'),
    room = require('./room'),
    user = require('./user'),
    authenticate = require('../db/user');

router.post('/signin', function(req, res){
  authenticate.authenticate(req.body.user).then(function(success){

    res.status(200);
    res.json(success);

  }, function(error){

    res.status(401);
    res.json(error);

  });
});
router.use('/message', message);
router.use('/room', room);
router.use('/user', user);

module.exports = router;
