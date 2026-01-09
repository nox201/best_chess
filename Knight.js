class Knight extends Piece {
	constructor(colour){
		super(colour);
	}
	
	name = 'Knight';
	
	getValidMoves = function(boardState){
		
		//INIT
		let validMoves = [];
		let skip = false;
		
		//this.log();
		
		//NNE
		if(this.row < 7 && this.column > 1){
			if(this.isOccupied(boardState, this.row + 1, this.column - 2, this.colour) != 'player'){
				validMoves.push({'row': this.row + 1, 'column': this.column - 2});
			}
		}
		//ENE
		if(this.row < 6 && this.column > 0){
			if(this.isOccupied(boardState, this.row + 2, this.column - 1, this.colour) != 'player'){
				validMoves.push({'row': this.row + 2, 'column': this.column - 1});
			}
		}
		//ESE
		if(this.row < 6 && this.column < 7){
			if(this.isOccupied(boardState, this.row + 2, this.column + 1, this.colour) != 'player'){
				validMoves.push({'row': this.row + 2, 'column': this.column + 1});
			}
		}
		//SSE
		if(this.row < 7 && this.column < 6){
			if(this.isOccupied(boardState, this.row + 1, this.column + 2, this.colour) != 'player'){
				validMoves.push({'row': this.row + 1, 'column': this.column + 2});
			}
		}
		//SSW
		if(this.row > 0 && this.column < 6){
			if(this.isOccupied(boardState, this.row -1, this.column + 2, this.colour) != 'player'){
				validMoves.push({'row': this.row - 1, 'column': this.column + 2});
			}
		}
		//WSW
		if(this.row > 1 && this.column < 7){
			if(this.isOccupied(boardState, this.row - 2, this.column + 1, this.colour) != 'player'){
				validMoves.push({'row': this.row - 2, 'column': this.column + 1});
			}
		}
		//WNW
		if(this.row > 1 && this.column > 0){
			if(this.isOccupied(boardState, this.row - 2, this.column - 1, this.colour) != 'player'){
				validMoves.push({'row': this.row - 2, 'column': this.column - 1});
			}
		}
		//NNW
		if(this.row > 0 && this.column > 1){
			if(this.isOccupied(boardState, this.row - 1, this.column - 2, this.colour) != 'player'){
				validMoves.push({'row': this.row - 1, 'column': this.column - 2});
			}
		}
		
		return validMoves;
	}
}