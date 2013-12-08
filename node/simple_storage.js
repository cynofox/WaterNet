var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

function SStorage(path) {
	if(typeof(path) !== 'string') {
		throw 'Expected string for path';
	}
	this.path = path;
}

SStorage.prototype.load = function(id, callback) {
	if(typeof(id) !== 'string') {
		throw 'Expected string for id';
	}
	id = id.toLowerCase();
	var md5Sum = crypto.createHash('md5');
	md5Sum.update(id, 'utf8');
	var name = md5Sum.digest('hex');
	var file = path.join(this.path, name + '.dat');
	if(fs.existsSync(file)) {
		var data = fs.readFileSync(file, {encoding: 'utf8'});
		var decoded = JSON.parse(new Buffer(data, 'base64').toString());
		console.log('Loaded', id, 'successfully');
		callback(decoded);
	} else {
		console.log(file, 'has not been created yet');
		callback(false);
	}
}

SStorage.prototype.save = function(id, o) {	
	if(typeof(id) !== 'string') {
		throw 'Expected string for id';
	}
	id = id.toLowerCase();
	var md5Sum = crypto.createHash('md5');
	md5Sum.update(id, 'utf8');
	var name = md5Sum.digest('hex');
	var content = JSON.stringify(o);
	var data = new Buffer(content).toString('base64');
	var file = path.join(this.path, name + '.dat');
	var directory = path.dirname(file);
	if(!fs.existsSync(directory)) {
		fs.mkdirSync(directory);
	}
	fs.writeFileSync(file, data, 'utf8');	
	console.log('Saved', id, 'successfully');
}

module.exports = {
	SStorage:SStorage
};