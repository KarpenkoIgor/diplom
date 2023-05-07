import React from 'react';
import JunctionForm from './forms/JunctionForm';
import EdgeForm from './forms/EdgeForm';

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
            <EdgeForm edge={selectedObject} />
            </div>
          );
    }
  return (
    <div>

    </div>
  );
};

export default ObjectForm;