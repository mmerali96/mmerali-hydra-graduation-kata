function hello() {
  return 'hello';
}

class MineField {
  constructor() {
    this.gameboard = [...Array(6)].map(() => Array(3).fill(' '));
  }
}

module.exports = { hello, MineField };
