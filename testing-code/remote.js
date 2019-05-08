function Remote(opts) {
    this.opts = opts;

    this.$wrap = $(opts.element);
    this.$gnb = this.$wrap.find($("[data-remote='wrap']")).children("[data-list='list']");
    this.$snb = this.$gnb.find("[data-list='list']");
    this.$cnb = this.$wrap.find($("[data-remote='wrap']")).find("[data-list='list']");
    this.$cnbli = this.$wrap.find($("[data-remote='wrap']")).find("li");
    this.$con = $("[data-contents='con']");
    this.$scon = $("[data-contents='scon']");
    this.$btnArrow = $("[data-btn='arrow']");

    this.state = {
        isMobile: false,
        resizeWidth: false,
        gnbNum: false,
        snbNum: false,
        removeChk: false,
        scrollTop: $(window).scrollTop(),
        scrollTopSave: false,
        scChk: true
    };

    this.arrowSlide();
    this.controls();
}

Remote.prototype = {
    controls: function () {
        var context = this;
        if (this.opts.quick) {
            this.$gnb.children("a").on("click", function () {
                var hash = $(this).attr("href"),
                    reStr = hash.replace(/#/g, "");

                context.mobileBodyFix();
                context.listSlide(reStr);
            });

            this.$snb.children("a").on("click", function () {
                var hash = $(this).attr("href"),
                    reStr = hash.replace(/#/g, "");

                context.mobileBodyFix();
                context.listSlide(reStr);
            });
        } else {
            if (!this.opts.type) {
                this.$gnb.children("a").on("click", () => {
                    this.mobileBodyFix();
                    if (this.state.isMobile) {
                        this.arrowSlide();
                    }
                });
            } else {
                this.$cnbli.children("a").on("click", () => {
                    this.mobileBodyFix();
                    if (this.state.isMobile) {
                        this.arrowSlide();
                    }
                });
            }
        }

        $(window).on("resize", () => {
            this.state.isMobile = (!window.matchMedia("(min-width:769px)").matches);
            this.state.resizeWidth = this.$wrap.outerWidth();
            if (this.opts.show) {
                this.opts.show = false;
                this.arrowSlide();
            } else {
                this.mobileMask();
            }
            this.scrollAction();
        }).resize();

        $(window).on("scroll", () => {
            if (this.state.isMobile) {
                if (!this.state.scChk) return false;
            }
            this.state.scrollTop = $(window).scrollTop();
            this.scrollAction();
        });

        this.$btnArrow.on("click", () => {
            this.mobileBodyFix();
            this.arrowSlide();
        });

        $(document).on("click", "[data-remote='mask']", () => {
            this.mobileBodyFix();
            this.arrowSlide();
        });
    },

    navAnchor: function (num) {
        if (!this.opts.type) {
            this.$gnb.removeClass("active");
            this.$gnb.eq(num).addClass("active");
        } else {
            this.$cnb.parent("ul").parent("li").removeClass("active");
            this.$cnb.removeClass("active");
            this.$cnb.eq(num).parent("ul").parent("li").addClass("active");
            this.$cnb.eq(num).addClass("active");
        }
    },

    scrollAction: function () {
        var scltop = $(window).scrollTop();
        if (!this.state.isMobile) {
            if (scltop >= this.opts.top - this.opts.fix) {
                this.$wrap.addClass("fix").css({top: this.opts.fix});
            } else {
                this.$wrap.removeClass("fix").css({top: this.opts.top});
            }
        } else {
            this.$wrap.removeClass("fix").css({top: ""});
        }

        this.quickAnchor(scltop)
    },

    quickAnchor: function (scltop) {
        if (this.opts.quick) {
            var firstTop = this.$con.eq(0).offset().top,
                // lastBottom = this.$con.eq(this.$con.length - 1).offset().top + this.$con.eq(this.$con.length - 1).height(),
                endScroll = $(window).scrollTop() === $(document).height() - $(window).height();
            if(this.opts.margin!=undefined) firstTop = this.distinction(firstTop);
            for (var i = 0, len = this.$con.length; i < len; i++) {
                var conTop = this.$con.eq(i).offset().top;
                if(this.opts.margin!=undefined) conTop = this.distinction(conTop);
                if (conTop <= scltop) {
                    this.state.gnbNum = i;
                    for (var j = 0, slen = this.$con.eq(i).children(this.$scon).length; j < slen; j++) {
                        var sconTop = this.$con.eq(i).children(this.$scon).eq(j).offset().top;
                        if(this.opts.margin!=undefined) sconTop = this.distinction(sconTop);
                        if (sconTop <= scltop) {
                            this.state.snbNum = j;
                        }
                    }
                }
                // removeChk = (scltop < firstTop || scltop > lastBottom) ? true : false;
                this.state.removeChk = (scltop < firstTop);
            }

            if (!this.state.removeChk) {
                this.$gnb.removeClass("active");
                this.$gnb.find(this.$snb).removeClass("active");
                if (endScroll) {
                    this.$gnb.eq(this.$gnb.length - 1).addClass("active");
                    this.$gnb.eq(this.$gnb.length - 1).find(this.$snb).eq(this.$gnb.eq(this.$gnb.length - 1).find(this.$snb).length - 1).addClass("active");
                } else {
                    this.$gnb.eq(this.state.gnbNum).addClass("active");
                    this.$gnb.eq(this.state.gnbNum).find(this.$snb).eq(this.state.snbNum).addClass("active");
                }
            } else {
                this.$gnb.removeClass("active");
                this.$gnb.find(this.$snb).removeClass("active");
            }
        }

        this.remoteShowHide();
    },

    remoteShowHide: function () {
        if (!this.state.removeChk) {
            this.$wrap.css({display: "block"});
        } else {
            if (this.state.isMobile) {
                this.opts.show = false;
            } else {
                this.opts.show = (!this.opts.show);
            }
            this.arrowSlide();
            this.$wrap.css({display: "none"});
        }
    },

    arrowSlide: function () {
        if (this.opts.show) {
            this.$wrap.stop().animate({right: 0}, 250).find(this.$btnArrow).addClass("on");
            this.state.scChk = false;
            this.opts.show = false;
        } else {
            this.$wrap.stop().animate({right: -this.state.resizeWidth}, 250).find(this.$btnArrow).removeClass("on");
            this.state.scChk = true;
            this.opts.show = true;
        }
        this.mobileMask();
    },

    mobileBodyFix: function () {
        if (this.opts.show) {
            this.state.scrollTopSave = this.state.scrollTop;
            if (this.state.isMobile) {
                $("body").css({height: "auto", position: "fixed", overflow: "hidden", marginTop: -this.state.scrollTop});
            }
        } else {
            if (this.state.isMobile) {
                $("body").css({height: "", position: "", overflow: "", marginTop: ""});
                $("html, body").scrollTop(this.state.scrollTopSave);
            }
        }
    },

    mobileMask: function () {
        $("#mobileMask").remove();
        if (this.state.isMobile) {
            if (!this.opts.show) {
                this.$wrap.before($("<div id='mobileMask' data-remote='mask'></div>"));
                $("html").css({height: "auto", overflow: "hidden"});
            } else {
                $("html").css({height: "", overflow: ""});
            }
        } else {
            $("html").css({height: "", overflow: ""});
            $("body").css({height: "", position: "", overflow: "", marginTop: ""});
        }
    },

    listSlide(id) {
        var conOffset = $("[data-id='" + id + "']").offset().top;
        if(this.opts.margin!=undefined) conOffset = this.distinction(conOffset);
        $("html, body").stop().animate({scrollTop:conOffset}, this.opts.cspeed);
        if (this.state.isMobile) {
            this.arrowSlide();
        }
    },

    distinction(flag){
        flag = (0<this.opts.margin) ? flag+Math.abs(this.opts.margin) : flag-Math.abs(this.opts.margin);
        return Math.ceil(flag);
    }
};

export default Remote;


new remote({
	element:"#remoteMenu",
	top:920,
	fix:100,
	show:false,
	quick:true,
	cspeed:600
});