export default {
  el(id: string): HTMLAudioElement {
    return document.querySelector<HTMLAudioElement>(`#${id}`)!;
  },
  //游戏开始
  start() {
    const el = this.el("aStart");
    el.play();
  },
  //子弹发射
  fire() {
    const el = this.el("aFire");
    el.play();
  },
  //爆炸声音
  blast() {
    const el = this.el("aBlast");
    el.play();
  },
};
