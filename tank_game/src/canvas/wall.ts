import config from "../config";
import CanvasAbstract from "./canvas";
import model from "../model/wall";
// 墙
class wall extends CanvasAbstract {
  constructor() {
    super();
    super.createModels(config.wall.num, model, config.wall.name); //调用父级方法
  }
  render(): void {
    super.renderModel();
  }
}

export default new wall();
