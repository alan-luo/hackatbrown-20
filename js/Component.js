class Component {
	pos = {x:0, y:0, rot:0};
	vel = {x:0, y:0, rot:0};
	acc = {x:0, y:0, rot:0};

	startIndex = 0;
	colorIndex = 0;
	// pos: {x:, y:}, args:{val1:, val2:, ...}
	constructor(pos, args) { 
		this.pos = pos;
		this.startIndex = colors.getRandomIndex();
	}

	update = function() {
		this.pos.x+=this.vel.x; 
		this.pos.y+=this.vel.y;
		this.pos.rot+=this.vel.rot;

		this.vel.x+=this.acc.x; 
		this.vel.y+=this.acc.y;
		this.vel.rot+=this.acc.rot;
	};
	draw = function() {};
	doDraw = function() {
		ctx.save();

		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(this.pos.rot);
		this.draw();
		
		ctx.restore();
	};

	resetFill = function() {
		this.colorIndex = this.startIndex;
		colors.setIndex(this.colorIndex);
	};
	fill = function() {
		ctx.fillStyle = colors.getFill();
		ctx.fill();
	};
}

class Box extends Component {
	width = 50;
	constructor(pos, args) {
		super(pos, {});
		this.width=args.width;
	}
	draw = function() {
		this.resetFill();
		ctx.rect(0, 0, this.width, this.width);
		this.fill();
	}
}

class BackgroundShape extends Component {
	size = 4;
	sides = 0;
	inAngle = 0;
	xVert = null;
	yVert = null;
	// angularVel = 0.7;
	// angularAccel = +0.2;
	angularVel = 0;
	angularAccel = 0;
	constructor(pos, args){
		super(pos, {});
		this.sides = args.sides;
		this.inAngle = 2*Math.PI/this.sides;
		this.xVert = new Array(this.sides);
		this.yVert = new Array(this.sides);
		

		for (let i = 0; i < this.sides; i++){
			this.xVert[i] = this.size*(Math.cos(i*this.inAngle));
			this.yVert[i] = this.size*(Math.sin(i*this.inAngle));
		}

	}
	update = function() {

		
		for (let i = 0; i < this.sides; i++){
			this.xVert[i] = this.size*(Math.cos(i*this.inAngle+this.angularVel));
			this.yVert[i] = this.size*(Math.sin(i*this.inAngle+this.angularVel));
		}

		this.angularVel = this.angularVel + this.angularAccel; 
		this.angularAccel = this.angularAccel - 0.002;
		if (this.angularVel <= 0){
			this.angularVel = 0;
			this.angularAccel = 0;
		}
		// if (this.size > 10){
		// 	this.size = this.size - 1;
		// } else if (this.size < 0){
		// 	this.sides = 3+Math.trunc(Math.random()*7);
		// 	this.size = this.size + 0.01;
		// } else {
		// 	this.size = this.size + 0.01;
		// }
	}
	draw = function() {

		ctx.beginPath();
		for (let i = 0; i < this.sides; i++){
			ctx.lineTo(this.xVert[i], this.yVert[i]);
		}
		ctx.closePath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = colors.polys;	
		ctx.stroke();
	}

}