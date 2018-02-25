$(document).ready(function(){

	var canvas = document.querySelector("canvas");
	var ctx = canvas.getContext("2d");

	document.addEventListener("mousedown", addCircle, false);

	var circles = [];
	const GRAVITY = 1;
	const FRICTION = 0.9;

	//returns the distance between two points
	function distance(x1, y1, x2, y2){
		var xDist = x2-x1;
		var yDist = y2-y1;

		return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
	}

	//the Circle object 
	function Circle(x, y, r) {
		this.x = x;
		this.y = y;
		this.velocity = {
			x: (Math.random() - 0.5),
			y: (Math.random() - 0.5)
		};
		this.r = r;
		this.mass = 1;
		this.bounce = 0;

		this.draw = function() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
			ctx.fillStyle = "red";
			ctx.fill();
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.closePath();
		}

		this.update = function() {		
			this.draw();

			for (var i=0; i<circles.length; i++){
				if (this === circles[i]) continue;
				if (distance (this.x, this.y, circles[i].x, circles[i].y) - (this.r + circles[i].r) < 0){
					resolveCollision(this, circles[i]);
					this.coll++;
					circles[i].coll++;
				}
			}

			//bouncing back at the edge of the canvas
			if(this.x+this.r > canvas.width || this.x - this.r < 0) {
				this.velocity.x = -this.velocity.x;
			}
			if(this.y+this.r+this.velocity.y > canvas.height) {
				this.velocity.y = -this.velocity.y * FRICTION;
				this.bounce++;
			} else {
				this.velocity.y += GRAVITY;
			}


			//taking new position 
			this.x += this.velocity.x;
			this.y += this.velocity.y;

			ctx.fillStyle = "blue";
			ctx.fillText(this.bounce, this.x, this.y);
		}
	}

	/**
	 * Rotates coordinate system for velocities
	 *
	 * Takes velocities and alters them as if the coordinate system they're on was rotated
	 *
	 * @param  Object | velocity | The velocity of an individual particle
	 * @param  Float  | angle    | The angle of collision between two objects in radians
	 * @return Object | The altered x and y velocities after the coordinate system has been rotated
	 */
	function rotate(velocity, angle) {
	    const rotatedVelocities = {
	        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
	        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
	    };

	    return rotatedVelocities;
	}

	/**
	 * Swaps out two colliding particles' x and y velocities after running through
	 * an elastic collision reaction equation
	 *
	 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
	 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
	 * @return Null | Does not return a value
	 */
	function resolveCollision(particle, otherParticle) {
	    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
	    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

	    const xDist = otherParticle.x - particle.x;
	    const yDist = otherParticle.y - particle.y;

	    // Prevent accidental overlap of particles
	    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

	        // Grab angle between the two colliding particles
	        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

	        // Store mass in var for better readability in collision equation
	        const m1 = particle.mass;
	        const m2 = otherParticle.mass;

	        // Velocity before equation
	        const u1 = rotate(particle.velocity, angle);
	        const u2 = rotate(otherParticle.velocity, angle);

	        // Velocity after 1d collision equation
	        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
	        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

	        // Final velocity after rotating axis back to original location
	        const vFinal1 = rotate(v1, -angle);
	        const vFinal2 = rotate(v2, -angle);

	        // Swap particle velocities for realistic bounce effect
	        particle.velocity.x = vFinal1.x;
	        particle.velocity.y = vFinal1.y;

	        otherParticle.velocity.x = vFinal2.x;
	        otherParticle.velocity.y = vFinal2.y;
	    }
	}

	function init(){
		var circR = 10 + Math.random() * 20;
		var circX = circR + Math.random() * (canvas.width-2*circR);
		var circY = circR + Math.random() * (canvas.height-2*circR) - 100;
		
		circles.push(new Circle(circX, circY, circR));
	}

	//function that runs every time the mouse is clicked on the canvas
	function addCircle(e){
		circR = 10 + Math.random() * 20;
		circles.push(new Circle(e.offsetX,e.offsetY,circR));
	}

	//requestAnimationFrame is called 60 times per second
	function animate(){

		requestAnimationFrame(animate);
		ctx.clearRect(0, 0, 480, 320);
		for (var i=0; i<circles.length; i++){
			circles[i].update();
		}
	}

	//creating the circles
	init();
	//calling the animate function
	animate();
	
});
