

var __ccw__ = function ( sinsign ) {

	/**
	 * Returns true if _c_ lies to the left of segment _ab_
	 * in a "right-handed" coordinate system.
	 */

	var ccw = function ( a, b, c ) {
		return sinsign( a, b, c ) > 0;
	};

	return ccw;
};

exports.__ccw__ = __ccw__;
