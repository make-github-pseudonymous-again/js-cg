
/**
 * Typically this kind of computation is not allowed. Computing distances
 * between two vertices in the general case requires to compute the square root
 * of a number. We only work with rationals in our algorithms and cannot handle
 * irrationals that could appear when allowing the use of square roots.
 */

var cosval = function ( a , b , c ) {
	return cossign( a , b , c ) / dist( a , b ) / dist( b , c ) ;
} ;

exports.cosval = cosval ;
