import React, { useState } from 'react';

const JunctionForm = ({ junction, canvasObjects, setCanvasObjects}) => {
  const [posX, setPosX] = useState(junction.left);
  const [posY, setPosY] = useState(junction.top);

  const handlePosXChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if(newValue) {
      setPosX(newValue);
      junction.setLeft(newValue,canvasObjects,setCanvasObjects);
    }
    else {
      setPosX(0.0);
      junction.setLeft(0.0,canvasObjects,setCanvasObjects);
    }
  };

  const handlePosYChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if(newValue) {
      setPosY(newValue);
      junction.setTop(newValue,canvasObjects,setCanvasObjects);
    }
    else {
      setPosY(0.0);
      junction.setTop(0.0,canvasObjects,setCanvasObjects);
    }
  };

  return (
    <div>
      <label htmlFor="id">ID:</label>
      <input id="id" type="text" value={junction.id} readOnly />
      <br />
      <label htmlFor="posX">Позиция X:</label>
      <input id="posX" type="text" value={posX} onChange={handlePosXChange} />
      <br />
      <label htmlFor="posY">Позиция Y:</label>
      <input id="posY" type="text" value={posY} onChange={handlePosYChange} />
    </div>
  );
};

export default JunctionForm;
