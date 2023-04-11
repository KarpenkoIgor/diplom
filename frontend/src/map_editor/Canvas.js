import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import Edge from './helper_classes/Edge';
import Junction from './helper_classes/Junction';

function FabricCanvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);  
  const [isDrawingLine, setIsDrawingLine] = useState(false); 
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [canvasObjects, setCanvasObjects] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const fabricCanvas = new fabric.Canvas(canvas, {
      backgroundColor: 'green',
      selection: false
    });

    fabricCanvas.on('mouse:down', function (options) {
      if (isDrawing) {
        setIsDrawingLine(true);
        var pointer = fabricCanvas.getPointer(options.e);
        var circle1 = new Junction({
          left: pointer.x,
          top: pointer.y,
        });
        var line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
          strokeWidth: 6,
          stroke: 'black',
          selectable: false
        });
        var circle2 = new Junction({
          left: pointer.x,
          top: pointer.y,
        });
        fabricCanvas.add(circle1);
        fabricCanvas.add(line);
        fabricCanvas.add(circle2);
        fabricCanvas.on('mouse:move', function (options) {
          if (isDrawing) {
            var pointer = fabricCanvas.getPointer(options.e);
            line.set({ x2: pointer.x, y2: pointer.y });
            circle2.set({ left: pointer.x, top: pointer.y });
            fabricCanvas.renderAll();
          }
        });
        fabricCanvas.on('mouse:up', function (options) {
          if (isDrawing) {
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
          }
        });
      } else if (isSelecting) {
        if (options.target) {
          setSelectedObject(options.target);
        } else {
          setSelectedObject(null);
        }
      }
    });

    return () => {
      fabricCanvas.dispose();
    };

  }, [isDrawing, isSelecting]);

  const handleDrawButtonClick = (event) => {
    event.preventDefault();
    setIsSelecting(false);
    setIsDrawing(true);
  };

  const handleSelectButtonClick = (event) => {
    event.preventDefault();
    setIsDrawing(false);  
    setIsSelecting(true);      
  };

  const handleInputChange = (event) => {
    setSelectedObject(event.target.value);
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <div>
        <button onClick={handleDrawButtonClick}>Рисовать линию</button>
        <button onClick={handleSelectButtonClick}>Выбрать элемент</button>
      </div>
      <div>
        <textarea type="text" value={selectedObject ? selectedObject.toString() : ""} onChange={handleInputChange} />
      </div>
    </div>
  );
}

export default FabricCanvas;