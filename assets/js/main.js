"use strict";
var timerset = false;
$(document).ready(function () {
    $( window ).resize();
    setInterval(function () {showcasechange(2)}, 8000);
    $('#contactform').validate({
        rules: {
            contactname: {
                minlength: 2,
                required: true
            },
            contactsurname: {
                minlength: 2,
                required: true
            },
            contactemail: {
                required: true,
                email: true
            },
            contactphone: {
                minlength: 7,
                required: true
            },
            contactmessage: {
                minlength: 10,
                required: true
            },
        },
        highlight: function (element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function (element) {
            element.text('OK!').addClass('valid')
                .closest('.control-group').removeClass('error').addClass('success');
        }
    });
    setbecomesponsorwriting();
    document.getElementById('header-menu-area').onclick = function(){toggleresponsivemenu();};
    document.getElementById('showcaseleftarrow').onclick = function(){showcasechange(1);};
    document.getElementById('showcaserightarrow').onclick = function(){showcasechange(2);};
    // document.getElementById('home-inner-box-writing-area-close-button').onclick = function(){sponsorareatoggle(1);};
    // document.getElementById('content-news-arrow-left').onclick = function(){newschangenext(0);};
    // document.getElementById('content-news-arrow-right').onclick = function(){newschangenext(1);};
    // // document.getElementById('content-news-arrow-right2').onclick = function(){newschangenext(1);};
    // document.getElementById('calendar-arrow-left').onclick = function(){calendarchangenext(0);};
    // document.getElementById('calendar-arrow-right').onclick = function(){calendarchangenext(1);};
    // document.getElementById('calendar-arrow-right2').onclick = function(){calendarchangenext(1);};
    var numofresponsiveitems = $('.responsive-menu-item').length;
    var i = 1;
    while(i<=numofresponsiveitems){
        if($('#responsive-menu-item-' + i).hasClass('responsive-menu-has-sub')){
            setclicktoresponsive(i);
        }
        i++;
    }
    var numofmenuitems = $('.header-menu-item').length;
    var i = 1;
    while(i<=numofresponsiveitems){
        if($('#header-menu-item-' + i).hasClass('header-menu-item-has-sub')){
            setclicktomenu(i);
        }
        i++;
    }
    var numofshowcasepagination = $('.showcase-pagination-circle-item').length;
    var i = 1;
    while(i<=numofshowcasepagination){
        setclicktopagination(i);
        i++;
    }
    var numofsponsorbox = $('.becomesponsor-box').length;
    var i = 1;
    while(i<=numofsponsorbox){
        setclicktosponsorbox(i);
        i++;
    }
    var numofsponsormenubox = $('.becomesponsor-bg-box-area-menu-item').length;
    var i = 1;
    while(i<=numofsponsormenubox){
        setclicktosponsormenubox(i);
        i++;
    }
    setcalendarheights(1);
    $(".fancybox").fancybox();
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    if(isSafari == true && $(".contact-social-icons").length){
        $(".contact-social-icons").addClass('not-anim');
    }
});
$( window ).resize(function() {
    setbecomesponsorwriting();
    var wwidth= $(window).width();
    var wheight= $(window).height();
    if($('#showcase').length > 0){
        var numofsc = $('.showcase-item').length;
        var paginationtotallength = numofsc * 16 + (numofsc - 1) * 20;
        var marginleftnumber = (wwidth - paginationtotallength) / 2;
        $('.showcase-pagination').css("left",marginleftnumber + "px");
    }
    var numofsc = $('.calendar-show-item').length;
    var i = 1;
    var current = 0;
    while(i<=numofsc){
        if($('#calendar-show-item-' + i).hasClass('calendar-show-current')){
            current = i;
        }
        i++;
    }
    setcalendarheights(current);
});
$(window).scroll(function() { //when window is scrolled
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 0) {
        $('#header').addClass('scrolled');
    } else {
        $('#header').removeClass('scrolled');
    }
    var numoficons = $('.page-icon-animation').length;
    var i = 1;
    var wheight = window.innerHeight;
    while(i <= numoficons){
        var scrollTop = $(window).scrollTop();
        var position = $("#page-icon-" + i).offset();
        var distance = position.top - scrollTop;
        if(distance > 0){
            var ratio = distance/wheight
        }
        else{
            var ratio = 0;
        }
        
        moveicon(i,ratio);
        i++;
    }
  });
