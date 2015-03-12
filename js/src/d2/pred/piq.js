

/**
 * Returns true if point is in convex quadrilateral.
 */

var __piq__ = function ( ccw ) {

	var piq = function ( x , a , b , c , d ) {

		return ccw( a , b , x ) &&
		       ccw( b , c , x ) &&
		       ccw( c , d , x ) &&
		       ccw( d , a , x ) ;

	} ;

	return piq ;

} ;

exports.__piq__ = __piq__ ;
