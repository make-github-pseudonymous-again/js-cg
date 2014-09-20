

test('sinsign', function (assert) {

	var sinsign = cg.sinsign;

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

	ok(sinsign(p[0], p[1], p[0]) === 0, '0');
	ok(sinsign(p[0], p[1], p[2])   < 0, '315');
	ok(sinsign(p[0], p[1], p[3])   < 0, '270');
	ok(sinsign(p[0], p[1], p[4])   < 0, '225');
	ok(sinsign(p[0], p[1], p[5]) === 0, '180');
	ok(sinsign(p[0], p[1], p[6])   > 0, '135');
	ok(sinsign(p[0], p[1], p[7])   > 0, '90');
	ok(sinsign(p[0], p[1], p[8])   > 0, '45');

});
