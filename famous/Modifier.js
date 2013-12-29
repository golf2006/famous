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
        function Modifier(options)
        {
            var transform = Matrix.identity,
                opacity = 1,
                origin = void 0,
                size = void 0;

            // if the arguments are provided as sequential parameters
            // (transform, opacity, origin, size)
            if (arguments.length > 1 || arguments[0] instanceof Array) {
                if (arguments[0] !== void 0) {
                    transform = arguments[0];
                }
                if (arguments[1] !== void 0) {
                    opacity = arguments[1];
                }
                origin = arguments[2];
                size = arguments[3];
            } else if (options) {
                if (options.transform) {
                    transform = options.transform;
                }
                if (options.opacity !== void 0) {
                    opacity = options.opacity
                }
                if (options.origin) {
                    origin = options.origin;
                }
                if (options.size) {
                    size = options.size;
                }
            }

            this.transformTranslateState = new Transitionable([0, 0, 0]);
            this.transformRotateState = new Transitionable([0, 0, 0]);
            this.transformSkewState = new Transitionable([0, 0, 0]);
            this.transformScaleState = new Transitionable([1, 1, 1]);
            this.opacityState = new Transitionable(opacity);
            this.originState = new Transitionable([0, 0]);
            this.sizeState = new Transitionable([0, 0]);
            this._originEnabled = false;
            this._sizeEnabled = false;
            this.setTransform(transform);
            this.setOpacity(opacity);
            this.setOrigin(origin);
            this.setSize(size);
        }

        var Matrix = t("./Matrix");
        var Transitionable = t("./Transitionable");
        var Utility = t("./Utility");

        Modifier.prototype.getTransform = function ()
        {
            return this.isActive()
                ? Matrix.build(
                    {
                        translate: this.transformTranslateState.get(),
                        rotate: this.transformRotateState.get(),
                        skew: this.transformSkewState.get(),
                        scale: this.transformScaleState.get()
                    }
                )
                : this.getFinalTransform();
        };

        Modifier.prototype.getFinalTransform = function ()
        {
            return this._finalTransform
        };

        Modifier.prototype.setTransform = function (t, i, e)
        {
            var s = e ? Utility.after(4, e) : void 0;
            if (i) {
                if (this._transformDirty) {
                    var n = Matrix.interpret(this.getFinalTransform());
                    this.transformTranslateState.set(n.translate), this.transformRotateState.set(n.rotate), this.transformSkewState.set(n.skew), this.transformScaleState.set(n.scale), this._transformDirty = !1
                }
                var a = Matrix.interpret(t);
                this.transformTranslateState.set(a.translate, i, s);
                this.transformRotateState.set(a.rotate, i, s);
                this.transformSkewState.set(a.skew, i, s);
                this.transformScaleState.set(a.scale, i, s);
            } else {
                this.transformTranslateState.halt();
                this.transformRotateState.halt();
                this.transformSkewState.halt();
                this.transformScaleState.halt();
                this._transformDirty = !0;
            }
            this._finalTransform = t
        };

        Modifier.prototype.getOpacity = function ()
        {
            return this.opacityState.get()
        };

        Modifier.prototype.setOpacity = function (t, i, e)
        {
            this.opacityState.set(t, i, e)
        };

        Modifier.prototype.getOrigin = function ()
        {
            return this._originEnabled ? this.originState.get() : void 0
        };

        Modifier.prototype.setOrigin = function (t, i, e)
        {
            this._originEnabled = !! t, t || (t = [0, 0]), t instanceof Array || (t = Utility.origins[t]), this.originState.set(t, i, e)
        };

        Modifier.prototype.getSize = function ()
        {
            return this._sizeEnabled ? this.sizeState.get() : void 0
        };

        Modifier.prototype.setSize = function (t, i, e)
        {
            this._sizeEnabled = !! t, t || (t = [0, 0]), this.sizeState.set(t, i, e)
        };

        Modifier.prototype.setDefaultTransition = function (t)
        {
            this.transformTranslateState.setDefault(t);
            this.transformRotateState.setDefault(t);
            this.transformSkewState.setDefault(t);
            this.transformScaleState.setDefault(t);
            this.opacityState.setDefault(t);
            this.originState.setDefault(t);
            this.sizeState.setDefault(t);
        };

        Modifier.prototype.halt = function ()
        {
            this.transformTranslateState.halt();
            this.transformRotateState.halt();
            this.transformSkewState.halt();
            this.transformScaleState.halt();
            this.opacityState.halt();
            this.originState.halt();
            this.sizeState.halt();
        };

        Modifier.prototype.isActive = function ()
        {
            return this.transformTranslateState.isActive() || this.transformRotateState.isActive() || this.transformSkewState.isActive() || this.transformScaleState.isActive()
        };

        Modifier.prototype.render = function (t)
        {
            return {
                transform: this.getTransform(),
                opacity: this.getOpacity(),
                origin: this.getOrigin(),
                size: this.getSize(),
                target: t
            }
        };

        e.exports = Modifier;
    }
);