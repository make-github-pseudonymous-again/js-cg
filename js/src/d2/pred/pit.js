

/**
 * Returns true if point is in triangle.
 */

var __pit__ = function (ccw) {

	var pit = function (x, a, b, c) {
		return ccw(a, b, x) &&
		       ccw(b, c, x) &&
		       ccw(c, a, x);
	};

	return pit;
};

exports.__pit__ = __pit__;
