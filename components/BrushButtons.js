import React from "react";
import _ from "lodash";
import { AddRect, AddEllipse, AddBrush } from "./actions";
import { STROKE } from "./BrushCanvas";
function Btn({ name, cb }) {
  return <button onClick={cb}>{name}</button>;
}
let pX = 40;
let pY = 30;
function getPosition() {
  pX += 10;
  pY += 40;
  return [pX, pY];
}
let COLORS = ["red", "blue", "green", "yellow", "aqua", "gold", "cyan"];
let colorIndex = 0;
function getColor() {
  colorIndex = (colorIndex + 1) % COLORS.length;
  return COLORS[colorIndex];
}
export default function TestPaperButtons({ state, dispatch, paperRef }) {
  return (
    //todo add size param
    <div>
      <Btn
        cb={_ =>
          dispatch(
            AddRect({
              position: getPosition(),
              radius: [20, 5],
              fillColor: getColor()
            })
          )
        }
        name="rect"
      />
      <Btn
        cb={_ =>
          dispatch(
            AddEllipse({
              position: getPosition(),
              radius: [35, 65],
              fillColor: getColor()
            })
          )
        }
        name="ellipse"
      />
      <Btn
        cb={_ => {
          dispatch(AddBrush({ points: STROKE[0] }));
        }}
        name="brush 1"
      />
      <Btn
        cb={_ => {
          let paper = paperRef.current.props.paper;

          let value = paper.project.exportJSON({ asString: false });
          let json_value = JSON.stringify(value, undefined, 2);
          console.log(json_value);
        }}
        name="dump"
      />
    </div>
  );
}
