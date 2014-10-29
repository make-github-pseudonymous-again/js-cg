
var rightbottom = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( a[1], b[1] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( b[0], a[0] );

	};

};

exports.rightbottom = rightbottom;
