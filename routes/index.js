var router = require('express').Router(),
	controllers = require('../controllers');

router
	.get('/', function(req, res){
		res.render('index');
	})
	.get('/views/*', function(req, res){
		var path = req.url.replace(/^\/views\//, '');
		res.render(path);
	})
	.post('/get-unique-files', controllers.getUniqueFiles);

module.exports = router;
