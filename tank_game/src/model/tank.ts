import { directionEnum } from "../enum/directionEnum";
import { images, mapKey } from "../server/image";
import modelAbstract from "./modelAbstract";
import _ from "lodash";
import config from "../config";
import tank from "../canvas/tank";
import utils from "../utils";

// 坦克对象
export default class extends modelAbstract implements IModel {
  public canvas: ICanvas = tank;
  name: string = "tank"; //名字

  //渲染单个实例
  render(): void {
    // 渲染交给画布
    // super.draw(this.image());
    // setInterval(() => {
    //   this.move();
    // }, 50);
    this.move(); //移动
    //增加向下的概率 和移动时随机改变方向
    switch (this.direction) {
      case directionEnum.top || directionEnum.botton:
        if (_.random(750) == 1) this.direction = directionEnum.left;
        if (_.random(750) == 1) this.direction = directionEnum.right;
        break;
      case directionEnum.left || directionEnum.right:
        if (_.random(750) == 1) this.direction = directionEnum.top;
        if (_.random(400) == 1) this.direction = directionEnum.botton;
        break;
    }
  }

  protected move(): void {
    //坦克绘制在画布上
    //删除旧坦克坐标 在重新绘制  单独渲染坦克不如直接渲染整个坦克画布性能好
    //删除
    // this.canvas.clearRect(
    //   this.x,
    //   this.y,
    //   config.model.width,
    //   config.model.height
    // );
    //碰撞检测
    while (true) {
      let x = this.x;
      let y = this.y;
      //修改坐标
      switch (this.direction) {
        case directionEnum.top:
          y -= config.tank_timeout2;
          break;
        case directionEnum.right:
          x += config.tank_timeout2;
          break;
        case directionEnum.botton:
          y += config.tank_timeout2;
          break;
        case directionEnum.left:
          x -= config.tank_timeout2;
          break;
      }
      const touchModel = utils.isModelTouch(x, y)!;
      if (utils.isCanvasTouch(x, y)) {
        this.randerDirection();
      } else if (touchModel) {
        this.randerDirection();
        if (touchModel.name == "player" || touchModel.name == "boss")
          touchModel.destroy();
        this.blast(touchModel);
      } else {
        this.x = x;
        this.y = y;
        break;
      }
    }
    // 重绘;
    super.draw(this.image());
  }

  //是否是触碰
  // protected isTouch(x: number, y: number) {
  //   //运动阈值 范围
  //   if (
  //     x < 0 ||
  //     x + this.width > config.canvas.width ||
  //     y < 0 ||
  //     y + this.height > config.canvas.height
  //   ) {
  //     return true;
  //   }
  //   const models = [...water.models, ...steel.models, ...wall.models];
  //   //物体间碰撞
  //   return models.some((mode) => {
  //     const state =
  //       x + this.width <= mode.x ||
  //       x >= mode.x + mode.width ||
  //       y + this.height <= mode.y ||
  //       y >= mode.y + mode.height;
  //     return !state;
  //   });
  // }

  //图片
  image(): HTMLImageElement {
    let direction = ("tank" + _.upperFirst(this.direction) + "Url") as mapKey;
    return images.get(direction)!;
  }
}
