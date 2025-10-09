class Pawn extends Piece {
	constructor(plane, type, colour){
		super(plane, type, colour);
	}
	plane;
	type;
	colour;
	moveset;
	
	draw = function(){
		
		console.log('pawn class draw method called');
		
		this.plane.lineWidth = 3;
		this.plane.beginPath();
		this.plane.arc(this.centreX, this.centreY, (squareSize / 4), 0, Math.PI * 2);
		this.plane.strokeStyle = 'black';
		this.plane.stroke();
		this.plane.fillStyle = this.contains.colour;
		this.plane.fill();
	}
}