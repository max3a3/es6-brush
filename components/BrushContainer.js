import React  from "react";

import CustomRenderer from "../paper-object/CustomRenderer";
import {ShapeComponent} from "../paper-object/ShapeCreator";
import {BrushComponent} from "../paper-object/BrushCreator";
import {
  PaperContainer,
} from "@psychobolt/react-paperjs";
import BrushCanvas from "./BrushCanvas";
import { _canvasWidth, _canvasHeight } from "../tconfig";
import {AddBrush} from "./actions";

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

export default function BrushContainer({state, dispatch}) {
  //canvasRef to clear it later

  // dispatch
  const onAddBrush = ({points})=>dispatch(AddBrush({points}))
  return (
    <div className="canvas_container">
      <BrushCanvas className="canvas_overlay"         height={_canvasHeight}
                   width={_canvasWidth}
                   onAddBrush={onAddBrush}
                   />
      <PaperContainer
        canvasProps={{width: _canvasWidth, height: _canvasHeight, className: "main-canvas"}}
        renderer={CustomRenderer}
      >
        {getObjects(state)}
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
