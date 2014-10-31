
var __clockwise__ = function ( sinsign, cossign, u ) {

	return function ( a, b ) {

		var sin;

		sin = sinsign( u, a, b );

		if ( sin !== 0 ) {
			return sin;
		}

		return cossign( u, a, b );

	};

};

exports.__clockwise__ = __clockwise__;
