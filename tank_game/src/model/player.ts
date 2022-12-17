import { directionEnum } from "../enum/directionEnum";
import { images, mapKey } from "../server/image";
import modelAbstract from "./modelAbstract";
import _ from "lodash";
import config from "../config";
import player from "../canvas/player";
import utils from "../utils";
import bullet from "../canvas/bullet";

//玩家对象
export default class extends modelAbstract implements IModel {
  public canvas: ICanvas = player;
  name: string = "player"; //名字
  initDirection = true; //初始方向
  bindEvent = false; //事件是否绑定 只绑定一次事件
  //渲染单个实例
  render(): void {
    // 渲染交给画布
    // super.draw(this.image());
    // setInterval(() => {
    //   this.move();
    // }, 50);
    // this.move(); //移动
    super.draw(this.image());
    //添加事件 控制模块
    if (this.bindEvent === false) {
      this.bindEvent = true;
      document.addEventListener("keydown", this.changeDirection.bind(this));
      document.addEventListener("keydown", this.move.bind(this));
      //子弹发射
      //lodsh用节流 控制发射子弹的速率
      document.addEventListener(
        "keydown",
        _.throttle(this.addPlayBu.bind(this), 1000)
      );
    }
  }

  //玩家子弹发射函数
  addPlayBu(event: KeyboardEvent) {
    if (event.code === "Enter") {
      bullet.addPlayerBullet();
    }
  }

  //方向改变回调
  protected changeDirection(event: KeyboardEvent) {
    switch (event.code) {
      case "ArrowUp":
        this.direction = directionEnum.top;
        break;
      case "ArrowRight":
        this.direction = directionEnum.right;
        break;
      case "ArrowDown":
        this.direction = directionEnum.botton;
        break;
      case "ArrowLeft":
        this.direction = directionEnum.left;
        break;
    }
    // this.canvas.renderModels();
    super.draw(this.image());
  }
  //移动
  protected move(event: KeyboardEvent): void {
    let x = this.x;
    let y = this.y;
    switch (event.code) {
      case "ArrowUp":
        y -= 3;
        // this.direction = directionEnum.top;
        break;
      case "ArrowRight":
        x += 3;
        // this.direction = directionEnum.right;
        break;
      case "ArrowDown":
        y += 3;
        break;
      case "ArrowLeft":
        x -= 3;
        break;
    }
    //碰撞检测
    if (utils.isModelTouch(x, y) || utils.isCanvasTouch(x, y)) {
      // this.randerDirection();
    } else {
      this.x = x;
      this.y = y;
    }

    // 重绘;
    super.draw(this.image());
  }

  //图片
  image(): HTMLImageElement {
    if (this.initDirection) {
      this.initDirection = false;
      this.direction = directionEnum.top;
    }
    let direction = (this.name +
      _.upperFirst(this.direction) +
      "Url") as mapKey;
    return images.get(direction)!;
  }
}
