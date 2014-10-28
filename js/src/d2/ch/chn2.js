

/**
 * Find the convex hull in O(n^2) by checking for every point b
 * that there is no triangle ( a,  maxleft, maxright ) that
 * contains this point.
 */

var __chn2__ = function ( sinsign, cosval ) {

	var chn2 = function ( set, hull ) {

		var i, j, k, a, b, c, n, maxleft, maxright, cosleft, cosright, sin, cos;

		n = set.length;

		for ( j = 0 ; j < n ; ++j ) {

			for ( i = 0 ; i < n ; ++i ) {

				if ( j === i ) {
					continue;
				}

				a = set[i];
				b = set[j];

				maxleft = null;
				maxright = null;
				cosleft = 1;
				cosright = 1;

				// k = 1

				for ( k = 0; k < n ; ++k ) {

					if ( k === i || k === j ) {
						continue;
					}

					c = set[k];

					sin = sinsign( a, b, c );
					cos = cosval( a, b, c );

					if ( sin >= 0 && cos <= cosleft ) {
						maxleft = c;
						cosleft = cos;
					}

					if ( sin <= 0 && cos <= cosright ) {
						maxright = c;
						cosright = cos;
					}

				}

				if ( maxleft !== null && maxright !== null ) {
					hull[j] = sinsign( maxleft, maxright, b ) > 0;
				}

				break;

			}
		}

	};

	return chn2;

};

exports.__chn2__ = __chn2__;
