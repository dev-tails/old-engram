function setStyle(el: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
  for (const key of Object.keys(styles)) {
    el.style[key] = styles[key];
  }
}

type Point = {
  x: number;
  y: number;
};

const root = document.getElementById("root");
setStyle(root, {});

const content = document.createElement("div");
setStyle(content, {
  maxWidth: "960px",
  margin: "0 auto",
});

const container = document.createElement("div");
setStyle(container, {
  height: "400px",
  position: "relative",
});

const cropContainer = document.createElement("div");
setStyle(cropContainer, {
  display: "flex",
  width: "925px",
  height: "400px",
  overflow: "hidden",
});

let point = {
  x: 0,
  y: 0,
};

let scale = 1;

const cropImage = document.createElement("img");
setStyle(cropImage, {
  maxWidth: "100%",
  maxHeight: "100%",
  position: "absolute",
  margin: "auto",
  top: "0",
  bottom: "0",
  right: "0",
  left: "0",
});
cropImage.style.top = "0px";
cropImage.src =
  "https://valentinh.github.io/react-easy-crop/static/dog-26b9422dccf83dc4e809f679c0f2b78e.jpeg";

function updateImgTransform() {
  setStyle(cropImage, {
    transform: `translate(${point.x}px, ${point.y}px) scale(${scale})`,
  });
}
updateImgTransform();

cropContainer.append(cropImage);

const cropper = document.createElement("div");
setStyle(cropper, {
  position: "absolute",
  left: "50%",
  top: "50%",
  boxShadow: "0 0 0 9999em",
  color: "rgba(0, 0, 0, 0.5)",
  transform: "translate(-50%,-50%)",
  width: "533.33px",
  height: "400px",
});

cropContainer.append(cropper);

content.append(container);
container.append(cropContainer);
root.append(content);

function getMousePoint(e: MouseEvent) {
  return {
    x: Number(e.clientX),
    y: Number(e.clientY),
  };
}

let lastMousePoint: Point | null = null;
let isMoving = false;

function onMouseDown(e: MouseEvent) {
  e.preventDefault();
  isMoving = true;
  lastMousePoint = getMousePoint(e);
}

function onMouseUp(e: MouseEvent) {
  e.preventDefault();
  isMoving = false;
}

function onMouseMove(e: MouseEvent) {
  e.preventDefault();
  if (isMoving) {
    const newMousePoint = {
      x: e.clientX,
      y: e.clientY,
    };

    point = {
      x: point.x + newMousePoint.x - lastMousePoint.x,
      y: point.y + newMousePoint.y - lastMousePoint.y,
    };

    lastMousePoint = newMousePoint;
    updateImgTransform();
  }
}

function onMouseWheel(e: WheelEvent) {
  e.preventDefault();

  scale = scale - e.deltaY * 0.001;
  updateImgTransform();
}

document.addEventListener("wheel", onMouseWheel);
document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mouseup", onMouseUp);
document.addEventListener("mousemove", onMouseMove);
