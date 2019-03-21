
//  재정의 방지  1번 방식
/* if( typeof nameSpace === 'undefined'){
    var nameSpace = {};
} */

//  재정의 방지  2번 방식
var nameSpace  = nameSpace || {};

// 객체의 프로퍼티로 추가
nameSpace.num = 1;

// 함수 추가
nameSpace.increaseNum = function() {
    console.log('increase!');
}

nameSpace.decreaseNum = function() {
    console.log('decrease!');
}

