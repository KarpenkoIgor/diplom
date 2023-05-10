import { fabric } from 'fabric';

class Junction{
  static nextId = 0;
  constructor(options) {
    this.name = "Junction";
    this.left = options.left;
    this.top = options.top;
    this.fill = options.fill || 'red';
    this.id = [this.name, Junction.nextId].join("_");
    Junction.nextId++;
    this.inEdge = [];
    this.outEdge = [];
  }

  add(canvas){
      const circle = new fabric.Circle({
        radius: 10,
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
