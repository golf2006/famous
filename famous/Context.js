define(
	"famous/Context", 
	[
		"require", 
		"exports", 
		"module", 
		"./RenderNode", 
		"./EventHandler", 
		"./SpecParser", 
		"./ElementAllocator", 
		"./Matrix", 
		"./Transitionable"
	], function (t, i, e) 
	{
        function s(t) {
            this.container = t, this.allocator = new a(t), this.srcNode = new n, this.eventHandler = new r, this._size = [window.innerWidth, window.innerHeight], this.perspectiveState = new u(0), this._perspective = void 0, this.eventHandler.on("resize", function () {
                this._size = o(this.container)
            }.bind(this))
        }

        function o(t) {
            return [t.clientWidth, t.clientHeight]
        }

        var n = t("./RenderNode"),
            r = t("./EventHandler");
        t("./SpecParser");
        var a = t("./ElementAllocator"),
            h = t("./Matrix"),
            u = t("./Transitionable");
        s.prototype.getAllocator = function () {
            return this.allocator
        }, s.prototype.link = function (t) {
            return this.srcNode.link(t)
        }, s.prototype.add = function (t) {
            return this.srcNode.add(t)
        }, s.prototype.mod = function (t) {
            return this.srcNode.mod(t)
        }, s.prototype.migrate = function (t) {
            t !== this.container && (this.container = t, this.allocator.migrate(t))
        }, s.prototype.getSize = function () {
            return this._size
        }, s.prototype.setSize = function (t) {
            t || (t = o(this.container)), this._size = t
        }, s.prototype.update = function () {
            var t = this.perspectiveState.get();
            t !== this._perspective && (this.container.style.perspective = t ? t.toFixed() + "px" : "", this.container.style.webkitPerspective = t ? t.toFixed() : "", this._perspective = t), this.srcNode && this.srcNode.commit(this, h.identity, 1, [0, 0], this._size)
        }, s.prototype.getOutputTransform = function (t) {
            var i = this.parsedCache;
            if (i) {
                var e = t.id,
                    s = {
                        transform: i.transforms[e],
                        opacity: i.opacities[e]
                    };
                if (i.origins[e] && (s.origin = i.origins[e]), i.groups[e]) {
                    var o = i.groups[e];
                    s.transform = h.multiply(s.transform, i.groupTransforms[o]), i.groupOpacities[o] && (s.opacity *= i.groupOpacities[o])
                }
                return s
            }
        }, s.prototype.getPerspective = function () {
            return this.perspectiveState.get()
        }, s.prototype.setPerspective = function (t, i, e) {
            return this.perspectiveState.set(t, i, e)
        }, s.prototype.emit = function (t, i) {
            return this.eventHandler.emit(t, i)
        }, s.prototype.on = function (t, i) {
            return this.eventHandler.on(t, i)
        }, s.prototype.unbind = function (t, i) {
            return this.eventHandler.unbind(t, i)
        }, s.prototype.pipe = function (t) {
            return this.eventHandler.pipe(t)
        }, s.prototype.unpipe = function (t) {
            return this.eventHandler.unpipe(t)
        }, e.exports = s
    }
);