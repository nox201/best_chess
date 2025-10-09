class Castle extends Piece {
	constructor(plane, colour){
		super(plane, colour);
	}
	
	draw = function(row, column, squareSize){
		//SET UTILITY VARIABLES
		let centreX = squareSize * row + (squareSize / 2);
		let centreY = squareSize * column + (squareSize / 2);
		//DRAW SQUARE
		plane.strokeStyle = 'black';
		plane.strokeRect(squareSize * row + (squareSize / 4), squareSize * column + (squareSize / 4), squareSize / 2, squareSize / 2);
		plane.fillStyle = this.colour;
		plane.fillRect(squareSize * row + (squareSize / 4), squareSize * column + (squareSize / 4), squareSize / 2, squareSize / 2);
	}
	
	getValidMoves = function(){		
		let validMoves = [];
		if(this.row < 7){
			for(i = this.row + 1; i <= 7; i++){
				validMoves.push({'row': i, 'column': this.column});
			}
		}
		if(this.row > 0){
			console.log('upwards rows');
			for(i = this.row - 1; i >= 0; i--){
				validMoves.push({'row': i, 'column': this.column});
			}
		}
		if(this.column < 7){
			for(i = this.column + 1; i <= 7; i++){
				validMoves.push({'row': this.row, 'column': i});
			}
		}
		if(this.column > 0){
			for(i = this.column - 1; i >= 0; i--){
				validMoves.push({'row': this.row, 'column': i});
			}
		}
		return validMoves;
	}
}