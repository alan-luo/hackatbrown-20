class SquareEarring extends Component {
    width = 0;
    angle = 0;
    constructor(pos, args) {
		super(pos, {});
		this.width = args.width;
		this.angle = args.angle;
	}
	update = function(){};
	draw = function() {
		ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.width);
		let sin = Math.sin(this.angle)*this.width;
		let cos = Math.cos(this.angle)*this.width;
		//inner lines
		ctx.beginPath();
		ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + sin, this.pos.y + this.width);
        ctx.lineTo(this.pos.x + this.width, this.pos.y + sin);
        ctx.lineTo(this.pos.x + this.width - sin, this.pos.y)
        ctx.stroke();
	}
}