import config from "../config";
import { directionEnum } from "../enum/directionEnum";
import audio from "../server/audio";

export default abstract class modelAbstract {
  abstract render(): void; //渲染函数
  public abstract canvas: ICanvas; //画布实例

  abstract name: string; //名字
  abstract image(): HTMLImageElement; //图片
  public direction: directionEnum = directionEnum.top; //方向
  public width = config.model.width;
  public height = config.model.height;

  constructor(public x: number, public y: number) {
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
    this.canvas?.ctx.drawImage(
      img,
      this.x,
      this.y,
      config.model.width,
      config.model.height
    );
  }

  //卸载模型
  public destroy() {
    //画布里移出模型
    this.canvas.removeModel(this);
    //渲染一下
    this.canvas.renderModels();
  }

  //爆炸动画
  protected blast(model: IModel) {
    audio.blast(); //爆炸声音·
    //0~100
    Array(...Array(8).keys()).reduce((promise, index) => {
      //当每个promise完成后继续下一个promise
      //执行过快的话可以加上定时器
      return new Promise((resolve) => {
        setTimeout(() => {
          const img = new Image();
          img.src = `/src/static/images/blasts/blast${index}.gif`;
          img.onload = () => {
            this.canvas.ctx.drawImage(
              img,
              model.x,
              model.y,
              model.width,
              model.height
            );
            resolve(promise);
          };
        }, 120);
      });
    }, Promise.resolve());
  }
}
