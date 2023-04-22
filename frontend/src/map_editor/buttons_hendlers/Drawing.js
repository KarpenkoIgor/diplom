import { fabric } from 'fabric';
import Edge from '../helper_classes/Edge';
import Junction from '../helper_classes/Junction';


const circleR = 7;
const lineWidth = 8;


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


export function handleDrawing(fabricCanvas, canvasObjects, setCanvasObjects, isDoubleSided) {
  var line, backline, circle1, circle2;
  function handleMouseDown(options) {
    var pointer = fabricCanvas.getPointer(options.e);
    var clickedObject = fabricCanvas.findTarget(options.e);
    if (clickedObject && clickedObject.constructor.name === 'Junction') {
      circle1 = new Junction({
        left: clickedObject.left,
        top: clickedObject.top,
        fill: '#2bff00',
      });
      fabricCanvas.remove(clickedObject);
    } else {
      circle1 = new Junction({
        left: pointer.x - circleR,
        top: pointer.y - circleR,
        fill: '#2bff00',
      });
    }  
    
    line = new fabric.Line([circle1.left+circleR, circle1.top+circleR, pointer.x, pointer.y], {
      strokeWidth: lineWidth,
      stroke: 'black',
      selectable: false,
    });
    if(isDoubleSided) {
      backline = new fabric.Line([pointer.x, pointer.y, circle1.left+circleR, circle1.top+circleR ], {
        strokeWidth: lineWidth,
        stroke: 'black',
        selectable: false,
      });
      fabricCanvas.add(backline);
    }
    circle2 = new Junction({
      left: pointer.x-circleR,
      top: pointer.y-circleR,
    });
    fabricCanvas.add(line);
    fabricCanvas.add(circle1);
    fabricCanvas.add(circle2);
    fabricCanvas.off('mouse:down');
    fabricCanvas.on('mouse:move', handleMouseMove);
    fabricCanvas.on('mouse:down', handleMouseUp);
  }

  function handleMouseMove(options) {
    var pointer = fabricCanvas.getPointer(options.e);
    const [lineX1, lineY1, lineX2, lineY2] = rotateLine(circle1.left + 
     circleR, circle1.top + circleR, pointer.x, pointer.y, lineWidth/2);
    line.set({x1: lineX1, y1: lineY1, x2: lineX2, y2: lineY2});
    if(isDoubleSided){
      const [backlineX1, backlineY1, backlineX2, backlineY2] = rotateLine( pointer.x, pointer.y, circle1.left + 
        circleR, circle1.top + circleR, lineWidth/2);
       backline.set({x1: backlineX1, y1: backlineY1, x2: backlineX2, y2: backlineY2});
    }
    circle2.set({ left: pointer.x-circleR, top: pointer.y-circleR });
    fabricCanvas.renderAll();
  }

  function handleMouseUp(options) {
    var pointer = fabricCanvas.getPointer(options.e);
    var clickedObject = fabricCanvas.findTarget(options.e);
    if (clickedObject && clickedObject.constructor.name === 'Junction') {
        if(clickedObject !== circle1){
          const [lineX1, lineY1, lineX2, lineY2] = rotateLine(circle1.left + 
            circleR, circle1.top + circleR, clickedObject.left+ circleR, clickedObject.top+ circleR, lineWidth/2);
            var newLine = new fabric.Line([lineX1, lineY1, lineX2, lineY2], {
              strokeWidth: lineWidth,
              stroke: 'black',
              selectable: false,
              originX: 'left',
            });
            if(isDoubleSided){
              const [backlineX1, backlineY1, backlineX2, backlineY2] = rotateLine(clickedObject.left+ 
                circleR, clickedObject.top+
                circleR, circle1.left + 
                circleR, circle1.top + circleR, lineWidth/2);
                var newBackLine = new fabric.Line([backlineX1, backlineY1, backlineX2, backlineY2], {
                  strokeWidth: lineWidth,
                  stroke: 'black',
                  selectable: false,
                  originX: 'left',
                });
                fabricCanvas.remove(backline);
                fabricCanvas.add(newBackLine);
            }
            var newCircle2 = new Junction({
              left: clickedObject.left,
              top: clickedObject.top,
            });
            fabricCanvas.remove(clickedObject);
        }
    } else {
        const [lineX1, lineY1, lineX2, lineY2] = rotateLine(circle1.left + 
          circleR, circle1.top + circleR, pointer.x, pointer.y, lineWidth/2);
        var newLine = new fabric.Line([lineX1, lineY1, lineX2, lineY2], {
            strokeWidth: lineWidth,
            stroke: 'black',
            selectable: false,
            originX: 'left',
          });
          if(isDoubleSided){
            const [backlineX1, backlineY1, backlineX2, backlineY2] = rotateLine( pointer.x, pointer.y, circle1.left + 
              circleR, circle1.top + circleR, lineWidth/2);
              var newBackLine = new fabric.Line([backlineX1, backlineY1, backlineX2, backlineY2], {
                strokeWidth: lineWidth,
                stroke: 'black',
                selectable: false,
                originX: 'left',
              });
            fabricCanvas.remove(backline);
            fabricCanvas.add(newBackLine);
          }
          var newCircle2 = new Junction({
            left: pointer.x-circleR,
            top: pointer.y-circleR,
          })
    }
      var newCircle1 = new Junction({
        left: circle1.left,
        top: circle1.top,
      })


      fabricCanvas.remove(line);
      fabricCanvas.remove(circle1);
      fabricCanvas.remove(circle2);
      fabricCanvas.add(newLine);
      fabricCanvas.add(newCircle1);
      fabricCanvas.add(newCircle2);
      if(isDoubleSided){
        setCanvasObjects([...canvasObjects, newBackLine, newLine, newCircle1, newCircle2]);
      }
      else {
        setCanvasObjects([...canvasObjects, newLine, newCircle1, newCircle2]);
      }

    fabricCanvas.off('mouse:down');
    fabricCanvas.off('mouse:move');
    fabricCanvas.off('mouse:up');
    fabricCanvas.on('mouse:down', handleMouseDown);
  }

  fabricCanvas.on('mouse:down', handleMouseDown);
}