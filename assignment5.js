var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
canvas.width = parseInt(document.getElementById('paint').clientWidth);
canvas.height = parseInt(document.getElementById('paint').clientHeight);

var mouse = {x: 0, y: 0};

canvas.addEventListener('mousemove', function(e) {
	mouse.x = e.pageX - this.offsetLeft;
	mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = "black";

canvas.addEventListener('mousedown', function(e)
{
	if(document.getElementById('solidLine').checked)
	{
		ctx.beginPath();
		ctx.arc(mouse.x, mouse.y, 1, 0, 2 * Math.PI, true); // no easy way to paint a solid dot on click. This will do it.
		ctx.stroke();
		ctx.moveTo(mouse.x, mouse.y);
		
		canvas.addEventListener('mousemove', onPaint, false);
	}
}, false);

canvas.addEventListener('mouseup', function()
{
	if(document.getElementById('solidLine').checked)
	{
		canvas.removeEventListener('mousemove', onPaint, false);
	}
}, false);

var onPaint = function()
{
	ctx.lineTo(mouse.x, mouse.y);
	ctx.stroke();
};


/* canvas.addEventListener('mousedown', function(e)
{
if(document.getElementById('squareBrush').checked)
  {
    ctx.beginPath();
	ctx.fillRect(mouse.x,mouse.y,20,20);
	ctx.stroke();
    ctx.moveTo(mouse.x, mouse.y);
	
    canvas.addEventListener('mousemove', onPaint, false);
  }
}, false);

canvas.addEventListener('mouseup', function()
{
if(document.getElementById('squareBrush').checked)
{
  canvas.removeEventListener('mousemove', onPaint, false);
}

}, false);
*/

function erase() {
    var confirmErase = confirm('Do you really want to clear your masterpiece?');
		if (confirmErase)      
			ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function eraser()
{  
	ctx.strokeStyle = document.getElementById("myCanvas").style.backgroundColor;
	ctx.globalCompositeOperation = "destination-out";
}

function colorChange(color)
{
	ctx.globalCompositeOperation = "source-over";
	ctx.strokeStyle = color;
	localStorage.setItem('color', color);

}

function changeSize(size)
{
	ctx.lineWidth = size;
	localStorage.setItem('size', size)
}

function chooseColor1(color1)
{
	ctx.globalCompositeOperation = "source-over"; // set drawing mode to default
	ctx.strokeStyle = color1;
	localStorage.setItem('color1', color1);
}

if(localStorage.getItem('size'))  // stores brush size to local storage
{
	document.getElementById('brushSize').value = localStorage.getItem('size');
	ctx.lineWidth = localStorage.getItem('size');
}

if(localStorage.getItem('color')) // stores radio box color to local storage
{
	var x = localStorage.getItem('color');
	ctx.strokeStyle = x;
}

if(localStorage.getItem('color1')) // stores color 1 to local storage
{
	document.getElementById('chosenColor1').value = localStorage.getItem('color1');
	ctx.strokeStyle = localStorage.getItem('color1');
}