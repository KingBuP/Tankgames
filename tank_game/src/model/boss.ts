import boss from "../canvas/boss";
import { images } from "../server/image";
import modelAbstract from "./modelAbstract";

// 墙对象
export default class extends modelAbstract implements IModel {
  public canvas: ICanvas = boss;
  name: string = "boss";
  image(): HTMLImageElement {
    return images.get("boss")!;
  }
  render(): void {
    super.draw(this.image());
  }
}
