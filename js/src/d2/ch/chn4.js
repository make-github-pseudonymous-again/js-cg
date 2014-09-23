

/**
 * Find the convex hull in O(n^4) by removing any point lying inside
 * a triangle of the set of points.
 */

var __chn4__ = function (colinear, pit) {


	var chn4 = function (set, hull) {

		var i, j, k, a, b, c, x, len;

		len = set.length;

		for (i = 0; i < len; ++i) {

			if (!hull[i]) continue;

			a = set[i];

			for (j = 0; j < len; ++j) {

				if (j === i || !hull[j]) continue;

				b = set[j];

				for (k = 0; k < len; ++k) {

					if (k === i || k === j || !hull[k]) continue;

					c = set[k];

					if (colinear(a, b, c)) continue;

					for (x = 0; x < len; ++x) {
						if(x === i || x === j || x === k || !hull[x]) continue;

						if (pit(set[x], a, b, c)) {
							hull[x] = false;
						}
					}
				}
			}
		}
	};

	return chn4;

};

exports.__chn4__ = __chn4__;
