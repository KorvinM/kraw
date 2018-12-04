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

    context.strokeStyle = getColor();
    context.lineWidth = getLineWidth();
    context.lineCap = "round";

    context.beginPath();
    context.moveTo(a, b);
    context.lineTo(c, d);
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
