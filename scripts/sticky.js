function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $('#filter_scroll').addClass('stick');
        $('#sticky-anchor').height($('#filter_scroll').outerHeight());
    } else {
        $('#filter_scroll').removeClass('stick');
        $('#sticky-anchor').height(0);
    }
}

$m.onReady(function(){
	$(function() {
	    $(window).scroll(sticky_relocate);
	});
});