import React, {Fragment} from "react";

import CustomRenderer from "../paper-object/CustomRenderer";
import {ShapeComponent} from "../paper-object/ShapeCreator";
import {BrushComponent} from "../paper-object/BrushCreator";
//import {BrushCanvas} from "./BrushCanvas"
import {
  PaperContainer,
} from "@psychobolt/react-paperjs";

const COMP_MAP = {
  rectangle: ShapeComponent,
  ellipse: ShapeComponent,
  brush_thin: BrushComponent
};

const getObjects = ({ids, shapes}) => ids.map(pathId => {
  // properties is protostage specific extraction to display , it is pathData that is from paper and passed back
  const {id, ...rest} = shapes[pathId];

  return React.createElement(COMP_MAP[rest.type], {
    key: id,
    data: {shapeId: id}, // paperjs custom data field
    ...rest
  });
});

export default function BrushContainer({state, paperRef}) {
  return (
    <Fragment>
      <PaperContainer
        ref={paperRef}
        className="flex_item"
        canvasProps={{width: 400, height: 300, className: "tool_canvas"}}
        renderer={CustomRenderer}
      >
        {getObjects(state)}
      </PaperContainer>
    </Fragment>
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
