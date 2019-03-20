import BasePage from  './basePage';
import appInfo from "../controller/appInfo";
import {rePostionContents, reSizeBackground} from "../util/cavasResize";

export default class Page8 extends BasePage{
    constructor(info){
        super(info);
        this.canvas;
        this.canvasBgImg;
        this.canvasObj = {};
        this.canvasFilters = {};

        this.contentSize = {w:1920, h:1200};

        this._init();
        this._motionSet();
        this._bindEvent();
        window.addEventListener("resize", this._resize.bind(this));
    }

    _init(){
        this._gallery();
        this.canvas = new PIXI.Application(this.w, this.h, {transparent:true, autoStart:false});
        this.ele.querySelector('.bg-con').appendChild(this.canvas.view);

        this.canvasBgImg = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page8/page8_bg.jpg');
        this.canvasFilters.zoomBlurFilter =  new PIXI.filters.ZoomBlurFilter();
        this.canvasFilters.zoomBlurFilter.strength = 0.5;
        this.canvasFilters.zoomBlurFilter.center = [this.w/2, this.h/2];
        this.canvasFilters.zoomBlurFilter.innerRadius = 0;
        this.canvasBgImg.filters = [this.canvasFilters.zoomBlurFilter];
        this.canvas.stage.addChild(this.canvasBgImg);

        this.canvasObj.con = new PIXI.Container();
        this.canvasObj.con.x = this.w/2 - this.contentSize.w/2;
        this.canvasObj.con.y = 0;
        this.canvas.stage.addChild(this.canvasObj.con);
        let conArea = new PIXI.Graphics(this.w/2 - this.contentSize.w/2, this.h/2 - this.contentSize.h/2);
        conArea.alpha = 0;
        conArea.drawRect(0, 0, this.contentSize.w, this.contentSize.h);
        this.canvasObj.con.addChild(conArea);

        this.canvasObj.characterLeft = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page8/page8_character_left.png');
        this.canvasObj.characterLeft.x =195;
        this.canvasObj.characterLeft.y = 167;
        this.canvasObj.con.addChild(this.canvasObj.characterLeft);

        this.canvasObj.characterRight = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page8/page8_character_right.png');
        this.canvasObj.characterRight.x =1017;
        this.canvasObj.characterRight.y = 137;
        this.canvasObj.con.addChild(this.canvasObj.characterRight);
    }
    _motionSet(){
        this.hideMotion
            .to(this.ele.querySelectorAll('[data-target="effect"]'), 0.5, { autoAlpha: 0, ease: Quart.easeOut })
            .fromTo(this.canvasObj.characterLeft, 0.7, { pixi: { alpha: 1 }}, { x: -695, pixi: { alpha: 0}, ease: Quart.easeOut}, '-=0')
            .fromTo(this.canvasObj.characterRight, 0.7, { pixi: { alpha: 1 }}, { x: 1517, pixi: { alpha: 0}, ease: Quart.easeOut}, '-=0.7')

            .call(()=>{this._hidetComplete()}, null, null, '-=0.3')
            .to(this.ele, 1, {autoAlpha: 0, ease: Quart.easeOut});

        this.showMotion
            .fromTo(this.ele, 2, {autoAlpha:0}, {autoAlpha:1})
            .fromTo(this.canvasFilters.zoomBlurFilter, 2, { strength : 0.5 }, {strength:0, ease: Cubic.easeOut}, '-=2')
            .set( this.ele.querySelector('.content'), {autoAlpha:1})
            .fromTo(this.canvasObj.characterLeft, 1, {x: -105, pixi: { alpha: 0 , brightness: 3} }, {x: 195, pixi: { alpha: 1, brightness: 1}, ease: Quart.easeOut}, '-=0.5')
            .fromTo(this.canvasObj.characterRight, 1, {x: 1317, pixi: { alpha: 0, brightness: 3} }, {x: 1017, pixi: { alpha: 1, brightness: 1}, ease: Quart.easeOut}, '-=1')
            .fromTo(this.ele.querySelector('.content h2 span'), 0.5, { autoAlpha: 0, y: -50, },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0')
            .fromTo(this.ele.querySelector('.content h2 strong'), 0.5, { autoAlpha: 0, y: -50, },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.2')
            .fromTo(this.ele.querySelector('.content p.txt em'), 0.5, { autoAlpha: 0, y: 50, },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('.content p.txt span'), 0.5, { autoAlpha: 0, y: 50, },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('.content .btn-link-8-1'), 0.5, { autoAlpha: 0, x: 100, },{ autoAlpha: 1, x: 0, ease: Quart.easeOut }, '-=0.1')
            .fromTo(this.ele.querySelector('.content .btn-link-8-2'), 0.5, { autoAlpha: 0, x: -100, },{ autoAlpha: 1, x: 0, ease: Quart.easeOut }, '-=0.5')
            .fromTo(this.ele.querySelector('.content .left a'), 0.5, { autoAlpha: 0, x: 100, },{ autoAlpha: 1, x: 0, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('.content .right a'), 0.5, { autoAlpha: 0, x: -100, },{ autoAlpha: 1, x: 0, ease: Quart.easeOut }, '-=0.5')
            .fromTo(this.ele.querySelector('.content .left strong'), 0.5, { autoAlpha: 0, x: -50, },{ autoAlpha: 1, x: 0, ease: Elastic.easeOut.config(1, 0.5) }, '-=0')
            .fromTo(this.ele.querySelector('.content .right strong'), 0.5, { autoAlpha: 0, x: 50, },{ autoAlpha: 1, x: 0, ease: Elastic.easeOut.config(1, 0.5) }, '-=0.5')

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
    _bindEvent(){
        $(document).on('click', '.btn-layer-8-1, .btn-layer-8-2', ()=>{
            this.canvas.stop();
            this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'openLayer'}}));
        });
        $(document).on('click', '.pswp__button--close', ()=>{
            this.canvas.start();
            this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'closeLayer'}}));
        })
    }
    _gallery(){
        let gallery1 = new nc.ui.Viewer({
            image: [
                { src: appInfo.staticPath + "/promo/aion/history/2018/181128_color/img/page8/page9_pve1.jpg"},
                { src: appInfo.staticPath + "/promo/aion/history/2018/181128_color/img/page8/page9_pve2.jpg"},
                { src: appInfo.staticPath + "/promo/aion/history/2018/181128_color/img/page8/page9_pve3.jpg"}
            ],
            btn: '.btn-layer-8-1'
        });
        let gallery2 = new nc.ui.Viewer({
            image: [
                { src: appInfo.staticPath + "/promo/aion/history/2018/181128_color/img/page8/page9_pvp1.jpg"},
                { src: appInfo.staticPath + "/promo/aion/history/2018/181128_color/img/page8/page9_pvp2.jpg"},
                { src: appInfo.staticPath + "/promo/aion/history/2018/181128_color/img/page8/page9_pvp3.jpg"}
            ],
            btn: '.btn-layer-8-2'
        });
    }
    _resize(){
        this.w =  window.innerWidth;
        this.h =  window.innerHeight;
        reSizeBackground(this.canvasBgImg, this.w, this.h);
        rePostionContents(this.canvasObj.con, this.w, this.h, this.contentSize.w, this.contentSize.h, true);

        this.canvas.renderer.resize(this.w, this.h);
    }
}