
var pit, ccwc, sets, hulls,
	one,
	set, hull, expected,
	k, points, p, algo,
	sort, heapsort,
	identical, genhull, colinear, array,
	clocksort, ch, chsort, sortmethod, compare,
	functools , itertools ,
	frominclusionarray , inclusionarray , hulllist ;

compare = require( "aureooms-js-compare" ) ;
random = require( "aureooms-js-random" ) ;
array = require( "aureooms-js-array" ) ;
algo = require( "aureooms-js-algo" ) ;
sort = require( "aureooms-js-sort" ) ;
functools = require( "aureooms-js-functools" ) ;
itertools = require( "aureooms-js-itertools" ) ;

heapsort = sort.__heapsort__( 2 ) ;

clocksort = cg.__clocksort__( heapsort , cg.sinsign , cg.cossign ) ;

chsort = function ( set , i , j ) {

	var k ;

	k = array.argmin( cg.leftbottom( compare.increasing ), set , i , j ) ;

	sort.swap( set , i , k ) ;

	clocksort( cg.__counterclockwise__ , set , i , j ) ;

} ;

ch = function ( set ) {
	chsort( set , 0 , set.length ) ;
	return set ;
} ;


points = require( "../../data/points.js" ) ;
p = points.data ;

colinear = cg.__colinear__( cg.sinsign );

ccwc = cg.__ccwc__( cg.sinsign );

pit = cg.__pit__( ccwc );


frominclusionarray = function ( fn ) {

	return function ( set , hull ) {

		var i , out ;

		fn( set , hull ) ;

		out = [] ;

		for ( i = 0 ; i < hull.length ; ++i ) {
			if ( hull[i] ) {
				out.push( set[i] ) ;
			}
		}

		return ch( out ) ;

	} ;

} ;

inclusionarray = function ( v ) {

	return function ( n ) {
		var hull ;
		hull = array.alloc( n ) ;
		array.fill( hull , 0 , n , v ) ;
		return hull ;
	} ;

} ;

hulllist = function ( n ) { return [ ] ; } ;


one = function ( algoname , algo , init , dataname , data , expected ) {

	test( algoname + " > " + dataname , function ( ) {
		var out , hull ;
		hull = init( data.length ) ;
		out = algo( data , hull ) ;
		deepEqual( out , expected , JSON.stringify( ) ) ;
	} ) ;

} ;


itertools.product( [

[
	[
		"chn4" ,
		frominclusionarray( cg.__chn4__( colinear, pit ) ) ,
		inclusionarray( true )
	] ,
	[
		"chn3" ,
		frominclusionarray( cg.__chn3__( cg.sinsign, cg.cossign ) ) ,
		inclusionarray( false )
	] ,
	[
		"chn2" ,
		frominclusionarray( cg.__chn2__( cg.sinsign, cg.cossign ) ) ,
		inclusionarray( true )
	] ,
	[
		"graham scan mono" ,
		function ( set , hull ) {

			var gsm ;

			set = set.slice( 0 ) ;

			gsm = cg.__grahamscanmono__( cg.sinsign ) ;

			array.sort( compare.lexicographical( compare.increasing ) , set ) ;

			gsm( set , 0 , set.length , hull ) ;

			return hull ;

		} ,
		hulllist
	]
] ,

[
	[
		"all from data/points.js" ,
		p.slice( 0 ) ,
		ch( [ p[30] , p[36] , p[42] , p[48] ] )
	]
]

] , 1 , [ ] ).forEach( functools.partial( functools.star , [ one ] ) ) ;
