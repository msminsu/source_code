export default class TabMenu{
    constructor(opts){
        try{
            this.ele = document.querySelector(opts.ele);
            this.tabWrap = this.ele.querySelector('[data-tab="tabWrap"]');
            this.tabs = this.tabWrap.querySelectorAll('[data-tab="tabWrap"]>li');
            this.tabContentWrap = this.ele.querySelector('[data-tab="tabContents"]');
            this.tabContent =  this.tabContentWrap.querySelectorAll('[data-tab]');
            //this.selected = opts.selected ? opts.selected : this.tabWrap.querySelector('.active').getAttribute('data-tab');
            if(opts.selected){
                this.selected = opts.selected;
            }else{
                if(this.tabWrap.querySelector('.active')){
                    this.selected =  this.tabWrap.querySelector('.active').getAttribute('data-tab');
                }else{
                    //this.selected = 'tab-1'
                }
            }
            this._init();

        }catch(e){
            console.log(e);
        }
    }

    _init(){
        $(this.tabWrap).on('click', '>li', (e)=>{
            if(e.currentTarget.classList.contains('active')) return;
            this._tabSelect(e.currentTarget.getAttribute('data-tab'));
        });
        if(this.selected != undefined )this._tabSelect(this.selected);
    }

    _tabSelect(name){
        $(this.tabContent).removeClass('active');
        $(this.tabs).removeClass('active');
        this.tabWrap.querySelector(`[data-tab="${name}"]`).classList.add('active');
        this.tabContentWrap.querySelector(`[data-tab="${name}"]`).classList.add('active');
    }

    set select(name){
        this._tabSelect(name);
    }
}