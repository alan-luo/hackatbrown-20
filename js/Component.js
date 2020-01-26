class Component {
	hue = 0;
	pos = {x:0, y:0, rot:0};
	vel = {x:0, y:0, rot:0};
	acc = {x:0, y:0, rot:0};

	startIndex = 0;
	colorIndex = 0;
	frozen = false;
	autonomous = false;
	ignorePointer = false;
	// pos: {x:, y:}, args:{val1:, val2:, ...}
	constructor(pos, args) { 
		this.pos = pos;
		this.startIndex = colors.getRandomIndex();
	}

	update = function() {
		if(this.frozen) return;
		if(this.autonomous) {
			let vec = {
				x:mouse.pos.x-this.pos.x,
				y:mouse.pos.y-this.pos.y,
			};
			if(hand.obj != null) {
				vec = {
					x:hand.pos.x-this.pos.x,
					y:hand.pos.y-this.pos.y,	
				}
			}
			// this.acc.x = 0; this.acc.y = 0;
			
			let len = dist({x:0, y:0}, vec);
			let normVec = {x: vec.x/len, y:vec.y/len};
			if(len > 250) {
				this.acc.x += normVec.x*0.015;
				this.acc.y += normVec.y*0.015;
			}

		}

		if(!this.ignorePointer) {
			let vec = {
				x:mouse.pos.x-this.pos.x,
				y:mouse.pos.y-this.pos.y,
			};
			if(hand.obj != null) {
				vec = {
					x:hand.pos.x-this.pos.x,
					y:hand.pos.y-this.pos.y,	
				}
			}
			let len = dist({x:0, y:0}, vec);
			let normVec = {x: vec.x/len, y:vec.y/len};
			if(len < 250) {
				this.acc.x -= normVec.x*0.015;
				this.acc.y -= normVec.y*0.015;
			}
		}
		// this.acc.x = 0; this.acc.y = 0;
		


		let goalAngle = Math.atan2(this.vel.y, this.vel.x);
		this.acc.rot+=(goalAngle-this.pos.rot)*0.00001;
		this.vel.rot*=0.99;
		this.acc.rot*=0.9;


		if(this.pos.x < -15) if(this.vel.x < 0) this.vel.x*=-1;
		if(this.pos.x > canvas.width+15) if(this.vel.x>0) this.vel.x*=-1;
		if(this.pos.y < -15) if(this.vel.y < 0) this.vel.y*=-1;
		if(this.pos.y > canvas.height+15) if(this.vel.y>0) this.vel.y*=-1;

		this.pos.x+=this.vel.x; 
		this.pos.y+=this.vel.y;
		this.pos.rot+=this.vel.rot;

		this.vel.x+=this.acc.x; 
		this.vel.y+=this.acc.y;
		this.vel.rot+=this.acc.rot;

		this.vel.x*=0.8; this.vel.y*=0.8;
		this.acc.x*=0.95; this.acc.y*=0.95;


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

	ignorePointer = true;
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