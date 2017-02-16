
var itertools = require( "@aureooms/js-itertools" ) ;

var all = function ( name ) {

	var data = require( "../../data/rayshoot/" + name + ".js" ) ;

	test( "rayshooting : " + name , function ( ) {

		var k = cg.rayshoot( data.d , data.m , data.A , data.b , data.z , data.r ) ;

		deepEqual( k , data.solution , "check solution" ) ;

	} ) ;

} ;


itertools.exhaust( itertools.map( all , [
	"parallel-lines-2-0-0-1-1" ,
	"parallel-lines-2-0-999999-1-1" ,
	"parallel-lines-2-0-1000000-1-1" ,
	"parallel-lines-3-0-0-1-1" ,
	"parallel-lines-3-0-999999-1-1" ,
	"parallel-lines-3-0-1000000-1-1"
] ) ) ;
