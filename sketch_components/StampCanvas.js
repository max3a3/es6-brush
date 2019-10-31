import React, {Component} from "react";
import {TOOLS} from "./sketch_config";
import {update_stamp} from "../sketch_utils/stamp";
import {co} from "../sketch_utils/settings";


export default class StampCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef();

    this.co_stamp_image = null
  }
  loadStampImage(v) {
    if (this.state.v !== v) { // check if url is the same
      this.state.v = v // from co.glyph settings:300
      this.co_stamp_image = new Image();
      this.co_stamp_image.src = v;

      this.co_stamp_image.onload = () =>{
        var o = this.co_stamp_image;

        update_stamp('loaded',true);

        var id = stamp.fileNumber;
        C$('stamp' + id, {'-': 'load'});

        stamp.preview(id, 'move');
        co.stamp.r = {
          W: o.width,
          H: o.height
        };

        co.stamp();
      }

    }

  }
  drawCanvas() {
    if (this.canvasRef.current && TOOLS[this.props.state.type].stamp_canvas) {
    }
  }

  render() {

    this.drawCanvas()
    // max radius is 100, so max brush is 200
    return (
      <canvas
        ref={this.canvasRef}
        id="ctx_stamp" width="200" height="200"
      />
    )
  }
}
