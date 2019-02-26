# Tween Max 

## Frater
- 설정
- 사용법
- 메서드

![map](./src/map.png)


```
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js"></script>

    // 트윈 맥스는 포함이 되어 있음
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/plugins/CSSPlugin.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/easing/EasePack.min.js"></script>

// target을 10초 동안 설정값으로 변환
TweenMax.to( target , 10, {opacity: 0, y:40});

// target을 설정값으로 세팅후  10초동안  css값으로 변환
TweenMax.from( target , 10, {opacity: 0, y:40});
          
```

# step01 selector
```
// step 01   select!!!
var header = document.getElementById('header'),
    h1= document.getElementsByTagName('h1'),
    intro = document.getElementsByClassName("intro"),
    firstItem = document.getElementsByClassName('list')[0].firstElementChild;
    secondItem = document.getElementsByClassName('list')[0].children[1];
    lastItem = document.getElementsByClassName('list')[0].lastElementChild;

    TweenMax.to(lastItem, 1, {opacity: 0, x:50});
```
# step02 Method

```
    // TweenMax.to  = css값 시작 => tween max 값으로 모션
    TweenMax.to(img, 1, {x:200});

    // tweenMax.from 값부터 시작 = css 값으로
    TweenMax.from(img, 1, {x:200, delay:1});

    // tweenMax 값으로 시작, 끝 값 적용
    TweenMax.fromTo(img, 1, {x:20}, {x:400,y:200});

    //tweenMax.set = 세팅 설정 값
    TweenMax.set(img, {x: 200});
```

# step03 Easing

```
TweenMax.from(img, 1, {x:200, ease: Back.easeOut });

```

# step04 callback function

```
var img = $('img'),
    h2 = $('h2'),
    i=0;
    
    TweenMax.from(img, 1, {
        x:200,
        ease: Power1.easeInOut,
        onStart : onStart,// 시작할때
        onUpdate : onUpdate,  // 움직이고 있을때 계속 발생
        onComplete : onComplete,// 끝날때
     });

    function onStart(){
            console.log(' started');
    }
    function onUpdate(){
        console.log('progress');    
        h2.text(i++);    
    }
    function onComplete(){
        console.log('complete');        
    }
```


# step05 Multi object (  Timeline )

```
    var img = $('img'),
    h2 = $('h2'),
    h1 = $('h1'),
    intro = $('.intro'),
    listItem = $('ul li'),
    tl = new TimelineMax(); // new TimelineLite();


/* 
    TweenMax.from(h1, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut, delay: 0.2});
    TweenMax.from(intro, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut, delay: 0.4});
    TweenMax.from(img, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut, delay: 0.6});
    TweenMax.from(h2, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut, delay: 0.8});
    TweenMax.from(listItem, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut, delay: 1}); 
 */


// 순차적으로 실행 됨   , 뒤에 속도값을 제어 
  tl
    .from(h1, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut })
    .from(intro, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut}, '-=0.15')
    .from(img, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut}, '-=0.15')
    .from(h2, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut}, '-=0.15')
    .from(listItem, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut}, '-=0.15'); 


```

# step06 Timeline label

```
// add 레이블 삽입 : 레이블을 지정한 곳의 시점에서 애니매이션 진행
tl
.from(h1, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut })
.add('intro')
.from(intro, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut})
.from(img, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut}, 'intro')
.from(h2, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut}, 'intro+=3')
.from(listItem, 0.3, {y:-15, autoAlpha: 0, ease:Power1.easeOut}, 'intro'); 

```
# step07 playback ( paly, stop, pasue ... )

```
tl
.from(h1,1, {y:-15, autoAlpha: 0, ease:Power1.easeOut })
.from(intro,1, {y:-15, autoAlpha: 0, ease:Power1.easeOut})
.from(img,1, {y:-15, autoAlpha: 0, ease:Power1.easeOut})
.from(h2,1, {y:-15, autoAlpha: 0, ease:Power1.easeOut})
.from(listItem,1, {y:-15, autoAlpha: 0, ease:Power1.easeOut}); 

tl.pause();

$('#btnPlay').on('click',  function(){
    tl.play();
});
$('#btnPause').on('click',  function(){
    tl.pause();
});

$('#btnResume').on('click',  function(){
    tl.resume();
});

$('#btnReverse').on('click',  function(){
    tl.reverse();
});

$('#btnSpeedUp').on('click',  function(){
    tl.timeScale(8);  // default = 1
});

$('#btnSlowDown').on('click',  function(){
    tl.timeScale(0.5);
});

$('#btnSeek').on('click',  function(){
    tl.seek(1);// .seek('intro'); f레이블이나, 설정 한 곳으로 보내기
});

$('#btnProgress').on('click',  function(){
    tl.progress(0.5);  // 0~1  타임라인 설정값으로 보내기
});

$('#btnRestart').on('click',  function(){
    tl.restart();
});
```

# step08 staggerFromTo

```
// .staggerFrom(buttons, 0.2, {x: 200, ease:Power1.easeOut}, 0.1);
// .staggerTo(buttons, 0.2, {x: -200, ease:Power1.easeOut}, 0.1);
/* .staggerFromTo(buttons, 0.2, 
    {autoAlpha: 0, x: 10},
    {x: -20, autoAlpha: 1, ease:Power1.easeOut},
     0.1); */

     .staggerFrom(buttons, 1, 
        {cycle:{
            x:[50,-50],
            scale:[2,0.5]
        }, autoAlpha: 0, ease:Power1.easeOut}, 0.5);

     //   .staggerFromTo(dot, 0.3, { forVars }, { toVars} )

```

# step09 timelineLite, 

```
 tl = new TimelineMax({paused: true}) // new TimelineLite();  {paused: true} : 정지
    tlLoader = new TimelineMax({repeat: 2, onComplete: loadContent} );// repeat -1 : infinitly loop,  


    tlLoader
.staggerFromTo(dot, 0.3,
    {y:0, autoAlpha: 0},
    {y: 20, autoAlpha: 1, ease:Back.easeInOut}, 
    0.05
    )
    .fromTo(loader, 0.3,
        {autoAlpha:1, scale:1.3},
        {autoAlpha:0, scale:1, ease: Power0.easeNone},
        0.9
        );

        function loadContent(){
            console.log('contents')
        }

```

# step10 callback function

```
loader:

```

# step11 callback function

```

```