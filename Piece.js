class Piece {
	constructor(plane, colour){
		this.plane = plane;
		this.colour = colour;
	}
	plane;
	colour;
	x;
	y;
	moveset;
	name = 'Generic Piece';
	
	setX = function(x){
		this.x = x;
	}
	setY = function(y){
		this.y = y;
	}
	
	getName = function(){
		return this.name;
	}
	
	//GENERIC LOGGING FUNCTION
	log = function(){
		console.log(this.colour + ' ' + this.name + ' at X: ' + this.x + ', Y: ' + this.y);
	}
	
	//UTILITY FUNCTION TO RETURN THE PIECES UNICODE CHARACTER
	getUnicode = function(){
		let fontUnicodeCharacters = [];
		fontUnicodeCharacters['white'] = [];
		fontUnicodeCharacters['white']['Bishop'] = '\u{2657}';
		fontUnicodeCharacters['white']['Castle'] = '\u{2656}';
		fontUnicodeCharacters['white']['King'] = '\u{2654}';
		fontUnicodeCharacters['white']['Knight'] = '\u{2658}';
		fontUnicodeCharacters['white']['Pawn'] = '\u{2659}';
		fontUnicodeCharacters['white']['Queen'] = '\u{2655}';
		fontUnicodeCharacters['black'] = [];
		fontUnicodeCharacters['black']['Bishop'] = '\u{265D}';
		fontUnicodeCharacters['black']['Castle'] = '\u{265C}';
		fontUnicodeCharacters['black']['King'] = '\u{265A}';
		fontUnicodeCharacters['black']['Knight'] = '\u{265E}';
		fontUnicodeCharacters['black']['Pawn'] = '\u{265F}';
		fontUnicodeCharacters['black']['Queen'] = '\u{265B}';
		//RETURN UNICODE CHARACTER
		return fontUnicodeCharacters[this.colour][this.name];
	}
	
	//GET THE PIECES SCORE
	getScore = function(){
		let scores = [];
		scores['white'] = [];
		scores['white']['Bishop'] = 30;
		scores['white']['Castle'] = 50;
		scores['white']['King'] = 900;
		scores['white']['Knight'] = 30;
		scores['white']['Pawn'] = 10;
		scores['white']['Queen'] = 90;
		scores['black'] = [];
		scores['black']['Bishop'] = -30;
		scores['black']['Castle'] = -50;
		scores['black']['King'] = -900;
		scores['black']['Knight'] = -30;
		scores['black']['Pawn'] = -10;
		scores['black']['Queen'] = -90;
		//RETURN UNICODE CHARACTER
		return scores[this.colour][this.name];
	}
	
	
	draw = function(x, y, squareSize){
		//DRAW UNICODE CHARACTER
		this.plane.fillStyle = 'black';
		this.plane.fillText(this.getUnicode(), squareSize * x + (squareSize / 2), squareSize * y + squareSize);
	}
	
	getValidMoves = function(boardState){
		return [];
	};
	
	isOccupied = function(board, x, y, colour){
		if(board.get(x, y).getPiece() == null){
			return 'none';
		}
		if(board.get(x, y).getPiece().colour == colour){
			return 'player';
		}else{
			return 'opponent';
		}
	}
	
	//should this function live elsewhere?
	/* isOccupied(board, x, y, colour){
		let occupied = 'none';
		//console.log(boardState);
		for(let i = 0; i < boardState.length; i++){
			if(boardState[i].x == x && boardState[i].y == y){
				if(boardState[i].colour == colour){
					occupied = 'player';
				}else{
					occupied = 'opponent';
				}
			}
		}
		return occupied;
	} */
}