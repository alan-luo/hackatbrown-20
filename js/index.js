let components = [];
let bg_components = [];


handState = "nothing";
hand = {
	pos: {x:0, y:0, z:0},
	vel: {x:0, y:0, z:0},
	pinch: -1,
}

mouseState = "nothing";
mouse = { x: 0, y: 0, down:true};
$("#canvas").mousemove(function(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
});

function makeRandom(pos) {
	var whichThing = Math.floor(Math.random()*3);
	// var whichThing = 1;

	if(whichThing == 0) {
		return new RandomShape(pos, {vertices:5+Math.floor(Math.random()*3)});
	} else if (whichThing == 1) {
		return new SquareEarring(pos, {angle:Math.PI*2*((0.5+Math.random())/12), width:50+Math.random()*20});
	} else if (whichThing == 2) {
		return new StackedQuads(pos, {numQuads:5+Math.floor(Math.random()*2)});
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
	ctx.translate(canvas.width/2, canvas.height/2);

	ctx.save();
	
	for (i = -canvas.width; i < canvas.width; i += 60){
		for (j = -canvas.height; j < canvas.height; j+=60){
			if(Math.random()>0.3) {
				bg_components.push(new BackgroundShape({x: i, y: j, rot: Math.random()*2*Math.PI}, {sides: 3+ Math.trunc(Math.random()*7)}));
			}
		}
	}

	// for(x=-200; x<200; x+=40) {
	// 	for(y=-200; y<200; y+=40) {
	// 		components.push(new SquareEarring({x:x, y:y, rot:0}, {width:30, angle:(1/12)*2*Math.PI}));
	// 	}
	// }

	loop();
}

$("#canvas").mousedown(function() {
	mouse.down = true;
});
$("#canvas").mouseup(function() {
	mouse.down = false;
});

function loop() {

	// clear everything
	ctx.fillStyle=colors.background;
	ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

	// update all states
	for(let idx in bg_components) bg_components[idx].update();
	for(let idx in components) components[idx].update();


	// resolve click actions
	if(mouseState == "clicking") {
	
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
		
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(hand.pos.x, hand.pos.y, 5, 0, 2*Math.PI);
	ctx.fill();

	// leap motion debug
	debug();

	// do it again
	window.requestAnimationFrame(loop);

}
mouse = { x: 0, y: 0};
$("#canvas").mousemove(function(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
});




// components.push(new RandomShape({x:125, y: 125, rot: Math.PI/3}, {vertices: 8}));
// components.push(new RandomShape({x:10, y: -10, rot:Math.PI}, {vertices: 6}));

// components.push(new StackedQuads({x:0, y:0, rot:0}, {numQuads: 5}));
// components.push(makeRandom({x: 0, y: 0, rot: 0}));
// components.push(makeRandom({x: 0, y: 100, rot: 0}));
// components.push(makeRandom({x: 0, y: -100, rot: 0}));

setup();

// --- leap motion --------------



let controllerOptions = {enableGestures: true};


Leap.loop(controllerOptions, function(frame) {
	// if (paused) return; // skip this update

	if(frame.hands.length > 0) {
		let myHand = frame.hands[0];

		hand.pos.x += myHand.palmVelocity[0] / 50;
		hand.pos.z += myHand.palmVelocity[1] / 50;
		hand.pos.y += myHand.palmVelocity[2] / 50;

		// hand.pos.x = myHand.palmVelocity[0];
		// hand.pos.z = myHand.palmVelocity[1];
		// hand.pos.y = myHand.palmVelocity[2];

		hand.pinch = myHand.pinchStrength;
		// myVel = hand.palmVelocity;
	}

});
