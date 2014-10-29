



var __clocksort__ = function ( sort, sinsign ) {


	/**
	 * /!\
	 * SET CANNOT CONTAIN 3 OR MORE VERTICES
	 * ON THE SAME LINE
	 *
	 * @param  {[type]} set [description]
	 * @param  {[type]} i   [description]
	 * @param  {[type]} j   [description]
	 * @return {[type]}     [description]
	 */
	
	return function ( ordering, set, i, j ) {

		// set[i] is the starting vertex
		// we will go counter clockwise around it

		sort( ordering( sinsign, set[i] ), set, i + 1, j );

	};

};

exports.__clocksort__ = __clocksort__;
