$(document).ready(function(){
 
	var canvas = document.querySelector("canvas");
	var ctx = canvas.getContext("2d");

	//storing the attributes of a circle and a rectangle in variables
	var circleX = 100;
	var circleY = 100;
	var circleR = 20;
	var rectX = 200;
	var rectY = 200;
	var rectW = 200;
	var rectH = 50;

	var LEFT, RIGHT, UP, DOWN;

	//the function drawing the circle
	function drawCircle(x, y, r){
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2, false);
		ctx.fillStyle = "red";
		ctx.fill();
	}

	function drawRectangle(x, y, h, w){
		ctx.beginPath();
		ctx.rect(x, y, h, w);
		ctx.stroke();
		ctx.fillStyle = "blue";
		ctx.fill();
	}

	//event listener for arrow keys being pushed
	document.onkeydown = function(e) {
		if(e.keyCode == 37) LEFT = true;
		if(e.keyCode == 38) UP = true;
		if(e.keyCode == 39) RIGHT = true;
		if(e.keyCode == 40) DOWN = true;
	}

	//event listener for arrow keys being released
	document.onkeyup = function(e) {
		if(e.keyCode == 37) LEFT = false;
		if(e.keyCode == 38) UP = false;
		if(e.keyCode == 39) RIGHT = false;
		if(e.keyCode == 40) DOWN = false;
	}

	//changing the circle coordinates according to which arrow key has been pushed
	function move() {
		if(LEFT) circleX--;
		if(RIGHT) circleX++;
		if(UP) circleY--;
		if(DOWN) circleY++;
	}

	function checkCollision(){
		//find the closest point to the circle within the rectangle
		var closestX = 0;
		if (circleX < rectX) { closestX = rectX; } else
		if (circleX > rectX+rectW) { closestX = rectX + rectW; } else
		{ closestX=circleX; }
		var closestY = 0;
		if (circleY < rectY) { closestY = rectY; } else
		if (circleY > rectY+rectH) { closestY = rectY + rectH; } else
		{ closestY=circleY; }
		
		//calculate distance between circle center and closest point
		var distanceX = circleX - closestX;
		var distanceY = circleY - closestY;

		//drawing a mini circle to the closest point
		drawCircle(closestX, closestY, 2);

		//drawing a triangle connecting circle center and closest point
		ctx.beginPath();
		ctx.moveTo(closestX,closestY);
		ctx.lineTo(circleX,closestY);
		ctx.lineTo(circleX,circleY);
		ctx.lineTo(closestX, closestY);
		ctx.strokeStyle = "green";
		ctx.stroke();

		//is the distance less than the radius?
		var distance = (distanceX*distanceX)+(distanceY*distanceY);
		if (distance < (circleR*circleR)) {
			drawCircle(10, 10, 10);
		}
	}

	//requestAnimationFrame is called 60 times per second
	function animate(){
		requestAnimationFrame(animate);
		move();
		ctx.clearRect(0, 0, 480, 320);
		drawCircle(circleX, circleY, circleR);
		drawRectangle(rectX, rectY, rectW, rectH);
		checkCollision();
	}

	//calling the animate function
	animate();
});
