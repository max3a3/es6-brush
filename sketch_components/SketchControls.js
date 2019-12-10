import React, {Fragment, useState,} from "react";
import Slider from "react-input-slider";
import {updateKey} from "./actions";
import {TOOLS} from "./sketch_config";
import _ from 'lodash'
import {vars} from "../sketch_utils/settings";

function TestSlider() {
  const [state, setState] = useState({x: 10, y: 10});

  return (
    <Fragment>
      <Slider axis="x" x={state.x}
              onChange={({x}) => setState(s => ({...state, x}))}
      />&nbsp;{state.x}
    </Fragment>
  )
}

// can't put it inside SkecthControls like SetTypeBtn for some reason
function StateSlider({stateKey, state, dispatch}) {
  return (
    <Fragment>
      {stateKey} <Slider axis="x" x={state[stateKey]}
                         onChange={({x}) => dispatch(updateKey(stateKey, x))}
    />&nbsp;{state[stateKey]}<br/>
    </Fragment>
  )

}

const TYPE_SLIDER = {
  eraser: {
    diameter_eraser: 0,
    hardness_eraser: 0,
    flow_eraser: 0,
    opacity_eraser: 0
  },

  brush: {
    diameter_brush: 0,
    hardness_brush: 0,
    flow_brush: 0,
    opacity_brush: 0
  },
  pencil: {
    diameter_pencil: 0,
    opacity_pencil: 0
  },
  calligraphy: {
    diameter_calligraphy: 0,
    opacity_calligraphy: 0
  },
  stamp: {
    // 'rand', todo this is min max
    flow_stamp:0,
    opacity_stamp:0
  }

}
function dumpStore(state) {
  let json_value = JSON.stringify(state, undefined, 2)
  console.log(json_value)
}
function dumpVars() {
  let json_value = JSON.stringify(vars, undefined, 2)
  console.log(json_value)
}
export default function SketchControls({state, dispatch}) {
  const SetTypeBtn = ({name}) =>
    <button onClick={_ => {
      dispatch(updateKey('type', name))
    }
    }>{name}</button>;

  // supposed to change the stamp index from selected stamp folder?
  let stamp_buttons = _.range(3).map((n) =>
    <button key={n} onClick={x => 0}>notyet stamp_{n}</button>
  )


  let dump_buttons = <Fragment>
    <button onClick={dumpStore.bind(this,state)}>dumpState</button>
    <button onClick={dumpVars}>dumpVars</button>
  </Fragment>
  let tools_specific = Object.keys(TYPE_SLIDER[state.type]).map((m, i) =>
    <StateSlider stateKey={m} key={i} state={state} dispatch={dispatch}/>
  )
  let tools_button = Object.keys(TOOLS).map((m, i) => <SetTypeBtn name={m} key={i}/>
  )
  return (<div>
    tools: {state.type}<br/>
    {tools_button}<br/>
    {dump_buttons}<br/>
    {stamp_buttons}<br/>
    {tools_specific}
  </div>)
}
