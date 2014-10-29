
var __counterclockwise__ = function ( sinsign, u ) {

	return function ( a, b ) {

		return sinsign( u, b, a );

	};

};

exports.__counterclockwise__ = __counterclockwise__;
