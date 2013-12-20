define(
	"famous/CanvasSurface", 
	[
		"require", 
		"exports", 
		"module", 
		"./Surface"
	], 
	function (t, i, e) 
	{
	    function s(t) {
	        t && t.canvasSize && (this.canvasSize = t.canvasSize), o.call(this, t), this.canvasSize || (this.canvasSize = this.getSize()), this.backBuffer = document.createElement("canvas"), this.canvasSize && (this.backBuffer.width = this.canvasSize[0], this.backBuffer.height = this.canvasSize[1]), this._contextId = void 0
	    }

	    var o = t("./Surface");
	    s.prototype = Object.create(o.prototype), s.prototype.elementType = "canvas", s.prototype.elementClass = "surface", s.prototype.setContent = function () {}, s.prototype.deploy = function (t) {
	        this.canvasSize && (t.width = this.canvasSize[0], t.height = this.canvasSize[1]), "2d" == this._contextId && (t.getContext(this._contextId).drawImage(this.backBuffer, 0, 0), this.backBuffer.width = 0, this.backBuffer.height = 0)
	    }, s.prototype.recall = function (t) {
	        this.getSize(), this.backBuffer.width = t.width, this.backBuffer.height = t.height, "2d" == this._contextId && (this.backBuffer.getContext(this._contextId).drawImage(t, 0, 0), t.width = 0, t.height = 0)
	    }, s.prototype.getContext = function (t) {
	        return this._contextId = t, this._currTarget ? this._currTarget.getContext(t) : this.backBuffer.getContext(t)
	    }, s.prototype.setSize = function (t, i) {
	        o.prototype.setSize.apply(this, arguments), i && (this.canvasSize = i.slice(0)), this._currTarget && (this._currTarget.width = this.canvasSize[0], this._currTarget.height = this.canvasSize[1])
	    }, e.exports = s
	}
);