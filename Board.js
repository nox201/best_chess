class Board {
	
	//CONSTRUCTOR
	constructor(state){
		this.populateBoard(state);
	}
	
	//PROPERTIES
	squares = [];
	selected = {};
	highlighted = [];
	warning = [];
	lastMove = [];
	previousState;
	showLastMove = false;
	
	//GETTERS/SETTERS
	get = function(x, y)
	{
		//console.log('Board.get search for x: ' + x + ', y: ' + y);
		return this.squares[x][y];
	}
	set = function(x, y, piece)
	{
		this.squares[x][y] = piece;
	}
	
	//GETS ALL THE VALID MOVES FOR A GIVEN PLAYER FOR THE BOARD IN ITS CURRENT STATE
	getAllValidMoves = function(colour)
	{
		let validMoves;
		let allValidMoves = [];
		for(let i = 0; i < this.squares.length; i++){
			for(let j = 0; j < this.squares[i].length; j++){
				if(this.squares[j][i] != null){
					if(this.squares[j][i].getColour() == colour){
						validMoves = this.squares[j][i].getValidMoves(this, j, i);
						if(validMoves.length > 0){
							allValidMoves.push({'piece' : this.squares[j][i], 'moves' : this.squares[j][i].getValidMoves(this, j, i)});
						}
					}
				}
			}
		}
		
		return allValidMoves;
	}
	
	//-------------
	//MOVE STUFF
	//-------------
	
	//MAKES A MOVE, RETURNING A PIECE IF ONE WAS TAKEN
	makeMove = function(piece, move)
	{
		//INIT
		let takenPiece = null;
		//EMPTY ANY LAST MOVE
		this.emptyLastMove();
		//STORE CURRENT STATE
		this.previousState = this.getStateCopy();
		//STORE LAST MOVE 
		this.addLastMove(piece.getX(), piece.getY());
		//REMOVE PIECE FROM CURRENT SQUARE
		this.set(piece.getX(), piece.getY(), null);
		//CHECK FOR TAKING PIECE
		if(this.get(move.x, move.y) != null){
			//STORE TAKEN PIECE
			takenPiece = this.get(move.x, move.y);
		}
		//PLACE PIECE IN NEW SQUARE
		this.set(move.x, move.y, piece);
		
		//SET PAWNS FIRST MOVE
		if(piece.getName() == 'Pawn'){
			piece.hasMoved();
		}
		
		//STORE LAST MOVE 
		this.addLastMove(move.x, move.y);
		//RETURN TAKEN PIECE
		return takenPiece;
	}
	//UNDO THE LAST MOVE MADE WITH makeMove
	undo = function()
	{
		this.populateBoard(this.previousState);
	}
	
	//RETURNS THE TOTAL VALUE OF ALL THE PIECES ON THE BOARD
	//Negative values means black is ahead, positive ones white
	getScore = function()
	{
		let score = 0;
		//CALCULATE SCORE OF BOARD IN CURRENT STATE
		this.getState().forEach((x) => {
			x.forEach((y) => {
				if(y != null){
					//console.log('Piece ' + y.getName() + ' score: ' + y.getScore());
					score += y.getScore();
				}
			})
		});
		return score;
	}
	
	//RETURNS AN ARRAY REPRESENTING THE CURRENT POSITION OF ALL PIECES ON THE BOARD
	getState = function()
	{
		return this.squares;
	}
	//RETURN A SEPERATE COPY OF THE BOARD, ALLOWING THE BOARD TO BE REBUILT VIA populateBoard
	getStateCopy = function()
	{
		let state = [];
		for(let i = 0; i < 8; i++){
			state[i] = [];
			for(let j = 0; j < 8; j++){
				state[i] = [];
			}
		}
		for(let i = 0; i < this.squares.length; i++){
			for(let j = 0; j < this.squares[i].length; j++){
				if(this.squares[j][i] != null){
					if(this.squares[j][i].getName() == 'Pawn'){
						state[j][i] = {'piece':this.squares[j][i].getName(), 'colour':this.squares[j][i].getColour(), 'firstMove':this.squares[j][i].firstMove};
					}else{
						state[j][i] = {'piece':this.squares[j][i].getName(), 'colour':this.squares[j][i].getColour()};
					}
				}else{
					state[j][i] = null;
				}
			}
		}
		//OUTPUT STATE TO CONSOLE
		//this.debug();
		
		return state;
	}
	
	//---------
	//CHECK/MATE FUNCTIONS
	//---------
	
	isInCheck = function(turn){
		//INIT
		let checked = false;
		let allMoves;
		//ITERATE ALL MOVES FOR OPPONENT
		if(turn == 'white'){
			allMoves = this.getAllValidMoves('black');
		}else{
			allMoves = this.getAllValidMoves('white');
		}
		//ITERATE ALL OPPONENTS MOVES
		allMoves.forEach((piece) => {
			piece.moves.forEach((move) => {
				if(this.get(move.x, move.y) != null){
					if(this.get(move.x, move.y).getName() == 'King'){
						checked = true;
					}
				}
			});
		});
		//RETURN CHECKED
		return checked;
	}
	
	isInCheckmate = function(turn){
		let checkmate = true;
		let allMoves;
		//ITERATE ALL MOVES FOR CURRENT PLAYER
		allMoves = this.getAllValidMoves(turn);
		//ITERATE ALL OPPONENTS MOVES
		allMoves.forEach((piece) => {
			piece.moves.forEach((move) => {
				//MAKE MOVE
				this.makeMove(piece.piece, move);
				//CHECK IF THIS REMOVES CHECK
				if(!this.isInCheck(turn)){
					checkmate = false;
				}
				//UNDO MOVE
				this.undo();
			});
		});
		//RETURN CHECKMATE
		return checkmate;
		
	}
	
	//REMEMBER THIS FUNCTION IS ONLY USED WHEN MOVING INTO CHECK - IT WONT FIND THE CHECKING PIECE IF ITS NOT THE KING BEING MOVED 
	getCheckingPiece = function(){
		//INIT
		let allMoves;
		let checkingPiece = null;
		//ITERATE ALL MOVES FOR OPPONENT
		if(currentTurn == 'white'){
			allMoves = this.getAllValidMoves('black');
		}else{
			allMoves = this.getAllValidMoves('white');
		}
		//ITERATE ALL OPPONENTS MOVES
		allMoves.forEach((piece) => {
			piece.moves.forEach((move) => {
				if(this.get(move.x, move.y) != null){
					checkingPiece = {'x': piece.piece.x, 'y': piece.piece.y};
				}
			});
		});
		//RETURN CHECKING PIECE
		return checkingPiece;
	}
	
	//this dupes a lot of the same code as isInCheck but does a decent seperation of concerns
	getCheckMove = function(){
		//INIT
		let checkMove = false;
		let checkPiece = false;
		let checkMoves = [];
		let allMoves;
		//ITERATE ALL MOVES FOR OPPONENT
		if(currentTurn == 'white'){
			allMoves = this.getAllValidMoves('black');
		}else{
			allMoves = this.getAllValidMoves('white');
		}
		//ITERATE ALL OPPONENTS MOVES
		allMoves.forEach((piece) => {
			piece.moves.forEach((move) => {
				if(this.get(move.x, move.y) != null){
					if(this.get(move.x, move.y).getName() == 'King'){
						checkPiece = piece;
						checkMoves.push(move);
					}
				}
			});
		});
		//RETURN CHECK PIECE AND KING LOCATION
		return {'piece': checkPiece, 'moves': checkMoves};
	}
	
	//---------
	//HANDLE CLICK EVENT STUFF
	//---------
	
	handleClick = function(event, x, y)
	{
		//INIT RETURN VALUES
		let ret = {}; 
		ret.piece = false;
		ret.swapTurn = false;
		ret.inCheck = false;
		ret.undo = false;
		
		//CHECK FOR HIGHLIGHTED PIECE
		if(this.isHighlighted(x, y)){

			//MAKE MOVE
			let move = {'x':x, 'y':y};
			let takenPiece = this.makeMove(this.getSelectedPiece(), move);

			//CHECK FOR CHECK
			if(this.isInCheck(currentTurn)){
				//UNDO MOVE
				ret.undo = true;
				//SET CHECK WARNING
				ret.inCheck = true;
			}else{
				//NOT IN CHECK, CHECK IF PIECE TAKEN
				if(takenPiece != null){
					//SET PIECE
					ret.piece = takenPiece;
				}
				//SET SWAP TURN
				ret.swapTurn = true;
			}
			
			//DESELECT EVERYTHING
			this.deselectEverything();
			
		//CHECK FOR NEW PIECE SELECTED	
		}else if(this.get(x, y) != null){
			//DESELECT EVERYTHING
			this.deselectEverything();
			//SET SQUARE AS SELECTED
			this.setSelected(x, y);
			//SET POTENTIAL MOVE AS HIGHLIGHTED
			this.get(x, y).getValidMoves(this, x, y).forEach((move) => {
				this.addHighlighted(move.x, move.y);
			});
		}else{
			//EMPTY SQUARE SELECTED
			this.deselectEverything();
		}
		//RETURN VALUES
		return ret;
	}
	
	//---------
	//SQUARE STATES
	//---------
	
	//SELECTED SQUARE FUNCTIONS
	setSelected = function(x, y)
	{
		this.selected = {'x': x, 'y': y};
	}
	isSelected = function(x, y)
	{
		if(this.selected.x == x && this.selected.y == y){
			return true;
		}else{
			return false;
		}
	}
	getSelected = function()
	{
		return this.selected;
	}
	getSelectedPiece = function()
	{
		return this.get(this.getSelected().x, this.getSelected().y);
	}
	emptySelected = function()
	{
		this.selected = false;
	}
	
	//HIGHLIGHTED SQUARE FUNCTIONS
	addHighlighted = function(x, y)
	{
		this.highlighted.push({'x': x, 'y': y});
	}
	isHighlighted = function(x, y)
	{
		let ret = false;
		this.getHighlighted().forEach((square) => {
			if(square.x == x && square.y == y){
				ret = true;
			}
		});
		return ret; 
	}
	getHighlighted = function()
	{
		return this.highlighted;
	}
	emptyHighlighted = function()
	{
		this.highlighted = [];
	}
	
	//WARNING SQUARE FUNCTIONS
	addWarning = function(x, y)
	{
		this.warning.push({'x': x, 'y': y});
	}
	isWarning = function(x, y)
	{
		let ret = false;
		this.getWarning().forEach((square) => {
			if(square.x == x && square.y == y){
				ret = true;
			}
		});
		return ret; 
	}
	getWarning = function()
	{
		return this.warning;
	}
	emptyWarning = function()
	{
		this.warning = [];
	}
	
	deselectEverything = function()
	{
		this.emptySelected();
		this.emptyHighlighted();
	}
	
	//LAST MOVE SQUARE FUNCTIONS
	addLastMove = function(x, y)
	{
		this.lastMove.push({'x': x, 'y': y});
	}
	isLastMove = function(x, y)
	{
		let ret = false;
		this.getLastMove().forEach((square) => {
			if(square.x == x && square.y == y){
				ret = true;
			}
		});
		return ret; 
	}
	getLastMove = function()
	{
		return this.lastMove;
	}
	emptyLastMove = function()
	{
		this.lastMove = [];
	}
	
	//---------
	//BOARD CREATION
	//---------

	//POPUALTE THE BOARD WITH A CUSTOM STATE OR IF NONE PROVIDED, A FRESH GAME
	populateBoard = function(state)
	{
		
		//POPULATE BOARD WITH 8X8 SQUARES
		for(let i = 0; i < 8; i++){
			this.squares[i] = [];
			for(let j = 0; j < 8; j++){
				//CREATE SQUARE
				//this.squares[i].push(new Square(canvas, this, i, j, squareColour, null));
				this.squares[i] = [];
			}
		}
		
		//CHECK IF STATE PROVIDED
		if(state == null){
			//ADD BLACK
			this.squares[0][0] = new Castle('black');
			this.squares[0][0].setPosition(0, 0);
			this.squares[1][0] = new Knight('black');
			this.squares[1][0].setPosition(1, 0);
			this.squares[2][0] = new Bishop('black');
			this.squares[2][0].setPosition(2, 0);
			this.squares[3][0] = new Queen('black');
			this.squares[3][0].setPosition(3, 0);
			this.squares[4][0] = new King('black');
			this.squares[4][0].setPosition(4, 0);
			this.squares[5][0] = new Bishop('black');
			this.squares[5][0].setPosition(5, 0);
			this.squares[6][0] = new Knight('black');
			this.squares[6][0].setPosition(6, 0);
			this.squares[7][0] = new Castle('black');
			this.squares[7][0].setPosition(7, 0);
			//ADD PAWNS
			for(let i = 0; i < 8; i++){
				this.squares[i][1] = new Pawn('black');
				this.squares[i][1].setPosition(i, 1);
			}
			//ADD WHITE
			this.squares[0][7] = new Castle('white');
			this.squares[0][7].setPosition(0, 7);
			this.squares[1][7] = new Knight('white');
			this.squares[1][7].setPosition(1, 7);
			this.squares[2][7] = new Bishop('white');
			this.squares[2][7].setPosition(2, 7);
			this.squares[3][7] = new Queen('white');
			this.squares[3][7].setPosition(3, 7);
			this.squares[4][7] = new King('white');
			this.squares[4][7].setPosition(4, 7);
			this.squares[5][7] = new Bishop('white');
			this.squares[5][7].setPosition(5, 7);
			this.squares[6][7] = new Knight('white');
			this.squares[6][7].setPosition(6, 7);
			this.squares[7][7] = new Castle('white');
			this.squares[7][7].setPosition(7, 7);
			//ADD PAWNS
			for(let i = 0; i < 8; i++){
				this.squares[i][6] = new Pawn('white');
				this.squares[i][1].setPosition(i, 6);
			}
		}else{
			//SET SQUARES TO PROVIDED STATE
			for(let i = 0; i < state.length; i++){
				for(let j = 0; j < state[i].length; j++){
					if(state[j][i] != null){
						switch(state[j][i].piece){
							case 'Bishop':
								this.squares[j][i] = new Bishop(state[j][i].colour);
							break;
							case 'Castle':
								this.squares[j][i] = new Castle(state[j][i].colour);
							break;
							case 'King':
								this.squares[j][i] = new King(state[j][i].colour);
							break;
							case 'Knight':
								this.squares[j][i] = new Knight(state[j][i].colour);
							break;
							case 'Pawn':
								this.squares[j][i] = new Pawn(state[j][i].colour);
								this.squares[j][i].firstMove = state[j][i].firstMove;
							break;
							case 'Queen':
								this.squares[j][i] = new Queen(state[j][i].colour);
							break;
						}
						//SET PIECES X AND Y COORDS
						this.squares[j][i].setPosition(j, i);
					}else{
						this.squares[j][i] = null;
					}
				}
			}
		}

	}
	
	debug = function()
	{
		let log = '';
		for(let i = 0; i < this.squares.length; i++){
			for(let j = 0; j < this.squares[i].length; j++){
				if(this.squares[j][i] != null){
					if(this.squares[j][i].getColour() == 'white'){
						log = log + '[' + this.squares[j][i].getName().charAt(0).toLowerCase() + ']';
					}else{
						log = log + '[' + this.squares[j][i].getName().charAt(0) + ']';
					}
				}else{
					log = log + '[ ]';
				}
			}
			log = log + '\n';
		}
		console.log(log);
	}

	
}