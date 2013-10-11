function setTab(tabName, hash) {
	$('.nav li').removeClass('active',
		function() {
			$('#menu-' + tabName).addClass('active');
		});			
	$('.wn-tab').hide(200).addClass('hidden',
		function() {
			$('#'+tabName).show(200).removeClass('hidden',
			function() {
				if(hash) {
					scrollTo(hash);
				}
			});
		});
}

function scrollTo(hash) {
	location.hash = "#" + hash;
	$(document.body).animate({
		'scrollTop':   $('#' + hash).offset().top
	}, 200);
}