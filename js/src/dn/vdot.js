

/**
 * Computes dot product u.v
 */

let vdot = function ( d , u , v ) {

	let s = 0 ;

	for ( let i = 0 ; i < d ; ++i ) s += u[i] * v[i] ;

	return s ;

} ;

exports.vdot = vdot ;
