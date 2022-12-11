import { directionEnum } from "../enum/directionEnum";
import { images, mapKey } from "../server/image";
import modelAbstract from "./modelAbstract";
import _ from "lodash";
import config from "../config";

// 坦克对象
export default class extends modelAbstract implements IModel {
  name: string = "tank"; //名字
  //渲染单个实例
  render(): void {
    // 渲染交给画布
    // super.draw(this.image());
    // setInterval(() => {
    //   this.move();
    // }, 50);
    this.move(); //移动
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
    //修改坐标
    switch (this.direction) {
      case directionEnum.top:
        this.y -= config.tank_timeout2;
        break;
      case directionEnum.right:
        this.x += config.tank_timeout2;
        break;
      case directionEnum.botton:
        this.y += config.tank_timeout2;
        break;
      case directionEnum.left:
        this.x -= config.tank_timeout2;
        break;
    }
    // 重绘;
    super.draw(this.image());
  }

  //图片
  image(): HTMLImageElement {
    let direction = ("tank" + _.upperFirst(this.direction) + "Url") as mapKey;
    return images.get(direction)!;
  }
}
