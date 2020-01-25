let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// generate colors
let colors = (function() {
	colorIndex = 0;
	fillArr = [
		"hsl(255,67%,100%)",
		"hsl(251,67%,91%)",
		"hsl(235,62%,100%)",
		"hsl(219,67%,91%)",
		"hsl(203,67%,100%)",
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
		getRandomIndex: function() {
			return parseInt(Math.round(Math.random()*fillArr.length));
		},
		setRandomIndex: function() {
			colorIndex = parseInt(Math.round(Math.random()*fillArr.length));
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