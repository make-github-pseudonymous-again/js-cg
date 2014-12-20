
var DCELHalfEdge = function ( ) {

	this.origin = null ;
	this.twin = null ;
	this.next = null ;
	this.face = null ;

	this.iterator = null ;
	this.data = null ;

} ;


DCELHalfEdge.prototype.prev = function ( ) {

	var current ;

	current = this.twin.next.twin ;

	while ( current.next !== this ) {
		current = current.next.twin ;
	}

	return current ;

} ;


exports.DCELHalfEdge = DCELHalfEdge ;
