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