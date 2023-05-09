import { fabric } from "fabric";

class Lane {
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
    this.laneNum = options.laneNum;
    this.edgeID = options.edgeID;
    this.id = [this.edgeID,options.laneNum].join("_");
  }

  add(canvas){
    const line = new fabric.Line([this.startCoord.x, this.startCoord.y, this.endCoord.x, this.endCoord.y],{
      strokeWidth: this.lineWidth,
      stroke: 'black',
      selectable: false,
      originX: 'left',
      realObjectID: this.id,
      perPixelTargetFind: true,
    });
    if (canvas) {
      canvas.add(line);     
    }
  }

  addToCanvasObjects(objects, setObjects){
    const line = new fabric.Line([this.startCoord.x, this.startCoord.y, this.endCoord.x, this.endCoord.y],{
      strokeWidth: this.lineWidth,
      stroke: 'black',
      selectable: false,
      originX: 'left',
      realObjectID: this.id,
      perPixelTargetFind: true,
    });

    const [thisName, thisId, thisSubId] = this.id.split('_');
    const size = objects.length;
    for(let i=0; i<size; i++){
      const [name, id, subId] = objects[i].realObjectID.split('_');
      if(name+id==thisName+thisId&&subId==thisSubId-1){
        const splitIndex = objects.findIndex(obj => obj.realObjectID === objects[i].realObjectID); 
        const firstHalf = objects.slice(0, splitIndex + 1);
        const secondHalf = objects.slice(splitIndex + 1); 
        setObjects([...firstHalf, line, ...secondHalf]);
      }
    }
  }

  removeFromCanvasObject(objects, setObjects){
    const [thisName, thisId, thisSubId] = this.id.split('_');
    const size = objects.length;
    for(let i=0; i<size; i++){
      const [name, id, subId] = objects[i].realObjectID.split('_');
      if(name+id==thisName+thisId&&subId==thisSubId){
        const splitIndex = objects.findIndex(obj => obj.realObjectID === objects[i].realObjectID); 
        const firstHalf = objects.slice(0, splitIndex);
        const secondHalf = objects.slice(splitIndex + 1); 
        setObjects([...firstHalf, ...secondHalf]);
      }
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