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
		this.resetFill();

		ctx.beginPath();
		for (let j = 0; j < this.vertices; j++) {
			ctx.lineTo(this.xVal[j], this.yVal[j]);
		}
		ctx.closePath();
		// ctx.stroke();

		// ctx.lineTo(this.xVal[Math.trunc(this.vertices/4)],this.yVal[Math.trunc(this.vertices/4)])
		// ctx.lineTo(this.xVal[Math.trunc(3*this.vertices/4)],this.yVal[Math.trunc(3*this.vertices/4)])


		ctx.beginPath();
		ctx.lineTo(this.xVal[0], this.yVal[0]);
		ctx.lineTo(this.xVal[2],this.yVal[2]);
		ctx.lineTo(this.xVal[this.endVert],this.yVal[this.endVert]);
		// ctx.stroke();
		ctx.closePath();



		ctx.beginPath();
		ctx.lineTo(this.xVal[0], this.yVal[0]);
		for (let j = this.vertices-1; j >= this.endVert; j--){
			ctx.lineTo(this.xVal[j], this.yVal[j]);
		}
		ctx.lineTo(this.xVal[2],this.yVal[2]);
		ctx.lineTo(this.xVal[0], this.yVal[0]);
		ctx.closePath();
		this.fill();

		ctx.beginPath();
		ctx.lineTo(this.xVal[0], this.yVal[0]);
		for (let j = 1; j <= 2; j++){
			ctx.lineTo(this.xVal[j], this.yVal[j]);
		}
		ctx.lineTo(this.xVal[0], this.yVal[0]);
		ctx.closePath();
		this.fill();

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
