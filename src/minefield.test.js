const { MineField } = require('./minefield');
const crypto = require('crypto');

describe('Minefield', () => {
  it('should exist', () => {
    expect(MineField).toBeDefined();
  });
  it('should create an empty 3x3 gameboard on start', () => {
    expect(new MineField().gameboard).toEqual([...Array(3)].map(() => Array(3).fill(' ')));
  });
  it('should format the gameboard in a human readable format', () => {
    expect(new MineField().getGameboard()).toBe('+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
  });
  it('should display the gameboard in the console', () => {
    const logSpy = jest.spyOn(console, 'log');
    expect(new MineField().printGameboard).toBeDefined();
    new MineField().printGameboard();
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });

  describe('Starting location', () => {
    it('Operation should exist', () => {
      expect(new MineField().getStartingLocation).toBeDefined();
    });

    it('Should return the starting position as a pair of (x,y) coordinates', () => {
      expect(new MineField().getStartingLocation()).toEqual(expect.arrayContaining([expect.any(Number), expect.any(Number)]));
    });

    it('Should randomly generate the starting position', () => {
      const mockMathRandom = jest.spyOn(crypto, 'randomBytes');
      new MineField().getStartingLocation();
      expect(mockMathRandom).toHaveBeenCalled();
      mockMathRandom.mockRestore();
    });
  });

  describe('Stepping on a square', () => {
    it('Operation should exist', () => {
      expect(new MineField().handleStepOnSquare).toBeDefined();
    });

    it('When selecting a square that contains a bomb, it should mark the gameboard with an "X"', () => {
      const minefield = new MineField();
      minefield.seedBombs();
      expect(minefield.handleStepOnSquare(0, 0)).toBe(false);
      expect(minefield.gameboard[0][0]).toBe('X');
    });

    it('When selecting a clean square, it should mark the square with the amount of adjacent bombs squares', () => {
      const minefield = new MineField();
      minefield.seedBombs();
      expect(minefield.handleStepOnSquare(1, 0)).toBe(true);
      expect(minefield.gameboard[1][0]).toBe('2');
    });
  });

  describe('Start game', () => {
    it('Operation should exist', () => {
      expect(new MineField().startGame).toBeDefined();
    });

    it('Should default the gameboard to "+-+-+-+\n|*| | |\n+-+-+-+\n| |*| |\n+-+-+-+\n| | |*|\n+-+-+-+"', () => {
      const minefield = new MineField();
      minefield.startGame();
      expect(minefield.bombBoard).toEqual([
        ['*', ' ', ' '],
        [' ', '*', ' '],
        [' ', ' ', '*'],
      ]);
    });

    it('Should show the game board and starting message in the console', () => {
      const logSpy = jest.spyOn(console, 'log');
      const minefield = new MineField();
      minefield.startGame('         ');

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenNthCalledWith(1, '+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(2, '[Sandbox 3x3] Game created.');
      logSpy.mockRestore();
    });

    it('When bot selects a square that contains a bomb, should output "BOOM! - Game Over."', () => {
      const logSpy = jest.spyOn(console, 'log');
      const minefield = new MineField();

      minefield.startGame('*********');

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenNthCalledWith(1, '+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(2, '[Sandbox 3x3] Game created.');
      expect(logSpy).toHaveBeenNthCalledWith(4, '[Sandbox 3x3] BOOM! - Game Over.');

      logSpy.mockRestore();
    });

    it('When bot selects a clean square, should display gameboard with number of neighboring bombs in console', () => {
      const logSpy = jest.spyOn(console, 'log');
      const minefield = new MineField();

      minefield.startGame('         ');

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenNthCalledWith(1, '+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(2, '[Sandbox 3x3] Game created.');
      expect(logSpy).toHaveBeenNthCalledWith(4, '[Sandbox 3x3] 0 bombs around your square.');

      logSpy.mockRestore();
    });

    it('should start the game and continue to play until board is filled. Then, display a message indicating that the bot wins', () => {
      const logSpy = jest.spyOn(console, 'log');
      const minefield = new MineField();
      minefield.startGame('         ');
      expect(logSpy).toHaveBeenNthCalledWith(21, minefield.getGameboard());
      expect(logSpy).toHaveBeenNthCalledWith(22, '[Sandbox 3x3] the land is cleared! GOOD JOB.');
    });
  });

  describe('Track squares with bombs', () => {
    it('should keep track of all the squares that contain bombs', () => {
      expect(new MineField().bombBoard).toBeDefined();
      expect(new MineField().bombBoard).toEqual([...Array(3)].map(() => Array(3).fill(' ')));
    });

    it('operation to generate location of squares containing bombs should exist', () => {
      expect(new MineField().seedBombs).toBeDefined();
    });

    it('should randomly generate location of squares containing bombs', () => {
      let field = new MineField();
      field.seedBombs();
      expect(field.bombBoard.flat().filter((item) => item === '*').length).toBe(3);
    });

    it('should take a seed value "* **     " and create the gameboard with 4 bomb squares', () => {
      let field = new MineField();
      field.seedBombs('* **   * ');
      expect(field.bombBoard.flat().filter((item) => item === '*').length).toBe(4);
    });

    it('should only accept strings that equal the size of the gameboard', () => {
      let field = new MineField();
      expect(() => field.seedBombs('          ')).toThrow(new Error('Error: seed string must equal size of gameboard'));
      expect(() => field.seedBombs('')).toThrow(new Error('Error: seed string must equal size of gameboard'));
      expect(() => field.seedBombs('         ')).not.toThrow(new Error('Error: seed string must equal size of gameboard'));
    });

    it('should not accept chars other than " " or "*', () => {
      let field = new MineField();
      expect(() => field.seedBombs('a1123##@$')).toThrow(new Error('Error: seed string can only contain " " or "*"'));
      expect(() => field.seedBombs(' * * Y * ')).toThrow(new Error('Error: seed string can only contain " " or "*"'));
      expect(() => field.seedBombs(' * * * * ')).not.toThrow(new Error('Error: seed string can only contain " " or "*"'));
    });
  });

  describe('Calculate adjacent bombs', () => {
    it('Operation should exist', () => {
      expect(new MineField().calculateNeighboringBombs).toBeDefined();
    });

    it('Should return the number of bombs around a square', () => {
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

  describe('Print message to console', () => {
    it('Operation exists', () => {
      expect(new MineField().printMessage).toBeDefined();
    });

    it('Should prefix message with the gameboard size', () => {
      const logSpy = jest.spyOn(console, 'log');
      new MineField().startGame();

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenNthCalledWith(2, '[Sandbox 3x3] Game created.');
      logSpy.mockRestore();
    });
  });

  describe('Clear  bombs', () => {
    it('Operation should exist', () => {
      expect(new MineField().clearSquare).toBeDefined();
    });
    it('When given the position of a square, should mark the square with a "*" if it contains a bomb', () => {
      const logSpy = jest.spyOn(console, 'log');

      const minefield = new MineField();
      minefield.seedBombs('*********');

      minefield.clearSquare(0, 0);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*| | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(2, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(0, 1);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*| |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(4, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(0, 2);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(6, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(1, 0);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n|*| | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(8, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(1, 1);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*| |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(10, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(1, 2);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*|*|\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(12, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(2, 0);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*|*|\n+-+-+-+\n|*| | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(14, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(2, 1);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*| |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(16, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(2, 2);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*|*|\n+-+-+-+\n|*|*|*|\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(18, '[Sandbox 3x3] Square flagged as bomb.');
    });

    it('When given the position of a square, should mark the square with a "_" if it does not contain a bomb', () => {
      const logSpy = jest.spyOn(console, 'log');
      const minefield = new MineField();
      minefield.seedBombs('         ');

      minefield.clearSquare(0, 0);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_| | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(2, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(0, 1);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_| |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(4, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(0, 2);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(6, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(1, 0);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n|_| | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(8, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(1, 1);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_| |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(10, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(1, 2);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_|_|\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(12, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(2, 0);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_|_|\n+-+-+-+\n|_| | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(14, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(2, 1);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_| |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(16, '[Sandbox 3x3] Square flagged as bomb.');

      minefield.clearSquare(2, 2);
      expect(minefield.getGameboard()).toBe('+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_|_|\n+-+-+-+\n|_|_|_|\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(18, '[Sandbox 3x3] Square flagged as bomb.');
    });
  });

  describe('List adjacent squares', () => {
    it('Operation should exist', () => {
      expect(new MineField().getListOfNeighboringSquares).toBeDefined();
    });

    it('When the gameboard is empty, should return a list of all adjacent squares', () => {
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

    it('When the gameboard is not empty, should return a list of empty adjacent squares', () => {
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

  describe('Gameboard is discovered', () => {
    it('Operation should exist', () => {
      expect(new MineField().checkIfBoardIsDiscovered).toBeDefined();
    });

    it('When there are empty squares on the gameboard, should return false', () => {
      const minefield = new MineField();
      minefield.gameboard = [
        [' ', '2', ' '],
        ['_', '_', '_'],
        ['_', '_', '_'],
      ];
      expect(minefield.checkIfBoardIsDiscovered()).toBe(false);
    });

    it('When there are no empty squares on the gameboard, should return true', () => {
      const minefield = new MineField();
      minefield.gameboard = [
        ['*', '2', '*'],
        ['_', '_', '_'],
        ['_', '_', '_'],
      ];
      expect(minefield.checkIfBoardIsDiscovered()).toBe(true);
    });
  });

  describe('Select next position', () => {
    it('Operation should exist', () => {
      expect(new MineField().selectNextPosition).toBeDefined();
    });

    it('Should return the position of a randomly selected adjacent empty square', () => {
      const minefield = new MineField();
      minefield.gameboard = [
        ['2', '*', ' '],
        ['_', ' ', ' '],
        [' ', ' ', ' '],
      ];
      expect([
        [2, 0],
        [2, 1],
        [2, 2],
        [0, 2],
        [1, 2],
        [1, 1],
      ]).toContainEqual(minefield.selectNextPosition());

      minefield.gameboard = [
        ['2', '*', ' '],
        ['_', '*', ' '],
        [' ', ' ', ' '],
      ];
      expect([
        [2, 0],
        [2, 1],
        [2, 2],
        [0, 2],
        [1, 2],
      ]).toContainEqual(minefield.selectNextPosition());

      minefield.gameboard = [
        ['2', '*', '2'],
        ['_', '*', '2'],
        ['1', '1', '1'],
      ];
      expect([]).toEqual(minefield.selectNextPosition());
    });
  });
});
