var theCanvas = document.getElementById('canvasOne');


if(!theCanvas || !theCanvas.getContext){
//	return;
}

function canvasSupport() {
	return !!document.createElement('testcanvas').getContext;
}


var context = theCanvas.getContext('2d');
context.fillStyle = '#ffffaa';
context.fillRect(0, 0, 500, 300);

context.fillStyle="#000";
context.font = "20px _sans";
context.textBaseline = "top";
context.fillText("Hello World", 195, 80)