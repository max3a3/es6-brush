import _brush from "./brush_class";

let _mouseLBDown = false;
let _brushColor = "green";
let _brushSize = 3;
let _transformModes = [];

function getClientCords(event) {
  // var offsetY = _appBarHeight;
  var offsetY = 0;

  if (event.touches && event.touches.length == 1) {
    return { x: event.touches[0].pageX, y: event.touches[0].pageY };
  } else {
    return { x: event.clientX, y: event.clientY - offsetY };
  }
}

function onCanvasMouseMove(event) {
  var coords = getClientCords(event);

  _brush.doStroke(coords.x, coords.y);
}

function onCanvasMouseUp() {
  if (_mouseLBDown == true) {
    // $('div.move').show();

    _brush.endStroke();
  }

  _mouseLBDown = false;

  window.removeEventListener("mousemove", onCanvasMouseMove, false);
  window.removeEventListener("mouseup", onCanvasMouseUp, false);

  /*if (_localStorage)
	{
		clearTimeout(_saveCanvasTimeOut);
		_saveCanvasTimeOut = setTimeout(saveWorkspace, 2000, true);
	}
  */
}

export function onCanvasMouseDown(event) {
  var coords = getClientCords(event);

  // saveToUndo();

  // $('div.move').hide();

  // var shadow = $("input#shadow").is(':checked');
  var shadow = false; //todo

  _brush.beginStroke(
    _brushColor,
    _brushSize,
    _transformModes,
    coords.x,
    coords.y,
    shadow
  );

  window.addEventListener("mousemove", onCanvasMouseMove, false);
  window.addEventListener("mouseup", onCanvasMouseUp, false);

  _mouseLBDown = true;
}
