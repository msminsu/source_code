import Navigator from '../module/navigator';
let instance;

export default class Controller {
        constructor(pagesInfo, layerInfo) {
        if (instance) return instance;
        instance = this;
        this.pages  =  this._createPages(pagesInfo);
        this.pageInfo = {
            keyArr : Object.keys(pagesInfo),
            currentPage : '',
            nextPage : '',
            pageLength : Object.keys(pagesInfo).length
        }
        this.layers  =  this._createLayer(layerInfo);
        this.navigator = null;
        this.leady = false;

        this.eles = {};
    }

    init(pageName){
        this.eles.navi = document.querySelector('.navigator');
        this.eles.logo = document.querySelector('.btn-link-logo');
        TweenMax.set(this.eles.navi, {x:-420});
        TweenMax.set(this.eles.logo, {x:-260});
        this.eles.logo.addEventListener('click',()=>{
            this._changePage('intro');
        })

        document.documentElement.addEventListener('onwheel' in document ? 'wheel' : 'mousewheel', (()=> {
            var e, deltax, deltay, lastmovedtime = 0;
            return (e) =>  {
                if(!this.leady)return;
                deltax = e.deltaX !== undefined ? e.deltaX : e.wheelDeltaX || 0,
                deltay = e.deltaY !== undefined ? e.deltaY : e.wheelDeltaY !== undefined ? e.wheelDeltaY : e.detail || e.wheelDelta*-1;
                if (Math.abs(deltay) > 2 && new Date().getTime()-lastmovedtime > 100) {
                    let direction = deltay > 0 ? 'next' : 'prev';
                    this._wheelNavigator(direction)
                    lastmovedtime = new Date().getTime();
                }
                e.preventDefault();
            };
        })(), false);
        this.navigator = new Navigator(document.querySelector('.navigator'));
        document.querySelector('.navigator').addEventListener('pageEvent', this._pageEvent.bind(this));

        this._changePage(pageName);
    }

    _wheelNavigator(direction){
        let currentNum = this.pageInfo.keyArr.indexOf( this.pageInfo.currentPage);
        if(direction === 'next'){
            if((this.pageInfo.pageLength - 1) <= currentNum) return;
            currentNum++;
            this._changePage(this.pageInfo.keyArr[currentNum]);
        }else{
            if(0 >= currentNum) return;
            currentNum--;
            this._changePage(this.pageInfo.keyArr[currentNum]);
        }
    }

    _changePage(key){
        this.leady = false;
        this.navigator.isLeady = false;
        this.pageInfo.nextPage = key;
        this.navigator.select = key;
        if(this.pageInfo.currentPage === ''){
            this.pages[key].class.show();
        }else{
            this.pages[this.pageInfo.currentPage].class.hide();
        }
        if(key != 'intro' && key != 'gate'){
            TweenMax.to(this.eles.navi, 1, {x:0, ease: Quart.easeOut});
            TweenMax.to(this.eles.logo, 1, {x:0, ease: Quart.easeOut});
        }else{
            TweenMax.to(this.eles.navi, 1, {x:-420, ease: Quart.easeOut, delay:0.3});
            TweenMax.to(this.eles.logo, 1, {x:-260, ease: Quart.easeOut});
        }

    }

    _hidePageComplete(){
        this.pages[this.pageInfo.nextPage].class.show();
    }

    _changePageComplete(){

        this.pageInfo.currentPage = this.pageInfo.nextPage;
        this.pageInfo.nextPage = '';
        this.leady = true;
        this.navigator.isLeady = true;
    }

    _showLayer(key){
        this.leady = false;
        this.layers[key].class.show();
    }

    _hideLayer(key){
        this.leady = true;
        this.layers[key].class.hide();
    }

    _pageEvent(e){
        //    console.log(e.detail.action, e.detail.key);
        switch (e.detail.action) {
            case 'changePage' : {
                this._changePage(e.detail.key)
                break;
            }
            case 'hideComplete': {
                this._hidePageComplete(e.detail.key)
                break;
            }
            case 'showComplete': {
                this._changePageComplete(e.detail.key)
                break;
            }
            case 'openLayer':{
                this.leady = false;
                this.navigator.isLeady = false;
                break;
            }
            case 'closeLayer':{
                this.leady = true;
                this.navigator.isLeady = true;
                break;
            }
        }

    }
    _createPages(pagesInfo){
        let i, j;
        for( i in pagesInfo ) {
            for( j in pagesInfo[i] ){
                if(j === 'className'){
                    pagesInfo[i].class =  new pagesInfo[i][j](pagesInfo[i]);
                }
            }
            pagesInfo[i].ele.addEventListener('pageEvent', this._pageEvent.bind(this));
        }
        return pagesInfo;
    }

    _createLayer(layerInfo){
        let i, j;
        for( i in layerInfo ) {
            for( j in layerInfo[i] ){
                if(j === 'className'){
                    layerInfo[i].class =  new layerInfo[i][j](layerInfo[i] );
                }
            }
            layerInfo[i].ele.addEventListener('pageEvent', this._pageEvent.bind(this));
        }
        return layerInfo;
    }
}


