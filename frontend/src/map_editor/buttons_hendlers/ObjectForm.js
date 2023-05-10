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
            <JunctionForm key={selectedObject.id} junction={selectedObject} 
            canvasObjects={canvasObjects} setCanvasObjects={setCanvasObjects}/>
            </div>
          );
    }
    else if(selectedObject.constructor.name === 'Edge'){
        return (
          <div>
            <EdgeForm key={selectedObject.id} edge={selectedObject} 
            canvasObjects={canvasObjects} setCanvasObjects={setCanvasObjects}/>
          </div>
          );
    }
  return (
    <div>

    </div>
  );
};

export default ObjectForm;