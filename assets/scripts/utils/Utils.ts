import { BoardMatrix } from "../board/BoardMatrix";
import { Cell } from "../cell/Cell";
import { GameModel } from "../game/game.model";

export class Utils {
  public static GetRandomInt(
    min: number,
    max: number,
    excludeMax: boolean = false
  ) {
    if (excludeMax) {
      return Math.floor(Math.random() * (max - min) + min);
    } else {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }

  public static ObjectsEqual(first: Object, second: Object): boolean {
    return JSON.stringify(first) === JSON.stringify(second);
  }

  public static SaveAll() {
    //save current board
    const board = BoardMatrix.GetInstance();
    const game = GameModel.Instance();
    if (board) {
      const map = board.Matrix.map((rows) =>
        rows.map((item) => {
          const cell = new Cell(item.position.x, item.position.y);
          cell.no = item.no;
          cell.position = item.position;
          return cell;
        })
      );
      cc.sys.localStorage.setItem("board", JSON.stringify(map));
    }
    if (game) {
      cc.sys.localStorage.setItem("game", JSON.stringify(game));
    }
    cc.sys.localStorage.setItem("highscore", GameModel.Instance().HighScore);
  }

  public static LoadAll() {
    //cc.sys.localStorage.clear();
    const boardJson: string = cc.sys.localStorage.getItem("board");
    const gameJson: string = cc.sys.localStorage.getItem("game");
    //const highScore: number = cc.sys.localStorage.getItem("highscore") || 0;
    if (boardJson) {
      const board: Cell[][] = JSON.parse(boardJson);
      BoardMatrix.GetInstance().SetMatrix(board);
    }
    if (gameJson) {
      const game: GameModel = JSON.parse(gameJson);
      GameModel.Instance().CloneAttributes(game);
    }
    //GameModel.Instance().SetHighscore(highScore);
  }
}
