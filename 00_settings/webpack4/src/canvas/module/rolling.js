
export default class Rolling{
    constructor(target) {
        this.target = target;
        this._init();
    }
    _init(){
        $(this.target).slick({
            dots: true,
            centerMode: true,
            infinite: true,
            centerPadding: '0',
            slidesToShow: 3,
            speed: 600,
            touchMove: false,
            variableWidth: false,
        });
    }
}