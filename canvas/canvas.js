window.addEventListener('load', eventWindowLoaded, false);

var Debugger = function () {};

Debugger.log = function (message) {
	try {
		console.log(message);
	}catch (exception) {
		return;
	}
}

function eventWindowLoaded() {
	canvasApp();
}

function canvasSupport() {
	//return Modernizr.canvas;
}

function canvasApp() {
	var guesses = 0;
	var message = "Guess The Letter From a (lower) to z (higher)";
	var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	var today = new Date();
	var letterToGuess = "";
	var higherOrLower  = "";
	var lettersGuessed;
	var gameOver = false;

	var theCanvas = document.getElementById('canvasOne');
	var context = theCanvas.getContext("2d");

	initGame();

	function initGame() {
		var letterIndex = Math.floor(Math.random() * letters.length);
		letterToGuess = letters[letterIndex];
		guesses  = 0;
		lettersGuessed = [];
		gameOver = false;
		window.addEventListener('keyup',eventKeyPressed, true);
		var formElement= document.getElementById('CreateImageData')
	}
	
}

function initGame() {
	var letterIndex = Math.floor(Math.random() * letters.length);
	var letterIndex = Math.floor(Math.random() * letters.length);
	var letterIndex = Math.floor(Math.random())
	var letterIndex =Math.floor(Math.random * )
	var letterIndex = Math.floor(Math.random * )
}



var 선언과 호이스팅


function getValue(condition) {
    console.log(value,1);
    if (condition) {
        var value = 'blue';
        //나머지 코드
        return value;
    } else {
        console.log(value,3);
        return null;
    }
}

// 자바스크립트 엔진 내부 적으로 아래와 같이 변경됨

function getValue(condition) {
    var value;
    if (condition) {
        value = 'blue';
        //나머지 코드
        return value;
    } else {
        return null;
    }
}