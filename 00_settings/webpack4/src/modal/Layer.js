
import './modal.scss';

/* export default function() {
    
} */

import $ from 'jquery';
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

        window.amskitLayerStore = window.amskitLayerStore || [];
    }

    addEvent() {
        if (this.config.esc) {
            if (window.amskitLayerEscEvent) return;
            window.amskitLayerEscEvent = true;
      
            $(document).on("keyup.amskit.layer", (e) => {
              if (window.amskitLayerStore.length < 1) return;
              if (e.keyCode !== 27) return;
      
              window.amskitLayerStore[window.amskitLayerStore.length - 1].config.esc &&
              window.amskitLayerStore[window.amskitLayerStore.length - 1].close();
            });
          }

    }

    fireEvent(event){
        console.log(this.EventQ[event], event);
       this.EventQ[event] && this.EventQ[event].forEach((fn) => {
           console.log(this.EventQ[event], 'test=======');
      fn();
    });
    
    }


    setLayer(contents) {
        this.DOM.LAYER = $(`<div class="promokit-layer ${this.config.modifier && "promokit-layer--" + this.config.modifier}">
                              <div class="promokit-layer__contents-wrap" tabindex="-1">
                                <div class="promokit-layer__contents">
                                  ${contents}
                                </div>
                              </div>
                              <div class="promokit-layer__dim"></div>
                            </div>`);

        this.DOM.LAYERCONTENTS = this.DOM.LAYER.find(".promokit-layer__contents-wrap");
        this.DOM.BODY.append(this.DOM.LAYER);

      }

    open(contents) {
        if (this.state.isActive) return;
        
        this.fireEvent(this.EVENT.OPENSTART);

        if(contents){
            this.setLayer(contents);
            this.state.appendContents = true;
        }

          if (this.config.dim && this.config.dimclick) {
              
            this.DOM.LAYERCONTENTS.on("click.promokit.layer", (e) => {
                
              if ($(e.target).is(".promokit-layer__contents-wrap")) {
                this.close();
              }
            });
          }

          window.amskitLayerStore.push(this);

          
    this.DOM.LAYERCONTENTS.focus();

    let htmlTop = this.DOM.HTML.scrollTop();
    let bodyTop = this.DOM.BODY.scrollTop();

    this.state.offsetTop = (htmlTop < 1 && bodyTop < 0) ? 0 : htmlTop > 0 ? htmlTop : bodyTop;

    this.DOM.HTML.css({
      "position": "fixed",
      "margin-top": -this.state.offsetTop,
      "width": "100%",
    });

    this.DOM.LAYER.addClass("promokit-layer--active");
    !this.config.dim && this.DOM.LAYER.addClass("promokit-layer--disabled-dim");
    this.state.isActive = true;
    this.fireEvent(this.EVENT.OPENEND);
    }

    close() {
        
        if (!this.state.isActive) return;// 레이어가 안열려 있으면 return 
        this.fireEvent(this.EVENT.CLOSESTART);

        this.DOM.LAYER.removeClass("promokit-layer--active");

        this.DOM.HTML.css({
            'position': '',
            'margin-top': '',
            'width': '',
        });

        $('html, body').scrollTop(this.state.offsetTop);

        $(document).on("transitionend.amskit.layer", ".promokit-layer__contents-wrap", () => {
            $(document).off("transitionend.amskit.layer");
      
            if (this.state.appendContents) {
              this.DOM.LAYER.remove();
              this.state.appendContents = false;
            }
      
            this.state.isActive = false;
            window.amskitLayerStore.pop();
      
            this.fireEvent(this.EVENT.CLOSEEND);
          });

    }

    on(event, fn) {
        // 이벤트 Q가 없으면  실행 if문 실행
        if (!this.EventQ[event]) {
          this.EventQ[event] = [];
        }
    
        this.EventQ[event].push(fn);
      }

      off(event) {
        delete this.EventQ[event];
      }
}




export default Layer;