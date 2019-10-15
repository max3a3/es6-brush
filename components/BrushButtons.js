import React from "react";
import _ from "lodash";
import { AddRect } from "./actions";
function Btn({ name, cb }) {
  return <button onClick={cb}>{name}</button>;
}
export default function TestPaperButtons({ state, dispatch, paperRef }) {
  return (
    <div>
      <Btn cb={_ => dispatch(AddRect([10, 40], [80, 90]))} name="rect" />
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
