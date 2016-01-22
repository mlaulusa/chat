var sqlite3 = require('sqlite3'),
    log = require('../logs');

var setup = function (){

    var db = new sqlite3.Database('server/db/chat.db');
    db.run('PRAGMA foreign_keys = true');
    return db;

};

var closeDatabase = function (err){

    if(err){
        log.debug('Error closing database');
        log.error(err);
    } else {
        log.info('Closing database');
    }

};

module.exports = {

    createMessage: function (message){

        return new Promise(function (resolve, reject){
            var db = setup();

            var statement = ('INSERT INTO messages (message, username, room, date) VALUES ($data)').replace('$data', ('"$values"').replace('$values', Object.keys(message).map(function (key){
                return message[key];
            }).join('", "')));

            db.run(statement, function (err){

                if(err){
                    log.debug('Error at %s', statement);
                    log.error(err);
                    reject(err);
                } else {
                    var msg = ('Inserted "$msg" into database').replace('$msg', message.message);
                    log.info(msg);
                    resolve(msg);
                }

            }).close(closeDatabase());

        });

    } ,

    readAll: function(){

      return new Promise(function(resolve, reject) {

            var db = setup();

            var statement = 'SELECT * FROM messages';

            db.all(statement, function (err, row){

                if(err){

                    log.debug('Error at "$statement"', statement);
                    log.error(err);
                    reject(err);

                } else {
                    resolve(row);
                }

            }).close(closeDatabase());
      });

    },

    readByID: function(id){

        return new Promise(function (resolve, reject){
            var db = setup();

            var statement = ('SELECT * FROM messages WHERE _id = "$data"').replace('$data', id);

            db.get(statement, function (err, data){
                if(err){

                    log.debug('Error at %s', statement);
                    log.error(Error(err));
                    reject(err);

                } else if(data){

                    log.info(('Found message of _id $id').replace('$id', id));
                    resolve(data);

                } else {

                    var msg = ('Message _id of $id not found').replace('$id', id);
                    log.info(msg);
                    reject({status: 404, msg: msg});

                }
            }).close(closeDatabase());
        });
    },

    readAllByRoom: function(room){

        return new Promise(function (resolve, reject){
            var db = setup();

            var statement = ('SELECT * FROM messages WHERE room = "$room"').replace('$room', room);

            db.all(statement, function (err, row){
                if(err){

                    log.debug('Error at "%s"', statement);
                    log.error(err);
                    reject(err);

                } else {
                    resolve(row);
                }
            }).close(closeDatabase());
        });
    },

    readAllByUser: function(user){

        return new Promise(function (resolve, reject){
            var db = setup();

            var statement = ('SELECT * FROM messages WHERE username = "$username"').replace('$username', username);

            db.get(statement, function (err, row){

                if(err){

                    log.debug('Error at "%s"', statement);
                    log.error(err);
                    reject(err);

                } else {
                    resolve(row);
                }
            }.close(closeDatabase()));

        });
    },

    deleteByID: function(id){

      return new Promise(function(resolve, reject) {
        var db = setup();

        var statement = ('DELETE FROM messages WHERE _id = "$id"').replace('$id', id);

        db.exec(statement).close(closeDatabase());
      });
    }

};
