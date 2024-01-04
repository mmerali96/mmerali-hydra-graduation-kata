const { MineField } = require('./minefield');
const crypto = require('crypto');

describe('MineField game', () => {
  it('should be defined', () => {
    expect(MineField).toBeDefined();
  });
  it('should contain gameboard array which initially a size of 3x3 and empty', () => {
    expect(new MineField().gameboard).toEqual([...Array(3)].map(() => Array(3).fill(' ')));
  });
  it('should have a function that returns the gameboard as a user readable string', () => {
    expect(new MineField().getGameboard()).toBe('+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
  });
  it('should have a helper function that prints the gameboard to the console', () => {
    const logSpy = jest.spyOn(console, 'log');
    expect(new MineField().printGameboard).toBeDefined();
    new MineField().printGameboard();
    expect(logSpy).toHaveBeenCalled();

    logSpy.mockRestore();
  });

  describe('function getStartingLocation', () => {
    it('should be defined', () => {
      expect(new MineField().getStartingLocation).toBeDefined();
    });

    it('should return the starting position as an array of 2 indices', () => {
      expect(new MineField().getStartingLocation()).toEqual(expect.arrayContaining([expect.any(Number), expect.any(Number)]));
    });

    it('should use the random function to generate the starting position', () => {
      const mockMathRandom = jest.spyOn(crypto, 'randomBytes');
      new MineField().getStartingLocation();
      expect(mockMathRandom).toHaveBeenCalled();
      mockMathRandom.mockRestore();
    });
  });

  describe('function handleStepOnSquare', () => {
    it('should be defined', () => {
      expect(new MineField().handleStepOnSquare).toBeDefined();
    });

    it('when on a square with a bomb, should mark the gameboard with an "X" and return false', () => {
      const minefield = new MineField();
      minefield.seedBombs();
      expect(minefield.handleStepOnSquare(0, 0)).toBe(false);
      expect(minefield.gameboard[0][0]).toBe('X');
    });
    it('when on a clean square, should return true and mark the square with the number of bombs around it', () => {
      const minefield = new MineField();
      minefield.seedBombs();
      expect(minefield.handleStepOnSquare(1, 0)).toBe(true);
      expect(minefield.gameboard[1][0]).toBe('2');
    });
  });

  describe('should have a function called startGame', () => {
    it('should be defined', () => {
      expect(new MineField().startGame).toBeDefined();
    });

    it('should use the default seed to populate the bombboard if the seed is not provided', () => {
      const minefield = new MineField();
      minefield.startGame();
      expect(minefield.bombBoard).toEqual([
        ['*', ' ', ' '],
        [' ', '*', ' '],
        [' ', ' ', '*'],
      ]);
    });

    it('should print the game board and starting message', () => {
      const logSpy = jest.spyOn(console, 'log');
      const minefield = new MineField();
      minefield.startGame('         ');

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenNthCalledWith(1, '+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(2, '[Sandbox 3x3] Game created.');
      logSpy.mockRestore();
    });

    it('On game start, bot will select a bomb square and the game will output "BOOM! - Game Over."', () => {
      const logSpy = jest.spyOn(console, 'log');
      const minefield = new MineField();

      minefield.startGame('*********');

      expect(logSpy).toHaveBeenCalledTimes(4);
      expect(logSpy).toHaveBeenNthCalledWith(1, '+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(2, '[Sandbox 3x3] Game created.');
      expect(logSpy).toHaveBeenNthCalledWith(4, '[Sandbox 3x3] BOOM! - Game Over.');

      logSpy.mockRestore();
    });

    it('should print gameboard with number of neighboring bombs when bot selects clean square', () => {
      const logSpy = jest.spyOn(console, 'log');
      const minefield = new MineField();

      minefield.startGame('         ');

      expect(logSpy).toHaveBeenCalledTimes(4);
      expect(logSpy).toHaveBeenNthCalledWith(1, '+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(2, '[Sandbox 3x3] Game created.');
      expect(logSpy).toHaveBeenNthCalledWith(4, '[Sandbox 3x3] 0 bombs around your square.');

      logSpy.mockRestore();
    });
  });

  describe('should hold an internal state of where bombs are on the gameboard', () => {
    it('should have 2d array bombBoard defined', () => {
      expect(new MineField().bombBoard).toBeDefined();
    });
    it('should be initialized to a 3x3 array', () => {
      expect(new MineField().bombBoard).toEqual([...Array(3)].map(() => Array(3).fill(' ')));
    });

    it('should have function seedBombs that adds bombs to the bomb board', () => {
      expect(new MineField().seedBombs).toBeDefined();
    });

    it('should randomly define squares with bombs in internal map', () => {
      let field = new MineField();
      field.seedBombs();
      expect(field.bombBoard.flat().filter((item) => item === '*').length).toBe(3);
    });

    it('should take 9 char string "* **     " and populate the gameboard accordingly', () => {
      let field = new MineField();
      field.seedBombs('* **   * ');
      expect(field.bombBoard.flat().filter((item) => item === '*').length).toBe(4);
    });
  });

  describe('function calculateNeighboringBombs', () => {
    it('should be defined', () => {
      expect(new MineField().calculateNeighboringBombs).toBeDefined();
    });

    it('should return the number of bombs around a square', () => {
      const minefield = new MineField();
      minefield.seedBombs();
      expect(minefield.calculateNeighboringBombs(0, 1)).toBe(2);
      expect(minefield.calculateNeighboringBombs(0, 2)).toBe(1);
      expect(minefield.calculateNeighboringBombs(1, 0)).toBe(2);
      expect(minefield.calculateNeighboringBombs(1, 3)).toBe(1);
      expect(minefield.calculateNeighboringBombs(2, 0)).toBe(1);
      expect(minefield.calculateNeighboringBombs(2, 1)).toBe(2);
    });
  });

  describe('function printMessage', () => {
    it('should be defined', () => {
      expect(new MineField().printMessage).toBeDefined();
    });

    it('should prefix messages with the gameboard size', () => {
      const logSpy = jest.spyOn(console, 'log');
      new MineField().startGame();

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenNthCalledWith(2, '[Sandbox 3x3] Game created.');
      logSpy.mockRestore();
    });
  });

  describe('function clearBombs', () => {
    it('should be defined', () => {
      expect(new MineField().clearSquare).toBeDefined();
    });
    it('should take in a position as a parameter and mark the square with a "*" if it contains a bomb', () => {
      const minefield = new MineField();
      minefield.seedBombs('*********');
      minefield.clearSquare(0, 0);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*| | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      minefield.clearSquare(0, 1);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*| |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      minefield.clearSquare(0, 2);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      minefield.clearSquare(1, 0);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n|*| | |\n+-+-+-+\n| | | |\n+-+-+-+');
      minefield.clearSquare(1, 1);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*| |\n+-+-+-+\n| | | |\n+-+-+-+');
      minefield.clearSquare(1, 2);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*|*|\n+-+-+-+\n| | | |\n+-+-+-+');
      minefield.clearSquare(2, 0);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*|*|\n+-+-+-+\n|*| | |\n+-+-+-+');
      minefield.clearSquare(2, 1);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*| |\n+-+-+-+');
      minefield.clearSquare(2, 2);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*|*|\n+-+-+-+');
    });
    it('should mark clean squares as cleared with a "_', () => {
      const minefield = new MineField();
      minefield.seedBombs('         ');
      minefield.clearSquare(0, 0);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_| | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      minefield.clearSquare(0, 1);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_| |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      minefield.clearSquare(0, 2);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      minefield.clearSquare(1, 0);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n|_| | |\n+-+-+-+\n| | | |\n+-+-+-+');
      minefield.clearSquare(1, 1);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_| |\n+-+-+-+\n| | | |\n+-+-+-+');
      minefield.clearSquare(1, 2);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_|_|\n+-+-+-+\n| | | |\n+-+-+-+');
      minefield.clearSquare(2, 0);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_|_|\n+-+-+-+\n|_| | |\n+-+-+-+');
      minefield.clearSquare(2, 1);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_| |\n+-+-+-+');
      minefield.clearSquare(2, 2);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_|_|\n+-+-+-+');
    });
  });

  describe('getListOfNeighboringSquares', () => {
    it('should be defined', () => {
      expect(new MineField().getListOfNeighboringSquares).toBeDefined();
    });

    it('should return a list of all neighboring squares when gameboard is initially created', () => {
      expect(new MineField().getListOfNeighboringSquares(0, 0)).toEqual(
        expect.arrayContaining([
          [0, 1],
          [1, 1],
          [1, 0],
        ]),
      );
      expect(new MineField().getListOfNeighboringSquares(0, 1)).toEqual(
        expect.arrayContaining([
          [0, 0],
          [1, 0],
          [1, 1],
          [1, 2],
          [0, 2],
        ]),
      );
      expect(new MineField().getListOfNeighboringSquares(1, 1)).toEqual(
        expect.arrayContaining([
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 0],
          [1, 2],
          [2, 0],
          [2, 1],
          [2, 2],
        ]),
      );
    });

    it('should only return a list of neighboring squares when they have not been discovered', () => {
      const minefield = new MineField();
      minefield.gameboard = [
        ['*', ' ', ' '],
        ['*', ' ', ' '],
        ['*', ' ', ' '],
      ];
      expect(minefield.getListOfNeighboringSquares(1, 1)).toEqual(
        expect.arrayContaining([
          [0, 1],
          [0, 2],
          [1, 2],
          [2, 1],
          [2, 2],
        ]),
      );
    });
  });

  describe('checkBoardIsDiscovered', () => {
    it('should be defined', () => {
      expect(new MineField().checkIfBoardIsDiscovered).toBeDefined();
    });

    it('should return false if there are still undiscovered squares on the gameboard', () => {
      const minefield = new MineField();
      minefield.gameboard = [
        [' ', '2', ' '],
        ['_', '_', '_'],
        ['_', '_', '_'],
      ];
      expect(minefield.checkIfBoardIsDiscovered()).toBe(false);
    });

    it('should return true if there are no undiscovered squares on the gameboard', () => {
      const minefield = new MineField();
      minefield.gameboard = [
        ['*', '2', '*'],
        ['_', '_', '_'],
        ['_', '_', '_'],
      ];
      expect(minefield.checkIfBoardIsDiscovered()).toBe(true);
    });
  });
});
