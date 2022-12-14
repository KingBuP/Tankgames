import water from "../canvas/water";
import { images } from "../server/image";
import modelAbstract from "./modelAbstract";

// 水对象
export default class extends modelAbstract implements IModel {
  public canvas: ICanvas = water;
  name: string = "water";
  image(): HTMLImageElement {
    return images.get("water")!;
  }
  render(): void {
    super.draw(this.image());
  }
}
