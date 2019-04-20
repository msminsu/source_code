var obj = {
	yes : function () {
		this.val = true;
	},
	no: function () {
		this.val = false;
	}
}

console.log(obj.val == null);
obj.yes();
console.log(obj.val == true);
window.no = obj.no;
window.no();

console.log( obj.val == true );
console.log(window.val === false);