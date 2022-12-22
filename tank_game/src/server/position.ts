import config from "../config";

type positionType = { x: number; y: number; type?: string };
//坐标服务
class position {
  //批量获取唯一坐标  位置集合  collection集合
  public collection: positionType[] = [];
  public getCollection(num: number, type: string = ""): positionType[] {
    let collection: positionType[] = [];
    //创建数组并填充""  并循环
    Array(num)
      .fill("")
      .forEach(() => {
        //防止重叠！！！！！！
        //while循环确保数量正确  位置相同是开启循环
        while (true) {
          const position = this.position();
          //exists-存在
          const exists = this.collection.some(
            (c) => c.x == position.x && c.y == position.y
          );
          if (!exists) {
            position.type = type;
            collection.push(position);
            this.collection.push(position);
            break;
          }
        }
      });
    return collection;
  }

  //返还随机位置
  public position(type: string = "") {
    //!!!!!!!!!!! 上下留空-坦克初始位置
    return {
      x:
        Math.floor((Math.random() * config.canvas.width) / config.model.width) *
        config.model.width,
      y:
        Math.floor(
          Math.random() * (config.canvas.height / config.model.height - 5)
        ) *
          config.model.height +
        config.model.height * 2,
      type: type,
    };
  }
}

export default new position();
