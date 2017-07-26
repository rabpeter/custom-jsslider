/*!
 * Scripts
 */
head.ready(function() {
	(function(globals){
		"use strict";
		globals.GLOB = {};
	}( (1,eval)('this') ));
	var $ = jQuery.noConflict();
	var 
		html_tag = $('html'),
		body_tag = $('body'),
		root = $('#root'),
		top_tag = $('#top'),
		content_tag = $('#content'),
		footer_tag = $('#footer'),
		
		a_tag = $('a'),
		article_tag = $('article'),
		figure_tag = $('figure'),
		first_item = $(':first'),
		first_child = $(':first-child'),
		form_tag = $('form'),
		header_tag = $('header'),
		heading_tag = $(':header'),
		img_tag = $('img'),
		last_item = $(':last'),
		last_child = $(':last-child'),
		li_tag = $('li'),
		p_tag = $('p'),
		ul_tag = $('ul'),
		submit_tag = $('button, input[type="button"], input[type="reset"], input[type="submit"]'),
		
		about = $('.about'),
		date = $('.date'),
		double = $('.double'),
		form_a = $('.form-a'),
		image_b = $('.image-b'),
		image_frame = $('.image-frame'),
		inner = $('.inner'),
		intro_wide = $('.intro-wide'),
		intro = $('.intro'),
		news = $('.news'),
		project_header = $('.project-header'),
		success = $('.success'),
		
		error_item = 'error-item',
		show_miziajs = 'show-miziajs',
		success_class = '.success',
		
		dot_line = '<div class="dot"></div><div class="line"></div>',
		frames_ab = '<div class="frame a"></div><div class="frame b"></div>',
		frames_cd = '<div class="frame c"></div><div class="frame d"></div>',
		fit_span = '<span class="fit"></span>',
		inner_div = '<div class="inner"></div>',
		inner_span = '<span class="inner"></span>',
		miziajs_div = '<div class="miziajs"><div class="miziajs clone"><div class="miziajs clone bg"><div class="frame a"></div><div class="frame b"></div><div class="frame c"></div><div class="frame d"></div><div class="frame e"></div><div class="frame f"></div></div><div class="frame a"></div><div class="frame b"></div><div class="frame c"></div><div class="frame d"></div><div class="frame e"></div><div class="frame f"></div></div><div class="miziajs bg"><div class="miziajs clone"><div class="frame a"></div><div class="frame b"></div><div class="frame c"></div><div class="frame d"></div><div class="frame e"></div><div class="frame f"></div></div><div class="frame a"></div><div class="frame b"></div><div class="frame c"></div><div class="frame d"></div><div class="frame e"></div><div class="frame f"></div></div><div class="frame a"></div><div class="frame b"></div><div class="frame c"></div><div class="frame d"></div><div class="frame e"></div><div class="frame f"></div></div>',
		miziajs_bottom = '<div class="miziajs bottom"><div class="frame a"></div><div class="frame b"></div><div class="frame c"></div><div class="frame d"></div><div class="frame e"></div><div class="frame f"></div></div>',
		desktoponly = '.desktop-only',
		mobilehide = 'mobile-hide',
		mobileonly = 'mobile-only',
		miziajs = $('.miziajs')
	;
	var Default = {
		utils : {
			links : function(){
				root.append('<a class="totop" href="#root">Scroll to top</a>');
				top_tag.find(ul_tag).find(a_tag).add(footer_tag.find(ul_tag).find(a_tag)).add('a.totop').removeAttr('rel').on('click',function(){ $(this).addClass('click').delay(500).queue(function(next){ $(this).removeClass('click'); next(); }); });
				$('a[rel*=external]').on('click',function(e){
					e.preventDefault();
					window.open($(this).attr('href'));						  
				});
				$('a:not([href^="#"],[rel="external"],[href$="jpg"],[href$="gif"],[href$="png"],[href$="JPG"],[href$="GIF"],[href$="PNG"],.totop)').addClass('internal');
				body_tag.on('click','a.internal',function(){ html_tag.addClass('clicked'); });
				top_tag.find(ul_tag).find(a_tag).add(footer_tag.find(ul_tag).find(a_tag)).add('a.email, a[href^="#"]').removeClass('internal');
			},
			mails : function(){
				$('.email:not(:input, div)').each(function(index){
					em = $(this).text().replace('//','@').replace(/\//g,'.');
					$(this).text(em).attr('href','mailto:'+em);
				});
			},
			forms : function(){
				form_a.find('label:not(.hidden) + :input:not(select,button)').each(function(){ if($(this).val() !== ''){ $(this).parent().addClass('focus'); } }).on('focus',function(){
					$(this).parent().addClass('focus');
				}).on('blur',function(){
					if($(this).val() === ''){ $(this).parent().removeClass('focus'); }
				});
				
				$('textarea').textareaAutoSize();
				
				form_a.each(function(){
					$(this).validate({
						highlight: function(element) { $(element).parent().addClass(error_item).append('<span class="notification"></span>'); },
						unhighlight: function(element) { $(element).parent().removeClass(error_item).children('.notification').remove(); },
						onfocusout: function (element) { $(element).valid(); },
						submitHandler: function(form) { 
							$.ajax({
								url: 'includes/pcf.php',
								type: 'POST',
								dataType: 'json',
								data: {'ca':$('#ca').val(),'cb':$('#cb').val(),'cc':$('#cc').val()},
								success: function(d){
									if(d.status == 'ok'){
										$(form).addClass('submitted');
										ob = $(form).find(success_class).find('.inner .typing');
										ob.parents(success_class).addClass(show_miziajs);
										ob.typed({ stringsElement: $('.success .hidden'), typeSpeed: 1, loop: false, contentType: 'html', loopCount: false });
										setTimeout(function(){
											$(form).removeClass('submitted').finind('.success .inner .typing').typed('reset');
											ob.parents(success_class).addClass(show_miziajs);
										},8000);
									}
								}
							}); 
						},
						errorElement: 'span'
					});
				});
				form_a.find(success_class).wrapInner(inner_span).children(inner).each(function(){ $(this).attr('data-type',$(this).html()).html('<span class="typing"></span><span class="hidden"><span>'+$(this).attr('data-type')+'</span></span>'); }).parent().append(miziajs_div).append(miziajs_bottom);
				form_a.find(submit_tag).parents(p_tag).addClass('submit').append(fit_span);
				form_a.find('.submit .fit').on('click',function(){ $(this).parents(form_a).addClass('shown'); });
				form_a.find(success_class).append(frames_ab).prev().addClass('mb-a');
				form_a.each(function(){ if($(this).is(last_child)){ $(this).parents(html_tag).addClass('form-a-last-child'); }; });	
				form_a.parents('.double').addClass('has-form-a');			

				xa = form_tag.children().add(news.children());
				xb = parseInt(xa.length,0);
				xa.each(function(){ $(this).css('z-index',xb); xb--; });
			},
			date : function(){
				footer_tag.find(date).add(intro.find(date)).text((new Date).getFullYear());
			},
			heights : function(){
				intro.wrap('<div class="intro-wide"></div>').each(function(){ if($(this).parent().outerHeight()<$(window).height()){ $(this).parent().addClass('absolute'); } });
				intro.parent(intro_wide).each(function(){ $(this).css('min-height',$(window).height()); });
			},
			loading : function(){
				body_tag.append('<span class="loading"><span><span class="a"></span><span class="b"></span><span class="c"></span><span class="d"></span></span></span>');				
			},
			responsive : function(){
				if(!$.browser.mobile){
					$('a[href^="#"]').on('click',function(e){ 
						$(html_tag).add(body_tag).animate({'scrollTop': $($(this).attr('href')).offset().top},1000); 
						e.preventDefault(); 
					});		
				};
			},
			animations : function(){
				news.find(figure_tag).addClass('news-figure');
				html_tag.addClass('run');
				$('figure:not(.image-a, .news-figure), p:not(.success)').add(heading_tag).add(li_tag).add(news.children(article_tag)).each(function(){ 
					$(this).waypoint(function() { 
						$(this).addClass('show');
					}, { offset: '85%' }); 
				});
				image_frame.each(function(){ 
					$(this).waypoint(function() { 
						$(this).addClass('show');
					}, { offset: '50%' }); 
				});
				image_b.add(intro.parent(intro_wide)).each(function(){ 
					$(this).add(intro.parent(intro_wide)).waypoint(function() { 
						$(this).addClass(show_miziajs);
					}, { offset: '70%' }); 
				});
				news.find(article_tag).each(function(){ 
					if($(this).is(last_child)){
						$(this).waypoint(function() { 
							$(this).parent().addClass(show_miziajs);
						}, { offset: '70%' }); 
					}
				});
			},
			miscellaneous : function(){
				news.add(image_b).add(intro.parent(intro_wide)).append(miziajs_div);
				root.add(image_frame).append(frames_ab);
				image_frame.append(frames_cd);
				about.find(image_frame).add(intro.parent(intro_wide)).append(dot_line);
				project_header.children(p_tag).each(function(){ if($(this).is(first_child)){ $(this).clone().addClass(mobileonly).addClass('size-a strong text-center text-uppercase').appendTo(content_tag);} });
				news.find(figure_tag).each(function(){ $(this).css({'background-image':'url("'+$(this).find(img_tag).attr('src')+'")'}); });
				news.find(article_tag).each(function(){ $(this).find(a_tag).clone().addClass('clone').appendTo($(this)); });
				news.prev().addClass('prev-news');
				$('[data-background]').addClass('background-a').each(function(){ $(this).prepend('<div class="background">'+$(this).attr('data-background')+'</div>'); });
				double.children().next(desktoponly).parent().addClass('has-desktop-only');
				about.each(function(){ $(this).find(heading_tag).addClass(mobilehide).clone().removeClass(mobilehide).addClass(mobileonly).addClass('show').insertBefore($(this)); });
			}
		},
		ie : {
			css : function() {
				html_tag.each(function(){ 
					if($(this).is('.lt-ie9')){
						body_tag.append('<p class="lt-ie9">Your browser is ancient! Please <a target="_blank" href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>').css('padding-top','28px');
						last_child.addClass('last-child');
					};
				});
			}
		}

	};

	Default.utils.links();
	Default.utils.mails();
	Default.utils.forms();
	Default.utils.heights();
	Default.utils.date();
	Default.utils.miscellaneous();
	Default.utils.responsive();
	Default.ie.css();
	Default.utils.loading();
	Default.utils.animations();
});

/*!*/