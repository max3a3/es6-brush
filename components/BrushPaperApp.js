import React, { Component, useRef, useEffect, useReducer } from "react";
import { render } from "react-dom";
import invariant from "invariant";
import CustomRenderer from "../paper-object/CustomRenderer";

import {
  Rectangle,
  PaperContainer,
  renderWithPaperScope
} from "@psychobolt/react-paperjs";

import DotBounded from "./DotBounded";
import BrushButtons from "./BrushButtons";

const canvasReducer = (state, action) => {
  switch (action.type) {
    case "ADD_RECT": //modify the
      return { ids, objects };

    default:
      return state;
  }
};

export default function BrushPaperApp() {
  let paperRef = useRef(null);
  useEffect(() => {
    //componentdidmount to get the paper ref
    let paper = paperRef.current.props.paper;
    invariant(paper, "paper not defind");
    let dot = new DotBounded(paper, 30, 20);
  }, []);

  let initialState = {
    ids: [],
    objects: {}
  };
  const [state, dispatch] = useReducer(canvasReducer, initialState);

  console.log("brush function");
  return (
    <div>
      <BrushButtons state={state} dispatch={dispatch} />
      <PaperContainer
        ref={paperRef}
        className="flex_item"
        canvasProps={{ width: 400, height: 300, className: "tool_canvas" }}
        render={CustomRenderer}
      >
        <Rectangle
          position={[90, 60]}
          width={90}
          height={60}
          strokeColor="red"
          fillColor="yellow"
        />
        <Shape/>
      </PaperContainer>
    </div>
  );
}
