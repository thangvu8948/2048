// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BasePopup from "./basepopup";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MasterPopup extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    //this.node.active = false;
    //this.node.opacity = 0;
    //this.container.opacity = 0;
  }

  start() {}

  show(popupName: string) {
    const p = this.node.getChildByName(popupName);
    if (p !== null) {
      const popup: BasePopup = p.getComponent(BasePopup);
      popup.show();
    }
  }

  hide(popupName: string) {
    const p = this.node.getChildByName(popupName);
    if (p !== null) {
      const popup: BasePopup = p.getComponent(BasePopup);
      popup.show();
    }
  }
  // update (dt) {}
}
