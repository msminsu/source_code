import BasePage from  './basePage';
import appInfo from "../controller/appInfo";
import {rePostionContents, reSizeBackground, resizeBackground, resizeContents} from '../util/cavasResize';

export default class Intro extends BasePage{
    constructor(info){
        super(info);
        this.bgPlayer = null;
        this.canvas;
        this.canvasBgImg;
        this.canvasObj = {};
        this.canvasFilters = {};
        this.contentSize = {w:1920, h:1200};
        this.leafCon;
        this.leafs = [];
        this.leafNum = 50;
        this.leafsType = 'init';
        this.leady = false;
        this._init();
        this._eventSet();
        this._motionSet();
        window.addEventListener("resize", this._resize.bind(this));
    }

    _init(){
        this.bgPlayer = new nc.promokit.Player({
            selector: '#intro-bg',
            videoId: 'http://vodfile.ncsoft.co.kr/ncvod/plaync/Aion/7update/AION_Web_BG.mp4',
            mute: true,
            controls: false,
            coverClick: false,
            loop: true
        });
        this.canvas = new PIXI.Application(this.w, this.h, {transparent:true, autoStart:false});
        this.ele.querySelector('.bg-con').appendChild(this.canvas.view);

        this.canvasBgImg = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/intro/intro_bg.jpg');
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


        this.canvasObj.title = new PIXI.Sprite.fromImage(appInfo.staticPath+'/promo/aion/history/2018/181128_color/img/intro/intro_title.png');
        this.canvasObj.title.x = this.contentSize.w/2 - 395;
        this.canvasObj.title.y = 175;

        //this.canvasFilters.titleFilter =  new PIXI.filters.BlurFilter();
        //this.canvasObj.title.filters = [this.canvasFilters.titleFilter];
        this.canvasObj.con.addChild(this.canvasObj.title);

        this.canvas.ticker.add(()=> {
            for(let i = 0; i< this.leafNum; i++)
            {
                let leaf = this.leafs[i];
                if(this.leafsType === 'show')leaf.show();
                if(this.leafsType === 'hide')leaf.hide();
            }
        });

    }
    _eventSet(){
        let player = new nc.promokit.Player({
            selector: '#player-intro',
            videoId: 'G5sFLPhM0b0',
            mute: false,
            controls: true,
            coverClick: true
        });

        let layerMovie = new nc.promokit.Layer({
            el: "#introMovie",
            fade: true,
            esc: true,
            dim: true,
            dimClickClose: true
        });

        this.ele.querySelector('.btn-play').addEventListener('click', ()=>{
            if(!this.leady)return;
            layerMovie.open();
            player.play();
            this.bgPlayer.pause();
            this.canvas.stop();
            this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'openLayer'}}));
        })

        $("#introMovie .layer_close").on("click", ()=>{
            layerMovie.close();
            player.pause();
            this.bgPlayer.play();
            this.canvas.start();
            this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'closeLayer'}}));
        });
    }
    _motionSet(){
        this.hideMotion
            .fromTo(this.canvasObj.title, 1, {pixi: {alpha: 1} }, {pixi: {alpha: 0}, ease: Quart.easeOut})
            .fromTo( this.ele.querySelector('.txt-1'), 0.5, {autoAlpha:1, y:0}, {autoAlpha:0, y:50, ease: Quart.easeOut},'-=1')
            .fromTo( this.ele.querySelector('.btn-play'), 0.5, {autoAlpha:1, y:0}, {autoAlpha:0, y:50, ease: Quart.easeOut},'-=1')
            .call(()=>{this._hidetComplete(this)}, null, null, '-=0.2')
            .to(this.ele, 1, {autoAlpha: 0, ease: Quart.easeOut})
        this.showMotion
            .fromTo(this.ele, 2, {autoAlpha:0}, {autoAlpha:1})
            .fromTo(this.canvasFilters.zoomBlurFilter, 2, { strength : 0.5 }, {strength:0}, '-=2')
            .fromTo(this.canvasObj.title, 2, {pixi: {alpha: 0}}, {pixi: {scale:1, alpha:1, saturation:1}}, '-=1')
            .addLabel('txt', '-=1')
           // .to(this.canvasObj.title, 2, {pixi: { saturation:1, alpha:1}}, '-=1')
            //.to(this.canvasFilters.titleFilter, 2, { outerStrength : 0 })
            .fromTo( this.ele.querySelector('.txt-1'), 0.5, {autoAlpha:0, y:50}, {autoAlpha:1, y:0, ease: Quart.easeOut},'txt')
            .fromTo( this.ele.querySelector('.btn-play'), 0.5, {autoAlpha:0, y:50}, {autoAlpha:1, y:0, ease: Quart.easeOut},'txt+=0.3')
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

    }
    _showComplete() {
        super._showComplete();
        this.bgPlayer.seek(1.6);
        this.bgPlayer.play();
        this.leady = true;
        TweenMax.to(this.canvasBgImg, 0.3, {pixi:{alpha: 0, brightness:0}, delay:0.1});
    }
    hide(){
        super.hide();
        this.leafsType = 'hide';
    }
    _hidetComplete(){
        super._hidetComplete();
        this.leady = false;
        this.canvas.stop();
        this.bgPlayer.pause();
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