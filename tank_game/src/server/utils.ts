class utils {
  //随机返还数组里一个元素
  getArrayItem(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
export default new utils();
