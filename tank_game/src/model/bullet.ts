import boss from "../canvas/boss";
import bullet from "../canvas/bullet";
import player from "../canvas/player";
import steel from "../canvas/steel";
import tank from "../canvas/tank";
import wall from "../canvas/wall";
import config from "../config";
import { directionEnum } from "../enum/directionEnum";
import { images } from "../server/image";
import utils from "../utils";
import modelAbstract from "./modelAbstract";

// 水对象
export default class extends modelAbstract implements IModel {
  public canvas: ICanvas = bullet;
  name: string = "bullet";
  //记录发射这颗子弹的坦克
  constructor(public tank: IModel) {
    super(
      tank?.x + config.model.width / 2 - config.bulletSise / 2,
      tank?.y + config.model.height / 2 - config.bulletSise / 2
    ); //tank中心发送子弹
    //方向
    this.direction = tank?.direction as unknown as directionEnum;
  }
  image(): HTMLImageElement {
    return images.get("bullet")!;
  }
  render(): void {
    let x = this.x;
    let y = this.y;
    switch (this.direction) {
      case directionEnum.top:
        y -= 2;
        break;
      case directionEnum.right:
        x += 2;
        break;
      case directionEnum.botton:
        y += 2;
        break;
      case directionEnum.left:
        x -= 2;
        break;
    } //
    const touchModel = utils.isModelTouch(
      x,
      y,
      config.bulletSise,
      config.bulletSise,
      [
        ...wall.models,
        ...boss.models,
        ...steel.models,
        ...tank.models,
        ...player.models,
      ]
    );
    //碰撞检测
    if (utils.isCanvasTouch(x, y, config.bulletSise, config.bulletSise)) {
      this.destroy();
    } else if (touchModel && touchModel.name != this.tank.name) {
      this.destroy();
      if (
        touchModel.name == "wall" ||
        touchModel.name == "boss" ||
        touchModel.name == "tank" ||
        touchModel.name == "player"
      )
        touchModel.destroy();
      this.blast(touchModel);
    } else {
      this.x = x;
      this.y = y;
      this.draw(this.image());
    }
  }

  //覆盖父级
  protected draw(img: HTMLImageElement) {
    this.canvas?.ctx.drawImage(
      img,
      this.x,
      this.y,
      config.bulletSise,
      config.bulletSise
    );
  }
}
