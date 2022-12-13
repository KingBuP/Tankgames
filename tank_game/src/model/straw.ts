import straw from "../canvas/straw";
import { images } from "../server/image";
import modelAbstract from "./modelAbstract";

// 草地对象
export default class extends modelAbstract implements IModel {
  public canvas: ICanvas = straw;
  name: string = "straw";
  image(): HTMLImageElement {
    return images.get("straw")!;
  }
  render(): void {
    super.draw(this.image());
  }
}
