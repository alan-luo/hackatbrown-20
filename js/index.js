let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


let components = [];
function makeComponent(type, args) {
	if (type == "shape1"){
		
		let xVal = new Array(args.vertices);
		let yVal = new Array(args.vertices);


		for (let i = 0; i < args.vertices; i++) {
			let radius = 50 + Math.random()*100;
			xVal[i] = Math.cos((36*i)*Math.PI/180)*radius;
			yVal[i] = Math.sin((36*i)*Math.PI/180)*radius;
		}

		return({
			type: "shape1",
			props: args,
			update: function(){

			},
			draw: function(){

				ctx.beginPath();
				for (let j = 0; j < 10; j++) {
					ctx.lineTo(xVal[j], yVal[j]);
				}
				ctx.closePath();
				ctx.stroke();

			}
		})

	}
}
class Component {
	pos = {x:0, y:0};
	// pos: {x:, y:}, args:{val1:, val2:, ...}
	constructor(pos, args) { 
		this.pos = pos;
	}

	update = function() {};
	draw = function() {};
}

class Box extends Component {
	width = 0;
	constructor(pos, args) {
		super(pos, {});
		this.width=args.width;
	}
	draw = function() {
		ctx.fillRect(this.pos.x, this.pos.y, this.width, this.width);
	}


}
/** usage: adds the list of vertices to the working path
  - vertices: [{x:, y:,}, {x:, y:,}, ...]
  - closed: bool (when true, adds first vertex to end of path)

  - note: doesn't fill or draw anything (do this yourself) 
**/
function makePath(vertices, closed) {
	ctx.beginPath();
	ctx.moveTo(vertices[0].x, vertices[0].y);

	for(let i=1; i<vertices.length; i++) {
		ctx.lineTo(vertices[i].x, vertices[i].y)
	} 
	if(closed) {
		let myV = vertices[vertices.length-1];
		ctx.lineTo(myV.x, myV.y);
	}
}
class PolyBlob extends Component {
	// outerVerts = [];
	// innerVerts = [];
	// polys = [];

	constructor(pos, args) {
		super(pos, {});

		this.outerVerts = [];
		this.innerVerts = [];
		this.polys = [];

		let numVerts = 7;
		for(let i=0; i<numVerts; i++) {
			let angle = (2*Math.PI / numVerts)*i;
			this.outerVerts.push({
				x: 50*Math.cos(angle),
				y: 50*Math.sin(angle),
			});
		}
	}
	draw = function() {
		makePath(this.outerVerts, true);
		ctx.fill();
	}
}

class RandomShape extends Component {
	vertices = 0;
	xVal = null;
	yVal = null;
	constructor(pos, args){
		super(pos, {});
		this.vertices = args.vertices;
		this.xVal = new Array(this.vertices);
		this.yVal = new Array(this.vertices);


		for (let i = 0; i < this.vertices; i++) {
			let radius = 50 + Math.random()*100;
			this.xVal[i] = Math.cos((360*i/this.vertices)*Math.PI/180)*radius;
			this.yVal[i] = Math.sin((360*i/this.vertices)*Math.PI/180)*radius;
		}
		
	}
	update = function(){};
	draw = function(){

		ctx.beginPath();
		for (let j = 0; j < 10; j++) {
			ctx.lineTo(this.xVal[j], this.yVal[j]);
		}
		ctx.closePath();
		ctx.stroke();

	}

}


function setup() {
	ctx.translate(canvas.width/2, canvas.height/2);
	loop();
}

function loop() {
	// clear everything
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// update all states
	for(let idx in components) components[idx].update();

	// draw everything
	for(let idx in components) components[idx].draw();

	// do it again
	window.requestAnimationFrame(loop);
}

components.push(new PolyBlob({x:-100, y:-100}, {width: 50}));
components.push(new RandomShape({x:0, y: 0}, {vertices: 10}));
// components.push(new Box({x:0, y:0}, {width: 50}));
setup();