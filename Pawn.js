class Pawn extends Piece {
	constructor(plane, colour){
		super(plane, colour);
	}
	
	name = 'Pawn';
	firstMove = true;
	
	draw = function(row, column, squareSize){
		//DRAW UNICODE CHARACTER
		this.plane.fillStyle = 'black';
		if(this.colour == 'white'){
			this.plane.fillText('\u{2659}', squareSize * row + (squareSize / 2), squareSize * column + squareSize);
		}else{
			this.plane.fillText('\u{265F}', squareSize * row + (squareSize / 2), squareSize * column + squareSize);
		}
	}
	
	getValidMoves = function(boardState){
		
		let validMoves = [];

		switch(this.colour){
			case 'white':
				if(this.firstMove){
					//CAN MOVE DIRECTLY FORWARD TWO SPACES
					if(this.isOccupied(boardState, this.row, this.column - 1, this.colour) == 'none'){
						validMoves.push({'row': this.row, 'column': this.column - 1});
						if(this.isOccupied(boardState, this.row, this.column - 2, this.colour) == 'none'){
							validMoves.push({'row': this.row, 'column': this.column - 2});
						}
					}
				}else{
					//CAN MOVE DIRECTLY FORWARD
					if(this.isOccupied(boardState, this.row, this.column - 1, this.colour) == 'none'){
						validMoves.push({'row': this.row, 'column': this.column - 1});
					}
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
				if(this.firstMove){
					//CAN MOVE DIRECTLY FORWARD TWO SPACES
					if(this.isOccupied(boardState, this.row, this.column + 1, this.colour) == 'none'){
						validMoves.push({'row': this.row, 'column': this.column + 1});
						if(this.isOccupied(boardState, this.row, this.column + 2, this.colour) == 'none'){
							validMoves.push({'row': this.row, 'column': this.column + 2});
						}
					}
				}else{
					//CAN MOVE DIRECTLY FORWARD
					if(this.isOccupied(boardState, this.row, this.column + 1, this.colour) == 'none'){
						validMoves.push({'row': this.row, 'column': this.column + 1});
					}
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