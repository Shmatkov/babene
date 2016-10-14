(function() {

	var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'ip-container' ),
		header = container.querySelector( 'header.ip-header' ),
		loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

	function init() {
		var onEndInitialAnimation = function() {
			if( support.animations ) {
				this.removeEventListener( animEndEventName, onEndInitialAnimation );
			}

			startLoading();
		};

		// disable scrolling
		window.addEventListener( 'scroll', noscroll );

		// initial animation
		classie.add( container, 'loading' );

		if( support.animations ) {
			container.addEventListener( animEndEventName, onEndInitialAnimation );
		}
		else {
			onEndInitialAnimation();
		}
	}

	function startLoading() {
		// simulate loading something..
		var simulationFn = function(instance) {
			var progress = 0,
				interval = setInterval( function() {
					progress = Math.min( progress + Math.random() * 0.1, 1 );

					instance.setProgress( progress );

					// reached the end
					if( progress === 1 ) {
						classie.remove( container, 'loading' );
						classie.add( container, 'loaded' );
						clearInterval( interval );

						var onEndHeaderAnimation = function(ev) {
							if( support.animations ) {
								if( ev.target !== header ) return;
								this.removeEventListener( animEndEventName, onEndHeaderAnimation );
							}

							classie.add( document.body, 'layout-switch' );
							window.removeEventListener( 'scroll', noscroll );
						};

						if( support.animations ) {
							header.addEventListener( animEndEventName, onEndHeaderAnimation );
						}
						else {
							onEndHeaderAnimation();
						}
					}
				}, 80 );
		};

		loader.setProgressFn( simulationFn );
	}
	
	function noscroll() {
		window.scrollTo( 0, 0 );
	}

	init();

})();


function mobileMenu(maxWidth) {
    var maxWidth = maxWidth || 420;
    $('.menuButton').click(function() {
        $('.menu').toggleClass('open');
        $('.menuContent').stop().slideToggle(400);
    });

    $(document).bind('click.menu', function(e) {
        if ($(e.target).closest('.menu').length === 0 && window.screen.width <= maxWidth) {
            $('.menuContent').stop().slideUp(400);
            $('.menu').removeClass('open');
        }
    });

    $(window).resize(function(){
        if (window.screen.width > maxWidth ) {
            $('.menuContent').removeAttr('style');
            $('.menu').removeClass('open');
        }
    });
};



/* DOCUMENT READY  */
$(document).ready(function() {
    mobileMenu(700);
    
    $('.top-slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 1000,
	  slidesToShow: 1,
	  adaptiveHeight: true,
	  autoplay: true,
  	  autoplaySpeed: 4000,
	});

	 $('.slider-for').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows: true,
	  fade: true,
	  asNavFor: '.slider-nav'
	});


	$('.slider-nav').slick({
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  asNavFor: '.slider-for',
	  dots: false,
	  centerMode: true,
	  focusOnSelect: true
	});

	$('.single-slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 1000,
	  slidesToShow: 1,
	  adaptiveHeight: true,
	  arrows: false,
	  // autoplay: true,
  	  // autoplaySpeed: 4000,
	});

	smoothScroll.init({
	    selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
	    selectorHeader: null, // Selector for fixed headers (must be a valid CSS selector) [optional]
	    speed: 2000, // Integer. How fast to complete the scroll in milliseconds
	    easing: 'easeInOutCubic', // Easing pattern to use
	    offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
	    callback: function ( anchor, toggle ) {} // Function to run after scrolling
	});

   
	$('#but-act').click(function(e) {
	  event.preventDefault();
	  $('#action-block').slideUp(function() {$('#action-inform').slideDown();} );
	  $("section").removeClass("section-orange");
	});


$('#play-button').click(function(e) {
    	e.preventDefault();
	    $('.overlay').hide();
	    player.playVideo(); 
	    return false;
})




});



 

