
var cosval = function ( a, b, c ) {
	return cossign( a, b, c ) / dist( a, b ) / dist( b, c );
};

exports.cosval = cosval;
