

/**
 * Computes cross product u x v
 */

var vcross2 = function ( u, v ) {
	return u[0] * v[1] - u[1] * v[0];
};

exports.vcross2 = vcross2;
