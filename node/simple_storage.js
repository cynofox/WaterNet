var crypto = require('crypto');
var md5Sum = crypto.createHash('md5');
var fs = require('fs');
var path = require('path');

function SStorage(path) {
	if(typeof(path) !== 'string') {
		throw 'Expected string for path';
	}
	this.path = path;
}

function SStorage.prototype.load(id) {
	if(typeof(id) !== 'string') {
		throw 'Expected string for id';
	}
	id = id.toLowerCase();
	md5Sum.update(id, 'utf8');
	var name = md5Sum.digest('hex');
	
}

function SStorage.prototype.store(id, object) {	
	if(typeof(id) !== 'string') {
		throw 'Expected string for id';
	}
	id = id.toLowerCase();
	md5Sum.update(id, 'utf8');
	var name = md5Sum.digest('hex');
	var data = btoa(JSON.stringify(object));
	var file = path.join(this.path, name + '.dat');
	fs.writeFileSync(file, data, function(err) {
		if(err) {
			console.log(error);
			return false;
		}
		return true;
	});
}

module.exports = {
	SStorage:SStorage
};