import { fabric } from 'fabric';

class Junction{
  static nextId = 0;
  constructor(options) {
    this.name = "Junction";
    this.left = options.left;
    this.top = options.top;
    this.fill = options.fill || 'red';
    this.radius = options.radius || 10;
    this.id = [this.name, Junction.nextId].join("_");
    Junction.nextId++;
    this.inEdge = [];
    this.outEdge = [];
  }

  add(canvas){
      const circle = new fabric.Circle({
        radius: this.radius,
        left: this.left,
        top: this.top,
        fill: this.fill,
        selectable: false,
        realObjectID: this.id,
        perPixelTargetFind: true,
      });
      if (canvas) {
        canvas.add(circle);        
      }
  }

  set(canvas, coord) {
    canvas.getObjects().forEach(obj => {
      if (obj.realObjectID === this.id) {
        obj.set({left: coord.left, top: coord.top});  
        this.left = coord.left;
        this.top = coord.top;
      }
    });
  }

  setTop(top, objects, setObjects){
    this.top = top;
    const size = objects.length;
    for(let i=0; i<size; i++){
      if(this.id==objects[i].realObjectID){
        objects[i].set({top: this.top,});
      }
    }
    this.inEdge.forEach(obj => {
      obj.setCoord([obj.startCoord.x, obj.startCoord.y, this.left+7, this.top+7],objects, setObjects);
    })
    this.outEdge.forEach(obj => {
      obj.setCoord([this.left+7, this.top+7, obj.endCoord.x, obj.endCoord.y],objects, setObjects);
    })
    setObjects([...objects]);
  }

  setLeft(left, objects, setObjects){
    this.left = left;
    const size = objects.length;
    for(let i=0; i<size; i++){
      if(this.id==objects[i].realObjectID){
        objects[i].set({left: this.left,});
      }
    }
    this.inEdge.forEach(obj => {
      obj.setCoord([obj.startCoord.x, obj.startCoord.y, this.left+7, this.top+7],objects, setObjects);
    })
    this.outEdge.forEach(obj => {
      obj.setCoord([this.left+7, this.top+7, obj.endCoord.x, obj.endCoord.y],objects, setObjects);
    })
    setObjects([...objects]);
  }
  
  remove(canvas) {
    const filteredObjects = canvas.getObjects().filter(obj => obj.realObjectID !== this.id);
    canvas.clear();
    canvas.add(...filteredObjects);
  }

  addInEdge(edge) {
    this.inEdge.push(edge);
  }

  addOutEdge(edge){
    this.outEdge.push(edge);
  }
  
  setFill(canvas, color){
    this.fill = color;
    canvas.getObjects().forEach(obj => {
      if (obj.realObjectID === this.id) {
        obj.set({fill: this.fill});  
      }
    });
  }

}

export default Junction;
