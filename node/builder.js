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
	},
	/*{
		name: 'Outside Vege Garden',
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
	}*/
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
	if(pageName == 'zones') {
		if(request.body.formAction == 'save') {
			for(var i = 0; i < database.zones.length; i++) {
				var twigIndex = i + 1;
				if(typeof request.body['zone' + twigIndex + 'Name'] == 'string') {
					var newName = request.body['zone' + twigIndex + 'Name'];
					if(newName != '') {
						database.zones[i].name = newName;
					}
				}
				if(typeof request.body['zone' + twigIndex + 'Enabled'] == 'string') {
					if(request.body['zone' + twigIndex + 'Enabled'] == 'true') {
						database.zones[i].enabled = true;
						}else {
						database.zones[i].enabled = false;
					}
				}
				if(typeof request.body['zone' + twigIndex + 'Rain'] == 'string') {
					if(request.body['zone' + twigIndex + 'Rain'] == 'true') {
						database.zones[i].rainSensor = true;
						}else {
						database.zones[i].rainSensor = false;
					}
				}
				if(typeof request.body['zone' + twigIndex + 'Notes'] == 'string') {
					database.zones[i].notes = request.body['zone' + twigIndex + 'Notes'];
				}
			}
		}
	}
	else if(pageName == 'programs') {
		if(request.body.formAction == 'add') {
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
		else if(request.body.formAction == 'save') {
			
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