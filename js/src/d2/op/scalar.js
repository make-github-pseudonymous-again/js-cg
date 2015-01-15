
var scalar = function ( a , b ) {

	var c ;

	c = vsub( a , b ) ;

	return vdot( c , c ) ;

} ;

exports.scalar = scalar ;
