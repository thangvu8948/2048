import CellComponent from "./cell.component";

export class Cell {
  no: number;
  position: cc.Vec2;
  cell: CellComponent;
  to: cc.Vec2 = null;
  constructor(x: number, y: number) {
    this.no = 0;
    this.position = new cc.Vec2(x, y);
    this.cell = null;
    this.to = null;
  }
}
