
import $ from 'jquery';
import Layer from './Layer'

window.layer1 = new Layer({
    modifier: "movie",
    esc: false,
  });


$('button').on('click',function(){
    layer1.open(document.querySelector(".modal").innerHTML);

    
})
layer1.on("layeropenstart", () => {
    console.log("layeropenstart");
  });