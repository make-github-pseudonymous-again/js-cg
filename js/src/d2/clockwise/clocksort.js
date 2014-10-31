



var __clocksort__ = function ( sort, sinsign, cossign ) {


	/**
	 *
	 * @param  {[type]} set [description]
	 * @param  {[type]} i   [description]
	 * @param  {[type]} j   [description]
	 * @return {[type]}     [description]
	 */

	return function ( ordering, set, i, j ) {

		// set[i] is the starting vertex
		// we will go counter clockwise around it
		// set[i] should thus be an outermost element, i.e.
		// an element such that there is a way to draw a
		// line going through set[i] such that all the other
		// vertices lie on one side of the line

		sort( ordering( sinsign, cossign, set[i] ), set, i + 1, j );

	};

};

exports.__clocksort__ = __clocksort__;
