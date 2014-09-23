

var ch_n2 = function(set){
	var discard = [];
	for(var b = 0; b < set.length; ++b){
		for(var a = 0; a < set.length; ++a){
			if(b == a) continue;
			var max = [null, null];
			var max_cos = [1, 1];
			for(var x = 0; x < set.length; ++x){
				if(x == a || x == b) continue;
				var sin = sin_sign(set[a], set[b], set[x]);
				var cos = geo.cos(set[a], set[b], set[x]);
				if(sin >= 0 && cos <= max_cos[0]){
					max[0] = set[x];
					max_cos[0] = cos;
				}
				if(sin <= 0 && cos <= max_cos[1]){
					max[1] = set[x];
					max_cos[1] = cos;
				}
			}
			if(max[0] && max[1] && sin_sign(max[0], max[1], set[b]) <= 0){
				discard[b] = true;
				break;
			}
			break;
		}
	}

	var ch = [];
	for(var x = 0; x < set.length; ++x){
		if(!discard[x]) ch.push(set[x]);
	}
	return ch;
};

exports.ch_n2 = ch_n2;
