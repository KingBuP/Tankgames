import boss from "./canvas/boss";
import steel from "./canvas/steel";
import wall from "./canvas/wall";
import config from "./config";

export default new (class utils {
  //碰撞检测
  //画布检测
  isCanvasTouch(
    x: number,
    y: number,
    width: number = config.model.width,
    height: number = config.model.height
  ) {
    //运动阈值 范围
    if (
      x < 0 ||
      x + width > config.canvas.width ||
      y < 0 ||
      y + height > config.canvas.height
    ) {
      return true;
    }
    return false;
  }

  //是否是魔性间触碰 碰撞返还对面模型
  isModelTouch(
    x: number,
    y: number,
    width: number = config.model.width,
    height: number = config.model.height,
    models = [...steel.models, ...wall.models, ...boss.models]
  ): IModel | undefined {
    //物体间碰撞
    return models.find((mode) => {
      const state =
        x + width <= mode.x ||
        x >= mode.x + mode.width ||
        y + height <= mode.y ||
        y >= mode.y + mode.height;
      return !state;
    });
  }
})();
