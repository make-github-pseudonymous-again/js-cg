
var bottomright = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( b[0], a[0] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( a[1], b[1] );

	};

};

exports.bottomright = bottomright;
