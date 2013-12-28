define(
	"famous/Engine", 
	[
		"require", 
		"exports", 
		"module", 
		"./Context", 
		"./EventHandler"
	], 
	function (t, i, e) 
	{
        function s() {
            var t = Date.now();
            if (T && T > t - w) return requestAnimationFrame(s), void 0;
            z = t - w, w = t, O.emit("prerender");
            for (var i = 0; i < b.length; i++) b[i].call(this);
            for (b = []; x.length && Date.now() - t < _;) x.shift().call(this);
            for (var i = 0; i < S.length; i++) S[i].update();
            O.emit("postrender");
            requestAnimationFrame(s);
        }

        function o(t) {
            if (document.activeElement && "INPUT" == document.activeElement.nodeName) return document.activeElement.addEventListener("blur", function e() {
                this.removeEventListener("blur", e), o(t)
            }), void 0;
            window.scrollTo(0, 0);
            for (var i = 0; i < S.length; i++) S[i].emit("resize");
            O.emit("resize")
        }

        function n(t) {
            return O.pipe(t)
        }

        function r(t) {
            return O.unpipe(t)
        }

        function a(t, i) {
            O.on(t, i)
        }

        function h(t, i) {
            O.emit(t, i)
        }

        function u(t, i) {
            O.unbind(t, i)
        }

        function p() {
            return 1e3 / z
        }

        function c(t) {
            T = Math.floor(1e3 / t)
        }

        function l(t) {
            void 0 === t ? (t = document.createElement("div"), t.classList.add("container"), document.body.appendChild(t)) : t instanceof Element || (t = document.createElement("div"), console.warn("Tried to create context on non-existent element"));
            var i = new g(t);
            return S.push(i), i
        }

        function f(t) {
            b.push(t)
        }

        function d(t) {
            return M[t]
        }

        function m(t) {
            var i = M.length;
            return M[i] = t, i
        }

        function y(t) {
            x.push(t)
        }

        var g = t("./Context"),
            v = t("./EventHandler"),
            S = [],
            b = [],
            x = [],
            w = Date.now(),
            z = void 0,
            T = void 0,
            O = new v,
            _ = 10,
            M = [];
        requestAnimationFrame(s), window.addEventListener("resize", o, !1), o(), window.addEventListener("touchmove", function (t) {
            t.preventDefault()
        }, !1);
        for (var C = ["touchstart", "touchmove", "touchend", "touchcancel", "click", "keydown", "keyup", "keypress", "mouseup", "mousedown", "mousemove", "mouseover", "mouseout", "mousewheel", "wheel", "resize"], P = 0; P < C.length; P++) {
            var k = C[P];
            document.body.addEventListener(k, function (t) {
                O.emit(t.type, t, !1)
            }, !1)
        }
        e.exports = {
            on: a,
            defer: y,
            emit: h,
            unbind: u,
            pipe: n,
            unpipe: r,
            createContext: l,
            getFPS: p,
            setFPSCap: c,
            nextTick: f,
            getEntity: d,
            registerEntity: m
        }
    }
);