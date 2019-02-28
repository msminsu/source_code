// $(document).ready(function(){
/*     var wT;
    $(window).scroll(function(){
        wT = $(window).scrollTop();
        checkArea();
       });

       var arr = [];

       $('.motion').each(function(){
            arr.push($(this).offset().top);
        });


       function checkArea() {

           for(var i =0; i < arr.length; i++){
            if ( wT > arr[i] ) {
                $('.motion').eq(i).addClass("active");
               }else{
                $('.motion').eq(i).removeClass("active");
               }
           }
       } */

    

   
// })


/* 

$(function(){

    var chkbtn = 0;
    $(".order-same").click(function(e){
        e.preventDefault();
        
        if(chkbtn===0) {
            $(this).addClass('chk'); 
            chkbtn = 1; 
            console.log(chkbtn); //<< 개발자도구에서 확인해보니 한번클릭시 0 과 1이 동시에 뜨더라구요 ㅜ
        }
        
        else if (chkbtn===1) {
            $(this).removeClass('chk');
            chkbtn = 0; 
            console.log(chkbtn);
        }
    });

});
  */


var num = 10;

/* 
let decrease = function(num){
    return --num;
}

let predicates = {increase, decrease};

function makeCounter(predicates){
    let num = 0;

    return function (){
        num = predicates(num);
        return num;
    };
}

let increaser = makeCounter(predicates.increase);
console.log(increaser());
console.log(increaser());

let decreaser = makeCounter(predicates.decrease);
console.log(decreaser());
console.log(decreaser());
 */

let increase = function(num){
    return ++num;
}
let decrease = function(num){
    return --num;
}

let predicates = {increase, decrease};

 console.log( predicates(1))