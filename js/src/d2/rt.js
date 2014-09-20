

var __rt__ = function(sinsign){

	/**
	 * Returns true if _c_ lies to the right of segment _ab_.
	 */

	var rt = function(a, b, c){
		return sinsign(a, b, c) < 0;
	};

	return rt;
};

exports.__rt__ = __rt__;
