

var __convex__ = function (ccwc) {

	var convex = function (a, i, j) {
		var x, y, z, k, n;

		n = j - i;

		if (n <= 2) {
			return true;
		}

		k = i;

		x = a[k];
		++k;
		y = a[k];
		++k;
		z = a[k];
		++k;

		if (n === 3) {
			return ccwc(x, y, z);
		}

		for (;;) {

			if (!ccwc(x, y, z)) {
				return false;
			}

			if (k === j) {
				k = i;
				x = a[k];

				if (!ccwc(y, z, x)) {
					return false;
				}

				++k;
				y = a[k];

				return ccwc(z, x, y);
			}

			x = a[k];
			++k;


			if (!ccwc(y, z, x)) {
				return false;
			}

			if (k === j) {
				k = i;
				y = a[k];

				if (!ccwc(z, x, y)) {
					return false;
				}

				++k;
				z = a[k];

				return ccwc(x, y, z);
			}

			y = a[k];
			++k;


			if (!ccwc(z, x, y)) {
				return false;
			}

			if (k === j) {
				k = i;
				z = a[k];

				if (!ccwc(x, y, z)) {
					return false;
				}

				++k;
				x = a[k];

				return ccwc(y, z, x);
			}

			z = a[k];
			++k;

		}

	};

	return convex;

};

exports.__convex__ = __convex__;