function moveicon(id,ratio){
    var moveright = ((ratio - 0.5) * 500) + 150;
    var moveopac = (1 - ratio) / 2;
    $("#page-icon-" + id).css('right', moveright + 'px');
    $("#page-icon-" + id).css('opacity', moveopac);
}
function setclicktoresponsive(id){
    document.getElementById('responsive-menu-item-' + id).onclick = function(){responsivesubtoggle(id);};
}
function setclicktomenu(id){
    document.getElementById('header-menu-item-' + id).onmouseenter = function(){headersubopen(id);};
    document.getElementById('header-menu-item-' + id).onmouseleave = function(){headersubclose(id);};
    document.getElementById('headersub-' + id).onmouseenter = function(){headersubopen(id);};
    document.getElementById('headersub-' + id).onmouseleave = function(){headersubclose(id);};
}
function setclicktopagination(id){
    document.getElementById('showcase-pagination-' + id).onclick = function(){showcasego(id);};
}
function setclicktosponsorbox(id){
    document.getElementById('various' + id).onclick = function(){sponsorareatoggle(id);};
}
function setclicktosponsormenubox(id){
    document.getElementById('bbbami-' + id).onclick = function(){sponsorinnerareatoggle(id);};
}
function timeranim(eventdate){
  $('#tte-month').countdown(eventdate, function(event) {
    $(this).html(event.strftime('%w'));
  });
    $('#tte-day').countdown(eventdate, function(event) {
    $(this).html(event.strftime('%d'));
  });
    $('#tte-hour').countdown(eventdate, function(event) {
    $(this).html(event.strftime('%H'));
  });
    $('#tte-minute').countdown(eventdate, function(event) {
    $(this).html(event.strftime('%M'));
  });
    
    };
