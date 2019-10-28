let _canvas;
let _context;
import Silks from './ws_utils/Silks'
import $ from 'jquery'
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

  initMouseHandler(silks)
  setupFrameHandler(silks)
}
function initMouseHandler(silks) {
  let canvas = $('#sparks')
  let pmouseX,pmouseY  //context global

  $('#sparks').mousedown(function(e) {
/*wng no sound
    if (sound != null) {
      sound.start();
    }
    if (sound != null) {
      sound.playDrawSound();
    }

 */
    pmouseX = e.pageX;
    pmouseY = e.pageY;
    // wng turn off
    // b is event handler
/*
    b.silkActive(true);
    resetShareOptions();
    ui.tips.hide();
    b.showDownload(false);
    b.showAbout(false);
    b.showIntro(false);
     b.hideReplayThumbnail();
     */
  }).mousemove(function(e) {

    var sq, vmx, vmy;
    vmx = pmouseX - e.pageX;
    vmy = pmouseY - e.pageY;
    sq = vmx * vmx + vmy * vmy;
    // wng  no sound crap
    /*
    if (sq > 0) {
      if (sound != null) {
        sound.modulateDrawSound(Math.sqrt(sq));
      }
    } else {
      if (sound != null) {
        sound.modulateDrawSound(0);
      }
    }

     */
    pmouseX = e.pageX;
    pmouseY = e.pageY;

  }).mouseup(function(e) {


    silks.drawInputPreview = true; // this is the dot and its symmetry preview

    /*
    b.pristine(false);
    b.silkActive(false);
    return sound != null ? sound.stopDrawSound() : void 0;
  */

  })
    /*  wng no touch for now, should be the same as mousedown and mouseup
    .on('touchstart', function(e) {
    pmouseX = e.pageX;
    pmouseY = e.pageY;
    b.silkActive(true);
    resetShareOptions();
    ui.tips.hide();
    b.showDownload(false);
    b.showAbout(false);
    return b.showIntro(false);
  }).on('touchend', function(e) {
    b.pristine(false);
    return b.silkActive(false);
  });

     */
}

function setupFrameHandler(silks) {
  let frameCount = 0;
  let h2 = $(window).height() / 2;
  let w2 = $(window).width() / 2;
  let replayUrlForId = function(id) {
    return "http://r.weavesilk.com/?v=4&id=" + id;
  };
  let  weShouldEvenHaveAnIntroSilkAtAll = true;
  /*
  introSilkId = null;
  introStart = 25;
  drawsPerFrame = 2;
  drawsPerFrameRatio = 5 / 2;
  introLength = 45 * drawsPerFrameRatio;
  introEnd = introStart + introLength;
*/
  let frame = function() {
    frameCount++;
    /* wng intro is not used
    if (b.introSilkShowing() && weShouldEvenHaveAnIntroSilkAtAll) {
      switch (false) {
        case frameCount !== introStart:
          introSilkId = silks.add('intro', {
            symNumRotations: 6,
            symMirror: true,
            color: '#276f9b',
            highlightColor: '#825ba1',
            highlightMode: 'time',
            timeColorScaleDomainHigh: 500,
            symCenterX: w2,
            symCenterY: h2,
            startOpacity: 0.08,
            noiseOffset: 10000 * Math.random(),
            drawsPerFrame: drawsPerFrame
          });
          break;
        case !((introStart <= frameCount && frameCount < introEnd) && frameCount % 2 === 0):
          silks.addPoint(introSilkId, w2 + 5, h2 - 5, 0, 0);
          break;
        case frameCount !== introEnd:
          silks.complete(introSilkId);
      }
    }
    */
    let startTime = +new Date();
    silks.frame((startTime - endTime) / 16);
    let endTime = +new Date();
    let timeOutVal = 16 - (endTime - startTime)
    console.log("timeOutVal",timeOutVal)

    return setTimeout(frame,timeOutVal );
  };

  frame();
}
main();
