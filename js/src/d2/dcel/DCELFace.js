
var DCELFace = function ( ) {

	this.edge = null ;

	this.iterator = null ;
	this.data = null ;

} ;


DCELFace.prototype.edgecount = function ( ) {

	var current , count ;

	if ( this.edge === null ) {
		return 0 ;
	}

	current = this.edge.next ;
	count = 1 ;

	// iterate until we cycle,
	// i.e. encounter the first edge

	while ( current !== this.edge ) {
		++count ;
		current = current.next ;
	}

	return count ;

} ;


exports.DCELFace = DCELFace ;
