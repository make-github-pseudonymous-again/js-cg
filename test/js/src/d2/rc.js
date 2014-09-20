

test('rc', function (assert) {

	var sinsign = cg.sinsign;

	var __rc__ = cg.__rc__;

	var rc = __rc__(sinsign);

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

	ok( rc(p[0], p[1], p[0]), '0');
	ok( rc(p[0], p[1], p[2]), '315');
	ok( rc(p[0], p[1], p[3]), '270');
	ok( rc(p[0], p[1], p[4]), '225');
	ok( rc(p[0], p[1], p[5]), '180');
	ok(!rc(p[0], p[1], p[6]), '135');
	ok(!rc(p[0], p[1], p[7]), '90');
	ok(!rc(p[0], p[1], p[8]), '45');

});
