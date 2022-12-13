/// <reference types="vite/client" />
// Constructior-构造函数
interface ModelConstructior {
  new (x: number, y: number): IModel;
}

interface IModel {
  x: number;
  y: number;
  width: number;
  height: number;
  render(): void;
  image(): HTMLImageElement;
}

interface ICanvas {
  num(): number;
  model(): ModelConstructior;
  nameType(): string;
  ctx: CanvasRenderingContext2D;
}
