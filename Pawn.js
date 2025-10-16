class Pawn extends Piece {
	constructor(plane, colour){
		super(plane, colour);
	}
	
	name = 'Pawn';
	
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
	
	getValidMoves = function(boardState){
		
		let validMoves = [];

		switch(this.colour){
			case 'white':
				//CAN MOVE DIRECTLY FORWARD
				if(this.isOccupied(boardState, this.row, this.column - 1, this.colour) == 'none'){
					validMoves.push({'row': this.row, 'column': this.column - 1});
				}
				//CAN TAKE FORWARD AND TO EITHER SIDE
				if(this.isOccupied(boardState, this.row - 1, this.column - 1, this.colour) == 'opponent'){
					validMoves.push({'row': this.row - 1, 'column': this.column - 1});
				}
				if(this.isOccupied(boardState, this.row + 1, this.column - 1, this.colour) == 'opponent'){
					validMoves.push({'row': this.row + 1, 'column': this.column - 1});
				}
			break;
			case 'black':
				//CAN MOVE DIRECTLY FORWARD
				if(this.isOccupied(boardState, this.row, this.column + 1, this.colour) == 'none'){
					validMoves.push({'row': this.row, 'column': this.column + 1});
				}
				//CAN TAKE FORWARD AND TO EITHER SIDE
				if(this.isOccupied(boardState, this.row - 1, this.column + 1, this.colour) == 'opponent'){
					validMoves.push({'row': this.row - 1, 'column': this.column + 1});
				}
				if(this.isOccupied(boardState, this.row + 1, this.column + 1, this.colour) == 'opponent'){
					validMoves.push({'row': this.row + 1, 'column': this.column + 1});
				}
			break;
		}
		return validMoves;
	}
}