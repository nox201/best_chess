class Piece {
	
	//CONSTRUCTOR
	constructor(colour){
		this.colour = colour;
	}
	
	//PROPERTIES
	colour;
	x;
	y;
	moveset;
	name = 'Generic Piece';
	
	//GETTERS/SETTERS
	setX = function(x){
		this.x = x;
	}
	getX = function(){
		return this.x;
	}
	setY = function(y){
		this.y = y;
	}
	getY = function(y){
		return this.y;
	}
	setPosition(x, y){
		this.x = x;
		this.y = y;
	}
	getPosition(){
		return {'x' : this.x, 'y' : this.y};
	}
	getName = function(){
		return this.name;
	}
	getColour = function(){
		return this.colour;
	}
	
	//GENERIC LOGGING FUNCTION
	log = function(){
		console.log(this.colour + ' ' + this.name + ' at X: ' + this.x + ', Y: ' + this.y);
	}
	
	//UTILITY FUNCTION TO RETURN THE PIECES UNICODE CHARACTER
	//mirrors functionality as Piece.getUnicode, but this can be used in the taken pool
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
	
	//PARENT METHOD - IS REPLACED BY CHILD CLASSES IMPLEMENTATION (PAWN, KNIGHT ETC)
	getValidMoves = function(boardState){
		return [];
	};
	
	//DETERMINES IF A LOCATION IS ON THE BOARD, IS EMPTY, AND IF NOT IF THE PIECE IS OF THE SAME COLOUR
	isOccupied = function(board, x, y, colour){
		//CHECK THAT SQUARE IS ON THE BOARD
		if(x < 0 || x > 7 || y < 0 || y > 7){
			//LOG OUT OF BOUNDS
			//console.log('isOccupied function attempted to search out of bounds: ' + x + ', ' + y);
			return false; 
		}
		
		if(board.get(x, y) == null){
			return 'none';
		}
		if(board.get(x, y).getColour() == colour){
			return 'player';
		}else{
			return 'opponent';
		}
	}
	
}