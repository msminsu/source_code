import Controller from './controller/controller.js';
import Main from './page/main.js';
import Page1 from './page/page1.js';
import Layer1 from './page/layer1.js';

$(document).ready(function () {
    if ( typeof window.CustomEvent === "function" ) return false;
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        let evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;

    

});

$(document).ready(function () {
    let controller;
    const pagesInfo = {
        main : {
            key:'main',
            ele:document.querySelector('.main'),
            className:Main,
            pageType:'page',
            showClass:'show'
        },
        page1 : {
            key:'page1',
            ele:document.querySelector('.page-1'),
            className:Page1,
            pageType:'page',
            showClass:'show'
        }
    }
    const layerInfo = {
        layer1 : {
            key:'layer1',
            ele:document.querySelector('.layer-1'),
            className:Layer1,
            pageType:'layer',
            showClass:'show-layer'
        }
    }

    controller =  new Controller(pagesInfo, layerInfo);


        $('.loding_bg').remove();
        controller.init();
});
