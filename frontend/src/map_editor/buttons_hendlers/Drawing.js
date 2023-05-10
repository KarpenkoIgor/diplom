import Edge from '../helper_classes/Edge';
import Junction from '../helper_classes/Junction';
import findRealObject from './functions/FindRealObject';
import findCanvasObject from './functions/FindCanvasObject';


const circleR = 7;


export function handleDrawing(fabricCanvas, canvasObjects, setCanvasObjects, realObjects, setRealObjects, isDoubleSided) {
  var line, backline, circle1, circle2;
  const newRealObjects = [];
  function handleMouseDown(options) {
    const pointer = fabricCanvas.getPointer(options.e);
    const clickedObject = fabricCanvas.findTarget(options.e);
    if (clickedObject && clickedObject.realObjectID.split("_")[0] === 'Junction') {
      circle1 = findRealObject(clickedObject, realObjects);
      circle1.setFill(fabricCanvas, "#2bff00");
      fabricCanvas.remove(clickedObject);
    } else {
      circle1 = new Junction({
        left: pointer.x - circleR,
        top: pointer.y - circleR,
        fill: '#2bff00',
      });
      newRealObjects.push(circle1);
    }  
    
    line = new Edge([circle1.left+circleR, circle1.top+circleR, pointer.x, pointer.y]);
    if(isDoubleSided) {
      backline = new Edge([pointer.x, pointer.y, circle1.left+circleR, circle1.top+circleR]);
      backline.add(fabricCanvas);
    }
    circle2 = new Junction({
      left: pointer.x-circleR,
      top: pointer.y-circleR,
    });
    line.add(fabricCanvas);
    circle1.add(fabricCanvas);
    circle2.add(fabricCanvas);
    fabricCanvas.off('mouse:down');
    fabricCanvas.on('mouse:move', handleMouseMove);
    fabricCanvas.on('mouse:down', handleMouseUp);
  }

  function handleMouseMove(options) {
    const pointer = fabricCanvas.getPointer(options.e);
    line.set(fabricCanvas, [circle1.left + 
      circleR, circle1.top + circleR, pointer.x, pointer.y]);
    if(isDoubleSided){
       backline.set(fabricCanvas, [pointer.x, pointer.y, circle1.left + 
        circleR, circle1.top + circleR]);
    }
    circle2.set(fabricCanvas, { left: pointer.x-circleR, top: pointer.y-circleR });
    fabricCanvas.renderAll();
  }

  function handleMouseUp(options) {
    const pointer = fabricCanvas.getPointer(options.e);
    const clickedObject = fabricCanvas.findTarget(options.e);
    if (clickedObject && clickedObject.realObjectID.split("_")[0] === 'Junction') {
        if(clickedObject !== circle1){
            line.set(fabricCanvas, [circle1.left + 
              circleR, circle1.top + circleR, clickedObject.left+ circleR, clickedObject.top+ circleR]);
            newRealObjects.push(line);
            if(isDoubleSided){
              backline.set(fabricCanvas, [clickedObject.left+ 
                circleR, clickedObject.top+
                circleR, circle1.left + 
                circleR, circle1.top + circleR]);
                newRealObjects.push(backline);
            }
            circle2.remove(fabricCanvas);
            circle2 = findRealObject(clickedObject, realObjects);
            fabricCanvas.remove(clickedObject);
            circle2.add(fabricCanvas);
        }
    } else {
        line.set(fabricCanvas, [circle1.left + 
          circleR, circle1.top + circleR, pointer.x, pointer.y]);
          newRealObjects.push(line);
          if(isDoubleSided){
              backline.set(fabricCanvas, [pointer.x, pointer.y, circle1.left + 
                circleR, circle1.top + circleR]);
              newRealObjects.push(backline);
          }
          circle2.set(fabricCanvas, {
            left: pointer.x-circleR,
            top: pointer.y-circleR,
          })
          newRealObjects.push(circle2);
    }

    circle1.setFill(fabricCanvas, 'red');
    circle1.addOutEdge(line);
    circle2.addInEdge(line);
    if(isDoubleSided){
      circle1.addInEdge(backline);
      circle2.addOutEdge(backline);
    }
    setRealObjects([...realObjects, ...newRealObjects]);
    setCanvasObjects(fabricCanvas.getObjects());
    fabricCanvas.off('mouse:down');
    fabricCanvas.off('mouse:move');
    fabricCanvas.off('mouse:up');
    fabricCanvas.on('mouse:down', handleMouseDown);
  }
  fabricCanvas.on('mouse:down', handleMouseDown);
}