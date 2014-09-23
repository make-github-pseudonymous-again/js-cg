

var binary_ext_sin_search = function(ch, l, r, o, p){
	var i = o;
	while(l < r){
		i = Math.floor((r - l) / 2) + l;
		var p_i = (i - 1) < 0 ? ch.length - 1: i - 1;
		var n_i = (i + 1) % ch.length;
		var cos_m = geo.cos(ch[o], p, ch[i]);
		var cos_l = geo.cos(ch[o], p, ch[p_i]);
		var cos_r = geo.cos(ch[o], p, ch[n_i]);

		if(cos_m < cos_l){
			if(cos_m < cos_r) return i;
			else if(cos_m == cos_r && dist(p, ch[i]) < dist(p, ch[n_i])) return i;
			else l = i + 1;
		}
		else if(cos_m == cos_l && cos_m < cos_r && dist(p, ch[i]) < dist(p, ch[p_i])) return i;
		else r = i;
	}

	return i;

};

var ch_online_add = function(ch, p){
	if(ch.length == 0){
		ch.push(p);
		return;
	}
	if(ch.length == 1){
		if(p.x < ch[0] || (p.x == ch[0] && p.y < ch[0].y)) ch.splice(0, 0, p);
		else ch.push(p);
		return;
	}
	if(ch.length == 2){
		if(p.x < ch[0] || (p.x == ch[0] && p.y < ch[0].y)) ch.splice(0, 0, p);
		else if(sin_sign(ch[0], ch[1], p) > 0) ch.splice(1, 0, p);
		else ch.push(p);
		return;
	}



	var l = 1, r = ch.length;
	var i = Math.floor((r - l) / 2) + l;
	var which = sin_sign(ch[0], ch[1], p) < 0 ? 1 : -1;
	while(l < r){
		if(which * sin_sign(ch[0], p, ch[i]) > 0){
			if(which * sin_sign(ch[0], p, ch[(i + 1) % ch.length]) < 0){
				++i;
				break;
			}
			else l = i + 1;
		}
		else{
			if(which * sin_sign(ch[0], p, ch[i - 1]) > 0) break;
			else r = i;
		}
		i = Math.floor((r - l) / 2) + l;
	}



	var j = binary_ext_sin_search(ch, 0, i, 0, p);
	var k = binary_ext_sin_search(ch, i, ch.length, 0, p);

	if(k == 0) k = [j, j = k][0];

	if(sin_sign(ch[j], ch[k], p) >= 0) ch.splice(j + 1, k - j - 1, p);
	else{
		ch.splice(k + 1, ch.length - k - 1, p);
		ch.splice(0, j);
	}


};

var ch_online_rm = function(set, p, ch){

};

exports.ch_online_add = ch_online_add;
exports.ch_online_rm = ch_online_rm;
