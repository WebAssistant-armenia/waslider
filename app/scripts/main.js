$(document).ready(function(){

	$(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('header').addClass("darken");
        }
        else {
            $('header').removeClass("darken");
        }
    });

	var menu = {
	        'homeBtn': $('.home-btn'),
	        'docBtn': $('.doc-btn'),
	        'examplesBtn': $('.examples-btn'),
	        'downloadBtn': $('.download-btn'),
	    },
	    pages = {
	        'home': $('.home'),
	        'doc': $('.doc'),
	        'examples': $('.examples'),
	        'download': $('.download'),
	    },
	    logo = $('header .logo a');

	for(var i in menu) {
    	var key;
		menu[i].click(function () {
			for(j in menu) {
				if(menu[j].parent().hasClass('active') && $(this)[0] != menu[j][0]){
					menu[j].parent().removeClass('active');
				}
				else if($(this)[0] == menu[j][0]) {
					key = j;
				}
			}
			key = key.replace('Btn','');
			$(this).parent().addClass('active');
			showPage(key);
		})
	}
	logo.click(function() {
		for(i in menu) {
			if(i!='homeBtn') {
				menu[i].parent().removeClass('active');
			}			
		}
		menu['homeBtn'].parent().addClass('active');
		showPage('home');
	})
	var showPage = function ($pageName) {
		for (var i in pages) {
			if(pages[i].hasClass('active') && i!=$pageName) {
				pages[i].removeClass('active')
			}			
		}
		pages[$pageName].addClass('active');
	}



	$(".slider1").waSlider({
		'autoplay':false,
		'speed':4000,
		'slidesToScroll':1,
		'animation':'cssEase',
		'dots':true,
		'arrows': true,
		'orientation': 'h',
		'waResponsive':true

	});
/*	$((".slider1")).waSlider('waTurnOf');*/
	var userSettings = {
		'autoplay':false,
		'speed':3000,
		'slidesToScroll':1,
		'orientation':'h',
		'marginsBtwnSlides':20,
		'waResponsive':true,
		'arrows':true,
		'prevArrow':'<button type="button" class="wa-arrow wa-prev"><</button>',
		'nextArrow':'<button type="button" class="wa-arrow wa-next">></button>',
		'dots':true,
		'swipe':true,
		'animation':'none'

	};
	$(".slider-example").waSlider(userSettings);

	/*$(".slider-none-h").waSlider({
		'autoplay':false,
		'speed':4000,
		'slidesToScroll':1,
		'animation':'none',
		'dots':true,
		'arrows': true,
		'orientation': 'h',
		'waResponsive':true

	});
	$(".slider-none-v").waSlider({
		'autoplay':false,
		'speed':4000,
		'slidesToScroll':1,
		'animation':'none',
		'dots':true,
		'arrows': true,
		'orientation': 'v',
		'waResponsive':true

	});

	$(".slider-ltr-h").waSlider({
		'autoplay':false,
		'speed':4000,
		'slidesToScroll':1,
		'animation':'ltr',
		'dots':true,
		'arrows': true,
		'orientation': 'h',
		'waResponsive':true

	});
	$(".slider-ltr-v").waSlider({
		'autoplay':false,
		'speed':4000,
		'slidesToScroll':1,
		'animation':'ltr',
		'dots':true,
		'arrows': true,
		'orientation': 'v',
		'waResponsive':true

	});

	$(".slider-rtl-h").waSlider({
		'autoplay':false,
		'speed':4000,
		'slidesToScroll':1,
		'animation':'rtl',
		'dots':true,
		'arrows': true,
		'orientation': 'h',
		'waResponsive':true

	});
	$(".slider-rtl-v").waSlider({
		'autoplay':false,
		'speed':4000,
		'slidesToScroll':1,
		'animation':'rtl',
		'dots':true,
		'arrows': true,
		'orientation': 'v',
		'waResponsive':true

	});

	$(".slider-dtu-h").waSlider({
		'autoplay':false,
		'speed':4000,
		'slidesToScroll':1,
		'animation':'dtu',
		'dots':true,
		'arrows': true,
		'orientation': 'h',
		'waResponsive':true

	});
	$(".slider-dtu-v").waSlider({
		'autoplay':false,
		'speed':4000,
		'slidesToScroll':1,
		'animation':'dtu',
		'dots':true,
		'arrows': true,
		'orientation': 'v',
		'waResponsive':true

	});

	$(".slider-utd-h").waSlider({
		'autoplay':false,
		'speed':4000,
		'slidesToScroll':1,
		'animation':'utd',
		'dots':true,
		'arrows': true,
		'orientation': 'h',
		'waResponsive':true

	});
	$(".slider-utd-v").waSlider({
		'autoplay':false,
		'speed':4000,
		'slidesToScroll':1,
		'animation':'utd',
		'dots':true,
		'arrows': true,
		'orientation': 'v',
		'waResponsive':true

	});*/
});