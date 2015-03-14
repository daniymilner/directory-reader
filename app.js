var app = require('express')();

require('./settings')(app);

app.listen(4000, function(){
	console.log('Express server listening on port 4000');
});