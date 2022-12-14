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
    super.renderModels();
  }
}

export default new wall();
