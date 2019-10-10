export default class Canvas extends Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef();

  }
  componentDidMount() {
    this.brush = getBrush()
  }
  mouseDOwn = event => {
    getBrush().beginStroke(
      _brushColor,
      _brushSize,
      _transformModes,
      coords.x,
      coords.y,
      shadow
    );
    this.isDrawing = true
  };
  getLocalXY(event) {
    return [event.targetTouches[0].pageY - this.canvasRef.current.offsetTop]
  }
  mouseMove = event => {
              return event.targetTouches[0].pageY - this.refs.canvas.offsetTop;
      let [x,y] = this.getLocalXY(event)
      this.brush.doStroke(x,y);

  };
  mouseUp = event => {};
  render() {
    <canvas
      className="canvas"
      ref={this.canvasRef}
      id="canvas"
      onMouseDown={this.mouseDown}
      onMouseUp={this.end}
      onMouseMove={this.mouseMove}
      onClick={this.stamp}
    />;
  }
}
