import environment from '../util/environment.js';

export default class BasePage{
    constructor(info, controll) {
        this.key = info.name;
        this.ele = info.ele;
        this.pageType = info.pageType;
        this.showClass = info.showClass;
        this.static = "/"
        this._init();
        this.showMotion = new TimelineMax({paused: true, onComplete:this._showComplete, onCompleteParams:[this]});
    }

    _init(){
        switch(environment()) {
            case 'live':
                // this.static = './src/img/live';
                this.static = './img';
                break;

            case 'rc':
                // this.static = './src/img/rc';
                this.static = './img';
                break;

            case 'local':
                // this.static = './src/img/local';
                this.static = './img';
                break;
        }
    }

    show(){
        TweenLite.set(this.ele, {css:{className:`+=${this.showClass}`}});
        TweenMax.to(this.ele, 0.5, {opacity:1, onComplete:this._showComplete, onCompleteParams:[this]});
    }
    _showComplete(thisv){
        thisv.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'showComplete', key:thisv.key}}));
    }
    hide(){
        TweenMax.to(this.ele, 0.5, {opacity:0, onComplete:this._hidetComplete, onCompleteParams:[this]});
    }
    _hidetComplete(thisv){
        TweenLite.set(thisv.ele, {css:{className:`-=${thisv.showClass}`}});
        thisv.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'hideComplete', key:thisv.key}}));
    }
}
