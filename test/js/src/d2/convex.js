
var rotate = function(a, n) {
    return a.slice(n, a.length).concat(a.slice(0, n));
};


test('convex', function (assert) {

	var sinsign = cg.sinsign;

	var __lc__ = cg.__lc__;

	var lc = __lc__(sinsign);

	var __convex__ = cg.__convex__;

	var convex = __convex__(lc);

	var p = [
		[0, 0],
		[0, 1],
		[1, 0],
		[1, 1],
		[1, 2],
		[0, 2],
		[-1, 2],
		[-1, 1],
		[-1, 0]
	];


	//                             ^
	//                             |
	//                             |
	//                             |
	//                             |
	//                             |
	//                             |
	//                          6  5  4
	//                             |
	//                          7  1  3
	//                             |
	// -------------------------8--0--2------------------------>
	//                             |
	//                             |
	//                             |
	//                             |
	//                             |
	//                             |
	//                             |
	//                             |
	//                             |
	//                             |

	var _poly = [
		[[p[8], p[2]],              true],
		[[p[2], p[8]],              true],

		[[p[8], p[2], p[4]],        true],
		[[p[8], p[6], p[4]],       false],

		[[p[8], p[2], p[4], p[6]],  true],
		[[p[8], p[2], p[4], p[1]],  true],
		[[p[8], p[2], p[4], p[5]],  true],
		[[p[8], p[2], p[4], p[0]], false],
		[[p[8], p[2], p[4], p[3]], false],

		[[p[8], p[2], p[4], p[6], p[7]],  true],
		[[p[8], p[2], p[4], p[1], p[8]],  true],
		[[p[8], p[2], p[4], p[5], p[1]], false],
		[[p[8], p[2], p[4], p[0], p[6]], false],
		[[p[8], p[2], p[4], p[3], p[5]], false],

		[[p[8], p[0], p[2], p[3], p[4], p[1]],  true],
		[[p[8], p[0], p[2], p[3], p[4], p[6]],  true],
		[[p[1], p[2], p[4], p[5], p[6], p[7]], false],
		[[p[8], p[0], p[2], p[3], p[4], p[5], p[6], p[7]],  true],
	];

	var poly = [];

	for (var i = 0; i < _poly.length; ++i) {
		var t = _poly[i];
		for (var j = 0; j < t[0].length; ++j) {
			var ro = rotate(t[0], j);
			poly.push([ro, t[1]]);

			if (t[1] && ro.length > 2) {
				var re = ro.slice(0);
				re.reverse();

				poly.push([re, !t[1]]);
			}
		}
	}

	for (var k = 0; k < poly.length; ++k) {

		var g = poly[k][0];
		var e = poly[k][1];
		var n = g.length;
		var msg = JSON.stringify(g) + ' is' + (e ? '' : ' not') + ' convex';

		deepEqual(convex(g, 0, n), e, msg);
	}

});
