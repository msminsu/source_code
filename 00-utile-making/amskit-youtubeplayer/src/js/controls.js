import AnimationFrame from "promokit-util/animationFrame";
import isMobile from "promokit-util/isMobile";

class Controls {
  constructor(el, video, videoId){
    this.el = el;
    this.video = video;
    this.DOM = Controls.render(el, videoId);
    this.DOM.context = el;
    this.AnimationFrame = new AnimationFrame(this.updateProgress.bind(this));
    
    this.state = {
      isPlay: false,
      controlImportant: false,
    };
    
    this.setEvent();
  }
  
  updateProgress(){
    let bar = (this.video.getCurrentTime() / this.video.getDuration()).toFixed(6);
    
    this.DOM.progressBar.css({
      "transform": `scaleX(${bar > 1 ? 1 : bar})`,
    });
  }
  
  setEvent(){
    this.el.on("play", () => {
      this.state.isPlay = true;
      this.AnimationFrame.start();
      
      this.DOM.context.addClass("youtube-player--play");
      this.DOM.context.removeClass("youtube-player--waiting");
      this.DOM.context.removeClass("youtube-player--ended");
      this.DOM.poster.addClass("youtube-player__controls-poster--hide");
      
      this.el.trigger("$controls.hide");
    });
    
    this.el.on("pause", () => {
      this.state.isPlay = false;
      this.AnimationFrame.stop();
      this.updateProgress();
      
      this.DOM.context.removeClass("youtube-player--play");
      this.DOM.context.removeClass("youtube-player--waiting");
      
      this.el.trigger("$controls.show");
    });
    
    this.el.on("ended", () => {
      this.state.isPlay = false;
      this.AnimationFrame.stop();
      this.updateProgress();
      
      this.DOM.context.addClass("youtube-player--ended");
      
      this.DOM.poster.removeClass("youtube-player__controls-poster--hide");
      this.DOM.context.removeClass("youtube-player--play");
      this.DOM.context.removeClass("youtube-player--waiting");
      this.el.trigger("$controls.show");
    });
    
    this.el.on("waiting ", () => {
      this.DOM.context.addClass("youtube-player--waiting");
    });
    
    this.el.on("fullscreenstart ", () => {
      this.DOM.context.addClass("youtube-player--fullscreen");
    });
    
    this.el.on("fullscreenend", () => {
      this.DOM.context.removeClass("youtube-player--fullscreen");
    });
    
    this.el.on("$mute", () => {
      this.DOM.context.addClass("youtube-player--mute");
    });
    
    this.el.on("$unMute", () => {
      this.DOM.context.removeClass("youtube-player--mute");
    });
    
    this.el.on("$controls.hide", () => {
      if(this.state.controlImportant) return;
      this.DOM.context.removeClass("youtube-player--show-controls");
    });
    
    this.el.on("$controls.show", () => {
      this.DOM.context.addClass("youtube-player--show-controls");
    });
    
    this.el.on("$stop", () => {
      this.state.isPlay = false;
      this.AnimationFrame.stop();
      
      this.DOM.poster.removeClass("youtube-player__controls-poster--hide");
      this.DOM.context.addClass("youtube-player--ended");
      this.DOM.context.removeClass("youtube-player--play");
      this.DOM.context.removeClass("youtube-player--waiting");
      this.el.trigger("$controls.show");
      
      this.DOM.progressBar.css({
        "transform": `scaleX(0)`,
      });
    });
    
    if(!isMobile()){
      this.el.on("mousemove", () => {
        if(!this.state.isPlay) return;
        
        clearTimeout(this.state.timer);
        
        this.el.trigger("$controls.show");
        
        this.state.timer = setTimeout(() => {
          if(!this.state.isPlay) return;
          if(this.state.controlImportant) return;
          
          this.el.trigger("$controls.hide");
        }, 1000);
      });
      
      this.DOM.progress.on("mouseover", () => {
        this.el.trigger("$controls.show");
        this.state.controlImportant = true;
      });
      this.DOM.progress.on("mouseout", () => {
        this.el.trigger("$controls.hide");
        this.state.controlImportant = false;
      });
    }
    
    this.DOM.play.on("click", () => {
      this.el.trigger("$play");
    });
    
    this.DOM.pause.on("click", () => {
      this.el.trigger("$pause");
    });
    
    this.DOM.fullscreenOn.on("click", () => {
      if(/(iphone)/i.test(navigator.userAgent.toLowerCase())){
        this.el.trigger("$play");
        this.el.trigger("$pause");
        return;
      }
      
      this.el.trigger("$fullscreen.start");
      this.DOM.context.addClass("youtube-player--fullscreen");
    });
    
    this.DOM.fullscreenOff.on("click", () => {
      this.el.trigger("$fullscreen.end");
      this.DOM.context.removeClass("youtube-player--fullscreen");
    });
    
    this.DOM.muteOn.on("click", () => {
      this.el.trigger("$mute");
    });
    
    this.DOM.muteOff.on("click", () => {
      this.el.trigger("$unMute");
    });
    
    this.DOM.progress.on("click", (e) => {
      this.state.controlImportant = true;
      
      if(isMobile()){
        this.hideTimer();
      }
      
      this.DOM.poster.addClass("youtube-player__controls-poster--hide");
      let progressWidth = this.DOM.progress.width();
      this.el.trigger("$seek", (1 - (progressWidth - e.offsetX) / progressWidth) * this.video.getDuration());
      this.DOM.progressBar.css({
        "transform": `scaleX(${e.offsetX / progressWidth})`,
      });
    });
    
    if(isMobile()){
      this.DOM.cover.on("click", () => {
        this.el.trigger("$controls.show");
        this.hideTimer();
      });
    }
  }
  
