$.fn.equalHeights = function() {
	var Tallest = 0;
	$(this).each(function(){
		if ($(this).outerHeight() > Tallest) { Tallest = $(this).outerHeight();}
	});
	$(this).each(function(){
		var minHeight = Tallest - parseInt($(this).css('border-top-width')) - parseInt($(this).css('border-bottom-width')) - parseInt($(this).css('padding-top')) - parseInt($(this).css('padding-bottom'));
		$(this).css({'min-height': minHeight}); 
	});

	return this;
};