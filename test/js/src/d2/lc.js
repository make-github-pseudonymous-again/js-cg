

test('lc', function (assert) {

	var sinsign = cg.sinsign;

	var __lc__ = cg.__lc__;

	var lc = __lc__(sinsign);

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

	ok( lc(p[0], p[1], p[0]), '0');
	ok(!lc(p[0], p[1], p[2]), '315');
	ok(!lc(p[0], p[1], p[3]), '270');
	ok(!lc(p[0], p[1], p[4]), '225');
	ok( lc(p[0], p[1], p[5]), '180');
	ok( lc(p[0], p[1], p[6]), '135');
	ok( lc(p[0], p[1], p[7]), '90');
	ok( lc(p[0], p[1], p[8]), '45');

});
