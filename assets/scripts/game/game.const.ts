import { MOVEMENT } from "../board/board";

export const CELL_SIZE: number = 120;
export const CELL_PADDING: number = 20;
export const BOARD_WIDTH: number = 4;
export const BOARD_HEIGHT: number = 4;
export const NO_START_CELL: number = 2;
export const BEGIN_NUMBER: number = 2;
export const MIN_SWIPE_DISTANCE = 50;
export const WIN_NUMBER = 8;

export const DIRECTIONS: Record<string, cc.Vec2> = {
  LEFT: cc.v2(-1, 0),
  RIGHT: cc.v2(1, 0),
  UP: cc.v2(0, 1),
  DOWN: cc.v2(0, -1),
};
export const PLACEHOLDER_COLOR: string = "#A29283";
export interface MOVEINFO {
  dir: MOVEMENT;
  startPrevIdx: number;
  stepHole: number;
  startIdx_1: number;
  step_1: number;
  length_1: number;
  startIdx_2: number;
  step_2: number;
  length_2: number;
}

export const MoveInfoMap: Record<number, MOVEINFO> = {
  2: {
    dir: MOVEMENT.UP,
    startPrevIdx: 0,
    stepHole: 1,
    length_1: BOARD_WIDTH,
    startIdx_1: 0,
    step_1: 1,
    startIdx_2: 1,
    length_2: BOARD_HEIGHT,
    step_2: 1,
  },
  3: {
    dir: MOVEMENT.DOWN,
    startPrevIdx: BOARD_HEIGHT - 1,
    stepHole: -1,
    length_1: BOARD_WIDTH,
    startIdx_1: 0,
    step_1: 1,
    startIdx_2: BOARD_HEIGHT - 2,
    length_2: 0,
    step_2: -1,
  },
  0: {
    dir: MOVEMENT.LEFT,
    startPrevIdx: 0,
    stepHole: 1,
    length_1: BOARD_HEIGHT,
    startIdx_1: 0,
    step_1: 1,
    startIdx_2: 1,
    length_2: BOARD_WIDTH,
    step_2: 1,
  },
  1: {
    dir: MOVEMENT.RIGHT,
    startPrevIdx: BOARD_WIDTH - 1,
    stepHole: -1,
    length_1: BOARD_HEIGHT,
    startIdx_1: 0,
    step_1: 1,
    startIdx_2: BOARD_WIDTH - 2,
    length_2: 0,
    step_2: -1,
  },
};
