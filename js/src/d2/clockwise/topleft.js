
var topleft = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( a[0], b[0] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( b[1], a[1] );

	};

};

exports.topleft = topleft;
