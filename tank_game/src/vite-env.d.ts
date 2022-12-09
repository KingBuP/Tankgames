/// <reference types="vite/client" />
// Constructior-构造函数
interface ModelConstructior {
  new (canvas: CanvasRenderingContext2D, x: number, y: number): IModel;
}

interface IModel {
  render(): void;
}
