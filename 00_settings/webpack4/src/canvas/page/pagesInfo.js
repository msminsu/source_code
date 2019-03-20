import BasePage from './basePage';
import Intro from "./intro";
import Gate from "./gate";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./page4";
import Page5 from "./page5";
import Page6 from "./page6";
import Page7 from "./page7";
import Page8 from "./page8";
import Page9 from "./page9";


const pageInfo = {
    intro : {
        key:'intro',
        ele:document.querySelector('.intro'),
        className:Intro,
        pageType:'page',
        showClass:'show'
    },
    gate : {
        key:'gate',
        ele:document.querySelector('.gate'),
        className:Gate,
        pageType:'page',
        showClass:'show'
    },
    page1 : {
        key:'page1',
        ele:document.querySelector('.page-1'),
        className:Page1,
        pageType:'page',
        showClass:'show'
    },
    page2 : {
        key:'page2',
        ele:document.querySelector('.page-2'),
        className:Page2,
        pageType:'page',
        showClass:'show'
    },
    page3 : {
        key:'page3',
        ele:document.querySelector('.page-3'),
        className:Page3,
        pageType:'page',
        showClass:'show'
    },
    page4 : {
        key:'page4',
        ele:document.querySelector('.page-4'),
        className:Page4,
        pageType:'page',
        showClass:'show'
    },
    page5 : {
        key:'page5',
        ele:document.querySelector('.page-5'),
        className:Page5,
        pageType:'page',
        showClass:'show'
    },
    page6 : {
        key:'page6',
        ele:document.querySelector('.page-6'),
        className:Page6,
        pageType:'page',
        showClass:'show'
    },
    page7 : {
        key:'page7',
        ele:document.querySelector('.page-7'),
        className:Page7,
        pageType:'page',
        showClass:'show'
    },
    page8 : {
        key:'page8',
        ele:document.querySelector('.page-8'),
        className:Page8,
        pageType:'page',
        showClass:'show'
    },
    page9 : {
        key:'page9',
        ele:document.querySelector('.page-9'),
        className:Page9,
        pageType:'page',
        showClass:'show'
    }
}
const layerInfo = {

}

export {pageInfo, layerInfo}