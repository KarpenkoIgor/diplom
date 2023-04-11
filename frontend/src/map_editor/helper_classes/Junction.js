import { fabric } from 'fabric';
import Edge from './Edge';

class Junction extends fabric.Circle {
  constructor(options) {
    super({
      radius: 10,
      fill: 'red',
      left: options.left,
      top: options.top,
      selectable: false,
      ...options
    });
    this.inEdges = [];
    this.outEdges = [];
  }

  addInEdge(edge) {
    this.inEdges.push(edge);
  }

  addOutEdge(edge) {
    this.outEdges.push(edge);
  }

  removeInEdge(edge) {
    const index = this.inEdges.indexOf(edge);
    if (index > -1) {
      this.inEdges.splice(index, 1);
    }
  }

  removeOutEdge(edge) {
    const index = this.outEdges.indexOf(edge);
    if (index > -1) {
      this.outEdges.splice(index, 1);
    }
  }

  getInEdges() {
    return this.inEdges;
  }

  getOutEdges() {
    return this.outEdges;
  }
}

export default Junction;
