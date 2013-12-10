var builder = require('../builder.js');

function defaultHandler(name, url, object) {
	if(typeof object == 'undefined') {
		object = {}
	}
	if(typeof url == 'undefined') {
		url = '/' + name;
	}
	object[name] = function(req, res) {
		res.render(name, builder.buildPage(name, req));
	};
	object[name].url = url;
	if(typeof object['defaultHandler'] != 'function') {
		object.defaultHandler = function(name, url) {
			return defaultHandler(name, url, this);
		}
	}
	if(typeof object['finish'] != 'function') {
		object.finish = function() {
			delete this.finish;
			delete this.defaultHandler;			
			return this;
		}
	}
	return object;
}

module.exports = defaultHandler('index', '/').defaultHandler('programs')
		.defaultHandler('manual').defaultHandler('zones')
		.defaultHandler('logs').defaultHandler('help').defaultHandler('settings').finish();