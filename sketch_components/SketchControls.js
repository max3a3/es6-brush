import React, {Fragment, useState,} from "react";
import Slider from "react-input-slider";
import {updateKey} from "./actions";
import {update_vars,vars} from "../sketch_utils/settings";


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

function StateSlider({stateKey, state, dispatch}) {
  return (
    <Fragment>
      {stateKey} <Slider axis="x" x={state[stateKey]}
                         onChange={({x}) => dispatch(updateKey(stateKey, x))}
    />&nbsp;{state[stateKey]}
    </Fragment>
  )

}

function SetTypeBtn({name}) {
  return <button onClick={_ => update_vars('type', name)}>{name}</button>;
}

export default function SketchControls({state, dispatch}) {
  return (<div>
    tools: {vars.type}<br/>
    <SetTypeBtn name='pencil'/>
    <SetTypeBtn name='brush'/>
    <SetTypeBtn name='eraser'/><br/>
    <StateSlider stateKey='diameter_brush' state={state} dispatch={dispatch}/>

  </div>)
}
