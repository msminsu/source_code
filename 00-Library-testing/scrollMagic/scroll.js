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
   tl1 = new TimelineMax(),
   tl2 = new TimelineMax(),
   tl3 = new TimelineMax(),
   tl4 = new TimelineMax();

    tl1.to(tomato1,1 ,{left:200, ease:Back.easeOut})
    .add('up',"-=0.5")
    .to(tomato1,1,{top:70}, "up")
    .to(banana1, 1,{top:167}, "up")
    .to(tomato1, 1,{left:300}, "+=1")
    .to(banana1, 1,{top:350}, '-=1.5');

    tl2.to(tomato2,1 ,{left:200, ease:Back.easeOut})
    .add('up',"-=0.5")
    .to(tomato2,1,{top:70}, "up")
    .to(banana2, 1,{top:167}, "up")
    .to(tomato2, 1,{left:300}, "+=1")
    .to(banana2, 1,{top:350}, '-=1.5');


    tl3.to(tomato3,1 ,{left:200, ease:Back.easeOut})
    .add('up',"-=0.5")
    .to(tomato3,1,{top:70}, "up")
    .to(banana3, 1,{top:167}, "up")
    .to(tomato3, 1,{left:300}, "+=1")
    .to(banana3, 1,{top:350}, '-=1.5');


    tl4.to(tomato4,1 ,{left:200, ease:Back.easeOut})
    .add('up',"-=0.5")
    .to(tomato4,1,{top:70}, "up")
    .to(banana4, 1,{top:167}, "up")
    .to(tomato4, 1,{left:300}, "+=1")
    .to(banana4, 1,{top:350}, '-=1.5');



   // Init Controller
   var controller = new ScrollMagic.Controller();

/*    var ourScene = new ScrollMagic.Scene({
   triggerElement:'#nav-1',
   triggerHook:.5,   // 브라우저 크기 영역 비율, 훅위치
   reverse: false

   })
   .setClassToggle('.box2', 'fade-in')
   .addIndicators({
      name:'fade scene',
      colorTrigger:'black',
      indent: 100,
      colorStart: 'red'
   })
   .addTo(controller); */

/* $('nav ul li').each(function(i){
   var ourScen = new ScrollMagic.Scene({
      triggerElement : this.children[0],
      triggerHook: 0.8
   })
   .setTween(tl)
   .setClassToggle('.box2', 'fade-in')
  .addIndicators({
      name:'fade scene',
      colorTrigger:'black',
      indent: 100,
      colorStart: 'red'
   }) 
   .addTo(controller);
}); */



var scene1 = new ScrollMagic.Scene({
   triggerElement:'.box1',
   triggerHook:0.8,
   reverse: false
})
.addIndicators()
.setTween(tl1)

var scene2 = new ScrollMagic.Scene({
   triggerElement:'.box2',
   triggerHook:0.2,
   duration: "500px"
})
.addIndicators()
.setTween(tl2)

var scene3 = new ScrollMagic.Scene({
   triggerElement:'.box3',
   triggerHook:0,
   duration: "200px"
})
.addIndicators()
.setTween(tl3)

var scene4 = new ScrollMagic.Scene({
   triggerElement:'.box4',
   triggerHook:0,
   duration: "10px"
})
.addIndicators()
.setTween(tl4)


controller.addScene([
   scene1,
   scene2,
   scene3,
   scene4
 ]);
      
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
 

});


