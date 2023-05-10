import Lane from "./Lane";


function rotateLine(cx, cy, ax, ay, R2) {
  const r1 = Math.sqrt((ax - cx) ** 2 + (ay - cy) ** 2);
  if(r1==0) return [cx, cy, ax, ay];
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
    this.name = "Edge";
    this.id = [this.name, Edge.nextId].join("_");
    Edge.nextId++;
    this.lineWidth = 8;
    this.lanes = [];
  }

  add(canvas){
    const size = this.lanes.length + 1;
    for (let i = 0; i < size; i++){
      const lineCoords = rotateLine(this.startCoord.x, this.startCoord.y, 
        this.endCoord.x, this.endCoord.y, (i+1/2)*this.lineWidth);
      const lane = new Lane([lineCoords[0], lineCoords[1], lineCoords[2], lineCoords[3]], {
        strokeWidth: this.lineWidth,
        edgeID: this.id,
        laneNum: i,
      });

      if (canvas) {
        lane.add(canvas);   
        this.lanes.push(lane);    
      }
    }
  }

  set(canvas, coord) {
    this.startCoord = {
      x: coord[0],
      y: coord[1]
    };
    this.endCoord = {
      x: coord[2],
      y: coord[3]
    };
    this.lanes.forEach(obj => {
      const lineCoords = rotateLine(coord[0], coord[1], coord[2], coord[3], this.lineWidth*(obj.laneNum+1/2));
      obj.set(canvas, [lineCoords[0],  lineCoords[1], 
       lineCoords[2],lineCoords[3]]);  
    });
  }

  setCoord(coord, objects, setObjects){
    this.startCoord = {
      x: coord[0],
      y: coord[1]
    };
    this.endCoord = {
      x: coord[2],
      y: coord[3]
    };
    this.lanes.forEach(obj => {
      const lineCoords = rotateLine(coord[0], coord[1], coord[2], coord[3], this.lineWidth*(obj.laneNum+1/2));
      obj.setCoord([lineCoords[0],  lineCoords[1], 
       lineCoords[2],lineCoords[3]], objects, setObjects);  
    });
  }

  setNumLanes(num, objects, setObjects){
    if(num > this.lanes.length){
      const bigin = this.lanes.length;
      for (let i = bigin; i < num; i++){
        const lineCoords = rotateLine(this.startCoord.x, this.startCoord.y, 
          this.endCoord.x, this.endCoord.y, (i+1/2)*this.lineWidth);
        const lane = new Lane([lineCoords[0], lineCoords[1], lineCoords[2], lineCoords[3]], {
          strokeWidth: this.lineWidth,
          edgeID: this.id,
          laneNum: i,
        });
        lane.addToCanvasObjects(objects, setObjects);   
        this.lanes.push(lane);    
      }
    }
    else if (num < this.lanes.length){
      const end = this.lanes.length;
      for(let i = end; i > num; i--){
        this.lanes[i - 1].removeFromCanvasObject(objects, setObjects);
        this.lanes.pop()
      }
    }
  }
  
  remove(canvas) {
    this.lanes.forEach((obj, index) => {
      obj.remove(canvas); 
      this.lanes.splice(index, 1); 
    });
  }
}

export default Edge;