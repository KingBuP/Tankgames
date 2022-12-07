const el = document.querySelector<HTMLCanvasElement>("#canvas")!;

const app = el.getContext("2d")!;

// app.fillStyle = "red";
// app.fillRect(0, 0, 300, 300);

// 矩形
// app.fillStyle = "skyblue";
// app.fillRect(el.width / 2 - 50, el.height / 2 - 50, 100, 100);

// 线
// app.strokeStyle = "#8e44ad";
// app.lineWidth = 50;
// app.lineJoin = "round";
// app.strokeRect(50, 50, 100, 100);

// 圆 xian
// app.fillStyle = "red";
// app.lineWidth = 20;
// app.arc(100, 100, 50, 0, 2 * Math.PI);
// app.stroke();

// 不规则 -三角形
// app.beginPath(); //重新开始绘制  方法开始一条路径，或重置当前的路径。
// app.moveTo(el.width / 2, 10); //移动光标位置
// app.lineTo(el.width - 20, 250);
// app.lineTo(20, 250);
// app.closePath(); //闭合路径
// app.strokeStyle = "red";
// app.lineWidth = 10;
// app.lineJoin = "round";
// // app.fill();
// app.stroke(); //绘制

//渐变色
// 定义渐变色
// const gradient = app.createLinearGradient(0, 0, 300, 300); //渐变范围
// gradient.addColorStop(0, "red"); //渐变color
// gradient.addColorStop(0.5, "blue"); //渐变color
// gradient.addColorStop(1, "skyblue"); //渐变color
// // 绘画
// // app.fillStyle = gradient;
// // app.fillRect(0, 0, 300, 300);
// app.strokeStyle = gradient;
// app.lineWidth = 30;
// app.lineJoin = "round";
// app.strokeRect(50, 50, 100, 100);

//文字处理
// app.fillStyle = "#34495e";
// el.width = 500;
// el.height = 500;
// app.fillRect(0, 0, el.width, el.height);
// app.font = "50px yahei"; //大小 样式
// // app.fillStyle = "#fff"; //颜色
// app.strokeStyle = "#fff";
// app.lineWidth = 3;
// app.strokeText("你好你hi哦", 50, 100);
// // app.textBaseline = "top"; //文字基线
// // app.fillText("你好你hi哦", 50, 100);

//图片的背景  -- 游戏贴图 ！！
// const img = document.createElement("img");
// img.src = "/images/1.png";
// //图片加载后操作  -- 加载网络图片也可以判断是否联网
// img.onload = () => {
//   // document.body.insertAdjacentElement("afterbegin", img);
//   // 只能控制图片是否平铺不能操作图片
//   const pattern = app.createPattern(img, "repeat")!; //贴图
//   app.fillStyle = pattern;
//   app.fillRect(0, 0, 300, 300);
// };

// app.fillStyle = "#000";
// app.fillRect(0, 0, el.width, el.height);
// // 图片的绘制
// const img = document.createElement("img");
// img.src = "/images/1.png";
// img.onload = () => {
//   el.width = img.naturalWidth * scale(img, el);
//   el.height = img.naturalHeight * scale(img, el);
//   // 绘制图片 (图片，位置，宽度高度)
//   app.drawImage(img, 0, 0, el.width, el.height);
// };

// 常用手段
//图片缩略图 画布和图片大小一致
function scale(img: HTMLImageElement, el: HTMLCanvasElement) {
  // img.naturalWidth; //原始图片的尺寸
  //取最小是差距大的宽或高
  return Math.min(el.width / img.naturalWidth, el.height / img.naturalHeight); //原始图片的尺寸
}

// 画布随机色块
app.fillStyle = "#000";
app.rect(0, 0, 300, 300);
app.fill();
// for (let i = 0; i < 1000; i++) {
//   app.fillStyle = "#fff";
//   app.fillRect(Math.random() * el.width, Math.random() * el.height, 5, 5);
// }

for (let i = 0; i < 20; i++) {
  app.beginPath();
  app.fillStyle = ["#1abc9c", "#gejfei", "#33feff", "#098klp", "#09iokj"].sort(
    () => (Math.random() > 0.5 ? 1 : -1)
  )[0];
  app.arc(
    Math.random() * el.width,
    Math.random() * el.height,
    10 + Math.random() * 50,
    0,
    2 * Math.PI
  );
  app.fill();
}
