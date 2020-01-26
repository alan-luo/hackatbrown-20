class SquareEarring extends Component {
    width = 0;
    angle = 0;

    orientation = 0;
    constructor(pos, args) {
		super(pos, {});
		this.width = args.width;
		this.angle = args.angle;

		this.orientation = Math.floor(Math.random()*4);
	}
	update = function() {
		// this.angle=Math.PI*0.5*Math.sin(this.frames*0.005);
	};
	draw = function() {
		ctx.save();
		// ctx.translate(-this.width/2, -this.width/2);
		ctx.rotate(Math.PI*0.5*this.orientation);

	    this.resetFill();

	    ctx.beginPath();
		ctx.rect(-this.width/2, -this.width/2, this.width, this.width);
		this.fill();

		let sin = Math.sin(this.angle)*this.width;
		let cos = Math.cos(this.angle)*this.width;

		//inner lines
		ctx.moveTo(-this.width/2, -this.width/2);
        ctx.lineTo(sin - this.width/2, this.width/2);
        this.fill();

        ctx.lineTo(this.width/2, sin - this.width/2);
        this.fill();

        ctx.lineTo(this.width/2 - sin, -this.width/2);

        // ctx.fillStyle = colors.getFill();
        this.fill();
        ctx.restore();
	}
}