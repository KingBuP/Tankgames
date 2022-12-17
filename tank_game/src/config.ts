import strawUrl from "./static/images/straw/straw.png";
import wallUrl from "./static/images/wall/wall.gif";
import steelUrl from "./static/images/wall/steels.gif";
import waterUrl from "./static/images/water/water.gif";
import bulletUrl from "./static/images/bullet/bullet.jpg";
import bossUrl from "./static/images/boss/boss.png";

//敌方坦克
import tankBUrl from "./static/images/tank/bottom.gif";
import tankTUrl from "./static/images/tank/top.gif";
import tankLUrl from "./static/images/tank/left.gif";
import tankRUrl from "./static/images/tank/right.gif";
//玩家
import playerBUrl from "./static/images/player/bottom.gif";
import playerTUrl from "./static/images/player/top.gif";
import playerLUrl from "./static/images/player/left.gif";
import playerRUrl from "./static/images/player/right.gif";
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
  bulletSise: 5, //子弹大小
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
    num: 5,
    name: "tank",
  },
  //子弹
  bullet: {
    num: 0,
    name: "bullet",
  },
  // 基地
  boss: {
    num: 0,
    name: "boss",
  },
  //玩家
  player: { num: 1, name: "player" },
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
    bullet: bulletUrl, //子弹
    boss: bossUrl, //基地/家园
    playerBottonUrl: playerBUrl,
    playerTopUrl: playerTUrl,
    playerLeftUrl: playerLUrl,
    playerRightUrl: playerRUrl,
  },
};
