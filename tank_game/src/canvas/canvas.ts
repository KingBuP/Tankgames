import config from "../config";
import position from "../server/position";
// import { image } from "../server/image"; //图片集合 map类型

// 画布
export default abstract class CanvasAbstract {
  protected models: IModel[] = []; //物体对象实例
  abstract render(): void; //子类替工
  constructor(
    protected app = document.querySelector("#app") as HTMLDivElement,
    protected el = document.createElement("canvas"),
    protected canvas = el.getContext("2d")!
  ) {
    this.createCanvas();
  }

  //创建画布
  protected createCanvas() {
    this.el.width = config.canvas.width;
    this.el.height = config.canvas.height;
    this.app.insertAdjacentElement("afterbegin", this.el);
  }

  //绘制模型
  protected createModels(num: number, model: ModelConstructior, type: string) {
    position.getCollection(num, type).forEach((pos) => {
      //判断类型
      position.collection.forEach((c) => {
        if (c.type == type) {
          //创建
          console.log("11");

          const instance = new model(this.canvas, pos.x, pos.y);
          this.models.push(instance);
        }
      });
    });
  }

  //渲染模型
  protected renderModel() {
    this.models.forEach((model) => model.render());
  }
}
