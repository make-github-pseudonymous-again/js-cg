

/**
 * In circum circle predicate.
 */

var __icc__ = function ( det3 ) {

	/**
	 * Computes if _w_ lies inside the circum circle
	 * of triangle _tuv_. Returns > 0 if striclty inside, = 0 if on the
	 * perimeter and < 0 otherwise.
	 */

	var icc = function ( t , u , v , w ) {

		var t0 , t1 , u0 , u1 , v0 , v1 , w0 , w1 , y ;

		t0 = t[0] ; t1 = t[1] ;
		u0 = u[0] ; u1 = u[1] ;
		v0 = v[0] ; v1 = v[1] ;
		w0 = w[0] ; w1 = w[1] ;

		y = w0 * w0 + w1 * w1 ;

		return det3(
			t0 - w0 , t1 - w1 , t0 * t0 + t1 * t1 - y ,
			u0 - w0 , u1 - w1 , u0 * u0 + u1 * u1 - y ,
			v0 - w0 , v1 - w1 , v0 * v0 + v1 * v1 - y
		) ;

	} ;

	return icc ;

} ;

exports.__icc__ = __icc__ ;
