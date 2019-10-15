import React, { Component, useRef, useEffect, useReducer } from "react";
import { render } from "react-dom";
import invariant from "invariant";
import CustomRenderer from "../paper-object/CustomRenderer";
import { ShapeComponent } from "../paper-object/ShapeCreator";
import {
  Rectangle,
  PaperContainer,
  renderWithPaperScope
} from "@psychobolt/react-paperjs";

import DotBounded from "./DotBounded";
import BrushButtons from "./BrushButtons";

import { INITIAL_STATE, canvasReducer } from "./reducer";

function getPaths({ ids, shapes }) {
  // todo remove function bracket. see paper_demo
  let objects = ids.map(pathId => {
    // properties is protostage specific extraction to display , it is pathData that is from paper and passed back

    const { id /*type: Path,*/, type, ...rest } = shapes[pathId];
    if (type === "rectangle")
      return (
        <ShapeComponent
          type={type}
          key={`path_${id}`}
          data={{ shapeId: id }}
          {...rest}
        />
      );
  });
  return objects;
}

export default function BrushPaperApp() {
  let paperRef = useRef(null);
  useEffect(() => {
    /*
    //componentdidmount to get the paper ref
    let paper = paperRef.current.props.paper;
    invariant(paper, "paper not defind");
    let dot = new DotBounded(paper, 30, 20);
    */
  }, []);

  const [state, dispatch] = useReducer(canvasReducer, INITIAL_STATE);

  let objects = getPaths(state);
  return (
    <div>
      <BrushButtons state={state} dispatch={dispatch} paperRef={paperRef} />
      <PaperContainer
        ref={paperRef}
        className="flex_item"
        canvasProps={{ width: 400, height: 300, className: "tool_canvas" }}
        renderer={CustomRenderer}
      >
        {objects}
      </PaperContainer>
    </div>
  );
}
/*temp
        <ShapeComponent type="rectangle" />

 <Rectangle
          position={[90, 60]}
          width={90}
          height={60}
          strokeColor="red"
          fillColor="yellow"
        />

        */
