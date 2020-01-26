let components = [];


function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
function setup() {
	resize();
	console.log(canvas.width, canvas.height);;
	ctx.translate(canvas.width/2, canvas.height/2);

	loop();
}
function loop() {
	// clear everything
	ctx.fillStyle=colors.background;
	ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

	// update all states
	for(let idx in components) components[idx].update();

	// draw everything
	for(let idx in components) components[idx].doDraw();


	// do it again
	window.requestAnimationFrame(loop);

}
mouse = { x: 0, y: 0};
$("#canvas").mousemove(function(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
});



for (i = 10; i < canvas.width; i += 20){
	for (j = 10; j < canvas.height; j+=20){
		components.push(new BackgroundShape({x: i, y: j, rot: Math.random()*2*Math.PI}, {sides: 3+ Math.trunc(Math.random()*7)}));
	}
}



components.push(new BackgroundShape({x:0, y: 0}, {sides: 4}));
components.push(new BackgroundShape({x:100, y: 100}, {sides: 5}));
components.push(new BackgroundShape({x:-100, y: -100}, {sides: 6}));


// components.push(new RandomShape({x:125, y: 125, rot: Math.PI/3}, {vertices: 8}));
// components.push(new RandomShape({x:10, y: -10, rot:Math.PI}, {vertices: 6}));

// components.push(new RandomShape({x:-200, y: 20, rot: Math.PI/6}, {vertices: 7}));
// components.push(new RandomShape({x:100, y: -200, rot: Math.PI/3}, {vertices: 5}));
// components.push(new SquareEarring({x:100, y:100, rot: Math.PI/3}, {width: 50, angle: Math.PI/9}));



// for(let i=0; i<5; i++) {
// 	for(let j=0; j<5; j++) {
// 		components.push(new StackedQuads({
// 			x:-canvas.width/2+(canvas.width/5)*i,
// 			y:-canvas.height/2+(canvas.height/5)*j, 
// 			rot:Math.random()*2*Math.PI
// 		}, {numQuads: Math.round(4+Math.random()*3)}));		
// 	}
// }



setup();

