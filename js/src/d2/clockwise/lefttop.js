
var lefttop = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( b[1], a[1] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( a[0], b[0] );

	};

};

exports.lefttop = lefttop;
