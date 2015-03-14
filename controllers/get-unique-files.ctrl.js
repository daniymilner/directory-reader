var fs = require('fs'),
	path = require('path'),
	dir = require('node-dir');

module.exports = function(req, res, next){
	var pathDirectory = req.body.path,
		information = [];

	function isExistsInfo(name, data){
		return !!information.filter(function(info){
			return info.filename === name && info.data.mode === data.mode && info.data.size === data.size;
		})[0];
	}

	dir.files(pathDirectory, function(err, files){
		files.forEach(function(filePath){
			var filename = path.basename(filePath),
				info = {
					path: filePath,
					filename: filename
				},
				data = fs.lstatSync(path.join(filePath));
			if (filename[0] !== '.' && !isExistsInfo(filename, data)){
				info['data'] = data;
				information.push(info);
			}
		});
		res.json(information);
	});

};