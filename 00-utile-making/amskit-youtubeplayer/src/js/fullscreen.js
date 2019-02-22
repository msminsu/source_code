import screenfull from "screenfull";

const oldIE = () => {
  return /msie 10|msie 9/i.test(navigator.userAgent.toLocaleLowerCase());
};

class FullScreen {
  constructor(el){
    this.el = el;
    
    this.setEvent();
  }
  
  setEvent(){
    if(oldIE()) return;
    
    screenfull.on("change", () => {
      if(screenfull.isFullscreen){
        this.el.trigger("fullscreenstart");
      }
      else {
        this.el.trigger("fullscreenend");
      }
    });
    
    this.el.on("$fullscreen.start", () => this.enabled());
    this.el.on("$fullscreen.end", () => this.disabled());
  }
  
  enabled(){
    if(oldIE()){
      $(window).on("keydown.fullscreen", e => {
        if(e.keyCode == "27"){
          this.disabled();
        }
      });
      
      this.el.trigger("fullscreenstart");
      return;
    }
    
    screenfull.request(this.el[0]);
  }
  
  disabled(){
    if(oldIE()){
      $(window).off("keydown.fullscreen");
      this.el.trigger("fullscreenend");
      return;
    }
    
    screenfull.exit();
  }
}

export default FullScreen;
