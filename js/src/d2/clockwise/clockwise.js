
var __clockwise__ = function ( sinsign, u ) {

	return function ( a, b ) {

		return sinsign( u, a, b );

	};

};

exports.__clockwise__ = __clockwise__;
