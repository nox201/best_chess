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
	
	//GET VALID MOVES FOR QUEEN IS JUST THE SAME CODE FROM BISHOP AND CASTLE COPY/PASTED
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
		
		//SOUTH-EAST - DONT BOTHER CHECKING IF BISHOP IS AGAINST AN EDGE
		if(this.row <= 7 && this.column <= 7){
			//DETERMINE THE MAX NUMBER OF SQUARES FROM AN EDGE
			let maxIterations = (7 - Math.max(this.row, this.column));
			//console.log('maxIterations: ' + maxIterations);
			for(let i = 1; i <= maxIterations; i++){
				switch(this.isOccupied(boardState, this.row + i, this.column + i, this.colour)){
					case 'none':
						validMoves.push({'row': this.row + i, 'column': this.column + i});
						//console.log('iteration ' + i + ': ' + (this.row + i) + ' - ' + (this.column + i) + ' is none');
					break;
					case 'player':
						skip = true;
						//console.log('iteration ' + i + ': ' + (this.row + i) + ' - ' + (this.column + i) + ' is player');
					break;
					case 'opponent':
						validMoves.push({'row': this.row + i, 'column': this.column + i});
						skip = true;
						//console.log('iteration ' + i + ': ' + (this.row + i) + ' - ' + (this.column + i) + ' is opponent');
					break;
				}
				if(skip){
					break;
				}
			}
			skip = false;
		}
		
		//SOUTH-WEST
		if(this.row >= 0 && this.column <= 7){
			let maxIterations = (7 - Math.max(7 - this.row, this.column));
			for(let i = 1; i <= maxIterations; i++){
				switch(this.isOccupied(boardState, this.row - i, this.column + i, this.colour)){
					case 'none':
						validMoves.push({'row': this.row - i, 'column': this.column + i});
					break;
					case 'player':
						skip = true;
					break;
					case 'opponent':
						validMoves.push({'row': this.row - i, 'column': this.column + i});
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
		if(this.row >= 0 && this.column >= 0){
			let maxIterations = (7 - Math.max(7 - this.row, 7 - this.column));
			for(let i = 1; i <= maxIterations; i++){
				switch(this.isOccupied(boardState, this.row - i, this.column - i, this.colour)){
					case 'none':
						validMoves.push({'row': this.row - i, 'column': this.column - i});
					break;
					case 'player':
						skip = true;
					break;
					case 'opponent':
						validMoves.push({'row': this.row - i, 'column': this.column - i});
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
		if(this.row <= 7 && this.column >= 0){
			let maxIterations = (7 - Math.max(this.row, 7 - this.column));
			for(let i = 1; i <= maxIterations; i++){
				switch(this.isOccupied(boardState, this.row + i, this.column - i, this.colour)){
					case 'none':
						validMoves.push({'row': this.row + i, 'column': this.column - i});
					break;
					case 'player':
						skip = true;
					break;
					case 'opponent':
						validMoves.push({'row': this.row + i, 'column': this.column - i});
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