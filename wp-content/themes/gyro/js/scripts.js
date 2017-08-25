
;(function($) {
  var units = {
      en: ['Days', 'Hours', 'Minutes', 'Seconds'],
      ru: ['дней', 'часов', 'минут', 'секунд'],
      ua: ['днів', 'годин', 'хвилин', 'секунд'],
      kz: ['күн', 'сағат', 'минут', 'секунд'],
      sec: [86400, 3600, 60, 1]
    },
    defaults = {
      etType: 1,
      etDate: '0',
      etTitleText: '',
      etTitleSize: 14,
      etShowSign: 1,
      etSep: ':',
      etFontFamily: 'Arial',
      etTextColor: 'black',
      etPaddingTB: 0,
      etPaddingLR: 0,
      etBackground: 'transparent',
      etBorderSize: 0,
      etBorderRadius: 0,
      etBorderColor: 'transparent',
      etShadow: '',
      etLastUnit: 4,
      etNumberFontFamily: 'Arial',
      etNumberSize: 32,
      etNumberColor: 'black',
      etNumberPaddingTB: 0,
      etNumberPaddingLR: 0,
      etNumberBackground: 'transparent',
      etNumberBorderSize: 0,
      etNumberBorderRadius: 0,
      etNumberBorderColor: 'transparent',
      etNumberShadow: ''
    };

  $.fn.eTimer = function(options) {
    var config = $.extend({}, defaults, options);

    return this.each(function() {
      var element = $(this),
        date = config.etDate,
        dayNum = 2;

      element.date = function() {
        var now = new Date();
        if (config.etType == 1) {
          date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        } else if (config.etType == 2) {
          var day = now.getDay();
          if (day == 0) day = 7;
          date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8 - day);
        } else if (config.etType == 3) {
          date = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        } else {
          date = date.split('.');
          date = new Date(date[2], date[1] - 1, date[0], date[3], date[4]);
          if (Math.floor((date - now) / units.sec[0] / 1000) >= 100) dayNum = 3;
        }
      };

      element.layout = function() {
        var unit,
          elClass = element.attr('class').split(' ')[0];
        element.html('').addClass('eTimer').append('<div class="etTitle">' + config.etTitleText + '</div>');
        $.each(units.en, function(i) {
          if (i < config.etLastUnit) {
            unit = $('<div class="etUnit et' + this + '"></div>').appendTo(element).append('<div class="etNumber">0</div>').append('<div class="etNumber">0</div>').after('<div class="etSep">' + config.etSep + '</div>');
            if (i == 0 && dayNum == 3) unit.append('<div class="etNumber">0</div>');
            if (config.etShowSign == 1) unit.append('<div class="etSign">' + units.ru[i] + '</div>');
            if (config.etShowSign == 2) unit.append('<div class="etSign">' + units.en[i].toLowerCase() + '</div>');
            if (config.etShowSign == 3) unit.append('<div class="etSign">' + units.ua[i] + '</div>');
            if (config.etShowSign == 4) unit.append('<div class="etSign">' + units.kz[i] + '</div>');
          }
        });
        element.append('<style type="text/css">.' + elClass + ' {display: inline-block; line-height: normal; font-family: ' + config.etFontFamily + '; color: ' + config.etTextColor + '; padding: ' + config.etPaddingTB + 'px ' + config.etPaddingLR + 'px; background: ' + config.etBackground + '; border: ' + config.etBorderSize + 'px solid ' + config.etBorderColor + '; -webkit-border-radius: ' + config.etBorderRadius + 'px; -moz-border-radius: ' + config.etBorderRadius + 'px; border-radius: ' + config.etBorderRadius + 'px; -webkit-box-shadow: ' + config.etShadow + '; -moz-box-shadow: ' + config.etShadow + '; box-shadow: ' + config.etShadow + ';} .' + elClass + ' .etTitle {margin-bottom: 10px; font-size: ' + config.etTitleSize + 'px;} .' + elClass + ' .etUnit {display: inline-block;} .' + elClass + ' .etUnit .etNumber {display: inline-block; margin: 1px; text-align: center; font-family: ' + config.etNumberFontFamily + '; font-size: ' + config.etNumberSize + 'px; color: ' + config.etNumberColor + '; padding: ' + config.etNumberPaddingTB + 'px ' + config.etNumberPaddingLR + 'px; background: ' + config.etNumberBackground + '; border: ' + config.etNumberBorderSize + 'px solid ' + config.etNumberBorderColor + '; -webkit-border-radius: ' + config.etNumberBorderRadius + 'px; -moz-border-radius: ' + config.etNumberBorderRadius + 'px; border-radius: ' + config.etNumberBorderRadius + 'px; -webkit-box-shadow: ' + config.etNumberShadow + '; -moz-box-shadow: ' + config.etNumberShadow + '; box-shadow: ' + config.etNumberShadow + ';} .' + elClass + ' .etUnit .etSign {text-align: center; font-size: ' + (+config.etNumberSize / 2.5) + 'px;} .' + elClass + ' .etSep {display: inline-block; vertical-align: top; font-size: ' + config.etNumberSize + 'px; padding: ' + (+config.etNumberPaddingTB + +config.etNumberBorderSize) + 'px 5px;} .' + elClass + ' .etSep:last-of-type {display: none;}</style>').append('<style type="text/css">.' + elClass + ' .etUnit .etNumber {width: ' + $('.etNumber:visible').eq(0).css('width') + ';}</style>');
      };

      element.tick = function() {
        var timeLeft = Math.floor((date - new Date()) / 1000),
          unit;
        if (timeLeft < 0) clearInterval(element.data('interval'));
        else {
          $.each(units.en, function(i) {
            if (i < config.etLastUnit) {
              unit = Math.floor(timeLeft / units.sec[i]);
              timeLeft -= unit * units.sec[i];
              if (i == 0 && dayNum == 3) {
                element.find('.et' + this).find('.etNumber').eq(0).text(Math.floor(unit / 100) % 10);
                element.find('.et' + this).find('.etNumber').eq(1).text(Math.floor(unit / 10) % 10);
                element.find('.et' + this).find('.etNumber').eq(2).text(unit % 10);
                if ((Math.floor(unit / 100) % 10) == 0) {
                  dayNum = 2;
                  element.find('.et' + this).find('.etNumber').eq(0).remove();
                }
              } else {
                element.find('.et' + this).find('.etNumber').eq(0).text(Math.floor(unit / 10) % 10);
                element.find('.et' + this).find('.etNumber').eq(1).text(unit % 10);
              }
            }
          });
        }
      };

      clearInterval(element.data('interval'));
      element.date();
      element.layout();
      element.tick();
      element.data('interval', setInterval(function() {
        element.tick()
      }, 1000));
    });
  };
})(jQuery);


