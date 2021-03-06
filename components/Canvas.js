import React, {PropTypes, Component} from "react";
// import { BRUSH, ERASER, STAMP } from "../constants/Tools";

let ctx;

export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.isDrawing = false;
        this.isErasing = false;
        this.isStamping = false;
        this.start = this.start.bind(this);
        this.end = this.end.bind(this);
        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        this.refs.canvas.height = window.innerHeight-80;
        this.refs.canvas.width = window.innerWidth-60;
        ctx = this.refs.canvas.getContext("2d");
    }

    getStroke() {
        return 3;
        // return this.props.tools.brush_size;
    }

    getColor() {
        return "red";
        // return this.props.tools.brush_color;
    }

    getX(event) {
        if (event.pageX === undefined) {
            return event.targetTouches[0].pageX - this.refs.canvas.offsetLeft;
        } else {
            return event.pageX - this.refs.canvas.offsetLeft;
        }
    }

    getY(event) {
        if (event.pageY === undefined) {
            return event.targetTouches[0].pageY - this.refs.canvas.offsetTop;
        } else {
            return event.pageY - this.refs.canvas.offsetTop;
        }
    }

    start(event) {
        // if (this.props.tools.tool === BRUSH || this.props.tools.tool === ERASER) {
        this.isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(this.getX(event), this.getY(event));
        event.preventDefault();
        // }
    }

    draw(event) {
        if (this.isDrawing) {
            ctx.strokeStyle = this.getColor();
            ctx.lineTo(this.getX(event), this.getY(event));
            ctx.lineWidth = this.getStroke();

            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
        }
        event.preventDefault();
    }

    end(event) {
        if (this.isDrawing) {
            ctx.stroke();
            ctx.closePath();
            this.isDrawing = false;
        }
        event.preventDefault();
    }

    render() {
        return (
            <div> simple brush
              <canvas
                className="main-canvas"
                ref="canvas"
                id="canvas"
                onTouchStart = {this.start}
                onTouchMove = {this.draw}
                onTouchEnd={this.end}
                onTouchCancel = {this.end}
                onMouseDown={this.start}
                onMouseUp={this.end}
                onMouseMove={this.draw}
                onClick={this.stamp}
            />
            </div>
        );
    }
}
