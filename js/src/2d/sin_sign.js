

var sin_sign = function(a, b, c){
	return a[1] * (c[0] - b[0]) + b[1] * (a[0] - c[0]) + c[1] * (b[0] - a[0]);
};


exports.sin_sign = sin_sign;