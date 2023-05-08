import { fabric } from 'fabric';
import Edge from '../helper_classes/Edge';
import Junction from '../helper_classes/Junction';
import findRealObject from './functions/FindRealObject';
import findEdgeByLane from './functions/FindEdgeByLane';

export function handleSelecting(fabricCanvas, selectedObject, setSelectedObject, realObjects) {
    function handleMouseDown(options) {
        if (fabricCanvas.findTarget(options.e)) {
          if(fabricCanvas.findTarget(options.e).realObjectID.split("_")[0] === "Edge"){
            setSelectedObject(findEdgeByLane(fabricCanvas.findTarget(options.e), realObjects));
          }else{
            setSelectedObject(findRealObject(fabricCanvas.findTarget(options.e), realObjects));
          }
        } else {
          setSelectedObject(null);
        }
    }
    fabricCanvas.off('mouse:down');
    fabricCanvas.on('mouse:down', handleMouseDown);
}