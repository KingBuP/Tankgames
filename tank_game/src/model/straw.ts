import modelAbstract from "./modelAbstract";

// 草地对象
export default class extends modelAbstract implements IModel {
  render(): void {
    super.draw("straw");
  }
}
