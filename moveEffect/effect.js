var $eff1 = $(".section-1 li").eq(0);
var $eff2 = $(".section-1 li").eq(1);
var $eff3 = $(".section-1 li").eq(2);
var $eff4 = $(".section-1 li").eq(3);



var _ua=window.navigator.userAgent.toLowerCase();
var _IE=false;
var _IEver=0;

if (_ua.indexOf("msie") != -1) {
    _IE = true;
    _ua.match(/msie (\d+\.\d)/);
    _IEver = parseFloat(RegExp.$1);
}


function moveBox() {
    //filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/webapp/mod/img/main/effect1.png', sizingMethod='crop');
    //filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/webapp/mod/img/main/effect2.png', sizingMethod='crop');
    var effectObj1={};
    var effectObj2={};
    var effectObj3={};
    var effectObj4={};
/* 
    if(_IE==true ){
        if(_IEver<=8){
            $eff1.css("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/webapp/mod/img/main/effect1.png', sizingMethod='crop')" );
            $eff2.css("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/webapp/mod/img/main/effect2.png', sizingMethod='crop')" );
            effectObj1={ css: { left: (Math.random()*550), top: (Math.random()*500)-400 }, ease:Power0.easeNone };
            effectObj2={ css: { left: (Math.random()*400)+900, top: (Math.random()*500) }, ease:Power0.easeNone};
        }else{
            effectObj1={ css: { left: (Math.random()*550), top: (Math.random()*500)-400, rotation: Math.random() * 270 }, ease:Power0.easeNone };
            effectObj2={ css: { left: (Math.random()*400)+900, top: (Math.random()*500), rotation: Math.random() * 360 }, ease:Power0.easeNone};
        }
    }else{
        effectObj1={ css: { left: (Math.random()*550), top: (Math.random()*500)-400, rotation: Math.random() * 270 }, ease:Power0.easeNone };
        effectObj2={ css: { left: (Math.random()*400)+900, top: (Math.random()*500), rotation: Math.random() * 360 }, ease:Power0.easeNone};
    } */

// left , top  값 보다 x, y 값으로 해야 좀더 부드럽고 최적화가 됨
    effectObj1={ css: { x: (Math.random()*200), y: (Math.random()*200)}, ease:Power0.easeNone };
    effectObj2={ css: { x: (Math.random()*200), y: (Math.random()*200)}, ease:Power0.easeNone};
    effectObj3={ css: { x: (Math.random()*200), y: (Math.random()*200)}, ease:Power0.easeNone };
    effectObj4={ css: { x: (Math.random()*200), y: (Math.random()*200)}, ease:Power0.easeNone};

    TweenMax.to($eff1, 4, effectObj1);
    TweenMax.to($eff2, 4, effectObj2);
    TweenMax.to($eff3, 4, effectObj3);
    TweenMax.to($eff4, 4, effectObj4);
}

moveBox();
setInterval(moveBox,1000);
















var $2eff1 = $(".section-1-2 li").eq(0);
var $2eff2 = $(".section-1-2 li").eq(1);
var $2eff3 = $(".section-1-2 li").eq(2);
var $2eff4 = $(".section-1-2 li").eq(3);


function makeRandom(min, max){
    var RandVal = Math.random() * (max- min) + min;
    return Math.floor(RandVal);
}
var target = {
    one:{ x : $2eff1.position().left , y: $2eff1.position().top},
    two:{ x : $2eff2.position().left , y: $2eff2.position().top},
    three:{ x : $2eff3.position().left , y: $2eff3.position().top},
    four:{ x : $2eff4.position().left , y: $2eff4.position().top},
}



function dongdong( target,range){
var y_pos = Math.floor( Math.random()*50- range);
// var y_pos =Math.random()*70-50;
    TweenMax.to( target, 4, {/*  x: x_pos, */ y: y_pos, ease:Power0.easeInOut});
    // .fromTo($(".title"),  0.2, { scale:5.5, alpha:0},{ scale:1, alpha:1,ease:Power2.easeOut}, "-=0.1")

}

// console.log(makeRandom(x_min,x_max))
setInterval(function(){ 
    dongdong( $eff1, 20); 
    dongdong( $eff2, 20); 
    dongdong( $eff3, 20); 
    dongdong( $eff4, 20); 
}, 1000);
/* 

function dongdong( target, range){
   var amount  = Math.random() *range + range;
   var amount2  = Math.random() *range + range;
 
    TweenMax.to( target, 2, {x: amount, y: amount2,  ease:Back.easeNone});

}

setInterval(function(){
    dongdong( $2eff1, 30);
    dongdong( $2eff2, 30);
    dongdong( $2eff3, 30);
    dongdong( $2eff4, 30);
},500);