$(document).ready(function () {
    $('body').TopBtn();
    $('.toggle-caution').Folding({open: true});
    $("[data-layer=open]").on('click',function(e){
        $(this).blur();
    });
    window.pageMain.init();
    window.pageMain.activeTab(0);
    nc.promokit.layer.open('#layer-9');
});


window.pageMain = (function(){
    var init = function(){
            tooltip();
            tab1();
    };

    var tooltip = function(){
        var $tip = $('[class *= tip]');

        $tip.on('mouseenter',function(){
            $(this).next().stop().fadeIn();
        });
        $tip.on('mouseleave',function(){
            $(this).next().stop().fadeOut();
        });

    };


    var tab1 = function(n){
        var n = n || 0;

        var $tablist = $('.week-tab li');
        var $tabcons = $(".week-con");

        $tabcons.eq(0).show();

        $tablist.on('click',function(e){
            e.preventDefault();

            if($(this).hasClass('active')) return;

            var target =  $(this).index();

            resetTab($tablist,$tabcons);
            $tablist.eq(target).addClass('active');
            $tabcons.eq(target).show();
        });
    }

    function resetTab($tablist,$tabcons){
        $tablist.removeClass('active');
        $tabcons.find('input').prop('checked',false);
        $tabcons.find('li').removeClass('active');
        $tabcons.hide();
    }

    function activeTab(n){
        var $tablist = $('.week-tab li');
        var $tabcons = $(".week-con");
        resetTab($tablist,$tabcons);
        $tablist.eq(n).addClass('active');
        $tabcons.eq(n).show();
    }


    return {
        init : init,
        activeTab: function(n){
            activeTab(n);
        }
    }
})();