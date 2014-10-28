

/**
 * Computes the cosinus sign in a "right-handed"
 * coordinate system (i.e. clockwise angle values).
 * cossign(x, y, z) > 0 iff angle _xyz_ is acute.
 *
 * <p>
 *
 * http://en.wikipedia.org/wiki/Dot_product#Geometric_definition
 *
 *     A.B = ||A|| ||B|| cos t
 *     A.B = A0 B0 + A1 B1
 *     A = [y[0] - x[0], y[1] - x[1]]
 *     B = [y[0] - z[0], y[1] - z[1]]
 *     A.B = (y[0] - x[0]) * (y[0] - z[0]) + (y[1] - x[1]) * (y[1] - z[1])
 *
 *
 * # of operations
 *
 *   - 1 add
 *   - 4 sub
 *   - 2 mul
 *
 *
 * Originally implemented as
 *
 *     return y[0] * (y[0] - x[0] - z[0]) +
 *            y[1] * (y[1] - x[1] - z[1]) +
 *            z[0] * x[0] +
 *            z[1] * x[1];
 *
 * with
 *   - 3 add
 *   - 4 sub
 *   - 4 mul
 *
 */

var cossign = function ( x, y, z ) {
	return ( y[0] - x[0] ) * ( y[0] - z[0] ) +
	       ( y[1] - x[1] ) * ( y[1] - z[1] );
};

exports.cossign = cossign;
