import React, { useRef, useEffect } from "react";
import { render } from "react-dom";
import paper,{Point,Segment} from "paper";
import BrushCustomPaper from "./paper-object/BrushCustom";
import { STROKE } from "./components/BrushCanvas";

let brushObject;
const BRUSH_POSITION = [140, 120];
let BRUSH = 1;
let CIRCLE = 0; //1; // to test where _draw is called

function dump(textAreaRef) {
  let value = paper.project.exportJSON({ asString: false });
  textAreaRef.current.value = JSON.stringify(value, undefined, 2);
}
function curve() {
  paper.project.clear();

  let style = {
    // strokeColor: 'black',
    strokeColor: new paper.Color(0, 0.9, 0.5),
    strokeWidth: 1
  };

  let p0 = {x: 10, y: 10}, //use whatever points you want obviously
    p1 = {x: 50, y: 100},
    p2 = {x: 150, y: 200},
    p3 = {x: 200, y: 75}
  var myPath = new paper.Path();

  myPath.strokeColor = 'black';
  let p1_out = new Point(p1).subtract(new Point(p0))
  myPath.add(new Segment(new paper.Point(p0),null,p1_out));
  let p2_in = new Point(p2).subtract(new Point(p3))
  myPath.add(new Segment(new paper.Point(p3),p2_in,null));
  myPath.fullySelected=true

  myPath.style = style;


  // manualDraw(p0,p1,p2,p3)
}
function manualDraw(points) {

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
function brush2() {
  brushObject.points = STROKE[1];
  brushObject.strokeWidth = 18;
  brushObject.strokeColor = "yellow";
}
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

    if (BRUSH) { // will get deleted if you click other buttons that draw another object
      // STROKE is in BrushCanvas to test replaying the points
      brushObject = new BrushCustomPaper(
        { position: BRUSH_POSITION },
        STROKE[0]
      ); //global
      brushObject.style = style;
      // brushObject.selected = true;
      // starObject.position = STAR_POSITION;
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
        <button onClick={curve}>curve</button>
        <br />

        <button onClick={brush2}>brush 2</button>
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
