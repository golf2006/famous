define(
	"famous-ui/PanelScrollview", 
	[
		"require", 
		"exports", 
		"module", 
		"famous-views/Scrollview"
	], 
	function (t, i, e) 
	{
        function s(t) {
            this.panelOpts = {
                scrollviewOptions: {
                    direction: "y",
                    itemSpacing: 20
                },
                width: 256,
                sliderHeight: 20
            }, this.setPanelOptions(t), n.call(this, this.panelOpts.scrollviewOptions), this.uiItems = [], this._sequenced = !1
        }

        function o(t) {
            this.uiItems.push(t), this._sequenced === !1 && (this.sequenceFrom(this.uiItems), this._sequenced = !0), void 0 === t.getSize() && t.setSize && t.setSize([this.panelOpts.width, this.panelOpts.sliderHeight]), t.init && t.init(), t.pipe && t.pipe(this)
        }

        var n = t("famous-views/Scrollview");
        s.prototype = Object.create(n.prototype), s.prototype.setPanelOptions = function (t) {
            for (var i in t) this.panelOpts[i] = t[i]
        }, s.prototype.reset = function () {
            this.uiItems = [], this._sequenced = !1
        }, s.prototype.add = function (t) {
            if (t instanceof Array)
                for (var i = 0; i < t.length; i++) o.call(this, t[i]);
            else o.call(this, t)
        }, s.prototype.addBackground = function () {}, e.exports = s
    }
); 