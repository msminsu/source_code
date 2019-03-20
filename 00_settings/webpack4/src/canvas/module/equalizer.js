export default class Equalizer{
    constructor(opts) {
        this.parent = document.querySelector(opts.parent);
        this.children = this.parent.querySelectorAll(opts.children);
        this.btn = document.querySelector(opts.btn);
        this.url = opts.url;
        this.volume = opts.volume;
        this.isPlay = opts.autoPlay;
        this.audio = $("[data-media='audio']");

        this._setAudio();
        this._eqAction(this.isPlay);
        this.btn.addEventListener('click', ()=>{
            this.isPlay = !this.isPlay;
            this._eqAction(this.isPlay);
        });
    }

    _eqAction(play){
        if(play){
            $(this.children).removeClass("stop");
            this.audio[0].play();
            $(this.btn).addClass("on");
        }else{
            $(this.children).addClass("stop");
            this.audio[0].pause();
            $(this.btn).removeClass("on");
        }
    }
    _setAudio(){
        $(this.audio).append("<source src='"+this.url+"' type='audio/mpeg' />");
        this.audio[0].volume = this.volume;
        this.audio[0].loop = true;
    }

    pause(){
        this._eqAction(false);
    }

    play(){
        this._eqAction(this.isPlay);
    }
}
