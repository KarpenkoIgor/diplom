import React, { useState } from 'react';

const JunctionForm = ({ junction, canvasObjects, setCanvasObjects}) => {
  const [posX, setPosX] = useState(junction.left);
  const [posY, setPosY] = useState(junction.top);

  const handlePosXChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setPosX(newValue.toFixed(2));
  };

  const handlePosYChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setPosY(newValue.toFixed(2));
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
