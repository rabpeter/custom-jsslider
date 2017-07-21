jQuery(document).on('ready', function(){
	
	"use strict"; 

	$('#toggle-widget .content').hide();
		$('#toggle-widget h2:first').addClass('active').next().slideDown('slow');
			$('#toggle-widget h2').on("click", function(){
			if($(this).next().is(':hidden')) {
			$('#toggle-widget h2').removeClass('active').next().slideUp('slow');
			$(this).toggleClass('active').next().slideDown('slow');
		}
	});
	
});