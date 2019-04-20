import $ from 'jQuery';

var Accodion = (function() {
	function constructor(opts) {
		this.opts = $.extend({
			el : '#contents',
			pos: 'center',
		},opts);

		this.init();
	}

	constructor.prototype = {
		init:function() {
			console.log( this.opts);
		},
		controls: function () {

		}
	}

	return constructor;
})();


var test  = new Accodion({
	elm: '.test'
})
