$(document).on('ready', function(){
	
	"use strict"; 
	
	$('.open-menu-responsive').on('click', function(){
		$(this).toggleClass('active');
		$('.menu > nav').slideToggle();
	});

	/*================== Location Map Hide/Show =====================*/
    $('.view-location').on("click", function(){
		$('.google-map').addClass('active');
	});
	$('.hide-location').on("click", function(){
		$('.google-map').removeClass('active');
	});

	$("header").on("click",function(e){
	    e.stopPropagation();
	});
	$(".menu-item-has-children > a").on("click",function(){
	    $(this).parent().siblings().children("ul").slideUp();
	    $(this).parent().siblings().removeClass("active");
	    $(this).parent().children("ul").slideToggle();
	    $(this).parent().toggleClass("active");
	    return false;
	}); 

	/*** FIXED Menu APPEARS ON SCROLL DOWN ***/	
	$(window).scroll(function() {    
		var scroll = $(window).scrollTop();
		if (scroll >= 50) {
		$(".stick").addClass("sticky");
		}
		else{
		$(".stick").removeClass("sticky");
		$(".stick").addClass("");
		}
	});	

	/*=================== Parallax ===================*/   
	$('.parallax').scrolly({bgParallax: true});
	
	$('#contactform').submit(function(){
		var action = $(this).attr('action');
		$("#message").slideUp(750,function() {
		$('#message').hide();
 		$('#submit')
			.after('<img src="assets/ajax-loader.gif" class="loader" />')
			.attr('disabled','disabled');
		$.post(action, {
			name: $('#name').val(),
			email: $('#email').val(),
			comments: $('#comments').val(),
		},
			function(data){
				document.getElementById('message').innerHTML = data;
				$('#message').slideDown('slow');
				$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit').removeAttr('disabled');
				if(data.match('success') != null) $('#contactform').slideUp('slow');

			}
		);

		});

		return false;

	});

});


$(window).load(function(){
	"use strict"; 

	$('.page-loading').fadeOut();
	$('html').addClass('done-scroll')
	
});