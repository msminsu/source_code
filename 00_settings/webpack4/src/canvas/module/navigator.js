let instance;
export default class Navigator{
    constructor(ele) {
        if (instance) return instance;
        instance = this;
        this.ele = ele;
        this.btns = this.ele.querySelectorAll('li >a');
        this.leady = false;
        this.activeKey = '';
        this._init();
    }
    _init(){
        $(this.btns).on('click', (e) =>{
            if(!this.leady)return;
            if($(e.currentTarget).attr('data-key') === this.activeKey)return;
            let key = $(e.target).attr('data-key')
            this.ele.dispatchEvent(new CustomEvent("pageEvent", {detail:{action:'changePage', key:key}}));
        })
    }
    set select(key){
        $(this.btns).parent().removeClass('active');
        $(this.btns).filter(`[data-key=${key}]`).parent().addClass('active');
        this.activeKey = key;
    }

    set isLeady(b){
        this.leady = b;
    }
}
