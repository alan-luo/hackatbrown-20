let components = [];
let bg_components = [];


let handState = "nothing";
let hand = {
	obj: null,
	// pos: {x:canvas.width/2, y:canvas.height/2, z:0},
	pos: {x:canvas.width/2, y:canvas.height/2},
	vel: {x:0, y:0, z:0},
	pinch: -1,
}
function leapToWorld(leapPos) {
	return { x: leapPos[0]*1.5+canvas.width/2,
		     y: leapPos[2]*1.5+canvas.height/2,
			 z: leapPos[1]
	};
}
function leapToWorldLocal(leapPos) {
	return { x: leapPos[0]*1.5,
		     y: leapPos[2]*1.5,
			 z: leapPos[1]
	};
}

let mouseState = "nothing";
let spawnType = 0;
let mouse = { 
	pos: {x: 0, y: 0}, 
	down:false 
};

$("#canvas").mousemove(function(e) {
	mouse.pos.x = e.pageX;
	mouse.pos.y = e.pageY;
});

spawnState = "default";
spawnSource = "mouse";

function makeSmol(i, pos) {
	if (i == 0){
		return (new SquareEarring(pos, {width:20, angle:(1/6)*Math.PI} ));
	} else if (i == 1){
		return (new StackedQuads(pos, {numQuads:5, size:12} ));
	} else {
		return (new RandomShape(pos, {vertices:5+Math.trunc(Math.random()*2), angle:(1/6)*Math.PI} ));
	}
}

