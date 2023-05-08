function findCanvasObject(realObject, canvasObjects) {
    const objectId = realObject.id;
    for (let i = 0; i < canvasObjects.length; i++) {
      if (canvasObjects[i].id === objectId) {
        return canvasObjects[i];
      }
    }
    return null;
}

export default findCanvasObject;
  