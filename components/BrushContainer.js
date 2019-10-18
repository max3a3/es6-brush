import React, { Component, useRef, useEffect, useReducer } from "react";

import CustomRenderer from "../paper-object/CustomRenderer";
import { ShapeComponent } from "../paper-object/ShapeCreator";
import { BrushComponent } from "../paper-object/BrushCreator";
import {
  Rectangle,
  PaperContainer,
  renderWithPaperScope
} from "@psychobolt/react-paperjs";
import invariant from "invariant";

function getObjects({ ids, shapes }) {
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
export default function BrushContainer({ state, paperRef }) {
  return (
    <PaperContainer
      ref={paperRef}
      className="flex_item"
      canvasProps={{ width: 400, height: 300, className: "tool_canvas" }}
      renderer={CustomRenderer}
    >
      {getObjects(state)}
    </PaperContainer>
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
