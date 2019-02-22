$(document).ready(function () {

   if( $('.swiper-container').length) {
       pageMain.init();
   }
});


var pageMain = (function () {
   var slider, topBtn;
   //swiper

   slider = function () {
       var swiper = new Swiper('.swiper-container', {
           spaceBetween: 30,
           centeredSlides: true,
           autoplay: {
               delay: 4000,
               disableOnInteraction: false,
           },

           navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
           },
       });
       //navigation
       $('.pagination').click(function () {
           swiper.slideTo($(this).index());
           resetList($(this).index())
       });

       swiper.on('slideChange', function () {
           resetList(swiper.activeIndex);
       });

       function resetList(num) {
           $('.pagination').removeClass('active');
           $('.pagination').eq(num).addClass('active');
       }
   };


   topBtn = function () {
       var $topBtn = $('.btn-link-gotop');
       var startPoint = $('div').attr('data-top').height();
       var currentPos = $(window).scrollTop();

       $topBtn.hide();

       if (currentPos >= startPoint) {
           $topBtn.css({top: 'auto'}).show().addClass('fix');
       } else {
           $topBtn.hide();
       }

       $(window).scroll(function () {
           var nowPos = $(window).scrollTop();

           if (nowPos >= startPoint) {
               $topBtn.fadeIn();
           } else {
               $topBtn.fadeOut();
           }
       });

       $topBtn.on('click', function (e) {
           e.preventDefault();
           $('html, body').stop()
               .animate({
                   scrollTop: 0
               }, 800);
       });

   };


   return {
       init: function () {
           topBtn();
           slider();
       }
   }
})();


