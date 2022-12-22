import "./initcss.css"; //初始化
import "./global.scss"; //全局
import config from "./config";
import straw from "./canvas/straw"; //画布
import { promise } from "./server/image";
import wall from "./canvas/wall";
import water from "./canvas/water";
import steel from "./canvas/steel";
import tank from "./canvas/tank";
import bullet from "./canvas/bullet";
import boss from "./canvas/boss";
import player from "./canvas/player";
import audio from "./server/audio";

const app = document.querySelector<HTMLDivElement>("#app")!;
app.style.width = config.canvas.width + "px";
app.style.height = config.canvas.height + "px";

//先加载贴图后加载画布
export default {
  isStart: false, //游戏开始只执行一次
  state: 9, //输赢状态 1表示赢 0表示输
  interval: 0, //定时器
  //游戏启动 初始化
  bootstrap() {
    //事件函数只执行一次
    app.addEventListener("click", async () => {
      await this.gameStart();
      //每隔一段时间检测游戏是否结束
      this.interval = setInterval(() => {
        //坦克数量为0 赢
        if (tank.models.length == 0) this.state = 1;
        //玩家和基地数量为0 输
        if (player.models.length == 0 || boss.models.length == 0)
          this.state = 0;
        if (this.state != 9) this.gameEnd();
      });
    });
  },
  //游戏结束
  gameEnd() {
    //游戏结束清除定时器
    clearInterval(this.interval);
    tank.stop();
    bullet.stop();

    //调用文字
    this.text();
  },
  //游戏结束文字
  text() {
    const el = document.createElement("canvas");
    el.width = config.canvas.width;
    el.height = config.canvas.height;
    el.style.zIndex = "10";
    const ctx = el.getContext("2d")!;
    ctx.fillStyle = "blue";
    ctx.font = "80px CascadiaMono";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(
      this.state == 1 ? "恭喜您，胜利了！" : "很遗憾，失败了！",
      config.canvas.width / 2,
      config.canvas.height / 2
    );
    app.appendChild(el);
  },

  //游戏开始
  async gameStart() {
    if (this.isStart === true) return;
    this.isStart = true;
    app.style.backgroundImage = "none";

    //声音
    audio.start();

    await Promise.all(promise); //加载贴图
    straw.render(); //渲染
    wall.render();
    water.render();
    steel.render();
    tank.render();
    bullet.render();
    boss.render();
    player.render();
  },
};
// void start(); //游戏开关

