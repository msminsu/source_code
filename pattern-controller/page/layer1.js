import BasePage from  './basePage.js';

export default class Layer1 extends BasePage{
    constructor(info){
        super(info);

        this._motionSet();
    }
    _init(){
        $(this.ele).find('.btn-close-layer').on('click', ()=>{
            this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'hideLayer', key:'layer1'}}));
        })
    }
    _motionSet(){

        this.showMotion
            .fromTo(this.ele, 2, {scale: 1.1, autoAlpha:0, y:0}, {autoAlpha:1, scale: 1, y:0, ease: Quart.easeOut})
            .fromTo(this.ele.querySelector('.txt-1'), 0.7, {y:-50, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut}, '-=1')
            .addLabel('box-1', '-=0.5')
            .addLabel('box-2', '-=0.5')
            .fromTo(this.ele.querySelector('.img-box-1'), 0.7, {scale:0.5, autoAlpha:0}, {scale:1, autoAlpha: 1, ease: Quart.easeOut}, 'box-1')
            .fromTo(this.ele.querySelector('.img-box-1 .cha'), 1.2, {y:100, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut}, 'box-1+=0.5')
            .fromTo(this.ele.querySelector('.img-box-1 .ef'), 0.7, { autoAlpha:0}, {autoAlpha: 1, ease: Bounce.easeOut}, 'box-1+=1')
            .fromTo(this.ele.querySelector('.img-box-2'), 0.7, {scale:0.5, autoAlpha:0}, {scale:1, autoAlpha: 1, ease: Quart.easeOut}, 'box-2')
            .fromTo(this.ele.querySelector('.img-box-2 .cha'), 1.2, {y:100, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut}, 'box-2+=0.5')
            .fromTo(this.ele.querySelector('.img-box-2 .ef'), 0.7, { autoAlpha:0}, {autoAlpha: 1, ease: Bounce.easeOut}, 'box-2+=1')
            .fromTo(this.ele.querySelector('.item-box'), 0.7, {y: 50, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut}, '-=0.5')
            .staggerFromTo(this.ele.querySelectorAll('.item-box>li'), 0.7, {y: 50, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut}, 0.2, '-=0.5')
            .fromTo(this.ele.querySelector('.btn-close-layer'), 0.3, {right:-120, autoAlpha:0}, {right:20, autoAlpha: 1, ease: Cubic.easeOut}, '-=2')

    };
    show(){
        TweenLite.set(this.ele, {css:{className:`+=${this.showClass}`}});
        this.showMotion.seek(0)
        this.showMotion.play();
        //this.frame = requestAnimationFrame(this.animate.bind(this, 'show'));
    }
    _showComplete(thisv){
    }
    hide(){
        TweenMax.to(this.ele, 0.5, {opacity:0, onComplete:this._hidetComplete, onCompleteParams:[this]});
    }
    _hidetComplete(thisv){
        TweenLite.set(thisv.ele, {css:{className:`-=${thisv.showClass}`}});
    }
}