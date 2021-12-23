const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".js-colors__color");
const range = document.querySelector(".js-range");
const modeButton = document.querySelector(".js-buttons__fill");
const saveButton = document.querySelector(".js-buttons__save");

const INITIAL_COLOR = "#2c2c2c"; // black

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Sets initial canvas' background color to white
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
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

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "vanilla-paint";
  link.click();
}

function handleModeClick() {
  if (isFilling) {
    isFilling = false;
    modeButton.innerText = "Fill";
  } else {
    isFilling = true;
    modeButton.innerText = "Paint";
  }
}

function handleContextMenu(event) {
  event.preventDefault();
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
canvas.addEventListener("contextmenu", handleContextMenu);

modeButton.addEventListener("click", handleModeClick);
saveButton.addEventListener("click", handleSaveClick);

colors.forEach((color) => color.addEventListener("click", handleColorClick));
range.addEventListener("input", handleRangeChange);
