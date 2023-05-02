import { fabric } from 'fabric';
import Edge from '../helper_classes/Edge';
import Junction from '../helper_classes/Junction';



export function handleSelecting(fabricCanvas, selectedObject, setSelectedObject) {
    function handleMouseDown(options) {
        if (fabricCanvas.findTarget(options.e)) {
            setSelectedObject(fabricCanvas.findTarget(options.e));
          } else {
            setSelectedObject(null);
          }
    }
    fabricCanvas.off('mouse:down');
    fabricCanvas.on('mouse:down', handleMouseDown);
}