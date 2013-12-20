 define(
	 "famous/View", 
	 [
        "require", 
        "exports", 
        "module", 
        "./RenderNode", 
        "./EventHandler", 
        "./OptionsManager"
    ], 
    function (t, i, e) 
    {
        function s(t) {
            this.node = new o, 
            this.eventInput = new n, 
            this.eventOutput = new n, 
            n.setInputHandler(this, this.eventInput), 
            n.setOutputHandler(this, this.eventOutput), 
            this.options = Object.create(this.constructor.DEFAULT_OPTIONS || s.DEFAULT_OPTIONS), 
            this.optionsManager = new r(this.options), 
            t && this.setOptions(t)
        }

        var o = t("./RenderNode"),
            n = t("./EventHandler"),
            r = t("./OptionsManager");

        s.DEFAULT_OPTIONS = null, 
        s.prototype.getOptions = function () {
            return this.optionsManager.value()
        }, s.prototype.setOptions = function (t) {
            this.optionsManager.patch(t)
        }, s.prototype._add = function () {
            return this.node.add.apply(this.node, arguments)
        }, s.prototype._link = function () {
            return this.node.link.apply(this.node, arguments)
        }, s.prototype.render = function () {
            return this.node.render.apply(this.node, arguments)
        }, s.prototype.getSize = function () {
            var t = this.node.get();
            return t.getSize ? t.getSize.apply(t, arguments) : this.options.size
        }, e.exports = s;
	}
);