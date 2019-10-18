import React, { createRef } from "react";
import BrushCanvas from "./BrushCanvas";
import WidgetCanvas from "./WidgetCanvas";

export default function App() {
  let canvasRef = createRef();
  return (
    <div>
      <button onClick={() => canvasRef.current.clear()}>clear</button>
      <button onClick={() => canvasRef.current.replayStroke(0)}>s1</button>
      <button onClick={() => canvasRef.current.replayStroke(1)}>s2</button>

      <BrushCanvas canvasRef={canvasRef} />
    </div>
  );
}
