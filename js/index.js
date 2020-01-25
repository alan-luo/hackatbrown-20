let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


let components = [];
function makeComponent(myProps) {
	return ({
		type: "box",
		props: myProps,
		draw: function() {
			ctx.fillRect(this.props.x, this.props.y, 50, 50);
		},
	});
}

for(let i=0; i<10; i++) {
	myComponent = makeComponent({
		x:Math.random()*700,
		y:Math.random()*500
	});

	components.push(myComponent);
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