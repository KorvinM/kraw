var canvas, context, w, h,
    prevX = 0, currX = 0, prevY = 0, currY = 0,
    draw = false;

function init(){
  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");
  w = canvas.width;
  h = canvas.height;

  canvas.onpointermove = handlePointerMove;
  canvas.onpointerdown = handlePointerDown;
  canvas.onpointerup = stopDrawing;//*
  canvas.onpointerout = stopDrawing;//*these two lines could be combined?
  document.querySelector(".clear").onclick = clearCanvas;
}

function getColor() {
  return document.querySelector(".color").value;
}

function getLineWidth() {
  return document.querySelector("#line-width").value;
}

function getMode() {
  return document.querySelector("#mode").value;
}

function clearCanvas() {
    if (confirm("Are you sure you want to clear the canvas?")) {
        context.clearRect(0, 0, w, h);
    }
}

function drawLine() {
    var a = prevX,
        b = prevY,
        c = currX,
        d = currY;
    if (getMode()=="mirror"||getMode()=="mandala"){
	var a_ = a, 
	    b_ = h-b,
            c_ = c,
	    d_ = h-d;
	}

    context.strokeStyle = getColor();
    context.lineWidth = getLineWidth();
    context.lineCap = "round";

    context.beginPath();
    context.moveTo(a, b);
    context.lineTo(c, d);

    if (getMode()=="mirror"||getMode()=="mandala"){
	context.moveTo(a_, b_);
        context.lineTo(c_, d_);
	}
    if (getMode()=="mandala"){
	// Reassign values
    a_ = w-a; b_ = b;
    c_ = w-c; d_ = d;

    // Draw the 3rd line
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);

    // Reassign values
    a_ = w-a; b_ = h-b;
    c_ = w-c; d_ = h-d;

    // Draw the 4th line
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);

    // Reassign for 5
    a_ = w/2+h/2-b; b_ = w/2+h/2-a;
    c_ = w/2+h/2-d; d_ = w/2+h/2-c;

    //draw 5
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);

    // Reassign for 6
    a_ = w/2+h/2-b; b_ = h/2-w/2+a;
    c_ = w/2+h/2-d; d_ = h/2-w/2+c;

    //draw 6 
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);

    // Reassign for 7
    a_ = w/2-h/2+b; b_ = w/2+h/2-a;
    c_ = w/2-h/2+d; d_ = w/2+h/2-c;
    //draw 7 
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);

    // Reassign for 8
    a_ = w/2-h/2+b; b_ = h/2-w/2+a;
    c_ = w/2-h/2+d; d_ = h/2-w/2+c;
    //draw 8 
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);

}
    context.stroke();
    context.closePath();
}

function stopDrawing() {
    draw = false;
}//used by init when the pointer is not down (onpointerup) or is out of bounds (onpointerout)

function recordPointerLocation(e) {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
}//we have two coordinate spaces: browser window and canvas. This function converts between the two

function handlePointerMove(e) {
    if (draw) {
        recordPointerLocation(e);
        drawLine();
    }
}

function handlePointerDown(e) {
    recordPointerLocation(e);
    draw = true;
}
