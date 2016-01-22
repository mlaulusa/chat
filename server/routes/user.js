var router = require('express').Router(),
    log = require('../logs');

//=======================================
// Route /user
//=======================================
router.route('')
    .all(function(req, res, next){
        next();
    })
    .get(function (req, res){

    })
    .post(function (req, res){

    })
    .put(function (req, res){

    })
    .delete(function (req, res){

    });

module.exports = router;
