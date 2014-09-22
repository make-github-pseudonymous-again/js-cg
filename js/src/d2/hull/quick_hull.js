

var quick_hull = function(set){
	if(set.length < 4) return set.slice();

	var b0 = find_min_y(set, 0, set.length);
	set[0] = [set[b0], set[b0] = set[0]][0];
	b0 = 0;

	var b1 = find_max_y(set, 1, set.length);
	set[1] = [set[b1], set[b1] = set[1]][0];
	b1 = 1;

	var b2, b3, b2_m, b3_m, l = 2, r = e = set.length - 1;

	while(l <= r){
		var sin = sin_sign(set[b0], set[b1], set[l]);
		if(sin > 0){
			var d = dist_pl(set[l], [set[b0], set[b1]]);
			if(b2 === undefined || d > b2_m){
				b2 = l;
				b2_m = d;
			}
			++l;
		}
		else if(sin < 0){
			set[l] = [set[r], set[r] = set[l]][0];
			var d = dist_pl(set[r], [set[b0], set[b1]]);
			if(b3 === undefined || d > b3_m){
				b3 = r;
				b3_m = d;
			}
			--r;
		}
		else{
			if(b3 === e) b3 = r;
			if(l != r) set[e] = [set[r], set[r] = set[e]][0];
			set[l] = [set[e], set[e] = set[l]][0];
			--e;
			--r;
		}
	}


	var ch = [];

	ch.push(set[b0]);
	if(b2 !== undefined){
		set[b2] = [set[2], set[2] = set[b2]][0];
		b2 = 2;
		quick_hull_rec(set, 3, r, b0, b1, b2, ch);
	}

	ch.push(set[b1]);
	if(b3 !== undefined){
		set[b3] = [set[r+1], set[r+1] = set[b3]][0];
		b3 = r + 1;
		quick_hull_rec(set, r + 2, e, b1, b0, b3, ch);
	}

	return ch;
};

var quick_hull_rec = function(set, l, r, b0, b1, b2, ch){

	var b3, b4, b3_m, b4_m, e = r, f = l;

	while(l <= r){
		if(sin_sign(set[b2], set[b1], set[l]) > 0){
			var d = dist_pl(set[l], [set[b2], set[b1]]);
			if(b3 === undefined || d > b3_m){
				b3 = l;
				b3_m = d;
			}
			++l;
		}
		else if(sin_sign(set[b0], set[b2], set[l]) > 0){
			set[l] = [set[r], set[r] = set[l]][0];
			var d = dist_pl(set[r], [set[b0], set[b2]]);
			if(b4 === undefined || d > b4_m){
				b4 = r;
				b4_m = d;
			}
			--r;
		}
		else{
			if(b4 === e) b4 = r;
			if(l != r) set[e] = [set[r], set[r] = set[e]][0];
			set[l] = [set[e], set[e] = set[l]][0];
			--e;
			--r;
		}
	}


	if(b3 !== undefined){
		set[b3] = [set[f], set[f] = set[b3]][0];
		b3 = f;
		quick_hull_rec(set, f + 1, r, b2, b1, b3, ch);

	}

	ch.push(set[b2]);

	if(b4 !== undefined){
		set[b4] = [set[r+1], set[r+1] = set[b4]][0];
		b4 = r + 1;
		quick_hull_rec(set, r + 2, e, b0, b2, b4, ch);

	}
};

exports.quick_hull = quick_hull;
