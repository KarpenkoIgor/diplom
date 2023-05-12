import { fabric } from 'fabric';

class Connection{
  static nextId = 0;
  constructor(options) {
    this.name = "Connection";
    this.id = [this.name, Connection.nextId].join("_");
    Connection.nextId++;
    this.from = options.from || null;
    this.to = options.to || null;
    this.fromLane = options.fromLane || null;
    this.toLane = options.toLane || null;
    this.dir = options.dir || "s";
    this.state = options.state || "M";
  }
}

export default Connection;
