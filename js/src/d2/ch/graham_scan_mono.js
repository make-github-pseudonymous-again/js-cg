

var graham_scan_mono = function(set){
	if(set.length < 2) return set;

	shuffle(set, 0, set.length);
	quicksort(set, 0, set.length, function(a,b){ return a.x < b.x; });

	var up = [0, 1], down = [0, 1];

	for(var i = 2; i < set.length; ++i){
		while(up.length > 1 && sin_sign(set[up[up.length-2]], set[up[up.length-1]], set[i]) <= 0){
			up.pop();
		}
		up.push(i);
		while(down.length > 1 && sin_sign(set[down[down.length-2]], set[down[down.length-1]], set[i]) >= 0){
			down.pop();
		}
		down.push(i);
	}

	var ch = [];
	for(var i = 0; i < down.length; ++i) ch.push(set[down[i]]);
	for(var i = up.length - 2; i > 0; --i) ch.push(set[up[i]]);

	return ch;

};

exports.graham_scan_mono = graham_scan_mono;
