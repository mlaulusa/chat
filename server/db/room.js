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

  createRoom: function(room){

    return new Promise(function (resolve, reject){

        var db = setup(),
            statement = ('INSERT INTO rooms (room, created_on, password, created_by) VALUES ($data)').replace('$data', ('"$value"').replace('$value', Object.keys(room).map(function (key){
                return room[key];
            }).join('", "')));

        db.run(statement, function (err){
            if(err){

                log.debug('Error at %s', statement);
                log.error(err);
                reject(err);

            } else {

                var msg = ('Inserted $msg into database').replace('$msg', room.room);
                log.info(msg);
                resolve(msg);

            }
        }).close(closeDatabase());
    });
  },

  readAll: function(){

    return new Promise(function (resolve, reject){

        var db = setup(),
            statement = 'SELECT * FROM rooms';

        db.all(statement, function (err, row){
            if(err){

                log.debug('Error at %s', statement);
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

          var db = setup(),
              statement = ('SELECT * FROM rooms WHERE _id = "$id"').replace('$id', id);

          db.get(statement, function (err, row){
              if(err){

                  log.debug('Error at %s', statement);
                  log.error(err);
                  reject(err);

              } else {
                  resolve(row);
              }
          }).close(closeDatabase());
      });
  },

  readByRoom: function(room){

      return new Promise(function (resolve, reject){

          var db = setup(),
              statement = ('SELECT * FROM rooms WHERE room = "$room"').replace('$room', room);

          db.get(statement, function (err, row){
              if(err){

                  log.debug('Error at %s', statement);
                  log.error(err);
                  reject(err);

              } else {
                  resolve(row);
              }
          }).close(closeDatabase());
      });
  },

  updatePasswordByID: function(id, password){

      return new Promise(function (resolve, reject){

          var db = setup(),
              statement = ('UPDATE rooms SET password = "$password" WHERE _id = "$id"').replace('$password', password).replace('$id', id);

          db.run(statement, function (err){
              if(err){

                  log.debug('Error at %s', statement);
                  log.error(err);
                  reject(err);

              } else {

                  var msg = ('$id was updated').replace('$id', id);
                  log.info(msg);
                  resolve(msg);

              }
          }).close(closeDatabase());
      });
  },

  updatePasswordByRoom: function(room, password){

      return new Promise(function (resolve, reject){

          var db = setup(),
              statement = ('UPDATE rooms SET password = "$password" WHERE _id = "$id"').replace('$password', password).replace('$id', id);

          db.run(statement, function (err){
              if(err){

                  log.debug('Error at %s', statement);
                  log.error(err);
                  reject(err);

              } else {

                  var msg = ('$room was updated').replace('$room', room);
                  log.info(msg);
                  resolve(msg);

              }
          }).close(closeDatabase());
      });
  },

  deleteByRoom: function(room){

      return new Promise(function (resolve, reject){

          var db = setup(),
              statement = ('DELETE FROM rooms WHERE room = "$room"').replace('$room', room);

          db.run(statement, function (err){
              if(err){

                  log.debug('Error at %s', statement);
                  log.error(err);
                  reject(err);

              } else {

                  var msg = ('$room was deleted').replace('$room', room);
                  log.info(msg);
                  resolve(msg);

              }
          }).close(closeDatabase());
      });
  },

  deleteByID: function(id){

      return new Promise(function (resolve, reject){

          var db = setup(),
              statement = ('DELETE FROM rooms WHERE _id = "$id"').replace('$id', id);

          db.run(statement, function (err){
              if(err){

                  log.debug('Error at %s', statement);
                  log.error(err);
                  reject(err);

              } else {

                  var msg = ('$id was deleted').replace('$id', id);
                  log.info(msg);
                  resolve(msg);

              }
          }).close(closeDatabase());
      });
  }
};
