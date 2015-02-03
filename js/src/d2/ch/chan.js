
/**
 * -> https://en.wikipedia.org/wiki/Chan%27s_algorithm
 */


var __chan__ = function ( grahamscan ) {

	var chan = function ( m , set , i , j , hull ) {

		var n , hulls , h , k ;

		// Partition the input set in groups of size at most m. For each group
		// compute the convex hull with a O(n log n) algorithm.

		for ( k = i ; k + m <= j ; k += m ) {

			h = [] ;
			grahamscan( set , k , k + m , h ) ;
			hulls.push( h ) ;

		}

		if ( k < j ) {

			h = [] ;
			grahamscan( set , k , j , h ) ;
			hulls.push( h ) ;

		}

		// TODO ...


	} ;

	return chan ;

} ;

exports.__chan__ = __chan__ ;
