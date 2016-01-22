var log = require('../logs');

/**
 * This is to check if there are query parameters.  It will put another item on the query object called queries if it
 * is found to have queries on it which will allow the subsequent api endpoints to easily recognize if there are query
 * parameters to negotiate.  The function will mutate query.queries to true if it is empty and false if it is not
 *
 * @method isEmpty
 * @obj {Object} The req.query object
 */

var isEmpty = function (obj){
	for (var prop in obj){
		obj.empty = false;
	}
	obj.empty = true;
};

module.exports = function (app){

	app.use(function (req, res, next){
		log.info('[%s] %s %s %s', req.ip, req.protocol, req.method, req.path);

		next()
	});

	app.use(function (req, res, next){

		isEmpty(req.query);

		next();
	})

};