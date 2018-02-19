$(document).ready(function(){
 
	var canvas = document.querySelector("canvas");
	var ctx = canvas.getContext("2d");

	//initial coordinates of the circle center
	var x=100;
	var y=100;

	//boolean values
	//become true if the proper arrow key is pressed
	//then false again after it's released
	var LEFT, RIGHT, UP, DOWN;

	//the function drawing the circle
	function drawCircle(x, y, r){
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2, false);
		ctx.fillStyle = "red";
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
	//bigger change = higher speed
	function move() {
		if(LEFT) x--;
		if(RIGHT) x++;
		if(UP) y--;
		if(DOWN) y++;
	}

	//requestAnimationFrame is called 60 times per second
	//the animate function has to be inside of it
	function animate(){
		requestAnimationFrame(animate);
		move();
		ctx.clearRect(0, 0, 480, 320);
		drawCircle(x, y, 20);
	}

	//calling the animate function
	//keeps redrawing the canvas with the recent coordinates
	animate();
});
