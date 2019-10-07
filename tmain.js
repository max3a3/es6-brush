import $ from "jquery";
import { onCanvasMouseDown } from "./components/mouse_handler";
import { initBrush } from "./components/brush_class";

$("#description").html("<em>paper base class test</em>");
$("#sketch_container").html('<canvas id="canvas" width="400" height="300"/>');

let _canvas;
let _context;
function initCanvas() {
  //_svg 			= new fabric.Canvas('svg');
  //_svg.setDimensions({width: _canvasWidth, height: _canvasHeight});

  _canvas = document.getElementById("canvas");
  _context = _canvas.getContext("2d");

  initBrush(_context);
  // _context.svg = _svg;

  _canvas.width = 400; // see .html
  _canvas.height = 300;

  _canvas.addEventListener("mousedown", onCanvasMouseDown, false);
  _canvas.addEventListener("touchstart", onCanvasTouchStart, false);
}

initCanvas();
function onCanvasTouchStart() {} // todo not yet
