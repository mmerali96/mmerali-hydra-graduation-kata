function hello() {
  return 'hello';
}

class MineField {
  constructor() {
    this.gameboard = [...Array(3)].map(() => Array(3).fill(' '));
    this.bombBoard = [...Array(3)].map(() => Array(3).fill(' '));
  }

  getGameboard() {
    let result = '';
    for (const row of this.gameboard) {
      result += '+-+-+-+\n';
      for (const col of row) {
        result += '|' + (col || ' ') + '';
      }
      result += '|\n';
    }
    result += '+-+-+-+';
    return result;
  }

  printGameboard() {
    console.log(this.getGameboard());
  }

  startGame() {
    this.printGameboard();
    console.log(`[Sandbox ${this.gameboard.length}x${this.gameboard[0].length}] Game created`);
  }
}

module.exports = { hello, MineField };
