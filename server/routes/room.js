var router = require('express').Router(),
    room = require('../db/room'),
    log = require('../logs');

//=======================================
// Route /room
//=======================================
router.route('')
    .all(function(req, res, next){

        next();
    })

    .get(function(req, res){

        if(!req.query.empty){

            if(req.query.room){

                room.readByRoom(req.query.room).then(function(success){

                    res.status(200);
                    res.json(success);

                }, function(error){

                    res.status(401);
                    res.json(error);

                });
            }

        } else {

            room.readAll().then(function(success){

                res.status(200);
                res.json(success);

            }, function(error){

                res.status(401);
                res.json(error);

            });
        }
    })

    .post(function(req, res){

        room.createRoom(req.body.room).then(function(success){

            res.status(200);
            res.json(success);

        }, function(error){

            res.status(401);
            res.json(error);

        });
    })

    .put(function(req, res){

        room.updatePasswordByRoom(req.query.room, req.body.password).then(function(success){

            res.status(200);
            res.json(success);

        }, function(error){

            res.status(401);
            res.json(error);

        });
    })

    .delete(function(req, res){

        room.deleteByRoom(req.query.room).then(function(success){

            res.status(200);
            res.json(success);

        }, function(error){

            res.status(401);
            res.json(error);

        });
    });

//=======================================
// Route /v1/room/:id
//=======================================
router.route('/:id')
    .all(function(req, res, next){

        next();
    })

    .get(function(req, res){

        room.readByID(req.param.id).then(function(success){

            res.status(200);
            res.json(success);

        }, function(error){

            res.status(401);
            res.json(error);

        });
    })

    .post(function(req, res){

    })

    .put(function(req, res){

        room.updatePasswordByID(req.params.id, req.body.password).then(function(success){

            res.status(200);
            res.json(success);

        }, function(error){

            res.status(401);
            res.json(error);

        });
    })

    .delete(function(req, res){

        room.deleteByID(req.params.id).then(function(success){

            res.status(200);
            res.json(success);

        }, function(error){

            res.status(401);
            res.json(error);

        });
    });

module.exports = router;