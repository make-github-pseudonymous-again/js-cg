

var __lt__ = function(sinsign){

	/**
	 * Returns true if _c_ lies to the left of segment _ab_.
	 */

	var lt = function(a, b, c){
		return sinsign(a, b, c) > 0;
	};

	return lt;
};

exports.__lt__ = __lt__;
