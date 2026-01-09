//SQUARE CLASS
//Represents one of the 64 coloured squares on the chessboard
class Square {
	constructor(canvas, board, x, y, colour, contains){
		this.canvas = canvas;
		this.plane = canvas.getContext('2d');
		this.board = board;
		this.x = x;
		this.y = y;
		this.colour = colour;
		this.contains = contains;
		this.squareSize = Math.floor(canvas.width / 8);
		//utility variables
		this.centreX = this.squareSize * this.x + (this.squareSize / 2);
		this.centreY = this.squareSize * this.y + (this.squareSize / 2);
	};
	
	canvas;
	plane;
	board;
	x;
	y;
	colour;
	contains;
	squareSize;
	centreX;
	centreY;
	selected = false;
	highlighted = false;
	checked = false;
	checkMated = false;
	
	//ADDS A PIECE TO THE SQUARE
	addPiece = function(piece){
		this.contains = piece;
	}
	
	//REMOVES A PIECCE FROM THE SQUARE
	removePiece = function(piece){
		this.contains = null;
	}
	
	//SETS THE CONTAINED PIECES SQUARE DATA, THEN RETURNS IT
	getPiece = function(){
		if(this.contains != null){
			this.contains.setX(this.x);
			this.contains.setY(this.y);
			return this.contains;
		}else{
			return null;
		}
	}
	
	//DRAWS THE SQUARE, INCLUDING ANY PIECE IN THE SQUARE
	draw = function(){
	
		//CHECK IF PIECE SELECTED
		if(this.selected){
			plane.fillStyle = 'green';
		}else if(this.highlighted){
			plane.fillStyle = 'lightgreen';
		}else if(this.checked){
			plane.fillStyle = 'red';
		}else if(this.checkMated){
			plane.fillStyle = 'purple';
			//SET GAME OVER FLAG
			gameOver = true;
		}else{
			plane.fillStyle = this.colour;
		}
		plane.fillRect(this.squareSize * this.x, this.squareSize * this.y, this.squareSize, this.squareSize);
		
		if(this.getPiece() != null){
			//DRAW PIECE
			this.getPiece().draw(this.x, this.y, this.squareSize);
		}
	};
	
	//SQUARE-SPECIFIC CLICK HANDLER
	handleClick(event){

		//LOZ
		console.log('handleClick clicked on square X:' + this.x + ', Y:' + this.y);

		//SET FLAG
		preventMove = false;
		let existingPiece = null;
		
		//CHECK IF HIGHLIGHTED - PIECE HAS ALREADY BEEN SELECTED, THIS CLICK WILL BE A VALID MOVE
		if(this.highlighted == true){
			
			//GET CURRENTLY SELECTED SQUARE
			let currentlySelected = this.board.getSelected();
			
			
			//* This is where the whole thing goes wrong
			// There is no way I can find where I can duplicate or clone my board state without operating on the real board that I'm going to render
			// Any reference to the squares array in the board causes the actual squares in the board class to update
			// This means that when I try and 'emulate' moves, and create a board state I want to work with, but potentially discard, I'm ALWAYS making those changes to the real board
			// This is shit and not what I want. I've tried to make a new object and return that, it doesn't work. I can't use strcuturedClone because I can't clone a canvas object
			// And I can't use JSON.stringify because I have object references in Square, and JSON doesn't support them so fails. 
			// Maybe I need a seperate 'State' object that holds the position of all the pieces, but afaik that's basically what I'm doing - i'd just have the squares array wrapped in an object?
			
			//CLONE CURRENT BOARD STATE
			//let emulatedState = this.board.getState();
			//could this work?
			let emulatedState = this.board.getStateCopy();
			
			//EMULATE ADDING PIECE TO HIGHLIGHTED SQUARE
			emulatedState.get(this.x, this.y).addPiece(this.board.getSelected().getPiece());
			//EMULATE REMOVING PIECE FROM CURRENT SQUARE
			emulatedState.get(currentlySelected.x, currentlySelected.y).removePiece();
			//CREATE EMULATED BOARD
			let emulatedBoard = new Board(canvas);
			//SET EMULATED BOARD TO HAVE EMULATED STATE
			emulatedBoard.populateBoard(emulatedState.getSquares());
			
			//DEBUG
			emulatedBoard.debug();
			
			//this.board.debug();
			
			//if(emulatedBoard.isInCheck()){
				//PREVENT MOVE, NOTIFY USER
				
			//}
			
			//DESELECT EVERYTHING
			this.board.deselectEverything();
			
			//SWAP TURN
			//this is a gameplay function so might need to move from here - squares know about the board, but feels too complex to have the squares know about the game state?
			//swapTurn();
			
		//SQUARE NOT HIGHLIGHTED - CHECK IF SQUARE HAS A PIECE CONTAINED
		}else if(this.getPiece() != null){
		
			//DIFFERNENT PIECE SELECTED, DESELECT EVERYTHING
			this.board.deselectEverything();
			//CHECK IF ITS THE RIGHT PIECES TURN
			if(this.getPiece().colour == currentTurn){
				//SET SELECTED
				this.selected = true;
				//SET UTILITY VARIABLE
				//do i need these?
				selectedRow = this.row;
				selectedColumn = this.column;
				this.board.setSelected(this.x, this.y);
				
				//SET PIECES VALID MOVES TO HIGHLIGHTED
				let validMoves = this.getPiece().getValidMoves(this.board);
				console.log(validMoves);
				for(let i = 0; i < validMoves.length; i++){
					//CHECK FOR ERROR
					if(typeof(this.board.get(validMoves[i].x, validMoves[i].y)) == 'undefined'){
						alert('Undefined: attempting to access x: ' + validMoves[i].x + ', y: ' + validMoves[i].y);
					}else{
						//HIGHLIGHT VALID MOVE SQUARES
						this.board.get(validMoves[i].x, validMoves[i].y).highlighted = true;
					}
				}
			}
			
		}else{
			//EMPTY SQUARE CLICKED - DESELECT EVERYTHING
			this.board.deselectEverything();
		}
		
		//REDRAW BOARD
		this.board.draw();
	}
	
	
}