import config from "../config";
// import utils from "./utils";
//图片服务

//对象转化类型提示 类型
export type mapKey = keyof typeof config.images;

//导出所有图片
export const images = new Map<mapKey, HTMLImageElement>();

//返还promise 数组 用all 一起加载
export const promise = Object.entries(config.images).map(([key, value]) => {
  //操作图片是异步
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.src = value;
    img.onload = () => {
      images.set(key as mapKey, img);
      resolve(img);
    };
  });
});
