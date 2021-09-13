import { BoardMatrix } from "../board/BoardMatrix";
import { Cell } from "../cell/Cell";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../game/game.const";

export class Animator {
  public static Spawn(
    cell: Cell,
    autoStart: boolean = false,
    delay: boolean = false
  ): cc.Tween {
    let tween: cc.Tween = null;
    tween = cc
      .tween(cell.cell.node)
      .delay(delay ? 0.2 : 0)
      .set({ scale: 0, opacity: 255 })

      .to(0.2, { scale: 1 });
    if (autoStart) {
      tween.start();
    }
    return tween;
  }

  public static MoveCell(
    cell: Cell,
    board: BoardMatrix,
    cb: Function,
    autoStart: boolean = false
  ) {
    let tween = null;
    const pos = board.IndexToPosition(cell.to);
    tween = cc
      .tween(cell.cell.node)
      .set({ zIndex: 99 })
      .to(0.2, { x: pos.x, y: pos.y }, { easing: "smooth" })

      .call(() => cb());
    if (autoStart) {
      tween.start();
    }
    return tween;
  }
}
