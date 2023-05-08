function findRealObject(canvasObject, realObjects) {
    const objectID = canvasObject.realObjectID;
    for (let i = 0; i < realObjects.length; i++) {
      if (realObjects[i].id === objectID) {
        return realObjects[i];
      }
    }
    return null;
}

export default findRealObject;
