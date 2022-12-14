import config from "../config";
import CanvasAbstract from "./canvas";
import model from "../model/bullet";
import tank from "./tank";
// 子弹画布
class bullet extends CanvasAbstract implements ICanvas {
  model(): BulletModelConstructior {
    return model;
  }
  num(): number {
    return config.bullet.num;
  }
  nameType(): string {
    return config.bullet.name;
  }
  render(): void {
    // super.createModels(); //调用父级方法
    // super.renderModel();
    setInterval(() => {
      this.createBullet();
      super.renderModels();
    }, 30);
  }

  //创建子弹
  createBullet() {
    //子弹的数量应该和坦克数量一致  如果不一至就创建     可以设置成每几秒发射一个子弹
    tank.models.forEach((tank) => {
      const isExists = this.models.some((m) => m.tank == tank);
      if (!isExists) {
        this.models.push(new model(tank));
      }
    });
  }
}

//因为是单例 可以直接返回 new()()
export default new bullet();
