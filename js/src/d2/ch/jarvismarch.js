
/**
 * From Wikipedia :
 *
 * Gift wrapping aka Jarvis march — O(nh)
 * One of the simplest (although not the most time efficient in the worst case)
 * planar algorithms. Discovered independently by Chand & Kapur in 1970 and
 * R. A. Jarvis in 1973. It has O(nh) time complexity, where n is the number of
 * points in the set, and h is the number of points in the hull. In the worst
 * case the complexity is Θ(n^2).
 *
 * -> https://en.wikipedia.org/wiki/Gift_wrapping_algorithm
 *
 */

var jarvismarch = function(set){
	if(set.length < 2) return set.slice();

	var c = 0;
	for(var i = 1; i < set.length; ++i){
		if(set[i].x < set[c].x || (set[i].x == set[c].x && set[i].y < set[c].y)) c = i;
	}

	if(set.length < 3) return [set[c], set[c?0:1]];

	var p = c;
	var tmp = new Point(set[p].x, set[p].y - 1);

	c = 0;
	var i = p?0:1;
	var cos = geo.cos(tmp, set[p], set[i]);
	var d = dist(set[p], set[i]);
	for(++i; i < set.length; ++i){
		if(p == i) continue;
		var cos_i = geo.cos(tmp, set[p], set[i]);
		var d_i = dist(set[p], set[i]);
		if(cos_i < cos || (cos_i == cos && d_i > d)){
			c = i;
			cos = cos_i;
			d = d_i;
		}
	}


	var ch = [set[p]];
	var ch_0 = p;
	var f = -1;
	while(ch_0 != f){
		ch.push(set[c]);
		f = 0;
		var i = 0;
		for(; i < set.length; ++i){
			if(p == i || c == i) continue;
			f = i;
			cos = geo.cos(set[p], set[c], set[i]);
			d = dist(set[c], set[i]);
			++i;
			break;
		}
		for(; i < set.length; ++i){
			if(p == i || c == i) continue;
			var cos_i = geo.cos(set[p], set[c], set[i]);
			var d_i = dist(set[c], set[i]);
			if(cos_i < cos || (cos_i == cos && d_i > d)){
				f = i;
				cos = cos_i;
				d = d_i;
			}
		}

		p = c;
		c = f;
	}

	return ch;

};

exports.jarvismarch = jarvismarch;
