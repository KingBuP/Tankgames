import { images } from "../server/image";
import modelAbstract from "./modelAbstract";

// 墙对象
export default class extends modelAbstract implements IModel {
  name: string = "wall";
  image(): HTMLImageElement {
    return images.get("wall")!;
  }
  render(): void {
    super.draw(this.image());
  }
}
