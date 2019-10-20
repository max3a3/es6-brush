import React, { createRef } from "react";
import BrushCanvas from "./BrushCanvas";
import BrushTest from "./BrushTest";
import WidgetCanvas from "./WidgetCanvas";

export default function App() {
  let canvasRef = createRef();
  return (
    <div className="container">
      jj
      <button onClick={() => canvasRef.current.clear()}>clear</button>
      <button onClick={() => canvasRef.current.replayStroke(0)}>s1</button>
      <button onClick={() => canvasRef.current.replayStroke(1)}>s2</button>
      <BrushTest canvasRef={canvasRef} />
    </div>
  );
}
