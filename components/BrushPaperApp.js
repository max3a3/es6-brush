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
const TIP_SOURCE_INITIAL_STATE = {loaded: false, width: 0, height: 0, canvas: null,
  src:null //addition for hook setting after componentdidmount
}
const TIP_SOURCE_TEST = './brush/people.png'

export default function BrushPaperApp() {
  const [state, dispatch] = useReducer(canvasReducer, INITIAL_STATE);
  const [tipSourceState, setTipSource] = useState(
      TIP_SOURCE_INITIAL_STATE
  );
  // type is brush:BrushThin  for intello,  or stroke:StrokeStamp for psyc TODO add stroke
  const TOOL_STYLE_INITIAL_STATE = {brushType:'stroke:StrokeStamp',fill: 'solid', stroke: 'solid', strokeCO: [0, 255, 0], fillCO: [255, 0, 0]}

  const [toolStyleState, setToolStyle] = useState(
      TOOL_STYLE_INITIAL_STATE
  );
  let tipImageSrc = null
  useEffect(() => {
    setTipSource({...tipSourceState, src:TIP_SOURCE_TEST});
    }, []);

  return (
    <div>
      <BrushButtons state={state} dispatch={dispatch}
                    toolStyleState={toolStyleState} setToolStyle={setToolStyle}/>
      <BrushContainer state={state} dispatch={dispatch} toolStyleState={toolStyleState} />
      <TipSource image_src={tipSourceState.src} tipSourceState={tipSourceState} setTipSource={setTipSource}
                 toolStyleState={toolStyleState}/>

    </div>
  );
}
