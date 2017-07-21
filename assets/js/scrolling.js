"use strict";
$(document).ready(function(){
    
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $(target).offset().top - 71
	    }, 1800, 'swing', function () {
	    });
        if($('body').hasClass('body-screencap')){
            toggleresponsivemenu();
        }
	});
});