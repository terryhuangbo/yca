!
function(t) {
    return "function" == typeof define && define.amd ? define(["jquery"],
    function(e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? module.exports = t(require("jquery"), window, document) : t(jQuery, window, document)
} (function(t, e, i) {
    "use strict";
    var s, o, n, r, l, h, c, a, p, d, u, g, v, f, S, m, T, y, b, w, x, $, H, C, O, A, E, Y, D, M, N;
    H = {
        paneClass: "nano-pane",
        sliderClass: "nano-slider",
        contentClass: "nano-content",
        iOSNativeScrolling: !1,
        preventPageScrolling: !1,
        disableResize: !1,
        alwaysVisible: !1,
        flashDelay: 1500,
        sliderMinHeight: 20,
        sliderMaxHeight: null,
        documentContext: null,
        windowContext: null
    },
    y = "scrollbar",
    T = "scroll",
    p = "mousedown",
    d = "mouseenter",
    u = "mousemove",
    v = "mousewheel",
    g = "mouseup",
    m = "resize",
    l = "drag",
    h = "enter",
    w = "up",
    S = "panedown",
    n = "DOMMouseScroll",
    r = "down",
    x = "wheel",
    c = "keydown",
    a = "keyup",
    b = "touchmove",
    s = "Microsoft Internet Explorer" === e.navigator.appName && /msie 7./i.test(e.navigator.appVersion) && e.ActiveXObject,
    o = null,
    E = e.requestAnimationFrame,
    $ = e.cancelAnimationFrame,
    D = i.createElement("div").style,
    N = function() {
        var t, e, i, s, o, n;
        for (s = ["t", "webkitT", "MozT", "msT", "OT"], t = o = 0, n = s.length; n > o; t = ++o) if (i = s[t], e = s[t] + "ransform", e in D) return s[t].substr(0, s[t].length - 1);
        return ! 1
    } (),
    M = function(t) {
        return N === !1 ? !1 : "" === N ? t: N + t.charAt(0).toUpperCase() + t.substr(1)
    },
    Y = M("transform"),
    O = Y !== !1,
    C = function() {
        var t, e, s;
        return t = i.createElement("div"),
        e = t.style,
        e.position = "absolute",
        e.width = "100px",
        e.height = "100px",
        e.overflow = T,
        e.top = "-9999px",
        i.body.appendChild(t),
        s = t.offsetWidth - t.clientWidth,
        i.body.removeChild(t),
        s
    },
    A = function() {
        var t, i, s;
        return i = e.navigator.userAgent,
        (t = /(?=.+Mac OS X)(?=.+Firefox)/.test(i)) ? (s = /Firefox\/\d{2}\./.exec(i), s && (s = s[0].replace(/\D+/g, "")), t && +s > 23) : !1
    },
    f = function() {
        function c(s, n) {
            this.el = s,
            this.options = n,
            o || (o = C()),
            this.$el = t(this.el),
            this.doc = t(this.options.documentContext || i),
            this.win = t(this.options.windowContext || e),
            this.body = this.doc.find("body"),
            this.$content = this.$el.children("." + this.options.contentClass),
            this.$content.attr("tabindex", this.options.tabIndex || 0),
            this.content = this.$content[0],
            this.previousPosition = 0,
            this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(),
            this.createEvents(),
            this.addEvents(),
            this.reset()
        }
        return c.prototype.preventScrolling = function(t, e) {
            if (this.isActive) if (t.type === n)(e === r && t.originalEvent.detail > 0 || e === w && t.originalEvent.detail < 0) && t.preventDefault();
            else if (t.type === v) {
                if (!t.originalEvent || !t.originalEvent.wheelDelta) return; (e === r && t.originalEvent.wheelDelta < 0 || e === w && t.originalEvent.wheelDelta > 0) && t.preventDefault()
            }
        },
        c.prototype.nativeScrolling = function() {
            this.$content.css({
                WebkitOverflowScrolling: "touch"
            }),
            this.iOSNativeScrolling = !0,
            this.isActive = !0
        },
        c.prototype.updateScrollValues = function() {
            var t, e;
            t = this.content,
            this.maxScrollTop = t.scrollHeight - t.clientHeight,
            this.prevScrollTop = this.contentScrollTop || 0,
            this.contentScrollTop = t.scrollTop,
            e = this.contentScrollTop > this.previousPosition ? "down": this.contentScrollTop < this.previousPosition ? "up": "same",
            this.previousPosition = this.contentScrollTop,
            "same" !== e && this.$el.trigger("update", {
                position: this.contentScrollTop,
                maximum: this.maxScrollTop,
                direction: e
            }),
            this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = 0 === this.maxScrollTop ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
        },
        c.prototype.setOnScrollStyles = function() {
            var t;
            O ? (t = {},
            t[Y] = "translate(0, " + this.sliderTop + "px)") : t = {
                top: this.sliderTop
            },
            E ? ($ && this.scrollRAF && $(this.scrollRAF), this.scrollRAF = E(function(e) {
                return function() {
                    return e.scrollRAF = null,
                    e.slider.css(t)
                }
            } (this))) : this.slider.css(t)
        },
        c.prototype.createEvents = function() {
            this.events = {
                down: function(t) {
                    return function(e) {
                        return t.isBeingDragged = !0,
                        t.offsetY = e.pageY - t.slider.offset().top,
                        t.slider.is(e.target) || (t.offsetY = 0),
                        t.pane.addClass("active"),
                        t.doc.bind(u, t.events[l]).bind(g, t.events[w]),
                        t.body.bind(d, t.events[h]),
                        !1
                    }
                } (this),
                drag: function(t) {
                    return function(e) {
                        return t.sliderY = e.pageY - t.$el.offset().top - t.paneTop - (t.offsetY || .5 * t.sliderHeight),
                        t.scroll(),
                        t.contentScrollTop >= t.maxScrollTop && t.prevScrollTop !== t.maxScrollTop ? t.$el.trigger("scrollend") : 0 === t.contentScrollTop && 0 !== t.prevScrollTop && t.$el.trigger("scrolltop"),
                        !1
                    }
                } (this),
                up: function(t) {
                    return function(e) {
                        return t.isBeingDragged = !1,
                        t.pane.removeClass("active"),
                        t.doc.unbind(u, t.events[l]).unbind(g, t.events[w]),
                        t.body.unbind(d, t.events[h]),
                        !1
                    }
                } (this),
                resize: function(t) {
                    return function(e) {
                        t.reset()
                    }
                } (this),
                panedown: function(t) {
                    return function(e) {
                        return t.sliderY = (e.offsetY || e.originalEvent.layerY) - .5 * t.sliderHeight,
                        t.scroll(),
                        t.events.down(e),
                        !1
                    }
                } (this),
                scroll: function(t) {
                    return function(e) {
                        t.updateScrollValues(),
                        t.isBeingDragged || (t.iOSNativeScrolling || (t.sliderY = t.sliderTop, t.setOnScrollStyles()), null != e && (t.contentScrollTop >= t.maxScrollTop ? (t.options.preventPageScrolling && t.preventScrolling(e, r), t.prevScrollTop !== t.maxScrollTop && t.$el.trigger("scrollend")) : 0 === t.contentScrollTop && (t.options.preventPageScrolling && t.preventScrolling(e, w), 0 !== t.prevScrollTop && t.$el.trigger("scrolltop"))))
                    }
                } (this),
                wheel: function(t) {
                    return function(e) {
                        var i;
                        if (null != e) return i = e.delta || e.wheelDelta || e.originalEvent && e.originalEvent.wheelDelta || -e.detail || e.originalEvent && -e.originalEvent.detail,
                        i && (t.sliderY += -i / 3),
                        t.scroll(),
                        !1
                    }
                } (this),
                enter: function(t) {
                    return function(e) {
                        var i;
                        if (t.isBeingDragged) return 1 !== (e.buttons || e.which) ? (i = t.events)[w].apply(i, arguments) : void 0
                    }
                } (this)
            }
        },
        c.prototype.addEvents = function() {
            var t;
            this.removeEvents(),
            t = this.events,
            this.options.disableResize || this.win.bind(m, t[m]),
            this.iOSNativeScrolling || (this.slider.bind(p, t[r]), this.pane.bind(p, t[S]).bind("" + v + " " + n, t[x])),
            this.$content.bind("" + T + " " + v + " " + n + " " + b, t[T])
        },
        c.prototype.removeEvents = function() {
            var t;
            t = this.events,
            this.win.unbind(m, t[m]),
            this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()),
            this.$content.unbind("" + T + " " + v + " " + n + " " + b, t[T])
        },
        c.prototype.generate = function() {
            var t, i, s, n, r, l, h;
            return n = this.options,
            l = n.paneClass,
            h = n.sliderClass,
            t = n.contentClass,
            (r = this.$el.children("." + l)).length || r.children("." + h).length || this.$el.append('<div class="' + l + '"><div class="' + h + '" /></div>'),
            this.pane = this.$el.children("." + l),
            this.slider = this.pane.find("." + h),
            0 === o && A() ? (s = e.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, ""), i = {
                right: -14,
                paddingRight: +s + 14
            }) : o && (i = {
                right: -o
            },
            this.$el.addClass("has-scrollbar")),
            null != i && this.$content.css(i),
            this
        },
        c.prototype.restore = function() {
            this.stopped = !1,
            this.iOSNativeScrolling || this.pane.show(),
            this.addEvents()
        },
        c.prototype.reset = function() {
            var t, e, i, n, r, l, h, c, a, p, d, u;
            return this.iOSNativeScrolling ? void(this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), t = this.content, n = t.style, r = n.overflowY, s && this.$content.css({
                height: this.$content.height()
            }), e = t.scrollHeight + o, p = parseInt(this.$el.css("max-height"), 10), p > 0 && (this.$el.height(""), this.$el.height(t.scrollHeight > p ? p: t.scrollHeight)), h = this.pane.outerHeight(!1), a = parseInt(this.pane.css("top"), 10), l = parseInt(this.pane.css("bottom"), 10), c = h + a + l, u = Math.round(c / e * h), u < this.options.sliderMinHeight ? u = this.options.sliderMinHeight: null != this.options.sliderMaxHeight && u > this.options.sliderMaxHeight && (u = this.options.sliderMaxHeight), r === T && n.overflowX !== T && (u += o), this.maxSliderTop = c - u, this.contentHeight = e, this.paneHeight = h, this.paneOuterHeight = c, this.sliderHeight = u, this.paneTop = a, this.slider.height(u), this.events.scroll(), this.pane.show(), this.isActive = !0, t.scrollHeight === t.clientHeight || this.pane.outerHeight(!0) >= t.scrollHeight && r !== T ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === t.scrollHeight && r === T ? this.slider.hide() : this.slider.show(), this.pane.css({
                opacity: this.options.alwaysVisible ? 1 : "",
                visibility: this.options.alwaysVisible ? "visible": ""
            }), i = this.$content.css("position"), ("static" === i || "relative" === i) && (d = parseInt(this.$content.css("right"), 10), d && this.$content.css({
                right: "",
                marginRight: d
            })), this)
        },
        c.prototype.scroll = function() {
            return this.isActive ? (this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop), this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), this) : void 0
        },
        c.prototype.scrollBottom = function(t) {
            return this.isActive ? (this.$content.scrollTop(this.contentHeight - this.$content.height() - t).trigger(v), this.stop().restore(), this) : void 0
        },
        c.prototype.scrollTop = function(t) {
            return this.isActive ? (this.$content.scrollTop( + t).trigger(v), this.stop().restore(), this) : void 0
        },
        c.prototype.scrollTo = function(t) {
            return this.isActive ? (this.scrollTop(this.$el.find(t).get(0).offsetTop), this) : void 0
        },
        c.prototype.stop = function() {
            return $ && this.scrollRAF && ($(this.scrollRAF), this.scrollRAF = null),
            this.stopped = !0,
            this.removeEvents(),
            this.iOSNativeScrolling || this.pane.hide(),
            this
        },
        c.prototype.destroy = function() {
            return this.stopped || this.stop(),
            !this.iOSNativeScrolling && this.pane.length && this.pane.remove(),
            s && this.$content.height(""),
            this.$content.removeAttr("tabindex"),
            this.$el.hasClass("has-scrollbar") && (this.$el.removeClass("has-scrollbar"), this.$content.css({
                right: ""
            })),
            this
        },
        c.prototype.flash = function() {
            return ! this.iOSNativeScrolling && this.isActive ? (this.reset(), this.pane.addClass("flashed"), setTimeout(function(t) {
                return function() {
                    t.pane.removeClass("flashed")
                }
            } (this), this.options.flashDelay), this) : void 0
        },
        c
    } (),
    t.fn.nanoScroller = function(e) {
        return this.each(function() {
            var i, s;
            if ((s = this.nanoscroller) || (i = t.extend({},
            H, e), this.nanoscroller = s = new f(this, i)), e && "object" == typeof e) {
                if (t.extend(s.options, e), null != e.scrollBottom) return s.scrollBottom(e.scrollBottom);
                if (null != e.scrollTop) return s.scrollTop(e.scrollTop);
                if (e.scrollTo) return s.scrollTo(e.scrollTo);
                if ("bottom" === e.scroll) return s.scrollBottom(0);
                if ("top" === e.scroll) return s.scrollTop(0);
                if (e.scroll && e.scroll instanceof t) return s.scrollTo(e.scroll);
                if (e.stop) return s.stop();
                if (e.destroy) return s.destroy();
                if (e.flash) return s.flash()
            }
            return s.reset()
        })
    },
    t.fn.nanoScroller.Constructor = f
});
template("desktop-buzz-item",
function(e) {
    "use strict";
    for (var t = this,
    a = (t.$helpers, e.i), i = e.len, r = e.list, s = t.$escape, l = "", a = 0, i = r.length; i > a; a++) l += ' <li class="buzz-item"> <div class="buzz-item-container"> <h2 class="buzz-item-title" ga-track="event" ga-action="click" ga-event-category="widget" ga-event-label="ifanr-buzz"><a target="_blank" itemprop="url" href="',
    l += s(r[a].permalink),
    l += '" data-source-url="',
    l += s(r[a].source.url),
    l += '" class="buzz-item-link">',
    l += s(r[a].title),
    l += '</a></h2> <div class="buzz-item-footer"> <span class="buzz-item-date" itemprop="datePublished" datetime="',
    l += s(r[a].relative_time),
    l += '">',
    l += s(r[a].relative_time),
    l += '</span> <span>/</span> <span class="buzz-item-source"> Source: <a target="_blank" itemprop="url" href="',
    l += s(r[a].permalink),
    l += '" data-source-url="',
    l += s(r[a].source.url),
    l += '" class="buzz-item-link">',
    l += s(r[a].source.name),
    l += "</a> </span> </div> </div> </li> ";
    return l += " ",
    new String(l)
}); !
function(t, i) {
    "use strict";
    var n = function(i) {
        return this.$el = t(i),
        this.init(),
        this
    };
    n.prototype = {
        _page: 1,
        _lock: !1,
        init: function() {
            this.cacheDOM(),
            this.bindEvents()
        },
        cacheDOM: function() {
            this.$nano = this.$el.find(".js-nano"),
            this.$listContainer = this.$el.find(".js-buzz-list"),
            this.$loading = this.$el.find(".js-loading").detach(),
            this.$sourceElems = this.$el.find("[data-source-url]")
        },
        sendGA: function(t) {
            switch (t) {
            case "LOAD_MORE":
                ga("send", "event", "widget", "scroll", "ifanr-buzz-load-more", 1)
            }
            return this
        },
        loadData: function(t) {
            var i = this;
            i.$loading.appendTo(i.$listContainer),
            IFR.api("get_buzz_list", {
                data: {
                    page: t
                },
                success: function(t) {
                    1 === t.status && i.renderData(t.data),
                    i.$loading.detach()
                },
                error: function() {
                    i._lock = !1,
                    i.$loading.detach()
                }
            })
        },
        renderData: function(i) {
            var n;
            return i.length <= 0 ? void this.$listContainer.off("scroll") : (n = t(template("desktop-buzz-item", {
                list: i
            })), this.$listContainer.append(n), void(this._lock = !1))
        },
        bindEvents: function() {
            this.$nano.nanoScroller({
                preventPageScrolling: !0
            }),
            this.bindLoadMoreEvent(),
            this.$el.on("mouseenter touchstart", "[data-source-url]", this.bindClickSourceLinkEvent)
        },
        bindLoadMoreEvent: function() {
            var t = this,
            i = this.$listContainer,
            n = i.height(),
            e = !1;
            i.on("scroll",
            function() {
                e || (e = !0, setTimeout(function() {
                    var o = i.get(0).scrollHeight,
                    s = i.scrollTop();
                    s - (o - n) >= 0 && !t._lock && (t._lock = !0, t.loadData(++t._page), t.sendGA("LOAD_MORE")),
                    e = !1
                },
                250))
            })
        },
        bindClickSourceLinkEvent: function(i) {
            var n = t(this);
            n.attr("href", t(this).data("sourceUrl"))
        }
    },
    i.WidgetBuzz = n
} (jQuery, window);