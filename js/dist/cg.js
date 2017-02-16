"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

(function () {

	'use strict';

	var definition = function definition(exports, undefined) {

		/* js/src/d2 */
		/* js/src/d2/area */
		/* js/src/d2/area/shoelace.js */

		function shoelace(edges) {

			var area = 0;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = edges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _step$value = _slicedToArray(_step.value, 2);

					var u = _step$value[0];
					var v = _step$value[1];
					area += vcross2(u, v);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return Math.abs(area) / 2;
		}

		exports.shoelace = shoelace;

		/* js/src/d2/clockwise */
		/* js/src/d2/clockwise/bottomleft.js */

		var bottomleft = function bottomleft(compare) {

			return function (a, b) {

				var d;

				d = compare(a[0], b[0]);

				if (d !== 0) {
					return d;
				}

				return compare(a[1], b[1]);
			};
		};

		exports.bottomleft = bottomleft;

		/* js/src/d2/clockwise/bottomright.js */

		var bottomright = function bottomright(compare) {

			return function (a, b) {

				var d;

				d = compare(b[0], a[0]);

				if (d !== 0) {
					return d;
				}

				return compare(a[1], b[1]);
			};
		};

		exports.bottomright = bottomright;

		/* js/src/d2/clockwise/clocksort.js */

		var __clocksort__ = function __clocksort__(sort, sinsign, cossign) {

			/**
    *
    * @param  {[type]} set [description]
    * @param  {[type]} i   [description]
    * @param  {[type]} j   [description]
    * @return {[type]}     [description]
    */

			return function (ordering, set, i, j) {

				// set[i] is the starting vertex
				// we will go counter clockwise around it
				// set[i] should thus be an outermost element, i.e.
				// an element such that there is a way to draw a
				// line going through set[i] such that all the other
				// vertices lie on one side of the line

				sort(ordering(sinsign, cossign, set[i]), set, i + 1, j);
			};
		};

		exports.__clocksort__ = __clocksort__;

		/* js/src/d2/clockwise/clockwise.js */

		var __clockwise__ = function __clockwise__(sinsign, cossign, u) {

			return function (a, b) {

				var sin;

				sin = sinsign(u, a, b);

				if (sin !== 0) {
					return sin;
				}

				return cossign(u, a, b);
			};
		};

		exports.__clockwise__ = __clockwise__;

		/* js/src/d2/clockwise/counterclockwise.js */

		var __counterclockwise__ = function __counterclockwise__(sinsign, cossign, u) {

			return function (a, b) {

				var sin;

				sin = sinsign(u, b, a);

				if (sin !== 0) {
					return sin;
				}

				return cossign(u, a, b);
			};
		};

		exports.__counterclockwise__ = __counterclockwise__;

		/* js/src/d2/clockwise/leftbottom.js */

		var leftbottom = function leftbottom(compare) {

			return function (a, b) {

				var d;

				d = compare(a[1], b[1]);

				if (d !== 0) {
					return d;
				}

				return compare(a[0], b[0]);
			};
		};

		exports.leftbottom = leftbottom;

		/* js/src/d2/clockwise/lefttop.js */

		var lefttop = function lefttop(compare) {

			return function (a, b) {

				var d;

				d = compare(b[1], a[1]);

				if (d !== 0) {
					return d;
				}

				return compare(a[0], b[0]);
			};
		};

		exports.lefttop = lefttop;

		/* js/src/d2/clockwise/rightbottom.js */

		var rightbottom = function rightbottom(compare) {

			return function (a, b) {

				var d;

				d = compare(a[1], b[1]);

				if (d !== 0) {
					return d;
				}

				return compare(b[0], a[0]);
			};
		};

		exports.rightbottom = rightbottom;

		/* js/src/d2/clockwise/righttop.js */

		var righttop = function righttop(compare) {

			return function (a, b) {

				var d;

				d = compare(b[1], a[1]);

				if (d !== 0) {
					return d;
				}

				return compare(b[0], a[0]);
			};
		};

		exports.righttop = righttop;

		/* js/src/d2/clockwise/topleft.js */

		var topleft = function topleft(compare) {

			return function (a, b) {

				var d;

				d = compare(a[0], b[0]);

				if (d !== 0) {
					return d;
				}

				return compare(b[1], a[1]);
			};
		};

		exports.topleft = topleft;

		/* js/src/d2/clockwise/topright.js */

		var topright = function topright(compare) {

			return function (a, b) {

				var d;

				d = compare(b[0], a[0]);

				if (d !== 0) {
					return d;
				}

				return compare(b[1], a[1]);
			};
		};

		exports.topright = topright;

		/* js/src/d2/dcel */
		/* js/src/d2/dcel/DCELFace.js */

		var DCELFace = function DCELFace() {

			this.edge = null;

			this.iterator = null;
			this.data = null;
		};

		DCELFace.prototype.edgecount = function () {

			var current, count;

			if (this.edge === null) {
				return 0;
			}

			current = this.edge.next;
			count = 1;

			// iterate until we cycle,
			// i.e. encounter the first edge

			while (current !== this.edge) {
				++count;
				current = current.next;
			}

			return count;
		};

		exports.DCELFace = DCELFace;

		/* js/src/d2/dcel/DCELHalfEdge.js */

		var DCELHalfEdge = function DCELHalfEdge() {

			this.origin = null;
			this.twin = null;
			this.next = null;
			this.face = null;

			this.iterator = null;
			this.data = null;
		};

		DCELHalfEdge.prototype.prev = function () {

			var current;

			current = this.twin.next.twin;

			while (current.next !== this) {
				current = current.next.twin;
			}

			return current;
		};

		exports.DCELHalfEdge = DCELHalfEdge;

		/* js/src/d2/dcel/DCELMesh.js */

		/**
   *
   * vertices, edges and faces lists MUST support the standard doubly linked list
   * interface.
   *
   */

		var DCELMesh = function DCELMesh(vertices, edges, faces) {

			this.vertices = vertices;
			this.edges = edges;
			this.faces = faces;
		};

		DCELMesh.prototype.isempty = function () {

			return this.vertices.length === 0 && this.edges.length === 0 && this.faces.length === 0;
		};

		DCELMesh.prototype.addvertex = function (vertex) {

			vertex.iterator = this.vertices.unshift(vertex);
		};

		DCELMesh.prototype.addedge = function (edge) {

			edge.iterator = this.edges.unshift(edge);
		};

		DCELMesh.prototype.addface = function (face) {

			face.iterator = this.faces.unshift(face);
		};

		DCELMesh.prototype.removevertex = function (vertex) {

			this.vertices.erase(vertex.iterator);
		};

		DCELMesh.prototype.removeedge = function (edge) {

			this.edges.erase(edge.iterator);
		};

		DCELMesh.prototype.removeface = function (face) {

			this.faces.erase(face.iterator);
		};

		exports.DCELMesh = DCELMesh;

		/* js/src/d2/dcel/DCELVertex.js */

		var DCELVertex = function DCELVertex() {

			this.leaving = null;

			this.iterator = null;
			this.data = null;
		};

		DCELVertex.prototype.edgeto = function (other) {

			var current;

			if (leaving === null) {
				return null;
			}

			if (this.leaving.twin.origin === other) {
				return this.leaving;
			}

			current = this.leaving.twin.next;

			while (current !== this.leaving) {

				if (current.twin.origin === other) {
					return current;
				}

				current = current.twin.next;
			}

			return null;
		};

		exports.DCELVertex = DCELVertex;

		/* js/src/d2/irrational */
		/* js/src/d2/irrational/cosval.js */

		/**
   * Typically this kind of computation is not allowed. Computing distances
   * between two vertices in the general case requires to compute the square root
   * of a number. We only work with rationals in our algorithms and cannot handle
   * irrationals that could appear when allowing the use of square roots.
   */

		var cosval = function cosval(a, b, c) {
			return cossign(a, b, c) / dist(a, b) / dist(b, c);
		};

		exports.cosval = cosval;

		/* js/src/d2/irrational/dist.js */

		/**
   * Typically this kind of computation is not allowed. Computing distances
   * between two vertices in the general case requires to compute the square root
   * of a number. We only work with rationals in our algorithms and cannot handle
   * irrationals that could appear when allowing the use of square roots.
   */

		var dist = function dist(a, b) {
			return Math.sqrt(scalar2(a, b));
		};

		exports.dist = dist;

		/* js/src/d2/irrational/sinval.js */

		/**
   * Typically this kind of computation is not allowed. Computing distances
   * between two vertices in the general case requires to compute the square root
   * of a number. We only work with rationals in our algorithms and cannot handle
   * irrationals that could appear when allowing the use of square roots.
   */

		var sinval = function sinval(a, b, c) {
			return sinsign(a, b, c) / dist(a, b) / dist(b, c);
		};

		exports.sinval = sinval;

		/* js/src/d2/monotonicity */
		/* js/src/d2/monotonicity/monotonic.js */

		var monotonic = function monotonic(compare, d) {

			return function (a, b) {

				return compare(a[d], b[d]);
			};
		};

		exports.monotonic = monotonic;

		/* js/src/d2/op */
		/* js/src/d2/op/det3.js */

		/**
   * Computes the determinant of the following 3 x 3 matrix.
   *
   * | A00 A01 A02 |
   * | A10 A11 A12 |
   * | A20 A21 A22 |
   *
   */

		var det3 = function det3(A00, A01, A02, A10, A11, A12, A20, A21, A22) {

			return A00 * A11 * A22 + A01 * A12 * A20 + A02 * A10 * A21 - A20 * A11 * A02 - A21 * A12 * A00 - A22 * A10 * A01;
		};

		exports.det3 = det3;

		/* js/src/d2/op/scalar2.js */

		var scalar2 = function scalar2(a, b) {

			var c;

			c = vsub2(a, b);

			return vdot2(c, c);
		};

		exports.scalar2 = scalar2;

		/* js/src/d2/op/vadd2.js */

		/**
   * Computes u + v
   */

		var vadd2 = function vadd2(u, v) {
			return [u[0] + v[0], u[1] + v[1]];
		};

		exports.vadd2 = vadd2;

		/* js/src/d2/op/vcross2.js */

		/**
   * Computes cross product u x v
   */

		var vcross2 = function vcross2(u, v) {
			return u[0] * v[1] - u[1] * v[0];
		};

		exports.vcross2 = vcross2;

		/* js/src/d2/op/vdot2.js */

		/**
   * Computes dot product u.v
   */

		var vdot2 = function vdot2(u, v) {
			return u[0] * v[0] + u[1] * v[1];
		};

		exports.vdot2 = vdot2;

		/* js/src/d2/op/vsub2.js */

		/**
   * Computes u - v
   */

		var vsub2 = function vsub2(u, v) {
			return [u[0] - v[0], u[1] - v[1]];
		};

		exports.vsub2 = vsub2;

		/* js/src/d2/pred */
		/* js/src/d2/pred/ccw.js */

		var __ccw__ = function __ccw__(sinsign) {

			/**
    * Returns true if _c_ lies to the left of segment _ab_
    * in a "right-handed" coordinate system.
    */

			var ccw = function ccw(a, b, c) {
				return sinsign(a, b, c) > 0;
			};

			return ccw;
		};

		exports.__ccw__ = __ccw__;

		/* js/src/d2/pred/ccwc.js */

		var __ccwc__ = function __ccwc__(sinsign) {

			/**
    * Returns true if _c_ lies to the left of segment _ab_
    * or if _a_ , _b_ and _c_ are colinear in a
    * "right-handed" coordinate system.
    */

			var ccwc = function ccwc(a, b, c) {
				return sinsign(a, b, c) >= 0;
			};

			return ccwc;
		};

		exports.__ccwc__ = __ccwc__;

		/* js/src/d2/pred/colinear.js */

		var __colinear__ = function __colinear__(sinsign) {

			/**
    * Returns true if _a_ , _b_ and _c_ are colinear.
    */

			var colinear = function colinear(a, b, c) {
				return sinsign(a, b, c) === 0;
			};

			return colinear;
		};

		exports.__colinear__ = __colinear__;

		/* js/src/d2/pred/convex.js */

		var __convex__ = function __convex__(ccwc) {

			var convex = function convex(a, i, j) {

				var x, y, z, k, n;

				n = j - i;

				if (n <= 2) {
					return true;
				}

				k = i;

				x = a[k];
				++k;
				y = a[k];
				++k;
				z = a[k];
				++k;

				if (n === 3) {
					return ccwc(x, y, z);
				}

				for (;;) {

					if (!ccwc(x, y, z)) {
						return false;
					}

					if (k === j) {
						k = i;
						x = a[k];

						if (!ccwc(y, z, x)) {
							return false;
						}

						++k;
						y = a[k];

						return ccwc(z, x, y);
					}

					x = a[k];
					++k;

					if (!ccwc(y, z, x)) {
						return false;
					}

					if (k === j) {
						k = i;
						y = a[k];

						if (!ccwc(z, x, y)) {
							return false;
						}

						++k;
						z = a[k];

						return ccwc(x, y, z);
					}

					y = a[k];
					++k;

					if (!ccwc(z, x, y)) {
						return false;
					}

					if (k === j) {
						k = i;
						z = a[k];

						if (!ccwc(x, y, z)) {
							return false;
						}

						++k;
						x = a[k];

						return ccwc(y, z, x);
					}

					z = a[k];
					++k;
				}
			};

			return convex;
		};

		exports.__convex__ = __convex__;

		/* js/src/d2/pred/cossign.js */

		/**
   * Computes the cosinus sign in a "right-handed"
   * coordinate system (i.e. clockwise angle values).
   * cossign(x, y, z) > 0 iff angle _xyz_ is acute.
   *
   * <p>
   *
   * http://en.wikipedia.org/wiki/Dot_product#Geometric_definition
   *
   *     A.B = ||A|| ||B|| cos t
   *     A.B = A0 B0 + A1 B1
   *     A = [y[0] - x[0], y[1] - x[1]]
   *     B = [y[0] - z[0], y[1] - z[1]]
   *     A.B = (y[0] - x[0]) * (y[0] - z[0]) + (y[1] - x[1]) * (y[1] - z[1])
   *
   *
   * # of operations
   *
   *   - 1 add
   *   - 4 sub
   *   - 2 mul
   *
   *
   * Originally implemented as
   *
   *     return y[0] * (y[0] - x[0] - z[0]) +
   *            y[1] * (y[1] - x[1] - z[1]) +
   *            z[0] * x[0] +
   *            z[1] * x[1];
   *
   * with
   *   - 3 add
   *   - 4 sub
   *   - 4 mul
   *
   */

		var cossign = function cossign(x, y, z) {
			return (y[0] - x[0]) * (y[0] - z[0]) + (y[1] - x[1]) * (y[1] - z[1]);
		};

		exports.cossign = cossign;

		/* js/src/d2/pred/cw.js */

		var __cw__ = function __cw__(sinsign) {

			/**
    * Returns true if _c_ lies to the right of segment _ab_
    * in a "right-handed" coordinate system.
    */

			var cw = function cw(a, b, c) {
				return sinsign(a, b, c) < 0;
			};

			return cw;
		};

		exports.__cw__ = __cw__;

		/* js/src/d2/pred/cwc.js */

		var __cwc__ = function __cwc__(sinsign) {

			/**
    * Returns true if _c_ lies to the right of segment _ab_
    * or if _a_ , _b_ and _c_ are colinear in a
    * "right-handed" coordinate system.
    */

			var cwc = function cwc(a, b, c) {
				return sinsign(a, b, c) <= 0;
			};

			return cwc;
		};

		exports.__cwc__ = __cwc__;

		/* js/src/d2/pred/icc.js */

		/**
   * In circum circle predicate.
   */

		var __icc__ = function __icc__(det3) {

			/**
    * Computes if _w_ lies inside the circum circle
    * of triangle _tuv_. Returns > 0 if striclty inside, = 0 if on the
    * perimeter and < 0 otherwise.
    */

			var icc = function icc(t, u, v, w) {

				var t0, t1, u0, u1, v0, v1, w0, w1, y;

				t0 = t[0];t1 = t[1];
				u0 = u[0];u1 = u[1];
				v0 = v[0];v1 = v[1];
				w0 = w[0];w1 = w[1];

				y = w0 * w0 + w1 * w1;

				return det3(t0 - w0, t1 - w1, t0 * t0 + t1 * t1 - y, u0 - w0, u1 - w1, u0 * u0 + u1 * u1 - y, v0 - w0, v1 - w1, v0 * v0 + v1 * v1 - y);
			};

			return icc;
		};

		exports.__icc__ = __icc__;

		/* js/src/d2/pred/piq.js */

		/**
   * Returns true if point is in convex quadrilateral.
   */

		var __piq__ = function __piq__(ccw) {

			var piq = function piq(x, a, b, c, d) {

				return ccw(a, b, x) && ccw(b, c, x) && ccw(c, d, x) && ccw(d, a, x);
			};

			return piq;
		};

		exports.__piq__ = __piq__;

		/* js/src/d2/pred/pit.js */

		/**
   * Returns true if point is in triangle.
   */

		var __pit__ = function __pit__(ccw) {

			var pit = function pit(x, a, b, c) {

				return ccw(a, b, x) && ccw(b, c, x) && ccw(c, a, x);
			};

			return pit;
		};

		exports.__pit__ = __pit__;

		/* js/src/d2/pred/rc.js */

		/**
   * @param {function} ris ris( p , q , u , v ) computes if ray pq intersects
   * segement uv, implementation can differ for the corner case where p is on uv.
   * Hence, one can generate two different versions of the ray casting algorithm
   * depending if one wants to compute strict or non-strict polygon point
   * containment. For strict containment ris should return 1 for p on uv and 0
   * otherwise. For non-strict containment ris should return 0 for p on uv and 1
   * otherwise.
   */

		var __rc__ = function __rc__(ris) {

			/**
    * Ray casting algorithm.
    * ==
    *
    * Counts the number of times a ray intersects a polygon. If the count is a
    * multiple of 2 then the point lies outside the polygon, inside otherwise.
    *
    * Hypothesis :
    *  - polygon is represented as an array of vertices
    *  - polygon has at least 2 vertices
    *
    * @param {array} polygon array of vertices
    * @param {integer} i index of the first vertex of the polygon
    * @param {integer} j index past the last vertex of the polygon
    * @param {point} p origin point of the ray
    * @param {point} q direction point of the ray
    *
    * see http://en.wikipedia.org/wiki/Point_in_polygon
    */

			var rc = function rc(polygon, i, j, p, q) {

				var u, v, n;

				n = 0;

				u = polygon[j - 1];
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

		/* js/src/d2/pred/sinsign.js */

		/**
   * Computes the cross product of vectors _ab_ and _ac_.
   * Can be interpreted as the sinus sign in a "right-handed"
   * coordinate system (i.e. clockwise angle values).
   * sinsign(a, b, c) > 0 iff point c 'lies to the left' of segment _ab_.
   *
   * It also computes the area of the parallelogram defined by a, b
   * and c. It can for example be used in the Quick Hull algorithm to find the
   * farthest points from the pivot line.
   *
   * <p>
   * Originally implemented as
   *
   *     a[1] * (c[0] - b[0]) + b[1] * (a[0] - c[0]) + c[1] * (b[0] - a[0])
   *
   * with
   *   - 2 add
   *   - 3 sub
   *   - 3 mul
   *
   * Reduced to
   *
   *     (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
   *
   * with
   *   - 5 sub
   *   - 2 mul
   *
   */

		var sinsign = function sinsign(a, b, c) {

			return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
		};

		exports.sinsign = sinsign;

		/* js/src/dn */
		/* js/src/dn/rayshoot.js */

		/**
   * Computes the hyperplane in `Ax = b` closest to `z` with respect to the
   * direction `r`. Complexity is O(nd).
   *
   * @param {dimension} d space dimension
   * @param {count} m the number of hyperplanes
   * @param {matrix} A an m x d matrix
   * @param {vector} b a vector of length d
   * @param {vertex} z the point to shoot from
   * @param {direction} r the direction to shoot in
   */

		var rayshoot = function rayshoot(d, m, A, b, z, r) {

			var i = 0;
			var j = m;
			var w = undefined;

			while (true) {

				if (i >= j) return j;

				var h = A[i];

				w = (b[i] - vdot(d, h, z)) / vdot(d, h, r);

				if (w >= 0) break;

				++i;
			}

			var k = i;

			while (true) {

				++i;

				if (i >= j) return k;

				var h = A[i];

				var l = (b[i] - vdot(d, h, z)) / vdot(d, h, r);

				if (l < 0 || l >= w) continue;

				k = i;
				w = l;
			}
		};

		exports.rayshoot = rayshoot;

		/* js/src/dn/vdot.js */

		/**
   * Computes dot product u.v
   */

		var vdot = function vdot(d, u, v) {

			var s = 0;

			for (var i = 0; i < d; ++i) {
				s += u[i] * v[i];
			}return s;
		};

		exports.vdot = vdot;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("@aureooms/js-cg", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["cg"] = {});
	} else console.error("unable to detect type of module to define for @aureooms/js-cg");
})();