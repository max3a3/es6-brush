import React, {PropTypes, Component} from "react";
import {vars,co} from '../sketch_utils/settings'
import {noMove} from '../sketch_utils/generic'
import {draw} from '../sketch_utils/tools'
import {stop} from '../sketch_utils/generic'
import {canvas_init, doc_mousedown, doc_mousemove, doc_mouseup} from "../sketch_utils/movement";
let context;

import {stamp} from '../sketch_utils/stamp'

export default class SketchCanvas extends Component {
    constructor(props) {
        super(props);
        this.isDrawing = false;
        this.isErasing = false;
        this.isStamping = false;
        this.onmousedown = this.onmousedown.bind(this);
        this.end = this.end.bind(this);
        this.onmousemove = this.onmousemove.bind(this);
    }

    componentDidMount() {
        // this.refs.canvas.height = window.innerHeight-180;
        // this.refs.canvas.width = window.innerWidth-60;
        context = this.refs.canvas.getContext("2d");
        canvas_init(this.refs.canvas.width,this.refs.canvas.height)

        function test_draw() {
            context.lineWidth = 13;
            context.strokeStyle = "yellow";

            context.beginPath();
            context.moveTo(0, 50);
            context.lineTo(100, 50);
            context.stroke();

        }
        test_draw()
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
        return event.nativeEvent.offsetX

    }

    getY(event) {
        return event.nativeEvent.offsetY
    }

    onmousedown(e) { // :6319
        console.log("type",vars.type)

        //new
        let local_pt = {X:this.getX(e), Y:this.getY(e)}
        doc_mousedown(local_pt)

        if (vars.type == 'crop') {
            // co.core(e, crop.core);
        } else if (vars.type == 'fill') {
            // co.core(e, draw.fill);
        } else if (vars.type == 'marquee') {
            // co.core(e, marquee.core);
        } else if (vars.type == 'picker') {
        //     var a = XY(e);
        //     a.X -= abPos(this).X;
        //     a.Y -= abPos(this).Y;
        //     a.X = Math.max(0, Math.min(canvas.W - 1, a.X));
        //     a.Y = Math.max(0, Math.min(canvas.H - 1, a.Y));
        //     picker.core(a, a, 'down', e);
        } else if (vars.type == 'shape') {
            // co.core(e, draw.shape);
        } else if (vars.type == 'text') {
            // co.core(e, draw.text);
        } else if ({
            'calligraphy': 1, //------------------->
            'stamp': 1
        } [vars.type]) {
            if (stamp.loaded) {
                co.core(e, draw[vars.type]);
            } else {
                noMove();
            }
        } else if(vars.type == 'spirograph') {
            co.core(e, draw.spirograph);
        } else if ({                     // OK
            'brush': 1,
            'pencil': 1,
            'eraser': 1
        } [vars.type]) {
            co.core(e, draw[vars.type]);
        } else {
            // return noMove();
        }
    }

    onmousemove(e) { // :6300
        let local_pt = {X:this.getX(e), Y:this.getY(e)}
        if (stop) {
            if ({
                'marquee': 1,
                'text': 1,
                'crop': 1
            } [vars.type]) {
                mouse.cursor(e, this); //wng notyet
            }


            if (vars.type == 'picker') {
                var a = XY(e);
                a.X -= abPos(this).X;
                a.Y -= abPos(this).Y;
                a.X = Math.max(0, Math.min(canvas.W - 1, a.X));
                a.Y = Math.max(0, Math.min(canvas.H - 1, a.Y));
                picker.core(a, '', 'move');
            }
        }
        else {// 2045
            doc_mousemove(e,local_pt)

        }


        e.preventDefault();
    }

    end(e) {
        let local_pt = {X:this.getX(e), Y:this.getY(e)}
        doc_mouseup(e,local_pt)
        e.preventDefault();
    }

    render() {
        return (
              <canvas
                className="main-canvas sp_canvas"
                ref="canvas"
                id="ctx_temp"
                onTouchStart = {this.onmousedown}
                onTouchMove = {this.onmousemove}
                onTouchEnd={this.end}
                onTouchCancel = {this.end}
                onMouseDown={this.onmousedown}
                onMouseUp={this.end}
                onMouseMove={this.onmousemove}
                onClick={this.stamp}

                style={{zIndex: 100}}
            />
        );
    }
}
