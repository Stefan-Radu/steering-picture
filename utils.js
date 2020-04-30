function fixDpi() {
  let dpi = window.devicePixelRatio;
  let style_height = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
  let style_width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

  canvas.height = style_height * dpi;
  canvas.width = style_width * dpi;
  diagonal = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
}

function intToHex(val) {

  let ret = "";
  for (let bit = 4; bit >= 0; bit -= 4) {
    let aux = (val >> bit) & 15;
    if (aux < 10) ret += aux.toString();
    else {
      ret += String.fromCharCode(97 + aux - 10);
    }
  }

  return ret;
}

function brightness(pixel) {
  return (pixel[0] + pixel[1] + pixel[2]) / 3;
}

function colorFromPixel(pixel) {
  return '#' +
         `${intToHex(pixel[0])}` + 
         `${intToHex(pixel[1])}` + 
         `${intToHex(pixel[2])}` + 
         `${intToHex(188)}`; 
}

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function randInt(x) {
  return Math.floor(Math.random() * x);
}
