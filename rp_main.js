import React, { Component } from "react";
import { render } from "react-dom";
import invariant from "invariant";

import {
  Rectangle,
  PaperContainer,
  renderWithPaperScope
} from "@psychobolt/react-paperjs";

import DotBounded from "./components/DotBounded";

function Appx() {
  return (
    <PaperContainer
      className="flex_item"
      canvasProps={{ width: 400, height: 300, className: "tool_canvas" }}
    >
      <Rectangle
        position={[90, 60]}
        width={90}
        height={60}
        strokeColor="red"
        fillColor="green"
      />
    </PaperContainer>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.paperRef = React.createRef();
  }
  componentDidMount() {
    let paper = this.paperRef.current.props.paper;
    invariant(paper, "paper not defind");
    this.dot = new DotBounded(paper, 30, 20);
  }
  render() {
    return (
      <PaperContainer
        ref={this.paperRef}
        className="flex_item"
        canvasProps={{ width: 400, height: 300, className: "tool_canvas" }}
      >
        <Rectangle
          position={[90, 60]}
          width={90}
          height={60}
          strokeColor="red"
          fillColor="blue"
        />
      </PaperContainer>
    );
  }
}
render(<App />, document.getElementById("root"));
