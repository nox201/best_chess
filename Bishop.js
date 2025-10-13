class Bishop extends Piece {
	constructor(plane, colour){
		super(plane, colour);
	}
	
	name = 'Bishop';
	
	draw = function(row, column, squareSize){
		//SET UTILITY VARIABLES
		let centreX = squareSize * row + (squareSize / 2);
		let centreY = squareSize * column + (squareSize / 2);
		//DRAW SQUARE
		plane.beginPath();
		plane.moveTo(squareSize * row + squareSize * 0.50, squareSize * column + squareSize * 0.33);
		plane.lineTo(squareSize * row + squareSize * 0.75, squareSize * column + squareSize * 0.75);
		plane.lineTo(squareSize * row + squareSize * 0.25, squareSize * column + squareSize * 0.75);
		plane.lineTo(squareSize * row + squareSize * 0.50, squareSize * column + squareSize * 0.33);
		plane.strokeStyle = 'black';
		plane.stroke();
		plane.fillStyle = this.colour;
		plane.fill();
	}
	
	getValidMoves = function(boardState){
		
		//INIT
		let validMoves = [];
		let skip = false;
		
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