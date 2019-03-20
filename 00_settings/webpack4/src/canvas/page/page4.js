import BasePage from  './basePage';
import appInfo from "../controller/appInfo";
import {rePostionContents, reSizeBackground} from "../util/cavasResize";

export default class Page4 extends BasePage{
    constructor(info){
        super(info);
        this.canvas;
        this.canvasBgImg;
        this.canvasObj = {};
        this.canvasFilters = {};

        this.contentSize = {w:1920, h:1200};
        this.leafCon;
        this.leafs = [];
        this.leafNum = 50;
        this.leafsType = 'init';

        this._init();
        this._motionSet();
        window.addEventListener("resize", this._resize.bind(this));
    }

    _init(){
        this.canvas = new PIXI.Application(this.w, this.h, {transparent:true, autoStart:false});
        this.ele.querySelector('.bg-con').appendChild(this.canvas.view);

        this.canvasBgImg = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page4/page4_bg.jpg');
        this.canvasFilters.zoomBlurFilter =  new PIXI.filters.ZoomBlurFilter();
        this.canvasFilters.zoomBlurFilter.strength = 0.5;
        this.canvasFilters.zoomBlurFilter.center = [this.w/2, this.h/2];
        this.canvasFilters.zoomBlurFilter.innerRadius = 0;
        this.canvasBgImg.filters = [this.canvasFilters.zoomBlurFilter];
        this.canvas.stage.addChild(this.canvasBgImg);

        this.leafCon = new PIXI.Container();
        for(let i = 0; i < this.leafNum; i++){
            let leaf = new Leaf(this.w, this.h, i);
            this.leafCon.addChild(leaf);
            this.leafs.push(leaf);
        }

        this.canvas.stage.addChild(this.leafCon);


        this.canvasObj.con = new PIXI.Container();
        this.canvasObj.con.x = this.w/2 - this.contentSize.w/2;
        this.canvasObj.con.y = 0;
        this.canvas.stage.addChild(this.canvasObj.con);
        let conArea = new PIXI.Graphics(this.w/2 - this.contentSize.w/2, this.h/2 - this.contentSize.h/2);
        conArea.alpha = 0;
        conArea.drawRect(0, 0, this.contentSize.w, this.contentSize.h);
        this.canvasObj.con.addChild(conArea);

        this.canvasObj.ef = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page4/page4_character_ef.png');
        this.canvasObj.ef.x = 630;
        this.canvasObj.ef.y = 260;
        this.canvasObj.con.addChild(this.canvasObj.ef);

        this.canvasObj.charactor = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/page4/page4_character.png');
        this.canvasObj.charactor.x = 850;
        this.canvasObj.charactor.y = 93;
        this.canvasObj.con.addChild(this.canvasObj.charactor);

        this.canvas.ticker.add(()=> {
            for(let i = 0; i< this.leafNum; i++)
            {
                let leaf = this.leafs[i];
                if(this.leafsType === 'show')leaf.show();
                if(this.leafsType === 'hide')leaf.hide();
            }
        });
    }


