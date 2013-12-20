define("famous/Surface", 
    [
        "require", 
        "exports", 
        "module", 
        "./Entity", 
        "./EventHandler", 
        "./Matrix"
    ], 
    function (t, i, e) 
    {
        function s(t) {
            this.options = {}, 
            this.properties = {}, 
            this.content = "", 
            this.classList = [], 
            this.size = void 0, 
            this._classesDirty = !0, 
            this._stylesDirty = !0, 
            this._sizeDirty = !0, 
            this._contentDirty = !0, 
            this._dirtyClasses = [], 
            this._matrix = void 0, 
            this._opacity = 1, 
            this._origin = void 0, 
            this._size = void 0, 
            this.eventForwarder = function (t) 
            {
                this.emit(t.type, t)
            }.bind(this), 
            this.eventHandler = new f, 
            this.eventHandler.bindThis(this), 
            this.id = l.register(this), 
            t && this.setOptions(t), this._currTarget = void 0
        }

        function o(t) {
            for (var i = this.surfaceEvents, e = 0; e < i.length; e++) t.addEventListener(i[e], this.eventForwarder)
        }

        function r(t) {
            for (var i = this.surfaceEvents, e = 0; e < i.length; e++) t.removeEventListener(i[e], this.eventForwarder)
        }

        function a(t) {
            for (var i = 0; i < this._dirtyClasses.length; i++) t.classList.remove(this._dirtyClasses[i]);
            this._dirtyClasses = []
        }

        function h(t) {
            for (var i in this.properties) t.style[i] = this.properties[i]
        }

        function u(t) {
            for (var i in this.properties) t.style[i] = ""
        }

        function p(t, i) {
            return t || i ? t && i ? t[0] == i[0] && t[1] == i[1] : !1 : !0
        }

        function c(t) {
            return (100 * t[0]).toFixed(6) + "% " + (100 * t[1]).toFixed(6) + "%"
        }

        var l = t("./Entity"),
            f = t("./EventHandler"),
            d = t("./Matrix"),
            m = void 0 !== document.body.style.webkitTransform;
        s.prototype.surfaceEvents = [
            "touchstart", 
            "touchmove", 
            "touchend", 
            "touchcancel", 
            "click", 
            "mousedown", 
            "mouseup", 
            "mousemove", 
            "mouseover", 
            "mouseout", 
            "mouseenter", 
            "mouseleave", 
            "mousewheel", 
            "wheel"
        ], 
            s.prototype.elementType = "div", 
            s.prototype.elementClass = "surface", 
            s.prototype.on = function (t, i) {
                this.eventHandler.on(t, i)
        }, s.prototype.unbind = function (t, i) {
            this.eventHandler.unbind(t, i)
        }, s.prototype.emit = function (t, i) {
            i && !i.origin && (i.origin = this);
            var e = this.eventHandler.emit(t, i);
            return e && i.stopPropagation && i.stopPropagation(), e
        }, s.prototype.pipe = function (t) {
            return this.eventHandler.pipe(t)
        }, s.prototype.pipeEvents = function () {
            return console.warn("pipeEvents is deprecated; use pipe instead"), this.pipe.apply(this, arguments)
        }, s.prototype.unpipe = function (t) {
            return this.eventHandler.unpipe(t)
        }, s.prototype.render = function () {
            return this.id
        }, s.prototype.setProperties = function (t) {
            for (n in t) this.properties[n] = t[n];
            this._stylesDirty = !0
        }, s.prototype.getProperties = function () {
            return this.properties
        }, s.prototype.addClass = function (t) {
            this.classList.indexOf(t) < 0 && (this.classList.push(t), this._classesDirty = !0)
        }, s.prototype.removeClass = function (t) {
            var i = this.classList.indexOf(t);
            i >= 0 && (this._dirtyClasses.push(this.classList.splice(i, 1)[0]), this._classesDirty = !0)
        }, s.prototype.setClasses = function (t) {
            for (var i = [], e = 0; e < this.classList.length; e++) t.indexOf(this.classList[e]) < 0 && i.push(this.classList[e]);
            for (var e = 0; e < i.length; e++) this.removeClass(i[e]);
            for (var e = 0; e < t.length; e++) this.addClass(t[e])
        }, s.prototype.getClassList = function () {
            return this.classList
        }, s.prototype.setContent = function (t) {
            this.content != t && (this.content = t, this._contentDirty = !0)
        }, s.prototype.getContent = function () {
            return this.content
        }, s.prototype.setOptions = function (t) {
            t.size && this.setSize(t.size), t.classes && this.setClasses(t.classes), t.properties && this.setProperties(t.properties), t.content && this.setContent(t.content)
        };
        var y, g, v;
        y = m ? function (t, i) {
            t.style.webkitTransform = d.formatCSS(i)
        } : function (t, i) {
            t.style.transform = d.formatCSS(i)
        }, g = m ? function (t, i) {
            t.style.webkitTransformOrigin = c(i)
        } : function (t, i) {
            t.style.transformOrigin = c(i)
        }, v = m ? function (t) {
            t.style.webkitTransform = "scale3d(0.0001,0.0001,1)", t.style.opacity = 0
        } : function (t) {
            t.style.transform = "scale3d(0.0001,0.0001,1)", t.style.opacity = 0
        }, s.prototype.setup = function (t) {
            var i = t.allocate(this.elementType);
            if (this.elementClass)
                if (this.elementClass instanceof Array)
                    for (var e = 0; e < this.elementClass.length; e++) i.classList.add(this.elementClass[e]);
                else i.classList.add(this.elementClass);
            o.call(this, i), g(i, [0, 0]), this._currTarget = i, this._stylesDirty = !0, this._classesDirty = !0, this._sizeDirty = !0, this._contentDirty = !0, this._matrix = void 0, this._opacity = void 0, this._origin = void 0, this._size = void 0
        }, s.prototype.commit = function (t, i, e, s, o) {
            this._currTarget || this.setup(t.getAllocator());
            var n = this._currTarget;
            if (this.size) {
                var r = o;
                o = this.size.slice(0), void 0 === o[0] && r[0] && (o[0] = r[0]), void 0 === o[1] && r[1] && (o[1] = r[1])
            }
            if (p(this._size, o) || (this._size = o.slice(0), this._sizeDirty = !0), !i && this._matrix) return this._matrix = void 0, this._opacity = 0, v(n), void 0;
            if (this._opacity !== e && (this._opacity = e, n.style.opacity = Math.min(e, .999999)), !p(this._origin, s) || !d.equals(this._matrix, i)) {
                i || (i = d.identity), s || (s = [0, 0]), this._origin = s.slice(0), this._matrix = i;
                var u = i;
                s && (u = d.moveThen([-this._size[0] * s[0], -this._size[1] * s[1]], i)), y(n, u)
            }
            if (this._classesDirty || this._stylesDirty || this._sizeDirty || this._contentDirty) {
                if (this._classesDirty) {
                    a.call(this, n);
                    for (var c = this.getClassList(), l = 0; l < c.length; l++) n.classList.add(c[l]);
                    this._classesDirty = !1
                }
                this._stylesDirty && (h.call(this, n), this._stylesDirty = !1), this._sizeDirty && (this._size && (n.style.width = this._size[0] !== !0 ? this._size[0] + "px" : "", n.style.height = this._size[1] !== !0 ? this._size[1] + "px" : ""), this._sizeDirty = !1), this._contentDirty && (this.deploy(n), this._contentDirty = !1)
            }
        }, s.prototype.cleanup = function (t) {
            var i = this._currTarget;
            this.recall(i), i.style.width = "", i.style.height = "", this._size = void 0, u.call(this, i);
                var e = this.getClassList();
                a.call(this, i);
                for (var s = 0; s < e.length; s++) i.classList.remove(e[s]);
                r.call(this, i), this._currTarget = void 0, t.deallocate(i), v(i)
            }, s.prototype.deploy = function (t) {
                var i = this.getContent();
                "string" == typeof i ? t.innerHTML = i : t.appendChild(i)
            }, s.prototype.recall = function (t) {
                for (var i = document.createDocumentFragment(); t.hasChildNodes();) i.appendChild(t.firstChild);
                this.setContent(i)
            }, s.prototype.getSize = function (t) {
                return t ? this._size : this.size || this._size
            }, s.prototype.setSize = function (t) {
                this.size = t ? t.slice(0, 2) : void 0, this._sizeDirty = !0
            }, e.exports = s
    }
); 