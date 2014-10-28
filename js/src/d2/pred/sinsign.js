

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

var sinsign = function ( a, b, c ) {
	return ( b[0] - a[0] ) * ( c[1] - a[1] ) -
	       ( b[1] - a[1] ) * ( c[0] - a[0] );
};


exports.sinsign = sinsign;
