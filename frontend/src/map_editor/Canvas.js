import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

function FabricCanvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingLine, setIsDrawingLine] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [canvasObjects, setCanvasObjects] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const fabricCanvas = new fabric.Canvas(canvas, {
      backgroundColor: 'green',
      selection: false
    });

    fabricCanvas.on('mouse:down', function (options) {
      if (isDrawing) {
        var pointer = fabricCanvas.getPointer(options.e);
        var circle1 = new fabric.Circle({
          radius: 10,
          fill: 'red',
          left: pointer.x,
          top: pointer.y,
          selectable: false
        });
        var line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
          strokeWidth: 6,
          stroke: 'black',
          selectable: false
        });
        var circle2 = new fabric.Circle({
          radius: 10,
          fill: 'red',
          left: pointer.x,
          top: pointer.y,
          selectable: false
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
              stroke: 'black'
            });
            var newCircle1 = new fabric.Circle({
              radius: 10,
              fill: 'red',
              left: line.x1,
              top: line.y1,
              selectable: false
            });
            var newCircle2 = new fabric.Circle({
              radius: 10,
              fill: 'red',
              left: pointer.x,
              top: pointer.y,
              selectable: false
            });
            fabricCanvas.remove(line);
            fabricCanvas.remove(circle1);
            fabricCanvas.remove(circle2);
            fabricCanvas.add(newLine);
            fabricCanvas.add(newCircle1);
            fabricCanvas.add(newCircle2);
            setCanvasObjects([...canvasObjects, newLine, newCircle1, newCircle2]);
          }
        });
      } else if (isSelecting) {
        var selectedObject = fabricCanvas.getActiveObject();
        if (selectedObject) {
          console.log('Выбран объект:', selectedObject);
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

  return (
    <div>
      <canvas ref={canvasRef} />
      <button onClick={handleDrawButtonClick}>Рисовать линию</button>
      <button onClick={handleSelectButtonClick}>Выбрать элемент</button>
    </div>
  );
}

export default FabricCanvas;