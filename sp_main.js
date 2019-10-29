import React, { Component } from "react";
import { render } from "react-dom";
import {gui_options} from './sketch_utils/gui_options'

// import PaperApp from './components/PaperApp'
import SketchApp from "./sketch_components/SketchApp";
function init_sketchpad() {

  if (!gui_options.modules || v == 'shape') {
    gui_options.modulesObject();
  }
  ;
}

init_sketchpad()

render(<SketchApp />, document.getElementById("root"));
