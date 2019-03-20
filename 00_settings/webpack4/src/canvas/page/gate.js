import BasePage from  './basePage';
// import * as PIXI from 'pixi.js';
// import * as filters from 'pixi-filters';
import appInfo from "../controller/appInfo";
import {reSizeBackground, rePostionContents} from '../util/cavasResize';

export default class Gate extends BasePage{
    constructor(info){
        super(info);
        this.canvas;
        this.canvasBgImg;
        this.canvasObj = {};
        this.canvasFilters = {};
        this.cardCons = [];
        this.mouseY = 0;
        this.contentSize = {w:1920, h:1200};
        this._init();
        this._motionSet();
        this.leady = false;
        window.addEventListener("resize", this._resize.bind(this));
    }
    _init(){
        let thisV = this;
        this.canvas = new PIXI.Application(this.w, this.h, {transparent:true, autoStart:false, antialias:true});
        this.ele.querySelector('.bg-con').appendChild(this.canvas.view);

        this.canvasBgImg = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/gate/gate_bg.jpg');
        this.canvasFilters.zoomBlurFilter =  new PIXI.filters.ZoomBlurFilter();
        this.canvasFilters.zoomBlurFilter.strength = 1;
        this.canvasFilters.zoomBlurFilter.center = [this.w/2, this.h/2];
        this.canvasFilters.zoomBlurFilter.innerRadius = 0;
        this.canvasBgImg.filters = [this.canvasFilters.zoomBlurFilter];
        this.canvas.stage.addChild(this.canvasBgImg);

        this.canvasObj.con = new PIXI.Container();
        this.canvasObj.con.x = this.w/2 - this.contentSize.w/2;
        this.canvasObj.con.y = this.h/2 - this.contentSize.h/2;
        this.canvas.stage.addChild(this.canvasObj.con);
        let conArea = new PIXI.Graphics(this.w/2 - this.contentSize.w/2, this.h/2 - this.contentSize.h/2);
        conArea.alpha = 0;
        conArea.drawRect(0, 0, this.contentSize.w, this.contentSize.h);
        this.canvasObj.con.addChild(conArea);

        this.canvasObj.logo = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/gate/gate_txt.png');
        this.canvasObj.logo.x = this.contentSize.w/2 - 670;
        this.canvasObj.logo.y = this.contentSize.h/2 + 50;
        this.canvasObj.con.addChild(this.canvasObj.logo);

        for(let i = 0; i < 3; i++){
            let cardCon = new CardCon(i, this.w/2-240 + i*280);
            this.cardCons.push(cardCon);
            this.canvas.stage.addChild(cardCon);
        }

        for(let i = 0; i < 27; i++){
            let parent = Math.floor(i/9);
            let current = i%3 + parent*3;
            let posY = i%9;
            let card = new Card(current, posY);
            this.cardCons[parent].addChild(card);

            card.pointerdown = function(e){
                if(!thisV.leady)return;
                thisV.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'changePage', key:this.pageKey}}));
            };
        }

        this.canvas.ticker.add(()=> {
            for(let i = 0; i < 3; i++){
               this.cardCons[i].update(this.mouseY, this.h);
            }
        });
    }
    _motionSet(){
        this.hideMotion
            .to(this.cardCons[0], 2, { pixi: { y : this.cardCons[0].height *-1.2, blurY: 30}, ease: Quart.easeOut})
            .to(this.cardCons[1], 2, { pixi: { y : this.h*1.2, blurY: 30}, ease: Quart.easeOut}, '-=1.8')
            .to(this.cardCons[2], 2, { pixi: { y : this.cardCons[2].height *-1.2, blurY: 30}, ease: Quart.easeOut}, '-=1.8')
            .fromTo(this.canvasObj.logo, 1, { pixi: { x : this.canvasObj.logo.x, alpha: 1} }, { pixi: { x : this.canvasObj.logo.x-100, alpha: 0}, ease: Quart.easeOut}, '-=2')
            .call(()=>{this._hidetComplete(this)}, null, null, '-=1')
            .to(this.ele, 1, {autoAlpha: 0, ease: Quart.easeOut})
        this.showMotion
            .fromTo(this.ele, 2, {autoAlpha:0}, {autoAlpha:1})
            .fromTo(this.canvasFilters.zoomBlurFilter, 2, { strength : 0.5 }, {strength:0, ease: Cubic.easeOut}, '-=2')
            .fromTo(this.cardCons[0], 3, { pixi: { y : this.cardCons[0].height *-1.2, blurY: 30} }, { pixi: { y :-100, blurY: 0}, ease: Quart.easeOut}, '-=1')
            .fromTo(this.cardCons[1], 3, { pixi: { y : this.h*1.2, blurY: 30} }, { pixi: { y :this.h -this.cardCons[1].height, blurY: 0}, ease: Quart.easeOut}, '-=2.5')
            .fromTo(this.cardCons[2], 3, { pixi: { y : this.cardCons[2].height *-1.2, blurY: 30} }, { pixi: { y :-50, blurY: 0}, ease: Quart.easeOut}, '-=2.5')
            .fromTo(this.canvasObj.logo, 1, {x:this.canvasObj.logo.x-100, pixi: { alpha: 0 , brightness: 5} }, {x:this.canvasObj.logo.x, pixi: { alpha: 1, brightness: 1}, ease: Quart.easeOut}, '-=2')

    };
    mouseMove(e){
        this.mouseY = e.clientY;
    }
    show(){
        super.show();
        this._resize();
        this.canvas.start();
    }
    _showComplete(){
        this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'showComplete', key:this.key}}));
        window.addEventListener("mousemove", this.mouseMove.bind(this));
        this.leady = true;

    }
    hide(){
        super.hide();
        this.leady = false;
    }
    _hidetComplete(){

        super._hidetComplete();
        for(let i = 0; i < 3; i++){
            this.cardCons[i].hide();
        }
        window.removeEventListener("mousemove", this.mouseMove.bind(this));
        this.canvas.stop();
    }

    _resize(){
        this.w =  window.innerWidth;
        this.h =  window.innerHeight;
        reSizeBackground(this.canvasBgImg, this.w, this.h);
        rePostionContents(this.canvasObj.con, this.w, this.h, this.contentSize.w, this.contentSize.h);
        for(let i = 0; i < 3; i++){
            this.cardCons[i].x = this.w/2-240 + i*280;
        }
        this.canvas.renderer.resize(this.w, this.h);
    }
}

