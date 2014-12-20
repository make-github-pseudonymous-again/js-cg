
var DCELVertex = function ( ) {

	this.leaving = null ;

	this.iterator = null ;
	this.data = null ;

} ;


DCELVertex.prototype.edgeto = function ( other ) {

	var current ;

	if ( leaving === null ) {
		return null ;
	}

	if ( this.leaving.twin.origin === other ) {
		return this.leaving ;
	}

	current = this.leaving.twin.next ;

	while ( current !== this.leaving ) {

		if ( current.twin.origin === other ) {
			return current ;
		}

		current = current.twin.next;

	}

	return null ;

} ;


exports.DCELVertex = DCELVertex ;
