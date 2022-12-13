import steel from "../canvas/steel";
import { images } from "../server/image";
import modelAbstract from "./modelAbstract";

// 钢墙对象
export default class extends modelAbstract implements IModel {
  public canvas: ICanvas = steel;
  name: string = "steel";
  image(): HTMLImageElement {
    return images.get("steel")!;
  }
  render(): void {
    super.draw(this.image());
  }
}
