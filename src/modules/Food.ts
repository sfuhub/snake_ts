// 定义食物类 Food
class Food {
  element: HTMLElement;

  constructor() {
    // 获取页面中food元素
    this.element = document.getElementById("food")!;
  }

  // 获取食物X轴坐标
  get X() {
    return this.element.offsetLeft;
  }

  // 获取食物Y轴坐标
  get Y() {
    return this.element.offsetTop;
  }

  // 改变食物的位置
  change() {
    //生成一个随机位置
    // 食物的位置最小是0，最大是290
    // 蛇移动一格的位置是10，所以食物的位置要是10的倍数

    let left = Math.round(Math.random() * 29) * 10;
    let top = Math.round(Math.random() * 29) * 10;

    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}

export default Food;