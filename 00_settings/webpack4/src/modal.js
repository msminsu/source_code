import './modal.scss';

class Modal {
    consturctor(_config) {
        this.config = Object.assign({
            "esc": true,
            "dim": true,
            "dimclick": true,
            "modifier": '',
        }, _config);

        this.state = {
            isActive: false,
            offsetTop: 0,
            appendContents: false,
        };

        this.DOM = {
            HTML: $('html'),
            BODY: $('body'),
            LAYER: false,
            LAYERCONTENTS: false,
            BACKDROP: false,
        };

        this.EVENT = {
            OPENSTART: 'layeropenstart',
            OPENEND: 'layeropenend',
            CLOSESTART: 'layerclosestart',
            CLOSEEND: 'layercloseend',
        };

        this.EventQ = {};

        this.addEvent();

        window.amskitLayerStore = window.amskitLayerStore || [];
    }

}


addEvent() {
    if (this.config.esc) {// esc 가 있으면
        if (window.amskitLayerEscEvent) return;
        window.amskitLyaerEscEvent = true;

        $(document).on('keyup.amskit.layer', (e) => {
            if(window.amskitLayerStore.length < 1) return;
            if(e.keyCode !== 27) return; // esc키면 리턴

            window.amskitLayerStore[window.amskitLayerStore.length -1].config.esc &&
            window.amskitLayerStore[window.amskitLayerStore.length -1].close(); 
            // 0부터 시작하니까 length-1  
        });
    }
}


fireEvent(event){
    this.EventQ[event] && this.EventQ[event].forEach( (fn) => {
        fn();
    });
}

open(contents) {
    if (this.state.isActive) return;// 팝업이 열려 있는지 체크

    this.fireEvent(this.EVENT.OPENSTART);

    if(contents) {
        this.setLayer(contents);
        this.state.appendContents = true;
    }

    if (this.config.dim && this.config.dimClick) {
        this.DOM.LAYERCONTENTS.on('click.amskit.layer', (e) => {
            if ($(e.target).is('.amskit-layer__contents-wrap')) {
                this.close();
            }
        })
    }
}

