(function(exports, undefined){

	'use strict';


/* js/src/d2 */
/* js/src/d2/colinear.js */


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

/* js/src/d2/cossign.js */


/**
 * Computes the cosinus sign in a "right-handed"
 * coordinate system (i.e. clockwise angle values).
 * cossign(a, b, c) > 0 iff angle _abc_ is acute.
 *
 * <p>
 *
 * with
 *   - 3 add
 *   - 4 sub
 *   - 4 mul
 *
 */

var cossign = function(a, b, c){
	return b[0] * (b[0] - a[0] - c[0]) +
	       b[1] * (b[1] - a[1] - c[1]) +
	       c[0] * a[0] +
	       c[1] * a[1];
};

exports.cossign = cossign;

/* js/src/d2/lc.js */


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

/* js/src/d2/lt.js */


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

/* js/src/d2/rc.js */


var __rc__ = function(sinsign){

	/**
	 * Returns true if _c_ lies to the right of segment _ab_
	 * or if _a_ , _b_ and _c_ are colinear.
	 */

	var rc = function(a, b, c){
		return sinsign(a, b, c) <= 0;
	};

	return rc;
};

exports.__rc__ = __rc__;

/* js/src/d2/rt.js */


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

/* js/src/d2/sinsign.js */


/**
 * Computes the cross product of vectors _ab_ and _ac_.
 * Can be interpreted as the sinus sign in a "right-handed"
 * coordinate system (i.e. clockwise angle values).
 * sinsign(a, b, c) > 0 iff point c 'lies to the left' of segment _ab_. 
 * 
 * <p>
 * Originally implemented as
 * 
 *     a[1] * (c[0] - b[0]) + b[1] * (a[0] - c[0]) + c[1] * (b[0] - a[0])
 *     
 * with
 *   - 2 add
 *   - 3 sub
 *   - 3 mul
 *    
 * Reduced to
 *
 *     (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
 *
 * with
 *   - 5 sub
 *   - 2 mul
 * 
 */

var sinsign = function(a, b, c){
	return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
};


exports.sinsign = sinsign;

})(typeof exports === 'undefined' ? this['cg'] = {} : exports);
