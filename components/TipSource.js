import React, {Component} from "react";

//todo remove set the canvas style a, b is the start and end
function style(c, style, type, a, b,toolStyleState) {
  switch(toolStyleState[type]) {  // here determine the fill color of the tools, only solid for now
    case "solid":
      c[style] = "rgba("+toolStyleState[type+'CO'].join(",")+")";
      break;
    case "gradient":
      var r = toolStyleState[type+'GD'],
        gradient = c.createLinearGradient(a.X, a.Y, b.X, b.Y);
      for (var key in r) {
        gradient.addColorStop(r[key][0], 'rgba(' + r[key][1].join(",") + ')');
      }
      c[style] = gradient;
      break;
    case "pattern":
      if(!toolStyleState[type+'PT~']) {
        gui_pattern.cache(type);
      }
      c[style] = toolStyleState[type+'PT~'];
      break;
  }
};

/*
?? can have a state that is queried from outside, i.e loading
    no need to have a state and prop passed in

    so use hook from outside

 */
export default class TipSource extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    // these two can come from props
    this.scale = 100
    this.opacity = 100

    this.src = ''
  }

  loadStampImage(v) {
    let {tipSourceState, setTipSource,toolStyleState} = this.props
   console.log("loadStampImage tipSourceState",tipSourceState)

    if (v && this.src !== v) { // check if url is the same
      setTipSource({...tipSourceState, loaded:false});
      this.src = v

      debugger //rename co_stamp_image
      let co_stamp_image = new Image();
      co_stamp_image.src = v;
      co_stamp_image.onload = _=>{

        var ctx_stamp = this.canvasRef.current
        var c = ctx_stamp.getContext('2d')

        // scaling factor
        //todo what is n for  we are scaling it down for stamp, and not for calligraphy
        let n = this.scale / 100

        debugger//  rename i
        let i = co_stamp_image

        let o = {
          W: Math.round(i.width * n),
          H: Math.round(i.height * n)
        };



        ctx_stamp.width = o.W;
        ctx_stamp.height = o.H;

        //c.save(); // context save restore? no need
        c.clearRect(0, 0, o.W, o.H);
        c.globalAlpha = this.opacity/ 100;
        c.globalCompositeOperation = 'source-over';
        c.drawImage(i, 0, 0, o.W, o.H);
        c.globalCompositeOperation = 'source-atop';
        c.rect(0, 0, o.W, o.H);

        // this doesn't do anything as 'fill' is not handled
        //  2nd:context attribute, 3rd:type is fill or stroke
        style(c, "fillStyle", "fill", {X: 0, Y: 0}, {X: o.W, Y: o.H},toolStyleState);

        c.fill(); // color the image

        //c.restore(); // context ?

        setTipSource({...tipSourceState,loaded:true,width:ctx_stamp.width,height:ctx_stamp.height,
          canvas:ctx_stamp});
      }
    }

  }

  render() {
    this.loadStampImage(this.props.image_src)
    // max radius is 100, so max brush is 200
    return (
      <canvas
        ref={this.canvasRef}
        id="ctx_stamp" width="200" height="200"
      />
    )
  }
}
