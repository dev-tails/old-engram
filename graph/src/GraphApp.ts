const dpr = window.devicePixelRatio || 1;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

window.addEventListener("resize", resizeCanvas, false);
resizeCanvas();

function resizeCanvas() {
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
}

const ctx = canvas.getContext("2d");

canvas.addEventListener(
  "click",
  (e) => {
    const x = e.clientX / dpr;
    const y = e.clientY / dpr;
    ctx.fillRect(x - 2, y - 2, 4, 4);
    ctx.fillText("test", x, y - 10)
  },
  false
);
