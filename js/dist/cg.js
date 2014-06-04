(function(exports){

	'use strict';


/* /home/genius/Bureau/cg/js/src/2d */
/* /home/genius/Bureau/cg/js/src/2d/sin_sign.js */

/**
 * Computes the cross product of _ab_ and _ac_,
 * can be interpreted as the sinus sign in a "right-handed" coordinate system
 * (i.e. clockwise angle values).
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

var sin_sign = function(a, b, c){
	return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
};


exports.sin_sign = sin_sign;
})(typeof exports === 'undefined' ? this['cg'] = {} : exports);