function makeRandom(pos) {
	let i = Math.trunc(Math.random()*3);
	return makeSmol(i, pos);	
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



// mySpawn = [];
lastSpawn = {x:-1000, y:-1000};

spawns=[];
globalFrames = 0;
function loop() {
	globalFrames++;

	// clear everything
	ctx.fillStyle=colors.background;
	ctx.fillRect(0, 0, canvas.width, canvas.height);


	// update all states
	for(let idx in bg_components) bg_components[idx].update();
	for(let idx in components) components[idx].update();

	// resolve actions
	if(handState == "pinching") {
		if(hand.pinch < 0.2) {
			handState = "nothing";
		}
	}

	// resolve click actions
	if(spawnState == "default") {
		if(mouse.down) {
			spawnState = "spawning";
			spawnSource = "mouse";
			spawnType = Math.floor(Math.random()*3);
			spawns.push([]);
		}
		if(hand.pinch > 0.7) {
			handState = "pinching";
			spawnState = "spawning";
			spawnSource = "hand";
			spawnType = Math.floor(Math.random()*3);
			spawns.push([]);
			backgroundAnimate({x:mouse.pos.x, y:mouse.pos.y});

		}
	} else if(spawnState == "spawning") {
		if((spawnSource == "mouse" && !mouse.down) || (spawnSource=="hand" && handState=="nothing")) { //create the thing
			let mySpawn = spawns[spawns.length-1];

			for(let i=0; i<mySpawn.length; i++) {
				mySpawn[i].frozen = false;
			}
			if (mySpawn[0] != null){
				mySpawn[0].autonomous = true;
			}
			spawnState = "default";
		} else if((spawnSource=="mouse" && mouse.down) || (spawnSource=="hand" && handState=="pinching")) { // keep spawning
			if(spawnSource == "mouse") {
				if(distSq(lastSpawn, mouse.pos) > 80*80) {
					let mySpawn = spawns[spawns.length-1];
					let myComp = makeSmol(spawnType, {
						x:mouse.pos.x,
						y:mouse.pos.y,
						rot:Math.atan2(mouse.pos.y-lastSpawn.y, mouse.pos.x-lastSpawn.x),
					});
					if(mySpawn.length == 0) {
						myComp.hue = Math.random()*360;
					} else {
						myComp.hue = mySpawn[0].hue;
					}
					mySpawn.push(myComp);
					mySpawn[mySpawn.length-1].frozen = true;
					lastSpawn = {x:mouse.pos.x, y:mouse.pos.y};
				}
			} else if(spawnSource == "hand") {
				if(distSq(lastSpawn, hand.pos) > 80*80) {
					let mySpawn = spawns[spawns.length-1];
					let myComp = makeSmol(spawnType, {
						x:hand.pos.x,
						y:hand.pos.y,
						rot:Math.atan2(hand.pos.y-lastSpawn.y, hand.pos.x-lastSpawn.x),
					});
					if(mySpawn.length == 0) {
						myComp.hue = Math.random()*360;
					} else {
						myComp.hue = mySpawn[0].hue;
					}
					mySpawn.push(myComp);
					mySpawn[mySpawn.length-1].frozen = true;
					lastSpawn = {x:hand.pos.x, y:hand.pos.y};
				}
			}
		}
	}


	// update all states
	for(let idx in bg_components) bg_components[idx].update();
	for(let idx in components) components[idx].update();


	for(let i in spawns) {
		for(let j=0; j<spawns[i].length-1; j++) {
			let s1 = spawns[i][j];  
			let s2 = spawns[i][j+1];

			if(s1.frozen) break;

			let s1p = spawns[i][j].pos;
			let s2p = spawns[i][j+1].pos;

			// calculate distance between s1 and s2
			let d = dist({x:s1p.x, y:s1p.y}, {x:s2p.x, y:s2p.y});
			// console.log(d);
			// calculate displacement (positive or negative)
			let displc = 30-d;
			// calculate magnitude of force based on displacement
			let vec = { x:s2p.x-s1p.x, y:s2p.y-s1p.y};
			let len = dist({x:0, y:0}, vec);
			let vecNorm = {x: vec.x/len, y:vec.y/len};

			// force from s1 to s2
			let force = {x:vecNorm.x*displc*0.0001, y:vecNorm.y*displc*0.0001};

			// add force to acceleration
			s2.acc.x+=force.x; s2.acc.y+=force.y;
			// s1.acc.x-=force.x; s1.acc.y-=force.y;
		}
		for(let j in spawns[i]) spawns[i][j].update();
	}

	// draw everything
	for(let i in bg_components) bg_components[i].doDraw();
	for(let i in components) components[i].doDraw();

	for(let i in spawns) {
		if (spawns[i].length>0) colors.setHue(spawns[i][0].hue);
		for(let j=0; j<spawns[i].length-1; j++) {
			ctx.beginPath();
			ctx.moveTo(spawns[i][j].pos.x, spawns[i][j].pos.y);
			ctx.lineTo(spawns[i][j+1].pos.x, spawns[i][j+1].pos.y);
			ctx.strokeStyle = colors.getFill();
			ctx.stroke();
		}
		for(let j in spawns[i]) {
			spawns[i][j].doDraw()
		}
	}

	//draw leap hand
	if(hand.obj != null) {
		let fingers = hand.obj.fingers;

		ctx.strokeStyle="#000000";
		for(let i=0; i<fingers.length; i++) {
			let finger = fingers[i];

			let p1 = leapToWorld(finger.carpPosition);
			let p2 = leapToWorld(finger.mcpPosition);
			let p3 = leapToWorld(finger.pipPosition);
			let p4 = leapToWorld(finger.dipPosition);

			ctx.save();
			let scaleFactor = 1+hand.pos.z*0.01;
			// ctx.scale(scaleFactor, scaleFactor);

			let defLineWidth = ctx.lineWidth;
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.lineWidth="4"; ctx.stroke();
			ctx.lineTo(p3.x, p3.y);
			ctx.lineWidth="2"; ctx.stroke();
			ctx.lineTo(p4.x, p4.y);
			ctx.lineWidth="1"; ctx.stroke();
			ctx.lineWidth = defLineWidth;

			ctx.restore();
		}
	}

	// leap motion debug
	debug();

	// do it again
	window.requestAnimationFrame(loop);

}

function explodeFrom(center) {
	for(i in spawns) {
		for(j in spawns[i]) {

			let mySpawn = spawns[i][j];
			let myPos = {x: mySpawn.pos.x, y: mySpawn.pos.y};
			//console.log(dist(center, myPos));
			if(dist(center, myPos)<300) {
				let vec = {x: myPos.x - center.x, y: myPos.y - center.y};
				let len = dist({x:0, y:0}, vec);
				let normVec = {x: vec.x/len, y: vec.y/len};
				//console.log(normVec);

				mySpawn.vel.x = normVec.x*50;
				mySpawn.vel.y = normVec.y*50;
			}
		}
	}
}

function backgroundAnimate(center) {
		for(i in bg_components) {

			let bg_Shape = bg_components[i];
			let myPos = {x: bg_Shape.pos.x, y: bg_Shape.pos.y};
			console.log(dist(center, myPos));
			if(dist(center, myPos)<100) {
				let vec = {x: myPos.x - center.x, y: myPos.y - center.y};
				let len = dist({x:0, y:0}, vec);
				let normVec = {x: vec.x/len, y: vec.y/len};
				console.log(normVec);

				bg_Shape.vel.x = normVec.x*10;
				bg_Shape.vel.y = normVec.y*10;
			}
		}
}

function swipe(direction) {
	for(i in spawns) {
		for(j in spawns[i]) {
			let mySpawn = spawns[i][j];
			mySpawn.vel.x = direction.x * 70;
			mySpawn.vel.y = direction.y * 70;
		}
	}	
}
$(document).keypress(function(e) {
	console.log(e.keyCode);
	if(e.keyCode == 120) explodeFrom({x:mouse.pos.x, y:mouse.pos.y});
	else if(e.keyCode == 119) swipe({x:0, y:-1});
	else if(e.keyCode == 115) swipe({x:0, y:1});
	else if(e.keyCode == 97) swipe({x:-1, y:0});
	else if(e.keyCode == 100) swipe({x:1, y:0});
})




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
		hand.obj = myHand;

		// hand.pos.x += myHand.palmVelocity[0] / 50;
		// hand.pos.z += myHand.palmVelocity[1] / 50;
		// hand.pos.y += myHand.palmVelocity[2] / 50;

		let handPos = leapToWorld(myHand.palmPosition);

		hand.pos.x = handPos.x;
		hand.pos.y = handPos.y;
		// hand.pos.z = handPos.z;

		hand.pinch = myHand.pinchStrength;
		// myVel = hand.palmVelocity;
	}

	if(frame.gestures.length>0) {
		frame.gestures.forEach(function(gesture){
			if(gesture.type == "circle") {
				
			} else if(gesture.type=="keyTap") {
              console.log("Key Tap Gesture");
              explodeFrom(hand.pos);
			} else if(gesture.type=="keyTap") {
			  console.log("Screen Tap Gesture");
			} else if(gesture.type=="screenTap") {

			} else if(gesture.type=="swipe") {
				var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
				//Classify as right-left or up-down
				if(isHorizontal){
				  if(gesture.direction[0] > 0){
				      swipeDirection = "right";
				      swipe({x:1, y:0});
				  } else {
				      swipeDirection = "left";
				      swipe({x:-1, y:0});
				  }
				} else { //vertical
				  if(gesture.direction[1] > 0){
				      swipeDirection = "up";
				      swipe({x:0, y:-1});
				  } else {
				      swipeDirection = "down";
				      swipe({x:0, y:1});
				  }                  
				}
	        }
	    });
	}

});
