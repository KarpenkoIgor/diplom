class vType {
    static nextID = 0;
    constructor(options){
        this.name  = "type"
        this.id = [this.name, vType.nextID].join("_");
        nextID++;
        this.accel = options.accel || 1.0;
        this.decel = options.decel || 5.0;
        this.lenght = options.lenght || 5.0;
        this.minGap = options.minGap || 2.5;
        this.maxSpeed = options.maxSpeed || 50.0;
        this.sigma = options.sigma || 0.5;
    }

}

export default vType;