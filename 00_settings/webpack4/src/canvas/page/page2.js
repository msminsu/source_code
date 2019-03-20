import BasePage from  './basePage';
import appInfo from "../controller/appInfo";
import {rePostionContents, reSizeBackground} from "../util/cavasResize";

export default class Page2 extends BasePage{
    constructor(info){
        super(info);
        this.canvas;
        this.canvasBgImgs = {};
        this.canvasFilters = {};
        this.leady = false;
        this.player = {}
        this.tabNum = null;
        this.playerEle = $(this.ele).find('.player-con>li');
        this.tabs = $(this.ele).find('.tab-menu>li');
        this.tabContents = $(this.ele).find('.tab-content>li');

        this._init();
        this._motionSet();

        window.addEventListener("resize", this._resize.bind(this));
    }
    _init(){

        this.player.tab1 = new nc.promokit.Player({
            selector: '#page2-bg-1',
            videoId: 'http://vodfile.ncsoft.co.kr/ncvod/plaync/Aion/7update/Skill_Ver2_SP_low.mp4',
            mute: true,
            controls: false,
            coverClick: false,
            loop: true
        });
        this.player.tab2 = new nc.promokit.Player({
            selector: '#page2-bg-2',
            videoId: 'http://vodfile.ncsoft.co.kr/ncvod/plaync/Aion/7update/Skill_Ver3_SP_low.mp4',
            mute: true,
            controls: false,
            coverClick: false,
            loop: true
        });
        this.player.tab3= new nc.promokit.Player({
            selector: '#page2-bg-3',
            videoId: 'http://vodfile.ncsoft.co.kr/ncvod/plaync/Aion/7update/Skill_Ver1_SP_low.mp4',
            mute: true,
            controls: false,
            coverClick: false,
            loop: true
        });
        this.canvas = new PIXI.Application(this.w, this.h, {transparent:true, autoStart:false});
        this.ele.querySelector('.bg-con').appendChild(this.canvas.view);

        this.canvasFilters.zoomBlurFilter =  new PIXI.filters.ZoomBlurFilter();
        this.canvasFilters.zoomBlurFilter.strength = 0.5;
        this.canvasFilters.zoomBlurFilter.center = [this.w/2, this.h/2];
        this.canvasFilters.zoomBlurFilter.innerRadius = 0;

        this.canvasBgImgs.bg1 = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page2/page2_1_bg.jpg');
        this.canvasBgImgs.bg1.filters = [this.canvasFilters.zoomBlurFilter];
        this.canvasBgImgs.bg1.alpha = 0;
        this.canvas.stage.addChild(this.canvasBgImgs.bg1);
        this.canvasBgImgs.bg2 = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page2/page2_2_bg.jpg');
        this.canvasBgImgs.bg2.filters = [this.canvasFilters.zoomBlurFilter];
        this.canvasBgImgs.bg2.alpha = 0;
        this.canvas.stage.addChild(this.canvasBgImgs.bg2);
        this.canvasBgImgs.bg3 = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page2/page2_3_bg.jpg');
        this.canvasBgImgs.bg3.filters = [this.canvasFilters.zoomBlurFilter];
        this.canvasBgImgs.bg3.alpha = 0;
        this.canvas.stage.addChild(this.canvasBgImgs.bg3);

         $(this.tabs).on('click', (e)=>{
             if(this.tabNum == $(e.currentTarget).index())return;
             if(!this.leady)return;
             this.leady = false;
             this._tabSelect($(e.currentTarget).index());
             this._tabChange();
         });
    }
    _motionSet(){
        this.hideMotion
            .fromTo(this.ele.querySelector('h2'), 0.5, { autoAlpha: 1, y: 0, },{ autoAlpha: 0, y: -50, ease: Quart.easeOut })
            .fromTo(this.ele.querySelector('p.txt em'), 0.5, { autoAlpha: 1, y: 0, },{ autoAlpha: 0, y: -50, ease: Quart.easeOut }, '-=0.4')
            .fromTo(this.ele.querySelector('p.txt span'), 0.5, { autoAlpha: 1, y: 0, },{ autoAlpha: 0, y: -50, ease: Quart.easeOut }, '-=0.4')
            .fromTo(this.ele.querySelector('.tab-menu'), 0.5, { autoAlpha: 1, y: 0, },{ autoAlpha: 0, y: 50, ease: Quart.easeOut }, '-=0.4')
            .fromTo(this.ele.querySelector('.tab-content'), 0.5, { autoAlpha: 1, y: 0, },{ autoAlpha: 0, y: 50, ease: Quart.easeOut }, '-=0.4')
            .call(()=>{this._hidetComplete()}, null, null, '-=0.3')
            .to(this.ele, 1, {autoAlpha: 0, ease: Quart.easeOut})

        this.showMotion
            .fromTo(this.ele, 2, {autoAlpha:0}, {autoAlpha:1})
            .set(this.canvasBgImgs.bg1, {pixi:{alpha: 1, brightness:1}})
            .fromTo(this.canvasFilters.zoomBlurFilter, 2, { strength : 0.5 }, {strength:0, ease: Cubic.easeOut}, '-=2')
            .addLabel('txt', "-=0.9")
            .call(()=>{this._initShow()})
            .fromTo(this.ele.querySelector('h2'), 0.5, { autoAlpha: 0, y: -50, },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, 'txt')
            .fromTo(this.ele.querySelector('p.txt em'), 0.5, { autoAlpha: 0, y: 50, },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, 'txt+=0.2')
            .fromTo(this.ele.querySelector('p.txt span'), 0.5, { autoAlpha: 0, y: 50, },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, 'txt+=0.4')
            .fromTo(this.ele.querySelector('.tab-menu'), 0.5, { autoAlpha: 0, y: 50, },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, 'txt+=0.6')
            .fromTo(this.ele.querySelector('.tab-content'), 0.5, { autoAlpha: 0, y: 50, },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, 'txt+=0.8')
    }
    _tabSelect(num){
        this.tabNum = num;
        $(this.tabs).removeClass('active');
        $(this.tabs).eq(num).addClass('active');
        $(this.tabContents).removeClass('active');
        $(this.tabContents).eq(num).addClass('active');
        $(this.playerEle).removeClass('active');
        $(this.playerEle).eq(num).addClass('active');

        for(let i = 0; i < 3; i++){
            TweenMax.set(this.canvasBgImgs[`bg${i+1}`], {pixi:{alpha: 0, brightness:0}});
            this.player[`tab${i+1}`].seek(1)
            this.player[`tab${i+1}`].pause();
        };
    }
    _tabChange(isInit = false){
        let num = this.tabNum + 1;
        this.player[`tab${num}`].play();
        TweenMax.set(this.canvasBgImgs[`bg${num}`], {pixi:{alpha: 1, brightness:1}});
        if(!isInit){
            TweenMax.fromTo(this.canvasFilters.zoomBlurFilter, 1, { strength : 0.5 }, {strength:0, ease: Cubic.easeOut});
        }
        TweenMax.fromTo(this.canvasBgImgs[`bg${num}`], 0.5, { alpha : 1 }, {alpha:0, ease: Cubic.easeOut,delay:1});
        TweenMax.fromTo($(this.tabContents).eq(this.tabNum), 1, {autoAlpha : 0, y:100}, {autoAlpha : 1, y:0, delay:0.3, ease: Cubic.easeOut, onComplete:()=>{
            this.leady = true;
        }});
    }
    show(){
        this._tabSelect(4);
        TweenLite.set(this.ele, {css:{className:`+=${this.showClass}`}});
        TweenMax.set(this.canvasBgImgs[`bg${1}`], {pixi:{alpha: 1, brightness:1}});
        this.showMotion.seek(0);
        this.showMotion.play();
        this._resize();
        this.canvas.start();
    }
    _showComplete(){
        super._showComplete();
    }
    _initShow(){
        this._tabSelect(0);
        this._tabChange(true);

    }

    _hidetComplete(){
        super._hidetComplete();
        this._tabSelect(4);
        this.canvas.stop();
        this.leady =false;
    }

    _resize(){
        this.w =  window.innerWidth;
        this.h =  window.innerHeight;
        reSizeBackground(this.canvasBgImgs.bg1, this.w, this.h);
        reSizeBackground(this.canvasBgImgs.bg2, this.w, this.h);
        reSizeBackground(this.canvasBgImgs.bg3, this.w, this.h);

        this.canvas.renderer.resize(this.w, this.h);
    }
}