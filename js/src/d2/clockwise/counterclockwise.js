
var __counterclockwise__ = function ( sinsign, cossign, u ) {

	return function ( a, b ) {

		var sin;

		sin = sinsign( u, b, a );

		if ( sin !== 0 ) {
			return sin;
		}

		return cossign( u, a, b );

	};

};

exports.__counterclockwise__ = __counterclockwise__;
