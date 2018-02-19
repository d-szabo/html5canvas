$(document).ready(function(){
 
	var canvas = document.querySelector("canvas");
	
	//returning a drawing context 
	var ctx = canvas.getContext("2d");

	function drawCircle(){

		//starting to draw
		ctx.beginPath();

		//circle details: center x, y, radius, starting angle, finishing angle, counterclockwise boolean
		ctx.arc(40, 40, 20, 0, Math.PI*2, false);

		//add a border around the circle
		ctx.stroke();

		//setting the filling color
		ctx.fillStyle = "red";

		//filling the circle with that color
		ctx.fill();
	}

	function drawRect(){

		//without this line the circle will be blue as well
		ctx.beginPath();

		//x, y coordinates of the upper left corner, width, height
		ctx.rect(200, 200, 200, 100);

		//creating the border around it (otherwise it's invisible)
		ctx.stroke();

		//setting the filling color
		ctx.fillStyle = "blue";

		//filling the circle with that color
		ctx.fill();
	}

	function drawLines() {

		//starting a new path
		ctx.beginPath();

		//gives the first point of the series
		ctx.moveTo(300,50);

		//the other points of the series
		ctx.lineTo(300,100);
		ctx.lineTo(330,100);
		ctx.lineTo(350,70);

		//choosing the color of the lines
		ctx.strokeStyle = "green";

		//actually drawing the lines
		ctx.stroke();
	}

	//calling the functions created above
	drawCircle();
	drawRect();
	drawLines();
	
});
