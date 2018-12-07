$(document).ready(function () {
/*     $('body').TopBtn();
    $('.toggle-caution').Folding({open: true});
    $("[data-layer=open]").on('click',function(){
        $(this).blur();
    }); */
    window.pageMain.init();
    window.pageMain.activeTab(0);
});



window.pageMain = (function(){
        var tab;

        var init= function(num){
           /*  var $bar1 = $('.gauge1 i');
            var $bar2 = $('.gauge2 i');
            var rate1 = num*9;
            var rate2 = (num-100)*4;

            if(num > 100){
                if(num == 101){
                    $bar1.css({'width': '904px'});
                }else{
                    $bar1.css({'width': '910px'});
                }
                $bar2.css({'width': rate2 +'px'});
            }else{
                $bar1.css({'width': rate1 +'px'});
            }
 */
        };

        var tab = function(n){
            var n = n || 0;

            var $tablist = $('.tab__menu li');
            var $tabcons = $("[class *='week__con']");

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

        function activeTab(n){
            var $tablist = $('.tab__menu li');
            var $tabcons = $("[class *='week__con']");
            resetTab($tablist,$tabcons);
            $tablist.eq(n).addClass('active');
            $tabcons.eq(n).show();
        }

        function resetTab($tablist,$tabcons){
            $tablist.removeClass('active');
            $tabcons.find('input').prop('checked',false);
            $tabcons.find('li').removeClass('active');
            $tabcons.hide();
        }

        return {
            init:function(){
                tab();
            },
            gauge: function(num){
                if(num >= 125){
                    init(125);
                }else {
                    init(num);
                }
            },
            activeTab:function(n){
                activeTab(n);
            }

        }
    })();


