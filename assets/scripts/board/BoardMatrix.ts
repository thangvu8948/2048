import { Cell } from "../cell/Cell";
import CellComponent from "../cell/cell.component";
import {
  BEGIN_NUMBER,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  CELL_PADDING,
  CELL_SIZE,
  DIRECTIONS,
  MOVEINFO,
  MOVEMENT,
  NO_START_CELL,
  WIN_NUMBER,
} from "../game/game.const";
import { Utils } from "../utils/Utils";

export class BoardMatrix {
  private _matrix: Cell[][] = null;

  private constructor(load: boolean = false) {
    this.InitBlankBoard();

    if (!load) {
      this.InitGameBoard();
      //this.TestBoard();
    }
  }
  private static _instance: BoardMatrix = null;
  public static GetInstance(): BoardMatrix {
    if (this._instance == null) {
      this._instance = new BoardMatrix();
    }
    return this._instance;
  }

  public get Matrix(): Cell[][] {
    return this._matrix;
  }

  public SetMatrix(board: Cell[][]) {
    this._matrix = board;
  }

  NewGame() {
    this.InitBlankBoard();
    this.InitGameBoard();
    //this.TestBoard();
  }
  InitBlankBoard() {
    this._matrix = Array(BOARD_WIDTH);
    for (let i = 0; i < BOARD_WIDTH; i++) {
      this._matrix[i] = Array<Cell>(BOARD_HEIGHT);
      for (let j = 0; j < BOARD_HEIGHT; j++) {
        this._matrix[i][j] = new Cell(i, j);
      }
    }

    cc.log(this._matrix);
  }

  InitGameBoard() {
    const positions = new Array<cc.Vec2>();
    for (let i = 0; i < NO_START_CELL; i++) {
      let p = new cc.Vec2();

      do {
        let x = Utils.GetRandomInt(0, BOARD_WIDTH - 1, true);
        let y = Utils.GetRandomInt(0, BOARD_HEIGHT - 1);
        p = cc.v2(x, y);
      } while (positions.some((pos) => pos.x === p.x && pos.y === p.y));

      positions.push(p);
      const cell = this.CreateCell(p);
      this.SetCell(cell);
    }

    cc.log("board inited");
    cc.log(this._matrix);
  }

