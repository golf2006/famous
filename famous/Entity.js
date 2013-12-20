define(
	"famous/Entity", 
	[
		"require", 
		"exports", 
		"module"
	], function (t, i, e) {
		function s(t) {
		    var i = r.length;
		    return n(i, t), i
		}

		function o(t) {
		    return r[t]
		}

		function n(t, i) {
		    r[t] = i
		}

		var r = [];
		e.exports = {
		    register: s,
		    get: o,
		    set: n
		}
    }
);