var gulp = require('gulp'),
	fs = require('fs'),
	path = require('path'),
	dir = require('node-dir'),
	argv = require('minimist')(process.argv.slice(2));

gulp.task('copy', function(cb){
	var information = [];

	function isExistsInfo(name, data){
		return !!information.filter(function(info){
			return info.filename === name && info.data.mode === data.mode && info.data.size === data.size;
		})[0];
	}

	if(argv.path && argv.dest){
		dir.files(argv.path, function(err, files){
			files.forEach(function(filePath){
				var filename = path.basename(filePath),
					info = {
						path: filePath,
						filename: filename
					},
					data = fs.lstatSync(path.join(filePath)),
					destination = path.normalize(info.path).replace(info.filename, '').replace(path.normalize(argv.path), '');
				if(filename[0] !== '.' && !isExistsInfo(filename, data)){
					info['data'] = data;
					information.push(info);
					gulp.src(info.path)
						.pipe(gulp.dest(path.normalize(argv.dest + '/dest' + destination)));
				}
			});
			cb();
		});
	}else{
		cb('Required: --path --dest')
	}
});

gulp.task('find-unique', function(cb){
	var groups = [];
	dir.files(argv.dest, function(err, files){
		files.forEach(function(filePath){
			var item = {
				filePath: filePath,
				buffer: fs.readFileSync(filePath)
			}, isAdded = false;
			for(var i = 0; i < groups.length; i++){
				for(var j = 0; j < groups[i].length; j++){
					if(groups[i][j].buffer.equals(item.buffer)){
						groups[i].push(item);
						isAdded = true;
						break;
					}
				}
			}
			if(!isAdded){
				groups.push([item]);
			}
		});
		groups
			.filter(function(group){
				return group.length > 1;
			})
			.forEach(function(bufferContent, index){
				bufferContent.forEach(function(bufferItem){
					gulp.src(bufferItem.filePath)
						.pipe(gulp.dest(path.normalize(path.join(argv.dest, '../') + '/conflict/' + index)));
				})
			});
		cb();
	});
});

gulp.task('default', ['copy']);

gulp.task('find', ['find-unique']);