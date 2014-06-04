

test('sin_sign', function (assert) {

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

	ok(cg.sin_sign(p[0], p[1], p[0]) === 0, '0');
	ok(cg.sin_sign(p[0], p[1], p[2])   < 0, '315');
	ok(cg.sin_sign(p[0], p[1], p[3])   < 0, '270');
	ok(cg.sin_sign(p[0], p[1], p[4])   < 0, '225');
	ok(cg.sin_sign(p[0], p[1], p[5]) === 0, '180');
	ok(cg.sin_sign(p[0], p[1], p[6])   > 0, '135');
	ok(cg.sin_sign(p[0], p[1], p[7])   > 0, '90');
	ok(cg.sin_sign(p[0], p[1], p[8])   > 0, '45');



});