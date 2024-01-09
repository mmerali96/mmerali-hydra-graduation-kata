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
    const randomRowIndex = this.calculateRandomIndex(this.gameboard);
    const randomColIndex = this.calculateRandomIndex(this.gameboard[0]);
    return [randomRowIndex, randomColIndex];
  }

  printGameboard() {
    console.log(this.getGameboard());
  }

  createGame(seed) {
    this.seedBombs(seed);
    this.printGameboard();
    this.printMessage(`Game created`);
  }

  startGame(seed = '*   *   *') {
    this.createGame(seed);

    let currentPosition = this.getStartingLocation();
    while (!this.checkIfBoardIsDiscovered() && currentPosition.length !== 0) {
      if (!this.handleStepOnSquare(currentPosition[0], currentPosition[1])) {
        break;
      }
      this.clearAdjacentNeighbors(currentPosition);
      currentPosition = this.selectNextPosition();
    }

    this.isGameWon();
  }

  clearAdjacentNeighbors(currentPosition) {
    const neighborIndexList = this.getListOfNeighboringSquares(currentPosition[0], currentPosition[1]);
    for (const index of neighborIndexList) {
      this.clearSquare(index[0], index[1]);
    }
  }

  isGameWon() {
    if (this.checkIfBoardIsDiscovered()) {
      this.printGameboard();
      this.printMessage('the land is cleared! GOOD JOB');
    }
  }

  getUndiscoveredSquares() {
    let emptySquareIndexList = [];
    for (let i = 0; i < this.gameboard.length; i++) {
      for (let j = 0; j < this.gameboard[0].length; j++) {
        if (this.gameboard[i][j] === ' ') {
          emptySquareIndexList.push([i, j]);
        }
      }
    }
    return emptySquareIndexList;
  }

  calculateRandomIndex(list) {
    return Math.floor((Number(crypto.randomBytes(1)[0]) / 256) * list.length);
  }

  selectNextPosition() {
    let emptySquareIndexList = this.getUndiscoveredSquares();

    if (emptySquareIndexList.length === 0) {
      return [];
    }

    const randomItemIndex = this.calculateRandomIndex(emptySquareIndexList);

    return emptySquareIndexList[randomItemIndex];
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

  validateSeedStringLength(seedString) {
    if (seedString.length !== this.gameboard.length * this.gameboard[0].length) {
      throw new Error('Error: seed string must equal size of gameboard');
    }
  }

  validateSeedStringCharacters(seedString) {
    if (/[^*\s]/.test(seedString)) {
      throw new Error('Error: seed string can only contain " " or "*"');
    }
  }

  seedBombs(seedString = '*   *   *') {
    this.validateSeedStringLength(seedString);
    this.validateSeedStringCharacters(seedString);

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
    this.printGameboard();
    this.printMessage('Square flagged as bomb');
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

  checkIfBoardIsDiscovered() {
    return this.gameboard.flat().filter((square) => square === ' ').length === 0;
  }
}

module.exports = { MineField };
