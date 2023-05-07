import { fabric } from "fabric";
import Lane from "./Lane";


function rotateLine(cx, cy, ax, ay, R2) {

  const r1 = Math.sqrt((ax - cx) ** 2 + (ay - cy) ** 2);
  const ac1 = [ax - cx, ay - cy];
  const bc1 = [-ac1[1], ac1[0]];
  const bc1_norm = [bc1[0] / r1, bc1[1] / r1];
  const bc1_scaled = [bc1_norm[0] * R2, bc1_norm[1] * R2];
  const bx = cx  + bc1_scaled[0];
  const by = cy  + bc1_scaled[1];
  const bx1 = ax + bc1_scaled[0];
  const by1 = ay + bc1_scaled[1];

  return [bx, by, bx1, by1];
}

class Edge {
  static nextId = 0;
  constructor(Coord) {
    this.startCoord = {
      x: Coord[0],
      y: Coord[1]
    };
    this.endCoord = {
      x: Coord[2],
      y: Coord[3]
    };
    this.numLanes = 1;
    this.name = "Edge";
    this.id = Edge.nextId;
    Edge.nextId++;
    this.lineWidth = 8;
  }

  add(canvas){
    for (let i = 0; i < this.numLanes; i++){
      const lane = new fabric.Line([this.startCoord.x, this.startCoord.y, this.endCoord.x, this.endCoord.y], {
        strokeWidth: this.lineWidth,
        stroke: 'black',
        selectable: false,
        originX: 'left',
        edgeID: this.id,
        laneNum: i,
      });

      if (canvas) {
        canvas.add(lane);
        
      }
    }
  }

  set(canvas, coord) {
    canvas.getObjects().forEach(obj => {
      if (obj.edgeID === this.id) {
        const lineCoords = rotateLine(coord[0], coord[1], coord[2], coord[3], this.lineWidth/2*(obj.laneNum+1));
        obj.set({x1: lineCoords[0], y1: lineCoords[1], 
          x2: lineCoords[2], y2: lineCoords[3]});  
      }
    });
  }
  
  remove(canvas) {
    const filteredObjects = canvas.getObjects().filter(obj => obj.edgeID !== this.id);
    canvas.clear();
    canvas.add(...filteredObjects);
  }
}

export default Edge;
