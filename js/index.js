let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

console.log(canvas.width, canvas.height);

function makeComponent() {
	return {
		props: {
			x: 100,
			y: 100,
		},
		draw: function() {

		},
	}
}

function setup() {
	loop();
}

function loop() {
	ctx.clearRect(canvas.width, canvas.height);

	for(component in components) {
		component.draw();
	}

	window.requestAnimationFrame();
}

setup();