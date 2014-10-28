
/**
 * This method is O(n), the only requirement is that the
 * set of vertices should be prealably ordered.
 */

var __grahamscanmono__ = function ( sinsign ) {


	/**
	 * hypothesis : set is monotone ( sorted according to x or y )
	 * @param  {[type]} set  [description]
	 * @param  {[type]} hull [description]
	 * @return {[type]}      [description]
	 */

	var grahamscanmono = function ( set, hull ) {

		var i, j, k, n, hi, lo;

		n = set.length;

		hi = [0, 1];
		lo = [0, 1];

		j = 0;
		k = 0;

		for ( i = 2 ; i < n ; ++i ) {

			while ( j >= 0 && sinsign( set[hi[j]], set[hi[j+1]], set[i] ) >= 0 ) {
				hi.pop();
				--j;
			}

			hi.push( i );
			++j;

			while ( k >= 0 && sinsign( set[lo[k]], set[lo[k+1]], set[i] ) <= 0 ) {
				lo.pop();
				--k;
			}

			lo.push( i );
			++k;
		}

		++j;
		++k;

		// enumerate hull vertices
		// counter clock wise, in fact ccw if set is monotone *increasing*,
		// cw otherwise
		//
		//    * - < - * - < - *
		//   /                 \
		//  *                   *
		//   \                 /
		//    * - > - * - > - *

		for ( i = 0 ; i < k ; ++i ) {
			hull[lo[i]] = true;
		}

		for ( i = j ; i > 0 ; --i ) {
			hull[hi[i]] = true;
		}

	};

	return grahamscanmono;
};

exports.grahamscanmono = grahamscanmono;
