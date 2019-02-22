$(document).ready(function () {
    // $('body').TopBtn();
    // $('.toggle-caution').Folding({open: true});
    // $("[data-layer=open]").on('click',function(e){
    //     $(this).blur();
    // });

    window.pageMain.init();

});


window.pageMain = (function() {


    var $direct =$('.btn-link-direct');
    var $window = $(window);
    var currentPos = $window.scrollTop();
    var startPoint = $('#header').height()-50;


    var gopage = function(){
        positionChk();
        scrollEvt();
        goPageEvt();

    };


    var positionChk = function(){
        if(currentPos >= startPoint) {
            $direct.stop().animate({top:currentPos+50},700)
        }
    };
    var scrollEvt = function(){
        $window.on('scroll',function(){

            var nowPos = $(this).scrollTop();
            if ( nowPos  >= startPoint){
                $direct.stop().animate({top:nowPos+50},700)
            }else{
                $direct.stop().animate({top:800},700)
            }

        });
    };

    var goPageEvt = function(){
        $direct.on('click', function(e){
            e.preventDefault();
            $('html, body').stop()
                .animate({
                    scrollTop : $('.section4').offset().top
                },900);
        });
    };

    return {
        init: function () {
            gopage();

        }
    }
})();