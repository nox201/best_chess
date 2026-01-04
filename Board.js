class Board {
	constructor(canvas){
		this.plane = canvas.getContext('2d');
		this.squareSize = Math.floor(canvas.width / 8);
	}
	
	canvas;
	plane;
	squareSize;
	squares = [];
	selected = {};
	
	//GET SQUARE METHOD	
	get = function(x, y)
	{
		//console.log('Board.get search for x: ' + x + ', y: ' + y);
		return this.squares[x][y];
	}
	
	//RETURNS AN ARRAY REPRESENTING THE CURRENT POSITION OF ALL PIECES ON THE BOARD
	//Should this just return the whole squares[]?
	getState = function()
	{
		return this.squares;
	}
	//I THINK I HAVE TO DO THIS TO PREVENT PASSING THE REAL BOARD STATE AROUND, I CANT CLONE IT OR ANYTHING
	getStateCopy = function()
	{
		let newSquares = [];
		for(let i = 0; i < this.squares.length; i++){
			newSquares[i] = [];
			for(let j = 0; j < this.squares[i].length; j++){
				newSquares[i][j] = this.squares[i][j];
			}
		}
		return newSquares;
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

	//POPUALTE THE BOARD WITH A CUSTOM STATE OR IF NONE PROVIDED, A FRESH GAME
	populateBoard = function(state)
	{
		//POPULATE BOARD WITH 8X8 SQUARES
		let squareColour = 'white';
		for(let i = 0; i < 8; i++){
			this.squares[i] = [];
			for(let j = 0; j < 8; j++){
				//DONT ALTERNATE COLOUR ON THE FIRST SQUARE OF EACH ROW
				if(j != 0){
					if(squareColour == 'white'){
						squareColour = 'grey';
					}else{
						squareColour = 'white';
					}
				}
				//CREATE SQUARE
				this.squares[i].push(new Square(canvas, this, i, j, squareColour, null));
			}
		}
		
		//CHECK IF STATE PROVIDED
		if(state == null){
			//ADD BLACK
			this.squares[0][0].addPiece(new Castle(plane, 'black'));
			this.squares[1][0].addPiece(new Knight(plane, 'black'));
			this.squares[2][0].addPiece(new Bishop(plane, 'black'));
			this.squares[3][0].addPiece(new Queen(plane, 'black'));
			this.squares[4][0].addPiece(new King(plane, 'black'));
			this.squares[5][0].addPiece(new Bishop(plane, 'black'));
			this.squares[6][0].addPiece(new Knight(plane, 'black'));
			this.squares[7][0].addPiece(new Castle(plane, 'black'));
			//ADD PAWNS
			for(let i = 0; i < 8; i++){
				this.squares[i][1].addPiece(new Pawn(plane, 'black'));
			}
			//ADD WHITE
			this.squares[0][7].addPiece(new Castle(plane, 'white'));
			this.squares[1][7].addPiece(new Knight(plane, 'white'));
			this.squares[2][7].addPiece(new Bishop(plane, 'white'));
			this.squares[3][7].addPiece(new Queen(plane, 'white'));
			this.squares[4][7].addPiece(new King(plane, 'white'));
			this.squares[5][7].addPiece(new Bishop(plane, 'white'));
			this.squares[6][7].addPiece(new Knight(plane, 'white'));
			this.squares[7][7].addPiece(new Castle(plane, 'white'));
			//ADD PAWNS
			for(let i = 0; i < 8; i++){
				this.squares[i][6].addPiece(new Pawn(plane, 'white'));
			}
		}else{
			//SET SQUARES TO PROVIDED STATE
			this.squares = state;
		}

	}
	
	//DRAW
	draw = function()
	{
		//ITERATE SQUARES
		this.squares.forEach((x) => {
			x.forEach((y) => {
				//UNDO ANY CHECKED COLUMNS
				y.checked = false;
				//CHECK FOR CHECK
				if(y.getPiece() != null){
					if(y.getPiece().getName() == 'King'){
						/* if(column.getPiece().isChecked(getBoardState())){
							if(isCheckMated(getBoardState(), this.squares)){
								//CHECK MATE
								column.checkMated = true;
							}else{
								//CHECKED
								column.checked = true;
								defendingCheck = true;
								document.getElementById(column.getPiece().colour + 'CheckDisplay').style.display = 'block';
							}
						}else{
							//column.checked = false;
							defendingCheck = false;
							document.getElementById(column.getPiece().colour + 'CheckDisplay').style.display = 'none';
						} */
					}
				}
				//DRAW SQUARE
				y.draw();
			})
		});
		
		//CHECK FOR GAME OVER
		if(gameOver){
			//GAME OVER STATE?
			alert('Checkmate! ' + currentTurn + ' loses.');
		}
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
	
	debug = function()
	{
		let log = '';
		for(let i = 0; i < this.squares.length; i++){
			for(let j = 0; j < this.squares[i].length; j++){
				if(this.squares[j][i].getPiece() != null){
					log = log + '[' + this.squares[j][i].getPiece().getName().charAt(0) + ']';
				}else{
					log = log + '[ ]';
				}
			}
			log = log + '\n';
		}
		console.log(log);
	}
	
}