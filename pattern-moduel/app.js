import QuickMenu from './module/QuickMenu.js';
import SelectBox from './module/selectBox.js';
import TabMenu from './module/tabMenu.js';

$(document).ready(function(){

    var quickMenu, selectBox, tabMenu, scltop = 0;
    quickMenu = new QuickMenu({
        ele:'#quickMenu',
            follow:'#contents',
            fixedTop:160,
            fixedSpaceTop:116,
            fixedSpaceBottom:160,
            isTrack:false,
            srollSpeed:600,
    });


    selectBox = new SelectBox({ele:'#select-1'});

    //케릭터 선택후 확인
    // $('.charactor-select .btn-confirm').on('click', function(){
    //     if(selectBox.value == 'null') {
    //         alert('캐릭터를 선택해주세요')
    //     }else{
    //         console.log('charactor-select : value = ' + selectBox.value);
    //         $('.apply-box .charactor-select').css('display', 'none');
    //         $('.apply-box .charactor-info').css('display', 'block');
    //     }
    //
    // });


    //탭메뉴 selected = 디폴트 : data-tab
   tabMenu = new TabMenu({ele:'#tab-check'})
    //tabMenu.select = 'tab-2'; //탭변경시
});