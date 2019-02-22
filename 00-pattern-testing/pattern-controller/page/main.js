import BasePage from  './basePage.js';

export default class Main extends BasePage{
    constructor(info){
        super(info);
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.particles = [];
        this.particlesLength = 100;
        this.smokes = [];
        this.smokeLength = 5;
        this.frame = null; //requestAnimationFrame(animate);
        this.showMotion = new TimelineMax({paused: true, onComplete:this._showComplete, onCompleteParams:[this]});
        this.hideMotion = new TimelineMax({paused: true});
        this._bgSet();
        this._motionSet();
        window.addEventListener("resize", this._resize.bind(this))
    }
    _bgSet(){
        let $bgCon = this.ele.querySelector('.bg_con'),
            particleImg = new Image(),
            smokeImg1 = new Image(),
            smokeImg2 = new Image();
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        $($bgCon).prepend(this.canvas);
        particleImg.src =  this.static+'/ef_particle.png';
        smokeImg1.src =  this.static+'/main_ef_1.png';
        smokeImg2.src =  this.static+'/main_ef_2.png';
        for (let i = 0; i < this.particlesLength; i++) {
            this.particles.push(new Particle(this.canvas, this.context, particleImg));
        }
        for (let j = 0; j < this.smokeLength; j++) {
            if(j%2 === 0)this.smokes.push(new Smoke(this.canvas, this.context, smokeImg1, j/5));
            if(j%2 === 1)this.smokes.push(new Smoke(this.canvas, this.context, smokeImg2, j/5));

        }
        //this.smoke = new Smoke(this.canvas, this.context, smokeImg)
    }
    _motionSet(){

        this.hideMotion
            .fromTo(this.ele.querySelector('.txt-3'), 0.7, {y: 1, autoAlpha:1}, {y:50, autoAlpha: 0, ease: Quart.easeOut})
            .fromTo(this.ele.querySelector('.txt-2'), 0.7, {y: 1, autoAlpha:1}, {y:50, autoAlpha: 0, ease: Quart.easeOut}, '-=0.5')
            .fromTo(this.ele.querySelector('.txt-1'), 0.7, {y: 1, autoAlpha:1}, {y:50, autoAlpha: 0, ease: Quart.easeOut}, '-=0.5')
            .call(()=>{this._hidetComplete(this)})
            .fromTo(this.ele, 2, {scale: 1, autoAlpha:1, y:0}, {autoAlpha:0, scale: 1, y:0, ease: Quart.easeOut}, '0')

        this.showMotion
            .fromTo(this.ele, 2, {scale: 1.1, autoAlpha:0, y:0}, {autoAlpha:1, scale: 1, y:0, ease: Quart.easeOut})
            .addLabel("txt", "-=0.5")
            .fromTo(this.ele.querySelector('canvas'), 2, {y: 0, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut})
            .fromTo(this.ele.querySelector('.txt-1'), 0.7, {x: -50,y:0, autoAlpha:0}, {x:0, autoAlpha: 1,y:0, ease: Quart.easeOut}, 'txt')
            .fromTo(this.ele.querySelector('.txt-2'), 0.7, {y: 50, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut}, 'txt+=0.3')
            .fromTo(this.ele.querySelector('.txt-3'), 0.7, {y: 50, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut}, 'txt+=0.6')

    };
    show(){
        TweenLite.set(this.ele, {css:{className:`+=${this.showClass}`}});
        this.showMotion.seek(0)
        this.showMotion.play();
        setTimeout(()=>{
            for(let i = 0; i < this.particlesLength; i++)
            {
                let p = this.particles[i];
                p.init();
            }
            for(let j = 0; j< this.smokeLength; j++)
            {
                let q = this.smokes[j];
                q.init();
            }
            this.frame = requestAnimationFrame(this.animate.bind(this, 'show'));
        },2000)

    }

