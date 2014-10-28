

/**
 * Find the convex hull in O(n^2) by checking for every point b
 * that there is no triangle ( a,  minleft, minright ) that
 * contains this point.
 */

var __chn2__ = function ( sinsign, cosval ) {

	/**
	 * hypothesis : |set| >= 2
	 * @param  {set} set   array of vertices
	 * @param  {hull} hull inclusion array representation of the convex hull
	 */

	var chn2 = function ( set, hull ) {

		var i, j, k, a, b, c, n, minleft, minright, cosleft, cosright, sin, cos;

		n = set.length;

		for ( j = 0 ; j < n ; ++j ) {

			i = + ( j === 0 );

			a = set[i];
			b = set[j];

			minleft = null;
			minright = null;
			cosleft = 1;
			cosright = 1;

			for ( k = 1 ; k < n ; ++k ) {

				if ( k === i || k === j ) {
					continue;
				}

				c = set[k];

				sin = sinsign( a, b, c );
				cos = cosval( a, b, c );

				if ( sin >= 0 && cos <= cosleft ) {
					minleft = c;
					cosleft = cos;
				}

				if ( sin <= 0 && cos <= cosright ) {
					minright = c;
					cosright = cos;
				}

			}

			if ( minleft !== null && minright !== null ) {
				hull[j] = sinsign( minleft, minright, b ) > 0;
			}

		}

	};

	return chn2;

};

exports.__chn2__ = __chn2__;
