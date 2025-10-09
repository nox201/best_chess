class Piece {
	constructor(plane, colour){
		this.plane = plane;
		this.colour = colour;
	}
	plane;
	colour;
	row;
	column;
	moveset;
	
	setRow = function(row){
		this.row = row;
	}
	setColumn = function(column){
		this.column = column;
	}
	
	//stub?
	draw = function(row, column, squareSize){

	}
	
	getValidMoves = function(){
		return [];
	};
}