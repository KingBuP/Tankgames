import config from "../config";
import CanvasAbstract from "./canvas";
import model from "../model/water";
// 水
class water extends CanvasAbstract implements ICanvas {
  model(): ModelConstructior {
    return model;
  }
  num(): number {
    return config.water.num;
  }
  nameType(): string {
    return config.water.name;
  }
  render(): void {
    super.createModels(); //调用父级方法
    super.renderModels();
  }
}

export default new water();
