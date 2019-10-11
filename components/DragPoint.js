export default class DragPoint {
  s = (2 + window.devicePixelRatio) / 2;
  radius = 5 * this.s;
  element;
  mouseIsDown = false;

  constructor(paper, x, y, radius = 5, color = "white") {
    this.radius = radius * this.s;

    // Create drag element ( white circle with black border )
    this.element = new paper.Path.Circle({
      center: new paper.Point(x, y),
      radius: this.radius,
      fillColor: color,
      strokeColor: "black",
      strokeWidth: (radius / (3 + 1 / 3)) * this.s
    });

    this.element.onMouseDown = e => {
      this.mouseIsDown = true;
      this.onMouseDown(e);
    };

    this.element.onMouseDrag = e => {
      // Prevent dragging if mouse down wasn't registered
      if (!this.mouseIsDown) return false;

      // Clone current position
      var elementPosition = this.element.position.clone();

      // Move element to mouse
      this.element.position = e.point;

      // Check if drag event was cancaled, restore old position.
      if (this.onMouseDrag(e) == false) this.element.position = elementPosition;
    };

    this.element.onMouseUp = e => {
      this.mouseIsDown = false;
      this.onMouseUp(e);
    };
  }
}
