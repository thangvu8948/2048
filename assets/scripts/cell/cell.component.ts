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
  2: "#57b069",
  4: "#6ba952",
  8: "#7da23d",
  16: "#8e9928",
  32: "#9e8f16",
  64: "#ae8409",
  128: "#bc770c",
  256: "#c96819",
  512: "#d35729",
  1024: "#db443a",
  2048: "#df2f4d",
};
