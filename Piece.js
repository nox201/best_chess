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
	name = 'Generic Piece';
	
	setRow = function(row){
		this.row = row;
	}
	setColumn = function(column){
		this.column = column;
	}
	
	getName = function(){
		return this.name;
	}
	
	//GENERIC LOGGING FUNCTION
	log = function(){
		console.log(this.colour + ' ' + this.name + ' at Row: ' + this.row + ', Column: ' + this.column);
	}
	
	
	draw = function(row, column, squareSize){

	}
	
	getValidMoves = function(boardState){
		return [];
	};
	
	//should this function live elsewhere?
	isOccupied(boardState, row, column, colour){
		let occupied = 'none';
		//console.log(boardState);
		for(let i = 0; i < boardState.length; i++){
			if(boardState[i].row == row && boardState[i].column == column){
				if(boardState[i].colour == colour){
					occupied = 'player';
				}else{
					occupied = 'opponent';
				}
			}
		}
		return occupied;
	}
}