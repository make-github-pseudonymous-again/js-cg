

var graham_sort = function(set){

	var c = 0;
	for(var i = 1; i < set.length; ++i){
		if(set[i].x < set[c].x || (set[i].x == set[c].x && set[i].y < set[c].y)) c = i;
	}

	set[0] = [set[c], set[c] = set[0]][0];

	var p = 0;
	var tmp = new Point(set[p].x, set[p].y - 1);

	shuffle(set, 1, set.length);
	quicksort(set, 1, set.length, function(a,b){
		var cos_a = geo.cos(tmp, set[p], a);
		var cos_b = geo.cos(tmp, set[p], b);
		return cos_a < cos_b || (cos_a == cos_b && dist(set[p], a) > dist(set[p], b));
	});

};


var graham_scan = function(set){
	if(set.length < 2) return set;

	graham_sort(set);

	var stack = [0, 1];

	for(var i = 2; i < set.length; ++i){
		while(sin_sign(set[stack[stack.length-2]], set[stack[stack.length-1]], set[i]) > 0){
			stack.pop();
		}
		stack.push(i);
	}

	var ch = [];
	for(var i = 0; i < stack.length; ++i) ch.push(set[stack[i]]);

	return ch;

};

exports.graham_sort = graham_sort;
exports.graham_scan = graham_scan;
