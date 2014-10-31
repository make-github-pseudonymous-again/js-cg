
/**
 * This method is O(n), the only requirement is that the
 * set of vertices should be prealably sorted.
 *
 *
 * From Wikipedia :
 *
 * Monotone chain aka Andrew's algorithm — O(n log n)
 * Published in 1979 by A. M. Andrew. The algorithm can be seen as a variant of
 * Graham scan which sorts the points lexicographically by their coordinates.
 * When the input is already sorted, the algorithm takes O(n) time.
 *
 * -> https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain
 *
 */

var __grahamscanmono__ = function ( sinsign ) {


	/**
	 * hypothesis : set is lexicographically ordered
	 * ( in 2D : sorted according to x then y or y then x )
	 * @param  {[type]} set  [description]
	 * @param  {[type]} hull [description]
	 * @return {[type]}      [description]
	 */

	var grahamscanmono = function ( set, i, j, lo ) {

		var k, n, hi, u, p, q;

		n = set.length;
		hi = [];

		hi.push( set[i] );
		hi.push( set[i + 1] );
		lo.push( set[i] );
		lo.push( set[i + 1] );

		p = 0;
		q = 0;

		for ( k = i + 2 ; k < j ; ++k ) {

			u = set[k];

			while ( p >= 0 && sinsign( hi[p], hi[p + 1], u ) >= 0 ) {
				hi.pop();
				--p;
			}

			hi.push( u );
			++p;

			while ( q >= 0 && sinsign( lo[q], lo[q + 1], u ) <= 0 ) {
				lo.pop();
				--q;
			}

			lo.push( u );
			++q;

		}

		// enumerate hull vertices
		// counter clock wise, in fact ccw if set is monotone *increasing*,
		// cw otherwise
		//
		//                 * - < - * - < - *
		//                /                 \
		// hi[0] = lo[0] *                   * hi[p + 1] = lo[q + 1]
		//                \                 /
		//                 * - > - * - > - *
		//
		// Note that the first and last element of hi are droped since
		// they are already in lo

		for ( i = p ; i > 0 ; --i ) {
			lo.push( hi[i] );
		}

	};

	return grahamscanmono;
};

exports.__grahamscanmono__ = __grahamscanmono__;