/*
//黑板案例
import "./style.css";
class Blackboard {
  //实例必定触发的回调函数
  constructor(
    public el: HTMLCanvasElement = document.querySelector<HTMLCanvasElement>(
      "#canvas"
    )!,
    private height: number = 500,
    private width: number = 1200,
    private bgColor: string = "#000",
    private lineW: number = 3,
    private lineEarw: number = 3,
    private lineColor: string = "#fff",
    private app = el.getContext("2d")!,
    private btns: HTMLDivElement = document.createElement("div")
  ) {
    // 初始数据
    this.el.width = width;
    this.el.height = height;
    this.initBackground(); //初始背景
    this.bindEvent(); //绑定事件
  }
  //鼠标绘画事件
  private bindEvent() {
    this.el.addEventListener("mousedown", (event: MouseEvent) => {
      if (event.button) return; //event.button = 2  右键   event.button = 0  左键  event.button = 1  中键
      //定义 事件回调函数 方便清除事件
      const callbackMove = this.drawLine.bind(this);
      this.app.beginPath();
      this.app.strokeStyle = this.lineColor;
      this.app.lineWidth = this.lineW;
      //鼠标移动-回调就一个函数直接绑定别如忘了.bind()
      // this.el.addEventListener("mousemove", this.drawLine.bind(this));
      this.el.addEventListener("mousemove", callbackMove);
      //鼠标抬起
      document.addEventListener("mouseup", () => {
        //以下清除不掉 因为用了bind是返还的新的函数
        // this.el.removeEventListener("mousemove", this.drawLine.bind(this));
        this.el.removeEventListener("mousemove", callbackMove);
      });
    });
  }
  //画线动作
  private drawLine(event: MouseEvent) {
    this.app.lineTo(event.offsetX, event.offsetY);
    this.app.stroke();
  }
  //初始背景
  private initBackground() {
    // 初始数据
    this.app.fillStyle = this.bgColor;
    this.app.fillRect(0, 0, this.width, this.height);
    //元素后面放置按钮
    this.btns.style.cssText = "margin-top:20px;"; //css
    this.el.insertAdjacentElement("afterend", this.btns);
  }
  //清屏
  public clear() {
    const el = document.createElement("button");
    el.innerText = "清屏";
    el.style.cssText = "margin:5px;";
    this.btns.insertAdjacentElement("afterbegin", el);
    el.addEventListener("click", () => {
      this.app.fillStyle = this.bgColor;
      this.app.fillRect(0, 0, this.width, this.height);
    });
    return this; //链式
  }

  //设置背景
  public setBgColor(color: string = "#000") {
    this.bgColor = color;
    // this.initBackground();
    this.app.fillStyle = color;
    this.app.fillRect(0, 0, this.width, this.height);
    return this; //链式
  }

  //设置画笔颜色
  public setLineColor() {
    const colors = ["#e74c3c", "#d35400", "#1abc9c", "#f39c12", "#2c3e50"];
    colors.reverse(); //反转
    const container: HTMLDivElement = document.createElement("div");
    container.style.cssText = "margin-top:10px;";
    colors.forEach((color) => {
      const but = document.createElement("button");
      but.innerText = color;
      but.classList.add("button_color");
      but.style.cssText = "margin:5px;";

      container.insertAdjacentElement("afterbegin", but);
      //添加事件
      but.addEventListener("click", () => {
        this.lineColor = color;
        this.lineW = this.lineEarw;
        for (let i = 0; i < container.children.length; i++) {
          let butEl = container.children[i] as HTMLButtonElement;
          butEl.style.background = "#fff";
        }
        but.style.background = color;
      });
    });
    this.btns.insertAdjacentElement("afterend", container);
    return this;
  }

  //橡皮擦
  public erase() {
    const el = document.createElement("button");
    el.innerText = "橡皮擦";
    el.style.cssText = "margin:5px;";
    this.btns.insertAdjacentElement("afterbegin", el);
    el.addEventListener("click", () => {
      this.lineColor = this.bgColor;
      this.lineW = 20;
    });
    return this; //链式
  }

  //画笔
  public draw() {
    const el = document.createElement("button");
    el.innerText = "画笔";
    el.style.cssText = "margin:5px;";
    this.btns.insertAdjacentElement("afterbegin", el);
    el.addEventListener("click", () => {
      this.lineColor = "#fff";
      this.lineW = this.lineEarw;
      document
        .querySelectorAll(".button_color")
        .forEach((el: any) => (el.style.background = "#fff"));
    });
    return this; //链式
  }

  //画布截屏
  public short() {
    const el = document.createElement("button");
    el.innerText = "截图";
    el.style.cssText = "margin:5px;";
    this.btns.insertAdjacentElement("afterbegin", el);
    const img: HTMLImageElement = document.createElement("img");
    el.addEventListener("click", () => {
      img.src = this.el.toDataURL("image/jpeg");
      img.style.width = "300px";
      this.download({ src: img.src, fileName: "123" });
    });
    this.btns.insertAdjacentElement("afterend", img);
    return this; //链式
  }

  //图片下载
  private download(config: any) {
    const a = document.createElement("a"); // 创建一个a标签
    a.href = config.src; // a标签的src属性赋值
    if (config.target) {
      a.target = config.target;
    }
    a.download = config.fileName; // a标签的download属性赋值
    document.body.appendChild(a); // 添加a标签到body下
    a.click(); // 触发a标签点击事件
    document.body.removeChild(a); //  完成后删除a标签
  }
}

const instance = new Blackboard();

instance.setBgColor().setLineColor().clear().draw().erase().short();

*/

//----------------------------------
//----------------------------------
//----------------------------------

// const el = document.querySelector<HTMLCanvasElement>("#canvas")!;

// const app = el.getContext("2d")!;

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
// function scale(img: HTMLImageElement, el: HTMLCanvasElement) {
//   // img.naturalWidth; //原始图片的尺寸
//   //取最小是差距大的宽或高
//   return Math.min(el.width / img.naturalWidth, el.height / img.naturalHeight); //原始图片的尺寸
// }

// 画布随机色块
// app.fillStyle = "#000";
// app.rect(0, 0, 300, 300);
// app.fill();
// for (let i = 0; i < 1000; i++) {
//   app.fillStyle = "#fff";
//   app.fillRect(Math.random() * el.width, Math.random() * el.height, 5, 5);
// }

// for (let i = 0; i < 20; i++) {
//   app.beginPath();
//   app.fillStyle = ["#1abc9c", "#gejfei", "#33feff", "#098klp", "#09iokj"].sort(
//     () => (Math.random() > 0.5 ? 1 : -1)
//   )[0];
//   app.arc(
//     Math.random() * el.width,
//     Math.random() * el.height,
//     10 + Math.random() * 50,
//     0,
//     2 * Math.PI
//   );
//   app.fill();
// }
