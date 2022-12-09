import modelAbstract from "./modelAbstract";

// 墙对象
export default class extends modelAbstract implements IModel {
  render(): void {
    super.draw("wall");
  }
}
