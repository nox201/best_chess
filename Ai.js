class Ai {
	constructor(stateCopy, currentTurn){
		this.stateCopy = stateCopy;
		this.currentTurn = currentTurn;
	}
	
	stateCopy;
	currentTurn;
	
	makeOpponentMove = function()
	{
		console.log('Starting AI move for ' + this.currentTurn);
		//CREATE BOARD OBJECT FROM STATE COPY
		let board = new Board(this.stateCopy);
		
		console.log(board.debug());
		
		let myTurn;
		let opponentsTurn;
		let firstMoves;
		let secondMoves;
		let secondBoardScore;
		let thirdMoves;
		let thirdBoardScore;
		let baseline;
		let possibleMoves = [];
		
		if(currentTurn = 'white'){
			myTurn = 'white';
			opponentsTurn = 'black';
		}else{
			myTurn = 'black';
			opponentsTurn = 'white';
		}

		//FIRST MOVE
		firstMoves = board.getAllValidMoves(myTurn);
		
		//console.log(firstMoves);
		
		for(let i = 0; i < firstMoves.length; i++){			
			for(let j = 0; j < firstMoves[i].moves.length; j++){
				//MAKE FIRST MOVE
				board.makeMove(firstMoves[i].piece, {'x': firstMoves[i].moves[j].x, 'y': firstMoves[i].moves[j].y});
				//board.debug();
				//GET BOARD SCORE - THIS WILL BE USED AS THE BASELINE BOARD SCORE FOR THE OPPONENT
				baseline = board.getScore();
				
				//CREATE NEW BOARD AFTER FIRST MOVE
				let secondBoard = new Board(board.getStateCopy());
				//GET VALID MOVES FOR SECOND BOARD
				secondMoves = secondBoard.getAllValidMoves(opponentsTurn);
				for(let k = 0; k < secondMoves.length; k++){			
					for(let l = 0; l < secondMoves[k].moves.length; l++){
						//MAKE SECOND MOVE
						secondBoard.makeMove(secondMoves[k].piece, {'x': secondMoves[k].moves[l].x, 'y': secondMoves[k].moves[l].y});
						
						//ASSUME HUMAN WILL MAKE THE PERFECT MOVE
						secondBoardScore = secondBoard.getScore();
						//if(this.isEqualOrBetter(secondBoardScore, baseline), opponentsTurn){
						if(this.beats(secondBoardScore, baseline), opponentsTurn){
							baseline = secondBoardScore;
							
							//CREATE NEW BOARD AFTER FIRST MOVE
							let thirdBoard = new Board(secondBoard.getStateCopy());
							//GET VALID MOVES FOR SECOND BOARD
							thirdMoves = thirdBoard.getAllValidMoves(myTurn);
							for(let m = 0; m < thirdMoves.length; m++){
								for(let n = 0; n < thirdMoves[m].moves.length; n++){
									//MAKE THIRD MOVE
									thirdBoard.makeMove(thirdMoves[m].piece, {'x': thirdMoves[m].moves[n].x, 'y': thirdMoves[m].moves[n].y});
									
									//GET SCORE
									thirdBoardScore = thirdBoard.getScore();
									if(this.isEqualOrBetter(thirdBoardScore, baseline, myTurn)){
										//BEST OUTCOME FOUND, STORE FIRST MOVE
										possibleMoves.push({'score': thirdBoardScore, 'move': {'piece': firstMoves[i].piece, 'moves': {'x': firstMoves[i].moves[j].x, 'y': firstMoves[i].moves[j].y}}});
										//ITERATE POSSIBLE MOVES, REMOVE THOSE THAT ARE WORSE
										for (let o = (possibleMoves.length - 1); (o + 1) > 0; o--) {
											if(this.beats(thirdBoardScore, possibleMoves[o]['score'], myTurn)){
												possibleMoves.splice(o, 1);
											}
										}
									}
									
									//thirdBoard.debug();
									
									//UNDO THIRD MOVE
									thirdBoard.undo();
								}
							}
						
						}
						
						//secondBoard.debug();
						
						//UNDO SECOND MOVE
						secondBoard.undo();
					}
				}
				
				
				//UNDO FIRST MOVE
				board.undo();
			}
		}
		
		//ARRAY UNIQUE, JS STYLE
		for (let i = (possibleMoves.length - 1); (i + 1) > 0; i--) {
			for (let j = (i + 1); j < possibleMoves.length; j++) {
				if (possibleMoves[j]['score'] === possibleMoves[i]['score'] && possibleMoves[j]['move'].piece.getName() === possibleMoves[i]['move'].piece.getName()){
					possibleMoves.splice(i, 1);
				}
			}
		}
		console.log(possibleMoves);
		
		return 'testing return value';
	
	}
	
	//UTILITY FUNCTION THAT HANDLES THE FACT WHITE WANTS TO MAX WHILE BLACK WANTS TO MIN
	beats = function(newScore, scoreToBeat, colour){
		let beats = false;
		if(colour == 'white'){
			if(newScore > scoreToBeat){
				beats = true;
			}
		}else{
			if(newScore = scoreToBeat){
				beats = true;
			}
		}
		return beats;
	}
	
	//UTILITY FUNCTION THAT HANDLES THE FACT WHITE WANTS TO MAX WHILE BLACK WANTS TO MIN
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