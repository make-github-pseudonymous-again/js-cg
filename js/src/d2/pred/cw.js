

var __cw__ = function(sinsign){

	/**
	 * Returns true if _c_ lies to the right of segment _ab_
	 * in a "right-handed" coordinate system.
	 */

	var cw = function(a, b, c){
		return sinsign(a, b, c) < 0;
	};

	return cw;
};

exports.__cw__ = __cw__;
