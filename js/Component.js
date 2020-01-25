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