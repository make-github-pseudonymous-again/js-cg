

var __lc__ = function(sinsign){

	/**
	 * Returns true if _c_ lies to the left of segment _ab_
	 * or if _a_ , _b_ and _c_ are colinear.
	 */

	var lc = function(a, b, c){
		return sinsign(a, b, c) >= 0;
	};

	return lc;
};

exports.__lc__ = __lc__;
