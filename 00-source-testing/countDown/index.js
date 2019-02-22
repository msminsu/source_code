import FlipCounter from "./module/flipCounter.js";

let futureDate  = new Date(2019, 1, 23, 5);
var currentDate = new Date();
var isMotion = true;

const flipCounter = new FlipCounter({
    ele: '#counter',
    parts: 'dd-hh-mm-ss',
    type: 'countdown'
});



function initCount(){
    if(!isMotion)return;
    currentDate = new Date();    
    setTimeout(initCount, 1000);
}

initCount();

function start() {
    flipCounter.play(futureDate, currentDate);
    isMotion = false;
}

start();



