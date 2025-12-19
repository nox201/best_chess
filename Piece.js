class Piece {
	constructor(plane, colour){
		this.plane = plane;
		this.colour = colour;
	}
	plane;
	colour;
	row;
	column;
	moveset;
	name = 'Generic Piece';
	
	setRow = function(row){
		this.row = row;
	}
	setColumn = function(column){
		this.column = column;
	}
	
	getName = function(){
		return this.name;
	}
	
	//GENERIC LOGGING FUNCTION
	log = function(){
		console.log(this.colour + ' ' + this.name + ' at Row: ' + this.row + ', Column: ' + this.column);
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
	
	
	draw = function(row, column, squareSize){
		//DRAW UNICODE CHARACTER
		this.plane.fillStyle = 'black';
		this.plane.fillText(this.getUnicode(), squareSize * row + (squareSize / 2), squareSize * column + squareSize);
	}
	
	getValidMoves = function(boardState){
		return [];
	};
	
	//should this function live elsewhere?
	isOccupied(boardState, row, column, colour){
		let occupied = 'none';
		//console.log(boardState);
		for(let i = 0; i < boardState.length; i++){
			if(boardState[i].row == row && boardState[i].column == column){
				if(boardState[i].colour == colour){
					occupied = 'player';
				}else{
					occupied = 'opponent';
				}
			}
		}
		return occupied;
	}
}