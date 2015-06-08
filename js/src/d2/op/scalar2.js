
var scalar2 = function ( a , b ) {

	var c ;

	c = vsub2( a , b ) ;

	return vdot2( c , c ) ;

} ;

exports.scalar2 = scalar2 ;
