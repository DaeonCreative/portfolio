/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";
	/* global google: false */
	/* global Event: false */
	/* global DevSolutionSkill: false */ 
	
	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

	var winDow = $(window);
	// Needed variables
	var $container=$('.portfolio-box, .blog-box');
	var $filter=$('.filter');

	try{
		$container.imagesLoaded( function(){
			$container.show();
			$container.isotope({
				filter:'*',
				layoutMode:'masonry',
				animationOptions:{
					duration:750,
					easing:'linear'
				}
			});
			reconstructIsotope();
		});
	} catch(err) {
	}

	winDow.bind('resize', function(){
		var selector = $filter.find('a.active').attr('data-filter');

		try {
			$container.isotope({ 
				filter	: selector,
				animationOptions: {
					duration: 750,
					easing	: 'linear',
					queue	: false,
				}
			});
		} catch(err) {
		}
		return false;
	});

	/*-------------------------------------------------*/
	/* =  preloader function
	/*-------------------------------------------------*/
	var body = $('body');
	body.addClass('active');

	winDow.load( function(){
		var mainDiv = $('#container'),
			preloader = $('.preloader');

			preloader.fadeOut(400, function(){
				mainDiv.delay(400).addClass('active');
				body.delay(400).css('background', '#eaeaea');
			});
	});

	/*-------------------------------------------------*/
	/* =  flexslider
	/*-------------------------------------------------*/
	try {

		var SliderPost = $('.flexslider');

		SliderPost.flexslider({
			animation: "fade",
			slideshowSpeed: 4000,
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  fullwidth carousell
	/*-------------------------------------------------*/
	try {
		var fullCarousell = $("#owl-demo");
		fullCarousell.owlCarousel({
			navigation : true,
			afterInit : function(elem){
				var that = this;
				that.owlControls.prependTo(elem);
			}
		});
	} catch(err) {

	}
	try {
		var home4 = $("#owl-demo2");
		home4.owlCarousel({
			navigation : true,
			afterInit : function(elem){
				var that = this;
				that.owlControls.appendTo(elem);
			},
			items: 2,
			itemsDesktop: [1199, 2],
			itemsDesktopSmall: [979, 1],
			itemsTablet: [768, 1],
			itemsTabletSmall: false,
			itemsMobile: [479, 1]
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  header height fix
	/*-------------------------------------------------*/
	var content = $('#content');
	content.imagesLoaded( function(){
		var bodyHeight = $(window).outerHeight(),
		containerHeight = $('.inner-content').outerHeight(),
		headerHeight = $('header'),
		contactpageHeight = $('.contact-page');

		if( bodyHeight > containerHeight ) {
			headerHeight.css('min-height',bodyHeight);
		} else {
			headerHeight.css('min-height',containerHeight);
		}
		contactpageHeight.css('min-height', bodyHeight);
	});

	winDow.bind('resize', function(){
		var bodyHeight = $(window).outerHeight(),
		containerHeight = $('.inner-content').outerHeight(),
		headerHeight = $('header'),
		contactpageHeight = $('.contact-page');
		if( bodyHeight > containerHeight ) {
			headerHeight.css('min-height',bodyHeight);
		} else {
			headerHeight.css('min-height',containerHeight);	
		}
		contactpageHeight.css('min-height', bodyHeight);
	});


	/* ---------------------------------------------------------------------- */
	/*	Home 6 fullscreen slider
	/* ---------------------------------------------------------------------- */

	var sliderFullscr = $('#slider'),
		bodyHeight = $(window).outerHeight();

	sliderFullscr.css('height', bodyHeight);

	winDow.bind('resize', function(){
		var bodyHeight = $(window).outerHeight();

		sliderFullscr.css('height', bodyHeight);
	});

	/* ---------------------------------------------------------------------- */
	/*	header hide and show
	/* ---------------------------------------------------------------------- */

	var elemhide = $('.hide-menu'),
		elemshow = $('.show-menu');

		elemhide.on('click', function(e){
			e.preventDefault();

			$('header').addClass('out-active');
			$('.header-foot').addClass('out-active');
			$('#content').addClass('full-width-added');
			setTimeout(function() {
				try {
					reconstructIsotope();
				} catch(err) {

				}
				try {
					fullCarousell.data('owlCarousel').reinit({
						navigation : true
					});
				} catch(err) {

				}
				window.dispatchEvent(new Event('resize'));
				elemshow.addClass('active');
				
			}, 300);
			
		});

		elemshow.on('click', function(e){
			e.preventDefault();

			$('header').removeClass('out-active');
			$('.header-foot').removeClass('out-active');
			$('#content').removeClass('full-width-added');
			elemshow.removeClass('active');
			setTimeout(function() {
				try {
					reconstructIsotope();
				} catch(err) {

				}
				try {
					fullCarousell.data('owlCarousel').reinit({
						navigation : true
					});
				} catch(err) {

				}
			}, 300);
			
		});

	/*-------------------------------------------------*/
	/* =  browser detect
	/*-------------------------------------------------*/
	try {
		$.browserSelector();
		// Adds window smooth scroll on chrome.
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	magnific-popup
	/* ---------------------------------------------------------------------- */

	try {
		// Example with multiple objects
		var ZoomImage = $('.zoom');
		ZoomImage.magnificPopup({
			type: 'image'
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  Testimonial
	/*-------------------------------------------------*/
	try{
		var testimUl = $('.testimonial > ul');

		testimUl.quovolver({
			transitionSpeed:300,
			autoPlay:true
		});
	}catch(err){
	}

	/*-------------------------------------------------*/
	/* = skills animate
	/*-------------------------------------------------*/

	try {
		var animateElement = $(".meter > span");
		animateElement.each(function() {
			$(this)
				.data("origWidth", $(this).width())
				.width(0)
				.animate({
					width: $(this).data("origWidth")
				}, 1200);
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  skills circle
	/*-------------------------------------------------*/
	
	try{
		DevSolutionSkill.init('circle'); 
		DevSolutionSkill.init('circle2'); 
		DevSolutionSkill.init('circle3'); 
		DevSolutionSkill.init('circle4');
	} catch(err) {
	}

	/*-------------------------------------------------*/
	/* =  count increment
	/*-------------------------------------------------*/
	try {
		$('.statistic-counter').appear(function() {
			$('.timer').countTo({
				speed: 4000,
				refreshInterval: 60,
				formatter: function (value, options) {
					return value.toFixed(options.decimals);
				}
			});
			$(this).addClass('active');
		});
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Bootstrap tabs
	/* ---------------------------------------------------------------------- */
	
	var tabId = $('.nav-tabs a');
	try{		
		tabId.click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		});
	} catch(err) {
	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Map
	/* ---------------------------------------------------------------------- */
	var contact = {"lat":"19.381725", "lon":"-99.191409"}; //Change a map coordinate here!

	try {
		var mapContainer = $('.map');
		mapContainer.gmap3({
			action: 'addMarker',
			marker:{
				options:{
					icon : new google.maps.MarkerImage('images/marker.png')
				}
			},
			latLng: [contact.lat, contact.lon],
			map:{
				options:{
					center:[19.381725, -99.191409],//Change a map coordinate here!
					zoom: 14
				}
				},
			},
			{action: 'setOptions', args:[{scrollwheel:true}]}
		);
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	menu responsive
	/* ---------------------------------------------------------------------- */
	var menuClick = $('a.elemadded'),
		navbarVertical = $('.menu-box');
		
	menuClick.on('click', function(e){
		e.preventDefault();

		if( navbarVertical.hasClass('active') ){
			navbarVertical.slideUp(300).removeClass('active');
		} else {
			navbarVertical.slideDown(300).addClass('active');
		}
	});

	winDow.bind('resize', function(){
		if ( winDow.width() > 1024 ) {
			navbarVertical.slideDown(300).removeClass('active');
		} else {
			navbarVertical.slideUp(300).removeClass('active');
		}
	});

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	$('#contact-form input, #contact-form textarea').keydown(function(e) {
		if (e.keyCode == 13) {
			submitContact.trigger('click');
		}
	});

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

});

/* ---------------------------------------------------------------------- */
/*	Isotop reconstruct function
/* ---------------------------------------------------------------------- */
function reconstructIsotope(){
	$('.portfolio-box').isotope({ 
		animationOptions: {
			duration: 200,
			easing	: 'linear',
			queue	: true,
		}
	});
}

/* ---------------------------------------------------------------------- */
/*	reconstruct isotope function
/* ---------------------------------------------------------------------- */

function reconstructIsotope(){
	$('.portfolio-box, .blog-box').isotope({
		layoutMode:'masonry',
		animationOptions:{
			duration:750,
			easing:'linear'
		}
	});
}