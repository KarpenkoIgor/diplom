import React from 'react';
import JunctionForm from './forms/JunctionFrom';

const ObjectForm = ({ selectedObject }) => {
    if(!selectedObject){
        return (
            <div>
        
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
            selectedObject.constructor.name
            </div>
          );
    }
  return (
    <div>

    </div>
  );
};

export default ObjectForm;