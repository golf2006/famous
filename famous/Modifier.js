define(
	"famous/Modifier", 
	[
		"require", 
		"exports", 
		"module", 
		"./Matrix", 
		"./Transitionable", 
		"./Utility"
	], 
	function (t, i, e) 
	{
        function s(t) {
            var i = o.identity,
                e = 1,
                s = void 0,
                r = void 0;
            arguments.length > 1 || arguments[0] instanceof Array ? (void 0 !== arguments[0] && (i = arguments[0]), void 0 !== arguments[1] && (e = arguments[1]), s = arguments[2], r = arguments[3]) : t && (t.transform && (i = t.transform), void 0 !== t.opacity && (e = t.opacity), t.origin && (s = t.origin), t.size && (r = t.size)), this.transformTranslateState = new n([0, 0, 0]), this.transformRotateState = new n([0, 0, 0]), this.transformSkewState = new n([0, 0, 0]), this.transformScaleState = new n([1, 1, 1]), this.opacityState = new n(e), this.originState = new n([0, 0]), this.sizeState = new n([0, 0]), this._originEnabled = !1, this._sizeEnabled = !1, this.setTransform(i), this.setOpacity(e), this.setOrigin(s), this.setSize(r)
        }

        var o = t("./Matrix"),
            n = t("./Transitionable"),
            r = t("./Utility");
        s.prototype.getTransform = function () {
            return this.isActive() ? o.build({
                translate: this.transformTranslateState.get(),
                rotate: this.transformRotateState.get(),
                skew: this.transformSkewState.get(),
                scale: this.transformScaleState.get()
            }) : this.getFinalTransform()
        }, s.prototype.getFinalTransform = function () {
            return this._finalTransform
        }, s.prototype.setTransform = function (t, i, e) {
            var s = e ? r.after(4, e) : void 0;
            if (i) {
                if (this._transformDirty) {
                    var n = o.interpret(this.getFinalTransform());
                    this.transformTranslateState.set(n.translate), this.transformRotateState.set(n.rotate), this.transformSkewState.set(n.skew), this.transformScaleState.set(n.scale), this._transformDirty = !1
                }
                var a = o.interpret(t);
                this.transformTranslateState.set(a.translate, i, s), this.transformRotateState.set(a.rotate, i, s), this.transformSkewState.set(a.skew, i, s), this.transformScaleState.set(a.scale, i, s)
            } else this.transformTranslateState.halt(), this.transformRotateState.halt(), this.transformSkewState.halt(), this.transformScaleState.halt(), this._transformDirty = !0;
            this._finalTransform = t
        }, s.prototype.getOpacity = function () {
            return this.opacityState.get()
        }, s.prototype.setOpacity = function (t, i, e) {
            this.opacityState.set(t, i, e)
        }, s.prototype.getOrigin = function () {
            return this._originEnabled ? this.originState.get() : void 0
        }, s.prototype.setOrigin = function (t, i, e) {
            this._originEnabled = !! t, t || (t = [0, 0]), t instanceof Array || (t = r.origins[t]), this.originState.set(t, i, e)
        }, s.prototype.getSize = function () {
            return this._sizeEnabled ? this.sizeState.get() : void 0
        }, s.prototype.setSize = function (t, i, e) {
            this._sizeEnabled = !! t, t || (t = [0, 0]), this.sizeState.set(t, i, e)
        }, s.prototype.setDefaultTransition = function (t) {
            this.transformTranslateState.setDefault(t), this.transformRotateState.setDefault(t), this.transformSkewState.setDefault(t), this.transformScaleState.setDefault(t), this.opacityState.setDefault(t), this.originState.setDefault(t), this.sizeState.setDefault(t)
        }, s.prototype.halt = function () {
            this.transformTranslateState.halt(), this.transformRotateState.halt(), this.transformSkewState.halt(), this.transformScaleState.halt(), this.opacityState.halt(), this.originState.halt(), this.sizeState.halt()
        }, s.prototype.isActive = function () {
            return this.transformTranslateState.isActive() || this.transformRotateState.isActive() || this.transformSkewState.isActive() || this.transformScaleState.isActive()
        }, s.prototype.render = function (t) {
            return {
                transform: this.getTransform(),
                opacity: this.getOpacity(),
                origin: this.getOrigin(),
                size: this.getSize(),
                target: t
            }
        }, e.exports = s
    }
);