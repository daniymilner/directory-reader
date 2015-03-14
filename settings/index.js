var express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');

module.exports = function(app){
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'jade');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, '../public')));

	app.use('/', require('../routes'));

	/*Error handling*/
	app.use(function(err, req, res){
		console.log(err.stack);
		res
			.status(err.status || 500)
			.json({
				message: err.message,
				err: err,
				stack: err.stack
			});
	});
};