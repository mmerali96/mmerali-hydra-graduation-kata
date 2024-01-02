const crypto = require('crypto');

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
        result += '|' + col;
      }
      result += '|\n';
    }
    result += '+-+-+-+';
    return result;
  }

  getStartingLocation() {
    const randomRowIndex = Math.floor(crypto.randomBytes(1) * this.gameboard.length);
    const randomColIndex = Math.floor(crypto.randomBytes(1) * this.gameboard[0].length);
    return [randomRowIndex, randomColIndex];
  }

  printGameboard() {
    console.log(this.getGameboard());
  }

  startGame() {
    this.seedBombs();
    this.printGameboard();
    console.log(`[Sandbox ${this.gameboard.length}x${this.gameboard[0].length}] Game created`);
  }

  handleStepOnSquare(rowIndex, colIndex) {
    if (this.bombBoard[rowIndex][colIndex] === '*') {
      this.gameboard[rowIndex][colIndex] = 'X';
    }

    return this.gameboard[rowIndex][colIndex] === 'X';
  }

  seedBombs() {
    this.bombBoard[0][0] = '*';
    this.bombBoard[1][1] = '*';
    this.bombBoard[2][2] = '*';
  }
}

module.exports = { MineField };
