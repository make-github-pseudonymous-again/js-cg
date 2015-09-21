
function shoelace ( edges ) {

	let area = 0 ;

	for ( const [ u , v ] of edges ) area += vcross2( u , v ) ;

	return Math.abs( area ) / 2 ;

}

exports.shoelace = shoelace ;
