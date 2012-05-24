/*
 * File:		jResponsoSlider.js
 * Author:		Ryan Egan
 */

;(function ($, window, document, undefined) {
    // Create the defaults once
    var pluginName = 'jResponsoSlider',
    	defaults = {
			fadeSpeed: 1000,
			timeBetweenSlides: 7000
		};

    // Constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.defaults = defaults;
        this.name = pluginName;

        //Helper Vars
        this.index = 0;
        this.slides = $(element).children('li');
        this.length = this.slides.size();
        
        //Init Plugin
        this.init();
    }

    Plugin.prototype = {
		/*
		* Function: init
		*/
        init: function () {
			
			var $this = this;
			show = {"float": "left", "position": "relative"};
			hide = {"float": "none", "position": "absolute"};

			//Start the slideshow
			this.initSlideShow();
			
			//Event Handlers
			$(this.element)
				.on('swipeLeft', function () {
					$this.prevSlide();
  				})
  				.on('swipeRight', function () {
  					$this.nextSlide();
  				});

        	this.slides.css(hide); //hide all
        	this.slides.eq(this.index).css(show); //show first
        }, 

		/*
		* Function: initSlideShow
		* ----------------------------
		* Initiates the slide show
		*/
        initSlideShow: function () {
			$this = this;

    		slideShow = setInterval( function () {
				var id;
				//Increment index or reset back at 0 if end
				if ($this.index + 1 < $this.length) {
					id = $this.index + 1;
				} else {
					id = 0;
    			}

				$this.slideTo(id);

			}, this.options.timeBetweenSlides);
		},

		/*
		* Function: slideTo
		* ----------------------------
		* Slides to a certain slide
		*/
      	slideTo: function (id) {

			this.slides
				.stop() //hide all
				.fadeOut(this.options.fadeSpeed, function () {
					$(this).css(hide);
				})
				.eq(id) // show the current one
					.fadeIn(this.options.fadeSpeed, function () {
						$(this).css(show);
					});
			this.index = id; //set the id

		}, //END slideto()

		/*
		* Function: nextSlide
		* ----------------------------
		* Goes to next slide (forwards)
		*/
      	nextSlide: function () {

			var id;

			//Increment index or reset back at 0 if end
			if ( this.index + 1 < this.length ) {
				id = this.index + 1;
			} else {
				id = 0;
			}
			
			clearInterval(slideShow); //clear the auto slideshow
			this.slideTo(id);
			this.initSlideShow(); //reinit slideshow

      	}, //END nextSlide()
      	
		/*
      	* Function: prevSlide
		* ----------------------------
		* Goes to previous slide (backwards)
		*/
		prevSlide: function () {
			var id;
			//Decrement index or reset back at len if start
			if (this.index - 1 >= 0) {
				id = this.index - 1;
			} else {
				id = this.length - 1;
			}
	    			
			clearInterval(slideShow); //clear the auto slideshow
			this.slideTo(id);
			this.initSlideShow(); //reinit slideshow
		} //END prevSlide()
	};

	/*
	* Plugin Wrapper
	* ----------------------------
	* This was written by someone much smarter than myself but it I know it does important stuff
	*/
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	}
})( jQuery, window, document );