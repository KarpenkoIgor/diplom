function findEdgeByLane(lane, realObjects) {
    const objectId = lane.realObjectID;
    for (let i = 0; i < realObjects.length; i++) {
        if(realObjects[i].id.split("_")[0] === "Edge"){
            for (let j = 0; j < realObjects[i].lanes.length; j++) {
                if (realObjects[i].lanes[j].id === objectId) {
                    return realObjects[i];                
                }
            }
        }
    }
    return null;
}

export default findEdgeByLane;