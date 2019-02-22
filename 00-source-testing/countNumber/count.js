$(document).ready(function(){

    PageMain.init();
});



var PageMain = (function(){

    var init = function(){
        var $num =  $('.num');
        var $nums =  $('span');
        var count = 0;
        var arr = [];

        /* $nums.each(function(i){
           console.log($(this).text());
        }); */

        
       
            for(var i = 0; i< 10 ; i++ ){
                arr.push(i*-23);
            }

            



            for(var j=0; j<$nums.length; j++){
                var elem = $nums.eq(j);
                var val = elem.text();
                
            
                TweenMax.to(elem, .3, {
                    backgroundPosition:"0 0px",
                    ease: Linear.easeNone,
                    repeat: j,
                    onComplete:function(){
                        console.log(this._repeat+1);
                        stopPosition(this.target,this.target.text(),this._repeat+1)
                        
                    }
                });
            }

            
            function stopPosition(elem, val, t){
                
                if(val> 6){
                    t = 1
                }

                TweenMax.fromTo(elem, 0.5, {
                    backgroundPosition:"0 -216px",
                },
                {
                    backgroundPosition:"0 "+arr[val]+"px",
                    ease: Linear.easeOut,
                }
                );
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