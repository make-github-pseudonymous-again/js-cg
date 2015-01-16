
var __grahamscan__ = function ( sinsign ) {

	/**
	 * O(n)
	 * Set must be prealably clocksorted.
	 * @param {vertex set} set input set is set[i:j]
	 * @param {offset} i inner left bound of interval to work with
	 * @param {offset} j outer right bound of interval to work with
	 */
	var grahamscan = function ( set , i , j , hull ) {

		var p , k , u ;

		hull.push( set[i] ) ;
		hull.push( set[i + 1] ) ;

		p = 0 ;

		for ( k = i + 2 ; k < j ; ++k ) {

			u = set[k] ;

			while ( p >= 0 && sinsign( hull[p] , hull[p + 1] , u ) <= 0 ) {
				hull.pop( ) ;
				--p ;
			}

			hull.push( u ) ;
			++p ;

		}

	} ;

	return grahamscan ;

} ;

exports.__grahamscan__ = __grahamscan__ ;
