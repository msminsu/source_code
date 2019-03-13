# amskit-youtubeplayer

> amskit youtube player

<br>

## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

<br>

## Install
```
npm install --save amskit-youtubeplayer
```

<br>

## Usage
load js module
```
// ES6 modules  
import VideoPlayer from "amskit-youtubeplayer"

var player1 = new YoutubePlayer({
  el: "#player1",
  videoId: "q1b0SfgV0Z4",
  loop: true,
  autoplay: true,
});
```

<br>

## Options
| param | type |  default | description |
| ----- | ----- | ----- | ----- |
| el | String |  |ID selector |
| videoId | String | |video url |
| loop | Boolean | false |video infinite loop |
| autoplay | Boolean | false |autoplay with mute |

<br>

## Event
| name | description |
| ----- | ----- |
| play | 재생 |
| pause | 멈춤 |
| stop | 정지 |
| ended | 끝 |
| mute | 음소거 |
| unMute | 음소거 해제 |
| fullscreenstart | 전체화면 시작 |
| fullscreenend | 전체화면 종료 |
| canplay | 재생가능 |

<br>
    
## Event trigger
.on(event, fn)  
.off(event)
```

// ES6 modules  
import VideoPlayer from "amskit-youtubeplayer"

var player1 = new YoutubePlayer({
  el: "#player1",
  videoId: "q1b0SfgV0Z4",
  loop: true,
  autoplay: true,
});


player1.on("canplay", ()=>{
    console.log("canplay")
})  
```

<br>

## API
| name | description |
| ----- | ----- |
| play() | 재생 |
| pause() | 멈춤 |
| stop() | 정지 |
| seek(sec) | sec 초로 이동 |
| mute() | 음소거 |
| unMute() | 음소거종료 |
| enableFullScreen() | 전체화면 시작 |
| disabledFullScreen() | 전체화면 종료 |
