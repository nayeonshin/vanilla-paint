const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#2c2c2c"; // black
ctx.lineWidth = 2.5;

let isPainting = false;

function stopPainting() {
  isPainting = false;
}

function startPainting() {
  isPainting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!isPainting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
