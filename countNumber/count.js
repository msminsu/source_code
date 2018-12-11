$(document).ready(function(){

    PageMain.init();
});



var PageMain = (function(){

    var init = function(){
        var $num =  $('.num');
        var $nums =  $('span');
        var count = 0;
            var arr = []
            for(var i = 0; i< 10 ; i++ ){
                arr.push(i*-23);
            }


            for(var j=0; j<10; j++){
                var elem = $nums[j];
                TweenMax.to(elem, .4, {
                    backgroundPosition:"0 0px",
                    ease: Linear.easeNone,
                    repeat: j,
                    onComplete:function(){
                        onRepeat();
                    }
                });
            }

            
            function onRepeat(){
                count++;
                console.log(count)
            }

            
      /*   TweenMax.to($num, 1, {
            backgroundPosition:"0 0px",
            //force3D:true,
            //rotation:0.01,
            // z:0.01,
            // autoRound:false,
            repeat: 1,
            onComplete:function(){
                this.restart();
            }
            ease: Linear.easeNone 
        }); */
    }

    return {
        init: init
    }
})();