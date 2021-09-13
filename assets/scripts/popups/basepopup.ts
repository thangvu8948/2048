// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class BasePopup extends cc.Component {
  @property(cc.Node)
  container: cc.Node;

  @property(Boolean)
  hideOnTouch: boolean = false;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.active = false;
    this.node.opacity = 0;
    if (this.hideOnTouch) {
      this.node.on(cc.Node.EventType.TOUCH_END, this.hide, this);
    }
    //this.container.opacity = 0;
  }

  destroy(): boolean {
    super.destroy();
    this.node.off(cc.Node.EventType.TOUCH_END, this.hide, this);
    return true;
  }
  start() {}

  show() {
    cc.tween(this.node)
      .set({ opacity: 0, active: true })
      .to(0.25, { opacity: 255 }, { easing: "quintIn" })
      .start();
  }

  hide() {
    cc.log("hide");
    cc.tween(this.node)
      .to(0.25, { opacity: 0 }, { easing: "quintOut" })
      .set({ active: false })
      .start();
  }
  // update (dt) {}
}
