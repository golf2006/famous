define(
	"famous/Transitionable", 
	[
		"require", 
		"exports", 
		"module", 
		"./Utility", 
		"./MultipleTransition", 
		"./TweenTransition"
	], 
	function (t, i, e) 
	{
        function s(t) {
            this.currentAction = null, this.actionQueue = [], this.callbackQueue = [], this.state = 0, this._callback = void 0, this._engineInstance = null, this._currentMethod = null, this.set(t)
        }

        function o() {
            if (this._callback) {
                var t = this._callback;
                this._callback = void 0, t()
            }
            if (this.actionQueue.length <= 0) return this.set(this._engineInstance), void 0;
            this.currentAction = this.actionQueue.shift(), this._callback = this.callbackQueue.shift();
            var i = null,
                e = this.currentAction[0],
                s = this.currentAction[1];
            s instanceof Object && s.method ? (i = s.method, "string" == typeof i && (i = a[i])) : i = r, this._currentMethod !== i && (this._engineInstance = !(e instanceof Object) || i.SUPPORTS_MULTIPLE === !0 || e.length <= i.SUPPORTS_MULTIPLE ? new i : new n(i), this._currentMethod = i), this._engineInstance.reset(this.state), this._engineInstance.set(e, s, o.bind(this))
        }

        t("./Utility");
        var n = t("./MultipleTransition"),
            r = t("./TweenTransition"),
            a = {};
        s.registerMethod = function (t, i) {
            return t in a ? !1 : (a[t] = i, !0)
        }, s.unregisterMethod = function (t) {
            return t in a ? (delete a[t], !0) : !1
        }, s.prototype.set = function (t, i, e) {
            if (!i) return this.reset(t), e && e(), void 0;
            var s = [t, i];
            this.actionQueue.push(s), this.callbackQueue.push(e), this.currentAction || o.call(this)
        }, s.prototype.reset = function (t) {
            this._currentMethod = null, this._engineInstance = null, this.state = t, this.currentAction = null, this.actionQueue = [], this.callbackQueue = []
        }, s.prototype.delay = function (t, i) {
            this.set(this._engineInstance, {
                duration: t,
                curve: function () {
                    return 0
                }
            }, i)
        }, s.prototype.get = function (t) {
            return this._engineInstance && (this.state = this._engineInstance.get(t)), this.state
        }, s.prototype.isActive = function () {
            return !!this.currentAction
        }, s.prototype.halt = function () {
            this.set(this.get())
        }, e.exports = s
    }
);