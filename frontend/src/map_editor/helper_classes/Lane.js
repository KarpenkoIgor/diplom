import { fabric } from "fabric";

class Lane extends fabric.Line {
  constructor(points, options) {
    super(points, options);
    this.name = "Lane";
    this.edge = null;
  }
}
export default Lane;