function findEdgeByLane(lane, realObjects) {
    const objectId = [lane.realObjectID.split("_")[0],lane.realObjectID.split("_")[1]].join("_");
    for (let i = 0; i < realObjects.length; i++) {
        if(realObjects[i].id === objectId){
            return realObjects[i];            
        }
    }
    return null;
}

export default findEdgeByLane;