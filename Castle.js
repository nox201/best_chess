class Castle extends Piece {
	
	//CONSTRUCTOR
	constructor(colour){
		super(colour);
	}
	
	//PROPERTIES
	name = 'Castle';
	
	getValidMoves = function(board, x, y){
		
		//INIT
		this.setPosition(x, y);
		let validMoves = [];
		let skip = false;
		
		//DONT BOTHER CHECKING IF CASTLE IS AGAINST AN EDGE
		if(this.x < 7){
			//ITERATE BOARD
			for(let i = this.x + 1; i <= 7; i++){
				//SWITCH IS OCCUPIED RESULT
				switch(this.isOccupied(board, i, this.y, this.colour)){
					case 'none':
						//VALID MOVE - EMPTY SPACE
						validMoves.push({'x': i, 'y': this.y});
					break;
					case 'player':
						//INVALID MOVE - PLAYERS PIECES
						skip = true;
					break;
					case 'opponent':
						//VALID MOVE - OPPONENTS PIECE
						validMoves.push({'x': i, 'y': this.y});
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
		
		if(this.x > 0){
			for(let i = this.x - 1; i >= 0; i--){
				switch(this.isOccupied(board, i, this.y, this.colour)){
					case 'none':
						validMoves.push({'x': i, 'y': this.y});
					break;
					case 'player':
						skip = true;
					break;
					case 'opponent':
						validMoves.push({'x': i, 'y': this.y});
						skip = true;
					break;
				}
				if(skip){
					break;
				} 
			}
			skip = false;
		}
		
		if(this.y < 7){
			for(let i = this.y + 1; i <= 7; i++){
				switch(this.isOccupied(board, this.x, i, this.colour)){
					case 'none':
						validMoves.push({'x': this.x, 'y': i});
					break;
					case 'player':
						skip = true;
					break;
					case 'opponent':
						validMoves.push({'x': this.x, 'y': i});
						skip = true;
					break;
				}
				if(skip){
					break;
				} 
			}
			skip = false;
		}
		
		if(this.y > 0){
			for(let i = this.y - 1; i >= 0; i--){
				switch(this.isOccupied(board, this.x, i, this.colour)){
					case 'none':
						validMoves.push({'x': this.x, 'y': i});
					break;
					case 'player':
						skip = true;
					break;
					case 'opponent':
						validMoves.push({'x': this.x, 'y': i});
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