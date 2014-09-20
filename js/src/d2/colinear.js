

var __colinear__ = function(sinsign){

	/**
	 * Returns true if _a_ , _b_ and _c_ are colinear.
	 */

	var colinear = function(a, b, c){
		return sinsign(a, b, c) === 0;
	};

	return colinear;
};

exports.__colinear__ = __colinear__;
