import { Utils } from "../utils/Utils";

export class GameModel {
  private constructor() {
    this.NewGame();
    this.HighScore = 0;
  }

  private static _instance: GameModel = null;

  public static Instance(): GameModel {
    if (this._instance == null) {
      this._instance = new GameModel();
    }
    return this._instance;
  }

  Sound: boolean;
  Score: number;
  HighScore: number;
  GameOver: boolean;

  NewGame() {
    this.Score = 0;
    this.GameOver = false;
  }

  CloneAttributes(game: GameModel) {
    Object.assign(this, { ...game });
  }

  EndGame() {
    this.GameOver = true;
  }
  public AddScore(score: number) {
    this.Score += score;
  }
  public SetScore(score: number) {
    this.Score = score;
  }
  public UpdateHighScore(): number {
    if (this.Score > this.HighScore) {
      this.HighScore = this.Score;
      return this.HighScore;
    }
    return 0;
  }

  public SetHighscore(score: number) {
    this.HighScore = score;
  }
}
