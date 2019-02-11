import TimeLineMax from "../node_modules/gsap/TimelineMax.js";

export default class FlipCounter {
    constructor(opts) {
        try {
            this.ele = document.querySelector(opts.ele);
            this.parts = opts.parts;
            this.type = opts.type;
            this.futureDate;
            this.currentDate;
            this.introLoof =  20;
            this.flips = [];
            this._init();
        } catch (error) {
            console.log(error);
        }
    }

    // 카운트 날짜 구분 생성
    _init() {
        let groups = this.parts.split('-');
        let index = 0;
        for (let i = 0; i < groups.length; i++) {
            let part = groups[i].split('');
            for (let j = 0; j < part.length; j++ ) {
                let flip = new Flip(this.type, index, this.ele);
                this.flips.push(flip);
                index ++;
            }
        }
    }

    // 
    play(futureDate, currentDate) {

        if(this.type == 'countdown') {
            this.futureDate = futureDate;
        }
        if(currentDate) {
            this.currentDate = currentDate;
        }else{
            this.currentDate = new Date();
        }
        
        this._getTime()
        
        let currentTime = this._getTime().split('');
        this.intro(currentTime);
    }

    intro(currentTime) {
        if(this.introLoof < 0){
            if( this.type == 'countdown') this.start();
            return;
        }

        let cur = currentTime;
        let time = 20 - this.introLoof;
        let speed = (this.introLoof/10) + 1;
        this.introLoof -= 1;
            
        for( let i = 0; i < this.flips.length; i++) {
            let flip = this.flips[i];
            setTimeout(()=>{
                flip.intro(cur[i], speed );
                cur[i] = cur[i] < 1 ? 9 : cur[i] - 1;
            }, i*300);
        }

        setTimeout( () => {this.intro(cur)}, time*10);

    }

    start(){
       setInterval(this._update.bind(this), 1000);
    }

    _update(){
        let currentTime = this._getTime().split('');
        for (let i = 0; i <  this.flips.length; i++) {
            let flip = this.flips[i];
            flip.number = currentTime[i]
            console.log( flip.number, currentTime[i]);
        }
    }
    // 목표시간 계산
    _getTime() {
        let str = [];
        this.currentDate = new Date(this.currentDate.getTime() + 1000 );
        let diff = this.futureDate.getTime() - this.currentDate.getTime();
        let groups = this.parts.split('-');

        
        for( let i = 0; i < groups.length; i++ ) {
            if(groups[i] == 'dd') {
                str.push(this._numCheck(Math.floor(diff / (1000 * 60 * 60 * 24))));
            };
            if(groups[i] == 'hh') {
                str.push(this._numCheck(Math.floor(diff/ (1000 * 60 * 60 )) % 24));
            };
            if(groups[i] == 'mm'){
                str.push(this._numCheck(Math.floor(diff / (1000 * 60)) % 60));
            };
            if(groups[i] == 'ss'){
                str.push(this._numCheck(Math.floor(diff / 1000) % 60));
            };
        }

        return str.join('');
    }

    // 10보다 작은 수 앞에 0 붙이기
    _numCheck(num){
        let reNum = num;
        reNum < 10 ? reNum = '0'+reNum : reNum;
        return reNum;
    }
}


class Flip{
    constructor(type, index, parent) {
        this.type = type;
        this.index = index;
        this.parent = parent;
        this.ele;
        this.num = 0;
        this.backEle;
        this.forwardEle;
        this.flipMotion = new TimeLineMax({paused: true});
        this._init();
    }

    _init() {
        let conDiv;
        conDiv = document.createElement('div');
        conDiv.classList.add('flip');
        conDiv.setAttribute('data-index', this.index);

        this.backEle = document.createElement('div');
        this.backEle.classList.add('back');

        this.forwardEle = document.createElement('div');
        this.forwardEle.classList.add('forward');

        for( let i = 0; i< 2; i++) {
            let upDiv, downDiv;

            upDiv = document.createElement('div');
            upDiv.classList.add('up');
            downDiv = document.createElement('div');
            downDiv.classList.add('down');

            if( i == 0 ) {
                this.backEle.appendChild(upDiv);
                this.backEle.appendChild(downDiv);
            }else{
                this.forwardEle.appendChild(upDiv);
                this.forwardEle.appendChild(downDiv);
            }

            conDiv.appendChild(this.backEle);
            conDiv.appendChild(this.forwardEle);
            this.parent.appendChild(conDiv);
        }

        this.flipMotion
            .set(this.forwardEle.querySelector('.up'), {autoAlpha:1})
            .set(this.backEle.querySelector('.down'), {autoAlpha:0})
            .fromTo(this.forwardEle.querySelector('.up'),0.2,{rotationX:0},{rotationX:-90, ease:Cubic.easeIn})
            .set(this.forwardEle.querySelector('.up'), {autoAlpha:0})
            .set(this.forwardEle, {css:{zIndex:0}})
            .set(this.backEle, {css:{zIndex:1}})
            .set(this.backEle.querySelector('.down'), {autoAlpha:1})
            .fromTo(this.backEle.querySelector('.down'),0.2,{rotationX:90},{rotationX:0, ease:Back.easeOut})
    }

    set number(num){
        if(this.num == num)return;
        this.flipMotion.seek(0);
        this._animate(num);
    }

    _animate(num){ this.backEle.setAttribute('data-num', num);
        this.forwardEle.setAttribute('data-num', this.num);
        this.flipMotion.play();
        this.num = num; 
    }

    intro(num, time){
       this.flipMotion.timeScale(time);  //  timeScale = 모션 빠르기 
        this.number = num;
    }
}