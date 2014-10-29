
var righttop = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( b[1], a[1] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( b[0], a[0] );

	};

};

exports.righttop = righttop;
