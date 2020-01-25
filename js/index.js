let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


let components = [];
function makeComponent(type, myProps) {
	if(type == "box") { 
		return ({
			type: "box",
			props: myProps,
			draw: function() {
				ctx.fillRect(this.props.x, this.props.y, 50, 50);
			},
		});
	}
}

function setup() {
	ctx.translate(canvas.width/2, canvas.height/2);
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

components.push(makeComponent("box", {x:0, y:0}));
setup();