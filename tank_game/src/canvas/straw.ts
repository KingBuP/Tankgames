import config from "../config";
import CanvasAbstract from "./canvas";
import model from "../model/straw";
// 草地
class straw extends CanvasAbstract {
  constructor() {
    super();
    super.createModels(config.straw.num, model, config.straw.name); //调用父级方法
  }
  render(): void {
    super.renderModel();
  }
}

export default new straw();
