class SquareEarring extends Component {
    width = 0;
    angle = 0;
    constructor(pos, args) {
		super(pos, {});
		this.width = args.width;
		this.angle = args.angle;
	}
	update = function() {
		// this.angle=Math.PI*0.5*Math.sin(this.frames*0.005);
	};
	draw = function() {
		ctx.save();
		ctx.translate(-this.width/2, -this.width/2);

	    this.resetFill();

	    ctx.beginPath();
		ctx.rect(0, 0, this.width, this.width);
		this.fill();

		let sin = Math.sin(this.angle)*this.width;
		let cos = Math.cos(this.angle)*this.width;

		//inner lines
		ctx.moveTo(0, 0);
        ctx.lineTo(sin, this.width);
        this.fill();

        ctx.lineTo(this.width, sin);
        this.fill();

        ctx.lineTo(this.width - sin, 0);

        // ctx.fillStyle = colors.getFill();
        this.fill();
        ctx.restore();
	}
}