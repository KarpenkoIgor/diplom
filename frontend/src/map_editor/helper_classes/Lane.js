import { fabric } from "fabric";

class Lane {
  static nextId = 0;
  constructor(Coord, options) {
    this.startCoord = {
      x: Coord[0],
      y: Coord[1]
    };
    this.endCoord = {
      x: Coord[2],
      y: Coord[3]
    };
    this.name = "Lane";
    this.lineWidth = options.strokeWidth;
    this.id = [this.name,Lane.nextId].join("_");
    Lane.nextId++;
    this.laneNum = options.laneNum;
    this.edgeID = options.edgeID;
  }

  add(canvas){
    const line = new fabric.Line([this.startCoord.x, this.startCoord.y, this.endCoord.x, this.endCoord.y],{
      strokeWidth: this.lineWidth,
      stroke: 'black',
      selectable: false,
      originX: 'left',
      realObjectID: this.id,
    });
    if (canvas) {
      canvas.add(line);     
    }
  }

  set(canvas, coord) {
    canvas.getObjects().forEach(obj => {
      if (obj.realObjectID === this.id) {
        obj.set({x1: coord[0], y1: coord[1], 
          x2: coord[2], y2: coord[3]});  
      }
    });
  }

  remove(canvas) {
    const filteredObjects = canvas.getObjects().filter(obj => obj.realObjectID !== this.id);
    canvas.clear();
    canvas.add(...filteredObjects);
  }
}
export default Lane;