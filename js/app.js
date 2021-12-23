const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".js-colors__color");
const range = document.querySelector(".js-range");
const mode = document.querySelector(".buttons__fill");

const INITIAL_COLOR = "#2c2c2c";

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

ctx.strokeStyle = INITIAL_COLOR; // black
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let isPainting = false;
let isFilling = false;

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleModeClick() {
  if (isFilling) {
    isFilling = false;
    mode.innerText = "Fill";
  } else {
    isFilling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function stopPainting() {
  isPainting = false;
}

function startPainting() {
  if (!isFilling) {
    isPainting = true;
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (isPainting) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("click", handleCanvasClick);

mode.addEventListener("click", handleModeClick);

colors.forEach((color) => color.addEventListener("click", handleColorClick));
range.addEventListener("input", handleRangeChange);
