class State {
	constructor(squares){
		this.squares = squares;
	}
	
	squares;
	
	get = function(x, y)
	{
		return this.squares[x][y];
	}
	getSquares = function()
	{
		return this.squares;
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