

/**
 * Ray casting algorithm.
 * ==
 *
 * Counts the number of time a ray intersects a polygon.
 *
 * Hypothesis :
 *  - polygon is represented as an array of vertices
 *  - polygon has at least 3 vertices
 *
 * @param {array} polygon array of vertices
 * @param {integer} i index of the first vertex of the polygon
 * @param {integer} j index of the last vertex of the polygon
 * @param {point} p first point of the ray
 * @param {point} q second point of the ray
 *
 * see http://en.wikipedia.org/wiki/Point_in_polygon
 */

var __rc__ = function (ris) {

	var rc = function (polygon, i, j, p, q) {

		var u, v, n;

		n = 0;

		u = polygon[j-1];
		v = polygon[i];
		++i;

		for (;;) {
			n += ris(p, q, u, v);
			++i;

			if (i === j) {
				return n;
			}

			u = polygon[i];

			n += ris(p, q, u, v);
			++i;

			if (i === j) {
				return n;
			}

			v = polygon[i];
		}
	};

	return rc;
};

exports.__rc__ = __rc__;
