import React, { Component, useRef, useEffect, useReducer } from "react";
import { render } from "react-dom";
import invariant from "invariant";

import BrushButtons from "./BrushButtons";
import BrushContainer from "./BrushContainer";

import { INITIAL_STATE, canvasReducer } from "./reducer";

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

export default function BrushPaperApp() {
  let paperRef = useRef(null);
  const [state, dispatch] = useReducer(canvasReducer, INITIAL_STATE);
  return (
    <div>
      <BrushButtons state={state} dispatch={dispatch} paperRef={paperRef} />
      <BrushContainer state={state} dispatch={dispatch}/>
    </div>
  );
}
