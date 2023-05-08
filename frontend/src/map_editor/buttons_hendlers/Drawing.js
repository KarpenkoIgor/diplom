import Edge from '../helper_classes/Edge';
import Junction from '../helper_classes/Junction';


const circleR = 7;


export function handleDrawing(fabricCanvas, canvasObjects, setCanvasObjects, realObjects, setRealObjects, isDoubleSided) {
  var line, backline, circle1, circle2;
  function handleMouseDown(options) {
    const pointer = fabricCanvas.getPointer(options.e);
    const clickedObject = fabricCanvas.findTarget(options.e);
    if (clickedObject && clickedObject.realObjectID.split("_")[0] === 'Junction') {
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
            var newLine = new Edge([circle1.left + 
              circleR, circle1.top + circleR, clickedObject.left+ circleR, clickedObject.top+ circleR]);
            if(isDoubleSided){
                var newBackLine = new Edge([clickedObject.left+ 
                  circleR, clickedObject.top+
                  circleR, circle1.left + 
                  circleR, circle1.top + circleR]);
                backline.remove(fabricCanvas);
                newBackLine.add(fabricCanvas);
            }
            var newCircle2 = new Junction({
              left: clickedObject.left,
              top: clickedObject.top,
            });
            fabricCanvas.remove(clickedObject);
        }
    } else {
        var newLine = new Edge([circle1.left + 
          circleR, circle1.top + circleR, pointer.x, pointer.y]);
          if(isDoubleSided){
              var newBackLine = new Edge([pointer.x, pointer.y, circle1.left + 
                circleR, circle1.top + circleR]);
              backline.remove(fabricCanvas);
              newBackLine.add(fabricCanvas);
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

      line.remove(fabricCanvas)
      circle1.remove(fabricCanvas);
      circle2.remove(fabricCanvas);
      newLine.add(fabricCanvas);
      newCircle1.add(fabricCanvas);
      newCircle2.add(fabricCanvas);
      if(isDoubleSided){
        setRealObjects([...realObjects, newBackLine, newLine, newCircle1, newCircle2]);
      }
      else {
        setRealObjects([...realObjects, newLine, newCircle1, newCircle2]);
      }
      setCanvasObjects(fabricCanvas.getObjects());
    fabricCanvas.off('mouse:down');
    fabricCanvas.off('mouse:move');
    fabricCanvas.off('mouse:up');
    fabricCanvas.on('mouse:down', handleMouseDown);
  }
  fabricCanvas.on('mouse:down', handleMouseDown);
}