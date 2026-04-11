class Ai {
	
	//CONSTRUCTOR
	constructor(stateCopy, currentTurn){
		this.stateCopy = stateCopy;
		this.currentTurn = currentTurn;
		if(this.currentTurn == 'white'){
			this.opponentsTurn = 'black';
		}else{
			this.opponentsTurn = 'white';
		}
	}
	
	//PROPERTIES
	stateCopy;
	currentTurn;
	opponentsTurn;
	positionCount = 0;
	
	//minimaxRoot = function(depth, game, isMaximisingPlayer){
	minimaxRoot = function(depth){
		
		//var newGameMoves = game.ugly_moves();
		let board = new Board(this.stateCopy);
		let newGameMoves = board.getAllValidMoves(this.currentTurn);
		var bestMove = -9999;
		var bestMoveFound;

		//FOR EACH PIECE THAT HAS A POTENTIAL MOVE
		for(var i = 0; i < newGameMoves.length; i++){
			//CONVIENCE VARIABLES
			var newGameMove = newGameMoves[i];
			var initialPieceX = newGameMove.piece.getX();
			var initialPieceY = newGameMove.piece.getY();
			//game.ugly_move(newGameMove);
			//FOR EACH OF THOSE MOVES
			for(var j = 0; j < newGameMove.moves.length; j++){
				//MOVE THE PIECE
				board.makeMove(newGameMove.piece, {'x': newGameMove.moves[j].x, 'y': newGameMove.moves[j].y})
				//var value = minimax(depth - 1, game, !isMaximisingPlayer);
				//NOW THE PIECE IS MOVED, CALL MINIMAX WITH ONE LESS DEPTH
				var value = this.minimax(depth - 1, board, this.opponentsTurn);
				//game.undo();
				//board.undo();
				if(value >= bestMove){
					bestMove = value;
					//bestMoveFound = newGameMove;
					//think this isnt working right, the piece already seems to have moved, its not in the position it exists on the board
					//bestMoveFound = {'piece': newGameMove.piece, 'move': {'x': newGameMove.moves[j].x, 'y': newGameMove.moves[j].y}};
					//bestMoveFound = {'pieceName' : newGameMove.piece.getName(), 'pieceX': newGameMove.piece.getX(), 'pieceY': newGameMove.piece.getY(), 'move': {'x': newGameMove.moves[j].x, 'y': newGameMove.moves[j].y}};
					bestMoveFound = {'pieceName' : newGameMove.piece.getName(), 'pieceX': initialPieceX, 'pieceY': initialPieceY, 'move': {'x': newGameMove.moves[j].x, 'y': newGameMove.moves[j].y}};
				}
				//UNDO MOVE
				board.undo();
			}
		}
		
		//LOG NUMBER OF POSITIONS EVALUATED
		console.log('Positions evalutated: ' + this.positionCount);
		
		return bestMoveFound;
	};

	//var minimax = function (depth, game, isMaximisingPlayer) {
	minimax = function(depth, board, turn){
		this.positionCount++;
		if (depth === 0) {
			//return -evaluateBoard(game.board());
			return board.getScore();
		}
		
		if(turn == 'white'){
			//var opponentsTurn = 'black';
			this.opponentsTurn = 'black';
		}else{
			//var opponentsTurn = 'white';
			this.opponentsTurn = 'white';
		}

		//var newGameMoves = game.ugly_moves();
		var newGameMoves = board.getAllValidMoves(turn);

		//if (isMaximisingPlayer) {
		if(turn == 'white'){
			var bestMove = -9999;
			for(var i = 0; i < newGameMoves.length; i++){
				for(var j = 0; j < newGameMoves[i].moves.length; j++){
					//game.ugly_move(newGameMoves[i]);
					board.makeMove(newGameMoves[i].piece, {'x': newGameMoves[i].moves[j].x, 'y': newGameMoves[i].moves[j].y});
					//bestMove = Math.max(bestMove, minimax(depth - 1, game, !isMaximisingPlayer));
					bestMove = Math.max(bestMove, this.minimax(depth - 1, board, this.opponentsTurn));
					//game.undo();
					board.undo();
				}
			}
			return bestMove;
		}else{
			var bestMove = 9999;
			for(var i = 0; i < newGameMoves.length; i++){
				for(var j = 0; j < newGameMoves[i].moves.length; j++){
					//game.ugly_move(newGameMoves[i]);
					board.makeMove(newGameMoves[i].piece, {'x': newGameMoves[i].moves[j].x, 'y': newGameMoves[i].moves[j].y});
					//bestMove = Math.max(bestMove, minimax(depth - 1, game, !isMaximisingPlayer));
					bestMove = Math.min(bestMove, this.minimax(depth - 1, board, this.opponentsTurn));
					//game.undo();
					board.undo();
				}
			}
			return bestMove;
		}
	};
	
	//UTILITY FUNCTION THAT HANDLES THE FACT WHITE WANTS TO MAX WHILE BLACK WANTS TO MIN
	beats = function(newScore, scoreToBeat, colour){
		let beats = false;
		if(colour == 'white'){
			if(newScore > scoreToBeat){
				beats = true;
			}
		}else{
			if(newScore < scoreToBeat){
				beats = true;
			}
		}
		return beats;
	}
	
	//UTILITY FUNCTION THAT HANDLES THE FACT WHITE WANTS TO MAX WHILE BLACK WANTS TO MIN
	//note - this isnt currently used, I thought it would be, but the minimax stuff only ever deals with greater than
	isEqualOrBetter = function(newScore, scoreToBeat, colour){
		let beats = false;
		if(colour == 'white'){
			if(newScore >= scoreToBeat){
				beats = true;
			}
		}else{
			if(newScore <= scoreToBeat){
				beats = true;
			}
		}
		return beats;
	}
	
}