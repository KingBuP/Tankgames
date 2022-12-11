import config from "../config";
import { directionEnum } from "../enum/directionEnum";

export default abstract class modelAbstract {
  abstract render(): void; //渲染函数
  abstract name: string; //名字
  abstract image(): HTMLImageElement; //图片
  protected direction: directionEnum = directionEnum.botton; //方向
  constructor(
    protected canvas: CanvasRenderingContext2D,
    public x: number,
    public y: number
  ) {
    this.randerDirection();
  }

  //随机方向
  protected randerDirection() {
    this.direction = Object.keys(directionEnum)[
      Math.floor(Math.random() * 4)
    ] as directionEnum;
  }

  // 图片重绘由画布渲染-提高性能
  // 渲染图片;每个模型渲染自己  --- 坦克单独画布绘制
  protected draw(img: HTMLImageElement) {
    this.canvas.drawImage(
      img,
      this.x,
      this.y,
      config.model.width,
      config.model.height
    );
  }
}
