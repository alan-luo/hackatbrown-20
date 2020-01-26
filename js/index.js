let components = [];
let bg_components = [];


let handState = "nothing";
let hand = {
	pos: {x:0, y:0, z:0},
	vel: {x:0, y:0, z:0},
	pinch: -1,
}

let mouseState = "nothing";
let mouse = { 
	pos: {x: 0, y: 0}, 
	down:false 
};

$("#canvas").mousemove(function(e) {
	mouse.pos.x = e.pageX;
	mouse.pos.y = e.pageY;
});

spawnState = "default";

function makeRandom(pos) {
	let i = Math.trunc(Math.random()*3);

	if (i == 0){
		return (new SquareEarring(pos, {width:20, angle:(1/6)*Math.PI} ));
	} else if (i == 1){
		return (new StackedQuads(pos, {numQuads:5, size:12} ));
	} else {
		return (new RandomShape(pos, {vertices:3+Math.trunc(Math.random()*4), angle:(1/6)*Math.PI} ));
	}
}

let canv = $("#canvas");
function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// canv.attr('width',$('body').width());
	// canv.attr('height',$('body').height());
}
function debug() {
	$("#data-velocity").text(JSON.stringify(hand.vel));
	$("#data-position").text(JSON.stringify(hand.pos));
	$("#data-pinch").text(hand.pinch);

}
function setup() {
	resize();
	console.log(canvas.width, canvas.height);;

	ctx.save();
	
	for (i = 0; i < canvas.width; i += 60){
		for (j = 0; j < canvas.height; j+=60){
			if(Math.random()>0.3) {
				bg_components.push(new BackgroundShape({x: i, y: j, rot: Math.random()*2*Math.PI}, {sides: 3+ Math.trunc(Math.random()*4)}));
			}
		}
	}

	loop();
}

$("#canvas").mousedown(function() {
	mouse.down = true;
});
$("#canvas").mouseup(function() {
	mouse.down = false;
});



mySpawn = [];
lastSpawn = {x:-1000, y:-1000};

function loop() {

	// clear everything
	ctx.fillStyle=colors.background;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// update all states
	for(let idx in bg_components) bg_components[idx].update();
	for(let idx in components) components[idx].update();


	// resolve click actions
	if(spawnState == "default") {
		if(mouse.down) {
			spawnState = "spawning"
		}
	} else if(spawnState == "spawning") {
		if(!mouse.down) { //create the thing

		} else { // keep spawning
			if(distSq(lastSpawn, mouse.pos) > 900) {
				mySpawn.push(makeRandom({
					x:mouse.pos.x,
					y:mouse.pos.y,
					rot:Math.atan2(mouse.pos.y-lastSpawn.y, mouse.pos.x-lastSpawn.x),
				}));
				lastSpawn = {x:mouse.pos.x, y:mouse.pos.y};
				
			}
		}
	}

	// resolve actions
	// if(handState == "nothing") {
	// 	if(hand.pinch > 0.7) {
	// 		handState = "pinching";
	// 		components.push(new StackedQuads({x:0, y:0, rot:0}, {numQuads: 5}));
	// 	}
	// } else if(handState == "pinching") {
	// 	components[components.length-1].pos.x = hand.pos.x;
	// 	components[components.length-1].pos.y = hand.pos.y;	
	// 	if(hand.pinch < 0.2) {
	// 		handState = "nothing";
	// 	}
	// }

	// draw everything
	for(let idx in bg_components) bg_components[idx].doDraw();
	for(let idx in components) components[idx].doDraw();

	for(let idx in mySpawn) mySpawn[idx].doDraw();
		
	// ctx.fillStyle = "red";
	// ctx.beginPath();
	// ctx.arc(hand.pos.x, hand.pos.y, 5, 0, 2*Math.PI);
	// ctx.fill();

	// leap motion debug
	debug();

	// do it again
	window.requestAnimationFrame(loop);
	
}




// components.push(new RandomShape({x:125, y: 125, rot: Math.PI/3}, {vertices: 8}));
// components.push(new RandomShape({x:10, y: -10, rot:Math.PI}, {vertices: 6}));

// components.push(new StackedQuads({x:0, y:0, rot:0}, {numQuads: 5}));
// components.push(makeRandom({x: 0, y: 0, rot: 0}));
// components.push(makeRandom({x: 0, y: 100, rot: 0}));
// components.push(makeRandom({x: 0, y: -100, rot: 0}));

setup();

// --- leap motion --------------



let controllerOptions = {enableGestures: true};


// Leap.loop(controllerOptions, function(frame) {
// 	// if (paused) return; // skip this update

// 	if(frame.hands.length > 0) {
// 		let myHand = frame.hands[0];

// 		hand.pos.x += myHand.palmVelocity[0] / 50;
// 		hand.pos.z += myHand.palmVelocity[1] / 50;
// 		hand.pos.y += myHand.palmVelocity[2] / 50;

// 		// hand.pos.x = myHand.palmVelocity[0];
// 		// hand.pos.z = myHand.palmVelocity[1];
// 		// hand.pos.y = myHand.palmVelocity[2];

// 		hand.pinch = myHand.pinchStrength;
// 		// myVel = hand.palmVelocity;
// 	}

// });
