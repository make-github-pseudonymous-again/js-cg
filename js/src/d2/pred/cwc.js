

var __cwc__ = function ( sinsign ) {

	/**
	 * Returns true if _c_ lies to the right of segment _ab_
	 * or if _a_ , _b_ and _c_ are colinear in a
	 * "right-handed" coordinate system.
	 */

	var cwc = function ( a, b, c ) {
		return sinsign( a, b, c ) <= 0;
	};

	return cwc;
};

exports.__cwc__ = __cwc__;
