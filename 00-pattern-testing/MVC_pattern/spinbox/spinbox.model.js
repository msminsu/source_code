(function (exports){
    function SpinboxModel (value){
        value = value || 100;
        this.data = value;
    }

    exports.SpinboxModel = SpinboxModel;
})(this);

SpinboxModel.prototype = {
    increase : function (value) {
        value = value || 1;
        this.data += value;
        return this.data;
    },
    decrease: function (value) {
        value = value || 1;
        this.data -= value;
        return this.data;
    },
    getData: function () {
        return this.data;
    }
}