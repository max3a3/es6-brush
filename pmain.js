import React, { useRef, useEffect } from "react";
import { render } from "react-dom";
import paper from "paper";
import BrushCustomPaper from "./paper-object/BrushCustom";
import { STROKE } from "./components/BrushCanvas";
function dump(textAreaRef) {
  let value = paper.project.exportJSON({ asString: false });
  textAreaRef.current.value = JSON.stringify(value, undefined, 2);
}

function lines() {
  paper.project.clear();

  function drawLine(start_pt, stle) {
    //Point data structure has methods for other operation, so it is good
    //  to use instead of rewriting in react
    //  how to store this in redux?

    let start = new paper.Point(start_pt);
    // Move to start and draw a line from there
    let path = new paper.Path();
    path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([200, 30]));
    path.style = style;
  }

  let style = {
    fillColor: new paper.Color(1, 0, 0),
    // strokeColor: 'black',
    strokeColor: new paper.Color(0, 0.9, 0.5),
    strokeWidth: 2
  };
  drawLine([10, 5], style);
  drawLine([70, 5], style);
}
function onClear() {
  paper.project.clear();
}
let starObject;
const STAR_POSITION = [140, 120];
let STAR = 1;
let CIRCLE = 0; // to test where _draw is called
export function DirectPaper() {
  let canvas_ref = useRef(null);
  let textAreaRef = useRef(null);

  useEffect(() => {
    paper.setup(canvas_ref.current);

    // custom object
    let style = {
      // fillColor: new paper.Color(1, 0, 0),
      // strokeColor: 'black',
      strokeColor: new paper.Color(0, 0.9, 0.5),
      strokeWidth: 1
    };

    if (STAR) {
      // STROKE is in BrushCanvas to test replaying the points
      starObject = new BrushCustomPaper({}, STROKE[0]); //global
      starObject.style = style;
      starObject.selected = true;
      starObject.position = STAR_POSITION;
    }
    if (CIRCLE) {
      var shape = new paper.Shape.Ellipse({
        point: [20, 20],
        size: [180, 60],
        fillColor: "black"
      });
    }
    // lines()
    // rectangle()
  }, []);

  return (
    <div className="flex_container">
      <div className="flex_item">
        <button onClick={onClear}>clear</button>
        <br />

        <button onClick={lines}>lines</button>
        <br />
        <button onClick={() => dump(textAreaRef)}>dump</button>
        <br />
        <textarea ref={textAreaRef} rows={40} />
      </div>
      <canvas className="tool_canvas flex_item" ref={canvas_ref} />)
    </div>
  );
}
render(<DirectPaper />, document.getElementById("root"));
