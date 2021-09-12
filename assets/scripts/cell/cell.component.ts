// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class CellComponent extends cc.Component {
  @property(cc.Label)
  label: cc.Label;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  SetNumber(no: number) {
    this.label.string = no === 0 ? "" : no.toString();
    if (no !== 0) {
      this.SetColorBackground(no.toString());
    } else {
      this.node.color = this.node.color.fromHEX("#A29283");
    }
  }

  SetColorBackground(no: string) {
    this.node.color = this.node.color.fromHEX(ColorDict[no]);
  }
  // update (dt) {}
}

export const ColorDict: Record<string, string> = {
  2: "#eee4da",
  4: "#ede0c8",
  8: "#ebe4da",
  16: "#ebe4da",
  32: "#ebe4da",
  64: "#ebe4da",
  128: "#ebe4da",
  256: "#ebe4da",
  512: "#ebe4da",
  1024: "#ebe4da",
  2048: "#ebe4da",
};
