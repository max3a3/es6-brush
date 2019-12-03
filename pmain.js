import React, {useRef, useEffect, useState} from "react";
import {render} from "react-dom";
import paper, {Point, Segment} from "paper";
import BrushCustomPaper from "./paper-object/BrushCustom";
import {STROKE} from "./components/BrushCanvas";
import BezierDraw from "./bezier_draw";
import Bezier from "./bezier-js-src/bezier";
import TipSource from "./components/TipSource";

let brushObject;
const BRUSH_POSITION = [140, 120];
let BRUSH = 0;
let CIRCLE = 0; //1; // to test where _draw is called
let CURVE_SMOOTH = 1
let CURVE = 0

function dump(textAreaRef) {
  let value = paper.project.exportJSON({asString: false});
  textAreaRef.current.value = JSON.stringify(value, undefined, 2);
}


function getPathSegments(p) {
  let ret = []
  let segments = p.segments

  segments.forEach((s, i) => {
    // no need last point
    if (i !== segments.length - 1) {
      let s1 = segments[i + 1]
      ret.push([s.point, s.point.add(s.handleOut), s1.point.add(s1.handleIn), s1.point])
    }
  })
  return ret
}

function curve(tipstate) {
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
  myPath.add(new Segment(new paper.Point(p0), null, p1_out));
  let p2_in = new Point(p2).subtract(new Point(p3))
  myPath.add(new Segment(new paper.Point(p3), p2_in, null));
  myPath.fullySelected = true

  myPath.style = style;

  let segments = getPathSegments(myPath)
  console.log("segments", segments)

  bezierTest(tipstate,segments)
}

function bezierTest(tipstate,segments,spacing=16) {

  let canvas = document.getElementById('silk-2');
  let draw = new BezierDraw(canvas)

  let drawOffset = {x: 0, y: 50}

  segments.forEach(s => {
    var curve = new Bezier(s[0], s[1], s[2], s[3]);
   // draw handle using 2d context
    // draw.drawSkeleton(curve);

    // draw curve using 2d context
    // draw.drawCurve(curve,drawOffset);

    var LUT = curve.getLUT(spacing);
    var d=8; // normal line distance
    LUT.forEach(pt=> {
        draw.drawCircle(pt, 2, drawOffset)
        let nv = pt.nv

      // normal vector drawing
        // draw.drawLine(pt, {x: pt.x + d * nv.x, y: pt.y + d * nv.y}, drawOffset);


        let angle = Math.atan2(nv.y, nv.x) //radian
        draw.drawRotated(tipstate.canvas,pt.x,pt.y,tipstate.width,tipstate.height,
          angle,
          0.2)

      }
    )
    //
    // draw.setColor("red");
    // var pt, nv, d=5;
    //
    // for(var t=0; t<=1; t+=1/spacing) { // t is the distance
    //   var pt = curve.get(t);
    //   var nv = curve.normal(t);
    //   draw.drawLine(pt, { x: pt.x + d*nv.x, y: pt.y + d*nv.y} ,drawOffset);
    // }

  })



}

function curveSmooth(tipstate) {
  paper.project.clear();

  let style = {
    // strokeColor: 'black',
    strokeColor: new paper.Color(0, 0.9, 0.5),
    strokeWidth: 1
  };

  let points = [[10, 10], [20, 15], [35, 40], [50, 50], [60, 40], [55, 30], [70, 10], [75, 30], [85, 50]]
  var myPath = new paper.Path();

  myPath.strokeColor = 'black';
  points.forEach(p =>
    myPath.add(p))

  myPath.simplify(10)
  myPath.fullySelected = true


  let segments = getPathSegments(myPath)
  console.log("segments", segments)

  bezierTest(tipstate,segments,5)


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
let degree = 20
function teststamp(tipstate) {
  let canvas = document.getElementById('silk-2');
  let draw = new BezierDraw(canvas)
   degree += 33
  draw.drawRotated(tipstate.canvas,100,50,tipstate.width,tipstate.height,
    degree * Math.PI/180,
  0.2)
}
function onClear() {
  paper.project.clear();
}

function brush2() {
  brushObject.points = STROKE[1];
  brushObject.strokeWidth = 18;
  brushObject.strokeColor = "yellow";
}
// const TIP_SRC_TEST = './brush/calligraphy-1.png'
const TIP_SRC_TEST = './brush/people.png'
export function DirectPaper() {
  let canvas_ref = useRef(null);
  let textAreaRef = useRef(null);


  const TIP_SOURCE_INITIAL_STATE= {loaded:false,width:0, height:0,canvas:null}

  const [tipSourceState, setTipSource] = useState(
    TIP_SOURCE_INITIAL_STATE
  );

  // fill stroke can be solid, gradient or pattern
  //   use fill|stroke CO,  (gradient) fill|stroke GD, (pattern) fill|strokePT ...  see style function

  //    slot for stroke   , fillCO  or strokeCO

  const TOOL_STYLE_INITIAL_STATE = {fill:'solid',stroke:'solid',strokeCO:[0,255,0],fillCO:[255,0,0]}

  const [toolStyleState, setToolStyle] = useState(
    TOOL_STYLE_INITIAL_STATE
  );


  useEffect(() => {
    paper.setup(canvas_ref.current);

    // custom object
    let style = {
      // fillColor: new paper.Color(1, 0, 0),
      // strokeColor: 'black',
      strokeColor: new paper.Color(0, 0.9, 0.5),
      strokeWidth: 1
    };

    if (tipSourceState.canvas) {
      if (BRUSH) { // will get deleted if you click other buttons that draw another object
        // STROKE is in BrushCanvas to test replaying the points
        brushObject = new BrushCustomPaper(
          {position: BRUSH_POSITION},
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
      if (CURVE) {
        curve(tipSourceState)
      }

      if (CURVE_SMOOTH) {
        curveSmooth(tipSourceState)
      }
      // lines()
      // rectangle()
    }
  }, [tipSourceState]);

  return (
    <div className="flex_container">
<div>
      <div id="canvii-container" className="flex_item" style={{width: 850,height:450}}>
        <canvas className="tool_canvas main-canvas silk-canvas active" id="silk-2" width={800} height={400}/>
        <canvas className="tool_canvas main-canvas" id="silk-1" ref={canvas_ref} width={800} height={400}/>
      </div>
  xoxo
  <TipSource image_src={TIP_SRC_TEST} tipSourceState={tipSourceState} setTipSource={setTipSource} toolStyleState ={toolStyleState}/>
</div>
      <div className="flex_item">
        <button onClick={onClear}>clear</button>
        <br/>

        <button onClick={lines}>lines</button>
        <br/>
        <button onClick={curve}>curve</button>
        <br/>
        <button onClick={teststamp.bind(this,tipSourceState)}>teststamp</button>
        <br/>
        <button onClick={curveSmooth}>curveSmooth</button>
        <br/>

        <button onClick={brush2}>brush 2</button>
        <br/>
        <button onClick={() => dump(textAreaRef)}>dump</button>
        <br/>
        <textarea ref={textAreaRef} rows={40}/>
      </div>

      )
    </div>
  );
}

render(<DirectPaper/>, document.getElementById("root"));
