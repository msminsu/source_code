export default class SelectBox{
    constructor(opts){
        try {
            this.ele = document.querySelector(opts.ele);
            this.title = this.ele.querySelector('[data-select="title"]');
            this.listWrap = this.ele.querySelector('[data-select="listWrap"]');
            this.val = this.title.getAttribute('data-value');
            this._init();
        } catch (e) {
            console.log(e);
        }
    }

    _init(){
        this.title.addEventListener('click',(e)=> {
            console.log('click')
            if(!e.currentTarget.classList.contains('active')){
                this._viewListWrap(true);
            }else{
                this._viewListWrap(false);
            }
        });

        $(this.listWrap).on('click', '>li', (e)=> {
            console.log("click")
            this._listSelect(e.currentTarget);
        })
    }

    _viewListWrap(open){
        if(open){
            this.title.classList.add('active');
            this.listWrap.classList.add('active');
        }else{
            this.title.classList.remove('active');
            this.listWrap.classList.remove('active');
        }
    }

    _listSelect(target){
        let value = target.getAttribute('data-value');
        this.val = value;
        this.title.setAttribute('data-value', value);
        this.title.innerHTML = target.innerHTML;
        this._viewListWrap(false);
    }

    get value(){
        let value = this.val;
        return value;
    }
}