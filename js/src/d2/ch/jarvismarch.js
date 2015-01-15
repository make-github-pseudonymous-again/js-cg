
/**
 * From Wikipedia :
 *
 * Gift wrapping aka Jarvis march — O(nh)
 * One of the simplest (although not the most time efficient in the worst case)
 * planar algorithms. Discovered independently by Chand & Kapur in 1970 and
 * R. A. Jarvis in 1973. It has O(nh) time complexity, where n is the number of
 * points in the set, and h is the number of points in the hull. In the worst
 * case the complexity is Θ(n^2).
 *
 * -> https://en.wikipedia.org/wiki/Gift_wrapping_algorithm
 *
 */
var __jarvismarch__ = function ( sinsign , cossign ) {

	/**
	 * The idea is to wrap the set of points. The technique is the following.
	 *
	 * You first select a vertex for which you are sure that it is part of the
	 * convex hull. For example you can choose the vertex that is first in
	 * lexicographical order over the coordinates in two dimensions, i.e. find
	 * all vertices that have the smallest x coordinate and if there is more
	 * than one then keep only the one with the smallest y coordinate.
	 *
	 * From this selected vertex you compute the next one. The next one is
	 * defined as the one that comes after in clockwise order.
	 *
	 *    |
	 *    |     In this example u is the selected vertex and v the next one.
	 *    |     v is such that there is no vertex w with sin( u , v , w ) < 0
	 *    u     i.e. lying on the right of uv because otherwise u was not
	 *     \    part of the hull in the first place.
	 *      v
	 *
	 * To solve the problem completely we simply iterate over all successive uv
	 * pairs ( we replace u with v after each iteration ). We stop when we made
	 * the complete loop around the set of vertices, i.e when the next v is the
	 * very first u.
	 *
	 *
	 * Hypotheses:
	 *   - |set| >= 2
	 *   - set[0] must be part of the hull ( if |set| = 2 this is the
	 *   only thing you have to do )
	 *
	 * @param {array} set is the input vertex set
	 * @param {array} hull is the ouput hull, we omit to add set[0] voluntarily
	 */

	var jarvismarch = function ( set , hull ) {

		var j , u , v , w , origin , sin , cos ;

		n = set.length ;

		origin = u = set[0] ;

		j = 1 ;

		while ( true ) {

			v = set[j] ;

			for ( ++j ; j < n ; ++j ) {

				w = set[j] ;

				sin = sinsign( u , v , w ) ;

				if ( sin === 0 ) {

					cos = cossign( u , v , w ) ;

					if ( cos < 0 ) v = w ;

				}

				else if ( sin < 0 ) v = w ;

			}

			if ( v === origin ) break ;

			hull.push( v );

			u = v ;
			j = 0 ;

		}

	} ;

	return jarvismarch ;

} ;

exports.__jarvismarch__ = __jarvismarch__ ;
