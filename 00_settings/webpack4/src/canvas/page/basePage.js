export default class BasePage{
    constructor(info) {
        this.key = info.key;
        this.ele = info.ele;
        this.pageType = info.pageType;
        this.showClass = info.showClass;
        this.showMotion = new TimelineMax({paused: true, onComplete:()=>{this._showComplete()}});
        this.hideMotion = new TimelineMax({paused: true});
        this.w = window.innerWidth;
        this.h = window.innerHeight;


    }
    _motionSet(){
        this.hideMotion
            .to(this.ele, 1, {autoAlpha: 0, ease: Quart.easeOut})
            .call(()=>{this._hidetComplete()}, null, null, '-=0.5');

        this.showMotion
            .to(this.ele, 1, {autoAlpha:1, ease: Quart.easeOut});
    }

    show(){
        TweenLite.set(this.ele, {css:{className:`+=${this.showClass}`}});
        this.showMotion.seek(0);
        this.showMotion.play();
    }

    _showComplete(){
        this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'showComplete', key:this.key}}));
    }

    hide(){
        this.hideMotion.seek(0);
        this.hideMotion.play();
    }

    _hidetComplete(){
        TweenLite.set(this.ele, {css:{className:`-=${this.showClass}`}});
        this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'hideComplete', key:this.key}}));
    }

}
