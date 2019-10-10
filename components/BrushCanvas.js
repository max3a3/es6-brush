export default class Canvas extends Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    invariant(this.canvasRef.current) 
    initBrush(this.canvasRef.current.context)
    this.brush = getBrush();
  }
  mouseDOwn = event => {
    getBrush().beginStroke(
      _brushColor,
      _brushSize,
      _transformModes,
      coords.x,
      coords.y,
      shadow
    )
    this.isDrawing = true;
  };
  getLocalXY(event) {
    let x, y;
    if (event.pageY === undefined) {
      y = event.targetTouches[0].pageY - this.refs.canvas.offsetTop;
    } else {
      y = event.pageY - this.refs.canvas.offsetTop;
    }
    if (event.pageX === undefined) {
      x = event.targetTouches[0].pageX - this.refs.canvas.offsetLeft;
    } else {
      x = event.pageX - this.refs.canvas.offsetLeft;
    }

    return [x, y];
  }
  mouseMove = event => {
    if (this.isDrawing) {
      let [x, y] = this.getLocalXY(event);
      this.brush.doStroke(x, y);
    }
  }

  mouseUp = event => {
    if (this.isDrawing) {
      this.brush.endStroke()
    }
  }

  render() {
    <canvas
      className="canvas"
      ref={this.canvasRef}
      id="canvas"
      onMouseDown={this.mouseDown}
      onMouseUp={this.mouseUp}
      onMouseMove={this.mouseMove}
    />;
  }
}
