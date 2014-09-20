

test('cossign', function (assert) {

	var cossign = cg.cossign;

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

	ok(cossign(p[0], p[1], p[0])   > 0, '0');
	ok(cossign(p[0], p[1], p[2])   > 0, '315');
	ok(cossign(p[0], p[1], p[3]) === 0, '270');
	ok(cossign(p[0], p[1], p[4])   < 0, '225');
	ok(cossign(p[0], p[1], p[5])   < 0, '180');
	ok(cossign(p[0], p[1], p[6])   < 0, '135');
	ok(cossign(p[0], p[1], p[7]) === 0, '90');
	ok(cossign(p[0], p[1], p[8])   > 0, '45');

});
