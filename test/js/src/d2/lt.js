

test('lt', function (assert) {

	var sinsign = cg.sinsign;

	var __lt__ = cg.__lt__;

	var lt = __lt__(sinsign);

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

	ok(!lt(p[0], p[1], p[0]), '0');
	ok(!lt(p[0], p[1], p[2]), '315');
	ok(!lt(p[0], p[1], p[3]), '270');
	ok(!lt(p[0], p[1], p[4]), '225');
	ok(!lt(p[0], p[1], p[5]), '180');
	ok( lt(p[0], p[1], p[6]), '135');
	ok( lt(p[0], p[1], p[7]), '90');
	ok( lt(p[0], p[1], p[8]), '45');

});
