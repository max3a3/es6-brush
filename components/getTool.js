import React from 'react';
import {TOOL_TYPE} from "../config";

import invariant from 'invariant'
import BrushThinTool from "../tools/BrushThinTool";


// import RectangleTool from './RectangleTool'
// import CircleTool from './CircleTool.component'

export function getTool(tool, k, inputEl, toolProps) {
  let ret = null

  switch (tool) {
    case TOOL_TYPE.BRUSH_THIN:
      ret = <BrushThinTool key={k} ref={inputEl} {...toolProps}/>
      break
    default:
  }
  invariant(ret, "tool not found")

  return ret
}