function headersubclose(id){
    $('#headersub-' + id).addClass('header-submenu-closed');
    $('#headersubul-' + id).addClass('sub-hidden');
}
function headersubopen(id){
    $('#headersub-' + id).removeClass('header-submenu-closed');
    $('#headersubul-' + id).removeClass('sub-hidden');
}
function showcasechange(side){
    var numofsc = $('.showcase-item').length;
    var counter = 1;
    var current = 0;
    var next = 0;
    var moves = 0;
    while(counter<=numofsc){
        if($('#showcase-' + counter).hasClass('showcase-current')){
            current = counter;
        }
        counter++;
    }
    if(current > 0){
        if(side === 2){
            next = current + 1;
            if(next <= numofsc){
                $('#showcase-' + current).removeClass('showcase-current');
                $('#showcase-' + current).addClass('showcase-left');
                $('#showcase-pagination-' + current).removeClass('pagination-show');
                $('#showcase-' + next).addClass('showcase-current');
                $('#showcase-' + next).removeClass('showcase-right');
                $('#showcase-pagination-' + next).addClass('pagination-show');
                moves = 1;
            }
            if(next > numofsc){
                var counter2 = 2;
                while(counter2 <= numofsc){
                    $('#showcase-' + counter2).removeClass('showcase-current');
                    $('#showcase-' + counter2).removeClass('showcase-left');
                    $('#showcase-' + counter2).addClass('showcase-right');
                    $('#showcase-pagination-' + counter2).removeClass('pagination-show');
                    counter2++;
                }
                $('#showcase-' + 1).addClass('showcase-current');
                $('#showcase-' + 1).removeClass('showcase-left');
                $('#showcase-' + 1).removeClass('showcase-right');
                $('#showcase-pagination-' + 1).addClass('pagination-show');
            }
        }
        if(side === 1){
            next = current - 1;
            if(next > 0){
                $('#showcase-' + current).removeClass('showcase-current');
                $('#showcase-' + current).addClass('showcase-right');
                $('#showcase-pagination-' + current).removeClass('pagination-show');
                $('#showcase-' + next).addClass('showcase-current');
                $('#showcase-' + next).removeClass('showcase-left');
                $('#showcase-pagination-' + next).addClass('pagination-show');
                moves = 1;
            }
            if(next === 0){
                var counter2 = 1;
                while(counter2 < numofsc){
                    $('#showcase-' + counter2).removeClass('showcase-current');
                    $('#showcase-' + counter2).removeClass('showcase-right');
                    $('#showcase-' + counter2).addClass('showcase-left');
                    $('#showcase-pagination-' + counter2).removeClass('pagination-show');
                    counter2++;
                }
                $('#showcase-' + numofsc).addClass('showcase-current');
                $('#showcase-' + numofsc).removeClass('showcase-right');
                $('#showcase-' + numofsc).removeClass('showcase-left');
                $('#showcase-pagination-' + numofsc).addClass('pagination-show');
            }
        }
    }
}
function showcasego(id){
    var numofsc = $('.showcase-item').length;
    var counter = 1;
    var current = 0;
    var next = id;
    var moves = 0;
    while(counter<=numofsc){
        if($('#showcase-' + counter).hasClass('showcase-current')){
            current = counter;
        }
        counter++;
    }
    if(current > 0){
        if(next > current){
            if(next <= numofsc){
                $('#showcase-' + current).removeClass('showcase-current');
                $('#showcase-' + current).addClass('showcase-left');
                $('#showcase-pagination-' + current).removeClass('pagination-show');
                var counter2 = current + 1;
                while(counter2 < next){
                    $('#showcase-' + counter2).removeClass('showcase-right');
                    $('#showcase-' + counter2).addClass('showcase-left');
                    counter2++;
                }
                $('#showcase-' + next).addClass('showcase-current');
                $('#showcase-' + next).removeClass('showcase-right');
                $('#showcase-' + next).removeClass('showcase-left');
                $('#showcase-pagination-' + next).addClass('pagination-show');
                moves = 1;
            }
        }
        if(next < current){
            if(next > 0){
                $('#showcase-' + current).removeClass('showcase-current');
                $('#showcase-' + current).addClass('showcase-right');
                $('#showcase-pagination-' + current).removeClass('pagination-show');
                var counter2 = current - 1;
                while(counter2 > next){
                    $('#showcase-' + counter2).removeClass('showcase-left');
                    $('#showcase-' + counter2).addClass('showcase-right');
                    counter2--;
                }
                $('#showcase-' + next).addClass('showcase-current');
                $('#showcase-' + next).removeClass('showcase-right');
                $('#showcase-' + next).removeClass('showcase-left');
                $('#showcase-pagination-' + next).addClass('pagination-show');
                moves = 1;
            }
        }
    }
}
function setbecomesponsorwriting(){
    var numofsc = $('.becomesponsor-bg-box-area-item').length;
    var areaheight = $('.becomesponsor-bg-box-area-inner').height();
    var i = 1;
    while(i <= numofsc){
        var itemheight = $('#becomesponsor-item-' + i).height();
        var itemmargintop = (areaheight - itemheight) / 2 - 50;
        document.getElementById('becomesponsor-item-' + i).style.marginTop = itemmargintop+"px";
        i++;
    }
}
function toggleresponsivemenu(){
    $('body').toggleClass('body-screencap');
    $('#responsive-menu-area').toggleClass('header-submenu-closed');
    $('#responsive-menu').toggleClass('sub-hidden');
    $('#header-menu-area').toggleClass('menu-open');
}
function responsivesubtoggle(id){
    $('#responsive-sub-' + id).toggleClass('header-submenu-closed');
}
function sponsorareatoggle(id){
    $('body').toggleClass('body-screencap');
    $('#becomesponsor-bg-box-area').toggleClass('becomesponsor-bg-box-area-open');
    sponsorinnerareatoggle(id);
}
function sponsorinnerareatoggle(id){
    var numofsc = $('.becomesponsor-bg-box-area-item').length;
    var i=1;
    while(i<=numofsc){
        $('#becomesponsor-item-' + i).removeClass('becomesponsor-bg-box-area-item-open');
        i++;
    }
    $('#becomesponsor-item-' + id).addClass('becomesponsor-bg-box-area-item-open');
    $('.becomesponsor-bg-box-area-menu ul li:nth-child(' + id + ')').addClass('selected');
}
function setcountdowntimer(countdowndate){
    $(document).scroll(function() {
            if(timerset === false){
            var topPosCircle = $("#tte-month").offset().top;
            var scrollTop = $(window).scrollTop();
            var circledistance = topPosCircle - scrollTop;
            var windowheight = $(window).height();
            var animationpoint = windowheight - 150;
            if (circledistance < animationpoint) {
                timeranim(countdowndate);
                $('#tte-month').addClass('timetoevent-amount-open');
                $('#tte-day').addClass('timetoevent-amount-open');
                $('#tte-hour').addClass('timetoevent-amount-open');
                $('#tte-minute').addClass('timetoevent-amount-open');
                timerset = true;
            }
                
            }
        });
}
function newschangenext(side){
    var numofsc = $('.content-news-area-item').length;
    var i = 1;
    var current = 0;
    while(i<=numofsc){
        if($('#news-item-' + i).hasClass('news-item-current')){
            current = i;
        }
        i++;
    }
    if(side === 1){
        var next = current + 1;
        if(next > numofsc){
            var next = 1;
        }
    }
    if(side === 0){
        var next = current - 1;
        if(next < 1){
            var next = numofsc;
        }
    }
    newschange(next,numofsc);
}
function newschange(next,total){
    var i = 1;
    while(i <= total){
        if(i < next){
            $('#news-item-' + i).addClass('news-item-left');
            $('#news-item-' + i).removeClass('news-item-right');
            $('#news-item-' + i).removeClass('news-item-current');
        }
        else if(i === next){
            $('#news-item-' + i).removeClass('news-item-left');
            $('#news-item-' + i).removeClass('news-item-right');
            $('#news-item-' + i).addClass('news-item-current');
        }
        else if(i > next){
            $('#news-item-' + i).removeClass('news-item-left');
            $('#news-item-' + i).addClass('news-item-right');
            $('#news-item-' + i).removeClass('news-item-current');
        }
        i++;
    }
}
function calendarchangenext(side){
    var numofsc = $('.calendar-show-item').length;
    var i = 1;
    var current = 0;
    while(i<=numofsc){
        if($('#calendar-show-item-' + i).hasClass('calendar-show-current')){
            current = i;
        }
        i++;
    }
    if(side === 1){
        var next = current + 1;
        if(next > numofsc){
            var next = 1;
        }
    }
    if(side === 0){
        var next = current - 1;
        if(next < 1){
            var next = numofsc;
        }
    }
    calendarchange(next,numofsc);
    setcalendarheights(next);
}
function calendarchange(next,total){
    var i = 1;
    while(i <= total){
        if(i < next){
            $('#calendar-show-item-' + i).addClass('calendar-show-left');
            $('#calendar-show-item-' + i).removeClass('calendar-show-right');
            $('#calendar-show-item-' + i).removeClass('calendar-show-current');
        }
        else if(i === next){
            $('#calendar-show-item-' + i).removeClass('calendar-show-left');
            $('#calendar-show-item-' + i).removeClass('calendar-show-right');
            $('#calendar-show-item-' + i).addClass('calendar-show-current');
        }
        else if(i > next){
            $('#calendar-show-item-' + i).removeClass('calendar-show-left');
            $('#calendar-show-item-' + i).addClass('calendar-show-right');
            $('#calendar-show-item-' + i).removeClass('calendar-show-current');
        }
        i++;
    }
}
function setcalendarheights(next){
    var calendaritemheight = $('#calendar-show-item-' + next).height();
    $('#calendar-show-area').css('height',calendaritemheight + 'px');
    $('#calendar-show-area').css('max-height',calendaritemheight + 'px');
    if(window.innerWidth > 992){
        $('#calendar-arrow-left').css('height', calendaritemheight + 'px');
        $('#calendar-arrow-left').css('max-height', calendaritemheight + 'px');
        $('#calendar-arrow-left').css('line-height', calendaritemheight + 'px');
        $('#calendar-arrow-right').css('height', calendaritemheight + 'px');
        $('#calendar-arrow-right').css('max-height', calendaritemheight + 'px');
        $('#calendar-arrow-right').css('line-height', calendaritemheight + 'px');
        $('#calendar-arrow-right2').css('height', calendaritemheight + 'px');
        $('#calendar-arrow-right2').css('max-height', calendaritemheight + 'px');
        $('#calendar-arrow-right2').css('line-height', calendaritemheight + 'px');
    }
    else{
        $('#calendar-arrow-left').css('height', '150px');
        $('#calendar-arrow-left').css('max-height', '150px');
        $('#calendar-arrow-left').css('line-height', '150px');
        $('#calendar-arrow-right').css('height', '150px');
        $('#calendar-arrow-right').css('max-height', '150px');
        $('#calendar-arrow-right').css('line-height', '150px');
        $('#calendar-arrow-right2').css('height', '150px');
        $('#calendar-arrow-right2').css('max-height', '150px');
        $('#calendar-arrow-right2').css('line-height', '150px');
    }
}

        
function initmap() {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 15,
                    scrollwheel: false,
                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(51.507883, -0.170171), // New York

                    // How you would like to style the map. 
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a7a7a7"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#737373"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#efefef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#696969"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#b3b3b3"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d6d6d6"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "weight": 1.8
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d7d7d7"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#808080"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c5d8e7"
            }
        ]
    }
]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('contact-mid');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);

                // Let's also add a marker while we're at it
                var gmarker = {url: 'assets/images/mapicon.png',
                scaledSize: new google.maps.Size(27, 38)};
            var beachMarker = new google.maps.Marker({
            position: new google.maps.LatLng(51.507883, -0.170171),
            map: map,
            icon: gmarker
  });
            }