import { fabric } from "fabric";

class Edge extends fabric.Line {
  constructor(points, options) {
    super(points, options);
    this.numLanes = options.numLanes || 1;
  }

  _render(ctx) {
    if (!this.visible) return;
    const { x1, y1, x2, y2 } = this;
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const unitDeltaX = deltaX / length;
    const unitDeltaY = deltaY / length;
    const laneWidth = this.strokeWidth * 2;
    const totalWidth = laneWidth * this.numLanes;
    const halfTotalWidth = totalWidth / 2;

    for (let i = 0; i < this.numLanes; i++) {
      const laneY = y1 + (i * laneWidth) - halfTotalWidth;
      ctx.beginPath();
      ctx.moveTo(x1, laneY);
      ctx.lineTo(x2, laneY + (length * unitDeltaY));
      ctx.lineWidth = this.strokeWidth;
      ctx.strokeStyle = this.stroke || "black";
      ctx.stroke();
    }
  }
}

export default Edge;
