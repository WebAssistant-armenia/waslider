(function($)
	{
		$.fn.waSlider = function ($customSettings) {
			var slider = this;

			/**
			 * @typedef {Object} defaultSettings
			 * @property {bool} autoplay slider's playing auto if choosen true
			 * @property {string} orientation may be 'h' - horizontal,'v'- vertical
			 * @property {number} slidesToShow how many slides have to be shown
			 * @property {number} slidesToScroll how many slides have to be scrolled on clicking next or prev buttons or on autoplay
			 * @property {number} speed how many seconds to show slides on autoplay
			 * @property {bool} dots  if it's true there are showing dots
			 * @property {bool} arrows if it's true there are showing arrows
			 * @property {bool} swipe if it's true you can sliding with swipe too
			 * @property {string} prevArrow element wich must be the prev button
			 * @property {string} nextArrow element wich must be the next button
			 * @property {string} animation animation type,it may be 'ltr'(lefToRight),'rtl'(rightToLeft),'dtu'(downToUp),
			 *														 'utd'(upToDown),'cssEase','fromCenter','carousel','none' 
			 */

			var settings,
			    defaultSettings = {
					'autoplay': false,
					'orientation': 'h',
					'slidesToScroll': 1,
					'speed': 3000,
					'marginsBtwnSlides':20,
					'dots': true,
					'arrows': true,
					'swipe' :true,
					'waResponsive':true,
		            'prevArrow': '<button type="button" class="wa-arrow wa-prev"><</button>',
		            'nextArrow': '<button type="button" class="wa-arrow wa-next">></button>',
		            'animation': 'ltr',
				},
				configs = [];
			for (var i = 0; i < slider.length; ++i) {
				configs[i] = {
					$waSlider: $(slider[i]),
					sliderList: slider[i].children,
					size: slider[i].children.length,
					$sliderList:  [],
					$dots: [],
					$waSliderDots: null,
					$showingArea: null,
					$waSliderNext: null,
					$waSliderPrev: null,
					$visible: [],
					$hidden: [],
					$imagesSrc: [],
					$loader: '<div class="wa-loader"></div>',
					$waSliderTimer: null,
				}
			}

			
			settings = ($customSettings == 'waTurnOf')? $customSettings : $.extend({},defaultSettings,$customSettings);
		


			/**     
			 *     Animations    
			 */
			var leftToRight = function ($conf) {
				for (var i = 0; i < $conf.$hidden.length; i++) {
					$conf.$hidden[i].css({"left":$conf.$hidden[i].width()});
				}
				if(settings.orientation == 'v') {
					for (var i = 0; i < $conf.$visible.length; i++) {
						$conf.$visible[i].css({'left':0});
					}
				}
			};
			var rightToLeft = function ($conf) {
				/*if(settings.orientation == 'h')
					for (var i = 0; i < $conf.$hidden.length; i++) {
						$conf.$hidden[i].css({'-ms-transform': 'scale(0,1)','-webkit-transform':' scale(0,1)','transform':' scale(0,1)'});
					}
				else {
					for (var i = 0; i < $conf.$hidden.length; i++) {
						$conf.$hidden[i].css({'-ms-transform': 'scale(0,0)','-webkit-transform':' scale(0,0)','transform':' scale(0,0)'});
					}
				}
				for (var i = 0; i < $conf.$visible.length; i++) {
					$conf.$visible[i].css({'-ms-transform': 'scale(1,1)','-webkit-transform':' scale(1,1)','transform':' scale(1,1)'});
				}*/
			};
			var downToUp = function ($conf) {
				if(settings.orientation == 'h') {
					for (var i = 0; i < $conf.$visible.length; i++) {
						$conf.$visible[i].css({"top":0});
					}
				}

				for (var i = 0; i < $conf.$hidden.length; i++) {
					$conf.$hidden[i].css({"top":$conf.$hidden[i].height()*2});
				}
			};
			var upToDown = function ($conf) {
				if(settings.orientation == 'h') {
					for (var i = 0; i < $conf.$visible.length; i++) {
						$conf.$visible[i].css({"top":0});
					}
				}
				for (var i = 0; i < $conf.$hidden.length; i++) {
					$conf.$hidden[i].css({"top":$conf.$hidden[i].height()*(-1)});
				}
			};
			var fromCenter = function ($conf) {
				for (var i = 0; i < $conf.$visible.length; i++) {
					$conf.$visible[i].css({'-ms-transform': 'scale(1,1)','-webkit-transform':' scale(1,1)','transform':' scale(1,1)'});
				}
				if(settings.orientation == 'h') {
					for (var i = 0; i < $conf.$hidden.length; i++) {
						$conf.$hidden[i].css({'-ms-transform': 'scale(0,0)','-webkit-transform':' scale(0,0)','transform':' scale(0,0)'});
					}
				}
				else {
					for (var i = 0; i < $conf.$hidden.length; i++) {
						$conf.$hidden[i].css({'-ms-transform': 'scale(0,0)','-webkit-transform':' scale(0,0)','transform':' scale(0,0)'});
					}
				}
			};
			var carousel = function ($conf) {				
				/*for (var i = 0; i < $sliderList.length; i++) {
					$sliderList[i].css({'-ms-transform': 'scale(1,1)','-webkit-transform':' scale(1,1)','transform':' scale(1,1)'});
				}
				if(settings.orientation == 'h')
					for (var i = 0; i < $conf.$hidden.length; i++) {
						$conf.$hidden[i].css({'-ms-transform': 'scale(0,0)','-webkit-transform':' scale(0,0)','transform':' scale(0,0)'});
					}
				else {
					for (var i = 0; i < $conf.$hidden.length; i++) {
						$conf.$hidden[i].css({'-ms-transform': 'scale(0,0)','-webkit-transform':' scale(0,0)','transform':' scale(0,0)'});
					}
				}*/
			};
			var cssEase = function ($conf){
				for (var i = 0; i < $conf.$visible.length; i++) {
			        $conf.$visible[i].css({'opacity': 1});
				}
				for (var i = 0; i < $conf.$hidden.length; i++) {
			        $conf.$hidden[i].css({'opacity': 0});
				}
			};

			var animations = {
					'ltr': leftToRight,
					'rtl': rightToLeft,
					'dtu': downToUp,
					'utd': upToDown,
					'cssEase': cssEase,
					'fromCenter': fromCenter,
					'carousel': carousel,
					'default': leftToRight
				};
			
			var animate = function(animationName, $conf) {
				if(animationName != 'none'){
					if (animations.hasOwnProperty(animationName)) {
						animations[animationName]($conf);
					}
					else {
						console.warn("WAslider doesn't support the animation you choose.Please check if you did everything right and try again.")
						animations['default']($conf);
					}
				}
			};




			/**
			 * Slider
			 */
			var waSlider =  {
				set: {
					showingArea: function ($conf) {
						$conf.$waSlider.addClass("wa-slider");
						$conf.$waSlider.wrap("<div class='wa-showing-area clearfix'></div>");
						$conf.$showingArea = $($conf.$waSlider[0].parentElement);
						$conf.$showingArea.css({"max-width":$conf.$waSlider.width()});
						$conf.$showingArea.append($conf.$loader);
						$conf.$waSlider.addClass('hide');
						if(settings.waResponsive) {
							$conf.$showingArea.addClass('wa-responsive');
						}
					},
					images: function ($conf) {
						for (var i = 0; i < $('img').length; i++) {
							$conf.$imagesSrc[i] = $('img')[i].src;
						}
					},
					sliderList: function ($conf) {
						var i = 0;
						 for (i = 0; i < $conf.size; ++i) {
						 	$conf.$sliderList.push($($conf.sliderList[i]));
						 	$conf.$sliderList[i].index = i;
						 }
						 for (var i = 0; i < $conf.$sliderList.length; ++i) {
						 	$conf.$sliderList[i].addClass("wa-slide");
			 			 }
					},
					dots: function ($conf) {
						$conf.$showingArea.append("<ul class='wa-dots clearfix'></ul>");
						if($($conf.$showingArea[0].children[$conf.$showingArea[0].children.length-1]).hasClass('wa-dots')){
							$conf.$waSliderDots = $($conf.$showingArea[0].children[$conf.$showingArea[0].children.length-1]);
						}
						$conf.$waSliderDots.css("max-width",$conf.size*20);
						for (var i = 0; i < $conf.size; ++i) {
							$conf.$waSliderDots.append("<li class='dot'><button class='dot-btn'></button</li>");
							$conf.$dots[i] = $conf.$waSliderDots[0].children[i].children[0];
							$conf.$dots[i].index = $conf.$sliderList[i].index;
						}

						for (var i = 0; i < $conf.size; ++i) {
							$($conf.$dots[i]).click(function(){
								$(this).addClass("active");
								$conf.$sliderList = waSlider.slider.slideToIndex($conf.$sliderList,this.index,$conf);
								waSlider.slider.showSlides($conf);
							});
						}
					},
					arrows: function ($conf) {
						$conf.$waSlider.before(settings.prevArrow);
						$conf.$waSlider.before(settings.nextArrow);
						$conf.$waSliderPrev = $($conf.$showingArea[0].children[0]);
						$conf.$waSliderNext = $($conf.$showingArea[0].children[1]);
						$conf.$waSliderPrev.click( function () {
							var index = $conf.$sliderList[0].index - settings.slidesToScroll;
							prevIndex = (index >= 0)? index:$conf.size + index ;
							$conf.$sliderList = waSlider.slider.slideToIndex($conf.$sliderList, prevIndex, $conf);
							waSlider.slider.showSlides($conf);
						});
						$conf.$waSliderNext.click( function () {
							var nextIndex = ($conf.$sliderList[0].index + settings.slidesToScroll) % $conf.size;
							$conf.$sliderList = waSlider.slider.slideToIndex($conf.$sliderList, nextIndex, $conf);
							waSlider.slider.showSlides($conf);
						});
					},
					orientation: function($conf) {
						if (settings.orientation == 'v') {
							$conf.$showingArea.addClass('vertical');
							for (var i = 0; i < $conf.$sliderList.length; i++) {
								$conf.$sliderList[i].css({'margin-top':($conf.$sliderList[i].height()+settings.marginsBtwnSlides)*(-1)});								
							}
						}
						else { 
							$conf.$showingArea.addClass('horizontal');
						}
					}
				},
				slider: {
					slideToIndex: function ($listToSlide, $id, $conf) {
						var arr = new Array(),
						    t = false,
						    i = 0;
						while(!t){
							if($listToSlide[i].index == $id) {
								arr.push($listToSlide[i]);
								t = true;
							}
							else i++;
						}
						for (var j = i+1; j < $listToSlide.length; ++j)
							arr.push($listToSlide[j]);
						for (var j = 0; j < i; ++j) {
							arr.push($listToSlide[j]);
						}
						for (var i = 0; i < arr.length; ++i) {
						 	if(settings.animation!='none'){
							 	arr[i].css({'transition-duration':settings.speed*0.001/2+'s'});
							 	arr[i].contents().find('img').css({'transition-duration':settings.speed*0.001/2+'s'});
							 	arr[i].contents().filter('img').css({'transition-duration':settings.speed*0.001/2+'s'});
						 	}
			 			 }

						if(arr[0].index>arr[$conf.slidesToShow-1].index){
							for(var i = 0; i < arr.length; ++i) {
								if(settings.orientation == 'h') {
									if(arr[i].index > arr[$conf.slidesToShow-1].index) {
										arr[i].css({'z-index':0});
									}
									else {
										arr[i].css({'z-index':1});
									}
								}
								else {
									if(arr[i].index > arr[$conf.slidesToShow-1].index) {
										arr[i].css({'z-index':0});
									}
									else {
										arr[i].css({'z-index':1});
									}
								}
							}
						}
						else {
							for(var i = 0; i < arr.length; ++i) {
								if(settings.orientation == 'h')
									arr[i].css({'z-index':0});
								else
									arr[i].css({'z-index':0});
							}
						}
						return arr;
					},
					slidesOnSwipe: function($conf) {
						if($conf.$waSlider.hasClass('wa-slider')){
							var lastCoordinate, currentCoordinate, slideIndex;
							for(var i = 0; i < $conf.$sliderList.length; ++i) {
								$conf.$sliderList[i].mousedown(function (e) {
									lastCoordinate = (settings.orientation == 'v')? e.pageY : e.pageX;
									$(this).mouseup(function(e) {
										currentCoordinate = (settings.orientation == 'v')? e.pageY : e.pageX;
										if(lastCoordinate > currentCoordinate) {
											var nextIndex = ($conf.$sliderList[0].index + settings.slidesToScroll) % $conf.size;
											$conf.$sliderList = waSlider.slider.slideToIndex($conf.$sliderList, nextIndex, $conf);
											waSlider.slider.showSlides($conf);
										}
										else if(lastCoordinate < currentCoordinate) {
											var index = $conf.$sliderList[0].index - settings.slidesToScroll;
											prevIndex = (index >= 0)? index:$conf.size + index ;
											$conf.$sliderList = waSlider.slider.slideToIndex($conf.$sliderList, prevIndex, $conf);
											waSlider.slider.showSlides($conf);
										}
									})
								})
							}
						}
							
					},
					showSlides: function ($conf) {
						console.log($conf.$waSlider.hasClass('wa-slider'));
						if($conf.$waSlider.hasClass('wa-slider')){
							var t = false,
						    widthSum = 0, i,
						    left = 100,
						    margin = settings.marginsBtwnSlides,
						    top;
						   
							for(var i = 0; i < $conf.$waSlider[0].children.length; ++i){
								$($conf.$sliderList[i]).removeClass("first-slide");
								$($conf.$sliderList[i]).removeClass("last-slide");
								$($conf.$sliderList[i]).removeClass("hidden");
								$($conf.$sliderList[i]).removeClass("visible");
							}
							while($conf.$visible.length){
								$conf.$visible.pop();
							}
							while($conf.$hidden.length){
								$conf.$hidden.pop();
							}
							i = 0;
							if (settings.orientation == 'v'){
								while (widthSum <= $conf.$waSlider.innerHeight()) {
									widthSum += $conf.$sliderList[i].height();
									++i;
								}
							}
							else {
								while (widthSum <= $conf.$waSlider.innerWidth()) {
									widthSum += $conf.$sliderList[i].width();
									++i;
								}
							}
							$conf.slidesToShow = i-1;
							for(var i = $conf.slidesToShow; i < $conf.$waSlider[0].children.length; ++i) {
								$conf.$sliderList[i].addClass("hidden");
								$conf.$hidden.push($conf.$sliderList[i]);
							}
							for (var i = 0; i < $conf.slidesToShow; ++i) {
								$conf.$sliderList[i].addClass("visible");
								$conf.$visible.push($conf.$sliderList[i]);
							}
							$conf.$sliderList[0].addClass("first-slide");
							$conf.$sliderList[$conf.slidesToShow-1].addClass("last-slide");
							i = 0;
							while(settings.dots && i<$conf.size){
								if($conf.$sliderList[0].index == $conf.$dots[i].index) {
									$($conf.$dots[i]).addClass("active");
								}
								else if($($conf.$dots[i]).hasClass("active")){ 
									$($conf.$dots[i]).removeClass("active");
								}
								++i;
							}

							if(settings.orientation == 'v') {
								for (var i = 0; i < $conf.$sliderList.length; i++) {
									margin = (2*i-$conf.$sliderList[i].index)*settings.marginsBtwnSlides;
									top =  ($conf.$sliderList[i].height()+settings.marginsBtwnSlides)*(i+1) + margin;
									$conf.$sliderList[i].css({'top': top});
								}
							}
							else {
								for (var i = 0; i < $conf.$sliderList.length; i++) {
									$conf.$sliderList[i].css({'left': left + '%'});
									left +=  ($conf.$sliderList[i].outerWidth()+margin)/$conf.$waSlider.width() * 100;
								}
							}
							animate(settings.animation, $conf);

						}						
						
					},
					autoplay: function ($conf) {
						$conf.waSliderTimer = setInterval((function(){
							var nextIndex = ($conf.$sliderList[0].index + settings.slidesToScroll) % $conf.size;
							$conf.$sliderList = waSlider.slider.slideToIndex($conf.$sliderList, nextIndex, $conf);
							waSlider.slider.showSlides($conf);
						}),settings.speed);
					},					
				},
				imgPreloader: function (pictureUrls, callback, $conf) {
				    var i,
				        j,
				        loaded = 0;

				    for (i = 0, j = pictureUrls.length; i < j; i++) {
				        (function (img, src) {
				            img.onload = function () {
				                if (++loaded == pictureUrls.length && callback) {
				                    callback($conf);
				                    $($conf.$loader).hide();
				                }
				            };
				            img.src = src;
				        } (new Image(), pictureUrls[i]));
				    }
				},
				init: function (conf) {
					if(settings == 'waTurnOf') {
						conf.$showingArea = $(conf.$waSlider[0].parentElement);
						//conf.$showingArea[0].remove();
						if($(conf.$showingArea[0].children[conf.$showingArea[0].children.length-1]).hasClass('wa-dots')){
							conf.$waSliderDots = $(conf.$showingArea[0].children[conf.$showingArea[0].children.length-1]);
						}
						if($(conf.$showingArea[0].children[0]).hasClass('wa-arrow')){							
							conf.$waSliderPrev = $(conf.$showingArea[0].children[0]);
							conf.$waSliderNext = $(conf.$showingArea[0].children[1]);
						}
						waSlider.set.images(conf);
						waSlider.imgPreloader(conf.$imagesSrc, waSlider.waTurnOf, conf);
					}
					else {	
						waSlider.set.showingArea(conf);						
						waSlider.set.images(conf);
						waSlider.imgPreloader(conf.$imagesSrc, waSlider.buildSlider, conf);
					}
				},
				buildSlider: function ($conf) {
					$('.wa-loader').remove();
					$conf.$waSlider.removeClass('hide');
					$conf.$waSlider.addClass('show');
					waSlider.set.sliderList($conf);
					waSlider.set.orientation($conf);
					if (settings.dots) {
						waSlider.set.dots($conf);
					}
					if (settings.arrows) {
						waSlider.set.arrows($conf);
					}
					waSlider.slider.showSlides($conf);
					if (settings.autoplay || (!settings.dots && !settings.arrows)) {
						waSlider.slider.autoplay($conf);
					}
					if(settings.swipe) {
						waSlider.slider.slidesOnSwipe($conf);
					}
				},
				waTurnOf: function($conf) {
					$('.wa-loader').remove();
					console.log($($conf.$waSlider[0]));
					$conf.$showingArea.before($($conf.$waSlider[0]));
					if($conf.$waSlider.parent().hasClass('wa-showing-area')) {
						console.log($conf.$waSliderPrev,$conf.$waSliderNext,$conf.$waSliderDots);
						/*if($conf.$waSliderPrev){
							$conf.$waSliderPrev.remove();
						}
						if($conf.$waSliderNext){
							$conf.$waSliderNext.remove();
						}
						if($conf.$waSliderDots){
							$conf.$waSliderDots.remove();
						}*/
						/*$('.delete').remove();*/
						/*$conf.$waSlider.removeClass('wa-slider');
						$conf.$waSlider.removeClass('show');
						for (var i = 0; i < $conf.$waSlider[0].children.length; i++) {
							$($conf.$waSlider[0].children[i]).removeClass('wa-slide');
							$($conf.$waSlider[0].children[i]).removeClass('visible');
							$($conf.$waSlider[0].children[i]).removeClass('hidden');
							$($conf.$waSlider[0].children[i]).removeClass('first-slide');
							$($conf.$waSlider[0].children[i]).removeClass('last-slide');
							$($conf.$waSlider[0].children[i]).css({'opacity':1});
						}
						var a = $($conf.$waSlider[0]);
						$conf.$showingArea.before(a);*/
						/*$conf.$showingArea.remove();*/
					}


				}
			};
			for(var i = 0; i < configs.length; ++i) {
				waSlider.init(configs[i]);
			}
		};
})(jQuery);