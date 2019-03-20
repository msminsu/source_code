
var start =['mislav', 'stanko', 'mislav', 'ana'];
var end =['stanko', 'ana', 'mislav'];

function solution(participant, completion) {
    var answer = '';
    
    for( var i= 0; i< start.length; i++){
        if(end.indexOf(start[i]) < 0){
            answer  = start[i];
        }
    }
    return answer;
}

console.log(solution(start, end));