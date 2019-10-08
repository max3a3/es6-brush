import {TransformMode,Point} from '../components/basic_class'
import {_canvasHeight, _canvasWidth,_appBarHeight} from "../tconfig";

let moveId // todo not used?
let moveX, moveY // the center?
export function getHorizontalTransform() {

    // see onSymmetry
    var vCenter = _canvasHeight / 2;
    var hCenter = _canvasWidth / 2;

    var newMode = new TransformMode();

    moveId = "move_" + mode;
    const mode ='symmetry_H'
    if (mode === "symmetry_H") {
        newMode.setMirror(new Point(0, vCenter), new Point(_canvasWidth, vCenter));

        moveX = '16px';
        moveY = vCenter - 8 + _appBarHeight + 'px';
    }
    return newMode
}
