

test('ccw', function (assert) {

	var sinsign = cg.sinsign;

	var __ccw__ = cg.__ccw__;

	var ccw = __ccw__(sinsign);

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

	ok(!ccw(p[0], p[1], p[0]), '0');
	ok(!ccw(p[0], p[1], p[2]), '315');
	ok(!ccw(p[0], p[1], p[3]), '270');
	ok(!ccw(p[0], p[1], p[4]), '225');
	ok(!ccw(p[0], p[1], p[5]), '180');
	ok( ccw(p[0], p[1], p[6]), '135');
	ok( ccw(p[0], p[1], p[7]), '90');
	ok( ccw(p[0], p[1], p[8]), '45');

});
