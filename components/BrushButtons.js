import React from "react";
import _ from "lodash";
import { AddRect } from "./actions";
function Btn({ name, cb }) {
  return <button onClick={cb}>{name}</button>;
}
export default function TestPaperButtons({ state, dispatch }) {
  return (
    <div>
      <Btn cb={_ => dispatch(AddRect([10, 40], [80, 90]))} name="rect" />
    </div>
  );
}