$(document).ready(function() {
	jQuery(document).ready(function() {
	  jQuery(".eTimer").eTimer({
	    etType: 1,
	    etDate: "31.05.2017.0.0",
	    etTitleText: "Акция! Скидка на все модели 20%! <br> До окончания акции осталось:",
	    etTitleSize: 24,
	    etShowSign: 1,
	    etSep: ":",
	    etFontFamily: "Trebuchet MS",
	    etTextColor: "#a3a3a3",
	    etPaddingTB: 15,
	    etPaddingLR: 15,
	    etBackground: "transparent",
	    etBorderSize: 0,
	    etBorderRadius: 2,
	    etBorderColor: "white",
	    etShadow: " 0px 0px 10px 0px transparent",
	    etLastUnit: 4,
	    etNumberFontFamily: "Impact",
	    etNumberSize: 35,
	    etNumberColor: "#363535",
	    etNumberPaddingTB: 0,
	    etNumberPaddingLR: 8,
	    etNumberBackground: "white",
	    etNumberBorderSize: 0,
	    etNumberBorderRadius: 5,
	    etNumberBorderColor: "white",
	    etNumberShadow: "inset 0px 0px 10px 0px rgba(0, 0, 0, 0.5)"
	  });
	});
	$("input[type='text'], input[type='tel'], input[type='email'], textarea").focus(function(){
		if(this.value==this.defaultValue){this.value=''};
		if($(this).hasClass('inp-error')) {
			$(this).removeClass('inp-error');
		}
	});
	$("input[type='text'], input[type='tel'], input[type='email'], textarea").blur(function(){
		if(this.value=='')this.value=this.defaultValue;
	});
	$("a[href='#']").click(function(e) {
		e.preventDefault();
	});
	$("[data-scroll]").click(function(e) {
		e.preventDefault();
		var toBlock = $(this).attr('data-scroll');
		var scrollTop = $(toBlock).offset().top;
		$('body,html').animate({scrollTop: scrollTop}, 1200);
	});
	$("[data-link]").click(function(e) {
		var link = $(this).attr('data-link');
		window.open(link, '_self');
	});

	// Для адаптивности
	$(window).resize(function() {
		var w = document.documentElement.clientWidth;
		if(w>=1200) {
			$("head").append('<meta name="viewport" content="width=1170, user-scalable=yes">');
		}
	}).resize();
	$(window).resize(function() {
		var gallery = $('#gallery');
		var width_window = document.documentElement.clientWidth || document.body.clientWidth;
		var margin = (parseInt(width_window)-2000)/2;
		if(margin<0) {
			gallery.css('margin-left', margin+'px');
			gallery.css('margin-right', margin+'px');
			gallery.removeClass('center');
		} else {
			gallery.css('margin-left','0px');
			gallery.css('margin-right', '0px');
			gallery.addClass('center');
		}
		gallery.addClass('show');
	}).resize();

	// Модальные окна
	$("#catalog .product .button-orange").click(function(e) {
		e.preventDefault();
		var current_root = $(this).parents('.product');
		var prod_name = current_root.find('.prod-text .prod-name').text();
		var prod_color = current_root.find('.colors .color.active').attr('data-colorname');
		var prod_price = current_root.find('.prod-price .price').text();
		$('#Modal-order').find('.top .zag').text(prod_name+' '+prod_color);
		$('#Modal-order').find('.prod-name').val(prod_name);
		$('#Modal-order').find('.prod-color').val(prod_color);
		$('#Modal-order').find('.prod-price').val(prod_price);
	});
	$("[data-modal]").click(function(e) {
		e.preventDefault();
		var modalID = $(this).attr('data-modal');
		$('#'+modalID).arcticmodal({closeOnEsc:true,closeOnOverlayClick:true});
	});



  $('.owl-carousel').owlCarousel({
      loop:true,
      items:1,
      nav: true
  });


	// Рейтинг

	$("#catalog .product .prod-text .details .row.rating .col-2 .m").click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		var root = $(this).parents('.product');
		root.find('.rating-wrapper').fadeIn(400, function() {
			root.find(".rating-wrapper .r-row").each(function() {
				var width_line = parseInt($(this).find('.line').attr('data-point'));
				width_line = (width_line/10)*100;
				$(this).find('.line > div').animate({width:width_line+'%'}, width_line*10);
			});
		});
	});
	$("#catalog .product .rating-wrapper .close").click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		var root = $(this).parents('.product');
		root.find('.rating-wrapper').fadeOut(300, function() {
			root.find(".rating-wrapper .r-row .line > div").css('width', '0%');
		});
	});


	// Фансибокс
	$("a[rel='gallery'], .fancybox").fancybox({
		'speedIn'   : 500,
		'speedOut'  : 400,
		'maxWidth'  : 1200,
		'maxHeight' : 600,
		'helpers'   : {'overlay':{'locked':false}}
	});
	$("#video .play-button").click(function() {
		var hrefLink = $(this).attr('data-video');
		$.fancybox({
			'padding'       : 0,
			'autoScale'     : false,
			'transitionIn'  : 'fade',
			'transitionOut' : 'fade',
			'speedIn'  		: '500',
			'speedOut' 		: '400',
			'title'         : this.title,
			'width'     	: 760,
			'height'        : 420,
			'href'          : hrefLink.replace(new RegExp('watch\\?v=', 'i'), 'v/'),
			'type'	        : 'swf',
			'swf'	        : { 'wmode' : 'transparent', 'allowfullscreen' : 'true' }
		});
		return false;
	});


	//Переключатель цветов
	$("#catalog .colors .color").click(function(e) {
		var root = $(this).parents('.product');
		root.find('.color').removeClass('active');
		$(this).addClass('active');
		var new_img = $(this).attr('data-colorImg');
		root.find('.qwerty').attr('src', new_img);
    $('.qwerty').addClass('active');
	});


    // Placeholder
    $('input, textarea').placeholder();

	// Маски поля
	$(".phone_field").mask("+375 (99)-999-99-99",{completed:function(){ok=1}});
	var current_url = location.href;
	var domain_path = current_url.substring(current_url.lastIndexOf('/')+1, current_url.length);

});

