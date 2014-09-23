

/**
 * Find the convex hull in O(n^3) by keeping any point that
 * is not the vertex of an obtuse angle of the set of points.
 */

var __chn3__ = function (sinsign, cossign) {

	var chn3 = function(set, hull){

		var i, j, k, a, b, c, len, sin;

		len = set.length;

		for (i = 0; i < len; ++i){

			a = set[i];

			loopj : for (j = 0; j < len; ++j){

				if (j === i) continue;

				b = set[j];

				for (k = 0; k < len; ++k){

					if (k === i || k === j) continue;

					c = set[k];

					sin = sinsign(a, b, c);

					if (sin < 0 || (sin === 0 && cossign(a, b, c) < 0)){
						continue loopj;
					}

				}

				hull[j] = true;
			}
		}

	};

	return chn3;

};

exports.__chn3__ = __chn3__;
