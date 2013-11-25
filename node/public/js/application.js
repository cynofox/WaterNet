/* tooltip */
$(function(){
	$('.tip').popover()
});
/* /tooltip */

/*
bootstrap_alert = function() {}
bootstrap_alert.warning = function(message) {
	$('#programmeAddZonePlaceholder').html('<div class="alert"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
}

$('#programmeAddZone').on('click', function() {
	bootstrap_alert.warning('Your text goes here');
});


function addProgramme()
{
	var p1=unescape("%3Cdiv%20class%3D%22panel-heading%20accordion-toggle%22%20data-toggle%3D%22collapse%22%20data-parent%3D%22%23accordion%22%20href%3D%22%23program1%22%3E%0A%09%3Ch4%20class%3D%22panel-title%22%3EProgram%201%20%3Cspan%20class%3D%22label%20label-danger%22%3EOff%3C%2Fspan%3E%3C%2Fh4%3E%0A%3C%2Fdiv%3E%0A%3Cdiv%20id%3D%22program1%22%20class%3D%22panel-collapse%20collapse%22%3E%0A%09%3Cdiv%20class%3D%22panel-body%22%3E%0A%09%09%3Cdiv%20class%3D%22row%22%3E%0A%09%09%09%3Cdiv%20class%3D%22col-xs-12%20col-sm-12%20col-md-6%22%3E%0A%09%09%09%09%3Cinput%20type%3D%22text%22%20id%3D%22program1Name%22%20class%3D%22form-control%22%20placeholder%3D%22Enter%20program%20name%22%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%09%3Cdiv%20class%3D%22col-xs-12%20col-sm-12%20col-md-3%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22make-switch%22%20data-on-label%3D%22%3Cstrong%3EOn%3C%2Fstrong%3E%22%20data-off-label%3D%22%3Cstrong%3EOff%3C%2Fstrong%3E%22%3E%0A%09%09%09%09%09%3Cinput%20type%3D%22checkbox%22%20id%3D%22zone1OnOff%22%3E%0A%09%09%09%09%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%09%3Cdiv%20class%3D%22col-xs-12%20col-sm-12%20col-md-3%22%3E%0A%09%09%09%09%3Cbutton%20type%3D%22button%22%20class%3D%22btn%20btn-danger%20pull-right%20tip%22%20data-container%3D%22body%22%20data-toggle%3D%22popover%22%20data-placement%3D%22auto%20top%22%20data-trigger%3D%22hover%22%20data-animation%3D%22true%22%20data-content%3D%22Do%20you%20want%20this%20to%20delete%20this%20program.%22%3E%3Cspan%20class%3D%22glyphicon%20glyphicon-remove%22%3E%3C%2Fspan%3E%3C%2Fbutton%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%09%0A%09%09%3C%2Fdiv%3E%0A%09%09%0A%09%09%3Cbutton%20%20class%3D%22btn%20btn-success%22%20onclick%3D%22appendText()%22%3E%3Cspan%20class%3D%22glyphicon%20glyphicon-plus%22%3E%3C%2Fspan%3E%20Add%20zone%3C%2Fbutton%3E%0A%09%09%3Cdiv%20class%3D%22p1z1%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%3C%2Fdiv%3E");        	
	$("div.p1").append(p1);    
}
function addZone()
{
	var p1z1="<p>zone stuff.</p>";    
	$("div.p1z1").append(p1z1);     
}*/

/* timepicker */
$(function(){
	
	$('#timepicker1').timepicker();
	$('#timepicker2').timepicker();
	$('#timepicker3').timepicker();
	$('#timepicker4').timepicker();
});
/* /timepicker */	