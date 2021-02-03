// 定义蛇类
class Snake {
  element: HTMLElement;  // 蛇的容器
  head: HTMLElement;  // 蛇头
  bodies: HTMLCollection;  // 蛇身（包括蛇头）

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake > div") as HTMLElement;
    this.bodies = this.element.getElementsByTagName("div");
  }

  // 获取蛇头的坐标
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇头的坐标
  set X(value) {
    // 如果新值和旧值一样，则不再修改
    if (this.X === value) return;

    // X的值的合法范围0 - 290之间
    if (value < 0 || value > 290) {
      // 撞墙了
      throw new Error("蛇撞墙了！Game Over!")
    }

    // 判断蛇是否往反方向走
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (this.X < value) {  // 此时蛇是向左走的
        value = this.X - 10;
      } else {  // 此时蛇是向右走的
        value = this.X + 10;
      }
    }

    this.moveBody()
    this.head.style.left = value + "px";
    this.checkHeadBody();
  }
  set Y(value) {
    // 如果新值和旧值一样，则不再修改
    if (this.Y === value) return;

    // Y的值的合法范围0 - 290之间
    if (value < 0 || value > 290) {
      // 撞墙了
      throw new Error("蛇撞墙了！Game Over!")
    }

    // 判断蛇是否往反方向走
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (this.Y < value) {  // 此时蛇是向上走的
        value = this.Y - 10;
      } else {  // 此时蛇是向下走的
        value = this.Y + 10;
      }
    }

    this.moveBody()
    this.head.style.top = value + "px";
    this.checkHeadBody();
  }

  // 添加蛇身的方法
  addBody() {
    // @ts-ignore
    let divNode = document.createElement("div");
    this.element.appendChild(divNode);
    // this.element.insertAdjacentElement("beforeend", "<div></div>");
  }

  // 添加蛇身移动的方法
  moveBody () {
    /*
    *  将后边的身体设置为前边身体的位置
    * */
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

      // 将值设置到当前的位置上
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  // 检测蛇头是否撞到自己的身体
  checkHeadBody () {
    for (let i = 1; i < this.bodies.length; i++) {
      let item = this.bodies[i] as HTMLElement;

      if (this.X === item.offsetLeft && this.Y === item.offsetTop) {
        throw new Error('撞到自己了！')
      }
    }
  }

  // 重新开始
  snakeRestart () {
    this.X = 0;
    this.Y = 150;

    if (this.bodies.length <= 0) return;

    // 从后面往前面删，就不会改变索引了
    for (let i = this.bodies.length - 1; i > 0; i--) {
      this.bodies[i] && this.bodies[i].remove()
    }
  }
}

export default Snake;