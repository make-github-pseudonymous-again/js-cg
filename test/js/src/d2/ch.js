
var one , colinear , pit , ccwc ,
	heapsort , clocksort , chsort , ch ,
	frominclusionarray , inclusionarray , hulllist ,
	lexicographical , mirror , dataset ;

var compare , array , sort , functools , itertools ;

compare = require( "aureooms-js-compare" ) ;
array = require( "aureooms-js-array" ) ;
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

	array.swap( set , i , k ) ;

	clocksort( cg.__counterclockwise__ , set , i , j ) ;

} ;

ch = function ( set ) {
	chsort( set , 0 , set.length ) ;
	return set ;
} ;

dataset = function ( name ) {

	var points ;

	points = require( "../../data/" + name + ".js" ) ;

	return [
		name ,
		points.data.slice( ) ,
		points.ch.slice( )
	] ;

} ;

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

itertools.exhaust( itertools.starmap(
	one , itertools.map(
		functools.compose( [ itertools.list , itertools.chain ] ) ,
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

			array.swap( set , 0 , i ) ;

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
			array.swap( set , 0 , bottomleft ) ;

			rightbottom = array.argmin( mirror , set , 1 , n ) ;
			array.swap( set , 1 , rightbottom ) ;

			topright = array.argmax( lexicographical , set , 2 , n ) ;
			array.swap( set , 2 , topright ) ;

			lefttop = array.argmax( mirror , set , 3 , n ) ;
			array.swap( set , 3 , lefttop ) ;


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
	dataset( "rectangular-grid" ) ,
	dataset( "octagon" )
]

] , 1 )
		)
	)
) ;
