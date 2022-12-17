import config from "../config";
import CanvasAbstract from "./canvas";
import model from "../model/wall";
// 墙
class wall extends CanvasAbstract implements ICanvas {
  model(): ModelConstructior {
    return model;
  }
  num(): number {
    return config.wall.num;
  }
  nameType(): string {
    return config.wall.name;
  }
  render(): void {
    super.createModels(); //调用父级方法
    //单独绘制家园周围的墙
    this.createBoosWall();
    super.renderModels();
  }

  createBoosWall() {
    const cw = config.canvas.width;
    const ch = config.canvas.height;
    const mw = config.model.width;
    const mh = config.model.height;
    const pos = [
      { x: cw / 2 - mw * 2, y: ch - mh },
      { x: cw / 2 - mw * 2, y: ch - mh * 2 },
      { x: cw / 2 - mw * 2, y: ch - mh * 3 },
      { x: cw / 2 - mw, y: ch - mh * 3 },
      { x: cw / 2, y: ch - mh * 3 },
      { x: cw / 2 + mw, y: ch - mh * 3 },
      { x: cw / 2 + mw * 2, y: ch - mh },
      { x: cw / 2 + mw * 2, y: ch - mh * 2 },
      { x: cw / 2 + mw * 2, y: ch - mh * 3 },
    ];
    pos.forEach((position) => {
      const model = this.model() as ModelConstructior;
      const instance = new model(position.x, position.y);
      this.models.push(instance);
    });
  }
}

export default new wall();
