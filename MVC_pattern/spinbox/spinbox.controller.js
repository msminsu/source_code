(function(exports){
    function SpinboxController(){
        this.spinboxModel = new SpinboxModel();
        this.spinboxView = new spinboxView();

        this.spinboxView.render(this.spinboxModel.getData());

        $(".btn-increase").on("click", $.proxy(this.onClickIncrease, this));
        $(".btn-decrease").on("click", $.proxy(this.onClickDecrease, this));
    }
     exports.SpinboxController = SpinboxController;
 
})(this);
