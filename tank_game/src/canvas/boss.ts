import config from "../config";
import CanvasAbstract from "./canvas";
import model from "../model/boss";
// 家园/基地
class boss extends CanvasAbstract implements ICanvas {
  model(): ModelConstructior {
    return model;
  }
  num(): number {
    return config.boss.num;
  }
  nameType(): string {
    return config.boss.name;
  }
  render(): void {
    this.createModels(); //覆盖
    this.renderModels();
  }

  //绘制模型
  protected createModels() {
    [
      {
        x: config.canvas.width / 2,
        y: config.canvas.height - config.model.height,
        type: "boss",
      },
    ].forEach((pos) => {
      const model = this.model() as ModelConstructior;
      const instance = new model(pos.x, pos.y);
      this.models.push(instance);
    });
  }
}

export default new boss();
