import config from "../config";
import CanvasAbstract from "./canvas";
import model from "../model/player";
// 玩家坦克
class player extends CanvasAbstract implements ICanvas {
  model(): ModelConstructior {
    return model;
  }
  num(): number {
    return config.player.num;
  }
  nameType(): string {
    return config.player.name;
  }
  render(): void {
    this.createModels(); //
    this.renderModel(); //画布渲染整类游戏对象
    this.el.style.zIndex = "1";
    //60帧渲染坦克画布
    setInterval(() => {
      this.renderModel();
    }, config.tank_timeout);
  }

  //坦克特殊重写渲染模型
  public renderModel() {
    //擦除
    this.ctx.clearRect(0, 0, config.canvas.width, config.canvas.height);
    super.renderModels();
    // this.models.forEach((model) => {
    //   //
    //   model.render();
    //   //画布渲染模型
    //   this.canvas.drawImage(
    //     model.image(),
    //     model.x,
    //     model.y,
    //     config.model.width,
    //     config.model.height
    //   );
    //   model.render();
    // });
  }

  //绘制模型  --覆盖父级方法
  protected createModels() {
    [
      {
        x: config.canvas.width / 2 - config.model.width * 5,
        y: config.canvas.height - config.model.height * 2,
        type: "player",
      },
    ].forEach((pos) => {
      const model = this.model() as ModelConstructior;
      const instance = new model(pos.x, pos.y);
      this.models.push(instance);
    });
  }
}

export default new player();
