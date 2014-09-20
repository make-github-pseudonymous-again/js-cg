

test('colinear', function (assert) {

	var sinsign = cg.sinsign;

	var __colinear__ = cg.__colinear__;

	var colinear = __colinear__(sinsign);

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

	ok( colinear(p[0], p[1], p[0]), '0');
	ok(!colinear(p[0], p[1], p[2]), '315');
	ok(!colinear(p[0], p[1], p[3]), '270');
	ok(!colinear(p[0], p[1], p[4]), '225');
	ok( colinear(p[0], p[1], p[5]), '180');
	ok(!colinear(p[0], p[1], p[6]), '135');
	ok(!colinear(p[0], p[1], p[7]), '90');
	ok(!colinear(p[0], p[1], p[8]), '45');

});
