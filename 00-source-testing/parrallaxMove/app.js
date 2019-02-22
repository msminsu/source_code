$(document).ready(function () {
    
    function parallaxIt(e, o, a, t) {
        var n = o
          , s = e.pageX - n.offset().left
          , i = e.pageY - n.offset().top;
        TweenMax.to(a, 1, {
            x: (s - n.width() / 2) / n.width() * t,
            y: (i - n.height() / 2) / n.height() * t
        })
    }




    var   n = $(" .ch")
    , s = $(".deco1")
    , i = $(".deco2");

    $(".section").mousemove(function(e) {
        var o = $(this);
        o.hasClass("motion_mouse") && setTimeout(function() {
            parallaxIt(e, o, n, -40),
            parallaxIt(e, o, s, -20),
            parallaxIt(e, o, i, -80)
        }, 100)
    })



/*
    TweenLite.to(i, .5, {
        marginLeft: "-200",
        opacity: 1,
        delay: .6,
        ease: Power2.easeInOut,
        clearProps: "all",
        onComplete: function() {
            addMotionEnd(this.target),
            $(".section.s9").addClass("motion_mouse"),
            $(".section.s9").mousemove(function(e) {
                var o = $(this);
                o.hasClass("motion_mouse") && setTimeout(function() {
                    parallaxIt(e, o, n, -40),
                    parallaxIt(e, o, s, -20),
                    parallaxIt(e, o, i, -80)
                }, 100)
            })
        }
    })
    */

});


window.pageMain = (function() {


    var $direct =$('.btn-link-direct');
    var $window = $(window);
    var currentPos = $window.scrollTop();
    var startPoint = $('#header').height()-50;


    var gopage = function(){
        positionChk();
        scrollEvt();
        goPageEvt();

    };


    var positionChk = function(){
        if(currentPos >= startPoint) {
            $direct.stop().animate({top:currentPos+50},700)
        }
    };
    var scrollEvt = function(){
        $window.on('scroll',function(){

            var nowPos = $(this).scrollTop();
            if ( nowPos  >= startPoint){
                $direct.stop().animate({top:nowPos+50},700)
            }else{
                $direct.stop().animate({top:800},700)
            }

        });
    };

    var goPageEvt = function(){
        $direct.on('click', function(e){
            e.preventDefault();
            $('html, body').stop()
                .animate({
                    scrollTop : $('.section4').offset().top
                },900);
        });
    };

    return {
        init: function () {
            gopage();

        }
    }
})();



