let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


let components = [];

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

class SquareEarring extends Box {
    angle = 0;
    reps = 0;
    constructor(pos, args) {
		super(pos, args);
		this.angle = args.angle;
		this.reps = args.reps;
	}
	draw = function() {
	    ctx.lineWidth = 4
		ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.width);
		//inner lines
		ctx.beginPath();
		for (i = 0; i < reps, i++){
		    ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x + this.width*.3, this.pos.y + this.width *.7);
		}


        ctx.moveTo(this.pos.x, this.pos.y + this.width *.6);
        ctx.lineTo(this.pos.x + this.width, this.pos.y + this.width);
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

components.push(new Box({x:0, y:0}, {width: 50}));
components.push(new SquareEarring({x:100, y:100}, {width: 50}, {angle: Math.PI / 6}));
setup();