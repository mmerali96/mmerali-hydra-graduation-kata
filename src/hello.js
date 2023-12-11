function hello() {
  return 'hello';
}

class MineField {
  constructor() {
    this.gameboard = [...Array(3)].map(() => Array(3).fill(' '));
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
}

module.exports = { hello, MineField };
