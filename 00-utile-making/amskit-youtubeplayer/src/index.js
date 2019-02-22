import "./index.scss";

import video from "./js/video";
import Controls from "./js/controls";
import FullScreen from "./js/fullscreen";

class YoutubePlayer {
  constructor(config){
    this.el = $(config.el);
    this.video = null;
    this.controls = null;

    this.config = {
      videoId: config.videoId,
      controls: true,
      autoplay: config.autoplay,
      poster: config.poster,
      loop: config.loop,
    };

    this.init();
  }

  init(){
    new video(this.el, this.config.videoId);

    this.on("canplay", (e, video) => {
      this.video = video;

      if(this.config.controls){
        this.controls = new Controls(this.el, this.video, this.config.videoId).DOM;
      }

      this.el.addClass("youtube-player--ready");

      /msie 10|msie 9/i.test(navigator.userAgent.toLocaleLowerCase()) && this.el.addClass("youtube-player--ie");

      if(this.config.loop){
        this.on("ended", () =>{
            this.pause();
            this.seek(0);
            this.play()
        });
      }

      if(this.config.autoplay){
        this.mute();
        this.play();
      }

      !/(iphone)/i.test(navigator.userAgent.toLowerCase()) && new FullScreen(this.el);
    });
  }

  on(e, eventListener){
    this.el.on(e, eventListener);
  }

  off(e){
    this.el.off(e);
  }

  play(){
    $(this.el).trigger("$play");
  }

  stop(){
    $(this.el).trigger("$stop");
  }

  pause(){
    $(this.el).trigger("$pause");
  }

  mute(){
    $(this.el).trigger("$mute");
  }

  unMute(){
    $(this.el).trigger("$unMute");
  }

  seek(t){
    $(this.el).trigger("$seek", t);
  }

  enabledFullScreen(){
    $(this.el).trigger("$fullscreen.start");
  }

  disabledFullScreen(){
    $(this.el).trigger("$fullscreen.end");
  }

  get duration(){
    return this.video.getDuration();
  }

  get currentTime(){
    return this.video.getCurrentTime();
  }
}

export default YoutubePlayer;
