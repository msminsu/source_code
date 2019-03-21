(function(exports){
    function SpinboxView(){
        
    }
     exports.SpinboxView = SpinboxView;
 
})(this);

SpinboxView.prototype = {
    render : function (value) {
        $('.result').val(value);
    }
}