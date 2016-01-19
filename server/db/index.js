var fs = require('fs'),
    log = require('../logs'),
    sqlite3 = ('sqlite3'),
    database = 'server/db/chat.db';

try {

    fs.accessSync(process.cwd() + '/' + database, fs.F_OK);
    log.info('SQLite3 database already created');

} catch (err){

    log.warn(err);
    log.info('Creating SQLite3 database file');

    fs.writeFileSync(database, '');

    var db = new sqlite3.Database(database);

    db.serialize(function (){

        log.info('Creating SQLite3 tables');

        db.run('CREATE TABLE messages (_id INTEGER PRIMARY KEY, username TEXT NOT NULL, message TEXT NOT NULL, room TEXT NOT NULL, date BLOB NOT NULL, FOREIGN KEY (username) REFERENCES users (username), FOREIGN KEY (room) REFERENCES rooms (room))');
        db.run('CREATE TABLE users (_id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, password BLOB NOT NULL, created_on BLOB NOT NULL)');
        db.run('CREATE TABLE rooms (_id INTEGER PRIMARY KEY, room TEXT NOT NULL UNIQUE, created_on BLOB NOT NULL, created_by TEXT, password BLOB, FOREIGN KEY (created_by) REFERENCES users (username))');

    }).close(function (err){

        if(err){
            log.debug('Error closing database');
            log.error(err);
        } else {
            log.info('Closing database');
        }

    });
}
