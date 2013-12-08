var _ = require('lodash');
var SStorage = require('./simple_storage').SStorage;
var databaseLoader = new SStorage('data/');

/* Default database when no database exists */
var defaultDB = {
	settings : {
		expansions: 0,
		allowConcurrentPrograms: false
	},
	zones : [
	{
		name: 'Garden', 
		enabled: true,
		rainSensor: false,
		notes: 'Notes will be here' 
	},
	{
		name: 'Other zone', 
		enabled: false,
		rainSensor: false,
		notes: 'Notes will be here' 
	}
	],
	programs: [
	{
		name: 'Tunnel House',
		schedule: [ {
			startTime: 0000,
			duration: 0000,
			daysEnabled: {
				'monday': true,
				'tuesday': true,
				'wednesday': false,
				'thursday': true,
				'friday': true,
				'saturday': true,						
				'sunday': true,
			}
		} ],
		zones: [ 0, 1 ],
		enabled: false			
	}
	]
	
};
var database;
databaseLoader.load('database', function(data) {
	database = data;
	if(database === false) {
		database = defaultDB;
	}
	databaseLoader.save('database', database);
});

/**
	* Core data that applies to all pages
*/
function getBaseData(pageName) {
	return { title: 'WaterNet Alpha V0.0.2',
		pageKey: pageName,
	state: database };
}

function applyPageToDatabase(pageName, data) {
	function escapeRegExp(string){
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	function camelCase(input) {
		return input.substring(0,1).toLowerCase() + input.substring(1);
	}
	function processValue(v,c,k) {
		if(typeof v !== 'string') return c;
		/* Unknown side-effects */
		if(v === 'true') return true;
		if(v === 'false') return false;
		/* If the key is name and the value is empty, don't change it */
		if((v == null || v == undefined || v.length == 0) && k == 'name') {
			return c
		}
		return v;
	}
	var objPrefix = pageName;
	if(objPrefix.indexOf('s', this.length - 1) !== -1) {
		objPrefix = objPrefix.substring(0, objPrefix.length -1);
	}
	var regExp = new RegExp(escapeRegExp(objPrefix) + "s{0,1}([\\d]+)([a-zA-Z]+)");
	_.forIn(data, function(value, key) {
		if(regExp.test(key)) {
			var match = key.match(regExp);
			var index = parseInt(match[1]) - 1;
			var name = camelCase(match[2]);
			console.log('Applying Page', pageName,index,name,value);
			database[pageName][index][name] = processValue(value, database[pageName][index][name], name);
		}
	});
}

/**
	*
*/
function getMenu(pageName) {
	return [
	{ key: 'index', data : { name: 'Home', url : '/' } },
	{ key: 'programs', data : { name: 'Programs', url : '/programs' } },
	{ key: 'manual', data : { name: 'Manual', url : '/manual' } },
	{ key: 'logs', data : { name: 'Logs', url : '/logs' } }	
	];
}
function getMenuDDSettings1(pageName) {
	return [
	{ key: 'zones', data : { name: 'Zones', url : '/zones' } }		
	];
}
function getMenuDDSettings2(pageName) {
	return [
	{ key: 'index', data : { name: 'home', url : '/' } }		
	];
}

function processPost(pageName, request) {
	console.log('Processing', pageName, request.body);
	if(request.body.formAction == 'save') {		
		applyPageToDatabase(pageName, request.body);
	} else if(request.body.formAction == 'add') {
		if(pageName == 'zones') {
			database.zones.push( {
				name: 'New Zone', 
				enabled: false,
				rainSensor: false,
				notes: '' 
			});			
		}else if(pageName == 'programs') {
			database.programs.push( {
				name: 'New Program',
				schedule: [ {
					startTime: 0000,
					duration: 0000,
					daysEnabled: {
						'monday': true,
						'tuesday': true,
						'wednesday': true,
						'thursday': true,
						'friday': true,
						'saturday': true,						
						'sunday': true,
					}
				} ],
				zones: [ 0, 1 ],
				enabled: false	
			});
		}
	}	
}


/**
	* Builds the data object to send to the template engine
*/
exports.buildPage = function(pageName, request) {
	processPost(pageName, request);
	/* After processing, save the database */
	databaseLoader.save('database', database);
	return _.assign(getBaseData(pageName), {'menu': getMenu(pageName) }, {'menuSettings1': getMenuDDSettings1(pageName) }, {'menuSettings2': getMenuDDSettings2(pageName) });
}