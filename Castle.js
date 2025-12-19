class Castle extends Piece {
	constructor(plane, colour){
		super(plane, colour);
	}
	
	name = 'Castle';
	
	getValidMoves = function(boardState){
		
		//INIT
		let validMoves = [];
		let skip = false;
		
		//DONT BOTHER CHECKING IF CASTLE IS AGAINST AN EDGE
		if(this.row < 7){
			//ITERATE BOARD
			for(let i = this.row + 1; i <= 7; i++){
				//SWITCH IS OCCUPIED RESULT
				switch(this.isOccupied(boardState, i, this.column, this.colour)){
					case 'none':
						//VALID MOVE - EMPTY SPACE
						validMoves.push({'row': i, 'column': this.column});
					break;
					case 'player':
						//INVALID MOVE - PLAYERS PIECES
						skip = true;
					break;
					case 'opponent':
						//VALID MOVE - OPPONENTS PIECE
						validMoves.push({'row': i, 'column': this.column});
						//BUT DONT CONTINUE CHECKING AFTER THIS, CASTLES CANT JUMP
						skip = true;
					break;
				}
				if(skip){
					//DONT BOTHER CONTINUING SEARCHING
					break;
				} 
			}
			//RESET FLAG FOR NEXT LOOP
			skip = false;
		}
		
		if(this.row > 0){
			for(i = this.row - 1; i >= 0; i--){
				switch(this.isOccupied(boardState, i, this.column, this.colour)){
					case 'none':
						validMoves.push({'row': i, 'column': this.column});
					break;
					case 'player':
						skip = true;
					break;
					case 'opponent':
						validMoves.push({'row': i, 'column': this.column});
						skip = true;
					break;
				}
				if(skip){
					break;
				} 
			}
			skip = false;
		}
		
		if(this.column < 7){
			for(i = this.column + 1; i <= 7; i++){
				switch(this.isOccupied(boardState, this.row, i, this.colour)){
					case 'none':
						validMoves.push({'row': this.row, 'column': i});
					break;
					case 'player':
						skip = true;
					break;
					case 'opponent':
						validMoves.push({'row': this.row, 'column': i});
						skip = true;
					break;
				}
				if(skip){
					break;
				} 
			}
			skip = false;
		}
		
		if(this.column > 0){
			for(i = this.column - 1; i >= 0; i--){
				switch(this.isOccupied(boardState, this.row, i, this.colour)){
					case 'none':
						validMoves.push({'row': this.row, 'column': i});
					break;
					case 'player':
						skip = true;
					break;
					case 'opponent':
						validMoves.push({'row': this.row, 'column': i});
						skip = true;
					break;
				}
				if(skip){
					break;
				} 
			}
			skip = false;
		}
		
		return validMoves;
	}
}