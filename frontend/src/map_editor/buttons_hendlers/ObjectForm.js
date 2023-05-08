import React from 'react';
import JunctionForm from './forms/JunctionForm';
import EdgeForm from './forms/EdgeForm';


const ObjectForm = ({ selectedObject, canvasObjects, setCanvasObjects }) => {

    if(!selectedObject){
        return (
            <div>
              <label htmlFor="name">Выбор элемента</label>
              <input id="name" type="text" value=""/>
            </div>
          );
    }
    else if(selectedObject.constructor.name === 'Junction'){
        return (
            <div>                
            <JunctionForm junction={selectedObject} />
            </div>
          );
    }
    else if(selectedObject.constructor.name === 'Edge'){
        return (
            <div>
            <EdgeForm edge={selectedObject} canvasObjects={canvasObjects} setCanvasObjects={setCanvasObjects}/>
            </div>
          );
    }
  return (
    <div>

    </div>
  );
};

export default ObjectForm;