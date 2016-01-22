var router = require('express').Router(),
    message = require('../db/message'),
    log = require('../logs');

//===========================================
// route /message
//===========================================
router.route('')
    .all(function(req, res, next){

        next();
    })

    .get(function(req, res){
        if(!req.query.empty){

            if(req.query.room){

                message.readAllByRoom(req.query.room).then(function(success){

                    res.status(200);
                    res.json(success);

                }, function(error){

                    res.status(401);
                    res.json(error);

                });

            } else if(req.query.username){

                message.readAllByUser(req.query.username).then(function(success){

                    res.status(200);
                    res.json(success);

                }, function(error){

                    res.status(401);
                    res.json(error);

                });

            } else {

                log.warn('There is a query parameter but it does not match any query rules');

            }

        } else {

            message.readAll().then(function(success){

                res.status(200);
                res.json(success);

            }, function(error){

                res.status(401);
                res.json(error)

            });
        }
    })

    .post(function(req, res){

        message.createMessage(req.body.message).then(function(success){

            res.status(200);
            res.json(success);

        }, function(error){

            res.status(401);
            res.json(error);

        });
    })

    .put()

    .delete();

router.route('/:id')
    .all(function(req, res, next){

        next();
    })

    .get(function(req, res){

        message.readByID(req.params.id).then(function(success){

            res.status(200);
            res.json(success);

        }, function(error){

            res.status(401);
            res.json(error);

        });

    })

    .post()

    .put()

    .delete(function(req, res){

        message.deleteByID(id).then(function(success){

            res.status(200);
            res.json(success);

        }, function(error){

            res.status(401);
            res.json(error);

        });
    });

module.exports = router;
