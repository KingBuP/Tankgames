import strawUrl from "./static/images/straw/straw.png";
import wallUrl from "./static/images/wall/wall.gif";
import steelUrl from "./static/images/wall/steels.gif";
import waterUrl from "./static/images/water/water.gif";

import tankBUrl from "./static/images/tank/bottom.gif";
import tankTUrl from "./static/images/tank/top.gif";
import tankLUrl from "./static/images/tank/left.gif";
import tankRUrl from "./static/images/tank/right.gif";

//配置管理
export default {
  canvas: {
    width: 900,
    height: 600,
  },
  model: {
    width: 30,
    height: 30,
  },
  //敌方坦克运行速度 16.667 == 60帧率
  tank_timeout: 16.667,
  //每次渲染坦克移动距离
  tank_timeout2: 0.5,
  // 草地
  straw: {
    num: 120,
    name: "straw",
  },
  // 墙
  wall: {
    num: 80,
    name: "wall",
  },
  // 水
  water: {
    num: 20,
    name: "water",
  },
  // 钢墙
  steel: {
    num: 20,
    name: "steel",
  },

  //坦克
  tank: {
    num: 20,
    name: "tank",
  },
  images: {
    straw: strawUrl, //草地
    wall: wallUrl, //墙
    water: waterUrl, //水
    steel: steelUrl, //钢
    // tank: [{ tankBUrl }, { tankTUrl }, { tankLUrl }, { tankRUrl }],
    tankBottonUrl: tankBUrl,
    tankTopUrl: tankTUrl,
    tankLeftUrl: tankLUrl,
    tankRightUrl: tankRUrl,
  },
};
