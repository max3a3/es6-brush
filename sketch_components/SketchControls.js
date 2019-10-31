import React, {Fragment, useState,} from "react";
import Slider from "react-input-slider";

function TestSlider() {
  const [state, setState] = useState({x: 10, y: 10});
  console.log("x", state.x)

  return (
    <Fragment>
      <Slider axis="x" x={state.x}
              onChange={({x}) => setState(s => ({...state, x}))}
      />&nbsp;{state.x}
    </Fragment>
  )
}

export default function SketchControls() {
  return (<div>

    controls
    <TestSlider/>

  </div>)
}
