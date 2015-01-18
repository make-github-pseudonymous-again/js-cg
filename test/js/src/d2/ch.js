
var pit, ccwc, sets, hulls,
	one,
	set, hull, expected,
	k, points, p, algo,
	sort, heapsort,
	identical, genhull, colinear, array,
	clocksort, ch, chsort, sortmethod, compare,
	functools , itertools ,
	frominclusionarray , inclusionarray , hulllist ,
	lexicographical , mirror ;

compare = require( "aureooms-js-compare" ) ;
random = require( "aureooms-js-random" ) ;
array = require( "aureooms-js-array" ) ;
algo = require( "aureooms-js-algo" ) ;
sort = require( "aureooms-js-sort" ) ;
functools = require( "aureooms-js-functools" ) ;
itertools = require( "aureooms-js-itertools" ) ;

heapsort = sort.__heapsort__( 2 ) ;

clocksort = cg.__clocksort__( heapsort , cg.sinsign , cg.cossign ) ;

lexicographical = cg.bottomleft( compare.increasing ) ;
mirror = cg.rightbottom( compare.increasing ) ;

chsort = function ( set , i , j ) {

	var k ;

	k = array.argmin( lexicographical , set , i , j ) ;

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

			set = set.slice( ) ;

			gsm = cg.__grahamscanmono__( cg.sinsign ) ;

			array.sort( lexicographical , set ) ;

			gsm( set , 0 , set.length , hull ) ;

			return hull ;

		} ,
		hulllist
	] ,
	[
		"jarvis march" ,
		function ( set , hull ) {

			var i , n , jm ;

			n = set.length ;

			set = set.slice( ) ;

			i = array.argmin( lexicographical , set , 0 , n ) ;

			sort.swap( set , 0 , i ) ;

			hull.push( set[0] ) ;

			jm = cg.__jarvismarch__( cg.sinsign , cg.cossign ) ;

			jm( set , hull ) ;

			return hull ;
		} ,
		hulllist
	] ,
	[
		"graham scan" ,
		function ( set , hull ) {

			var gs ;

			set = set.slice( ) ;

			chsort( set , 0 , set.length ) ;

			gs = cg.__grahamscan__( cg.sinsign ) ;

			gs( set , 0 , set.length , hull ) ;

			return hull ;

		} ,
		hulllist
	] ,
	[
		"quickhull" ,
		function ( set , hull ) {

			var qh , bottomleft , topright , lefttop , rightbottom , n , a , b , c , d ;

			n = set.length ;

			set = set.slice( ) ;

			bottomleft = array.argmin( lexicographical , set , 0 , n ) ;
			sort.swap( set , 0 , bottomleft ) ;

			rightbottom = array.argmin( mirror , set , 1 , n ) ;
			sort.swap( set , 1 , rightbottom ) ;

			topright = array.argmax( lexicographical , set , 2 , n ) ;
			sort.swap( set , 2 , topright ) ;

			lefttop = array.argmax( mirror , set , 3 , n ) ;
			sort.swap( set , 3 , lefttop ) ;


			qh = cg.__quickhull__( cg.sinsign , lexicographical ) ;

			a = set[0] ;
			b = set[1] ;
			c = set[2] ;
			d = set[3] ;

			hull.push( a ) ;
			qh( set , 4 , set.length , a , b , c , hull ) ;
			hull.push( c ) ;
			qh( set , 4 , set.length , c , d , a , hull ) ;

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
