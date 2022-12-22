/// <reference types="vite/client" />

// import { directionEnum } from "./enum/directionEnum";

// Constructior-构造函数
interface ModelConstructior {
  new (x: number, y: number): IModel;
}

//子弹类型
interface BulletModelConstructior {
  new (tank: IModel): IModel;
}

interface IModel {
  x: number;
  y: number;
  tank?: IModel;
  width: number;
  height: number;
  render(): void;
  name: string;
  direction: string;
  image(): HTMLImageElement;
  destroy(): void;
}

interface ICanvas {
  num(): number;
  model(): ModelConstructior | BulletModelConstructior;
  nameType(): string;
  ctx: CanvasRenderingContext2D;
  removeModel(model: IModel): void;
  renderModels(): void;
  stop?(): void;
}
