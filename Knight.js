class Knight extends Piece {
	constructor(colour){
		super(colour);
	}
	
	name = 'Knight';
	
	getValidMoves = function(board, x, y){
		
		//INIT
		this.setPosition(x, y);
		let validMoves = [];
		let skip = false;
		
		//NNE
		if(this.x < 7 && this.y > 1){
			if(this.isOccupied(board, this.x + 1, this.y - 2, this.colour) != 'player'){
				validMoves.push({'x': this.x + 1, 'y': this.y - 2});
			}
		}
		//ENE
		if(this.x < 6 && this.y > 0){
			if(this.isOccupied(board, this.x + 2, this.y - 1, this.colour) != 'player'){
				validMoves.push({'x': this.x + 2, 'y': this.y - 1});
			}
		}
		//ESE
		if(this.x < 6 && this.y < 7){
			if(this.isOccupied(board, this.x + 2, this.y + 1, this.colour) != 'player'){
				validMoves.push({'x': this.x + 2, 'y': this.y + 1});
			}
		}
		//SSE
		if(this.x < 7 && this.y < 6){
			if(this.isOccupied(board, this.x + 1, this.y + 2, this.colour) != 'player'){
				validMoves.push({'x': this.x + 1, 'y': this.y + 2});
			}
		}
		//SSW
		if(this.x > 0 && this.y < 6){
			if(this.isOccupied(board, this.x -1, this.y + 2, this.colour) != 'player'){
				validMoves.push({'x': this.x - 1, 'y': this.y + 2});
			}
		}
		//WSW
		if(this.x > 1 && this.y < 7){
			if(this.isOccupied(board, this.x - 2, this.y + 1, this.colour) != 'player'){
				validMoves.push({'x': this.x - 2, 'y': this.y + 1});
			}
		}
		//WNW
		if(this.x > 1 && this.y > 0){
			if(this.isOccupied(board, this.x - 2, this.y - 1, this.colour) != 'player'){
				validMoves.push({'x': this.x - 2, 'y': this.y - 1});
			}
		}
		//NNW
		if(this.x > 0 && this.y > 1){
			if(this.isOccupied(board, this.x - 1, this.y - 2, this.colour) != 'player'){
				validMoves.push({'x': this.x - 1, 'y': this.y - 2});
			}
		}
		
		return validMoves;
	}
}