import { fabric } from 'fabric';
import Edge from '../helper_classes/Edge';
import Junction from '../helper_classes/Junction';

export function handleDrawing(fabricCanvas, canvasObjects, setCanvasObjects) {
  var line, circle1, circle2;
  

  fabricCanvas.on('mouse:down', function (options) {
    var pointer = fabricCanvas.getPointer(options.e);
    circle1 = new Junction({
      left: pointer.x,
      top: pointer.y,
    });
    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
      strokeWidth: 6,
      stroke: 'black',
      selectable: false
    });
    circle2 = new Junction({
      left: pointer.x,
      top: pointer.y,
    });
    fabricCanvas.add(circle1);
    fabricCanvas.add(line);
    fabricCanvas.add(circle2);
    fabricCanvas.on('mouse:move', function (options) {
      var pointer = fabricCanvas.getPointer(options.e);
      line.set({ x2: pointer.x, y2: pointer.y });
      circle2.set({ left: pointer.x, top: pointer.y });
      fabricCanvas.renderAll();
    });
    fabricCanvas.on('mouse:up', function (options) {
      var pointer = fabricCanvas.getPointer(options.e);
      var newLine = new fabric.Line([line.x1, line.y1, pointer.x, pointer.y], {
        strokeWidth: 6,
        stroke: 'black',
        selectable: false
      });
      var newCircle1 = new Junction({
        left: line.x1,
        top: line.y1,
      })
      var newCircle2 = new Junction({
        left: pointer.x,
        top: pointer.y,
      })
      fabricCanvas.remove(line);
      fabricCanvas.remove(circle1);
      fabricCanvas.remove(circle2);
      fabricCanvas.add(newLine);
      fabricCanvas.add(newCircle1);
      fabricCanvas.add(newCircle2);
      setCanvasObjects([...canvasObjects, newLine, newCircle1, newCircle2]);
      fabricCanvas.off('mouse:move');
      fabricCanvas.off('mouse:up');
    });
  });
}