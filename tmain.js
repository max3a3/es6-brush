import $ from "jquery";
import { onCanvasMouseDown } from "./components/mouse_handler";
import { initBrush } from "./components/brush_class";
import { initTransformModes } from "./symmetry";
import { _canvasWidth, _canvasHeight } from "./tconfig";

$("#description").html("<em>paper base class test</em>");
$("#sketch_container").html(
  `<canvas id="canvas" width="${_canvasWidth}" height="${_canvasHeight}"/>`
);

let _canvas;
let _context;
function initCanvas() {
  //_svg 			= new fabric.Canvas('svg');
  //_svg.setDimensions({width: _canvasWidth, height: _canvasHeight});

  _canvas = document.getElementById("canvas");
  _context = _canvas.getContext("2d");

  initBrush(_context);
  initTransformModes();
  // _context.svg = _svg;

  // todo this two not necessary as we already set the canvas attribute above
  _canvas.width = _canvasWidth; // see .html
  _canvas.height = _canvasHeight;

  _canvas.addEventListener("mousedown", onCanvasMouseDown, false);
  _canvas.addEventListener("touchstart", onCanvasTouchStart, false);
}

initCanvas();
function onCanvasTouchStart() {} // todo not yet