  TestBoard() {
    // const board = [
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [1, 0, 1, 0],
    // ];
    const board = [
      [2, 4, 2, 0],
      [4, 8, 4, 8],
      [2, 4, 2, 16],
      [4, 8, 4, 8],
    ];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const cell = this.CreateCell(cc.v2(i, j));
        cell.no = board[i][j];
        this.SetCell(cell);
      }
    }

    cc.log("board inited");
    cc.log(this._matrix);
    cc.log("have free space: " + this.IsFreeSpace());
  }

  CreateCell(pos: cc.Vec2): Cell {
    const cell: Cell = new Cell(pos.x, pos.y);
    cell.no = BEGIN_NUMBER;
    cell.position = cc.v2(pos.x, pos.y);
    return cell;
  }

  GetCell(pos: cc.Vec2): Cell {
    return this._matrix[pos.x][pos.y];
  }

  SetCell(cell: Cell, forced: boolean = false): void {
    const pos: cc.Vec2 = cell.position;
    if (!this._matrix || !this._matrix[pos.x] || !this._matrix[pos.x][pos.y]) {
      return;
    }
    if (!forced && this._matrix[pos.x][pos.y].no !== 0) {
      return;
    }
    this._matrix[pos.x][pos.y] = cell;
  }

  IsFreePostition(pos?: cc.Vec2): boolean {
    const cell = this.GetCell(pos);
    return cell && cell.no === 0;
  }

  SetCellNo(pos: cc.Vec2, no: number) {
    if (this.IsFreePostition(pos)) {
      const cell = this.GetCell(pos);
      cell.no = no;
    }
  }

  SetPositionInBoard(cell: Cell) {
    const child = cell.cell;
  }

  IndexToPosition(idx: cc.Vec2) {
    const midW = BOARD_WIDTH / 2;
    const midH = BOARD_HEIGHT / 2;
    let x: number = 0;
    let y: number = 0;
    x = (idx.y - midW + 0.5) * CELL_SIZE + CELL_PADDING * (idx.y - midW + 0.5);
    y = (midH - idx.x - 0.5) * CELL_SIZE + CELL_PADDING * (midH - idx.x - 0.5);
    return cc.v2(x, y);
  }

  PositionToIndex(pos: cc.Vec2) {
    //dont need
  }

  CheckGameOver() {
    for (let i = 0; i < MOVEMENT.TOTAL; i++) {
      if (this.CheckCanMove(i)) {
        return false;
      }
    }
    return true;
  }
  /// Can move when:
  // - At least 2 same cell
  // - contains blank between 2 cell
  // - contains blank top and cell below
  ///
  CheckCanMove(dir: MOVEMENT): boolean {
    //const baseCheck = this.GetBaseCheck(dir);
    const arrs: Cell[][] = [];

    if (dir === MOVEMENT.LEFT || dir === MOVEMENT.RIGHT) {
      for (let i = 0; i < BOARD_HEIGHT; i++) {
        arrs.push(this.GetRow(i));
      }
      if (dir === MOVEMENT.LEFT) {
        let blankHead = arrs.some((item, index) => {
          return item[0].no === 0 && item.some((i) => i.no !== 0);
        });
        if (blankHead) {
          return true;
        }
      } else if (dir === MOVEMENT.RIGHT) {
        let blankHead = arrs.some((item, index) => {
          return item[BOARD_WIDTH - 1].no === 0 && item.some((i) => i.no !== 0);
        });
        if (blankHead) {
          return true;
        }
      }
    }

    if (dir === MOVEMENT.UP || dir === MOVEMENT.DOWN) {
      for (let i = 0; i < BOARD_WIDTH; i++) {
        arrs.push(this.GetColumn(i));
      }

      if (dir === MOVEMENT.UP) {
        let blankHead = arrs.some((item, index) => {
          return item[0].no === 0 && item.some((i) => i.no !== 0);
        });
        if (blankHead) {
          return true;
        }
      } else if (dir === MOVEMENT.DOWN) {
        let blankHead = arrs.some((item, index) => {
          return (
            item[BOARD_HEIGHT - 1].no === 0 && item.some((i) => i.no !== 0)
          );
        });
        if (blankHead) {
          return true;
        }
      }
    }

    /*
    - Check can combine
    - Check blank cell between busy cell
    */
    for (let item of arrs) {
      const tmp = item.filter((x) => x.no !== 0);
      for (let i = 0; i < tmp.length - 1; i++) {
        if (tmp[i].no === tmp[i + 1].no) {
          return true;
        }
      }

      let first: Cell = null;
      for (let i = 0; i < item.length - 1; i++) {
        if (item[i].no !== 0 && first === null) {
          first = item[i];
        } else if (item[i].no === 0 && item[i + 1].no !== 0 && first !== null) {
          return true;
        }
      }
    }

    return false;
  }

  GetRow(row: number) {
    const arr: Cell[] = [];
    for (let i = 0; i < BOARD_WIDTH; i++) {
      arr.push(this._matrix[row][i]);
    }
    return arr;
  }

  GetColumn(col: number) {
    const arr: Cell[] = [];
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      arr.push(this._matrix[i][col]);
    }
    return arr;
  }

  CheckWin(): boolean {
    return this._matrix.some((items) =>
      items.some((item) => item.no === WIN_NUMBER)
    );
  }

  GetBaseCheck(dir: cc.Vec2): cc.Vec2[] {
    let baseCheck: cc.Vec2[] = [];
    if (Utils.ObjectsEqual(dir, DIRECTIONS.LEFT)) {
      for (let i = 0; i < BOARD_HEIGHT; i++) {
        baseCheck.push(cc.v2(BOARD_WIDTH - 1, i));
      }
    } else if (Utils.ObjectsEqual(dir, DIRECTIONS.RIGHT)) {
      for (let i = 0; i < BOARD_HEIGHT; i++) {
        baseCheck.push(cc.v2(0, i));
      }
    } else if (Utils.ObjectsEqual(dir, DIRECTIONS.UP)) {
      for (let i = 0; i < BOARD_WIDTH; i++) {
        baseCheck.push(cc.v2(i, BOARD_HEIGHT - 1));
      }
    } else if (Utils.ObjectsEqual(dir, DIRECTIONS.DOWN)) {
      for (let i = 0; i < BOARD_HEIGHT; i++) {
        baseCheck.push(cc.v2(i, 0));
      }
    }
    return baseCheck;
  }
  MoveUp() {
    const arrs: Cell[][] = [];
    for (let i = 0; i < BOARD_WIDTH; i++) {
      arrs.push(this.GetColumn(i));
    }
    for (let i = 0; i < BOARD_WIDTH; i++) {
      const arr = arrs[i];
      const temp = [...arr];
      const stack: number[] = [];
      let prev = arr[0].no;
      let prevIdx = 0;
      let curr = 0;
      let lastHole = 0;
      for (let j = 1; j < BOARD_HEIGHT; j++) {
        curr = arr[j].no;
        if (curr !== 0 && curr === prev) {
          temp[lastHole].no = curr + prev;
          //arr[prevIdx].no = curr + prev;
          arr[j].to = cc.v2(lastHole, i);
          //   arr[j].no = 0;
          //   arr[prevIdx].position = cc.v2(lastHole, i);

          prev = arr[j + 1] ? arr[j + 1].no : 0;
          prevIdx = j + 1;
          j += 1;

          lastHole += 1;
        } else {
          if (prev !== 0 && curr !== 0) {
            temp[lastHole].no = prev;
            arr[prevIdx].to = cc.v2(lastHole, i);
            prev = arr[j].no;
            prevIdx = j;
            lastHole += 1;
          } else if (prev !== 0 && curr == 0) {
          } else if (prev === 0 && curr != 0) {
            prev = arr[j].no;
            prevIdx = j;
          }
        }
      }

      if (prevIdx < BOARD_HEIGHT) {
        temp[lastHole].no = prev;
        arr[prevIdx].to = cc.v2(lastHole, i);
        lastHole += 1;
      }

      for (let j = lastHole; j < BOARD_HEIGHT; j++) {
        arr[j].no = 0;
      }
      let k = 0;
      for (let j = 0; j < BOARD_HEIGHT; j++) {
        this._matrix[j][i] = Object.assign({}, arr[k++]);
      }
    }
  }

  MoveDown() {
    const arrs: Cell[][] = [];
    for (let i = 0; i < BOARD_WIDTH; i++) {
      arrs.push(this.GetColumn(i));
    }
    for (let i = 0; i < BOARD_WIDTH; i++) {
      const arr = arrs[i];
      const temp = [...arr];
      const stack: number[] = [];
      let prev = arr[BOARD_HEIGHT - 1].no;
      let prevIdx = BOARD_HEIGHT - 1;
      let curr = 0;
      let lastHole = BOARD_HEIGHT - 1;
      for (let j = BOARD_HEIGHT - 1; j >= 0; j--) {
        curr = arr[j].no;
        if (curr !== 0 && curr === prev) {
          temp[lastHole].no = curr + prev;
          //arr[prevIdx].no = curr + prev;
          temp[j].to = cc.v2(lastHole, i);
          //   arr[j].no = 0;
          //   arr[prevIdx].position = cc.v2(lastHole, i);

          prev = arr[j - 1] ? arr[j - 1].no : 0;
          prevIdx = j - 1;
          j -= 1;

          lastHole -= 1;
        } else {
          if (prev !== 0 && curr !== 0) {
            temp[lastHole].no = prev;
            temp[prevIdx].to = cc.v2(lastHole, i);
            prev = arr[j].no;
            prevIdx = j;
            lastHole -= 1;
          } else if (prev !== 0 && curr == 0) {
          } else if (prev === 0 && curr != 0) {
            prev = arr[j].no;
            prevIdx = j;
          }
        }
      }

      if (prevIdx >= 0) {
        temp[lastHole].no = prev;
        temp[prevIdx].to = cc.v2(lastHole, i);
        lastHole -= 1;
      }

      for (let j = lastHole; j >= 0; j--) {
        temp[j].no = 0;
      }
      let k = 0;
      for (let j = 0; j < BOARD_HEIGHT; j++) {
        this._matrix[j][i] = Object.assign({}, temp[k++]);
      }
    }
  }

  FoolLoopCondition(dir: MOVEMENT, idx: number, size: number) {
    if (dir === MOVEMENT.UP || dir === MOVEMENT.LEFT) {
      return idx < size;
    } else {
      return idx >= size;
    }
  }

  Move(info: MOVEINFO): number {
    let score = 0;
    const arrs: Cell[][] = [];
    if (info.dir === MOVEMENT.LEFT || info.dir === MOVEMENT.RIGHT) {
      for (let i = 0; i < BOARD_WIDTH; i++) {
        arrs.push(this.GetRow(i));
      }
    } else {
      for (let i = 0; i < BOARD_WIDTH; i++) {
        arrs.push(this.GetColumn(i));
      }
    }

    for (let i = info.startIdx_1; i < info.length_1; i += info.step_1) {
      const arr = arrs[i];
      const temp = [...arr];
      const stack: number[] = [];
      let prev = arr[info.startPrevIdx].no;
      let prevIdx = info.startPrevIdx;
      let curr = 0;
      let lastHole = info.startPrevIdx;
      for (
        let j = info.startIdx_2;
        this.FoolLoopCondition(info.dir, j, info.length_2);
        j += info.step_2
      ) {
        curr = arr[j].no;
        if (curr !== 0 && curr === prev) {
          temp[lastHole].no = curr + prev;

          temp[j].to =
            info.dir === MOVEMENT.UP || info.dir === MOVEMENT.DOWN
              ? cc.v2(lastHole, i)
              : cc.v2(i, lastHole);
          temp[prevIdx].to =
            info.dir === MOVEMENT.UP || info.dir === MOVEMENT.DOWN
              ? cc.v2(lastHole, i)
              : cc.v2(i, lastHole);
          score += curr + prev;

          prev = arr[j + info.step_2] ? arr[j + info.step_2].no : 0;
          prevIdx = j + info.step_2;
          j += info.step_2;
          lastHole += info.stepHole;
        } else {
          if (prev !== 0 && curr !== 0) {
            temp[lastHole].no = prev;
            temp[prevIdx].to =
              info.dir === MOVEMENT.UP || info.dir === MOVEMENT.DOWN
                ? cc.v2(lastHole, i)
                : cc.v2(i, lastHole);
            prev = arr[j].no;
            prevIdx = j;
            lastHole += info.stepHole;
          } else if (prev !== 0 && curr == 0) {
          } else if (prev === 0 && curr != 0) {
            prev = arr[j].no;
            prevIdx = j;
          }
        }
      }

      if (info.dir === MOVEMENT.RIGHT || info.dir === MOVEMENT.DOWN) {
        if (prevIdx >= 0) {
          temp[lastHole].no = prev;
          temp[prevIdx].to =
            info.dir === MOVEMENT.DOWN
              ? cc.v2(lastHole, i)
              : cc.v2(i, lastHole);
          lastHole += info.stepHole;
        }
      } else {
        if (prevIdx < info.length_2) {
          temp[lastHole].no = prev;
          temp[prevIdx].to =
            info.dir === MOVEMENT.UP ? cc.v2(lastHole, i) : cc.v2(i, lastHole);
          lastHole += info.stepHole;
        }
      }

      for (
        let j = lastHole;
        this.FoolLoopCondition(info.dir, j, info.length_2);
        j += info.step_2
      ) {
        arr[j].no = 0;
      }
      let k = 0;
      for (
        let j = 0;
        j <
        (info.dir === MOVEMENT.UP || info.dir === MOVEMENT.DOWN
          ? BOARD_HEIGHT
          : BOARD_WIDTH);
        j += 1
      ) {
        if (info.dir === MOVEMENT.UP || info.dir === MOVEMENT.DOWN) {
          this._matrix[j][i] = temp[k++];
        } else {
          this._matrix[i][j] = temp[k++];
        }
      }
    }
    cc.log(this._matrix);
    return score;
  }
  IsFreeSpace(): boolean {
    return this._matrix.some((v) => v.some((t) => t.no === 0));
  }

  GetFreeCells(): Cell[] {
    const spawns: Cell[] = [];
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      for (let j = 0; j < BOARD_WIDTH; j++) {
        if (this._matrix[i][j].no === 0) {
          spawns.push(this._matrix[i][j]);
        }
      }
    }
    return spawns;
  }

  SpawnNewRandom(): Cell {
    const spawns = this.GetFreeCells();
    const lucky = Utils.GetRandomInt(0, spawns.length, true);
    spawns[lucky].no = 2;
    return spawns[lucky];
  }

  SwapCell(cell1: Cell, cell2: Cell) {
    const c: CellComponent = cell1.cell;
    cell1.cell = cell2.cell;
    cell2.cell = c;
  }
}
