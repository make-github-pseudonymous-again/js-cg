var algorithms, pit, ccwc, sets, hulls,
    expectedlist, one, ch,
    set, hull, expected,
    i, j, k, points, p, algo,
    randint, sample, shuffle, iota, fill,
    __partition__, __quicksort__,
    pred, partition, quicksort, sort,
    identical, genhull, colinear;

algo = require("aureooms-js-algo");
// randint = algo.randint;
// sample = algo.sample_t(randint);
// shuffle = algo.shuffle_t(sample);
// iota = algo.iota;
fill = algo.fill;
// __partition__ = algo.partition_t;
// __quicksort__ = algo.quicksort_t;

// pred = function (u, v) {
// 	return u[0] < v[0] || (u[0] === v[0] && u[1] < v[1]);
// };

// partition = __partition__(pred);
// quicksort = __quicksort__(partition);

// sort = function (set) {
// 	shuffle(set, 0, set.length);
// 	quicksort(set, 0, set.length);
// };

// identical = function (set1, set2) {
// 	var i;

// 	if (set1.length !== set2.length) {
// 		return false;
// 	}

// 	sort(set1);
// 	sort(set2);

// 	for (i = 0; i < set1.length; ++i) {
// 		if (set1[i] !== set2[i]) {
// 			return false;
// 		}
// 	}

// 	return true;
// };

genhull = function ( n ) {

	var i, j, h;

	h = new Array( n );
	fill( h, 0, n, false );
	for ( i = 1 ; i < arguments.length ; ++i ) {
		j = arguments[i];
		h[j] = true;
	}
	return h;
};

points = require( "../../dep/points.js" );
p = points.data;

colinear = cg.__colinear__( cg.sinsign );

ccwc = cg.__ccwc__( cg.sinsign );

pit = cg.__pit__( ccwc );

algorithms = [
	cg.__chn4__( colinear, pit ),
	cg.__chn3__( cg.sinsign, cg.cossign )
];

sets = [
	p.slice( 0 )
];

expectedlist = [ // one per set
	genhull( p.length, 30, 36, 42, 48 )
];

hulls = [ // one per algorithm
	function ( n ) {
		var h = new Array( n );
		fill( h, 0, n, true );
		return h;
	},
	function ( n ) {
		var h = new Array( n );
		fill( h, 0, n, false );
		return h;
	}
];

one = function ( i, j, ch, set, hull, expected ) {
	test( "ch("+i+", "+j+")", function () {
		ch( set, hull );
		deepEqual( hull, expected, JSON.stringify() );
	});
};

for (i in algorithms)
for (j in sets)
one(i, j, algorithms[i], sets[j], hulls[i](sets[j].length), expectedlist[j]);
