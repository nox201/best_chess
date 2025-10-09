class Piece {
	constructor(plane, type, colour){
		this.plane = plane;
		this.type = type;
		this.colour = colour;
	}
	plane;
	type;
	colour;
	moveset;
	
	//stub?
	draw = function(){
		console.log('Parent Piece draw method called');
	}
}