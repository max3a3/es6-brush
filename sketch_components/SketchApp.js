import React, { Component, useRef, useEffect, useReducer } from "react";
import SketchCanvas from "./SketchCanvas";

export default function SketchApp() {
  return (
    <div>
      sketch<br/>
     <SketchCanvas/>
    </div>
  )
}
