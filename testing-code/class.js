class Person {
	constructor(name, first, second) {
		this.name = name;
		this.first = first;
		this.second = second;
	}

	sum() {
		return 'prototype : ' + (this.first + this.second);
	}
}



var kim  = new Person('kim', 10, 20);
kim.sum = function() {
	return 'this : ' + (this.first + this.second);
}
console.log('kim', kim.sum());