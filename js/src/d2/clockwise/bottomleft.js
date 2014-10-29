
var bottomleft = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( a[0], b[0] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( a[1], b[1] );

	};

};

exports.bottomleft = bottomleft;
