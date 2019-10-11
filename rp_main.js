import React, { Component } from "react";
import { render } from "react-dom";

//  @psychobolt/react-paperjs
import { Rectangle, PaperContainer,renderWithPaperScope } from "@psychobolt/react-paperjs";
function Appx() {
  return (
    <PaperContainer
      className="flex_item"
      canvasProps={{ width: 400, height: 300, class: "tool_canvas" }}
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
  }
  componentDidMount() {
    invariant(this.state.paper, "paper not defind");
  }
  render() {
    let paperSetter = null;

    // only called once, we install a component as that is the only way scope get passed
    if (!this.state.paper) {
      // register paper global to use for debugging
      const RegisterPaperComp = () => {
        return ,(paper => {
          this.setState({ paper });
          return null;
        });
      };
      paperSetter = <RegisterPaperComp />;
    }

    return (
      <PaperContainer
        className="flex_item"
        canvasProps={{ width: 400, height: 300, class: "tool_canvas" }}
      >
        {paperSetter}
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
