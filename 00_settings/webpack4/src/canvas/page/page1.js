import BasePage from  './basePage';
import appInfo from "../controller/appInfo";
import {rePostionContents, reSizeBackground} from "../util/cavasResize";

export default class Page1 extends BasePage{
    constructor(info){
        super(info);
        this.canvas;
        this.canvasBgImg;
        this.canvasObj = {};
        this.canvasFilters = {};

        this.contentSize = {w:1920, h:1200};
        this.skillCons = [];
        this.leady = false;

        this._init();
        this._eventSet();
        this._motionSet();
        window.addEventListener("resize", this._resize.bind(this));
    }

    _init(){
        this.canvas = new PIXI.Application(this.w, this.h, {transparent:true, autoStart:false});
        this.ele.querySelector('.bg-con').appendChild(this.canvas.view);

        this.canvasBgImg = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page1/page1_bg.jpg');
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

        this.canvasObj.ef1 = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page1/page1_charactor_ef1.png');
        this.canvasObj.ef1.x = 250;
        this.canvasObj.ef1.y = 264;

        this.canvasObj.ef1.alpha=0.5
        this.canvasObj.con.addChild(this.canvasObj.ef1);

        this.canvasObj.charactor = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page1/page1_charactor.png');
        this.canvasObj.charactor.x =394;
        this.canvasObj.charactor.y = 57;
        this.canvasObj.con.addChild(this.canvasObj.charactor);

        this.canvasObj.ef2 = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page1/page1_charactor_ef2.png');
        this.canvasObj.ef2.x = 60;
        this.canvasObj.ef2.y = 96;
        this.canvasObj.con.addChild(this.canvasObj.ef2);

        for(let i = 0; i < 3; i++){
            let skillPos = [
                    {x:786, y:359, lineX:56, lineY:119, txt1X:30, txt1Y:189, txt2X:-36 , txt2Y:215},
                    {x:577, y:430, lineX:-56, lineY:55, txt1X:-138, txt1Y:110, txt2X:-199 , txt2Y:137},
                    {x:553, y:727, lineX:121, lineY:34, txt1X:208, txt1Y:15, txt2X:208 , txt2Y:42}
                ];
            let skill = new Skill(i, skillPos[i], this._skillOver.bind(this));
            this.skillCons.push(skill);
            this.canvasObj.con.addChild(skill);
        }

        this.canvas.ticker.add(()=> {
            for(let i = 0; i < 3; i++){
                this.skillCons[i].update();
            }
        });
    }
    _eventSet(){
        let player = new nc.promokit.Player({
            selector: '#player-page1',
            videoId: 'nbEn-aX06U0',
            mute: false,
            controls: true,
            coverClick: true
        });

        let layerMovie = new nc.promokit.Layer({
            el: "#page1Movie",
            fade: true,
            esc: true,
            dim: true,
            dimClickClose: true
        });

        // this.ele.querySelector('.btn-link').addEventListener('click', ()=>{
        //     this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'changePage', key:'page2'}}));
        // })
        this.ele.querySelector('.btn-play').addEventListener('click', ()=>{
            layerMovie.open();
            player.play();
            this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'openLayer'}}));
        })

        $("#page1Movie .layer_close").on("click", ()=>{
            layerMovie.close();
            player.pause();
            this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'closeLayer'}}));
        });
    }

    _motionSet(){
        this.hideMotion
            .fromTo(this.canvasObj.charactor, 1, { pixi: {alpha: 1 } }, {y:557, pixi: {alpha: 0}, ease: Quart.easeOut})
            .fromTo(this.skillCons, 1, { pixi: {alpha: 1 , blurX: 0} }, {pixi: {alpha: 0, blurX: 30}, ease: Quart.easeOut}, '-=1')
            .fromTo(this.canvasObj.ef1, 1, {y:264, pixi: { alpha: 1, saturation:1} }, {y:214, pixi: { alpha: 0, saturation:0}, ease: Quart.easeOut}, '-=1')
            .fromTo(this.canvasObj.ef2, 1, {y:96, pixi: { alpha: 1 , saturation:1} }, {y:96, pixi: { alpha: 0, saturation:0}, ease: Quart.easeOut}, '-=1')
            .fromTo(this.ele.querySelector('.content'), 0.5,{autoAlpha: 1}, {autoAlpha: 0, ease: Quart.easeOut}, '-=1')
            .call(()=>{this._hidetComplete(this)}, null, null, '-=0.5')
            .to(this.ele, 1, {autoAlpha: 0, ease: Quart.easeOut})
        this.showMotion
            .fromTo(this.ele, 2, {autoAlpha:0}, {autoAlpha:1})
            .fromTo(this.canvasFilters.zoomBlurFilter, 2, { strength : 0.5 }, {strength:0, ease: Cubic.easeOut}, '-=2')
            .fromTo(this.canvasObj.charactor, 2, {y:557, pixi: { alpha: 0 , brightness: 5} }, {y:57, pixi: { alpha: 1, brightness: 1}, ease: Quart.easeOut}, '-=1')
            .fromTo(this.canvasObj.ef1, 2, {y:214, pixi: { alpha: 0, saturation:0} }, {y:264, pixi: { alpha: 1, saturation:1}, ease: Quart.easeOut}, '-=1.5')
            .fromTo(this.canvasObj.ef2, 2, {y:46, pixi: { alpha: 0 , saturation:0} }, {y:96, pixi: { alpha: 1, saturation:1}, ease: Quart.easeOut}, '-=2')
            .set( this.ele.querySelector('.content'), {autoAlpha:1}, '-=2')
            .addLabel('txt', '-=1')
            .fromTo( this.skillCons[0], 0.3, {pixi: {alpha: 0, blurX: 30}}, {pixi: {alpha: 1, blurX: 0}},'txt')
            .fromTo( this.skillCons[1], 0.3, {pixi: {alpha: 0, blurX: 30}}, {pixi: {alpha: 1, blurX: 0}},'txt+=0.1')
            .fromTo( this.skillCons[2], 0.3, {pixi: {alpha: 0, blurX: 30}}, {pixi: {alpha: 1, blurX: 0}},'txt+=0.2')
            .fromTo( this.ele.querySelector('.simbol'), 0.8, {autoAlpha:0}, {autoAlpha:1},'txt')
            .fromTo( this.ele.querySelector('.title_sub'), 0.5, {autoAlpha:0, y:-50}, {autoAlpha:1, y:0, ease: Quart.easeOut}, 'txt+=0.2')
            .fromTo( this.ele.querySelector('.title'), 0.5, {autoAlpha:0, y:-50}, {autoAlpha:1, y:0, ease: Quart.easeOut},'txt+=0.4')
            .fromTo( this.ele.querySelector('.bl'), 0.5, {autoAlpha:0}, {autoAlpha:1, y:0, ease: Quart.easeOut},'txt+=0.6')
            .fromTo( this.ele.querySelector('.txt-1'), 0.5, {autoAlpha:0, y:50}, {autoAlpha:1, y:0, ease: Quart.easeOut},'txt+=0.8')
            .fromTo( this.ele.querySelector('.txt-2'), 0.5, {autoAlpha:0, y:50}, {autoAlpha:1, y:0, ease: Quart.easeOut},'txt+=1')
            .fromTo( this.ele.querySelector('.btn-link'), 0.5, {autoAlpha:0, y:50}, {autoAlpha:1, y:0, ease: Quart.easeOut},'txt+=1.2')
            .fromTo( this.ele.querySelector('.btn-play'), 0.5, {autoAlpha:0, y:50}, {autoAlpha:1, y:0, ease: Quart.easeOut},'txt+=1.4')
    };

    show(){
        super.show();
        this._resize();
        this.canvas.start();
    }
    _showComplete(){
        super._showComplete();
        this.leady =true;
    }

    _hidetComplete(){
        super._hidetComplete();
        this.canvas.stop();
        this.leady =false;
    }

    _skillOver(name){
        if(!this.leady)return;
        switch (name) {
            case 'skill_0' : {
                TweenMax.to(this.canvasObj.charactor, 0.3, {x:384, y:27, pixi: {skewX: 1, skewY: 1, rotation: 1, scale: 1.02}})
                TweenMax.to(this.canvasObj.ef1, 0.3, {x:240, pixi: {skewX: 1, skewY: 1, rotation: -1, scale: 1}})
                TweenMax.to(this.canvasObj.ef2, 0.3, {x:60, pixi: {skewX:1, skewY: 1, rotation: -1, scale: 1}})
                TweenMax.to( this.skillCons[0], 0.3, {x:786, y:359, pixi: {scale: 1}})
                TweenMax.to( this.skillCons[1], 0.3, {x:567, y:420, pixi: { skewY: 1, scale: 0.95}})
                TweenMax.to( this.skillCons[2], 0.3, {x:533, y:727, pixi: {skewY: 1, scale: 0.95}})

                break;
            }
            case 'skill_1': {
                TweenMax.to(this.canvasObj.charactor, 0.3, {x:394, y:57, pixi: {skewX: -1, skewY: -1, rotation:-1, scale: 1.02}})
                TweenMax.to(this.canvasObj.ef1, 0.3, {x:250, pixi: {skewX: -1, skewY: -1, rotation: -1, scale: 1.02}})
                TweenMax.to(this.canvasObj.ef2, 0.3, {x:60, pixi: {skewX: -1, skewY: -1, rotation: -1, scale:1.02}})
                TweenMax.to( this.skillCons[0], 0.3, {x:796, y:349, pixi: {scale: 0.95}})
                TweenMax.to( this.skillCons[1], 0.3, {x:577, y:430, pixi: {scale: 1}})
                TweenMax.to( this.skillCons[2], 0.3, {x:558, y:730, pixi: {scale: 0.95}})
                break;
            }
            case 'skill_2': {
                TweenMax.to(this.canvasObj.charactor, 0.3, {x:354, y:47, pixi: {skewX:2, skewY:-2, rotation: -2, scale: 1.02}})
                TweenMax.to(this.canvasObj.ef1, 0.3, {x:230, pixi: {skewX:1, skewY:-2, rotation:-1, scale: 1.02}})
                TweenMax.to(this.canvasObj.ef2, 0.3, {x:30, pixi: {skewX:1, skewY:-1, rotation: 0, scale: 1.02}})
                TweenMax.to( this.skillCons[0], 0.3, {x:783, y:334, pixi: {scale: 0.95}})
                TweenMax.to( this.skillCons[1], 0.3, {x:572, y:425, pixi: {scale: 0.95}})
                TweenMax.to( this.skillCons[2], 0.3, {x:553, y:727, pixi: {scale: 1}})
                break;
            }
            case '': {
                TweenMax.to(this.canvasObj.charactor, 0.3, {x:394, y:57, pixi: {skewX: 0, skewY: 0, rotation: 0, scale:1}})
                TweenMax.to(this.canvasObj.ef1, 0.3, {x:250, pixi: {skewX: 0, skewY: 0, rotation: 0, scale:1}})
                TweenMax.to(this.canvasObj.ef2, 0.3, {x:60, pixi: {skewX: 0, skewY: 0, rotation: 0, scale:1}})
                TweenMax.to( this.skillCons[0], 0.3, {x:786, y:359, pixi: {scale: 1}})
                TweenMax.to( this.skillCons[1], 0.3, {x:577, y:430, pixi: {scale: 1}})
                TweenMax.to( this.skillCons[2], 0.3, {x:553, y:727, pixi: {scale: 1}})
                break;
            }
        }
    }

    _resize(){
        this.w =  window.innerWidth;
        this.h =  window.innerHeight;
        reSizeBackground(this.canvasBgImg, this.w, this.h);
        rePostionContents(this.canvasObj.con, this.w, this.h, this.contentSize.w, this.contentSize.h, true);

        this.canvas.renderer.resize(this.w, this.h);
    }
}


