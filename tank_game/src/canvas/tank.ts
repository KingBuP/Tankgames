import config from "../config";
import CanvasAbstract from "./canvas";
import model from "../model/tank";
import position from "../server/position";
// 坦克
class tank extends CanvasAbstract implements ICanvas {
  intervalId = 0; //定时器
  model(): ModelConstructior {
    return model;
  }
  num(): number {
    return config.tank.num;
  }
  nameType(): string {
    return config.tank.name;
  }
  render(): void {
    this.createModels(); //调用父级方法
    this.renderModel(); //画布渲染整类游戏对象
    this.el.style.zIndex = "1";
    //60帧渲染坦克画布
    this.intervalId = setInterval(() => {
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
    for (let i = 0; i < config.tank.num; i++) {
      //位置可重复
      const pos = position.position(this.nameType());
      //创建
      const model = this.model();
      const instance = new model(pos.x, 0);
      this.models.push(instance);
    }
  }

  //
  stop() {
    clearInterval(this.intervalId);
  }
}

export default new tank();
