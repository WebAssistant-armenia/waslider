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
		'autoplay':true,
		'speed':4000,
		'slidesToScroll':1,
		'animation':'cssEase',
		'dots':true,
		'arrows': true,
		'orientation': 'h',
		'waResponsive':true

	});
	var userSettings = {
		'autoplay':true,
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

	},
	setSettings = function () {
		return {
		'autoplay':($('#autoplay').val()=='true')?  true:false,
		'speed':parseInt($('#speed').val()),
		'slidesToScroll':parseInt($('#slidesToScroll').val()),
		'orientation':$('#orientation').val(),
		'marginsBtwnSlides':parseInt($('#marginsBtwnSlides').val()),
		'waResponsive':($('#wa-responsive').val()=='true')?  true:false,
		'arrows':($('#arrows').val()=='true')?  true:false,
		'prevArrow':$('#prevArrow').val(),
		'nextArrow':$('#nextArrow').val(),
		'dots':($('#dots').val()=='true')?  true:false,
		'swipe':($('#swipe').val()=='true')?  true:false,
		'animation':$('#animation').val()

		};
	};
	console.log(userSettings);
	$(".slider-example").waSlider(userSettings);

	$('.waturnof').click( function () {
		$(".slider-example").waSlider('waTurnOf');
		$(this).prop("disabled",true);
	})
	$('.create').click( function () {
		userSettings = setSettings();
		console.log(userSettings);
		$(".slider-example").waSlider('waTurnOf');
		console.log(userSettings.orientation);
		$(".slider-example").waSlider(userSettings);
		$('.waturnof').prop("disabled",false);
		$('.js-code').text(
			"$('.slider-example').waSlider({\n"+
			"   'autoplay':"+ userSettings.autoplay+',\n'+
			"   'speed':"+userSettings.speed+',\n'+
			"   'slidesToScroll':"+userSettings.slidesToScroll+',\n'+
			"   'orientation':"+userSettings.orientation+',\n'+
			"   'marginsBtwnSlides':"+userSettings.marginsBtwnSlides+',\n'+
			"   'waResponsive':"+userSettings.waResponsive+',\n'+
			"   'arrows':"+userSettings.arrows+',\n'+
			"   'prevArrow':"+userSettings.prevArrow+',\n'+
			"   'nextArrow':"+userSettings.nextArrow+',\n'+
			"   'dots':"+userSettings.dots+',\n'+
			"   'swipe':"+userSettings.swipe+',\n'+
			"   'animation':"+userSettings.animation+',\n'+
			"});"
		)

	})
});