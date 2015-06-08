
/**
 * Computes the hyperplane in `Ax = b` closest to `z` with respect to the
 * direction `r`. Complexity is O(nd).
 *
 * @param {dimension} d space dimension
 * @param {count} m the number of hyperplanes
 * @param {matrix} A an m x d matrix
 * @param {vector} b a vector of length d
 * @param {vertex} z the point to shoot from
 * @param {direction} r the direction to shoot in
 */

let rayshoot = function ( d , m , A , b , z , r ) {

	let i = 0 ;
	let j = m ;
	let w ;

	while ( true ) {

		if ( i >= j ) return j ;

		let h = A[i] ;

		w = ( b[i] - vdot( d , h , z ) ) / vdot( d , h , r ) ;

		if ( w >= 0 ) break ;

		++i ;

	}

	let k = i ;

	while ( true ) {

		++i ;

		if ( i >= j ) return k ;

		let h = A[i] ;

		let l = ( b[i] - vdot( d , h , z ) ) / vdot( d , h , r ) ;

		if ( l < 0 || l >= w ) continue ;

		k = i ;
		w = l ;

	}

} ;

exports.rayshoot = rayshoot ;
