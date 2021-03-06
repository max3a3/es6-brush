// need dispatch
import Hashids from "hashids";
// caller call this and call dispathc on the return
import Actions from "./action_type";

export function AddRect(props) {
  return {
    type: Actions.ADD_SHAPE,
    payload: {
      id: new Hashids("path").encode(new Date().getTime()),
      type: "rectangle",
      ...props
    }
  };
}
export function AddEllipse(props) {
  return {
    type: Actions.ADD_SHAPE,
    payload: {
      id: new Hashids("path").encode(new Date().getTime()),
      type: "ellipse",
      size: [60, 30], // will be overriden by props
      ...props
    }
  };
}

export function AddBrush(props) {
  let brushType = props.brushType ||'brush:BrushThin'

  if( brushType==='stroke:StrokeSimple')
  {
    debugger
    props.smoothFactor = 10 // hardcode for now see app/brushes/StrokeSimple.js :24
  }

  return {
    type: Actions.ADD_SHAPE,
    payload: {
      id: new Hashids("brush").encode(new Date().getTime()),
      type: brushType,
      position: [0, 0], // will be overriden by props
      ...props
    }
  };
}
export function SetPosition(id, position) {
  return {
    type: Actions.SET_PROP,
    payload: {
      id,
      prop: { position }
    }
  };
}
export function SetFill(id, fillColor) {
  return {
    type: Actions.SET_PROP,
    payload: {
      id,
      prop: { fillColor }
    }
  };
}
export function SetStroke(id, strokeColor) {
  return {
    type: Actions.SET_PROP,
    payload: {
      id,
      prop: { strokeColor }
    }
  };
}
