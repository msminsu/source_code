import BasePage from  './basePage.js';

export default class Page1 extends BasePage{
    constructor(info){
        super(info);
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.particles = [];
        this.particlesLength = 80;
        this.frame = null; //requestAnimationFrame(animate);
        this.showMotion = new TimelineMax({paused: true, onComplete:this._showComplete, onCompleteParams:[this]});
        this.hideMotion = new TimelineMax({paused: true});
        this._eventSet();
        this._bgSet();
        this._motionSet();

        window.addEventListener("resize", this._resize.bind(this))
    }

    _eventSet(){
        $(this.ele).find('.btn-view-layer').on('click', ()=>{
            this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'showLayer', key:'layer1'}}));
        })
    }

    _bgSet(){
        let $bgCon = this.ele.querySelector('.bg_con'),
            particleImg = new Image();
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        $($bgCon).append(this.canvas);
        particleImg.src =  this.static+'/img/ef_particle.png';
        for (let i = 0; i < this.particlesLength; i++) {
            this.particles.push(new Particle(this.canvas, this.context, particleImg));
        }
    }
    _motionSet(){
        this.hideMotion
            .fromTo(this.ele.querySelector('.txt-1'), 0.7, {y: 0, autoAlpha:1}, {y:50, autoAlpha: 0, ease: Quart.easeOut})
            .fromTo(this.ele.querySelector('.txt-2'), 0.7, {y: 0, autoAlpha:1}, {y:50, autoAlpha: 0, ease: Quart.easeOut}, '-=0.6')
            .fromTo(this.ele.querySelector('.txt-3'), 0.7, {y: 0, autoAlpha:1}, {y:50, autoAlpha: 0, ease: Quart.easeOut}, '-=0.6')
            .fromTo(this.ele.querySelector('.txt-4'), 0.7, {y: 0, autoAlpha:1}, {y:50, autoAlpha: 0, ease: Quart.easeOut}, '-=0.6')
            .fromTo(this.ele.querySelector('.txt-5'), 0.7, {y: 0, autoAlpha:1}, {y:50, autoAlpha: 0, ease: Quart.easeOut}, '-=0.6')
            .fromTo(this.ele.querySelector('.btn-view-layer'), 0.7, {y: 0, autoAlpha:1}, {y:50, autoAlpha: 0, ease: Quart.easeOut}, '-=0.6')
            .call(()=>{this._hidetComplete(this)})
            .fromTo(this.ele.querySelector('.cha-2'), 1, {autoAlpha:1,y:0}, {autoAlpha: 0,y:100, ease: Cubic.easeOut}, '-=0.8')
            .fromTo(this.ele.querySelector('.cha-1'), 1, {autoAlpha:1,y:0}, {autoAlpha: 0, y:100, ease: Cubic.easeOut}, '-=0.8')
            .fromTo(this.ele.querySelector('.efc-1'), 0.7, {autoAlpha:1}, {autoAlpha: 0, ease: Quart.easeOut}, '-=0.7')
            .fromTo(this.ele.querySelector('.efc-2'), 0.7, {autoAlpha:1}, {autoAlpha: 0, ease: Quart.easeOut}, '-=0.7')
            .fromTo(this.ele, 2, {scale: 1, autoAlpha:1, y:0}, {autoAlpha:0, scale: 1, y:0, ease: Quart.easeOut}, '-=1')

        this.showMotion
            .fromTo(this.ele, 2, {scale: 1.1, autoAlpha:0, y:0}, {autoAlpha:1, scale: 1, y:0, ease: Quart.easeOut})
            .fromTo(this.ele.querySelector('.efc-1'), 0.7, {autoAlpha:0}, {autoAlpha: 1, ease: Quart.easeOut}, '-=0.7')
            .fromTo(this.ele.querySelector('.efc-2'), 0.7, {autoAlpha:0}, {autoAlpha: 1, ease: Quart.easeOut}, '-=0.7')
            .fromTo(this.ele.querySelector('.cha-2'), 1, {x:-200, y:0, autoAlpha:0}, {x:0, y:0, autoAlpha: 1, ease: Expo.easeOut}, '-=0.7')
            .fromTo(this.ele.querySelector('.cha-1'), 1, {x:200, y:0,autoAlpha:0}, {x:0, y:0, autoAlpha: 1, ease: Expo.easeOut}, '-=0.7')
            .fromTo(this.ele.querySelector('.txt-1'), 0.7, {x: -50, y:0, autoAlpha:0}, {x:0, y:0, autoAlpha: 1, ease: Quart.easeOut}, '-=0.5')
            .fromTo(this.ele.querySelector('.txt-2'), 0.7, {x: -50,y:0,  autoAlpha:0}, {x:0, y:0, autoAlpha: 1, ease: Quart.easeOut}, '-=0.5')
            .fromTo(this.ele.querySelector('.txt-3'), 0.7, {y: 50, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut}, '-=0.5')
            .fromTo(this.ele.querySelector('.txt-4'), 0.7, {y: 50, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut}, '-=0.5')
            .fromTo(this.ele.querySelector('.txt-5'), 0.7, {y: 50, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut}, '-=0.5')
            .fromTo(this.ele.querySelector('.btn-view-layer'), 0.7, {y: 50, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut}, '-=0.5')
            .fromTo(this.ele.querySelector('canvas'), 2, {y: 100, autoAlpha:0}, {y:0, autoAlpha: 1, ease: Quart.easeOut}, '-=1.5')
    };
    show(){
        TweenLite.set(this.ele, {css:{className:`+=${this.showClass}`}});
        this.showMotion.seek(0)
        this.showMotion.play();
        for(let i = 0; i < this.particlesLength; i++)
        {
            let p = this.particles[i];
            p.init();
        }
        this.frame = requestAnimationFrame(this.animate.bind(this, 'show'));
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
        if(type === null)return;
        cancelAnimationFrame(this.frame)
        this.frame = requestAnimationFrame(this.animate.bind(this, type));
    }
    _resize(){
        let dw = (this.canvas.width - window.innerWidth)/2;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        for(let i = 0; i < this.particlesLength; i++)        {
            let p = this.particles[i];
            p.resize(dw);
        }
    }
}
class Particle{
    constructor(canvas, context, particleImg){
        this.canvas = canvas;
        this.context = context;
        this.img = particleImg;
        this.x = Math.random()*900 + canvas.width/2-200;
        this.y = canvas.height - Math.random()*canvas.height;
        this.radius = Math.random() * 30;
        this.angle =Math.random();
        this.dy = Math.random()*100;
        this.w = canvas.width;
        this.h = canvas.height;
        this.alpha = Math.random()*0.5 + 0.5;
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
        if(this.y < -this.canvas.height*1.5) this.y = this.h;
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


