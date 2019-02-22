import "./index.scss";

class Layer {
  constructor(_config) {
    this.config = Object.assign({
      "esc": true,
      "dim": true,
      "dimclick": true,
      "modifier": "",
    }, _config);

    this.state = {
      isActive: false,
      offsetTop: 0,
      appendContents: false,
    };

    this.DOM = {
      HTML: $("html"),
      BODY: $("body"),
      LAYER: false,
      LAYERCONTENTS: false,
      BACKDROP: false,
    };

    this.EVENT = {
      OPENSTART: "layeropenstart",
      OPENEND: "layeropenend",
      CLOSESTART: "layerclosestart",
      CLOSEEND: "layercloseend",
    };

    this.EventQ = {};

    this.addEvent();
    window.promokitLayerStore = window.promokitLayerStore || [];
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

  addEvent() {
    if (this.config.esc) {
      if (window.promokitLayerEscEvent) return;
      window.promokitLayerEscEvent = true;

      $(document).on("keyup.promokit.layer", (e) => {
        if (window.promokitLayerStore.length < 1) return;
        if (e.keyCode !== 27) return;

        window.promokitLayerStore[window.promokitLayerStore.length - 1].config.esc &&
        window.promokitLayerStore[window.promokitLayerStore.length - 1].close();
      });
    }
  }

  fireEvent(event) {
    this.EventQ[event] && this.EventQ[event].forEach((fn) => {
      fn();
    });
  }

  open(contents) {
    if (this.state.isActive) return;

    this.fireEvent(this.EVENT.OPENSTART);

    if (contents) {
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

    window.promokitLayerStore.push(this);

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
    if (!this.state.isActive) return;
    this.fireEvent(this.EVENT.CLOSESTART);

    this.DOM.LAYER.removeClass("promokit-layer--active");

    this.DOM.HTML.css({
      "position": "",
      "margin-top": "",
      "width": "",
    });

    $("html, body").scrollTop(this.state.offsetTop);

    $(document).on("transitionend.promokit.layer", ".promokit-layer__contents-wrap", () => {
      $(document).off("transitionend.promokit.layer");

      if (this.state.appendContents) {
        this.DOM.LAYER.remove();
        this.state.appendContents = false;
      }

      this.state.isActive = false;
      window.promokitLayerStore.pop();

      this.fireEvent(this.EVENT.CLOSEEND);
    });
  }

  on(event, fn) {
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
