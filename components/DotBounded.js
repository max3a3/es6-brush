import DragPoint from "./DragPoint";

export default class DotBounded extends DragPoint {
  _limitRange = null;
  _limitRangeDisplay = null;

  constructor(paper, x, y) {
    super(paper, x, y);

    let bounds = new paper.Rectangle(30, 10, 180, 90); // todo should be passed in

    this._limitRange = bounds.clone();

    this._limitRangeDisplay = new paper.Path.Rectangle({
      rectangle: this._limitRange,
      strokeWidth: 1 * this.s,
      strokeColor: "blue",
      visible: false,
      dashArray: [5 * this.s, 8 * this.s]
    });

    this.onMouseDrag(null);
  }

  onMouseDown(
    e // called by base class
  ) {
    this._limitRangeDisplay.visible = true;
    return true;
  }

  onMouseUp(
    e // called by base class
  ) {
    this._limitRangeDisplay.visible = false;
    return true;
  }

  onMouseDrag(e) {
    if (!this._limitRange.contains(this.element.position)) {
      if (this.element.position.x > this._limitRange.right)
        this.element.position.x = this._limitRange.right;
      if (this.element.position.x < this._limitRange.left)
        this.element.position.x = this._limitRange.left;
      if (this.element.position.y > this._limitRange.bottom)
        this.element.position.y = this._limitRange.bottom;
      if (this.element.position.y < this._limitRange.top)
        this.element.position.y = this._limitRange.top;
    }
    return true;
  }
}