class Skill extends PIXI.Sprite{
    constructor(current, pos, callback){
        super();
        this.name = `skill_${current}`;
        this.callback = callback;
        this.x = pos.x;
        this.y = pos.y;
        this.pos = pos;
        this.over = false;
        this.interval = 100;
        this.intervalTimer =Math.floor(Math.random()*100);
        this.btn = new PIXI.Container();
        this.overBg = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page1/page1_skill_overBg.png');
        this.bg = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page1/page1_skill_bg.png');
        this.innerBg = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page1/page1_skill_inner.png');
        this.icon = new PIXI.Sprite.fromImage(appInfo.staticPath+`/promo/aion/history/2018/181128_color/img/page1/page1_skill${current+1}_icon.png`);
        this.line = new PIXI.Sprite.fromImage(appInfo.staticPath+`/promo/aion/history/2018/181128_color/img/page1/page1_skill${current+1}_line.png`);
        this.txt1 = new PIXI.Sprite.fromImage(appInfo.staticPath+`/promo/aion/history/2018/181128_color/img/page1/page1_skill${current+1}_txt1.png`);
        this.txt2 = new PIXI.Sprite.fromImage(appInfo.staticPath+`/promo/aion/history/2018/181128_color/img/page1/page1_skill${current+1}_txt2.png`);
        this.btn.interactive = true;
        this.overMotion = new TimelineMax({paused: true});
        this.outMotion = new TimelineMax({paused: true});

        this._draw();
        this._eventSet();
    }
    _draw(){
        //let filter;
        this.overBg.anchor.set(0.5);
        this.bg.anchor.set(0.5);
        this.innerBg.anchor.set(0.5);
        this.icon.anchor.set(0.5);
        this.bg.x = this.bg.y = 60;
        this.overBg.x = 60;
        this.overBg.y = 60;
        this.overBg.alpha = 0;
        this.innerBg.x = this.icon.x  = 60;
        this.innerBg.y = this.icon.y = 60;
        this.line.x = this.pos.lineX;
        this.line.y = this.pos.lineY;
        this.line.alpha = 0;
        this.txt1.x = this.pos.txt1X;
        this.txt1.y = this.pos.txt1Y;
        this.txt1.alpha = 0;
        this.txt2.x = this.pos.txt2X;
        this.txt2.y = this.pos.txt2Y;
        this.txt2.alpha = 0;
       // filter = new PIXI.filters.AdjustmentFilter();
       // filter.brightness(0.5, false);
       // filter.saturation = 0;
        //this.icon.filters = [filter];
        TweenMax.set(this.icon, { pixi: { saturation : 0 }})
        this.addChild(this.overBg);
        this.addChild(this.line);
        this.addChild(this.txt1);
        this.addChild(this.txt2);

        this.btn.cursor = 'pointer';
        this.btn.addChild(this.bg);
        this.btn.addChild(this.innerBg);
        this.btn.addChild(this.icon);
        this.addChild(this.btn);


    }
    _eventSet(){
        this.overMotion
            .to(this.icon, 0.3, { pixi: {scale:1.15, saturation : 1 }, ease:Expo.easeOut})
            .to(this.bg, 1, { pixi: {scale:1.15, hue:67, saturation:20}, ease:Elastic.easeOut.config(1.25, 0.3)}, '-=0.2')
            .to(this.innerBg, 1, {pixi: {scale:1.15 }, ease:Elastic.easeOut.config(1.25, 0.3)}, '-=0.9')
            .to(this.overBg, 1, {pixi: {scale:1.15, alpha:1 }, ease:Cubic.easeOut}, '-=0.9')
            .addLabel('txt', "-=0.9")
            .to(this.line, 0.3, {pixi: {alpha:1 }}, 'txt')
            .to(this.txt1, 0.3, {pixi: {alpha:1 }}, 'txt+=0.1')
            .to(this.txt2, 0.3, {pixi: {alpha:1 }}, 'txt+=0.2')

        this.btn.pointerover= ()=>{
            this.overMotion.timeScale(1)
            this.overMotion.restart();
            this.callback(this.name);
            this.over = true;
            //this.dispatchEvent(new CustomEvent("skillEvent", {detail:{action:'showComplete', key:this.name}}))
        }
        this.btn.pointerout= ()=>{
            this.overMotion.timeScale(2)
            this.overMotion.reverse();
            this.callback('')
            this.over = false;
            this.intervalTimer = 0;
        }
    }

    update(){
        if(!this.over){
            this.intervalTimer++;
            if(this.intervalTimer === this.interval ){
                this.intervalTimer = 0;
                TweenMax.fromTo(this.icon, 0.3, { pixi: {scale:1,  saturation : 0}}, { pixi: {scale:1.1,  saturation : 1}, ease:Expo.easeIn, repeat:1, yoyo:true})
                TweenMax.fromTo(this.innerBg, 0.3, { pixi: {scale:1}}, { pixi: {scale:1.1}, ease:Expo.easeIn, repeat:1, yoyo:true, delay:0.1})
                TweenMax.fromTo(this.bg, 0.3, { pixi: {scale:1}}, { pixi: {scale:1.2}, ease:Expo.easeIn, repeat:1, yoyo:true, delay:0.15})
            }

        }
    }

    pageKey(){
        return this.pageKey;
    }
}