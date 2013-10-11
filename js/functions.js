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