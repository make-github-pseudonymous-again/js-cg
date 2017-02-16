
var itertools = require( '@aureooms/js-itertools' ) ;

test( 'shoelace' , function ( assert ) {

	assert.equal(
		cg.shoelace(
			itertools.frame( [ [ 2 , 4 ] , [ 3 , -8 ] , [ 1 , 2 ] , [ 2 , 4 ] ] , 2 )
		) ,
		7 ,
		'triangle area'
	) ;

} ) ;
