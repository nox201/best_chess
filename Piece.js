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