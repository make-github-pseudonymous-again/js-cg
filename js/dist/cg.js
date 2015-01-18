(function(exports, undefined){

	'use strict';


/* js/src/d2 */
/* js/src/d2/ch */
/* js/src/d2/ch/akltoussaint.js */

/**
 * Implement Akl–Toussaint heuristic
 * -> https://en.wikipedia.org/wiki/Convex_hull_algorithms#Akl.E2.80.93Toussaint_heuristic
 */

/* js/src/d2/ch/chan.js */

/**
 * -> https://en.wikipedia.org/wiki/Chan%27s_algorithm
 */

/* js/src/d2/ch/chdynamic.js */

/**
 * -> https://en.wikipedia.org/wiki/Dynamic_convex_hull
 */

/* js/src/d2/ch/chincremental.js */

/**
 * Incremental convex hull algorithm -- O(n log n)
 * Published in 1984 by Michael Kallay.
 */

/* js/src/d2/ch/chn2.js */


/**
 * Find the convex hull in O(n^2) by checking for every vertex b that there is
 * no triangle ( a , u , v ) that contains this point.
 *
 * Vertex a is an arbitraty vertex in the vertex set. Note that it must be
 * different from b. If b is not part of the convex hull of the vertex set then
 * there must exist a segment going from u to v of the vertex set such that we
 * can project b on this segment along direction ab. For this segment to exist
 * u and v cannot be on the same side of the line going through a and b. Thus
 * s( sin( a , b , u ) ) === - s( sin( a , b , v ) ). Also at least one of u
 * and v must be on the other side of the orthogonal to line ab, otherwise b
 * would be necessarily a vertex of the convex hull.
 *
 * Note that cossign is only required to break ties consistently in the case
 * where the data contains (3 or more)-colinear vertices.
 */

var __chn2__ = function ( sinsign , cossign ) {

	/**
	 * hypothesis : |set| >= 2
	 * @param  {set} set   array of vertices
	 * @param  {hull} hull inclusion array representation of the convex hull
	 * initialized to true
	 */

	var chn2 = function ( set , hull ) {

		var i , j , k , a , b , c , n , u , v , sin , cos ;

		n = set.length ;

		each : for ( j = 0 ; j < n ; ++j ) {

			// we need i to be different from j
			// to have a different from b
			// i is 1 if j is 0, i is 0 otherwise

			i = + ( j === 0 ) ;

			a = set[i] ;
			b = set[j] ;

			// we initiate u and v to a and
			// we will update them in a loop
			// over vertices of the vertex set
			// in the case we find a better candidate

			u = v = a ;

			// upon completion of the loop
			// we will have u and v such that
			// there is no c in the vertex set such that sin ( a , b , c ) > 0
			// lying strictly on the right of the line through bu
			// there is no c in the vertex set such that sin ( a , b , c ) < 0
			// lying strictly on the left of the line through bv

			for ( k = 1 ; k < n ; ++k ) {

				// we can always skip k = 0 since i is 0 when j is not
				// we also skip the cases where c = b or c = a

				if ( k === i || k === j ) continue ;

				c = set[k] ;

				sin = sinsign( a , b , c ) ;

				// if c is on the left of ab

				//     |
				//     |
				// c   b
				//     |
				//     a

				if ( sin > 0 ) {

					sin = sinsign( b , u , c ) ;

					// if c is on the right of bu

					// u  c|             u   |
					//   \ |               \ |
					//     b  otherwise      b
					//     |              c  |
					//     a                 a

					if ( sin < 0 ) u = c ;

				}

				// if c is on the right of ab

				//     |
				//     |
				//     b   c
				//     |
				//     a

				else if ( sin < 0 ) {

					sin = sinsign( b , v , c ) ;

					// if c is on the left of bv

					// |c  v             |   v
					// | /               | /
					// b      otherwise  b
					// |                 |  c
					// a                 a

					if ( sin > 0 ) v = c ;

				}

				// when sin = 0 then we need to check if b
				// lies on a segment from a to c

				else {

					cos = cossign( a , b , c ) ;

					// |                     |    |
					// c                     |    |
					// |                     |    |
					// b      otherwise      b or b
					// |                     c    |
					// a                     a    a
					// |                     |    c

					if ( cos < 0 ) {
						hull[j] = false ;
						continue each ;
					}

				}

			}

			// if we found candidates for both sides of line ab
			// and b is on the other side of uv relative to a
			// then b is part of the convex hull

			// u---|---v                 |   v
			//   \ | /                   b /
			//     b      otherwise      |
			//     |                   / |
			//     a                 u   a

			if ( u !== a && v !== a && sinsign( u , v , b ) <= 0 ) {
				hull[j] = false ;
			}

		}

	} ;

	return chn2 ;

} ;

exports.__chn2__ = __chn2__ ;

/* js/src/d2/ch/chn3.js */


/**
 * Find the convex hull in O(n^3) by keeping any point that
 * is not the vertex of an obtuse angle of the set of points.
 */

var __chn3__ = function ( sinsign, cossign ) {

	var chn3 = function ( set, hull ) {

		var i, j, k, a, b, c, len, sin;

		len = set.length;

		for ( i = 0 ; i < len ; ++i ) {

			a = set[i];

			loopj : for ( j = 0 ; j < len ; ++j ) {

				if ( j === i ) {
					continue;
				}

				b = set[j];

				for ( k = 0 ; k < len ; ++k ){

					if ( k === i || k === j ) {
						continue;
					}

					c = set[k];

					sin = sinsign( a, b, c );

					if ( sin < 0 || ( sin === 0 && cossign( a, b, c ) < 0 ) ) {
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

/* js/src/d2/ch/chn4.js */


/**
 * Find the convex hull in O(n^4) by removing any point lying inside
 * a triangle of the set of points.
 */

var __chn4__ = function ( colinear, pit ) {

	var chn4 = function ( set, hull ) {

		var i, j, k, a, b, c, x, len;

		len = set.length;

		for ( i = 0 ; i < len ; ++i ) {

			if ( !hull[i] ) {
				continue;
			}

			a = set[i];

			for ( j = 0 ; j < len ; ++j ) {

				if ( j === i || !hull[j] ) {
					continue;
				}

				b = set[j];

				for ( k = 0 ; k < len ; ++k ) {

					if ( k === i || k === j || !hull[k] ) {
						continue;
					}

					c = set[k];

					if ( colinear( a, b, c ) ) {
						continue;
					}

					for ( x = 0 ; x < len ; ++x ) {

						if ( x === i || x === j || x === k || !hull[x] ) {
							continue;
						}

						if ( pit( set[x], a, b, c ) ) {
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

/* js/src/d2/ch/chonline.js */


var binary_ext_sin_search = function(ch, l, r, o, p){
	var i = o;
	while(l < r){
		i = Math.floor((r - l) / 2) + l;
		var p_i = (i - 1) < 0 ? ch.length - 1: i - 1;
		var n_i = (i + 1) % ch.length;
		var cos_m = geo.cos(ch[o], p, ch[i]);
		var cos_l = geo.cos(ch[o], p, ch[p_i]);
		var cos_r = geo.cos(ch[o], p, ch[n_i]);

		if(cos_m < cos_l){
			if(cos_m < cos_r) return i;
			else if(cos_m == cos_r && dist(p, ch[i]) < dist(p, ch[n_i])) return i;
			else l = i + 1;
		}
		else if(cos_m == cos_l && cos_m < cos_r && dist(p, ch[i]) < dist(p, ch[p_i])) return i;
		else r = i;
	}

	return i;

};

var ch_online_add = function(ch, p){
	if(ch.length == 0){
		ch.push(p);
		return;
	}
	if(ch.length == 1){
		if(p.x < ch[0] || (p.x == ch[0] && p.y < ch[0].y)) ch.splice(0, 0, p);
		else ch.push(p);
		return;
	}
	if(ch.length == 2){
		if(p.x < ch[0] || (p.x == ch[0] && p.y < ch[0].y)) ch.splice(0, 0, p);
		else if(sin_sign(ch[0], ch[1], p) > 0) ch.splice(1, 0, p);
		else ch.push(p);
		return;
	}



	var l = 1, r = ch.length;
	var i = Math.floor((r - l) / 2) + l;
	var which = sin_sign(ch[0], ch[1], p) < 0 ? 1 : -1;
	while(l < r){
		if(which * sin_sign(ch[0], p, ch[i]) > 0){
			if(which * sin_sign(ch[0], p, ch[(i + 1) % ch.length]) < 0){
				++i;
				break;
			}
			else l = i + 1;
		}
		else{
			if(which * sin_sign(ch[0], p, ch[i - 1]) > 0) break;
			else r = i;
		}
		i = Math.floor((r - l) / 2) + l;
	}



	var j = binary_ext_sin_search(ch, 0, i, 0, p);
	var k = binary_ext_sin_search(ch, i, ch.length, 0, p);

	if(k == 0) k = [j, j = k][0];

	if(sin_sign(ch[j], ch[k], p) >= 0) ch.splice(j + 1, k - j - 1, p);
	else{
		ch.splice(k + 1, ch.length - k - 1, p);
		ch.splice(0, j);
	}


};

var ch_online_rm = function(set, p, ch){

};

exports.ch_online_add = ch_online_add;
exports.ch_online_rm = ch_online_rm;

/* js/src/d2/ch/grahamscan.js */

var __grahamscan__ = function ( sinsign ) {

	/**
	 * O(n)
	 * Set must be prealably clocksorted.
	 * @param {vertex set} set input set is set[i:j]
	 * @param {offset} i inner left bound of interval to work with
	 * @param {offset} j outer right bound of interval to work with
	 */
	var grahamscan = function ( set , i , j , hull ) {

		var p , k , u ;

		hull.push( set[i] ) ;
		hull.push( set[i + 1] ) ;

		p = 0 ;

		for ( k = i + 2 ; k < j ; ++k ) {

			u = set[k] ;

			while ( p >= 0 && sinsign( hull[p] , hull[p + 1] , u ) <= 0 ) {
				hull.pop( ) ;
				--p ;
			}

			hull.push( u ) ;
			++p ;

		}

	} ;

	return grahamscan ;

} ;

exports.__grahamscan__ = __grahamscan__ ;

/* js/src/d2/ch/grahamscanmono.js */

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

	var grahamscanmono = function ( set , i , j , lo ) {

		var k , n , hi , u , p , q ;

		n = set.length ;
		hi = [] ;

		hi.push( set[i] ) ;
		hi.push( set[i + 1] ) ;
		lo.push( set[i] ) ;
		lo.push( set[i + 1] ) ;

		p = 0 ;
		q = 0 ;

		for ( k = i + 2 ; k < j ; ++k ) {

			u = set[k] ;

			while ( p >= 0 && sinsign( hi[p] , hi[p + 1] , u ) >= 0 ) {
				hi.pop() ;
				--p ;
			}

			hi.push( u ) ;
			++p ;

			while ( q >= 0 && sinsign( lo[q] , lo[q + 1] , u ) <= 0 ) {
				lo.pop() ;
				--q ;
			}

			lo.push( u ) ;
			++q ;

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
		// Note that the first and last elements of hi are droped since
		// they are already in lo

		for ( i = p ; i > 0 ; --i ) {
			lo.push( hi[i] ) ;
		}

	} ;

	return grahamscanmono ;
} ;

exports.__grahamscanmono__ = __grahamscanmono__ ;

/* js/src/d2/ch/jarvismarch.js */

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

		var n , j , u , v , w , origin , sin , cos ;

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

/* js/src/d2/ch/kirkpatrickseidel.js */

/**
 * -> https://en.wikipedia.org/wiki/Kirkpatrick%E2%80%93Seidel_algorithm
 */

/* js/src/d2/ch/quickhull.js */
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

			quickhull( set , i , l , u , tmp , v , hull ) ;

		}

		hull.push( v ) ;

		if ( R !== -1 ) {

			tmp = set[R] ;
			set[R] = set[l] ;
			set[l] = tmp ;

			quickhull( set , l + 1 , j , v , tmp , u ,  hull ) ;

		}

	} ;

	return quickhull ;

} ;

exports.__quickhull__ = __quickhull__;

/* js/src/d2/clockwise */
/* js/src/d2/clockwise/bottomleft.js */

var bottomleft = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( a[0], b[0] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( a[1], b[1] );

	};

};

exports.bottomleft = bottomleft;

/* js/src/d2/clockwise/bottomright.js */

var bottomright = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( b[0], a[0] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( a[1], b[1] );

	};

};

exports.bottomright = bottomright;

/* js/src/d2/clockwise/clocksort.js */




var __clocksort__ = function ( sort, sinsign, cossign ) {


	/**
	 *
	 * @param  {[type]} set [description]
	 * @param  {[type]} i   [description]
	 * @param  {[type]} j   [description]
	 * @return {[type]}     [description]
	 */

	return function ( ordering, set, i, j ) {

		// set[i] is the starting vertex
		// we will go counter clockwise around it
		// set[i] should thus be an outermost element, i.e.
		// an element such that there is a way to draw a
		// line going through set[i] such that all the other
		// vertices lie on one side of the line

		sort( ordering( sinsign, cossign, set[i] ), set, i + 1, j );

	};

};

exports.__clocksort__ = __clocksort__;

/* js/src/d2/clockwise/clockwise.js */

var __clockwise__ = function ( sinsign, cossign, u ) {

	return function ( a, b ) {

		var sin;

		sin = sinsign( u, a, b );

		if ( sin !== 0 ) {
			return sin;
		}

		return cossign( u, a, b );

	};

};

exports.__clockwise__ = __clockwise__;

/* js/src/d2/clockwise/counterclockwise.js */

var __counterclockwise__ = function ( sinsign, cossign, u ) {

	return function ( a, b ) {

		var sin;

		sin = sinsign( u, b, a );

		if ( sin !== 0 ) {
			return sin;
		}

		return cossign( u, a, b );

	};

};

exports.__counterclockwise__ = __counterclockwise__;

/* js/src/d2/clockwise/leftbottom.js */

var leftbottom = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( a[1], b[1] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( a[0], b[0] );

	};

};

exports.leftbottom = leftbottom;

/* js/src/d2/clockwise/lefttop.js */

var lefttop = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( b[1], a[1] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( a[0], b[0] );

	};

};

exports.lefttop = lefttop;

/* js/src/d2/clockwise/rightbottom.js */

var rightbottom = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( a[1], b[1] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( b[0], a[0] );

	};

};

exports.rightbottom = rightbottom;

/* js/src/d2/clockwise/righttop.js */

var righttop = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( b[1], a[1] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( b[0], a[0] );

	};

};

exports.righttop = righttop;

/* js/src/d2/clockwise/topleft.js */

var topleft = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( a[0], b[0] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( b[1], a[1] );

	};

};

exports.topleft = topleft;

/* js/src/d2/clockwise/topright.js */

var topright = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( b[0], a[0] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( b[1], a[1] );

	};

};

exports.topright = topright;

/* js/src/d2/dcel */
/* js/src/d2/dcel/DCELFace.js */

var DCELFace = function ( ) {

	this.edge = null ;

	this.iterator = null ;
	this.data = null ;

} ;


DCELFace.prototype.edgecount = function ( ) {

	var current , count ;

	if ( this.edge === null ) {
		return 0 ;
	}

	current = this.edge.next ;
	count = 1 ;

	// iterate until we cycle,
	// i.e. encounter the first edge

	while ( current !== this.edge ) {
		++count ;
		current = current.next ;
	}

	return count ;

} ;


exports.DCELFace = DCELFace ;

/* js/src/d2/dcel/DCELHalfEdge.js */

var DCELHalfEdge = function ( ) {

	this.origin = null ;
	this.twin = null ;
	this.next = null ;
	this.face = null ;

	this.iterator = null ;
	this.data = null ;

} ;


DCELHalfEdge.prototype.prev = function ( ) {

	var current ;

	current = this.twin.next.twin ;

	while ( current.next !== this ) {
		current = current.next.twin ;
	}

	return current ;

} ;


exports.DCELHalfEdge = DCELHalfEdge ;

/* js/src/d2/dcel/DCELMesh.js */

/**
 *
 * vertices, edges and faces lists MUST support the standard doubly linked list
 * interface.
 *
 */

var DCELMesh = function ( vertices , edges , faces ) {

	this.vertices = vertices ;
	this.edges = edges ;
	this.faces = faces ;

} ;


DCELMesh.prototype.isempty = function ( ) {

	return this.vertices.length === 0 &&
	       this.edges.length === 0 &&
	       this.faces.length === 0 ;

} ;


DCELMesh.prototype.addvertex = function ( vertex ) {

	vertex.iterator = this.vertices.unshift( vertex ) ;

} ;


DCELMesh.prototype.addedge = function ( edge ) {

	edge.iterator = this.edges.unshift( edge ) ;

} ;


DCELMesh.prototype.addface = function ( face ) {

	face.iterator = this.faces.unshift( face ) ;

} ;


DCELMesh.prototype.removevertex = function ( vertex ) {

	this.vertices.erase( vertex.iterator ) ;

} ;


DCELMesh.prototype.removeedge = function ( edge ) {

	this.edges.erase( edge.iterator ) ;

} ;


DCELMesh.prototype.removeface = function ( face ) {

	this.faces.erase( face.iterator ) ;

} ;


exports.DCELMesh = DCELMesh ;

/* js/src/d2/dcel/DCELVertex.js */

var DCELVertex = function ( ) {

	this.leaving = null ;

	this.iterator = null ;
	this.data = null ;

} ;


DCELVertex.prototype.edgeto = function ( other ) {

	var current ;

	if ( leaving === null ) {
		return null ;
	}

	if ( this.leaving.twin.origin === other ) {
		return this.leaving ;
	}

	current = this.leaving.twin.next ;

	while ( current !== this.leaving ) {

		if ( current.twin.origin === other ) {
			return current ;
		}

		current = current.twin.next;

	}

	return null ;

} ;


exports.DCELVertex = DCELVertex ;

/* js/src/d2/irrational */
/* js/src/d2/irrational/cosval.js */

/**
 * Typically this kind of computation is not allowed. Computing distances
 * between two vertices in the general case requires to compute the square root
 * of a number. We only work with rationals in our algorithms and cannot handle
 * irrationals that could appear when allowing the use of square roots.
 */

var cosval = function ( a , b , c ) {
	return cossign( a , b , c ) / dist( a , b ) / dist( b , c ) ;
} ;

exports.cosval = cosval ;

/* js/src/d2/irrational/dist.js */

/**
 * Typically this kind of computation is not allowed. Computing distances
 * between two vertices in the general case requires to compute the square root
 * of a number. We only work with rationals in our algorithms and cannot handle
 * irrationals that could appear when allowing the use of square roots.
 */

var dist = function ( a , b ) {
	return Math.sqrt( scalar ( a , b ) ) ;
} ;

exports.dist = dist ;

/* js/src/d2/irrational/sinval.js */

/**
 * Typically this kind of computation is not allowed. Computing distances
 * between two vertices in the general case requires to compute the square root
 * of a number. We only work with rationals in our algorithms and cannot handle
 * irrationals that could appear when allowing the use of square roots.
 */

var sinval = function ( a , b , c ) {
	return sinsign( a , b , c ) / dist( a , b ) / dist( b , c ) ;
} ;

exports.sinval = sinval ;

/* js/src/d2/monotonicity */
/* js/src/d2/monotonicity/monotonic.js */


var monotonic = function ( compare, d ) {

	return function ( a, b ) {

		return compare( a[d], b[d] );

	};

};

exports.monotonic = monotonic;

/* js/src/d2/op */
/* js/src/d2/op/det3.js */

var det3 = function ( A ) {

	var A0, A1, A2, A00, A01, A02, A10, A11, A12, A20, A21, A22;

	A0 = A[0]; A00 = A0[0]; A01 = A0[1]; A02 = A0[2];
	A1 = A[1]; A10 = A1[0]; A11 = A1[1]; A12 = A1[2];
	A2 = A[2]; A20 = A2[0]; A21 = A2[1]; A22 = A2[2];

	return A00 * A11 * A22 +
	       A01 * A12 * A20 +
	       A02 * A10 * A21 -
	       A20 * A11 * A02 -
	       A21 * A12 * A00 -
	       A22 * A10 * A01;
};

exports.det3 = det3;

/* js/src/d2/op/scalar.js */

var scalar = function ( a , b ) {

	var c ;

	c = vsub( a , b ) ;

	return vdot( c , c ) ;

} ;

exports.scalar = scalar ;

/* js/src/d2/op/vadd.js */


/**
 * Computes u + v
 */

var vadd = function ( u, v ) {
	return [ u[0] + v[0], u[1] + v[1] ];
};

exports.vadd = vadd;

/* js/src/d2/op/vcross.js */


/**
 * Computes cross product u x v
 */

var vcross = function ( u, v ) {
	return u[0] * v[1] - u[1] * v[0];
};

exports.vcross = vcross;

/* js/src/d2/op/vdot.js */


/**
 * Computes dot product u.v
 */

var vdot = function ( u, v ) {
	return u[0] * v[0] + u[1] * v[1];
};

exports.vdot = vdot;

/* js/src/d2/op/vsub.js */


/**
 * Computes u - v
 */

var vsub = function ( u, v ) {
	return [ u[0] - v[0], u[1] - v[1] ];
};

exports.vsub = vsub;

/* js/src/d2/pred */
/* js/src/d2/pred/ccw.js */


var __ccw__ = function ( sinsign ) {

	/**
	 * Returns true if _c_ lies to the left of segment _ab_
	 * in a "right-handed" coordinate system.
	 */

	var ccw = function ( a, b, c ) {
		return sinsign( a, b, c ) > 0;
	};

	return ccw;
};

exports.__ccw__ = __ccw__;

/* js/src/d2/pred/ccwc.js */


var __ccwc__ = function ( sinsign ) {

	/**
	 * Returns true if _c_ lies to the left of segment _ab_
	 * or if _a_ , _b_ and _c_ are colinear in a
	 * "right-handed" coordinate system.
	 */

	var ccwc = function ( a, b, c ) {
		return sinsign( a, b, c ) >= 0;
	};

	return ccwc;
};

exports.__ccwc__ = __ccwc__;

/* js/src/d2/pred/colinear.js */


var __colinear__ = function ( sinsign ) {

	/**
	 * Returns true if _a_ , _b_ and _c_ are colinear.
	 */

	var colinear = function ( a, b, c ) {
		return sinsign( a, b, c ) === 0;
	};

	return colinear;
};

exports.__colinear__ = __colinear__;

/* js/src/d2/pred/convex.js */


var __convex__ = function ( ccwc ) {

	var convex = function ( a, i, j ) {

		var x, y, z, k, n;

		n = j - i;

		if ( n <= 2 ) {
			return true;
		}

		k = i;

		x = a[k];
		++k;
		y = a[k];
		++k;
		z = a[k];
		++k;

		if ( n === 3 ) {
			return ccwc( x, y, z );
		}

		for (;;) {

			if ( !ccwc( x, y, z ) ) {
				return false;
			}

			if ( k === j ) {
				k = i;
				x = a[k];

				if ( !ccwc( y, z, x ) ) {
					return false;
				}

				++k;
				y = a[k];

				return ccwc( z, x, y );
			}

			x = a[k];
			++k;


			if ( !ccwc( y, z, x ) ) {
				return false;
			}

			if ( k === j ) {
				k = i;
				y = a[k];

				if ( !ccwc( z, x, y ) ) {
					return false;
				}

				++k;
				z = a[k];

				return ccwc( x, y, z );
			}

			y = a[k];
			++k;


			if ( !ccwc( z, x, y ) ) {
				return false;
			}

			if ( k === j ) {
				k = i;
				z = a[k];

				if ( !ccwc( x, y, z ) ) {
					return false;
				}

				++k;
				x = a[k];

				return ccwc( y, z, x );
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

var cossign = function ( x , y , z ) {
	return ( y[0] - x[0] ) * ( y[0] - z[0] ) +
	       ( y[1] - x[1] ) * ( y[1] - z[1] ) ;
} ;

exports.cossign = cossign ;

/* js/src/d2/pred/cw.js */


var __cw__ = function ( sinsign ) {

	/**
	 * Returns true if _c_ lies to the right of segment _ab_
	 * in a "right-handed" coordinate system.
	 */

	var cw = function ( a, b, c ) {
		return sinsign( a, b, c ) < 0;
	};

	return cw;
};

exports.__cw__ = __cw__;

/* js/src/d2/pred/cwc.js */


var __cwc__ = function ( sinsign ) {

	/**
	 * Returns true if _c_ lies to the right of segment _ab_
	 * or if _a_ , _b_ and _c_ are colinear in a
	 * "right-handed" coordinate system.
	 */

	var cwc = function ( a, b, c ) {
		return sinsign( a, b, c ) <= 0;
	};

	return cwc;
};

exports.__cwc__ = __cwc__;

/* js/src/d2/pred/icc.js */


/**
 * In circum circle predicate
 */

var __icc__ = function ( det3 ) {

	/**
	 * Checks if _w_ lies strictly inside the circum circle
	 * of triangle _tuv_.
	 */

	var icc = function ( t, u, v, w ) {

		var t0, t1, u0, u1, v0, v1, w0, w1, y;

		t0 = t[0]; t1 = t[1];
		u0 = u[0]; u1 = u[1];
		v0 = v[0]; v1 = v[1];
		w0 = w[0]; w1 = w[1];

		y = w0 * w0 + w1 * w1;

		return det3( [
			[t0 - w0, t1 - w1, t0 * t0 + t1 * t1 - y],
			[u0 - w0, u1 - w1, u0 * u0 + u1 * u1 - y],
			[v0 - w0, v1 - w1, v0 * v0 + v1 * v1 - y]
		] ) > 0;

	};

	return icc;
};

exports.__icc__ = __icc__;

/* js/src/d2/pred/pit.js */


/**
 * Returns true if point is in triangle.
 */

var __pit__ = function ( ccw ) {

	var pit = function ( x, a, b, c ) {

		return ccw( a, b, x ) &&
		       ccw( b, c, x ) &&
		       ccw( c, a, x );

	};

	return pit;
};

exports.__pit__ = __pit__;

/* js/src/d2/pred/rc.js */


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

var __rc__ = function ( ris ) {

	var rc = function ( polygon, i, j, p, q ) {

		var u, v, n;

		n = 0;

		u = polygon[j-1];
		v = polygon[i];
		++i;

		for ( ; ; ) {
			n += ris( p, q, u, v );
			++i;

			if ( i === j ) {
				return n;
			}

			u = polygon[i];

			n += ris( p, q, u, v );
			++i;

			if ( i === j ) {
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

var sinsign = function ( a , b , c ) {

	return ( b[0] - a[0] ) * ( c[1] - a[1] ) -
	       ( b[1] - a[1] ) * ( c[0] - a[0] ) ;

} ;


exports.sinsign = sinsign ;

})(typeof exports === 'undefined' ? this['cg'] = {} : exports);
