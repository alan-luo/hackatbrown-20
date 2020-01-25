let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


const [CANVAS_WIDTH, CANVAS_HEIGHT] = [800, 600];

let frames = 0;
function setup() {

	loop();
}
let range = document.getElementById('range');
function loop() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	let grd = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	grd.addColorStop(0, `hsl(${(range.value/100)*255}, 40%, 90%)`);
	grd.addColorStop(1, `hsl(${(range.value/100)*255}, 70%, 60%)`);
	// x++;

	ctx.fillStyle=grd;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


	window.requestAnimationFrame(loop);
}

setup();