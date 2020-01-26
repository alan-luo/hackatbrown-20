let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// generate colors
let colors = (function() {
	centerHue = Math.random()*360;
	console.log(centerHue);
	colorIndex = 0;
	fillArr = [
		`hsl(${centerHue+50},40%,75%)`,
		`hsl(${centerHue+25},50%,50%)`,
		`hsl(${centerHue   },67%,75%)`,
		`hsl(${centerHue-25},67%,65%)`,
		`hsl(${centerHue-50},70%,50%)`,
	];

	return ({
		// background:`hsl(${centerHue}, 30%, 15%)`,
		background:"#EEEEE9",
		stroke:"rgb(36,70,43)",
		polys:'#C0C0C0',
		fills:fillArr,
		getFill: function() {
			colorIndex = (colorIndex+1) % fillArr.length;
			return fillArr[colorIndex];
		},
		setIndex: function(index) {
			colorIndex = index % fillArr.length;
		},
		getRandomIndex: function() {
			return parseInt(Math.floor(Math.random()*fillArr.length));
		},
		setRandomIndex: function() {
			colorIndex = parseInt(Math.floor(Math.random()*fillArr.length));
		}
	});
})();


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

function distSq(pt1, pt2) {
	return Math.pow(pt1.x-pt2.x, 2)+Math.pow(pt1.y-pt2.y, 2);
}
function dist(pt1, pt2) {
	return Math.sqrt(dist(pt1, pt2));
}