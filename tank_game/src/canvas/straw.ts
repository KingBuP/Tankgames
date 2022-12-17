import config from "../config";
import CanvasAbstract from "./canvas";
import model from "../model/straw";
// 草地
class straw extends CanvasAbstract implements ICanvas {
  model(): ModelConstructior {
    return model;
  }
  num(): number {
    return config.straw.num;
  }
  nameType(): string {
    return config.straw.name;
  }
  render(): void {
    super.createModels(); //调用父级方法
    super.renderModels();
    this.el.style.zIndex = "2"; //画布层级
  }
}

export default new straw();
