import config from "../config";
import CanvasAbstract from "./canvas";
import model from "../model/steel";
// 钢墙
class steel extends CanvasAbstract implements ICanvas {
  model(): ModelConstructior {
    return model;
  }
  num(): number {
    return config.steel.num;
  }
  nameType(): string {
    return config.steel.name;
  }
  render(): void {
    super.createModels(); //调用父级方法
    super.renderModels();
  }
}

export default new steel();
