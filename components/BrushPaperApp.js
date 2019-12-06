import React, {Component, useRef, useEffect, useReducer, useState} from "react";
import { render } from "react-dom";
import invariant from "invariant";

import BrushButtons from "./BrushButtons";
import BrushContainer from "./BrushContainer";

import { INITIAL_STATE, canvasReducer } from "./reducer";
import TipSource from "./TipSource";

function getPaths({ ids, shapes }) {
  // todo remove function bracket. see paper_demo
  let objects = ids.map(pathId => {
    // properties is protostage specific extraction to display , it is pathData that is from paper and passed back

    const { id, ...rest } = shapes[pathId];
    let comp;
    const COMP_MAP = {
      rectangle: ShapeComponent,
      ellipse: ShapeComponent,
      brush_thin: BrushComponent
    };
    return React.createElement(COMP_MAP[rest.type], {
      key: id,
      data: { shapeId: id },
      ...rest
    });
  });
  return objects;
}
const TIP_SOURCE_INITIAL_STATE = {loaded: false, width: 0, height: 0, canvas: null}
const TIP_SOURCE_TEST = './brush/people.png'

export default function BrushPaperApp() {
  let paperRef = useRef(null);
  const [state, dispatch] = useReducer(canvasReducer, INITIAL_STATE);
  const [tipSourceState, setTipSource] = useState(
      TIP_SOURCE_INITIAL_STATE
  );
  // type is brush-0 -1  for intello,  or stroke-0 -1 for psyc TODO
  const TOOL_STYLE_INITIAL_STATE = {type:'brush-0',fill: 'solid', stroke: 'solid', strokeCO: [0, 255, 0], fillCO: [255, 0, 0]}

  const [toolStyleState, setToolStyle] = useState(
      TOOL_STYLE_INITIAL_STATE
  );


  return (
    <div>
      <BrushButtons state={state} dispatch={dispatch} paperRef={paperRef} />
      <BrushContainer state={state} dispatch={dispatch}/>
      <TipSource image_src={TIP_SOURCE_TEST} tipSourceState={tipSourceState} setTipSource={setTipSource}
                 toolStyleState={toolStyleState}/>

    </div>
  );
}
