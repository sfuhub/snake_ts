// 定义记分牌的类
class ScorePanel {
  score = 0;  // 分数
  level = 1;  // 等级

  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  maxLevel: number;  // 限制最高等级
  upScore: number;  // 每隔多少分升一级

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 加分方法
  addScore() {
    this.scoreEle.innerHTML = ++this.score + "";

    // 每10分升一级
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + "";
    }
  }

  // 重置分数、等级
  scoreRestart () {
    this.score = 0;
    this.level = 1;
    this.scoreEle.innerHTML = this.score + "";
    this.levelEle.innerHTML = this.level + "";
  }
}

export default ScorePanel;