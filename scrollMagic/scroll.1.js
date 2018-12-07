/* var controller = new ScrollMagic.Controller({
   globalSceneOptions: {
     duration: $('.scen').height(),
     triggerHook: .025,
     reverse: true1
   }
 }); */


 $(function() {

   var tomato0 = $('.tomato0'),
    banana0 = $('.banana0'),
    tomato1 = $('.tomato1'),
    banana1 = $('.banana1'),
    tomato2 = $('.tomato2'),
    banana2 = $('.banana2'),
    tomato3 = $('.tomato3'),
    banana3 = $('.banana3'),
    tomato4 = $('.tomato4'),
    banana4 = $('.banana4'),
    tl0 = new TimelineMax(),
   tl1 = new TimelineMax(),
   tl2 = new TimelineMax(),
   tl3 = new TimelineMax(),
   tl4 = new TimelineMax();

   tl0.to(tomato0,1 ,{left:200, ease:Back.easeOut})
    .add('up',"-=0.5")
    .to(tomato0,1,{top:70}, "up")
    .to(banana0, 1,{top:300}, "up")
    .to(tomato0, 1,{left:500,top:100}, "+=1")
    .to(banana0, 1,{left:400,top:350}, '-=1.5');

    tl1.to(tomato1,1 ,{left:200, ease:Back.easeOut})
    .add('up',"-=0.5")
    .to(tomato1,1,{top:70}, "up")
    .to(banana1, 1,{top:167}, "up")
    .to(tomato1, 1,{left:500}, "+=1")
    .to(banana1, 1,{top:550}, '-=1.5');

    tl2.to(tomato2,1 ,{left:200, ease:Back.easeOut})
    .add('up',"-=0.5")
    .to(tomato2,1,{top:70}, "up")
    .to(banana2, 1,{top:167}, "up")
    .to(tomato2, 1,{top:300}, "+=1")
    .to(banana2, 1,{left:550}, '-=1.5');


    tl3.to(tomato3,1 ,{left:200, ease:Back.easeOut})
    .add('up',"-=0.5")
    .to(tomato3,1,{top:70}, "up")
    .to(banana3, 1,{top:167}, "up")
    .to(tomato3, 1,{left:300,backgroundColor:'red'}, "+=1")
    .to(banana3, 1,{top:350}, '-=1.5');


    tl4.to(tomato4,1 ,{left:200, ease:Back.easeOut})
    .add('up',"-=0.5")
    .to(tomato4,1,{top:70}, "up")
    .to(banana4, 1,{top:167}, "up")
    .to(tomato4, 1,{left:300}, "+=1")
    .to(banana4, 1,{top:350}, '-=1.5');



   // Init Controller
   var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        duration: $('.scen').height(),
        triggerHook: .7,
        reverse: false
      }
    });



  /*   var scenes = {
      'scene1': {
        'nav-1': 'nav1'
      },
      'scene2': {
        'nav-2': 'nav2'
      },
      'scene3': {
        'nav-3': 'nev3'
      },
      'scene4': {
        'nav-4': 'nav4'
      }
    }

    for(var key in scenes) {
      // skip loop if the property is from prototype
      if (!scenes.hasOwnProperty(key)) continue;
    
      var obj = scenes[key];
    
      for (var prop in obj) {
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(prop)) continue;
    
        new ScrollMagic.Scene({ triggerElement: '#' + prop })
            .setClassToggle('#' + obj[prop], 'active')
            .addTo(controller);
      }
    } */


var scene1 = new ScrollMagic.Scene({ triggerElement: '#nav-1'})
// .addIndicators()
.setClassToggle('#nav1', 'active')
.on('start',function(){ console.log('leve')})
.on('end',function(){ console.log('enter')})
.setTween(tl1);

var scene2 = new ScrollMagic.Scene({ triggerElement: '#nav-2'})
// .addIndicators()
.setClassToggle('#nav2', 'active')
.setTween(tl2);

var scene3 = new ScrollMagic.Scene({ triggerElement: '#nav-3'})
// .addIndicators()
.setClassToggle('#nav3', 'active')
.setTween(tl3);

var scene4 = new ScrollMagic.Scene({ triggerElement: '#nav-4'})
// .addIndicators()
.setClassToggle('#nav4', 'active')
.setTween(tl4);



controller.addScene([
   scene1,
   scene2,
   scene3,
   scene4
 ]);

 controller.scrollTo(function(target) {

   TweenMax.to(window, 0.5, {
     scrollTo : {
       y : target,
       autoKill : true // Allow scroll position to change outside itself
     },
     ease : Cubic.easeInOut
   });
});

 
      
/* var _nav = $('.aside ul li a');

_nav.on('click', function(e) {
  var target = e.target,
      id     = target.getAttribute('href');


  if(id !== null) {
    if(id.length > 0) {
      e.preventDefault();
      controller.scrollTo(id);

      if(window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }
  }
}); */

$(document).on('click','.aside a[href^="#"]',function(e){
   var id = $(this).attr('href');
   
   if($(id).length>0){
   
      e.preventDefault();
      controller.scrollTo(id);

      if(window.history && window.history.pushState){
         history.pushState("",document.title, id);
      }
   }
})
 

});


