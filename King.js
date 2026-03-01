class King extends Piece {
	constructor(colour){
		super(colour);
	}
	
	name = 'King';
	
	//GET VALID MOVES FOR KING IS JUST THE SAME CODE FROM BISHOP AND CASTLE COPY/PASTED
	getValidMoves = function(board, x, y){
		
		//INIT
		this.setPosition(x, y);
		let validMoves = [];
		let skip = false;

		//DONT BOTHER CHECKING IF KING IS AGAINST AN EDGE
		if(this.x < 7){
			//ITERATE BOARD
			for(let i = this.x + 1; i <= this.x + 1; i++){
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
			for(let i = this.x - 1; i >= this.x - 1; i--){
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
			for(let i = this.y + 1; i <= this.y + 1; i++){
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
			for(let i = this.y - 1; i >= this.y - 1; i--){
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
		
		//SOUTH-EAST - DONT BOTHER CHECKING IF KING IS AGAINST AN EDGE
		if(this.x < 7 && this.y < 7){
			//MAX ITERATIONS HARDCODED TO 1 FOR KING
			let maxIterations = 1;
			//console.log('maxIterations: ' + maxIterations);
			for(let i = 1; i <= maxIterations; i++){
				switch(this.isOccupied(board, this.x + i, this.y + i, this.colour)){
					case 'none':
						validMoves.push({'x': this.x + i, 'y': this.y + i});
						//console.log('iteration ' + i + ': ' + (this.x + i) + ' - ' + (this.y + i) + ' is none');
					break;
					case 'player':
						skip = true;
						//console.log('iteration ' + i + ': ' + (this.x + i) + ' - ' + (this.y + i) + ' is player');
					break;
					case 'opponent':
						validMoves.push({'x': this.x + i, 'y': this.y + i});
						skip = true;
						//console.log('iteration ' + i + ': ' + (this.x + i) + ' - ' + (this.y + i) + ' is opponent');
					break;
				}
				if(skip){
					break;
				}
			}
			skip = false;
		}
		
		//SOUTH-WEST
		if(this.x > 0 && this.y < 7){
			let maxIterations = 1;
			for(let i = 1; i <= maxIterations; i++){
				switch(this.isOccupied(board, this.x - i, this.y + i, this.colour)){
					case 'none':
						validMoves.push({'x': this.x - i, 'y': this.y + i});
					break;
					case 'player':
						skip = true;
					break;
					case 'opponent':
						validMoves.push({'x': this.x - i, 'y': this.y + i});
						skip = true;
					break;
				}
				if(skip){
					break;
				}
			}
			skip = false;
		}
		
		//NORTH-WEST
		if(this.x > 0 && this.y > 0){
			let maxIterations = 1;
			for(let i = 1; i <= maxIterations; i++){
				switch(this.isOccupied(board, this.x - i, this.y - i, this.colour)){
					case 'none':
						validMoves.push({'x': this.x - i, 'y': this.y - i});
					break;
					case 'player':
						skip = true;
					break;
					case 'opponent':
						validMoves.push({'x': this.x - i, 'y': this.y - i});
						skip = true;
					break;
				}
				if(skip){
					break;
				}
			}
			skip = false;
		}
		
		//NORTH-EAST
		if(this.x < 7 && this.y > 0){
			let maxIterations = 1;
			for(let i = 1; i <= maxIterations; i++){
				switch(this.isOccupied(board, this.x + i, this.y - i, this.colour)){
					case 'none':
						validMoves.push({'x': this.x + i, 'y': this.y - i});
					break;
					case 'player':
						skip = true;
					break;
					case 'opponent':
						validMoves.push({'x': this.x + i, 'y': this.y - i});
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
	
	isChecked = function(board)
	{
		let checked = false;
		//ITERATE THE BOARD STATE
		board.forEach((piece) => {
			//ONLY COMPUTE THE MOVE FOR THE CURRENT PLAYER
			if(piece.colour != this.colour){
				//ONLY STORE VALID MOVES THAT CAN BE MADE (getValidMoves can return an empty array)
				if(piece.piece.getValidMoves(board).length > 0){
					piece.piece.getValidMoves(board).forEach((move) => {
						if(move.x == this.x && move.y == this.y){
							//KING IS CHECKED
							//console.log(this.colour + ' king is checked');
							checked = true;
						}
					});
				}
			}
		});
		return checked;
	}

}