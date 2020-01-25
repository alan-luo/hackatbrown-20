let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// generate colors
let colors = (function() {
	colorIndex = 0;
	fillArr = [
		"hsl(268,67,100)",
		"hsl(251,67,91)",
		"hsl(235,62,100)",
		"hsl(219,67,91)",
		"hsl(203,67,100)",
	];

	return ({
		background:"rgb(223,214,215)",
		stroke:"rgb(93,70,43)",
		fills:fillArr,
		getFill: function() {
			colorIndex = (colorIndex+1) % fillArr.length;
			return fillArr[colorIndex];
		},
		setIndex: function(index) {
			colorIndex = index % fillArr.length;
		},
		setRandomIndex: function() {
			colorIndex = parseInt(Math.round(Math.random()*fillArr.length));
		}
	});
})();


let components = [];

class Component {
	pos = {x:0, y:0, rot:0};
	// pos: {x:, y:}, args:{val1:, val2:, ...}
	constructor(pos, args) { 
		this.pos = pos;
	}

	update = function() {};
	draw = function() {};
	doDraw = function() {
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(this.pos.rot);
		this.draw();
		ctx.restore();
	};
}

class Box extends Component {
	width = 0;
	constructor(pos, args) {
		super(pos, {});
		this.width=args.width;
	}
	draw = function() {
		ctx.fillRect(0, 0, this.width, this.width);
	}


}
/** usage: adds the list of vertices to the working path
  - vertices: [{x:, y:,}, {x:, y:,}, ...]
  - disp: {x:, y:,} displacement from origin
  - closed: bool (when true, adds first vertex to end of path)

  - note: doesn't fill or draw anything (do this yourself) 
**/
function makePath(vertices, disp, closed) {
	ctx.save();
	ctx.translate(disp.x, disp.y);

	ctx.beginPath();
	ctx.moveTo(vertices[0].x, vertices[0].y);

	for(let i=1; i<vertices.length; i++) {
		ctx.lineTo(vertices[i].x, vertices[i].y)
	} 
	if(closed) {
		let myV = vertices[vertices.length-1];
		ctx.lineTo(myV.x, myV.y);
	}
	ctx.restore();
}
class StackedQuads extends Component {
	quads = [];
	numQuads = 6;

	constructor(pos, args) {
		super(pos, {});
		this.numQuads = args.numQuads;

		for(let i=0; i<this.numQuads; i++) {
			let qWidth = 25;
			let qHeight = 35;
			this.quads.push({
				angle:(2*Math.PI/this.numQuads)*i,
				vertices: [
				 {x:0, y: 0},
				 {x:0+Math.random()*8-4, y: qHeight+Math.random()*8-4},
				 {x:qWidth+Math.random()*8-4, y: qHeight+Math.random()*8-4},
				 {x:qWidth+Math.random()*8-4, y: 0+Math.random()*8-4}
				],
			});
		}
	}
	draw = function() {
		colors.setIndex(0);
		for(let i=0; i<this.quads.length; i++) {
			let quad = this.quads[i];
			ctx.save();
			ctx.rotate(quad.angle);
			makePath(quad.vertices, true);
			ctx.fillStyle = colors.getFill();
			ctx.fill();
			ctx.restore();
		}
	}
}

class RandomShape extends Component {
	vertices = 0;
	xVal = null;
	yVal = null;
	endVert = 0;
	constructor(pos, args){
		super(pos, {});
		this.vertices = args.vertices;
		this.xVal = new Array(this.vertices);
		this.yVal = new Array(this.vertices);
		this.endVert = 4+Math.round(Math.random())*(this.vertices-5);

		for (let i = 0; i < this.vertices; i++) {
			let radius = 50 + Math.random()*30;
			this.xVal[i] = Math.cos((360*i/this.vertices)*Math.PI/180)*radius;
			this.yVal[i] = Math.sin((360*i/this.vertices)*Math.PI/180)*radius;
		}
		
	}
	update = function(){};
	draw = function(){

		ctx.beginPath();
		for (let j = 0; j < this.vertices; j++) {
			ctx.lineTo(this.xVal[j], this.yVal[j]);
		}
		ctx.closePath();
		ctx.stroke();

		// ctx.lineTo(this.xVal[Math.trunc(this.vertices/4)],this.yVal[Math.trunc(this.vertices/4)])
		// ctx.lineTo(this.xVal[Math.trunc(3*this.vertices/4)],this.yVal[Math.trunc(3*this.vertices/4)])


		ctx.beginPath();
		ctx.lineTo(this.xVal[0], this.yVal[0]);
		ctx.lineTo(this.xVal[2],this.yVal[2]);
		ctx.lineTo(this.xVal[this.endVert],this.yVal[this.endVert]);
		ctx.stroke();
		ctx.closePath();



		ctx.beginPath();
		ctx.lineTo(this.xVal[0], this.yVal[0]);
		for (let j = this.vertices-1; j >= this.endVert; j--){
			ctx.lineTo(this.xVal[j], this.yVal[j]);
		}
		ctx.lineTo(this.xVal[2],this.yVal[2]);
		ctx.lineTo(this.xVal[0], this.yVal[0]);
		ctx.closePath();
		ctx.fillStyle = colors.getFill();
		ctx.fill();

		ctx.beginPath();
		ctx.lineTo(this.xVal[0], this.yVal[0]);
		for (let j = 1; j <= 2; j++){
			ctx.lineTo(this.xVal[j], this.yVal[j]);
		}
		ctx.lineTo(this.xVal[0], this.yVal[0]);
		ctx.closePath();
		ctx.fillStyle = colors.getFill();
		ctx.fill();

		ctx.beginPath();
		ctx.lineTo(this.xVal[2], this.yVal[2]);
		for (let j = 3; j <= this.endVert; j++){
			ctx.lineTo(this.xVal[j], this.yVal[j]);
		}
		ctx.lineTo(this.xVal[2], this.yVal[2]);
		ctx.closePath();
		ctx.fillStyle = colors.getFill();
		ctx.fill();

	}
}

function setup() {
	ctx.translate(canvas.width/2, canvas.height/2);
	loop();
}

function loop() {
	// clear everything
	ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

	// update all states
	for(let idx in components) components[idx].update();

	// draw everything
	for(let idx in components) components[idx].doDraw();

	// do it again
	window.requestAnimationFrame(loop);
}

//components.push(makeComponent("box", {x:0, y:0}));
//components.push(new RandomShape({x:0, y: 0}, {vertices: 10}));
// components.push(new RandomShape({x:125, y: 125, rot: Math.PI/3}, {vertices: 8}));
// components.push(new RandomShape({x:10, y: -10, rot:Math.PI}, {vertices: 6}));

// components.push(new RandomShape({x:-200, y: 20, rot: Math.PI/6}, {vertices: 7}));
// components.push(new RandomShape({x:100, y: -200, rot: Math.PI/3}, {vertices: 5}));

// components.push(new Box({x:100, y:100, rot:Math.PI/4}, {width: 50}));

for(let i=0; i<5; i++) {
	for(let j=0; j<5; j++) {
		components.push(new StackedQuads({
			x:-canvas.width/2+(canvas.width/5)*i,
			y:-canvas.height/2+(canvas.height/5)*j, 
			rot:Math.random()*2*Math.PI
		}, {numQuads: Math.round(4+Math.random()*3)}));		
	}
}



setup();

