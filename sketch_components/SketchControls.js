import React, {Fragment, useState,} from "react";
import Slider from "react-input-slider";
import {updateKey} from "./actions";
import {TOOLS} from "./sketch_config";
import _ from 'lodash'

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
  }

}
export default function SketchControls({state, dispatch}) {
  const SetTypeBtn = ({name}) =>
    <button onClick={_ => {
      dispatch(updateKey('type', name))
    }
    }>{name}</button>;

  let stamp_buttons = _.range(3).map((n) =>
    <button key={n} onClick={x => 0}>stamp_{n}</button>
  )

  let tools_specific = Object.keys(TYPE_SLIDER[state.type]).map((m, i) =>
    <StateSlider stateKey={m} key={i} state={state} dispatch={dispatch}/>
  )
  let tools_button = Object.keys(TOOLS).map((m, i) => <SetTypeBtn name={m} key={i}/>
  )
  return (<div>
    tools: {state.type}<br/>
    {tools_button}<br/>
    {stamp_buttons}<br/>
    {tools_specific}
  </div>)
}
