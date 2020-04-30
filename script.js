let last = 0;

function animationLoop() {

  let timeStamp = timestamp();
  let delta = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  if (last) {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let i = 0;
    while (i <= last) {

      circles[i].update(delta);

      if (circles[i].isDone()) {
        [circles[i], circles[last]] = [circles[last], circles[i]];
        -- last;
        continue;
      }

      ++ i;
    }

    for (circle of circles) {
      circle.display();
    }
  }

  console.log(navigator.hardwareConcurrency)

  window.requestAnimationFrame(animationLoop);
}

function init() {

  canvas = document.getElementById("canv");
  ctx = canvas.getContext("2d");

  fixDpi();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  window.addEventListener("resize", () => {
    fixDpi();
  });
}

function initPoints() {

  let img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 15000; ++ i) {
      let pos = new Vector2d(randInt(canvas.width), randInt(canvas.height));
      let pixel = ctx.getImageData(pos.x, pos.y, 1, 1).data;
      while (brightness(pixel) < 17) {
        pos = new Vector2d(randInt(canvas.width), randInt(canvas.height));
        pixel = ctx.getImageData(pos.x, pos.y, 1, 1).data;
      }

      circles.push(new Circle(pos, colorFromPixel(pixel), canvas));
    }

    last = circles.length - 1;
  };

  img.src = "";

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.onload = function () {

  init();
  initPoints();

  window.requestAnimationFrame(animationLoop);
}
