import config from "../config";
import position from "../server/position";
// import { image } from "../server/image"; //图片集合 map类型

// 画布
export default abstract class CanvasAbstract {
  public models: IModel[] = []; //物体对象实例
  abstract render(): void; //子类替工
  abstract model(): ModelConstructior | BulletModelConstructior;
  abstract num(): number;
  abstract nameType(): string;
  constructor(
    protected app = document.querySelector("#app") as HTMLDivElement,
    protected el = document.createElement("canvas"),
    public ctx = el.getContext("2d")!
  ) {
    this.createCanvas();
  }

  //创建画布
  protected createCanvas() {
    this.el.width = config.canvas.width;
    this.el.height = config.canvas.height;
    //给canvas名宁
    this.el.setAttribute("name", this.nameType());
    // this.app.appendChild(this.el); //和下面一样
    this.app.insertAdjacentElement("afterbegin", this.el);
  }

  //绘制模型
  protected createModels() {
    position.getCollection(this.num(), this.nameType()).forEach((pos) => {
      //判断类型
      // position.collection.forEach(() => {
      //创建
      const model = this.model() as ModelConstructior;
      const instance = new model(pos.x, pos.y);
      this.models.push(instance);
      // }
      // });
    });
  }

  //写在前面  现在渲染是在模块内渲染个人渲染个人  --但是敌方坦克会动则会每个坦克不断执行 擦除-位置改变-再次渲染 所以在敌方坦克的画布上单独写一个渲染方法覆盖父级渲染方法（在坦克画布上一下擦除整个画布，移动设置，在每个模块渲染自己的模型--这样就减少了很多不必要的删除操作提高性能）

  //渲染模型
  public renderModels() {
    this.ctx.clearRect(0, 0, config.canvas.width, config.canvas.height);
    this.models.forEach((model) => {
      //画布渲染模型
      // this.canvas.drawImage(
      //   model.image(),
      //   model.x,
      //   model.y,
      //   config.model.width,
      //   config.model.height
      // );
      model.render();
    });
  }

  //移出模型
  public removeModel(model: IModel) {
    this.models = this.models.filter((m) => m != model);
  }
}
