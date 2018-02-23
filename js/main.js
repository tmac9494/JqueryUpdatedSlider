$(document).ready(function() {
//------------------trent's slider
function tRunSlider(sliderName) {
	$(sliderName).addClass('trent-slider');
	$offset = $(sliderName).width();
	$tSlideInStyles = {left: '0', right: '0'}
	$t_loadBarStopStyles = {animation : "none", width : "0%"}
	$hiddenSlideStylesRight = {left: $offset, right: 0 - $offset}
	$hiddenSlideStylesLeft = {right: $offset, left: 0 - $offset}

	//slider functions
	function setTextSlideHeight()  {
		if ($(sliderName).hasClass('text-slider')) {
			if ($(window).width() >= 768 ) {
				$(''+ sliderName +'.text-slider').css('height', $(''+ sliderName +' .current-t-slide .t-slide-content').height() + 245);
				if ($(''+ sliderName +'.text-slider').hasClass('small-slider')) {
					$(''+ sliderName +'.text-slider.small-slider').css('height', $(''+ sliderName +' .current-t-slide .t-slide-content').height() + 100);
				}
			} else {
				$(''+ sliderName +'.text-slider').css('height', $(''+ sliderName +' .current-t-slide .t-slide-content').height() + 70);
			}
		}
	}

	function tStartLoadBar() {$(''+ sliderName +' .t-load-bar .inner-load-bar').css('animation', 'load 4.5s linear infinite');}

	function tSliderHasStopped() {
		if ($('.current-t-slide').css('left') === "0px" && $(''+ sliderName +' .current-t-slide').css('right') === "0px") {
			return true;
		} else {
			return false;
		}
	}

	function tSlideChangerRight() {
		if ($(''+ sliderName +' .current-t-slide').next().hasClass('t-slide') && tSliderHasStopped()) {
			$(''+ sliderName +' .current-t-slide').removeClass('current-t-slide').css($hiddenSlideStylesLeft).next().css($tSlideInStyles).addClass('current-t-slide');
			$(''+ sliderName +' .current-dot').removeClass('current-dot').next().addClass('current-dot');
			setTextSlideHeight();
		} else if (tSliderHasStopped()) {
			$(''+ sliderName +' .current-t-slide').removeClass('current-t-slide');
			$(''+ sliderName +' .t-slide').first().addClass('current-t-slide').css($tSlideInStyles);
			tSetCss();
			$(''+ sliderName +' .current-dot').removeClass('current-dot')
			$(''+ sliderName +' .t-dot').first().addClass('current-dot');
			setTextSlideHeight();
		}
	}
	function tSlideChangerLeft() {
		if ($(''+ sliderName +' .current-t-slide').prev().hasClass('t-slide') && tSliderHasStopped()) {
			$(''+ sliderName +' .current-t-slide').removeClass('current-t-slide').css($hiddenSlideStylesRight).prev().css($tSlideInStyles).addClass('current-t-slide');
			$(''+ sliderName +' .current-dot').removeClass('current-dot').prev().addClass('current-dot');
			setTextSlideHeight();
		} else if (tSliderHasStopped()) {
			$(''+ sliderName +' .current-t-slide').removeClass('current-t-slide');
			$(''+ sliderName +' .t-slide').last().addClass('current-t-slide').css($tSlideInStyles);
			tSetCssLeft();
			$(''+ sliderName +' .current-dot').removeClass('current-dot')
			$(''+ sliderName +' .t-dot').last().addClass('current-dot');
			setTextSlideHeight();
		}
	}

	function tSetCss() {
		$(''+ sliderName +' .t-slide').each(function(index, value) {
			if (index > 0) {
				$(this).css($hiddenSlideStylesRight);
			}
		});
	}
	function tSetCssLeft() {
		$t_total = $(''+ sliderName +' .t-slide').length - 1;
		$(''+ sliderName +' .t-slide').each(function(index, value) {
			if (index < $t_total) {
				$(this).css($hiddenSlideStylesLeft)
			}
		});
	}


	//populate dots for every slide
	$(''+ sliderName +' .t-slide').each(function(index, value) {
		$(''+ sliderName +' .t-slide-dots').append('<div class="t-dot"></div>');
		if (index === 0) {$(''+ sliderName +' .t-dot').first().addClass('current-dot')}
	});

	//slider-code
	$tSliderHeight = $(''+ sliderName +'.trent-slider').width() / 2;
	if ($tSliderHeight > 650) {
		$('.t-slide').each(function(index, value) {
				$src = $('.t-slide').eq(index).find('img').attr('src');
				$slideBgStyles = {backgroundImage: 'url(' + $src + ')', backgroundSize: 'cover',backgroudRepeat: 'no-repeat',backgroundPosition: 'center'}
				$(this).css($slideBgStyles);
				$(this).find('img').first().hide();
		});
		$tSliderHeight = 650;
	}
	$(sliderName).css('height', $tSliderHeight);
	setTextSlideHeight();
	tSetCss();
	//load bar 
	tStartLoadBar();
	$(sliderName).hover(function() {$(''+ sliderName +' .t-load-bar .inner-load-bar').css($t_loadBarStopStyles);}, function() {tStartLoadBar()})
	//interval sllide change
	var tSlideChange = window.setInterval(function() {
		tSlideChangerRight();
	}, 4500);
	$(sliderName).mouseover(function() {
		clearInterval(tSlideChange);
	}).mouseout(function() {
		$(''+ sliderName +' .t-load-bar .inner-load-bar').css($t_loadBarStopStyles);
		tStartLoadBar();
		clearInterval(tSlideChange);
		tSlideChange = window.setInterval(function() {
			tSlideChangerRight();
		},4500);
	});

	// -----slider controls
	//arrow
	$(''+ sliderName +' .t-slider-controls .arrow').click(function() {
		if ($(this).hasClass('right-arrow')) {tSlideChangerRight();}
		else if ($(this).hasClass('left-arrow')) {tSlideChangerLeft();}
	});
	//dots 
	$(''+ sliderName +' .t-slide-dots .t-dot').click(function() {
		$newDotIndex = $(this).index();
		$currentDotIndex = $(''+ sliderName +' .current-dot').index();
		if (tSliderHasStopped()) {
			$(''+ sliderName +' .t-slide').each(function(index, value) {
				$(''+ sliderName +' .current-dot').removeClass('current-dot');
				$(''+ sliderName +' .current-t-slide').removeClass('current-t-slide');
				$(''+ sliderName +' .t-dot').eq($newDotIndex).addClass('current-dot');
				$(''+ sliderName +' .t-slide').eq($newDotIndex).css($tSlideInStyles).addClass('current-t-slide');
				if (index > $newDotIndex) {
					$(this).css($hiddenSlideStylesRight);
				} else if (index < $newDotIndex) {
					$(this).css($hiddenSlideStylesLeft);
				}
			});
			setTextSlideHeight();
		}
	});
}//close slider JS

tRunSlider('.main-slider')
tRunSlider('.secondary-slider');
tRunSlider('.third-slider');
});