    hide(){
        this.hideMotion.seek(0)
        this.hideMotion.play();
        cancelAnimationFrame(this.frame)
        this.frame = requestAnimationFrame(this.animate.bind(this, 'hide'));
    }
    hideComplete(){
        cancelAnimationFrame(this.frame)
    }
    animate(type){

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for(let i = 0; i < this.particlesLength; i++)
        {
            let p = this.particles[i];
            if(type === 'show')p.move();
            if(type === 'hide')p.hide();
        }
        for(let j = 0; j< this.smokeLength; j++)
        {
            let q = this.smokes[j];
            if(type === 'show')q.move();
            if(type === 'hide')q.hide();
        }
        if(type === null)return;
        cancelAnimationFrame(this.frame)
        this.frame = requestAnimationFrame(this.animate.bind(this, type));
    }
    _resize(){
        let dw = (this.canvas.width - window.innerWidth)/2;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        for(let i = 0; i < this.particlesLength; i++)
        {
            let p = this.particles[i];
            p.resize(dw);
        }
        for(let j = 0; j< this.smokeLength; j++)
        {
            let q = this.smokes[j];
            q.resize(dw);
        }
    }
}

class Smoke{
    constructor(canvas, context, img, i){
        this.canvas = canvas;
        this.context = context;
        this.img = img;
        this.x = canvas.width/2 - 430 ;
        this.y = -90;
        this.w = 1300 + Math.random()*56;
        this.h = Math.random()*100 + 900;
        this.hue = Math.random()*70 - 10;
        this.dhue = 1;
        this.alpha = i;
        this.dalpha = 0.005;
        this.cAlpha = i;
    }
    draw(){
        this.context.globalAlpha = this.alpha;
        this.context.filter = `hue-rotate(${this.hue}deg)`;
        this.context.drawImage(this.img, this.x , this.y, this.w, this.h);
    }
    init(){
        this.y = -90;
        this.w = 1300 + Math.random()*56;
        this.h = Math.random()*100 + 900;
        this.hue = Math.random()*70 - 10;
        this.dhue = 1;
        this.alpha = this.cAlpha;
        this.dalpha = 0.005;
    }
    move(){
        this.alpha += this.dalpha ;
        if(this.alpha >= 1) {
            this.dalpha *= -1;
            this.alpha = 1
        }
        if(this.alpha <= 0) {
            this.dalpha *= -1;
            this.alpha = 0;
            this.h =  Math.random()*100 + 900;
            this.y = -90;
        }
        this.hue += this.dhue;
        this.h -= (this.alpha/20)
        this.y -= (this.alpha/20)
        if(this.hue >=60){
            this.dhue *= -1;
            this.hue = 60;

        }
        if(this.hue <= -10) {
            this.dhue *= -1;
            this.hue = -10;
        }
        this.draw();
    }
    hide(){
        this.alpha -= 0.03;
        this.y -= 10;
        this.h += 10;
        if(this.alpha <= 0)this.alpha = 0;
        this.draw();
    }
    resize(dw) {
       // this.w = this.canvas.width;
        //this.h = this.canvas.height;
        this.x -= dw;
    }
}
class Particle{
    constructor(canvas, context, img){
        this.canvas = canvas;
        this.context = context;
        this.img = img;
        this.x = Math.random()*canvas.width/2 + canvas.width/3 ;
        this.y = canvas.height - Math.random()*canvas.height;
        this.radius = Math.random() * 30;
        this.angle =Math.random();
        this.dy = Math.random()*100;
        this.w = canvas.width;
        this.h = canvas.height;
        this.alpha = Math.random()*0.7 + 0.3;
    }
    draw(){
        this.context.globalAlpha = this.alpha;
        this.context.drawImage(this.img, this.x , this.y, this.radius, this.radius);
    }
    init(){
        this.y = this.canvas.height*2 - Math.random()*this.canvas.height*2;
        this.dy =  Math.random()*100;
    }
    move(){
        this.angle +=0.01;
        this.x += Math.sin(this.angle*3);
        this.y -= this.radius/10; //Math.cos(this.angle*5)
        if(this.y < -this.canvas.height*2) this.y = this.h;
        this.draw();
    }
    hide(){
        this.dy +=0.01;
        this.y += this.dy;
        this.draw();
    }
    resize(dw) {
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.x -= dw;
    }
}