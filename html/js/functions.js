function setTab(tabName, hash) {
	$('.nav li').removeClass('active',
		function() {
			$('#menu-' + tabName).addClass('active');
		});			
	$('.wn-tab').hide(200).addClass('hidden',
		function() {
			$('#'+tabName).removeClass('hidden').show(200,
			function() {
				if(hash) {
					scrollTo(hash);
				}
			});
		});
}

function scrollTo(hash) {
	$(document.body).animate({
		'scrollTop':   $('#' + hash).offset().top
	}, 500);
}

function scrollToTop() {
	$(document.body).animate({
		'scrollTop':0
	}, 500);
}

function Zone( zoneName, zoneStatusMessage, zoneProgress ) {
	this.name = zoneName;
	this.status = zoneStatusMessage;
	this.progress = zoneProgress;
}

Zone.prototype.getName = function() {
	return this.name;
}

Zone.prototype.getStatus = function() {
	return this.status;
}

Zone.prototype.getProgress = function() {
	return this.progress;
}

var database = {}

function updateZoneGUI() {
	
}

function updateZones() {
	database.zones = []
	database.zones[0] = new Zone('Garden', 'completed', 100);
	database.zones[1] = new Zone('Crops', 'running', 40);
	updateZoneGUI();
}