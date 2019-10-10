import React from "react";
import { render } from "react-dom";

//  @psychobolt/react-paperjs
import { Rectangle, PaperContainer } from "@psychobolt/react-paperjs";
function App() {
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
render(<App />, document.getElementById("root"));
