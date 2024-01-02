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
    } else {
      this.gameboard[rowIndex][colIndex] = '' + this.calculateNeighboringBombs(rowIndex, colIndex);
    }

    return this.gameboard[rowIndex][colIndex] === 'X';
  }

  seedBombs() {
    this.bombBoard[0][0] = '*';
    this.bombBoard[1][1] = '*';
    this.bombBoard[2][2] = '*';
  }

  calculateNeighboringBombs(rowIndex, colIndex) {
    let bombCount = 0;
    const postionOffset = [
      [1, 0], // up
      [1, 1], // up-right
      [0, 1], // right
      [-1, 1], // down-right
      [-1, 0], // down
      [-1, -1], // down-left
      [0, -1], //left
      [1, -1], // up-left
    ];

    for (const offset of postionOffset) {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColIndex = colIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < this.gameboard.length && neighborColIndex >= 0 && neighborColIndex < this.gameboard[0].length) {
        if (this.bombBoard[neighborRowIndex][neighborColIndex] === '*') {
          bombCount += 1;
        }
      }
    }

    return bombCount;
  }
}

module.exports = { MineField };
