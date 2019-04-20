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
ava
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
/* 
let increase = function(num){
    return ++num;
}
let decrease = function(num){
    return --num;
}

let predicates = {increase, decrease};

 console.log( predicates(1)) */


/*  var funcs = [];

 for( let i = 0; i < 10; i++){
   funcs.push(function(){
       console.log(i);
   });
 }
 
funcs.forEach(function(func){
    func();
});
 */

function Lecture( name, teacher ) {
    this.name  = name;
    this.teacher = teacher;
}

Lecture.prototype.display = function() {
    return this.teacher + " is teaching " + this.name;
}

function Schedule( lectures ) {
    this.lectures = lectures;
}

Schedule.prototype.display = function() {
    var str = "";

    for( var i = 0; i < this.lectures.length; i++)
        str += this.lectures[i].display() + " ";
    
    return str;
}


var mySchedule = new Schedule([
    new Lecture("운동", '스미스'),
    new Lecture('수학','존'),
    new Lecture('영어', '테드')
]);

// console.log(mySchedule.display());


function strict( types, args ) {
    if( types.length != args.length ) {
        throw "Invalid number of arguments. Expected" + types.length +", received "+ args.length + " insted," ;
    }

    for ( var i = 0; i < args.length; i++ ) {
        if ( args[i].constructor != types[i] ){
            throw "Invalid argument type. Expected " + types[i].name + ", received " + args[i].constructor.name + ' instead';
        }
    }
}


function userList(prefix , num , users) {
   strict( [Number, Number, Array],arguments );

    for( var i = 0 ; i< num ; i++ ) {
        console.log(prefix + " : " + users[i]);
    }
}

userList("KOREA", 200, ['바나나','수박','사과']);