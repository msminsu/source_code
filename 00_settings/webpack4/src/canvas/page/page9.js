import BasePage from  './basePage';
import appInfo from "../controller/appInfo";
import {rePostionContents, reSizeBackground} from "../util/cavasResize";

export default class Page9 extends BasePage{
    constructor(info){
        super(info);
        this.canvas;
        this.canvasBgImg = {};
        this.canvasObj = {};
        this.canvasFilters = {};
        this.canvasCharactorIdx = 0;

        this.contentSize = {w:1920, h:1200};

        this._init();
        this._motionSet();
        this._bindEvent();
        window.addEventListener("resize", this._resize.bind(this));
    }

    _init(){
        this.canvas = new PIXI.Application(this.w, this.h, {transparent:true, autoStart:false});
        this.ele.querySelector('.bg-con').appendChild(this.canvas.view);
        this.canvasFilters.zoomBlurFilter =  new PIXI.filters.ZoomBlurFilter();
        this.canvasFilters.zoomBlurFilter.strength = 0.5;
        this.canvasFilters.zoomBlurFilter.center = [this.w/2, this.h/2];
        this.canvasFilters.zoomBlurFilter.innerRadius = 0;

        // this.canvasBgImg.push(new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page9/page9_bg1.jpg'));
        // this.canvasBgImg.push(new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page9/page9_bg2.jpg'));
        // this.canvasBgImg.push(new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page9/page9_bg3.jpg'));

        this.canvasBgImg.bg0 = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page9/page9_bg1.jpg');
        this.canvasBgImg.bg0.filters = [this.canvasFilters.zoomBlurFilter];
        this.canvasBgImg.bg0.alpha = 1;
        this.canvas.stage.addChild(this.canvasBgImg.bg0);
        this.canvasBgImg.bg1 = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page9/page9_bg2.jpg');
        this.canvasBgImg.bg1.filters = [this.canvasFilters.zoomBlurFilter];
        this.canvasBgImg.bg1.alpha = 0;
        this.canvas.stage.addChild(this.canvasBgImg.bg1);
        this.canvasBgImg.bg2 = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page9/page9_bg3.jpg');
        this.canvasBgImg.bg2.filters = [this.canvasFilters.zoomBlurFilter];
        this.canvasBgImg.bg2.alpha = 0;
        this.canvas.stage.addChild(this.canvasBgImg.bg2);

        // let len = this.canvasBgImg.length;
        // while( len-- ){
        //     this.canvasBgImg[len].filters = [this.canvasFilters.zoomBlurFilter];
        //     this.canvas.stage.addChild(this.canvasBgImg[len]);
        //     if( len > 0 ) this.canvasBgImg[len].alpha = 0;
        // }

        this.canvasObj.con = new PIXI.Container();
        this.canvasObj.con.x = this.w/2 - this.contentSize.w/2;
        this.canvasObj.con.y = 0;
        this.canvas.stage.addChild(this.canvasObj.con);
        let conArea = new PIXI.Graphics(this.w/2 - this.contentSize.w/2, this.h/2 - this.contentSize.h/2);
        conArea.alpha = 0;
        conArea.drawRect(0, 0, this.contentSize.w, this.contentSize.h);
        this.canvasObj.con.addChild(conArea);



        this.canvasObj.character0 = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page9/page9_bg1_ch.png');
        this.canvasObj.character0.x =451;
        this.canvasObj.character0.y = 200;
        this.canvasObj.con.addChild(this.canvasObj.character0);

        this.canvasObj.character1 = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page9/page9_bg2_ch.png');
        this.canvasObj.character1.x =686;
        this.canvasObj.character1.y = 150;
        this.canvasObj.character1.alpha = 0;
        this.canvasObj.con.addChild(this.canvasObj.character1);

        this.canvasObj.character2 = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page9/page9_bg3_ch.png');
        this.canvasObj.character2.x =692;
        this.canvasObj.character2.y = 132;
        this.canvasObj.character2.alpha = 0;
        this.canvasObj.con.addChild(this.canvasObj.character2);
    }
    _bindEvent(){
        $(this.ele).on('click', '.list li', (e)=>{
            this.canvasCharactorIdx = e.currentTarget.getAttribute('data-index');

            this._listMotionSet();
            this.canvasBgImg['bg' + this.canvasCharactorIdx].alpha = 1;
            e.currentTarget.classList.add('active');
            TweenMax.fromTo( e.currentTarget.querySelector('a'), 1, { transformOrigin: '50% 0', rotationX: -180, autoAlpha: 0 }, { rotationX: 0, autoAlpha: 1, delay: 0.1, ease: Elastic.easeOut });

            TweenMax.fromTo(this.canvasFilters.zoomBlurFilter, 1, { strength : 0.5 }, {strength:0, ease: Cubic.easeOut});
            TweenMax.fromTo(this.canvasObj['character' + this.canvasCharactorIdx], 1.5, { pixi: { alpha: 0 , brightness: 4} }, { pixi: { alpha: 1, brightness: 1}, ease: Quart.easeOut}, '-=0.3')
        });
    }
    _motionSet(){
        this.hideMotion
            .to(this.ele.querySelector('h2'), 0.5, { autoAlpha: 0, ease: Quart.easeOut })
            .call(()=>{this._hidetComplete()}, null, null, '-=0.3')
            .to(this.ele, 1, {autoAlpha: 0, ease: Quart.easeOut});

        this.showMotion
            .fromTo(this.ele, 2, {autoAlpha:0}, {autoAlpha:1})
            .fromTo(this.canvasFilters.zoomBlurFilter, 2, { strength : 0.5 }, {strength:0, ease: Cubic.easeOut}, '-=2')
            .set( this.ele.querySelector('.content'), {autoAlpha:1})
            .fromTo(this.ele.querySelector('.content h2'), 0.5, { autoAlpha: 0, y: -50, },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.7')
            .fromTo(this.canvasObj.character0, 1, { y: 250, pixi: { alpha: 0,  brightness: 4} }, { y: 200, pixi: { alpha: 1, brightness: 1}, ease: Quart.easeOut}, '-=0.2')
    }

    show(){
        super.show();
        this._resize();
        this._listMotionSet();
        this.ele.querySelector('.list li').classList.add('active');
        this.canvasBgImg.bg0.alpha = 1;
        this.canvas.start();
    }
    _showComplete(){
        super._showComplete();
        TweenMax.set( this.ele.querySelector('li.active a'),{ rotationX: 0, autoAlpha: 1 });
    }
    _hidetComplete(){
        super._hidetComplete();

        this.canvas.stop();
    }
    _listMotionSet(){
        let len = 3;
        while( len-- ){
            this.canvasBgImg['bg' + len].alpha = 0;
            TweenMax.set(this.canvasObj['character' + len], { pixi: { alpha: 0 }});
            $(this.ele).find('.list li').removeClass('active');
            TweenMax.set($(this.ele).find('.list li a'), { autoAlpha: 0 });
        }
    }
    _resize(){
        this.w =  window.innerWidth;
        this.h =  window.innerHeight;
        reSizeBackground(this.canvasBgImg.bg0, this.w, this.h);
        reSizeBackground(this.canvasBgImg.bg1, this.w, this.h);
        reSizeBackground(this.canvasBgImg.bg2, this.w, this.h);
        rePostionContents(this.canvasObj.con, this.w, this.h, this.contentSize.w, this.contentSize.h, true);
        this.canvas.renderer.resize(this.w, this.h);
    }
}