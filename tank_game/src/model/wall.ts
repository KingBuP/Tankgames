import wall from "../canvas/wall";
import { images } from "../server/image";
import modelAbstract from "./modelAbstract";

// 墙对象
export default class extends modelAbstract implements IModel {
  public canvas: ICanvas = wall;
  name: string = "wall";
  image(): HTMLImageElement {
    return images.get("wall")!;
  }
  render(): void {
    super.draw(this.image());
  }
}
