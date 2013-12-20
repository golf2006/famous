define(
	"famous/ImageSurface", 
	[
		"require", 
		"exports", 
		"module", 
		"./Surface"
	], function (t, i, e) 
	{
        function s() {
            this.imageUrl = void 0, o.apply(this, arguments)
        }

        var o = t("./Surface");
        s.prototype = Object.create(o.prototype), 
        s.prototype.surfaceEvents = o.prototype.surfaceEvents.concat(
            [
                "load"
            ]
        ), 
        s.prototype.elementType = "img", 
        s.prototype.elementClass = "surface", 
        s.prototype.setContent = function (t) {
            this.imageUrl = t, this._contentDirty = !0
        }, s.prototype.deploy = function (t) {
            t.src = this.imageUrl || ""
        }, s.prototype.recall = function (t) {
            t.src = ""
        }, e.exports = s
    }
); 