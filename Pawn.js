class Pawn extends Piece {
	constructor(plane, colour){
		super(plane, colour);
	}
	
	draw = function(row, column, squareSize){
		//SET UTILITY VARIABLES
		let centreX = squareSize * row + (squareSize / 2);
		let centreY = squareSize * column + (squareSize / 2);
		//DRAW CIRCLE
		this.plane.lineWidth = 3;
		this.plane.beginPath();
		this.plane.arc(centreX, centreY, (squareSize / 4), 0, Math.PI * 2);
		this.plane.strokeStyle = 'black';
		this.plane.stroke();
		this.plane.fillStyle = this.colour;
		this.plane.fill();
	}
	
	getValidMoves = function(){
		switch(this.colour){
			case 'white':
				return [{'row': this.row, 'column': this.column - 1}];
			break;
			case 'black':
				return [{'row': this.row, 'column': this.column + 1}];
			break;
		}
	}
}