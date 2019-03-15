// import './style.scss';
// require('./style.scss');
// import './style.scss';

import sayHello from './sayhello';
import $ from 'jquery';
// import MyFunction from './jstest'
import Layer from './modal/Layer'

/* 

let test =  () => {
    console.log(20);
}

test();
console.log(sayHello(), 10); */



// MyFunction();
window.layer1 = new Layer({
    modifier: "movie",
    esc: false,
  });


// layer1.open('<div>test</div>');

$('button').on('click',function(){
    layer1.open(document.querySelector(".modal").innerHTML);

    
})
layer1.on("layeropenstart", () => {
    console.log("layeropenstart");
  });
/* 
layer1.on("layeropenstart", () => {
    console.log("layeropenstart");
  });
 */
// console.log($('body'))
