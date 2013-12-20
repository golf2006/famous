define(
	"famous/RenderNode", 
    [
        "require", 
        "exports", 
        "module", 
        "./Entity", 
        "./SpecParser", 
        "./Matrix"
    ], 
    function (t, i, e) 
    {
        function s(t) {
            this.modifiers = [], this.object = void 0, t && this.set(t), this._hasCached = !1, this._resultCache = {}, this._prevResults = {}
        }

    function o(t, i, e) {
        var s = r.parse(t);
        for (var a in s) {
            var h = n.get(a),
                u = s[a];
            u.unshift(i);
            var p = h.commit.apply(h, u);
            p ? o(p, i, e) : e[a] = u
        }
    }

    var n = t("./Entity"),
        r = t("./SpecParser");
    t("./Matrix"), s.prototype.get = function () {
        return this.object
    }, s.prototype.set = function (t) {
        this.object = t
    }, s.prototype.link = function (t) {
        if (t instanceof Array) this.set(t);
        else {
            var i = this.get();
            i ? i instanceof Array ? this.modifiers.unshift(t) : (this.modifiers.unshift(i), this.set(t)) : this.set(t)
        }
        return this
    }, s.prototype.add = function (t) {
        this.get() instanceof Array || this.set([]);
        var i = new s(t);
        return this.get().push(i), i
    }, s.prototype.mod = function (t) {
        return this.modifiers.push(t), this
    }, s.prototype.commit = function (t, i, e, s, r) {
        var a = this.render(void 0, this._hasCached);
        if (a !== !0) {
            for (var h in this._prevResults)
                if (!(h in this._resultCache)) {
                    var u = n.get(h);
                    u.cleanup && u.cleanup(t.getAllocator())
                }
            this._prevResults = this._resultCache, this._resultCache = {}, o({
                transform: i,
                size: r,
                origin: s,
                opacity: e,
                target: a
            }, t, this._resultCache), this._hasCached = !0
        }
    }, s.prototype.render = function (t) {
        var i = t,
            e = this.get();
        if (e)
            if (e.render) i = e.render(t);
            else {
                var s = e.length - 1;
                for (i = new Array(s); s >= 0;) i[s] = e[s].render(), s--
            }
        for (var o = this.modifiers.length, s = 0; o > s; s++) i = this.modifiers[s].render(i);
        return i
    }, e.exports = s
});