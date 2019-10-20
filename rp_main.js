import React, { Component } from "react";
import { render } from "react-dom";
import invariant from "invariant";

import {
  Rectangle,
  PaperContainer,
  renderWithPaperScope
} from "@psychobolt/react-paperjs";

// import PaperApp from './components/PaperApp'
import PaperApp from "./components/BrushPaperApp";

render(<PaperApp />, document.getElementById("root"));
