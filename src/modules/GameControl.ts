import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制器，控制其他的类
class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  gameoverele: HTMLElement;
  resetbtn: HTMLElement;

  // 存储蛇的运行方向
  direction: string = "";

  // 记录游戏是否结束
  isLive: boolean = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.gameoverele = document.getElementById("overbox")!;
    this.resetbtn = document.getElementById("btn")!;
    this.resetbtn.addEventListener("click", this.resetGameFun.bind(this));

    this.init()
  }

  // 游戏初始化
  init() {
    document.addEventListener("keydown", this.keydownHandler.bind(this))
    this.run()
    this.food.change();  // 重置食物位置
    this.snake.Y = 150
  }

  /*
    ArrowUp      w
    ArrowDown    s
    ArrowRight   d
    ArrowLeft    a
  * */
  // 鼠标按下事件
  keydownHandler(e: KeyboardEvent) {
    this.direction = e.key
  }

  // 蛇移动方法
  run () {
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case "ArrowUp":
      case "Up":
      case "w":
        // 上
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
      case "s":
        // 下
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
      case "a":
        // 左
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
      case "d":
        // 右
        X += 10;
        break;
    }

    // 检测蛇是否吃到了食物，直接调用方法
    this.checkEat(X, Y)

    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      this.gameoverele.style.display = "block";
      this.isLive = false;
      alert(e.message)
      // this.checkGameOver(e.message)
    }

    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  // 定义一个方法，检测蛇是否迟到食物
  checkEat(X: number, Y: number){
    if (X === this.food.X && Y === this.food.Y) {
      // console.log("吃到了")
      this.food.change();  // 重置食物位置
      this.scorePanel.addScore();  // 增加分数
      this.snake.addBody();  // 增加蛇的长度
    }
  }

  resetGameFun () {
    this.gameoverele.style.display = "none";
    this.snake.snakeRestart()
    this.scorePanel.scoreRestart()
    this.isLive = true
    this.direction = ""
    this.init()
  }
}

export default GameControl;