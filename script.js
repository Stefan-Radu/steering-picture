
function animationLoop() {

  let timeStamp = timestamp();
  let delta = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  if (circlesLastIndex) {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let i = 0;
    while (i <= circlesLastIndex) {

      circles[i].update(delta);

      if (circles[i].isDone()) {
        [circles[i], circles[circlesLastIndex]] = [circles[circlesLastIndex], circles[i]];
        -- circlesLastIndex;
        continue;
      }

      ++ i;
    }

    for (circle of circles) {
      circle.display();
    }
  }

  window.requestAnimationFrame(animationLoop);
}

function init() {

  canvas = document.getElementById("canv");
  ctx = canvas.getContext("2d");

  fixDpi();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let imgUrl = document.getElementById("imgUrl");
  imgUrl.addEventListener("change", () => {
    updateImage(imgUrl.value);
  });

  window.addEventListener("resize", () => {
    fixDpi();
    updateImage(imgUrl.value);
  });

  initPoints();
}

function initPoints() {
  circles = [];
  let target = null;
  for (let i = 0; i < CIRCLE_CNT; ++ i) {
    target = new Vector2d(randInt(canvas.width), randInt(50) + canvas.height - 50);
    let c = new Circle(target);
    c.position = target;
    circles.push(c);
  }
  circlesLastIndex = circles.length - 1;
}

function updateImage(url) {
  
  if (typeof(url) != 'string') {
    console.log('not a string');
    return;
  }

  let img = new Image();
  img.crossOrigin = "anonymous";

  img.onload = function() {

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    for (circle of circles) {
      let pos = new Vector2d(randInt(canvas.width), randInt(canvas.height));
      let pixel = ctx.getImageData(pos.x, pos.y, 1, 1).data;
      while (brightness(pixel) < 17) {
        pos = new Vector2d(randInt(canvas.width), randInt(canvas.height));
        pixel = ctx.getImageData(pos.x, pos.y, 1, 1).data;
      }
      circle.target = pos;
      circle.targetColor = pixel;
    }

    circlesLastIndex = circles.length - 1;
  };

  img.src = url;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.onload = function () {
  init();
  window.requestAnimationFrame(animationLoop);
}
