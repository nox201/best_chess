class Board {
	constructor(state){
		this.populateBoard(state);
	}
	
	squares = [];
	selected = {};
	
	//GET SQUARE METHOD	
	get = function(x, y)
	{
		//console.log('Board.get search for x: ' + x + ', y: ' + y);
		return this.squares[x][y];
	}
	set = function(x, y, piece)
	{
		this.squares[x][y] = piece;
	}
	
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
	
	getScoreForMove = function(validMove, move)
	{
		let score = 0;
		//convienience variable
		let piece = validMove.piece;
		let takenPiece = null;
		
		//REMOVE PIECE FROM CURRENT SQUARE
		this.set(piece.getX(), piece.getY(), null);
		//CHECK FOR TAKING PIECE
		if(this.get(move.x, move.y) != null){
			//STORE TAKEN PIECE
			takenPiece = this.get(move.x, move.y);
		}
		//PLACE PIECE IN NEW SQUARE
		this.set(move.x, move.y, piece);
		
		//CALCULATE SCORE OF BOARD IN CURRENT STATE
		this.getState().forEach((x) => {
			x.forEach((y) => {
				if(y != null){
					//console.log('Piece ' + y.getName() + ' score: ' + y.getScore());
					score += y.getScore();
				}
			})
		});
		
		//UNDO MOVE
		this.set(piece.getX(), piece.getY(), piece);
		if(takenPiece == null){
			this.set(move.x, move.y, null);
		}else{
			this.set(move.x, move.y, takenPiece);
		}
		
		//RETURN WHOLE BOARD SCORE
		return score;
	}
	
	//RETURNS AN ARRAY REPRESENTING THE CURRENT POSITION OF ALL PIECES ON THE BOARD
	//Should this just return the whole squares[]?
	getState = function()
	{
		return this.squares;
	}
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
					state[j][i] = {'piece':this.squares[j][i].getName(), 'colour':this.squares[j][i].getColour()};
				}else{
					state[j][i] = null;
				}
			}
		}
		return state;
	}
	
	//SELECTED SQUARE FUNCTIONS
	setSelected = function(x, y)
	{
		this.selected = {'x': x, 'y': y};
	}
	getSelected = function()
	{
		return this.get(this.selected.x, this.selected.y);
	}
	deselectEverything = function()
	{
		//ITERATE SQUARES
		this.squares.forEach((x) => {
			x.forEach((y) => {
				y.selected = false;
				y.highlighted = false;
			})
		});
	}

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
			this.squares[1][0] = new Knight('black');
			this.squares[2][0] = new Bishop('black');
			this.squares[3][0] = new Queen('black');
			this.squares[4][0] = new King('black');
			this.squares[5][0] = new Bishop('black');
			this.squares[6][0] = new Knight('black');
			this.squares[7][0] = new Castle('black');
			//ADD PAWNS
			for(let i = 0; i < 8; i++){
				this.squares[i][1] = new Pawn('black');
			}
			//ADD WHITE
			this.squares[0][7] = new Castle('white');
			this.squares[1][7] = new Knight('white');
			this.squares[2][7] = new Bishop('white');
			this.squares[3][7] = new Queen('white');
			this.squares[4][7] = new King('white');
			this.squares[5][7] = new Bishop('white');
			this.squares[6][7] = new Knight('white');
			this.squares[7][7] = new Castle('white');
			//ADD PAWNS
			for(let i = 0; i < 8; i++){
				this.squares[i][6] = new Pawn('white');
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
							break;
							case 'Queen':
								this.squares[j][i] = new Queen(state[j][i].colour);
							break;
						}
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
					log = log + '[' + this.squares[j][i].getName().charAt(0) + ']';
				}else{
					log = log + '[ ]';
				}
			}
			log = log + '\n';
		}
		console.log(log);
	}

	
}