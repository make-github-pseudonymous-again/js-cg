
var sinval = function ( a, b, c ) {
	return sinsign( a, b, c ) / dist( a, b ) / dist( b, c );
};

exports.sinval = sinval;
