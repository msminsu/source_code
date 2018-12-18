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
        this.leady = false;
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

    init(){
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
        this._changePage(this.pageInfo.keyArr[0]);
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
        this.pageInfo.nextPage = key;

        if(this.pageInfo.currentPage === ''){
            this.pages[key].class.show();
        }else{
            this.pages[this.pageInfo.currentPage].class.hide();
        }
    }
    _hidePageComplete(){
        this.pages[this.pageInfo.currentPage].class.hideComplete();
        this.pages[this.pageInfo.nextPage].class.show();
    }
    _changePageComplete(){
        this.leady = true;
        this.pageInfo.currentPage = this.pageInfo.nextPage;
        this.pageInfo.nextPage = '';
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
        switch (e.detail.action) {
            case 'hideComplete': {
                this._hidePageComplete(e.detail.key)
                break;
            }
            case 'showComplete': {
                this._changePageComplete(e.detail.key)
                break;
            }
            case 'showLayer': {
                this._showLayer(e.detail.key)
                break;
            }
            case 'hideLayer': {
                this._hideLayer(e.detail.key)
                break;
            }
        }

    }
}


