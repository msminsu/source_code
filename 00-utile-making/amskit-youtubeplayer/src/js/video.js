import loadYoutubeApi from "./load-youtube-api";

class video {
  constructor(el, videoId) {
    this.el = el;

    if (window.loadedYoutubeApi) {
      this.video = video.loadPlayer(el, videoId);
      this.setEvent();
    }
    else {
      loadYoutubeApi(el);
      $(window).on("readyYoutubeApi", () => {
        this.video = video.loadPlayer(el, videoId);
        this.setEvent();
      });
    }
  }

  setEvent() {
    this.video.addEventListener("onReady", () => this.el.trigger("canplay", this.video));

    const Event = {
      0: "ended",
      1: "play",
      2: "pause",
      3: "waiting",
    };

    this.video.addEventListener("onStateChange", e => {
      if (e.data == -1 || e.data == 5) return;
      this.el.trigger(Event[`${e.data}`]);
    });

    $(this.el).on("$play", () => this.play());
    $(this.el).on("$stop", () => this.stop());
    $(this.el).on("$pause", () => this.pause());
    $(this.el).on("$mute", () => this.mute());
    $(this.el).on("$unMute", () => this.unMute());
    $(this.el).on("$seek", (e, t) => this.seek(t));
  }

  play() {
    this.video.playVideo();
  }

  stop() {
    this.pause();
    this.seek(0);

    this.el.trigger("stop");
  }

  pause() {
    this.video.pauseVideo();
  }

  mute() {
    this.video.mute();
    this.el.trigger("mute");
  }

  unMute() {
    this.video.unMute();
    this.el.trigger("unMute");
  }

  seek(t) {
    this.video.seekTo(t);
  }

  static loadPlayer(el, videoId) {

    let uniqueId = Math.random().toString(36).substr(2, 9) + videoId;

    let template = `<div class="youtube-player__screen-wrap">
                      <div id="youtube-player__${uniqueId}" class="youtube-player__screen"></div>
                    </div>`;

    $(el.append(template));

    return new window.YT.Player(`youtube-player__${uniqueId}`, {
      width: "100%",
      height: "100%",
      videoId: videoId,
      playerVars: {
        rel: 0,
        showinfo: 0,
        controls: 0,
        playsinline: /(iphone)/i.test(navigator.userAgent.toLowerCase()) ? 0 : 1,
      },
    });
  }
}

export default video;
