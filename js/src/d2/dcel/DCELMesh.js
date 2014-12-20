
/**
 *
 * vertices, edges and faces lists MUST support the standard doubly linked list
 * interface.
 *
 */

var DCELMesh = function ( vertices , edges , faces ) {

	this.vertices = vertices ;
	this.edges = edges ;
	this.faces = faces ;

} ;


DCELMesh.prototype.isempty = function ( ) {

	return this.vertices.length === 0 &&
	       this.edges.length === 0 &&
	       this.faces.length === 0 ;

} ;


DCELMesh.prototype.addvertex = function ( vertex ) {

	vertex.iterator = this.vertices.unshift( vertex ) ;

} ;


DCELMesh.prototype.addedge ( edge ) {

	edge.iterator = this.edges.unshift( edge ) ;

} ;


DCELMesh.prototype.addface = function ( face ) {

	face.iterator = this.faces.unshift( face ) ;

} ;


DCELMesh.prototype.removevertex = function ( vertex ) {

	this.vertices.erase( vertex.iterator ) ;

} ;


DCELMesh.prototype.removeedge ( edge ) {

	this.edges.erase( edge.iterator ) ;

} ;


DCELMesh.prototype.removeface = function ( face ) {

	this.faces.erase( face.iterator ) ;

} ;


exports.DCELMesh = DCELMesh ;