  hideTimer(){
    clearTimeout(this.state.hideTimer);
    
    this.state.hideTimer = setTimeout(() => {
      this.state.controlImportant = false;
      this.el.trigger("$controls.hide");
    }, 2000);
  }
  
  static render(el, videoId){
    let template = `<div class="youtube-player__controls">
            <div class="youtube-player__controls-poster" style="background:url('https://img.youtube.com/vi/${videoId}/sddefault.jpg') #000 no-repeat 50% 50%"></div>
            <div class="youtube-player__controls-spinner"></div>
            <div class="youtube-player__controls-progress">
              <div class="youtube-player__controls-progress-bar"></div>
            </div>
            <button class="youtube-player__controls-button youtube-player__controls-button--play">재생</button>
            <button class="youtube-player__controls-button youtube-player__controls-button--pause">정지</button>
            
            <button class="youtube-player__mute-button youtube-player__mute-button--off">
              <svg version="1.1" viewBox="0 0 36 36">
                <path d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"></path>
                <path d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z"></path>
              </svg>
            </button>
            
            <button class="youtube-player__mute-button youtube-player__mute-button--on">
              <svg version="1.1" viewBox="0 0 36 36" >
                <path d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"></path>
              </svg>
            </button>
            
            <button class="youtube-player__fullscreen-button youtube-player__fullscreen-button--off">
              <svg version="1.1" viewBox="0 0 36 36">
                <g><path d="m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z"></path></g>
                <g><path d="m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z"></path></g>
                <g><path d="m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z"></path></g>
                <g><path d="m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z"></path></g>
              </svg>
            </button>
            
            <button class="youtube-player__fullscreen-button youtube-player__fullscreen-button--on">
              <svg  version="1.1" viewBox="0 0 36 36" >
                <g><path d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"></path></g>
                <g><path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"></path></g>
                <g><path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"></path></g>
                <g><path d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"></path></g>
              </svg>
            </button>
        </div>
        <div class="youtube-player__controls-cover"></div>`;
    
    let controls = $(el.append(template));
    
    return {
      controls: controls.find(".youtube-player__controls"),
      cover: controls.find(".youtube-player__controls-cover"),
      spinner: controls.find(".youtube-player__controls-spinner"),
      poster: controls.find(".youtube-player__controls-poster"),
      progress: controls.find(".youtube-player__controls-progress"),
      progressBar: controls.find(".youtube-player__controls-progress-bar"),
      play: controls.find(".youtube-player__controls-button--play"),
      pause: controls.find(".youtube-player__controls-button--pause"),
      fullscreenOn: controls.find(".youtube-player__fullscreen-button--on"),
      fullscreenOff: controls.find(".youtube-player__fullscreen-button--off"),
      muteOn: controls.find(".youtube-player__mute-button--on"),
      muteOff: controls.find(".youtube-player__mute-button--off"),
    };
  }
}

export default Controls;
