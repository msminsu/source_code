// import './style.scss';
// require('./style.scss');
import './style.scss';
import sayHello from './sayhello';
import {$,jQuery} from 'jquery';


// import MyFunction from './jstest'
import Layer from './jstest'

/* 

let test =  () => {
    console.log(20);
}

test();
console.log(sayHello(), 10); */



// MyFunction();
var layer1 = new Layer();

// layer1.open();


layer1.open(document.querySelector("body").innerHTML);
// console.log($('body'))