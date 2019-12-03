import {co, vars} from "../sketch_utils/settings";
import React, {Component} from "react";
import {TOOLS} from "./sketch_config";
import {update_stamp} from "../sketch_utils/stamp";


/*
set property to  vars in render
and draw  vars for now  to be same code

 */


export default class BrushCanvas extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.drawCanvas()
  }

  drawCanvas() {
    if (this.canvasRef.current && TOOLS[this.props.state.type].brush_canvas) {
      var ctx_brush = this.canvasRef.current
      let c = this.canvasRef.current.getContext("2d");
      var D = vars['diameter_' + vars.type]
      var D2 = D * 2;
      ctx_brush.width = D2;
      ctx_brush.height = D2;
      co.del(c); //clear
      c.globalCompositeOperation = 'source-over';
      var r = c.createRadialGradient(D, D, (vars.type === 'pencil') ? D - 1 : vars['hardness_' + vars.type] / 100 * D - 1, D, D, D);
      r.addColorStop(0, 'rgba(0,0,0,' + (vars['opacity_' + vars.type] / 100) + ')');
      r.addColorStop(0.95, 'rgba(0,0,0,0)'); // prevent aggregation of semi-opaque pixels
      r.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = r;
      c.fillRect(0, 0, D2, D2);
      c.globalCompositeOperation = 'source-in';
      c.rect(0, 0, D2, D2);

      //set the color
      co.style[vars.fill]({
          'X': 0,
          'Y': 0
        },
        {
          'X': D2,
          'Y': D2
        },
        c, 'fill');

    }
  }

  render() {

    this.drawCanvas()
    // max radius is 100, so max brush is 200
    return (
      <canvas
        ref={this.canvasRef}
        id="ctx_brush" width="200" height="200"
      />
    )
  }
}
