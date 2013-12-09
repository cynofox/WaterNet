/* tooltip */
$(function(){
	$('.tip').popover()
});
/* /tooltip */

/* timepicker */
$(function(){
	/* Select all the timepickers and apply the code */
	$('.bootstrap-timepicker input[type=text]').timepicker();
});
/* /timepicker */	

/* Hook all forms and create hidden fields for the types */
$(function() {
	function createHiddenField(key, value) {
		var field = document.createElement('input');
		field.type = 'hidden';
		field.name = key;
		field.value = value;
		return field;
	}	
	for(k in document.forms) {
		var f = document.forms[k];
		if(!f.appendChild) {
			console.log('Skipping ', f);
			continue;
		}
		var fields = $('input,textarea,button', f);
		for(var i = 0; i < fields.length; i++) {
			var field = fields[i];
			if(field.name.substring(0,1) == ':' || field.type == 'hidden' || field.name == '') continue;
			var type = field.type;
			var hiddenField = createHiddenField(':' + field.name, type);
			f.appendChild(hiddenField);
		}
	}
});