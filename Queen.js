class Queen extends Piece {
	constructor(plane, colour){
		super(plane, colour);
	}
	
	name = 'Queen';
	
	draw = function(row, column, squareSize){
		//SET UTILITY VARIABLES
		let centreX = squareSize * row + (squareSize / 2);
		let centreY = squareSize * column + (squareSize / 2);
		//DRAW SQUARE
		plane.beginPath();
		plane.moveTo(squareSize * row + squareSize * 0.75, squareSize * column + squareSize * 0.10);
		plane.lineTo(squareSize * row + squareSize * 0.75, squareSize * column + squareSize * 0.75);
		plane.lineTo(squareSize * row + squareSize * 0.25, squareSize * column + squareSize * 0.75);
		plane.lineTo(squareSize * row + squareSize * 0.50, squareSize * column + squareSize * 0.90);
		plane.strokeStyle = 'black';
		plane.stroke();
		plane.fillStyle = this.colour;
		plane.fill();
	}
}