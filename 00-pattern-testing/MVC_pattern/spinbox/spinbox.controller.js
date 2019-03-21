(function(exports){
    function SpinboxController(){
        this.spinboxModel = new SpinboxModel();
        this.spinboxView = new SpinboxView();

        this.spinboxView.render(this.spinboxModel.getData());

        $(".btn-increase").on("click", $.proxy(this.onClickIncrease, this));
        $(".btn-decrease").on("click", $.proxy(this.onClickDecrease, this));
    }
     exports.SpinboxController = SpinboxController;
 
})(this);


SpinboxController.prototype = {
    onClickIncrease: function () {
        this.spinboxModel.increase();
        this.spinboxView.render(this.spinboxModel.getData());
    },
    onClickDecrease: function () {
        this.spinboxModel.decrease();
        this.spinboxView.render(this.spinboxModel.getData());
    }
}
