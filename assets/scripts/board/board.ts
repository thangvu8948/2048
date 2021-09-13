// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Animator } from "../animation/board.animator";
import { Cell } from "../cell/Cell";
import CellComponent, { ColorDict } from "../cell/cell.component";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  DIRECTIONS,
  MoveInfoMap,
  MOVEMENT,
} from "../game/game.const";
import GameController from "../game/game.controller";
import { BoardMatrix } from "./BoardMatrix";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoardController extends cc.Component {
  @property(cc.Prefab)
  pfCell: cc.Prefab;
  @property(cc.Node)
  placeHolder: cc.Node;
  @property(GameController)
  game: GameController;
  board: BoardMatrix = null;
  isLocking: boolean = false;
  // LIFE-CYCLE CALLBACKS:
  blockTween: cc.Tween = null;
  onLoad() {}

  start() {
    this.board = BoardMatrix.GetInstance();
    //this.AddPlaceholders();
    this.AddToView();
    cc.tween(this.node)
      .delay(0.5)
      .call(() => {})
      .start();
  }

  // destroy(): boolean {

  //   cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  //   return true;
  // }

  NewGame(force = false) {
    if (!force) {
      cc.tween(this.node)
        .delay(0.5)
        .call(() => {
          this.board = BoardMatrix.GetInstance();
          //this.AddPlaceholders();
          this.AddToView();
        })
        .start();
    } else {
      this.board = BoardMatrix.GetInstance();

      for (let items of this.board.Matrix) {
        for (let item of items) {
          if (item && item.cell) {
            item.cell.node.destroy();
          }
        }
      }
      this.board.NewGame();
      this.AddToView();
    }
  }
  AddPlaceholders() {
    for (let i = 0; i < BOARD_WIDTH; i++) {
      for (let j = 0; j < BOARD_HEIGHT; j++) {
        const cell = cc.instantiate(this.pfCell);
        //cell.setPosition(this.board.IndexToPosition(cc.v2(i, j)));
        cell.zIndex = 1;
        this.placeHolder.addChild(cell);
      }
    }
  }

  AddToView() {
    for (let i = 0; i < BOARD_WIDTH; i++) {
      for (let j = 0; j < BOARD_HEIGHT; j++) {
        const cell = cc.instantiate(this.pfCell);
        const comp: CellComponent = cell.getComponent(CellComponent);
        const c = this.board.GetCell(cc.v2(i, j));
        comp.SetNumber(c.no);
        c.cell = comp;
        comp.node.setPosition(this.board.IndexToPosition(cc.v2(i, j)));
        cell.opacity = 0;
        this.node.addChild(cell);
        if (c.no !== 0) {
          Animator.Spawn(c, true);
        } else {
          cell.opacity = 255;
        }
      }
    }
  }

  HandleMove(move: MOVEMENT) {
    if (this.isLocking) {
      cc.log("locking");
      return;
    }

    if (
      this.game.game.GameOver ||
      this.board.CheckWin() ||
      this.board.CheckGameOver()
    ) {
      this.isLocking = false;
      this.game.game.EndGame();
      cc.log("Game ended.");
      return;
    }
    let canMove = this.board.CheckCanMove(move);
    cc.log("can move: " + canMove);
    if (canMove) {
      this.isLocking = true;
      setTimeout(() => {
        this.isLocking = false;
      }, 200);
      this.game.soundManager.play("move", false);
      const score = this.board.Move(MoveInfoMap[move]);
      this.UpdateScore(score);
      cc.log(this.board.Matrix);
      if (this.board.CheckWin()) {
        cc.log("Won");
        this.game.EndGame(true);
      } else {
        const spawnCell = this.board.SpawnNewRandom();
        Animator.Spawn(spawnCell, true, true);
        if (this.board.CheckGameOver()) {
          cc.log("GameOver");
          this.game.EndGame(false);
        }
      }

      const arr: Cell[] = [].concat(...this.board.Matrix);
      arr.forEach((cell, index) => {
        //const cell: Cell = this.board.GetCell(cc.v2(i, j));
        //cell.cell.SetNumber(cell.no);
        //cell.to = null;
        const comp = cell.cell;
        if (comp != null) {
          if (cell.to === null) {
            cell.to = cc.v2(cell.position.x, cell.position.y);
          }
          if (this.board.GetCell(cell.to).no !== 0) {
            Animator.MoveCell(
              cell,
              this.board,
              () => {
                comp.node.zIndex = cell.no + 1;
                comp.node.setPosition(
                  this.board.IndexToPosition(cell.position)
                );
                comp.SetNumber(cell.no);
                cell.to = null;
              },
              true
            );
          } else {
            cell.to = null;
          }
        }
      });
    }
  }
  UpdateScore(score: number) {
    this.game.AddScore(score);
    this.game.UpdateHighScore();
  }

  // update (dt) {}
}
