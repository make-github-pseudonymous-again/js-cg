
/**
 * Computes the determinant of the following 3 x 3 matrix.
 *
 * | A00 A01 A02 |
 * | A10 A11 A12 |
 * | A20 A21 A22 |
 *
 */

var det3 = function ( A00 , A01 , A02 , A10 , A11 , A12 , A20 , A21 , A22 ) {

	return A00 * A11 * A22 +
	       A01 * A12 * A20 +
	       A02 * A10 * A21 -
	       A20 * A11 * A02 -
	       A21 * A12 * A00 -
	       A22 * A10 * A01 ;
} ;

exports.det3 = det3 ;
