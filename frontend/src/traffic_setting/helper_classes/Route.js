class Route {
    static nextID = 0;
    constructor(options){
        this.name  = "route"
        this.id = [this.name, Route.nextID].join("_");
        nextID++;
        this.egdes = [];
    }

    addEdge(){

    }
}

export default Route