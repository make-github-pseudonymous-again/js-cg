/**
 * From Wikipedia :
 *
 * QuickHull
 * Discovered independently in 1977 by W. Eddy and in 1978 by A. Bykat.
 * Just like the quicksort algorithm, it has the expected time complexity
 * of O(n log n), but may degenerate to Θ(nh) = O(n²) in the worst case.
 *
 * -> https://en.wikipedia.org/wiki/QuickHull
 *
 */
var __quickhull__ = function ( sinsign , compare ) {

	var quickhull = function ( set , i , j , u , v , w , hull ) {

		var c , sin , minL , minR , L , R , tmp , l , r , e , x ;

		l = i - 1 ;
		r = j - 1 ;
		e = r ;

		minL = minR = 0 ;
		L = R = -1 ;

		// Triangle ( u , v , w ) partioning

		while ( l <= r ) {

			x = set[l] ;

			sin = sinsign( u , v , x ) ;

			if ( sin < 0 ) {

				// Note that if we allow (3 or more)-colinear vertices then we
				// have to make sure that we take only extreme points of these
				// as pivot. The only way this kind of scenario can occur is
				// when uv (vw) is parallel to these colinear points. Note that
				// we only need to compare the points lexicographically to
				// ensure we take only extreme points. Note also that if sin <
				// 0 and thus if sin === minL (minR) then L !== -1.
				//
				//     v
				//     |  \
				//     | .  x
				//     |    |
				//     |  . y <-- y should never be used as pivot
				//     |..  |
				//     |    z
				//     | ./
				//     u
				//
				//

				if ( sin < minL || ( sin === minL && compare( x , set[L] ) < 0 ) ) {
					L = l ;
					minL = sin ;
				}

				++l ;
				continue ;

			}

			sin = sinsign( v , w , x ) ;

			if ( sin < 0 ) {

				tmp = set[l] ;
				set[l] = set[r] ;
				set[r] = tmp ;

				// Same remark as above.

				if ( sin < minR || ( sin === minR && compare( x , set[R] ) < 0 ) ) {
					R = r;
					minR = sin ;
				}

				--r ;
				continue ;

			}

			// since all poins are above uw
			// all other points are inside triangle uvw

			// don't forget to update R
			// in case we move it to r
			if ( R === e ) R = r ;

			if ( l !== r ) {
				tmp = set[e] ;
				set[e] = set[r] ;
				set[r] = tmp ;
			}

			tmp = set[l] ;
			set[l] = set[e] ;
			set[e] = tmp ;

			--e ;
			--r ;

		}

		if ( L !== -1 ) {

			tmp = set[L] ;
			set[L] = set[i] ;
			set[i] = tmp ;

			quickhull( set , i , split, u , tmp , v , hull ) ;

		}

		hull.push( v ) ;

		if ( R !== -1 ) {

			tmp = set[R] ;
			set[R] = set[split] ;
			set[split] = tmp ;

			quickhull( set , split + 1 , j , v , tmp , u ,  hull ) ;

		}

	} ;

	return quickhull ;

} ;

exports.__quickhull__ = __quickhull__;