    _motionSet(){
        this.hideMotion
            .fromTo(this.canvasObj.charactor, 1, { pixi: {alpha: 1} }, {y:557, pixi: {alpha: 0}, ease: Quart.easeOut})
            .fromTo(this.canvasObj.ef, 1, {y:264, pixi: { alpha: 1} }, {y:214, pixi: { alpha: 0}, ease: Quart.easeOut}, '-=1')
            .fromTo(this.ele.querySelector('.content'), 0.5,{autoAlpha: 1}, {autoAlpha: 0, ease: Quart.easeOut}, '-=1')
            .call(()=>{this._hidetComplete(this)}, null, null, '-=0.5')
            .to(this.ele, 1, {autoAlpha: 0, ease: Quart.easeOut})
        this.showMotion
            .fromTo(this.ele, 2, {autoAlpha:0}, {autoAlpha:1})
            .fromTo(this.canvasFilters.zoomBlurFilter, 2, { strength : 0.5 }, {strength:0, ease: Cubic.easeOut}, '-=2')
            .fromTo(this.canvasObj.charactor, 2, {y:630, pixi: { alpha: 0 , brightness: 5} }, {y:130, pixi: { alpha: 1, brightness: 1}, ease: Quart.easeOut}, '-=1')
            .fromTo(this.canvasObj.ef, 2, {y:200, pixi: { alpha: 0, brightness:5} }, {y:260, pixi: { alpha: 1, brightness:1}, ease: Quart.easeOut}, '-=1.5')
            .set( this.ele.querySelector('.content'), {autoAlpha:1})
            .fromTo(this.ele.querySelector('h2 span'), 0.5, { autoAlpha: 0, y: -50 },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('h2 strong'), 0.5, { autoAlpha: 0, y: -50 },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('p.txt .line'), 0.8, { marginLeft:-100, width:0 },{ marginLeft:-374, width:549, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('p.txt .txt_1 span'), 0.8, {y: 50 },{ y: 0, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('p.txt .txt_2'), 0.8, { autoAlpha: 0, y: 50 },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.3')
            .fromTo(this.ele.querySelector('p.txt .txt_3'), 0.8, { autoAlpha: 0, y: 50 },{ autoAlpha: 1, y: 0, ease: Quart.easeOut }, '-=0.3')

    };

    show(){
        super.show();
        this._resize();
        this.canvas.start();
        for(let i = 0; i< this.leafNum; i++)
        {
            let leaf = this.leafs[i];
            leaf.init(this.w);
        }
        this.leafsType = 'show';
        TweenMax.set(this.canvasBgImg, {pixi:{alpha: 1, brightness:1}});
        TweenMax.set(this.ele.querySelector('p.txt .txt_2 span'), {width:0})
        TweenMax.set(this.ele.querySelector('p.txt .txt_3 span'), {width:0})
    }
    _showComplete(){
        super._showComplete();
        this.leady =true;

        TweenMax.fromTo(this.ele.querySelector('p.txt .txt_2 span'), 3, {width:0}, {width:585, ease:Linear.easeNone})
        TweenMax.fromTo(this.ele.querySelector('p.txt .txt_3 span'), 3, {width:0}, {width:585, ease:Linear.easeNone, delay:3})
    }

    hide(){
        super.hide();
        this.leafsType = 'hide';
    }

    _hidetComplete(){
        super._hidetComplete();
        this.canvas.stop();
        this.leady =false;
    }


    _resize(){
        this.w =  window.innerWidth;
        this.h =  window.innerHeight;
        reSizeBackground(this.canvasBgImg, this.w, this.h);
        rePostionContents(this.canvasObj.con, this.w, this.h, this.contentSize.w, this.contentSize.h, true);

        this.canvas.renderer.resize(this.w, this.h);
    }
}

class Leaf extends PIXI.Sprite{
    constructor(w, h, num){
        super();
        this.x =0;
        this.y = 0;
        this.w = w;
        this.h = h;
        this.scale.x = 1;
        this.scale.y = 1;
        this.heu = 50;
        this.alpha = 1;
        this.rotatiin = 0;
        this.speedX = 1;
        this.speedY = 1;
        this.dSpeed = 1;
        this.angle =Math.random();
        this.rotation =Math.random() * 360;
        this.anchor.set(0.5);
        TweenMax.set(this,{ pixi: {hue:Math.random() * 60-30}})
        this.img = new PIXI.Sprite.fromImage(appInfo.staticPath+`/promo/aion/history/2018/181128_color/img/intro/par_leaf${num%2}.png`);

        this._draw();
    }
    _draw(){
        this.addChild(this.img);
    }

    _update(){
        if(this.y > this.h){
            this.x = Math.random() *this.w*2;
            this.y =-20;
        }
        if(this.dSpeed <=1)this.dSpeed = 1;
    }

    init(){
        this.dSpeed = 10;
        this.x = Math.random() *this.w + this.w;
        this.y = Math.random()* this.h - this.h;
        let scale = (Math.random()*2 + 8) *0.1
        this.scale.x = scale;
        this.scale.y = scale;
        this.alpha = Math.random()*0.7;
    }

    show(){
        this.angle +=0.01;
        this.dSpeed -= 0.02;
        this.x -= Math.sin(this.angle*3) +this.speedX * this.dSpeed;
        this.y += this.speedY*this.dSpeed;
        this.rotation = Math.sin(this.angle*2);
        this.scale.y = Math.cos(this.angle*2);
        this._update();
    }

    hide(){
        this.dSpeed += 1;
        this.x -= Math.sin(this.angle*3) +this.speedX * this.dSpeed;
        this.y += this.speedY*this.dSpeed;
        this.rotation = Math.sin(this.angle*2);
        this.scale.y = Math.cos(this.angle*2);
        this.alpha -=0.02;
        this._update();
    }
}