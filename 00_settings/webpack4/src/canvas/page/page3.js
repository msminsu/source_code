import BasePage from  './basePage';
import appInfo from "../controller/appInfo";
import Rolling from "../module/rolling";
import {rePostionContents, reSizeBackground} from "../util/cavasResize";

export default class Page2 extends BasePage{
    constructor(info){
        super(info);
        this.canvas;
        this.canvasBgImg;
        this.canvasObj = {};
        this.canvasFilters = {};


        this._init();
        this._motionSet();
        window.addEventListener("resize", this._resize.bind(this));
    }
    _init(){
        this.rolling = new Rolling(this.ele.querySelector('.content .rolling'));

        this.canvas = new PIXI.Application(this.w, this.h, {transparent:true, autoStart:false});
        this.ele.querySelector('.bg-con').appendChild(this.canvas.view);

        this.canvasBgImg = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page3/page3_bg.jpg');
        this.canvasFilters.zoomBlurFilter =  new PIXI.filters.ZoomBlurFilter();
        this.canvasFilters.zoomBlurFilter.strength = 0.5;
        this.canvasFilters.zoomBlurFilter.center = [this.w/2, this.h/2];
        this.canvasFilters.zoomBlurFilter.innerRadius = 0;
        this.canvasBgImg.filters = [this.canvasFilters.zoomBlurFilter];
        this.canvas.stage.addChild(this.canvasBgImg);
    }
    _motionSet(){
        this.hideMotion
            .to(this.ele.querySelectorAll('[data-target="effect"]'), 0.5, { autoAlpha: 0, ease: Quart.easeOut })
            .to(this.ele.querySelectorAll('.slick-dots'), 0.5, { autoAlpha: 0, y: 50, ease: Quart.easeOut }, '-=0.4')
            .to(this.ele.querySelector('.slick-prev'), 0.5, { autoAlpha: 0, ease: Quart.easeOut }, '-=0.8')
            .to(this.ele.querySelector('.slick-next'), 0.5, { autoAlpha: 0, ease: Quart.easeOut }, '-=0.8')
            .to(this.ele.querySelectorAll('.slick-track'), 0.5, { autoAlpha: 0, ease: Quart.easeOut }, '-=0.8')
            .call(()=>{this._hidetComplete()}, null, null, '-=0.3')
            .to(this.ele, 1, {autoAlpha: 0, ease: Quart.easeOut});

        this.showMotion
            .fromTo(this.ele, 2, {autoAlpha:0}, {autoAlpha:1})
            .fromTo(this.canvasFilters.zoomBlurFilter, 2, { strength : 0.5 }, {strength:0, ease: Cubic.easeOut}, '-=2')
            .set( this.ele.querySelector('.content'), {autoAlpha:1})
            .fromTo(this.ele.querySelector('.simbol'), 0.8, { autoAlpha: 0 },{ autoAlpha: 1 }, '-=0.8')
            .fromTo(this.ele.querySelector('h2 span'), 0.5, { autoAlpha: 0, y: -50 },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('h2 strong'), 0.5, { autoAlpha: 0, y: -50 },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('p.txt em'), 0.5, { autoAlpha: 0, y: 50 },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('p.txt span'), 0.5, { autoAlpha: 0, y: 50 },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('.slick-track'), 0.5, { autoAlpha: 0, y: 50 },{ autoAlpha: 1, y: 0, ease: Quart.easeOut}, '-=0.3')
            .fromTo(this.ele.querySelector('.slick-dots'), 0.5, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('.slick-prev'), 0.5, { autoAlpha: 0, y: 0, x: 50 },{ autoAlpha: 1, x: 0, ease: Elastic.easeOut.config(1, 0.5) }, '-=0.3')
            .fromTo(this.ele.querySelector('.slick-next'), 0.5, { autoAlpha: 0, y: 0, x: -50 },{ autoAlpha: 1, x: 0, ease: Elastic.easeOut.config(1, 0.5) }, '-=0.5')

    }

    show(){
        super.show();
        this._resize();
        this.canvas.start();
    }
    _showComplete(){
        super._showComplete();
    }
    _hidetComplete(){
        super._hidetComplete();
        this.canvas.stop();
    }
    _resize(){
        this.w =  window.innerWidth;
        this.h =  window.innerHeight;
        reSizeBackground(this.canvasBgImg, this.w, this.h);
        this.canvas.renderer.resize(this.w, this.h);
    }
}