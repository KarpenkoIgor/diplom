import React from 'react';

const JunctionForm = ({ junction, onChange }) => {

  return (
    <div>
      <label htmlFor="name">Название:</label>
      <input id="name" type="text" value={junction.name}/>
      <br />
      <label htmlFor="number">Номер:</label>
      <input id="number" type="text" value="Номер"/>
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

export default JunctionForm;
