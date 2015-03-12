

/**
 * @param {function} ris ris( p , q , u , v ) computes if ray pq intersects
 * segement uv, implementation can differ for the corner case where p is on uv.
 * Hence, one can generate two different versions of the ray casting algorithm
 * depending if one wants to compute strict or non-strict polygon point
 * containment. For strict containment ris should return 1 for p on uv and 0
 * otherwise. For non-strict containment ris should return 0 for p on uv and 1
 * otherwise.
 */

var __rc__ = function ( ris ) {

	/**
	 * Ray casting algorithm.
	 * ==
	 *
	 * Counts the number of times a ray intersects a polygon. If the count is a
	 * multiple of 2 then the point lies outside the polygon, inside otherwise.
	 *
	 * Hypothesis :
	 *  - polygon is represented as an array of vertices
	 *  - polygon has at least 2 vertices
	 *
	 * @param {array} polygon array of vertices
	 * @param {integer} i index of the first vertex of the polygon
	 * @param {integer} j index past the last vertex of the polygon
	 * @param {point} p origin point of the ray
	 * @param {point} q direction point of the ray
	 *
	 * see http://en.wikipedia.org/wiki/Point_in_polygon
	 */

	var rc = function ( polygon , i , j , p , q ) {

		var u , v , n ;

		n = 0 ;

		u = polygon[j-1] ;
		v = polygon[i] ;

		++i ;

		for ( ; ; ) {
			n += ris( p , q , u , v ) ;
			++i ;

			if ( i === j ) {
				return n ;
			}

			u = polygon[i] ;

			n += ris( p , q , u , v ) ;
			++i ;

			if ( i === j ) {
				return n ;
			}

			v = polygon[i] ;
		}
	} ;

	return rc ;
} ;

exports.__rc__ = __rc__ ;
