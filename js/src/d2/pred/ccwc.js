

var __ccwc__ = function ( sinsign ) {

	/**
	 * Returns true if _c_ lies to the left of segment _ab_
	 * or if _a_ , _b_ and _c_ are colinear in a
	 * "right-handed" coordinate system.
	 */

	var ccwc = function ( a, b, c ) {
		return sinsign( a, b, c ) >= 0;
	};

	return ccwc;
};

exports.__ccwc__ = __ccwc__;
