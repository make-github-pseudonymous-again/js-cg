

/**
 * Find the convex hull in O(n^2) by checking for every vertex b that there is
 * no triangle ( a , u , v ) that contains this point.
 *
 * Vertex a is an arbitraty vertex in the vertex set. Note that it must be
 * different from b. If b is not part of the convex hull of the vertex set then
 * there must exist a segment going from u to v of the vertex set such that we
 * can project b on this segment along direction ab. For this segment to exist
 * u and v cannot be on the same side of the line going through a and b. Thus
 * s( sin( a , b , u ) ) === - s( sin( a , b , v ) ). Also at least one of u
 * and v must be on the other side of the orthogonal to line ab, otherwise b
 * would be necessarily a vertex of the convex hull.
 *
 * Note that cossign is only required to break ties consistently in the case
 * where the data contains (3 or more)-colinear vertices.
 */

var __chn2__ = function ( sinsign , cossign ) {

	/**
	 * hypothesis : |set| >= 2
	 * @param  {set} set   array of vertices
	 * @param  {hull} hull inclusion array representation of the convex hull
	 * initialized to true
	 */

	var chn2 = function ( set , hull ) {

		var i , j , k , a , b , c , n , u , v , sin , cos ;

		n = set.length ;

		each : for ( j = 0 ; j < n ; ++j ) {

			// we need i to be different from j
			// to have a different from b
			// i is 1 if j is 0, i is 0 otherwise

			i = + ( j === 0 ) ;

			a = set[i] ;
			b = set[j] ;

			// we initiate u and v to a and
			// we will update them in a loop
			// over vertices of the vertex set
			// in the case we find a better candidate

			u = v = a ;

			// upon completion of the loop
			// we will have u and v such that
			// there is no c in the vertex set such that sin ( a , b , c ) > 0
			// lying strictly on the right of the line through bu
			// there is no c in the vertex set such that sin ( a , b , c ) < 0
			// lying strictly on the left of the line through bv

			for ( k = 1 ; k < n ; ++k ) {

				// we can always skip k = 0 since i is 0 when j is not
				// we also skip the cases where c = b or c = a

				if ( k === i || k === j ) continue ;

				c = set[k] ;

				sin = sinsign( a , b , c ) ;

				// if c is on the left of ab

				//     |
				//     |
				// c   b
				//     |
				//     a

				if ( sin > 0 ) {

					sin = sinsign( b , u , c ) ;

					// if c is on the right of bu

					// u  c|             u   |
					//   \ |               \ |
					//     b  otherwise      b
					//     |              c  |
					//     a                 a

					if ( sin < 0 ) u = c ;

				}

				// if c is on the right of ab

				//     |
				//     |
				//     b   c
				//     |
				//     a

				else if ( sin < 0 ) {

					sin = sinsign( b , v , c ) ;

					// if c is on the left of bv

					// |c  v             |   v
					// | /               | /
					// b      otherwise  b
					// |                 |  c
					// a                 a

					if ( sin > 0 ) v = c ;

				}

				// when sin = 0 then we need to check if b
				// lies on a segment from a to c

				else {

					cos = cossign( a , b , c ) ;

					// |                     |    |
					// c                     |    |
					// |                     |    |
					// b      otherwise      b or b
					// |                     c    |
					// a                     a    a
					// |                     |    c

					if ( cos < 0 ) {
						hull[j] = false ;
						continue each ;
					}

				}

			}

			// if we found candidates for both sides of line ab
			// and b is on the other side of uv relative to a
			// then b is part of the convex hull

			// u---|---v                 |   v
			//   \ | /                   b /
			//     b      otherwise      |
			//     |                   / |
			//     a                 u   a

			if ( u !== a && v !== a && sinsign( u , v , b ) <= 0 ) {
				hull[j] = false ;
			}

		}

	} ;

	return chn2 ;

} ;

exports.__chn2__ = __chn2__ ;
