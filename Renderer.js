class Renderer{
	constructor(canvas){
		this.canvas = canvas;
	}
	
	canvas;
	
	draw = function(board)
	{
		//SET UP PLANE VARIABLES
		let plane = this.canvas.getContext('2d');
		let squareSize = Math.floor(canvas.width / 8);
		var fontSize = squareSize - 5;
		//SET PLANE FONT
		plane.font = fontSize + 'px Tahoma';
		plane.textAlign = 'center';
		plane.textBaseline = 'bottom';
		
		//GET BOARD STATE
		let state = board.getState();
		let colour = 'lightGrey';
		
		//ITERATE STATE
		for(let i = 0; i < state.length; i++){
			for(let j = 0; j < state[i].length; j++){
				
				//DETERMINE SQUARE COLOUR
				if(j != 0){
					if(colour == 'lightGrey'){
						colour = 'darkGrey';
					}else{
						colour = 'lightGrey';
					}
				}
				
				//CHECK FOR SELECTED
				if(board.isSelected(i, j)){
					plane.fillStyle = 'green';
				}else if(board.isHighlighted(i, j)){
					plane.fillStyle = 'lightgreen';
				}else{
					//DRAW DEFAULT SQUARE
					plane.fillStyle = colour;
				}
				//FILL RECT
				plane.fillRect(squareSize * i, squareSize * j, squareSize, squareSize);
				
				//DRAW PIECE
				if(state[i][j] != null){
					plane.fillStyle = state[i][j].colour;
					plane.fillText(this.getUnicode(state[i][j].getColour(), state[i][j].getName()), squareSize * i + (squareSize/2), squareSize * j + squareSize);
				}
				
				
			}
		}

	}
	
	//UTILITY FUNCTION TO RETURN THE PIECES UNICODE CHARACTER
	getUnicode = function(colour, piece){
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
		return fontUnicodeCharacters[colour][piece];
	}
	
}