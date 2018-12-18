const CoachMarks = (settings) =>{
    if(!getCookie('CoachMarkInfo')){
        if (settings.direction === 'vertical') {
            $('body').append('<div class="guide">상하로 이동하세요.</div>');
        }
        else {
            $('body').append('<div class="guide horizental">좌우로 이동하세요.</div>');
        }

        const $guide = $('.guide');

        setTimeout(function () {
            if ($guide.length) $guide.fadeOut(function () {
                $(this).remove()
            });
        }, 2000);

        $(window).on('touchstart', function () {
            $guide.fadeOut(function () {
                $(this).remove()
            });
        });

        if (settings.cookie) {
            nc.promokit.cookie.setcookie('CoachMarkInfo', true);
        }
    }
}

export default CoachMarks;