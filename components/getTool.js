import React from 'react';
import {TOOL_TYPE} from "../config";

import invariant from 'invariant'
import BrushThinTool from "../tools/BrushThinTool";
import StrokeSimpleTool from "../tools/StrokeSimpleTool";


// import RectangleTool from './RectangleTool'
// import CircleTool from './CircleTool.component'

export function getTool(tool, k, inputEl, toolProps) {
  let ret = null

  //todo replace switch with mapping tooltype and calling react.createComponent function call

  switch (tool) {
    case TOOL_TYPE.BRUSH_THIN:
      ret = <BrushThinTool key={k} ref={inputEl} {...toolProps}/>
      break
    case TOOL_TYPE.STROKE_SIMPLE:
      ret = <StrokeSimpleTool key={k} ref={inputEl} {...toolProps}/>
      break
    default:
  }
  invariant(ret, "tool not found")

  return ret
}
