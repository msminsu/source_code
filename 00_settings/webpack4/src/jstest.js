import $ from 'jquery';


/* export default function() {
    console.log('myFunction -ㅇㅇ---------------');
} */

class Layer {
    constructor(_config) {

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
    }

    addEvent() {
        this.EventQ['layeropenstart'];
    }

    fireEvent(event){
        console.log('fire 1');
        // EventQ[event] 가존재하면 > this.EventQ[event].forEach() 실행
       this.EventQ[event] && this.EventQ[event].forEach((fn) => {
        console.log('fire 2')
      fn();
    });
    }

    open(contents) {
        this.fireEvent(this.EVENT.OPENSTART);
        console.log(contents);
        if (contents) {
        //    this.setLayer(contents);
            this.state.appendContents = true;
          }

         /*  if (this.config.dim && this.config.dimclick) {
            this.DOM.LAYERCONTENTS.on("click.promokit.layer", (e) => {
              if ($(e.target).is(".promokit-layer__contents-wrap")) {
                this.close();
              }
            });
          } */
      
        
    }
}




export default Layer;