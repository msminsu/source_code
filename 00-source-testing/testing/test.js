var kTmpLst = [];
var rndmLst = []; 

for( var i =1; i<46; i++){
	kTmpLst.push(i)
}

/* var kLenToNeed = 6;
for(var i= 0; 	i< kLenToNeed;	 i++){
	var kR = Math.floor(Math.random() * (kTmpLst.length-1)) + 1;
	var kOne = kTmpLst[kR];
	kTmpLst.splice(kR,1);
	rndmLst.push(kOne);
	rndmLst.sort(function(a, b) {
		return a - b;
	})
}
console.log(rndmLst) */
// console.log(kTmpLst.splice(2,1),kTmpLst);


function getRandomLst (pLst, pLen) {
	var kLst =[];
	for( var i = 0; i <pLen; i++ ) {
		var kR = Math.floor(Math.random() * (kTmpLst.length-1)) + 1;
		var kOne = pLst[kR];
		kLst.push(kOne);
		pLst.splice(kR, 1);
	}
	return kLst.sort(function(a, b) {
		return a - b;
	});
}

var test = getRandomLst(kTmpLst, 6);
console.log( test );

