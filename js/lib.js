let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// generate colors
let colors = (function() {
	centerHue = Math.random()*360;
	console.log(centerHue);
	colorIndex = 0;
	fillArr = [
		"hsl(" + (centerHue+40)+ ",67%,75%)",
		"hsl(" + (centerHue+20)+ ",67%,75%)",
		"hsl(" + centerHue+ ",62%,75%)",
		"hsl(" + (centerHue-20)+ ", 67%,75%)",
		"hsl(" + (centerHue-40)+ "164, 67%,75%)",
	];

	return ({
		// background:`hsl(${centerHue}, 30%, 15%)`,
		background:"#EEEEE9",
		stroke:"rgb(36,70,43)",
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