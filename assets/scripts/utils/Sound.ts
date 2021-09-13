const { ccclass, property } = cc._decorator;

@ccclass
export class SoundManager extends cc.Component {
  @property(cc.String)
  resFolder: string = "sounds";
  private preloadAudios: cc.AudioClip[] = [];
  onLoad() {
    this.preload();
  }
  preload() {
    cc.loader.loadResDir(this.resFolder, cc.AudioClip, (err, audios) => {
      if (err) {
        cc.log(err);
      } else {
        cc.log(audios);
        this.preloadAudios.push(...audios);
      }
    });
  }

  public getAudio(name: string): cc.AudioClip {
    for (const audio of this.preloadAudios) {
      if (audio.name === name) return audio;
    }
    return null;
  }
  public play(name: string, loop: boolean) {
    const audio = this.getAudio(name);
    if (audio) {
      cc.audioEngine.playEffect(audio, loop);
    }
  }
}
