import React from "react";
import _ from "lodash";
import { AddRect } from "./actions";
function Btn({ name, cb }) {
  return <button onClick={cb}>{name}</button>;
}
let pX = 180;
let pY = 0;
function getPosition() {
  pX += 10;
  pY += 40;
  return [pX, pY];
}
export default function TestPaperButtons({ state, dispatch, paperRef }) {
  return (
    //todo add size param
    <div>
      <Btn
        cb={_ =>
          dispatch(AddRect({ position: getPosition(), radius: [20, 5] }))
        }
        name="rect"
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
