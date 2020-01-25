let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

console.log(canvas.width, canvas.height);

let components = [];
function makeComponent() {
	return ({
		props: {
			x: 100,
			y: 100,
		},
		draw: function() {

		},
	});
}


function setup() {
	loop();
}

function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for(let idx in components) {
		let component = components[idx];

		component.draw();
	}

	window.requestAnimationFrame(loop);
}

components.push(makeComponent());
setup();