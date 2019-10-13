import React, { createRef } from "react";
import BrushCanvas from "./BrushCanvas";
import WidgetCanvas from "./WidgetCanvas";

export default function App() {
  let canvasRef = createRef();
  return (
    <div>
      <button onClick={() => canvasRef.current.clear()}>clear</button>
      <button>s1</button>
      <button>s2</button>

      <BrushCanvas ref={canvasRef} />
    </div>
  );
}
