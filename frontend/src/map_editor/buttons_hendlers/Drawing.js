import { fabric } from 'fabric';
import Edge from '../helper_classes/Edge';
import Junction from '../helper_classes/Junction';

export function handleDrawing(fabricCanvas, canvasObjects, setCanvasObjects, isDoubleSided) {
  var line, circle1, circle2;
  
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
        left: pointer.x - 6,
        top: pointer.y - 6,
        fill: '#2bff00',
      });
    }
  
    line = new fabric.Line([circle1.left+6, circle1.top+6, pointer.x, pointer.y], {
      strokeWidth: 8,
      stroke: 'black',
      selectable: false,
      originX: 'left',
    });
    circle2 = new Junction({
      left: pointer.x,
      top: pointer.y,
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
    line.set({x2: pointer.x, y2: pointer.y });
    circle2.set({ left: pointer.x-6, top: pointer.y-6 });
    fabricCanvas.renderAll();
  }

  function handleMouseUp(options) {
    var pointer = fabricCanvas.getPointer(options.e);
    var clickedObject = fabricCanvas.findTarget(options.e);
    if (clickedObject && clickedObject.constructor.name === 'Junction') {
        if(clickedObject != circle1){
            var newLine = new fabric.Line([line.x1, line.y1, clickedObject.left, clickedObject.top], {
                strokeWidth: 8,
                stroke: 'black',
                selectable: false,
                originX: 'left',
              });
              var newCircle2 = new Junction({
                left: clickedObject.left,
                top: clickedObject.top,
              })
              fabricCanvas.remove(clickedObject);
        }
    } else {
        var newLine = new fabric.Line([line.x1, line.y1, pointer.x, pointer.y], {
            strokeWidth: 8,
            stroke: 'black',
            selectable: false,
            originX: 'left',
          });
          var newCircle2 = new Junction({
            left: pointer.x-6,
            top: pointer.y-6,
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
      setCanvasObjects([...canvasObjects, newLine, newCircle1, newCircle2]);
    fabricCanvas.off('mouse:down');
    fabricCanvas.off('mouse:move');
    fabricCanvas.off('mouse:up');
    fabricCanvas.on('mouse:down', handleMouseDown);
  }

  fabricCanvas.on('mouse:down', handleMouseDown);
}