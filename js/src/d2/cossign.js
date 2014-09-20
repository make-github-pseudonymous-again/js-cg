

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
