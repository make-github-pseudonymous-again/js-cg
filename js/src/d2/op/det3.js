
var det3 = function ( A ) {

	var A0, A1, A2, A00, A01, A02, A10, A11, A12, A20, A21, A22;

	A0 = A[0]; A00 = A0[0]; A01 = A0[1]; A02 = A0[2];
	A1 = A[1]; A10 = A1[0]; A11 = A1[1]; A12 = A1[2];
	A2 = A[2]; A20 = A2[0]; A21 = A2[1]; A22 = A2[2];

	return A00 * A11 * A22 +
	       A01 * A12 * A20 +
	       A02 * A10 * A21 -
	       A20 * A11 * A02 -
	       A21 * A12 * A00 -
	       A22 * A10 * A01;
};

exports.det3 = det3;
