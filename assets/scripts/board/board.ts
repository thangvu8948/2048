// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Animator } from "../animation/board.animator";
import { Cell } from "../cell/Cell";
import CellComponent from "../cell/cell.component";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  DIRECTIONS,
  MoveInfoMap,
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
  // LIFE-CYCLE CALLBACKS:

  onLoad() {}

  start() {
    this.board = BoardMatrix.GetInstance();
    this.AddPlaceholders();
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
      for (let items of this.board.Matrix) {
        for (let item of items) {
          item.cell.node.destroy();
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
        //cell.zIndex = 99;
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
    if (
      this.game.game.GameOver ||
      this.board.CheckWin() ||
      this.board.CheckGameOver()
    ) {
      this.game.game.EndGame();
      cc.log("Game ended.");
      return;
    }
    let canMove = this.board.CheckCanMove(move);
    cc.log("can move: " + canMove);
    if (canMove) {
      // switch (move) {
      //   case MOVEMENT.UP:
      //     this.board.MoveUp();
      //     break;
      //   case MOVEMENT.DOWN:
      //     this.board.MoveDown();
      //     break;
      // }
      const score = this.board.Move(MoveInfoMap[move]);
      this.UpdateScore(score);
      cc.log(this.board.Matrix);
      if (this.board.CheckWin()) {
        cc.log("Won");
        this.game.EndGame(true);
      } else if (this.board.CheckGameOver()) {
        this.game.EndGame(false);
      } else {
        const spawnCell = this.board.SpawnNewRandom();
        Animator.Spawn(spawnCell, true);
      }

      for (let i = 0; i < BOARD_HEIGHT; i++) {
        for (let j = 0; j < BOARD_WIDTH; j++) {
          const cell: Cell = this.board.GetCell(cc.v2(i, j));
          cell.cell.SetNumber(cell.no);
          //cell.to = null;
          // const comp = cell.cell;
          // if (comp != null)
          //   if (cell.to !== null) {
          //     //comp.node.setPosition(this.board.IndexToPosition(cell.position));
          //     Animator.MoveCell(
          //       cell,
          //       this.board,
          //       () => {
          //         //comp.destroy();
          //         if (cell.no === 0) {
          //           comp.node.destroy();
          //           //comp.node.opacity = 0;
          //           //cell.cell = null;
          //           cell.to = null;
          //         } else {
          //           comp.node.setPosition(
          //             this.board.IndexToPosition(cell.position)
          //           );

          //           comp.node.zIndex = 99;
          //           comp.SetNumber(cell.no);
          //           cell.to = null;
          //         }
          //       },
          //       true
          //     );
          //   } else {
          //     cc.tween(cell.cell.node)
          //       .delay(0.2)
          //       .call(() => {
          //         if (cell.no !== 0) {
          //           comp.SetNumber(cell.no);
          //           comp.node.zIndex = 99;
          //         }
          //       })
          //       .start();
          //   }
        }
      }
    }
  }
  UpdateScore(score: number) {
    this.game.AddScore(score);
    this.game.UpdateHighScore();
  }

  // update (dt) {}
}

export enum MOVEMENT {
  LEFT,
  RIGHT,
  UP,
  DOWN,

  TOTAL,
}
