let _canvas;
let _context;
import Silks from './ws_utils/Silks'
function initCanvas() {
  //_svg 			= new fabric.Canvas('svg');
  //_svg.setDimensions({width: _canvasWidth, height: _canvasHeight});

  _canvas = document.getElementById("canvas");
  _context = _canvas.getContext("2d");
}

function main() {
  var b, bufferCanvas, container, drawsPerFrame, drawsPerFrameRatio, endTime, frame, frameCount, h2, hideIntroSilk, introEnd, introLength, introSilkId, introStart, isIPhone, isRightSideUp, pmouseX, pmouseY, replayUrlForId, resetShareOptions, silkCanvas, silks, sound, sparksCanvas, startTime, ui, updateOrientation, urlParams, w2, weShouldEvenHaveAnIntroSilkAtAll, _ref1, _ref2;

  container = document.getElementById('canvii-container');
  silkCanvas = document.getElementById('silk-1');
  bufferCanvas = document.getElementById('silk-2');
  sparksCanvas = document.getElementById('sparks');


  window._s = silks = new Silks(container, silkCanvas, bufferCanvas, sparksCanvas);
  silks.initInputEvents();

}

main();
