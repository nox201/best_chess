class Knight extends Piece {
	constructor(plane, colour){
		super(plane, colour);
	}
	
	name = 'Knight';
	
	draw = function(row, column, squareSize){
		//SET UTILITY VARIABLES
		let centreX = squareSize * row + (squareSize / 2);
		let centreY = squareSize * column + (squareSize / 2);
		//DRAW SQUARE
		plane.strokeStyle = 'black';
		plane.strokeRect(squareSize * row + (squareSize / 2.5), squareSize * column + (squareSize / 4), squareSize / 4, squareSize / 2);
		plane.fillStyle = this.colour;
		plane.fillRect(squareSize * row + (squareSize / 2.5), squareSize * column + (squareSize / 4), squareSize / 4, squareSize / 2);
	}
}