
var algorithms, pit, ccwc, sets, hulls,
	expectedlist, one,
	set, hull, expected,
	i, j, k, points, p, algo,
	sort, heapsort,
	identical, genhull, colinear, array,
	clocksort, ch, chsort, sortmethod, compare;

compare = require( "aureooms-js-compare" );
random = require( "aureooms-js-random" );
array = require( "aureooms-js-array" );
algo = require( "aureooms-js-algo" );
sort = require( "aureooms-js-sort" );

heapsort = sort.__heapsort__( 2 );

clocksort = cg.__clocksort__( heapsort, cg.sinsign, cg.cossign );

chsort = function ( set, i, j ) {

	var k;

	k = array.argmin( cg.leftbottom( compare.increasing ), set, i, j );

	sort.swap( set, i, k );

	clocksort( cg.__counterclockwise__, set, i, j );

};

ch = function ( set ) {
	chsort( set, 0, set.length );
	return set;
};


points = require( "../../dep/points.js" );
p = points.data;

colinear = cg.__colinear__( cg.sinsign );

ccwc = cg.__ccwc__( cg.sinsign );

pit = cg.__pit__( ccwc );


var fromboolarray = function ( fn ) {
	return function ( set, hull ) {

		var i, out;

		fn( set, hull );

		out = [];

		for ( i = 0 ; i < hull.length ; ++i ) {
			if ( hull[i] ) {
				out.push( set[i] );
			}
		}

		return ch(out);

	};
};

algorithms = [
	fromboolarray( cg.__chn4__( colinear, pit ) ),
	fromboolarray( cg.__chn3__( cg.sinsign, cg.cossign ) ),
	fromboolarray( cg.__chn2__( cg.sinsign, cg.cossign ) ),
	function ( set, hull ) {

		var gsm;

		set = set.slice( 0 );

		gsm = cg.__grahamscanmono__( cg.sinsign );

		array.sort( sort.lexicographical( compare.increasing ), set );

		gsm( set, 0, set.length, hull );

		return hull;

	}
];

sets = [
	p.slice( 0 )
];

expectedlist = [ // one per set
	ch([ p[30], p[36], p[42], p[48] ])
];

hulls = [ // one per algorithm
	function ( n ) {
		var hull;
		hull = new Array( n );
		array.fill( hull, 0, n, true );
		return hull;
	},
	function ( n ) {
		var hull;
		hull = new Array( n );
		array.fill( hull, 0, n, false );
		return hull;
	},
	function ( n ) {
		var hull;
		hull = new Array( n );
		array.fill( hull, 0, n, true );
		return hull;
	},
	function ( n ) {
		return [];
	}
];

one = function ( i, j, fn, set, hull, expected ) {
	test( "fn("+i+", "+j+")", function () {
		var out;
		out = fn( set, hull );
		deepEqual( out, expected, JSON.stringify() );
	});
};

for (i in algorithms)
for (j in sets)
one(i, j, algorithms[i], sets[j], hulls[i](sets[j].length), expectedlist[j]);
