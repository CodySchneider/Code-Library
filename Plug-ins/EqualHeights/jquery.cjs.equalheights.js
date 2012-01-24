;(function( $ ) {
	$.fn.equalHeights = function(options) {

	    var opts = $.extend({}, $.fn.equalHeights.defaults, options);
	    var $elTallest, maxHeight = 0;
		
		if (opts.setHeight == 'auto') {
			this.each(function(){
				if ($(this).outerHeight() > maxHeight) { maxHeight = $(this).outerHeight();}
			});
		} else {
			maxHeight = opts.setHeight;
		};
		
		return this.each(function(){
			var minHeight = maxHeight - parseInt($(this).css('border-top-width')) - parseInt($(this).css('border-bottom-width')) - parseInt($(this).css('padding-top')) - parseInt($(this).css('padding-bottom'));
			$(this).css({'height': minHeight}); 
		});
	};
	
	$.fn.equalHeights.defaults = {
      'setHeight' : 'auto' //auto to match heights to tallest element, integer to declare height
    }
})( jQuery );