/*
 * File:		jResponsoSlider.js
 * Author:		Ryan Egan
 */

;(function ( $, window, document, undefined ) {
	
    // Create the defaults once
    var pluginName = 'jResponsoSlider',
        defaults = {
            fadeSpeed: 1000,
            timeBetweenSlides: 4000
        };

    // Constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this._index = 0;
        this._$slides = $(element).children('li');
        this._length = this._$slides.size();
        this.init();
    }

    Plugin.prototype = {
        
        /*
         * Function: init
         */
        init: function() {
            
            //CSS Arrays
        	show = {"float": "left", "position": "relative"};
        	hide = {"float": "none", "position": "absolute"};
        	
        	this._$slides.css(hide); //hide all
        	this._$slides.eq(this._index).css(show); //show first
        	
          	this.initSlideShow();
          	this.initEventHandlers();
        }, 
        
        
      	/*
      	 * Function: initSlideShow
      	 */
        initSlideShow: function () {
        	$this = this;
    		rotate = setInterval(function () {
    			
    			//Increment index or reset back at 0 if end
    			if($this._index + 1 < $this._length){
    				id = $this._index + 1
    			} else {
    				id = 0;
    			}
    			
  				$this.slideTo($this, id);
  				
            }, this._defaults.timeBetweenSlides);
      	},
      	
      	/*
      	 * Function: initEventHandlers
      	 */
        initEventHandlers: function () {

			var X,
          		Y,
          		$this = $(this.element);

        	//Touch Events
			$this.bind('touchstart', touchstart);
			
			
			//Touch Start
			function touchstart(event) {
	    		var touches = event.originalEvent.touches;
	    		if (touches && touches.length) {
	      			X = touches[0].pageX;
	      			Y = touches[0].pageY;
	      			$this.bind('touchmove', touchmove);
	    		}
	    		event.preventDefault();
  			}
  			
  			//Detect Swipe
  			function touchmove(event) {
        		var touches = event.originalEvent.touches;
        		if (touches && touches.length) {
          			var deltaX = X - touches[0].pageX;
          
	          		if (dX >= 50) {
	            		$this.trigger("swipeLeft");
	          		}
	          		if (dX <= -50) {
	            		$this.trigger("swipeRight");
	          		}
	          		
	          		if (Math.abs(dX) >= 50 || Math.abs(dY) >= 50) {
	            		$this.unbind('touchmove', touchmove);
	          		}
        		}
        		event.preventDefault();
      		}
      		
      		
      		//Testing the swipe
      		$this.on('swipeLeft', function(){
      			alert('swiped-left');
      		});
      		
      		$this.on('swipeRight', function(){
      			alert('swiped-right');
      		});
      		
      	}, //END initEventHandlers
      	
      	
      	/*
      	 * Function: slideTo
      	 */
      	slideTo: function (_this, id) {
      		
      		_this._$slides
  				.stop()
				.slideUp(this._defaults.fadeSpeed, function () {
					$(this).css(hide);
				})
				.eq(id)
					.css(show)
					.slideDown(this._defaults.fadeSpeed, function () {
						$(this).css(show);
					});
      		_this._index = id;
      	}
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );