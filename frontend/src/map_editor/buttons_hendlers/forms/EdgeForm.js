import React, { useState } from 'react';

const EdgeForm = ({ edge, canvasObjects, setCanvasObjects }) => {
  const [numLanes, setNumLanes] = useState(edge.lanes.length);

  const handleNumLanesChange = (event) => {
    setNumLanes(event.target.value);
    console.log(canvasObjects);
    edge.setNumLanes(event.target.value,canvasObjects, setCanvasObjects);
  };

  return (
    <div>
      <label htmlFor="name">ID:</label>
      <input id="name" type="text" value={edge.id} />
      <br />
      <label htmlFor="number">numLanes:</label>
      <input id="number" type="number" max="50" min="1" value={numLanes} onChange={handleNumLanesChange} />
      <br />
      <label htmlFor="type">Тип:</label>
      <select id="type" value="Тип">
        <option value="type1">Тип 1</option>
        <option value="type2">Тип 2</option>
        <option value="type3">Тип 3</option>
      </select>
    </div>
  );
};

export default EdgeForm;