/*
WebFont.load({
    custom: {
        families: ["NanumSquare"],
        urls: [pwp.rootUrl + "fonts/nanumsquare.css"]
    }
});
var myScroll, myScroll2, mov = document.getElementById("mainVideo"), movBox = $(".video_bg"), nav = $(".nav"), navList = $(".nav ul li"), footer = $(".footer"), footerFull = $(".footer_full"), aside = $(".aside"), asideBtn = $(".aside ul li span"), asideList = $(".aside .list > li"), dimmed = $(".dimmed"), popupDimmed = $(".pop_dimmed"), tab = $(".tab"), tabList = $(".tab > ul > li"), btnTop = $(".btn_top");
function movPlay() {
    movBox.fadeIn(350),
    mov.play()
}
function showAside() {
    dimmed.is(":visible") || (dimmed.fadeIn(),
    aside.show().stop().animate({
        left: 0
    }, 300, "easeInOutQuad"),
    aside.find(".btn_side").show())
}
function hideAside() {
    dimmed.is(":visible") && (dimmed.fadeOut(),
    aside.stop().animate({
        left: -230
    }, 300, "easeInOutQuad"),
    aside.find(".btn_side").hide())
}
function hidePop() {
    try {
        $.fn.fullpage.setMouseWheelScrolling(!0),
        $.fn.fullpage.setAllowScrolling(!0)
    } catch (e) {}
    $(".pop_mov").is(":visible") && $(".pop_mov").removeClass("motion").find("iframe").remove(),
    $(".pop, .pop_dimmed").fadeOut("fast")
}
function movPop(e) {
    setTimeout(function() {
        $("<iframe>", {
            src: "https://www.youtube.com/embed/" + e + "?rel=0&amp;showinfo=0&amp;autoplay=1",
            frameborder: 0,
            scrolling: "no"
        }).appendTo(".pop_mov")
    }, 100),
    $.fn.fullpage.setMouseWheelScrolling(!1),
    $.fn.fullpage.setAllowScrolling(!1),
    $(".pop_mov, .pop_dimmed").fadeIn("fast"),
    $(".pop_mov").addClass("motion")
}
function parallaxIt(e, o, a, t) {
    var n = o
      , s = e.pageX - n.offset().left
      , i = e.pageY - n.offset().top;
    TweenLite.to(a, 1, {
        x: (s - n.width() / 2) / n.width() * t,
        y: (i - n.height() / 2) / n.height() * t
    })
}
function addMotionEnd(e) {
    e.addClass("motion_end")
}
$(document).ready(function() {
    var e, o, a, t;
    if (e = 1,
    o = $("[js-nav-update] > *"),
    a = $("[js-nav-update-page]"),
    t = Math.round(o.length / 3),
    window.navShowPage = function(e) {
        o.addClass("hide"),
        o.filter(":nth-child(+n+" + (3 * (e - 1) + 1) + "):nth-child(-n+" + 3 * e + ")").removeClass("hide")
    }
    ,
    a.on("click", function() {
        switch ($(this).attr("js-nav-update-page")) {
        case "prev":
            e--;
            break;
        case "next":
            e++
        }
        return e < 1 && (e = 1),
        t < e && (e = t),
        window.navShowPage(e),
        !1
    }),
    window.navShowPage(1),
    $("#Media")[0])
        $(".nav .wrap > ul > li:nth-child(4)").addClass("on"),
        navList.eq(3).addClass("on"),
        asideList.eq(3).addClass("on"),
        myScroll2 = new IScroll("#Media",{
            mouseWheel: !0,
            scrollbars: !0
        });
    else if ($("#Feature")[0]) {
        $(".nav .wrap > ul > li:nth-child(3)").addClass("on"),
        navList.eq(2).addClass("on"),
        asideList.eq(2).addClass("on").children(".sub").find("li").eq(0).addClass("on"),
        tabList.eq(0).addClass("on"),
        myScroll2 = new IScroll("#Feature",{
            mouseWheel: !0,
            scrollbars: !0
        });
        var r = $(".overview .mv")
          , d = $(".overview .mv iframe").attr("src")
          , c = d + "&amp;autoplay=1";
        $(".overview .cont").touchSlider({
            useMouse: !1,
            resize: !1,
            btn_prev: $(".overview .btn_arrow.arrow_prev"),
            btn_next: $(".overview .btn_arrow.arrow_next"),
            initComplete: function(e) {
                var o = this
                  , a = $(this).next(".paging")
                  , t = Math.ceil(this._len / this._view);
                a.html("");
                for (var n = 1; n <= t; n++)
                    a.append('<input type="button" class="btn_page" value="' + n + '">');
                a.find(".btn_page").on("click", function(e) {
                    o.go_page($(this).index())
                })
            },
            counter: function(e) {
                $(".overview .mv iframe")[0] && (1 < e.current ? $(".overview .mv").removeClass("playing").find("iframe").attr("src", d) : ($(".overview .mv").hasClass("playing") || $(".overview .mv iframe").attr("src", c),
                $(".overview .mv").addClass("playing"))),
                $(this).next(".paging").find(".btn_page").removeClass("on").eq(e.current - 1).addClass("on");
                for (var o = 1; o <= e.total; o++)
                    if (void 0 !== r[0]) {
                        if (e.current === o && 1 < o) {
                            var a = new TimelineLite
                              , t = $(".fbox.f" + (o - 1) + " span")
                              , n = .3;
                            4 === o ? n = .225 : 5 === o && (n = .18),
                            a.staggerFrom(t, .5, {
                                top: 15,
                                opacity: 0,
                                ease: Power1.easeInOut
                            }, n)
                        }
                    } else if (e.current === o && e.current === o) {
                        var s = new TimelineLite
                          , i = $(".fbox.f" + o + " span")
                          , l = .3;
                        3 === o ? l = .225 : 4 === o && (l = .18),
                        s.staggerFrom(i, .5, {
                            top: 15,
                            opacity: 0,
                            ease: Power1.easeInOut
                        }, l)
                    }
            }
        })
    } else if ($("#Class")[0]) {
        var H = $("[js-class-page]");
        H.on("click", function() {
            switch ($(this).attr("js-class-page")) {
            case "prev":
                $.fn.fullpage.moveSectionUp();
                break;
            case "next":
                $.fn.fullpage.moveSectionDown()
            }
            return !1
        }),
        $(".nav .wrap > ul > li:nth-child(3)").addClass("on"),
        $("#Class .s9 .view_screenshot").click(function() {
            return $.fn.fullpage.setMouseWheelScrolling(!1),
            $.fn.fullpage.setAllowScrolling(!1),
            $(".pop_img2, .pop_dimmed").fadeIn("fast"),
            !1
        }),
        $("#Class").fullpage({
            anchors: ["character", "darkavenger", "kali", "assassin", "warrior", "archer", "sorceress", "cleric", "academic"],
            css3: !1,
            scrollOverflow: !0,
            afterLoad: function(e, o) {
                if (navList.eq(2).addClass("on").siblings().removeClass("on"),
                asideList.eq(2).addClass("on").find(".sub li").eq(1).addClass("on"),
                tabList.eq(1).addClass("on"),
                "character" === e) {
                    H.hide();
                    var a = $(".s1 .sel li");
                    a.hasClass("motion_end") && a.removeClass("motion_end"),
                    window.matchMedia("(max-width: 1700px)").matches ? TweenLite.to(a, 1, {
                        marginLeft: "0",
                        opacity: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            a.addClass("motion_end")
                        }
                    }) : TweenLite.to(a, 1, {
                        marginLeft: "-20px",
                        opacity: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            a.addClass("motion_end")
                        }
                    })
                } else
                    H.show();
                if ("darkavenger" === e) {
                    var t = $(".s9 .info")
                      , n = $(".s9 .char")
                      , s = $(".s9 .deco.d1")
                      , i = $(".s9 .deco.d2")
                      , l = $(".s9 .info, .s9 .char, .s9 .deco");
                    t.hasClass("motion_end") && l.removeClass("motion_end"),
                    TweenLite.to(t, .5, {
                        left: "0",
                        opacity: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(n, .8, {
                        marginLeft: "-80",
                        opacity: 1,
                        delay: .3,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(s, .6, {
                        marginLeft: "150",
                        opacity: 1,
                        delay: .5,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(i, .5, {
                        marginLeft: "-200",
                        opacity: 1,
                        delay: .6,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target),
                            $(".section.s9").addClass("motion_mouse"),
                            $(".section.s9").mousemove(function(e) {
                                var o = $(this);
                                o.hasClass("motion_mouse") && setTimeout(function() {
                                    parallaxIt(e, o, n, -40),
                                    parallaxIt(e, o, s, -20),
                                    parallaxIt(e, o, i, -80)
                                }, 100)
                            })
                        }
                    })
                }
                if ("kali" === e) {
                    var r = $(".s8 .info")
                      , d = $(".s8 .char")
                      , c = $(".s8 .deco.d1")
                      , m = $(".s8 .deco.d2")
                      , p = $(".s8 .info, .s8 .char, .s8 .deco");
                    r.hasClass("motion_end") && p.removeClass("motion_end"),
                    TweenLite.to(r, .5, {
                        left: "0",
                        opacity: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(d, .8, {
                        marginLeft: "80",
                        opacity: 1,
                        delay: .3,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(c, .6, {
                        marginLeft: "-148",
                        opacity: 1,
                        delay: .5,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(m, .5, {
                        marginLeft: "-92",
                        opacity: 1,
                        delay: .6,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target),
                            $(".section.s8").addClass("motion_mouse"),
                            $(".section.s8").mousemove(function(e) {
                                var o = $(this);
                                o.hasClass("motion_mouse") && setTimeout(function() {
                                    parallaxIt(e, o, d, -40),
                                    parallaxIt(e, o, c, -20),
                                    parallaxIt(e, o, m, -80)
                                }, 100)
                            })
                        }
                    })
                }
                if ("assassin" === e) {
                    var u = $(".s7 .info")
                      , f = $(".s7 .char")
                      , h = $(".s7 .deco.d1")
                      , w = $(".s7 .deco.d2")
                      , v = $(".s7 .info, .s7 .char, .s7 .deco");
                    u.hasClass("motion_end") && v.removeClass("motion_end"),
                    TweenLite.to(u, .5, {
                        left: "0",
                        opacity: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(f, .8, {
                        marginLeft: "0",
                        opacity: 1,
                        delay: .3,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(h, .6, {
                        marginLeft: "48",
                        opacity: 1,
                        delay: .5,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(w, .5, {
                        opacity: 1,
                        delay: .6,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target),
                            $(".section.s7").addClass("motion_mouse"),
                            $(".section.s7").mousemove(function(e) {
                                var o = $(this);
                                o.hasClass("motion_mouse") && setTimeout(function() {
                                    parallaxIt(e, o, f, -40),
                                    parallaxIt(e, o, h, -80),
                                    parallaxIt(e, o, w, -40)
                                }, 100)
                            })
                        }
                    })
                }
                if ("warrior" === e) {
                    var C = $(".s2 .info")
                      , g = $(".s2 .char")
                      , y = $(".s2 .char .shine")
                      , I = $(".s2 .deco.d1")
                      , L = $(".s2 .deco.d2")
                      , P = $(".s2 .info, .s2 .char, .s2 .char .shine, .s2 .deco");
                    C.hasClass("motion_end") && P.removeClass("motion_end"),
                    TweenLite.to(C, .5, {
                        left: "0",
                        opacity: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(g, .8, {
                        marginLeft: "-49",
                        opacity: 1,
                        delay: .3,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(y, .5, {
                        opacity: 1,
                        delay: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(I, .6, {
                        bottom: "218",
                        marginLeft: "-77",
                        opacity: 1,
                        delay: .5,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(L, .5, {
                        bottom: "648",
                        marginLeft: "683",
                        opacity: 1,
                        delay: .6,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target),
                            $(".section.s2").addClass("motion_mouse"),
                            $(".section.s2").mousemove(function(e) {
                                var o = $(this);
                                o.hasClass("motion_mouse") && setTimeout(function() {
                                    parallaxIt(e, o, g, -40),
                                    parallaxIt(e, o, I, -80),
                                    parallaxIt(e, o, L, -160)
                                }, 100)
                            })
                        }
                    })
                }
                if ("archer" === e) {
                    var b = $(".s3 .info")
                      , _ = $(".s3 .char")
                      , x = $(".s3 .char .shine")
                      , T = $(".s3 .deco.d1")
                      , M = $(".s3 .deco.d2")
                      , O = $(".s3 .info, .s3 .char, .s3 .char .shine, .s3 .deco");
                    b.hasClass("motion_end") && O.removeClass("motion_end"),
                    TweenLite.to(b, .5, {
                        left: "0",
                        opacity: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(_, .8, {
                        marginLeft: "-91",
                        opacity: 1,
                        delay: .3,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(x, .5, {
                        opacity: 1,
                        delay: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(T, .6, {
                        bottom: "683",
                        marginLeft: "627",
                        opacity: 1,
                        delay: .5,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(M, .5, {
                        bottom: "46",
                        marginLeft: "517",
                        opacity: 1,
                        delay: .6,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target),
                            $(".section.s3").addClass("motion_mouse"),
                            $(".section.s3").mousemove(function(e) {
                                var o = $(this);
                                o.hasClass("motion_mouse") && setTimeout(function() {
                                    parallaxIt(e, o, _, -40),
                                    parallaxIt(e, o, T, -20),
                                    parallaxIt(e, o, M, -160)
                                }, 100)
                            })
                        }
                    })
                }
                if ("sorceress" === e) {
                    var E = $(".s4 .info")
                      , q = $(".s4 .char")
                      , S = $(".s4 .deco.d1")
                      , k = $(".s4 .deco.d2")
                      , W = $(".s4 .deco.d3")
                      , F = $(".s4 .info, .s4 .char, .s4 .deco");
                    E.hasClass("motion_end") && F.removeClass("motion_end"),
                    TweenLite.to(E, .5, {
                        left: "0",
                        opacity: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(q, .8, {
                        marginLeft: "-70",
                        opacity: 1,
                        delay: .3,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(S, .7, {
                        bottom: "0",
                        marginLeft: "170",
                        opacity: 1,
                        delay: .4,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(k, .6, {
                        bottom: "230",
                        marginLeft: "80",
                        opacity: 1,
                        delay: .5,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(W, .5, {
                        bottom: "440",
                        marginLeft: "473",
                        opacity: 1,
                        delay: .6,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target),
                            $(".section.s4").addClass("motion_mouse"),
                            $(".section.s4").mousemove(function(e) {
                                var o = $(this);
                                o.hasClass("motion_mouse") && setTimeout(function() {
                                    parallaxIt(e, o, q, -40),
                                    parallaxIt(e, o, S, -60),
                                    parallaxIt(e, o, k, -120),
                                    parallaxIt(e, o, W, -160)
                                }, 100)
                            })
                        }
                    })
                }
                if ("cleric" === e) {
                    var j = $(".s5 .info")
                      , A = $(".s5 .char")
                      , B = $(".s5 .deco.d1")
                      , D = $(".s5 .deco.d2")
                      , Q = $(".s5 .deco.d3")
                      , U = $(".s5 .info, .s5 .char, .s5 .deco");
                    j.hasClass("motion_end") && U.removeClass("motion_end"),
                    TweenLite.to(j, .5, {
                        left: "0",
                        opacity: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(A, .8, {
                        bottom: "0",
                        opacity: 1,
                        delay: .3,
                        ease: Circ.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(B, .7, {
                        bottom: "440",
                        marginLeft: "435",
                        transform: "rotate(0)",
                        opacity: 1,
                        delay: .4,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(D, .6, {
                        bottom: "74",
                        marginLeft: "270",
                        opacity: 1,
                        delay: .5,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(Q, .5, {
                        bottom: "177",
                        marginLeft: "665",
                        opacity: 1,
                        delay: .6,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target),
                            $(".section.s5").addClass("motion_mouse"),
                            $(".section.s5").mousemove(function(e) {
                                var o = $(this);
                                o.hasClass("motion_mouse") && setTimeout(function() {
                                    parallaxIt(e, o, A, -40),
                                    parallaxIt(e, o, B, -60),
                                    parallaxIt(e, o, D, -80),
                                    parallaxIt(e, o, Q, -160)
                                }, 100)
                            })
                        }
                    })
                }
                if ("academic" === e) {
                    var z = $(".s6 .info")
                      , G = $(".s6 .char")
                      , N = $(".s6 .char .shine")
                      , V = $(".s6 .deco.d1")
                      , X = $(".s6 .deco.d2")
                      , Y = $(".s6 .info, .s6 .char, .s6 .char .shine, .s6 .deco");
                    z.hasClass("motion_end") && Y.removeClass("motion_end"),
                    TweenLite.to(z, .5, {
                        left: "0",
                        opacity: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(G, .8, {
                        marginLeft: "-75",
                        opacity: 1,
                        delay: .3,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(N, .5, {
                        opacity: 1,
                        delay: 1,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(V, .6, {
                        bottom: "380",
                        transform: "rotate(0)",
                        opacity: 1,
                        delay: .5,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target)
                        }
                    }),
                    TweenLite.to(X, .5, {
                        bottom: "78",
                        marginLeft: "307",
                        opacity: 1,
                        delay: .6,
                        ease: Power2.easeInOut,
                        clearProps: "all",
                        onComplete: function() {
                            addMotionEnd(this.target),
                            $(".section.s6").addClass("motion_mouse"),
                            $(".section.s6").mousemove(function(e) {
                                var o = $(this);
                                o.hasClass("motion_mouse") && setTimeout(function() {
                                    parallaxIt(e, o, G, -40),
                                    parallaxIt(e, o, V, -20),
                                    parallaxIt(e, o, X, -160)
                                }, 100)
                            })
                        }
                    })
                }
            },
            onLeave: function(e, o, a) {
                $(".section").removeClass("motion_mouse"),
                setTimeout(function() {
                    $(".motion_end").removeClass("motion_end")
                }, 350)
            }
        }),
        $(".section.s1 .btn_arrow").on("click", function() {
            $(this).closest(".cont").find(".sel").toggle()
        })
    } else if ($("#Contents")[0])
        $(".nav .wrap > ul > li:nth-child(3)").addClass("on"),
        navList.eq(2).addClass("on").siblings().removeClass("on"),
        asideList.eq(2).addClass("on").find(".sub li").eq(2).addClass("on"),
        tabList.eq(2).addClass("on").find("li").eq(0).addClass("on"),
        myScroll2 = new IScroll("#Contents",{
            probeType: 3,
            mouseWheel: !0,
            scrollbars: !0
        }),
        location.hash && myScroll2.scrollToElement(location.hash, 800, null, null, IScroll.utils.ease.circular),
        $(".tab .sub li").click(function() {
            $this = $(this);
            var e = $this.index() + 1;
            1 < e && e++;
            $this.find("a").attr("href");
            myScroll2.scrollToElement(document.querySelector(".cbox:nth-child(" + e + ") .anchor"), 800, null, null, IScroll.utils.ease.circular)
        }),
        myScroll2.on("scrollEnd", function() {
            var e = this.y;
            e <= 0 && -1324 < e ? tabList.eq(2).addClass("on").find("li").eq(0).addClass("on").siblings().removeClass("on") : e <= -1324 && -2068 < e ? tabList.eq(2).addClass("on").find("li").eq(1).addClass("on").siblings().removeClass("on") : e <= -2068 && -2724 < e ? tabList.eq(2).addClass("on").find("li").eq(2).addClass("on").siblings().removeClass("on") : tabList.eq(2).addClass("on").find("li").eq(3).addClass("on").siblings().removeClass("on")
        }),
        $("#Contents").mousemove(function(e) {
            var o = $(this);
            parallaxIt(e, o, $(".deco"), -50),
            parallaxIt(e, o, $(".deco2"), -35),
            parallaxIt(e, o, $(".deco3"), -20)
        });
    else if ($("#World")[0]) {
        $(".nav .wrap > ul > li:nth-child(3)").addClass("on"),
        navList.eq(2).addClass("on").siblings().removeClass("on"),
        asideList.eq(2).addClass("on").find(".sub li").eq(3).addClass("on"),
        tabList.eq(3).addClass("on"),
        myScroll2 = new IScroll("#World",{
            mouseWheel: !0,
            scrollbars: !0
        });
        var n = new TimelineLite;
        n.staggerFrom($(".wbox"), .5, {
            opacity: 0,
            filter: "blur(1px)",
            ease: Power2.easeInOut
        }, .15),
        n.staggerFrom($(".txt1 span"), .5, {
            marginTop: 10,
            opacity: 0,
            filter: "blur(1px)",
            ease: Power2.easeInOut
        }, .15),
        n.staggerFrom($(".txt2 span"), .5, {
            marginTop: -10,
            opacity: 0,
            filter: "blur(1px)",
            ease: Power2.easeInOut
        }, .5),
        $("#World").mousemove(function(e) {
            var o = $(this);
            parallaxIt(e, o, $(".wbox"), -20),
            parallaxIt(e, o, $(".char"), -40)
        })
    }
    $("#Media .title li").click(function() {
        var e = $(this)
          , o = e.index() + 1;
        e.addClass("on").siblings().removeClass("on"),
        $(".media_tab").hide(),
        $(".media_tab.tab" + o).fadeIn("fast"),
        myScroll2.refresh()
    }),
    $("#Media .gallery li").click(function() {
        var e = $(this).index() + 1;
        $("#Gallery").touchSlider({
            page: e,
            btn_prev: $(".pop_img .btn_arrow.arrow_prev"),
            btn_next: $(".pop_img .btn_arrow.arrow_next")
        }),
        $(".pop_img, .pop_dimmed").fadeIn("fast")
    })
});
*/