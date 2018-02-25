$(document).ready(function(){
 
	var canvas = document.querySelector("canvas");
	var ctx = canvas.getContext("2d");

	//circle starting
	var c = new Circle(200,200,20);

	//friction stops the circle from moving infinitely (1 equals NO FRICTION)
	const FRICTION = 0.95;

	//returns with a rounded number (precision = numbers after comma)
	function precisionRound(number, precision) {
 		var factor = Math.pow(10, precision);
  		return Math.round(number * factor) / factor;
	}

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
			x: 0,
			y: 0
		};
		this.r = r;
		this.mass = 1;

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

			//taking new position 
			this.x += this.velocity.x*0.5;
			this.y += this.velocity.y*0.5;

		}
	}

	//new way of controlling with the arrows
	var controller = {
		
		left: false,
		right: false,
		up: false,
		down: false,

		keyListener: function(event){

			var key_state = (event.type == "keydown")?true:false;
			switch(event.keyCode){
				case 37:
					controller.left = key_state;
				break;
				case 38:
					controller.up = key_state;
				break;
				case 39:
					controller.right = key_state;
				break;
				case 40:
					controller.down = key_state;
				break;
			}

		}
	}

	function move(){
		if (controller.left){
			c.velocity.x--;
		}
		if (controller.right){
			c.velocity.x++;
		}
		if (controller.up){
			c.velocity.y--;
		}
		if (controller.down){
			c.velocity.y++;
		}

		c.velocity.x *= FRICTION;
		c.velocity.y *= FRICTION;
	}

	function vectorCalc(){
		//displaying the actual coordinates
		ctx.fillStyle = "blue";
		ctx.fillText("x: "+precisionRound(c.x, 4), 400, 170);
		ctx.fillText("y: "+precisionRound(c.y, 4), 400, 180);

		//displaying the actual speed
		var roundX = precisionRound(c.velocity.x, 4);
		var roundY = precisionRound(c.velocity.y, 4);

		ctx.fillStyle = "blue";
		ctx.fillText("speed.x: "+roundX, 400, 200);
		ctx.fillText("speed.y: "+roundY, 400, 210);

		//displaying the normalized speed vectors
		var normX = roundX / distance (0, 0, roundX, roundY);
		var normY = roundY / distance (0, 0, roundX, roundY);

		ctx.fillText("norm.x: "+precisionRound(normX, 4), 400, 230);
		ctx.fillText("norm.y: "+precisionRound(normY, 4), 400, 240);

		//visualizing the vector direction on a unit circle
		ctx.beginPath();
		ctx.arc(415, 280, 15, 0, Math.PI*2, false);
		ctx.strokeStyle = "black";
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(415+normX*15, 280+normY*15, 5, 0, Math.PI*2);
		ctx.filStyle = "orange";
		ctx.fill();

		//visualizing the speed direction and size
		ctx.beginPath();
		ctx.moveTo(c.x,c.y);
		ctx.lineTo(c.x+(c.velocity.x)*5,c.y+(c.velocity.y)*5);
		ctx.strokeStyle = "green";
		ctx.stroke();
	}

	//requestAnimationFrame is called 60 times per second
	//the animate function has to be inside of it
	function animate(){
		requestAnimationFrame(animate);
		move();
		ctx.clearRect(0, 0, 480, 320);
		c.update();
		vectorCalc();
	}

	window.addEventListener("keydown", controller.keyListener);
	window.addEventListener("keyup", controller.keyListener);

	//calling the animate function
	//keeps redrawing the canvas with the recent coordinates
	animate();
});
