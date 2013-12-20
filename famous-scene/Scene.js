define(
	"famous-scene/Scene", 
	[
		"require", 
		"exports", 
		"module", 
		"famous-utils/Utils", 
		"famous-utils/KeyCodes", 
		"famous/Engine", 
		"famous/EventHandler", 
		"famous/View"
	], 
	function (t, i, e) 
	{
        function s() {
            n.apply(this, arguments), this.width = o.getWidth(), this.height = o.getHeight(), this.mouseDown = !1, this.callbacks = {}, this.bindEvents()
        }

        var o = t("famous-utils/Utils");
        t("famous-utils/KeyCodes"), t("famous/Engine"), t("famous/EventHandler");
        var n = t("famous/View");
        s.prototype = Object.create(n.prototype), s.prototype.bindEvents = function () {
            this.callbacks.prerender = this.update.bind(this), this.callbacks.touchstart = this.touchstart.bind(this), this.callbacks.touchmove = this.touchmove.bind(this), this.callbacks.touchend = this.touchend.bind(this), this.callbacks.keypress = this.keypress.bind(this), this.callbacks.resize = o.debounce(this.resize.bind(this), 333), this.callbacks.mousedown = this._mousedown.bind(this), this.callbacks.mousemove = this._mousemove.bind(this), this.callbacks.mouseover = this._mouseover.bind(this), this.callbacks.mouseup = this._mouseup.bind(this), this.callbacks.mouseout = this._mouseout.bind(this), this.callbacks.keydown = this.keydown.bind(this), this.callbacks.keyup = this.keyup.bind(this);
            for (var t = Object.keys(this.callbacks), i = 0; i < t.length; i++) this.eventInput.on(t[i], this.callbacks[t[i]])
        }, s.prototype.unbindEvents = function () {
            for (var t = Object.keys(this.callbacks), i = 0; i < t.length; i++) this.unbind(t[i], this.callbacks[t[i]])
        }, s.prototype.activate = function (t) {
            t && t()
        }, s.prototype.update = function () {}, s.prototype.render = function () {
            return this.node.render()
        }, s.prototype.deactivate = function (t) {
            t && t()
        }, s.prototype.touchstart = function () {}, s.prototype.touchmove = function () {}, s.prototype.touchend = function () {}, s.prototype._mousedown = function (t) {
            this.mouseDown = !0, this.mousedown(t)
        }, s.prototype._mousemove = function (t) {
            this.mouseDown === !0 ? this.mousedrag(t) : this.mousemove(t)
        }, s.prototype._mouseover = function (t) {
            this.mouseover(t)
        }, s.prototype._mouseup = function (t) {
            this.mouseDown = !1, this.mouseup(t)
        }, s.prototype._mouseout = function (t) {
            this.mouseout(t)
        }, s.prototype.mousedown = function () {}, s.prototype.mouseup = function () {}, s.prototype.mousemove = function () {}, s.prototype.mouseover = function () {}, s.prototype.mouseout = function () {}, s.prototype.mousedrag = function () {}, s.prototype.keypress = function () {}, s.prototype.keydown = function () {}, s.prototype.keyup = function () {}, s.prototype.keypress = function () {}, s.prototype.resize = function () {
            this.width = o.getWidth(), this.height = o.getHeight()
        }, s.prototype.setController = function (t) {
            this.controller = t
        }, e.exports = s
    }
); 