var router = require('express').Router(),
    user = require('../db/user'),
    log = require('../logs');

//=======================================
// Route /user
//=======================================
router.route('')
    .all(function(req, res, next){
        next();
    })

    .get(function (req, res){

      if(!req.query.empty){

          if(req.query.username){

            user.readByUsername(req.query.username).then(function(success){

              res.status(200);
              res.json(success);

            }, function(error){

              res.status(401);
              res.json(error);

            });
          }

      } else {

        user.readAll().then(function(success){

            res.status(200);
            res.json(success);

        }, function(error){

            res.status(401);
            res.json(error);

        });
      }
    })

    .post(function (req, res){

      user.createUser(req.body.user).then(function(success){

        res.status(200);
        res.json(success);

      }, function(error){

        res.status(401);
        res.json(error);

      });

    })

    .put(function (req, res){

    })

    .delete(function (req, res){

      user.deleteByUsername(req.body.username).then(function(success){

        res.status(200);
        res.json(success);

      }, function(error){

        res.status(200);
        res.json(error);

      });
    });

//=======================================
// Route /user/:id
//=======================================
router.route('/:id')
    .all(function(req, res, next){
        next();
    })

    .get(function (req, res){

      user.readByID(req.params.id).then(function(success){

        res.status(200);
        res.json(success);

      }, function(error){

        res.status(401);
        res.json(error);

      });
    })

    .post(function (req, res){

    })

    .put(function (req, res){

    })

    .delete(function (req, res){

      user.deleteByID(req.params.id).then(function(success){

        res.status(200);
        res.json(success);

      }, function(error){

        res.status(401);
        res.json(error);

      });

    });

module.exports = router;
