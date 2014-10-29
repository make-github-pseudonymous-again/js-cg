
var leftbottom = function ( compare ) {

	return function ( a, b ) {

		var d;

		d = compare( a[1], b[1] );

		if ( d !== 0 ) {
			return d;
		}

		return compare( a[0], b[0] );

	};

};

exports.leftbottom = leftbottom;
