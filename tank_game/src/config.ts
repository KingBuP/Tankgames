import strawUrl from "./static/images/straw/straw.png";
import wallUrl from "./static/images/wall/wall.gif";

//配置管理
export default {
  canvas: {
    width: 900,
    height: 500,
  },
  model: {
    width: 30,
    height: 30,
  },
  straw: { num: 20, name: "straw" },
  wall: {
    num: 30,
    name: "wall",
  },
  images: {
    straw: strawUrl, //草地
    wall: wallUrl, //墙
  },
};
