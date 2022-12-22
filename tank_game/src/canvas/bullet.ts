import config from "../config";
import CanvasAbstract from "./canvas";
import model from "../model/bullet";
import tank from "./tank";
import player from "./player";
import audio from "../server/audio";
// 子弹画布
class bullet extends CanvasAbstract implements ICanvas {
  intervalId = 0; //定时器
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
    this.intervalId = setInterval(() => {
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
        // audio.fire()
      }
    });
  }

  //添加玩家子弹 新增方法
  addPlayerBullet() {
    this.models.push(new model(player.models[0]));
    audio.fire(); //子弹发射声音
  }

  //
  stop() {
    clearInterval(this.intervalId);
  }
}

//因为是单例 可以直接返回 new()()
export default new bullet();
