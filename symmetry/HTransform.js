import {TransformMode} from '../components/basic_class'

let moveId
let moveX, moveY // the center?
function getHorizontalTransform() {
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
