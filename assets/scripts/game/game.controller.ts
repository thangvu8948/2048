// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BoardController, { MOVEMENT } from "../board/board";
import MasterPopup from "../popups/masterpopup";
import { Utils } from "../utils/Utils";
import { MIN_SWIPE_DISTANCE } from "./game.const";
import { GameModel } from "./game.model";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {
  @property(cc.Label)
  score: cc.Label = null;

  @property(cc.Label)
  highScore: cc.Label;

  @property(cc.Node)
  boardCmp: cc.Node;

  @property(MasterPopup)
  masterPopup: MasterPopup;
  // LIFE-CYCLE CALLBACKS:
  game: GameModel;
  board: BoardController;
  startTouch: cc.Vec2;
  onLoad() {
    this.game = GameModel.Instance();
    this.board = this.boardCmp.getComponent(BoardController);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    cc.game.on(cc.game.EVENT_HIDE, () => {
      cc.log("lost focus");
      Utils.SaveAll();
    });
    Utils.LoadAll();
    this.highScore.string = this.game.HighScore.toString();
    this.score.string = this.game.Score.toString();
  }
  onTouchEnd(touch: cc.Event.EventTouch) {
    touch.stopPropagation();
    const end = touch.getLocation();
    const start = this.startTouch;

    const length = Math.sqrt(
      (end.x - start.x) * (end.x - start.x) +
        (end.y - start.y) * (end.y - start.y)
    );

    if (length < MIN_SWIPE_DISTANCE) {
      return;
    }
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const verticalSwipe = Math.abs(dy) > Math.abs(dx);
    if (verticalSwipe && dy > 0) {
      this.board.HandleMove(MOVEMENT.UP);
    } else if (verticalSwipe) {
      this.board.HandleMove(MOVEMENT.DOWN);
    } else if (!verticalSwipe && dx > 0) {
      this.board.HandleMove(MOVEMENT.RIGHT);
    } else {
      this.board.HandleMove(MOVEMENT.LEFT);
    }
  }
  onTouchStart(touch: cc.Event.EventTouch) {
    this.startTouch = touch.getLocation();
  }

  start() {
    //Utils.LoadAll();
  }

  onKeyUp(event: cc.Event.EventKeyboard) {
    switch (event.keyCode) {
      case cc.macro.KEY.up:
        this.board.HandleMove(MOVEMENT.UP);
        break;
      case cc.macro.KEY.down:
        this.board.HandleMove(MOVEMENT.DOWN);
        break;
      case cc.macro.KEY.right:
        this.board.HandleMove(MOVEMENT.RIGHT);
        break;
      case cc.macro.KEY.left:
        this.board.HandleMove(MOVEMENT.LEFT);
        break;
      case cc.macro.KEY.a:
        cc.sys.localStorage.clear();
        cc.log("clear data");
        break;
      case cc.macro.KEY.s:
        this.masterPopup.show("GameOver");
        break;
    }
  }

  AddScore(score: number) {
    this.game.AddScore(score);
    this.score.string = this.game.Score.toString();
  }

  UpdateHighScore() {
    const best = this.game.UpdateHighScore();
    if (best > 0) {
      this.highScore.string = best.toString();
    }
  }

  SetScore(score: number) {
    this.game.SetScore(0);
    this.score.string = score.toString();
  }

  NewGame() {
    this.board.NewGame(true);
    this.SetScore(0);
    this.game.GameOver = false;
  }

  EndGame(won: boolean) {
    this.game.EndGame();
    //show popup
    if (won) {
      this.masterPopup.show("GameWon");
    } else {
      this.masterPopup.show("GameOver");
    }
  }
  // update (dt) {}
}
