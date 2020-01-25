let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


let components = [];
function makeComponent(type, args) {
	if(type == "box") { 
		return ({
			type: "box",
			props: args,
			draw: function() {
				ctx.fillRect(this.props.x, this.props.y, 50, 50);
			},
		});
	} else if (type == "shape1"){
		
		let xVal = new Array(args.vertices);
		let yVal = new Array(args.vertices);


		for (let i = 0; i < args.vertices; i++) {
			let radius = 50 + Math.random()*100;
			xVal[i] = Math.cos((36*i)*Math.PI/180)*radius;
			yVal[i] = Math.sin((36*i)*Math.PI/180)*radius;
		}

		return({
			type: "shape1",
			props: args,
			update: function(){

			},
			draw: function(){

				ctx.beginPath();
				for (let j = 0; j < 10; j++) {
					ctx.lineTo(xVal[j], yVal[j]);
				}
				ctx.closePath();
				ctx.stroke();

			}
		})
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

//components.push(makeComponent("box", {x:0, y:0}));
components.push(makeComponent("shape1", {x:0, y: 0, vertices: 10}));
setup();