class CardCon extends PIXI.Container{
    constructor(i, posX){
        super();
        this.x =  posX;
        this.name = 'con'+i;
        this.interactive = true;
        this.cursor = 'pointer';
        this._eventSet();
        this.move = false;
        this.moving = false;
        this.outTimer = null;
        this.tarY = 0;
        this.update= (posY, wH)=>{
            if(!this.move){
                return;
            }
            if(this.moving){
                if(this.name === 'con1'){
                    this.tarY  = (wH - this.height) / (wH/posY) * -1 - this.height + wH;
                }else{
                    this.tarY  = (wH- this.height) / (wH / posY);
                }
            }
            this.y += (this.tarY  - this.y)*0.002;
        }
        this.hide =()=>{this.move = false;}
    }
    _eventSet() {
        this.pointerover = () => {
            clearTimeout(this.outTimer);
            this.move = true;
            this.moving = true;
        }
        this.pointerout= ()=> {
            this.moving = false;
            this.outTimer  = setTimeout(()=>{
                this.move = false;
            }, 10000)
        }
    }
}

class Card extends PIXI.Sprite{
    constructor(current, posY){
        super();
        this.texture = PIXI.Texture.fromImage(appInfo.staticPath+`/promo/aion/history/2018/181128_color/img/gate/gate_card_on_${current+1}.png`);
        this.pageKey = 'page'+(current+1);
        PIXI.Sprite.call(this,this.texture);
        this.position.y = posY * 445;
        this.interactive = true;
        this.overMotion = new TimelineMax({paused: true});
        this.outMotion = new TimelineMax({paused: true});
        this._eventSet();
        TweenMax.set(this, { pixi: { saturation : 0 }})


    }
    _eventSet(){
        this.overMotion
            .to(this, 0.5, { pixi: { saturation : 1, brightness : 2 }})
            .to(this, 0.3, { pixi: {brightness : 1 }})
        this.outMotion
            .to(this, 0.5, { pixi: { saturation : 0, brightness :1  }})
        this.pointerover= ()=>{
            this.overMotion.restart();
            this.outMotion.pause();
        }
        this.pointerout= ()=>{
            this.overMotion.pause();
            this.outMotion.restart();
        }
    }
    pageKey(){
        return this.pageKey;
    }
}