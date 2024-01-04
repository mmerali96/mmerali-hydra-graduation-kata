const crypto = require('crypto');

const POSITION_OFFSET_LIST = [
  [1, 0], // up
  [1, 1], // up-right
  [0, 1], // right
  [-1, 1], // down-right
  [-1, 0], // down
  [-1, -1], // down-left
  [0, -1], //left
  [1, -1], // up-left
];

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
    const randomRowIndex = Math.floor((Number(crypto.randomBytes(1)[0]) / 256) * this.gameboard.length);
    const randomColIndex = Math.floor((Number(crypto.randomBytes(1)[0]) / 256) * this.gameboard[0].length);
    return [randomRowIndex, randomColIndex];
  }

  printGameboard() {
    console.log(this.getGameboard());
  }

  startGame(seed = '*   *   *') {
    this.seedBombs(seed);
    this.printGameboard();
    this.printMessage(`Game created`);
    const startPosition = this.getStartingLocation();
    let playGame = true;
    while (playGame) {
      playGame = this.handleStepOnSquare(startPosition[0], startPosition[1]);
      break;
    }
  }

  handleStepOnSquare(rowIndex, colIndex) {
    if (this.bombBoard[rowIndex][colIndex] === '*') {
      this.gameboard[rowIndex][colIndex] = 'X';
      this.printGameboard();
      this.printMessage(`BOOM! - Game Over`);
      return false;
    } else {
      const neighborBombCount = this.calculateNeighboringBombs(rowIndex, colIndex);
      this.gameboard[rowIndex][colIndex] = '' + neighborBombCount;
      this.printGameboard();
      this.printMessage(`${neighborBombCount} bombs around your square`);
      return true;
    }
  }

  seedBombs(seedString = '*   *   *') {
    const seedArray = seedString.split('');
    for (let i = 0; i < this.bombBoard.length; i++) {
      for (let j = 0; j < this.bombBoard[0].length; j++) {
        this.bombBoard[i][j] = seedArray[i * 3 + j];
      }
    }
  }

  isValidIndex(rowIndex, colIndex) {
    return rowIndex >= 0 && rowIndex < this.gameboard.length && colIndex >= 0 && colIndex < this.gameboard[0].length;
  }

  calculateNeighboringBombs(rowIndex, colIndex) {
    let bombCount = 0;

    for (const offset of POSITION_OFFSET_LIST) {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColIndex = colIndex + offset[1];
      if (this.isValidIndex(neighborRowIndex, neighborColIndex) && this.bombBoard[neighborRowIndex][neighborColIndex] === '*') {
        bombCount += 1;
      }
    }

    return bombCount;
  }

  clearSquare(rowIndex, colIndex) {
    if (this.bombBoard[rowIndex][colIndex] === '*') {
      this.gameboard[rowIndex][colIndex] = '*';
    } else {
      this.gameboard[rowIndex][colIndex] = '_';
    }
  }

  printMessage(message) {
    console.log(`[Sandbox ${this.gameboard.length}x${this.gameboard[0].length}] ${message}.`);
  }

  getListOfNeighboringSquares(rowIndex, colIndex) {
    let neighborList = [];
    for (const offset of POSITION_OFFSET_LIST) {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColIndex = colIndex + offset[1];
      if (this.isValidIndex(neighborRowIndex, neighborColIndex) && this.gameboard[neighborRowIndex][neighborColIndex] === ' ') {
        neighborList.push([neighborRowIndex, neighborColIndex]);
      }
    }
    return neighborList;
  }
}

module.exports = { MineField };
