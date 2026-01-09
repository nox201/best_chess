class Pawn extends Piece {
	constructor(colour){
		super(colour);
	}
	
	name = 'Pawn';
	firstMove = true;
	
	getValidMoves = function(board, x, y){
		
		this.setPosition(x, y);
		let validMoves = [];

		switch(this.colour){
			case 'white':
				if(this.firstMove){
					//CAN MOVE DIRECTLY FORWARD TWO SPACES
					if(this.isOccupied(board, this.x, this.y - 1, this.colour) == 'none'){
						validMoves.push({'x': this.x, 'y': this.y - 1});
						if(this.isOccupied(board, this.x, this.y - 2, this.colour) == 'none'){
							validMoves.push({'x': this.x, 'y': this.y - 2});
						}
					}
				}else{
					//CAN MOVE DIRECTLY FORWARD
					if(this.isOccupied(board, this.x, this.y - 1, this.colour) == 'none'){
						validMoves.push({'x': this.x, 'y': this.y - 1});
					}
				}
				//CAN TAKE FORWARD AND TO EITHER SIDE
				if(this.isOccupied(board, this.x - 1, this.y - 1, this.colour) == 'opponent'){
					validMoves.push({'x': this.x - 1, 'y': this.y - 1});
				}
				if(this.isOccupied(board, this.x + 1, this.y - 1, this.colour) == 'opponent'){
					validMoves.push({'x': this.x + 1, 'y': this.y - 1});
				}
			break;
			case 'black':
				if(this.firstMove){
					//CAN MOVE DIRECTLY FORWARD TWO SPACES
					if(this.isOccupied(board, this.x, this.y + 1, this.colour) == 'none'){
						validMoves.push({'x': this.x, 'y': this.y + 1});
						if(this.isOccupied(board, this.x, this.y + 2, this.colour) == 'none'){
							validMoves.push({'x': this.x, 'y': this.y + 2});
						}
					}
				}else{
					//CAN MOVE DIRECTLY FORWARD
					if(this.isOccupied(board, this.x, this.y + 1, this.colour) == 'none'){
						validMoves.push({'x': this.x, 'y': this.y + 1});
					}
				}
				//CAN TAKE FORWARD AND TO EITHER SIDE
				if(this.isOccupied(board, this.x - 1, this.y + 1, this.colour) == 'opponent'){
					validMoves.push({'x': this.x - 1, 'y': this.y + 1});
				}
				if(this.isOccupied(board, this.x + 1, this.y + 1, this.colour) == 'opponent'){
					validMoves.push({'x': this.x + 1, 'y': this.y + 1});
				}
			break;
		}
		return validMoves;
	}
	
	/*getValidMoves = function(boardState){
		
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
	}*/
}