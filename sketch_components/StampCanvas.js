import React, {Component} from "react";
import {TOOLS} from "./sketch_config";
import {update_stamp, stamp} from "../sketch_utils/stamp";
import {co, update_setting_stamp, vars} from "../sketch_utils/settings";
import {$, $2D} from "../sketch_utils/generic";
import {style} from "../sketch_utils/style";


export default class StampCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef();

    this.co_stamp_image = null
  }

  loadStampImage(v) {
    if (v && this.state.v !== v) { // check if url is the same
      update_stamp('loaded', false);
      this.state.v = v // from co.glyph settings:300
      this.co_stamp_image = new Image();
      this.co_stamp_image.src = v;

      this.co_stamp_image.onload = () => {
        var o = this.co_stamp_image;

        update_stamp('loaded', true);

        var id = stamp.fileNumber;
        //C$('stamp' + id, {'-': 'load'});

        // stamp.preview(id, 'move'); //stamp option image preview

        // c ;
        update_setting_stamp('r', { // set parameter
            W: o.width,
            H: o.height
          }
        )

        //   co.stamp(); //update the canvas
        this.drawCanvas() // react version
      }

    }

  }

  drawCanvas() {
    if (this.canvasRef.current && TOOLS[this.props.state.type].stamp_canvas) {
      if (stamp.loaded) {
        var ctx_stamp = this.canvasRef.current
        var c = ctx_stamp.getContext('2d')
        let i = this.co_stamp_image
        //todo what is n for  we are scaling it down for stamp, and not for calligraphy
        let n = vars.type == 'stamp' ? vars.rand_min / 100 : 1

        let o = {
          W: Math.round(i.width * n),
          H: Math.round(i.height * n)
        };



        ctx_stamp.width = o.W;
        ctx_stamp.height = o.H;
        update_setting_stamp('r', { // set parameter
            W: ctx_stamp.width,
            H: ctx_stamp.height
          }
        )
        c.save();
        c.clearRect(0, 0, o.W, o.H);
        c.globalAlpha = vars['opacity_' + vars.type] / 100;
        c.globalCompositeOperation = 'source-over';
        c.drawImage(i, 0, 0, o.W, o.H);
        c.globalCompositeOperation = 'source-atop';
        c.rect(0, 0, o.W, o.H);
        style(c, "fillStyle", "fill", {X: 0, Y: 0}, {X: o.W, Y: o.H});
        c.fill();
        c.restore();
      }
    }
  }

  render() {
    let stamp_url = this.state.stamp_url//todo keep in sync?

    if (TOOLS[this.props.state.type].stamp_canvas)
      this.loadStampImage(this.props.state.co_stamp_image_src)
    // max radius is 100, so max brush is 200
    return (
      <canvas
        ref={this.canvasRef}
        id="ctx_stamp" width="200" height="200"
      />
    )
  }
}