/* Анимация */
$(".list-name").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $(window).animate({scrollTop: top}, 1500);
    });
var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
    any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
if(!isMobile.any()) {
	jQuery(document).ready(function() {
		jQuery('#benefits .before-item .i').addClass("hidden").viewportChecker({
			classToAdd: 'visible animated rotateIn',
			offset: 120
		});
		jQuery('#benefits .before-item .z').addClass("hidden").viewportChecker({
			classToAdd: 'visible animated zoomIn',
			offset: 110
		});
		jQuery('#catalog .product').addClass("hidden").viewportChecker({
			classToAdd: 'visible animated fadeIn',
			offset: 100
		});
		jQuery('#test-drive .testing').addClass("hidden").viewportChecker({
			classToAdd: 'visible animated fadeInRight',
			offset: 100
		});
		jQuery('#chips .w-center').addClass("hidden").viewportChecker({
			classToAdd: 'visible animated zoomIn',
			offset: 100
		});
	});
	jQuery(document).ready(function() {
		jQuery('#benefits .benefit-item').addClass("hidden").viewportChecker({
			classToAdd: '',
			offset: 100,
			callbackFunction: function() {
				var elements = $("#benefits").find('.benefit-item');
				var i = 0;
				interval = setInterval(function(){
					elements.eq(i).addClass('visible animated zoomInUp');
					i++;
					if(i==elements.length) {
						clearInterval(interval);
					}
				}, 400);
			}
		});
	});
    $(".item-pop-1").magnificPopup({
      type : 'image',
      gallery:{
        enabled : true
      }
    });
    $(".item-pop-2").magnificPopup({
      type : 'image',
      gallery:{
        enabled : true
      }
    });
    $(".item-pop-3").magnificPopup({
      type : 'image',
      gallery:{
        enabled : true
      }
    });
    $(".item-pop-4").magnificPopup({
      type : 'image',
      gallery:{
        enabled : true
      }
    });
    $(".item-pop-5").magnificPopup({
      type : 'image',
      gallery:{
        enabled : true
      }
    });
    $(".item-pop-6").magnificPopup({
      type : 'image',
      gallery:{
        enabled : true
      }
    });
    $(".item-pop-7").magnificPopup({
      type : 'image',
      gallery:{
        enabled : true
      }
    });
    $(".item-pop-8").magnificPopup({
      type : 'image',
      gallery:{
        enabled : true
      }
    });
    $(".item-pop-9").magnificPopup({
      type : 'image',
      gallery:{
        enabled : true
      }
    });
    $(".item-pop-10").magnificPopup({
      type : 'image',
      gallery:{
        enabled : true
      }
    });
    $(".item-pop-11").magnificPopup({
      type : 'image',
      gallery:{
        enabled : true
      }
    });
    $(".item-pop-12").magnificPopup({
      type : 'image',
      gallery:{
        enabled : true
      }
    });

	jQuery(document).ready(function() {
		jQuery('#gifts .gift-item').addClass("hidden").viewportChecker({
			classToAdd: '',
			offset: 100,
			callbackFunction: function() {
				var elements = $("#gifts").find('.gift-item');
				var i = 0;
				interval = setInterval(function(){
					elements.eq(i).addClass('visible animated fadeInUp');
					i++;
					if(i==elements.length) {
						clearInterval(interval);
					}
				}, 400);
			}
		});
	});
}
