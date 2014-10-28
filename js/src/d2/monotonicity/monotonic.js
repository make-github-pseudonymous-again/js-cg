

var monotonic = function ( compare, d ) {

	return function ( a, b ) {

		return compare( a[d], b[d] );

	};

};

exports.monotonic = monotonic;
