import config from "../config";
import { image, mapKey } from "../server/image";

export default abstract class modelAbstract {
  abstract render(): void;
  constructor(
    protected canvas: CanvasRenderingContext2D,
    protected x: number,
    protected y: number
  ) {}
  protected draw(name: mapKey) {
    this.canvas.drawImage(
      image.get(name)!,
      this.x,
      this.y,
      config.model.width,
      config.model.height
    );
  }
}
